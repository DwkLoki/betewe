import { DecoratorNode } from "lexical";
import * as React from "react";
import { useRef, useState, useEffect } from "react";

function ImageComponent({ src, alt, width, height, nodeKey, editor }) {
    const imgRef = useRef(null);
    const [size, setSize] = useState({ width, height });
    const [isSelected, setIsSelected] = useState(false);
    const [isResizing, setIsResizing] = useState(false);

    // klik gambar → toggle selected
    function handleClick(e) {
        e.stopPropagation();
        setIsSelected(true);
    }

    // klik luar → hilangkan border
    useEffect(() => {
        function handleDocClick() {
            setIsSelected(false);
        }
        document.addEventListener("click", handleDocClick);
        return () => document.removeEventListener("click", handleDocClick);
    }, []);

    // start resize
    function startResize(e) {
        e.preventDefault();
        setIsResizing(true);

        const startX = e.clientX;
        const startY = e.clientY;
        const startWidth = size.width;
        const startHeight = size.height;

        function onMouseMove(ev) {
            const newWidth = Math.max(50, startWidth + (ev.clientX - startX));
            const newHeight = Math.max(50, startHeight + (ev.clientY - startY));
            setSize({ width: newWidth, height: newHeight });
        }

        function onMouseUp() {
            setIsResizing(false);
            window.removeEventListener("mousemove", onMouseMove);
            window.removeEventListener("mouseup", onMouseUp);

            // ✅ simpan ukuran baru ke Lexical Node
            editor.update(() => {
                const node = editor._nodeMap.get(nodeKey);
                if (node) {
                    node.setSize(size.width, size.height);
                }
            });
        }

        window.addEventListener("mousemove", onMouseMove);
        window.addEventListener("mouseup", onMouseUp);
    }

    return (
        <div
            className={`relative inline-block ${isSelected ? "ring-2 ring-blue-500" : ""
                }`}
            style={{ width: size.width, height: size.height }}
            onClick={handleClick}
        >
            <img
                ref={imgRef}
                src={src}
                alt={alt}
                draggable="false"
                className="rounded shadow max-w-full"
                style={{ width: size.width, height: size.height }}
            />

            {/* resize handle hanya muncul kalau gambar selected */}
            {isSelected && (
                <div
                    onMouseDown={startResize}
                    className="absolute -bottom-2 -right-1 w-2 h-2 bg-blue-500 cursor-se-resize"
                />
            )}
        </div>
    );
}

export class ImageNode extends DecoratorNode {
    __src;
    __alt;
    __width;
    __height;

    static getType() {
        return "image";
    }

    static clone(node) {
        return new ImageNode(
            node.__src,
            node.__alt,
            node.__width,
            node.__height,
            node.__key
        );
    }

    exportJSON() {
        return {
            type: "image",
            version: 1,
            src: this.__src,
            alt: this.__alt,
            width: this.__width,
            height: this.__height,
        };
    }

    static importJSON(serializedNode) {
        const { src, alt, width, height } = serializedNode;
        return new ImageNode(src, alt, width, height);
    }

    constructor(src = "", alt = "", width = 300, height = 200, key) {
        super(key);
        this.__src = src;
        this.__alt = alt;
        this.__width = width;
        this.__height = height;
    }

    createDOM() {
        return document.createElement("div");
    }

    updateDOM() {
        return false;
    }

    decorate(editor) {
        return (
            <ImageComponent
                src={this.__src}
                alt={this.__alt}
                width={this.__width}
                height={this.__height}
                nodeKey={this.getKey()}
                editor={editor}
            />
        );
    }

    setSize(width, height) {
        const writable = this.getWritable();
        writable.__width = width;
        writable.__height = height;
    }
}

// helper
export function $createImageNode({ src, alt, width = 300, height = 200 }) {
    return new ImageNode(src, alt, width, height);
}
