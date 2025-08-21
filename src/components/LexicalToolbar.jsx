import { INSERT_ORDERED_LIST_COMMAND, INSERT_UNORDERED_LIST_COMMAND } from '@lexical/list';
import { ListNode } from '@lexical/list';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext'
import { $createHeadingNode, HeadingNode } from '@lexical/rich-text';
import { $setBlocksType } from '@lexical/selection';
import { FORMAT_TEXT_COMMAND, $getSelection, $isRangeSelection } from 'lexical'
import { 
    Heading, 
    Bold, 
    Italic, 
    Link, 
    Image, 
    List, 
    ListOrdered, 
    ChevronDown 
} from 'lucide-react';
import { useState, useCallback, useEffect } from 'react';
import { INSERT_IMAGE_COMMAND } from "./ImagePlugin";
import { TOGGLE_LINK_COMMAND } from "@lexical/link";
import { OPEN_LINK_EDITOR_COMMAND } from "./FloatingLinkEditor";
import { LinkNode } from '@lexical/link';

export default function LexicalToolbar() {
    const [editor] = useLexicalComposerContext()
    const [isHeadingOpen, setIsHeadingOpen] = useState(false);
    const [isBold, setIsBold] = useState(false);
    const [isItalic, setIsItalic] = useState(false);
    const [activeBlockType, setActiveBlockType] = useState(null);
    const [isLink, setIsLink] = useState(false);

    const $updateToolbar = useCallback(() => {
        const selection = $getSelection();
        if ($isRangeSelection(selection)) {
            // Update text format
            setIsBold(selection.hasFormat('bold'));
            setIsItalic(selection.hasFormat('italic'));

            // cek block type (heading atau paragraph)
            const anchorNode = selection.anchor.getNode();
            const element = anchorNode.getTopLevelElementOrThrow();
            if (element instanceof HeadingNode) {
                setActiveBlockType(element.getTag()); // 'h1' | 'h2' | 'h3'
            } else if (element instanceof ListNode) {
                setActiveBlockType(element.getListType()); // 'bullet' | 'number'
            } else {
                setActiveBlockType('paragraph');
            }

            // cek link (inline node → cek parent)
            const parent = anchorNode.getParent();
            if (parent instanceof LinkNode) {
                setIsLink(true);
            } else {
                setIsLink(false);
            }
        }
    }, []);

    useEffect(() => {
        editor.registerUpdateListener(({ editorState }) => {
            editorState.read(() => {
                $updateToolbar();
            });
        })
    }, [editor, $updateToolbar]);

    const handleHeading = (tag) => {
        editor.update(() => {
            const selection = $getSelection();
            if ($isRangeSelection(selection)) {
                // Update block type antara Heading || paragraph
                if (activeBlockType === tag) {
                    // kalau tag sama -> reset ke paragraph
                    $setBlocksType(selection, () => $createHeadingNode('paragraph'));
                    setActiveBlockType('paragraph');
                } else {
                    // kalau beda -> set heading baru
                    $setBlocksType(selection, () => $createHeadingNode(tag));
                    setActiveBlockType(tag);
                }
            }
        })

        // tutup popover heading list
        setIsHeadingOpen(prev => !prev) 
    }

    return (
        <div className="mb-2 flex gap-1 border-b-2 border-red-400 pb-1">
            {/* button heading */}
            <div className='relative'>
                {/* Button */}
                <button 
                    onClick={() => setIsHeadingOpen(prev => !prev)}
                    title='Heading (Ctrl+H)'
                    className={`flex justify-center items-center hover:bg-[#84ACF8] rounded-md p-1 ${['h1', 'h2', 'h3'].includes(activeBlockType) ? 'bg-[#84ACF8] text-[#2C448C]' : ''}`}
                >
                    <Heading size={20} strokeWidth={2} />
                    <ChevronDown size={15} strokeWidth={2} />
                </button>

                {/* Popup rata kiri */}
                {isHeadingOpen && (
                    <div className="absolute w-28 left-0 top-full bg-white shadow-xl py-[12px] px-2 rounded-md border border-[#d4d4d4] mt-3">
                        {/* Arrow */}
                        <div className="absolute -top-[8px] left-4">
                            <div className="w-4 h-4 bg-white rotate-45 border-l border-t border-[#d4d4d4]"></div>
                        </div>

                        <button 
                            onClick={() => handleHeading('h1')}
                            title='Klik untuk memilih/membatalkan'
                            className={`cursor-pointer hover:bg-[#BCBCBC] p-1 rounded-lg text-lg ${activeBlockType === 'h1' ? 'bg-[#84ACF8] text-[#2C448C]' : ''}`}
                        >
                            Heading 1
                        </button>
                        <button 
                            onClick={() => handleHeading('h2')}
                            title='Klik untuk memilih/membatalkan'
                            className={`cursor-pointer hover:bg-[#BCBCBC] p-1 rounded-lg text-base ${activeBlockType === 'h2' ? 'bg-[#84ACF8] text-[#2C448C]' : ''}`}
                        >
                            Heading 2
                        </button>
                        <button 
                            onClick={() => handleHeading('h3')}
                            title='Klik untuk memilih/membatalkan'
                            className={`cursor-pointer hover:bg-[#BCBCBC] p-1 rounded-lg text-sm ${activeBlockType === 'h3' ? 'bg-[#84ACF8] text-[#2C448C]' : ''}`}
                        >
                            Heading 3
                        </button>
                    </div>
                )}
            </div>

            {/* button bold */}
            <button
                onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'bold')}
                title='Bold (Ctrl+B)'
                className={`hover:bg-[#84ACF8] rounded-md p-1 ${isBold ? 'bg-[#84ACF8]' : ''}`}
            >
                <Bold size={20} strokeWidth={2} color={isBold ? '#2C448C' : 'black'}/>
            </button>

            {/* button italic */}
            <button
                onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'italic')}
                title='Italic (Ctrl+I)'
                className={`hover:bg-[#84ACF8] rounded-md p-1 ${isItalic ? 'bg-[#84ACF8]' : ''}`}
            >
                <Italic size={20} strokeWidth={2} color={isItalic ? '#2C448C' : 'black'} />
            </button>

            {/* button insert link */}
            <button
                // onClick={() => {
                //     editor.update(() => {
                //         const selection = $getSelection();
                //         if ($isRangeSelection(selection) && !selection.isCollapsed()) {
                //             // langsung jadikan link dengan default "https://"
                //             editor.dispatchCommand(TOGGLE_LINK_COMMAND, "https://");
                //             // buka popover supaya user bisa edit URL
                //             editor.dispatchCommand(OPEN_LINK_EDITOR_COMMAND, true);
                //         } else {
                //             // kalau tidak ada teks terseleksi, jangan lakukan apa-apa
                //             console.log("Harus blok teks dulu untuk membuat link");
                //         }
                //     });
                // }}
                onClick={() => {
                    editor.update(() => {
                        const selection = $getSelection();
                        if ($isRangeSelection(selection)) {
                            const node = selection.anchor.getNode();
                            const parent = node.getParent();

                            if (parent && parent.getType() === "link") {
                                // 👉 kalau cursor ada di dalam link (collapsed atau diblok) → hapus link
                                editor.dispatchCommand(TOGGLE_LINK_COMMAND, null);
                            } else if (!selection.isCollapsed()) {
                                // 👉 kalau teks biasa diblok → buat link baru
                                editor.dispatchCommand(TOGGLE_LINK_COMMAND, "https://");
                                editor.dispatchCommand(OPEN_LINK_EDITOR_COMMAND, true);
                            } else {
                                // ❌ kalau tidak ada teks terseleksi & bukan di dalam link → tidak lakukan apa-apa
                                console.log("Harus blok teks untuk membuat link baru");
                            }
                        }
                    });
                }}
                title='Link (Ctrl+L)'
                className={`hover:bg-[#84ACF8] rounded-md p-1 ${isLink ? "bg-[#84ACF8]" : ""}`}
            >
                <Link size={20} strokeWidth={2} color={isLink ? '#2C448C' : 'black'} />
            </button>

            {/* button insert image */}
            <button
                onClick={() => {
                    // buat elemen input file
                    const input = document.createElement("input");
                    input.type = "file";
                    input.accept = "image/*";

                    input.onchange = () => {
                        const file = input.files?.[0];
                        if (file) {
                            const url = URL.createObjectURL(file);
                            editor.dispatchCommand(INSERT_IMAGE_COMMAND, {
                                src: url,
                                alt: file.name || "image",
                            });
                        }
                    };

                    input.click();
                }}
                title='Insert Image (Ctrl+G)'
                className='hover:bg-[#84ACF8] rounded-md p-1'
            >
                <Image size={20} strokeWidth={2} />
            </button>

            {/* button insert ul */}
            <button
                onClick={() => editor.dispatchCommand(INSERT_UNORDERED_LIST_COMMAND, undefined)}
                title='Bulleted List (Ctrl+U)'
                className={`hover:bg-[#84ACF8] rounded-md p-1 ${activeBlockType === 'bullet' ? 'bg-[#84ACF8]' : ''}`}
            >
                <List size={20} strokeWidth={2} color={activeBlockType === 'bullet' ? '#2C448C' : 'black'} />
            </button>

            {/* button insert ol */}
            <button
                onClick={() => editor.dispatchCommand(INSERT_ORDERED_LIST_COMMAND, undefined)}
                title='Numbered List (Ctrl+O)'
                className={`hover:bg-[#84ACF8] rounded-md p-1 ${activeBlockType === 'number' ? 'bg-[#84ACF8]' : ''}`}
            >
                <ListOrdered size={20} strokeWidth={2} color={activeBlockType === 'number' ? '#2C448C' : 'black'} />
            </button>
        </div>
    )
}


{/* Popup tengah */ }
// {
//     isHeadingOpen && (
//         <div className="absolute w-28 left-1/2 -translate-x-1/2 top-full mt-3 bg-white shadow-xl rounded-md border border-[#d4d4d4]">

//             {/* Arrow */}
//             <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-white border-l border-t border-[#d4d4d4] rotate-45"></div>

//             {/* Content */}
//             <div className='cursor-pointer hover:bg-[#BCBCBC] p-1 rounded-lg text-lg'>Heading 1</div>
//             <div className='cursor-pointer hover:bg-[#BCBCBC] p-1 rounded-lg text-base'>Heading 2</div>
//             <div className='cursor-pointer hover:bg-[#BCBCBC] p-1 rounded-lg text-sm'>Heading 3</div>
//         </div>
//     )
// }