import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { $getSelection, $isRangeSelection } from "lexical";
import { TOGGLE_LINK_COMMAND } from "@lexical/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { createCommand } from "lexical";

export const OPEN_LINK_EDITOR_COMMAND = createCommand();

function setFloatingElemPosition(targetRect, floatingElem) {
    if (targetRect == null) {
        floatingElem.style.opacity = "0";
        floatingElem.style.transform = "translate(-10000px, -10000px)";
        return;
    }
    const editorRect = document.body.getBoundingClientRect();
    floatingElem.style.opacity = "1";
    floatingElem.style.position = "absolute";
    floatingElem.style.left = `${targetRect.left - editorRect.left}px`;
    floatingElem.style.top = `${targetRect.bottom - editorRect.top + 4}px`;
}

export default function FloatingLinkEditor() {
    const [editor] = useLexicalComposerContext();
    const editorRef = useRef(null);

    const [isLink, setIsLink] = useState(false);
    const [url, setUrl] = useState("");
    const [targetRect, setTargetRect] = useState(null);
    const [triggerFromToolbar, setTriggerFromToolbar] = useState(false);

    const updateLinkEditor = useCallback(() => {
        const selection = $getSelection();
        if (!$isRangeSelection(selection)) {
            setTargetRect(null);
            setTriggerFromToolbar(false); // reset kalau nggak ada range
            return;
        }

        const nativeSelection = window.getSelection();
        if (!nativeSelection || nativeSelection.rangeCount === 0) {
            setTargetRect(null);
            setTriggerFromToolbar(false);
            return;
        }

        const domRange = nativeSelection.getRangeAt(0);
        const rect = domRange.getBoundingClientRect();

        const node = selection.anchor.getNode();
        const parent = node.getParent();

        if (parent && parent.getType() === "link") {
            // kalau cursor/selection di dalam link → popover langsung muncul
            setIsLink(true);
            setUrl(parent.getURL?.() || "");
            setTargetRect(rect);
            setTriggerFromToolbar(false); // kalau udah jadi link, nggak usah tahan toolbar mode
        } else if (triggerFromToolbar) {
            // hanya muncul kalau user klik tombol Insert Link
            setIsLink(false);
            setUrl("");
            setTargetRect(rect);
        } else {
            setTargetRect(null);
            setTriggerFromToolbar(false);
        }
    }, [triggerFromToolbar]);

    useEffect(() => {
        return editor.registerUpdateListener(({ editorState }) => {
            editorState.read(() => {
                updateLinkEditor();
            });
        });
    }, [editor, updateLinkEditor]);

    useEffect(() => {
        return editor.registerCommand(
            OPEN_LINK_EDITOR_COMMAND,
            () => {
                setTriggerFromToolbar(true);
                updateLinkEditor();
                return true;
            },
            0
        );
    }, [editor, updateLinkEditor]);

    useEffect(() => {
        const elem = editorRef.current;
        if (elem && targetRect) {
            setFloatingElemPosition(targetRect, elem);
        }
    }, [targetRect]);

    if (!targetRect) return null;

    return createPortal(
        <div
            ref={editorRef}
            className="bg-white border border-gray-300 shadow-md rounded-md p-2 flex gap-2 z-50"
            style={{ minWidth: 250 }}
        >
            <input
                className="border px-2 py-1 text-sm flex-1 rounded"
                type="text"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://example.com"
            />

            {isLink && (
                <>
                    <button
                        className="px-2 py-1 bg-blue-500 text-white rounded text-sm"
                        onClick={() => {
                            editor.dispatchCommand(TOGGLE_LINK_COMMAND, url);
                            setTriggerFromToolbar(false);
                        }}
                    >
                        Simpan
                    </button>
                    <button
                        className="px-2 py-1 bg-red-500 text-white rounded text-sm"
                        onClick={() => {
                            editor.dispatchCommand(TOGGLE_LINK_COMMAND, null);
                            setUrl("");
                            setIsLink(false);
                            setTriggerFromToolbar(false);
                        }}
                    >
                        Hapus
                    </button>
                </>
            )}
        </div>,
        document.body
    );
}
