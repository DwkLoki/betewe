import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext'
import {
    INSERT_ORDERED_LIST_COMMAND,
    INSERT_UNORDERED_LIST_COMMAND,
} from '@lexical/list'
import {
    $createParagraphNode,
    $getSelection,
    $isRangeSelection,
    FORMAT_TEXT_COMMAND,
    $createTextNode,
    INSERT_PARAGRAPH_COMMAND
} from 'lexical'
import { $wrapNodes } from '@lexical/selection'

export default function Toolbar() {
    const [editor] = useLexicalComposerContext()

    return (
        <div className="mb-2 flex gap-2 border-b pb-2">
            <button onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'bold')} className="font-bold">B</button>
            <button onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'italic')} className="italic">I</button>
            <button onClick={() => editor.dispatchCommand(INSERT_ORDERED_LIST_COMMAND)}>1.</button>
            <button onClick={() => editor.dispatchCommand(INSERT_UNORDERED_LIST_COMMAND)}>•</button>
        </div>
    )
}