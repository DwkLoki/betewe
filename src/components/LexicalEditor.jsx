import {
    LexicalComposer,
} from '@lexical/react/LexicalComposer'
import { ListNode, ListItemNode } from '@lexical/list'
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin'
import { OnChangePlugin } from '@lexical/react/LexicalOnChangePlugin'
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin'
import { ContentEditable } from '@lexical/react/LexicalContentEditable'
import { ListPlugin } from '@lexical/react/LexicalListPlugin'
import { HeadingNode, QuoteNode } from '@lexical/rich-text'
import { $getRoot, $getSelection } from 'lexical'
import { useState } from 'react'
import Toolbar from './LexicalToolbar'

export default function LexicalEditor({ onChange }) {
    const initialConfig = {
        namespace: 'MyEditor',
        theme: {},
        onError(error) {
            throw error
        },
        nodes: [
            HeadingNode,
            QuoteNode,
            ListNode,
            ListItemNode, // ✅ daftar node yang dibutuhkan untuk <ul> dan <ol>
        ],
    }

    return (
        <LexicalComposer initialConfig={initialConfig}>
            <div className="border rounded-md p-2">
                <Toolbar />
                <RichTextPlugin
                    contentEditable={
                        <ContentEditable className="min-h-[150px] outline-none p-2" />
                    }
                    placeholder={<p className="text-gray-400 p-2">Tulis pertanyaan di sini...</p>}
                />
                <HistoryPlugin />
                <ListPlugin />
                <OnChangePlugin onChange={(editorState) => {
                    editorState.read(() => {
                        const html = $getRoot().getTextContent()
                        onChange(html)
                    })
                }} />
            </div>
        </LexicalComposer>
    )
}  