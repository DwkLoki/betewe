import { Description, Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import { useState } from 'react'

export default function AddQuestionModal(props) {
    // const [isOpen, setIsOpen] = useState(false)

    return (
        <>
            {/* <button onClick={() => setIsOpen(true)}>Open dialog</button> */}
            <Dialog
                open={props.isOpen}
                onClose={props.closeModal}
                className="absolute top-[80px] left-0 right-0 bottom-0 z-50"
            >
                <div className="absolute inset-0 bg-black/30" aria-hidden="true" />

                <div className="flex w-full h-full items-center justify-center p-4">
                    <DialogPanel className="max-w-lg space-y-4 border bg-white p-12 z-50">
                        <DialogTitle className="font-bold">Tambah Pertanyaan</DialogTitle>
                        <Description>Tulis pertanyaanmu dengan lengkap</Description>

                        {/* Form dan tombol di sini */}
                        <div className="flex gap-4">
                            <button onClick={props.closeModal}>Cancel</button>
                            <button onClick={props.closeModal}>Submit</button>
                        </div>
                    </DialogPanel>
                </div>
            </Dialog>
        </>
    )
}