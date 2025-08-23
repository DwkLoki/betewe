import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { LexicalErrorBoundary } from "@lexical/react/LexicalErrorBoundary";
import { ListNode, ListItemNode } from "@lexical/list";
import { HeadingNode } from "@lexical/rich-text";
import { ImageNode } from "./ImageNode";
import { LinkNode } from "@lexical/link";

const theme = {
    ltr: 'ltr',
    rtl: 'rtl',
    paragraph: "mb-2",
    quote: 'editor-quote',
    heading: {
        h1: "text-3xl font-bold mb-2",
        h2: "text-2xl font-bold mb-2",
        h3: "text-xl font-semibold mb-2",
    },
    list: {
        ol: "list-decimal ml-6",
        ul: "list-disc ml-6",
        listitem: "my-1",
        nested: {
            listitem: 'ml-6',
        },
    },
    hashtag: 'editor-hashtag',
    image: 'editor-image',
    link: "text-blue-600 underline cursor-pointer",
    text: {
        bold: "font-bold",
        italic: "italic",
        underline: "underline",
    },
};

export default function LexicalViewer({ content }) {
    const initialConfig = {
        namespace: "MyViewer",
        editable: false, // ✅ read-only mode
        nodes: [HeadingNode, ListNode, ListItemNode, ImageNode, LinkNode],
        onError: (e) => console.error(e),
        editorState: (editor) => {
            if (content) {
                const parsed = editor.parseEditorState(content);
                editor.setEditorState(parsed);
            }
        },
        theme,
    };

    return (
        <LexicalComposer initialConfig={initialConfig}>
            <RichTextPlugin
                contentEditable={
                    <ContentEditable className="prose max-w-none" />
                    // <ContentEditable className="prose max-w-none [&_img]:max-w-full [&_img]:h-auto" />
                }
                placeholder={null}
                ErrorBoundary={LexicalErrorBoundary}
            />
        </LexicalComposer>
    );
}