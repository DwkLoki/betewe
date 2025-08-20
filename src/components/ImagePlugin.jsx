import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { useEffect } from "react";
import { createCommand, $getSelection, $isRangeSelection } from "lexical";
import { $createImageNode } from "./ImageNode";

export const INSERT_IMAGE_COMMAND = createCommand();

export default function ImagePlugin() {
    const [editor] = useLexicalComposerContext();

    useEffect(() => {
        return editor.registerCommand(
            INSERT_IMAGE_COMMAND,
            (payload) => {
                const { src, alt } = payload;
                editor.update(() => {
                    const selection = $getSelection();
                    const imageNode = $createImageNode({ src, alt });

                    if ($isRangeSelection(selection)) {
                        // insert di posisi caret
                        selection.insertNodes([imageNode]);
                    } else {
                        // fallback: append ke root
                        const root = editor.getRootElement();
                        root?.appendChild(document.createTextNode("")); // jaga supaya tidak null
                    }
                });
                return true;
            },
            0
        );
    }, [editor]);

    return null;
}