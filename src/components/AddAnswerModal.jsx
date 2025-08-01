import { Dialog, DialogPanel } from '@headlessui/react'
import { useState } from 'react'
import { CircleAlert } from 'lucide-react';
import { ClipLoader } from "react-spinners";
import { toast } from 'react-toastify';
import axios from 'axios';

export default function AddQuestionModal(props) {    
    const [answer, setAnswer] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    // console.log(answer);

    const isContentEmpty = answer.trim() === '';

    const handleInputChange = (e) => {
        const { value } = e.target

        setAnswer(value)
    }

    const addAnswer = async () => {
        const token = localStorage.getItem('TOKEN')
        const answerData = {
            content: answer,
            question_id: props.questionId
        }
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }

        const response = await axios.post('http://localhost:3000/api/answers', answerData, config)

        return response;
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        // Mulai loading
        setIsLoading(true);

        try {
            const res = await addAnswer()

            // ✅ Jika berhasil
            toast.success('Tambah jawaban berhasil! 🎉', {
                position: 'top-center',
                autoClose: 2000
            });

            // reset form
            setAnswer('')

            setTimeout(() => {
                setIsLoading(false);
                props.closeModal()
            }, 1000)
            console.log(res)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
            <Dialog
                open={props.isOpen}
                onClose={props.closeModal}
                className="absolute font-roboto top-[80px] left-0 right-0 bottom-0 z-50"
            >
                <div className="absolute inset-0 bg-black/30" aria-hidden="true" />

                <div className="flex w-full h-full items-center justify-center p-4">
                    <DialogPanel className="w-11/12 h-5/6 rounded-3xl bg-white p-0 z-50 overflow-hidden">
                        <div className="px-10 py-7 space-y-6 mr-3 h-full overflow-y-auto">
                            <form className='flex flex-col space-y-6'>
                                <label className='font-bold'>
                                    Jawaban
                                    <div className='font-normal text-xs text-gray-600'>Tulis jawabanmu secara jelas dan rinci. Sertakan penjelasan, contoh, atau referensi jika ada.</div>
                                    <textarea                               
                                        className='w-full min-h-52 font-normal px-4 py-3 border focus:outline-[#2C448C] rounded mt-2'
                                        value={answer}
                                        onChange={handleInputChange}
                                    />
                                </label>
                            </form>

                            {/* <div className='flex px-3 py-2 text-yellow-700 border-2 border-yellow-500 bg-yellow-400 rounded'>
                                <CircleAlert strokeWidth={1.75}/>
                                <span className='ml-4'>Lengkapi form di atas sebelum mengirim pertanyaan</span>
                            </div> */}

                            <div className="flex justify-end gap-4">
                                <button 
                                    type='button'
                                    onClick={props.closeModal}
                                    className='px-4 py-2 rounded-[15px] font-bold text-white bg-[#C90000]'
                                >
                                    Batalkan
                                </button>
                                <button
                                    type='button'
                                    onClick={handleSubmit}
                                    disabled={isLoading || isContentEmpty }
                                    className={`
                                        flex justify-center items-center space-x-4 px-4 py-2 rounded-[15px] font-bold text-white bg-[#2C448C]
                                        ${ !isContentEmpty ? isLoading ? 'bg-[#2C448C] opacity-50 cursor-not-allowed' : 'bg-[#2C448C]' : 'bg-[#BCBCBC] cursor-not-allowed'}
                                    `}
                                >
                                    <ClipLoader 
                                        color='white'
                                        size={20}
                                        loading={isLoading}
                                    />
                                    <span>Kirim Jawaban</span>
                                </button>
                            </div>
                        </div>
                    </DialogPanel>
                </div>
            </Dialog>
        </>
    )
}