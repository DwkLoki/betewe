// import { Description, Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
// import { useState } from 'react'

// export default function AddQuestionModal(props) {
//     // const [isOpen, setIsOpen] = useState(false)

//     return (
//         <>
//             {/* <button onClick={() => setIsOpen(true)}>Open dialog</button> */}
//             <Dialog
//                 open={props.isOpen}
//                 onClose={props.closeModal}
//                 className="absolute top-[80px] left-0 right-0 bottom-0 z-50"
//             >
//                 <div className="absolute inset-0 bg-black/30" aria-hidden="true" />

//                 <div className="flex w-full h-full items-center justify-center p-4">
//                     <DialogPanel className="max-w-lg space-y-4 border bg-white p-12 z-50">
//                         <DialogTitle className="font-bold">Tambah Pertanyaan</DialogTitle>
//                         <Description>Tulis pertanyaanmu dengan lengkap</Description>

//                         {/* Form dan tombol di sini */}
//                         <div className="flex gap-4">
//                             <button onClick={props.closeModal}>Cancel</button>
//                             <button onClick={props.closeModal}>Submit</button>
//                         </div>
//                     </DialogPanel>
//                 </div>
//             </Dialog>
//         </>
//     )
// }

import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import { useState } from 'react'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'

export default function AddQuestionModal({ isOpen, closeModal, onSubmit, categories }) {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [categoriesSelected, setCategoriesSelected] = useState([])

  const handleSubmit = () => {
    if (!title || !content || categoriesSelected.length === 0) return
    const category_ids = categoriesSelected.map(Number)
    onSubmit({ title, content, category_ids })
    setTitle('')
    setContent('')
    setCategoriesSelected([])
    closeModal()
  }

  return (
    <Dialog open={isOpen} onClose={closeModal} className="fixed inset-0 z-50 flex items-start justify-center pt-[80px] bg-black/30">
      <DialogPanel className="w-full max-w-2xl bg-white rounded-xl p-6">
        <DialogTitle className="text-lg font-bold mb-4">Tambah Pertanyaan</DialogTitle>

        {/* Title */}
        <input
          type="text"
          placeholder="Judul pertanyaan"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border px-3 py-2 mb-4 rounded"
        />

        {/* React Quill */}
        <label className="block mb-2 font-medium">Isi Pertanyaan:</label>
        <ReactQuill
          value={content}
          onChange={setContent}
          className="mb-6 bg-white"
          theme="snow"
          placeholder="Tulis pertanyaanmu di sini..."
        />

        {/* Kategori */}
        <label className="block mb-2 font-medium">Pilih Kategori:</label>
        <select
          multiple
          value={categoriesSelected}
          onChange={(e) =>
            setCategoriesSelected(Array.from(e.target.selectedOptions, (opt) => opt.value))
          }
          className="w-full border px-3 py-2 rounded h-32"
        >
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>

        {/* Tombol Aksi */}
        <div className="mt-6 flex justify-end gap-3">
          <button onClick={closeModal} className="px-4 py-2 bg-gray-200 rounded">
            Batal
          </button>
          <button onClick={handleSubmit} className="px-4 py-2 bg-blue-600 text-white rounded">
            Simpan
          </button>
        </div>
      </DialogPanel>
    </Dialog>
  )
}