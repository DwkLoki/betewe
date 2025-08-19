// import {
//     LexicalComposer,
// } from '@lexical/react/LexicalComposer'
// import { ListNode, ListItemNode } from '@lexical/list'
// import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin'
// import { OnChangePlugin } from '@lexical/react/LexicalOnChangePlugin'
// import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin'
// import { ContentEditable } from '@lexical/react/LexicalContentEditable'
// import { ListPlugin } from '@lexical/react/LexicalListPlugin'
// import { HeadingNode, QuoteNode } from '@lexical/rich-text'
// import { $getRoot, $getSelection } from 'lexical'
// import { useState } from 'react'
// import Toolbar from './LexicalToolbar'

// export default function LexicalEditor({ onChange }) {
//     const initialConfig = {
//         namespace: 'MyEditor',
//         theme: {},
//         onError(error) {
//             throw error
//         },
//         nodes: [
//             HeadingNode,
//             QuoteNode,
//             ListNode,
//             ListItemNode, // ✅ daftar node yang dibutuhkan untuk <ul> dan <ol>
//         ],
//     }

//     return (
//         <LexicalComposer initialConfig={initialConfig}>
//             <div className="border rounded-md p-2">
//                 <Toolbar />
//                 <RichTextPlugin
//                     contentEditable={
//                         <ContentEditable className="min-h-[150px] outline-none p-2" />
//                     }
//                     placeholder={<p className="text-gray-400 p-2">Tulis pertanyaan di sini...</p>}
//                 />
//                 <HistoryPlugin />
//                 <ListPlugin />
//                 <OnChangePlugin onChange={(editorState) => {
//                     editorState.read(() => {
//                         const html = $getRoot().getTextContent()
//                         onChange(html)
//                     })
//                 }} />
//             </div>
//         </LexicalComposer>
//     )
// }  

import { $getRoot, $getSelection } from 'lexical';
import { useEffect } from 'react';

import { AutoFocusPlugin } from '@lexical/react/LexicalAutoFocusPlugin';
import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import { LexicalErrorBoundary } from '@lexical/react/LexicalErrorBoundary';
import LexicalToolbar from './LexicalToolbar';
import { HeadingNode } from '@lexical/rich-text';

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
        nested: {
            listitem: 'editor-nested-listitem',
        },
        ol: "list-decimal ml-6",
        ul: "list-disc ml-6",
        listitem: "my-1",
        listitemChecked: 'editor-listItemChecked',
        listitemUnchecked: 'editor-listItemUnchecked',
    },
    hashtag: 'editor-hashtag',
    image: 'editor-image',
    link: "text-blue-600 underline",
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

export default function LexicalEditor() {
    const initialConfig = {
        namespace: 'MyEditor',
        theme,
        onError,
        nodes: [HeadingNode],
    };

    return (
        <LexicalComposer initialConfig={initialConfig}>
            <div className="border-2 border-red-400 w-1/2 rounded-md p-2">
                <LexicalToolbar />
                <RichTextPlugin
                    contentEditable={
                        <ContentEditable
                            aria-placeholder={'Enter some text...'}
                            placeholder={<div>Enter some text...</div>}
                        />
                    }
                    ErrorBoundary={LexicalErrorBoundary}
                />
                <HistoryPlugin />
                <AutoFocusPlugin />
            </div>
        </LexicalComposer>
    );
}