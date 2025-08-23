import { $getRoot, $getSelection } from 'lexical';
import { useEffect } from 'react';

import { AutoFocusPlugin } from '@lexical/react/LexicalAutoFocusPlugin';
import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import { ListPlugin } from '@lexical/react/LexicalListPlugin';
import { LexicalErrorBoundary } from '@lexical/react/LexicalErrorBoundary';
import LexicalToolbar from './LexicalToolbar';
import { HeadingNode } from '@lexical/rich-text';
import { ListItemNode, ListNode } from '@lexical/list';
import { ImageNode } from './ImageNode';
import ImagePlugin from './ImagePlugin';
import { LinkNode } from '@lexical/link';
import { LinkPlugin } from '@lexical/react/LexicalLinkPlugin';
import FloatingLinkEditor from './FloatingLinkEditor';
import { OnChangePlugin } from '@lexical/react/LexicalOnChangePlugin'
// import { TabIndentationPlugin } from '@lexical/react/LexicalTabIndentationPlugin';

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
    code: 'editor-code',
    codeHighlight: {
        atrule: 'editor-tokenAttr',
        attr: 'editor-tokenAttr',
        boolean: 'editor-tokenProperty',
        builtin: 'editor-tokenSelector',
        cdata: 'editor-tokenComment',
        char: 'editor-tokenSelector',
        class: 'editor-tokenFunction',
        'class-name': 'editor-tokenFunction',
        comment: 'editor-tokenComment',
        constant: 'editor-tokenProperty',
        deleted: 'editor-tokenProperty',
        doctype: 'editor-tokenComment',
        entity: 'editor-tokenOperator',
        function: 'editor-tokenFunction',
        important: 'editor-tokenVariable',
        inserted: 'editor-tokenSelector',
        keyword: 'editor-tokenAttr',
        namespace: 'editor-tokenVariable',
        number: 'editor-tokenProperty',
        operator: 'editor-tokenOperator',
        prolog: 'editor-tokenComment',
        property: 'editor-tokenProperty',
        punctuation: 'editor-tokenPunctuation',
        regex: 'editor-tokenVariable',
        selector: 'editor-tokenSelector',
        string: 'editor-tokenSelector',
        symbol: 'editor-tokenProperty',
        tag: 'editor-tokenProperty',
        url: 'editor-tokenOperator',
        variable: 'editor-tokenVariable',
    },
};

// Catch any errors that occur during Lexical updates and log them
// or throw them as needed. If you don't throw them, Lexical will
// try to recover gracefully without losing user data.
function onError(error) {
    console.error(error);
}

export default function LexicalEditor({ onChange, initialContent }) {
    const initialConfig = {
        namespace: 'MyEditor',
        theme,
        onError,
        nodes: [HeadingNode, ListNode, ListItemNode, ImageNode, LinkNode],
        editorState: (editor) => {
            if (initialContent) {
                const parsed = editor.parseEditorState(initialContent);
                editor.setEditorState(parsed);
            }
        }
    };

    return (
        <LexicalComposer initialConfig={initialConfig}>
            <div className="border w-full min-h-52 rounded-md p-2">
                <LexicalToolbar />
                <RichTextPlugin
                    contentEditable={
                        <ContentEditable
                            className='focus:outline-none'
                        />
                    }
                    ErrorBoundary={LexicalErrorBoundary}
                />
                <HistoryPlugin />
                <AutoFocusPlugin />
                <ListPlugin />
                <ImagePlugin />
                <LinkPlugin />
                <FloatingLinkEditor />
                {/* biar bisa tab untuk kasi indent */}
                {/* <TabIndentationPlugin />  */}

                <OnChangePlugin 
                    // onChange={(editorState) => {
                    //     editorState.read(() => {
                    //         const json = editorState.toJSON();
                    //         if (props.onChange) {
                    //             props.onChange(json); // kirim balik ke parent
                    //         }
                    //     });
                    // }}

                    onChange={(editorState) => {
                        if (onChange) {
                            onChange(editorState.toJSON());  // ✅ kirim object
                        }
                    }}
                />
                {/* <OnChangePlugin onChange={(editorState) => {
                    editorState.read(() => {
                        const html = $getRoot().getTextContent()
                        const json = JSON.stringify($getRoot().exportJSON());
                        console.log(html);
                        
                    })
                }} /> */}
            </div>
        </LexicalComposer>
    );
}