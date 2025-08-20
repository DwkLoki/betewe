import { DecoratorNode } from "lexical";
import * as React from "react";

function ImageComponent({ src, alt }) {
    return (
        <img
            src={src}
            alt={alt}
            className="max-w-full my-2 rounded-md shadow"
        />
    );
}

export class ImageNode extends DecoratorNode {
    __src;
    __alt;

    static getType() {
        return "image";
    }

    static clone(node) {
        return new ImageNode(node.__src, node.__alt, node.__key);
    }

    // ✅ wajib ada exportJSON
    exportJSON() {
        return {
            type: "image",
            version: 1,
            src: this.__src,
            alt: this.__alt,
        };
    }

    // ✅ wajib ada importJSON
    static importJSON(serializedNode) {
        const { src, alt } = serializedNode;
        return new ImageNode(src, alt);
    }

    constructor(src = "", alt = "", key) {
        super(key);
        this.__src = src;
        this.__alt = alt;
    }

    createDOM() {
        return document.createElement("div");
    }

    updateDOM() {
        return false;
    }

    decorate() {
        return <ImageComponent src={this.__src} alt={this.__alt} />;
    }
}

// helper
export function $createImageNode({ src, alt }) {
    return new ImageNode(src, alt);
}

export function $isImageNode(node) {
    return node instanceof ImageNode;
}