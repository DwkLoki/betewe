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
                // preload image to get natural size
                const img = new Image();
                img.src = src;

                img.onload = () => {
                    const { naturalWidth, naturalHeight } = img;

                    // ambil ukuran editor
                    const editorRoot = editor.getRootElement();
                    const editorWidth = editorRoot ? editorRoot.clientWidth : 600; // fallback

                    let finalWidth = naturalWidth;
                    let finalHeight = naturalHeight;

                    // scale down proporsional kalau gambar lebih lebar dari editor
                    if (naturalWidth > editorWidth) {
                        const scale = editorWidth / naturalWidth;
                        finalWidth = editorWidth;
                        finalHeight = Math.round(naturalHeight * scale);
                    }

                    editor.update(() => {
                        const selection = $getSelection();
                        const imageNode = $createImageNode({
                            src,
                            alt,
                            width: finalWidth,
                            height: finalHeight,
                        });

                        if ($isRangeSelection(selection)) {
                            selection.insertNodes([imageNode]);
                        }
                    });
                };

                img.onerror = () => {
                    console.warn("Gagal load gambar:", src);
                };
                return true;
            },
            0
        );
    }, [editor]);

    return null;
}