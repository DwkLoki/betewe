import { Description, Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import { useState } from 'react'

export default function AddQuestionModal(props) {
    // const [isOpen, setIsOpen] = useState(false)
    const [formData, setFormData] = useState({
        title: '',
        content: '',
        categoryQuery: '',
        categories: []
    })
    // console.log(formData);
    // const [query, setQuery] = useState('')
    const [selectedTags, setSelectedTags] = useState([])
    const [filteredTags, setFilteredTags] = useState([])

    const handleInputChange = (e) => {
        const { value, name } = e.target

        // setQuery(value)

        const filtered = props.categories.filter(tag =>
            tag.name.toLowerCase().includes(value.toLowerCase()) &&
            !selectedTags.some(t => t.id === tag.id)
        )
        setFilteredTags(filtered)
        setFormData(prevFormData => {
            return {
                ...prevFormData,
                [name]: value
            }
        })
    }

    const handleTagSelect = (tag) => {
        setSelectedTags([...selectedTags, tag])
        // const updatedTags = [...selectedTags, tag]
        // setSelectedTags(updatedTags)
    
        // const tagIds = updatedTags.map(tag => tag.id)
        setFormData(prevFormData => {
            return {
                ...prevFormData,
                categoryQuery: ''
            }
        })

        setFilteredTags([])
    }

    const handleRemoveTag = (id) => {
        setSelectedTags(selectedTags.filter(tag => tag.id !== id))
    }

    const handleSubmit = (e) => {
        // const tagIds = selectedTags.map(tag => tag.id)
        // console.log('Submit dengan tag ID:', tagIds)
        e.preventDefault()
        const tagIds = selectedTags.map(tag => tag.id)
        const finalData = {
            ...formData,
            categories: tagIds
        }
        console.log(finalData)
        props.closeModal()
    }

    return (
        <>
            {/* <button onClick={() => setIsOpen(true)}>Open dialog</button> */}
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
                                    Judul Pertanyaan
                                    <div className='font-normal text-xs text-gray-600'>Tulis pertanyaanmu secara spesifik dan bayangkan Anda sedang mengajukan pertanyaan kepada orang lain.</div>
                                    <input 
                                        type="text" 
                                        className='w-full font-normal px-4 py-2 border focus:outline-[#2C448C] rounded mt-2'
                                        placeholder='contoh: Bagaimana peran teknologi cloud computing dalam transformasi digital kampus?'
                                        name='title'
                                        value={formData.title}
                                        onChange={handleInputChange}
                                    />
                                </label>

                                <label className='font-bold'>
                                    Detail Pertanyaan
                                    <div className='font-normal text-xs text-gray-600'>Jelaskan lebih lengkap dari apa yang kamu tulis di judul.</div>
                                    <textarea                               
                                        className='w-full min-h-52 font-normal px-4 py-3 border focus:outline-[#2C448C] rounded mt-2'
                                        name='content'
                                        value={formData.content}
                                        onChange={handleInputChange}
                                    />
                                </label>

                                <label className="font-bold">
                                    Kategori Pertanyaan
                                    <div className="font-normal text-xs text-gray-600 mb-2">
                                        Tambahkan hingga 5 kategori untuk menggambarkan topik pertanyaanmu.
                                    </div>

                                    <div className="relative">
                                        <input
                                            type="text"
                                            name='categoryQuery'
                                            value={formData.categoryQuery}
                                            onChange={handleInputChange}
                                            placeholder="Tulis untuk mencari tag..."
                                            className="w-full font-normal px-4 py-2 border rounded focus:outline-[#2C448C]"
                                        />
                                        {filteredTags.length > 0 && (
                                            <ul className="absolute z-10 bg-white border mt-1 w-fit max-h-40 overflow-y-auto shadow rounded">
                                                {filteredTags.map(tag => (
                                                    <li
                                                        key={tag.id}
                                                        className="px-4 py-2 cursor-pointer hover:bg-blue-100"
                                                        onClick={() => handleTagSelect(tag)}
                                                    >
                                                        {tag.name}
                                                    </li>
                                                ))}
                                            </ul>
                                        )}
                                    </div>

                                    <div className="flex flex-wrap gap-2 mt-2">
                                        {selectedTags.map(tag => (
                                            <span
                                                key={tag.id}
                                                className="bg-[#BCBCBC] text-white px-3 py-1 rounded-xl text-sm flex items-center gap-2"
                                            >
                                                {tag.name}
                                                <button
                                                    type="button"
                                                    onClick={() => handleRemoveTag(tag.id)}
                                                    className="text-xs hover:text-red-600"
                                                >
                                                    &times;
                                                </button>
                                            </span>
                                        ))}
                                    </div>
                                </label>
                            </form>

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
                                    className='px-4 py-2 rounded-[15px] font-bold text-white bg-[#2C448C]'
                                >
                                    Kirim Pertanyaan
                                </button>
                            </div>
                        </div>
                    </DialogPanel>
                </div>
            </Dialog>
        </>
    )
}
