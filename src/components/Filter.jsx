import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react'
import { ChevronDown } from 'lucide-react'

export default function Filter() {
    return (
        <div className="max-w-lg divide-y divide-gray-200">
            <Disclosure as="div" className="py-4" defaultOpen>
                {({ open }) => (
                    <>
                        <DisclosureButton className="group flex w-full items-center justify-between">
                            <span className="text-sm font-medium text-gray-900 group-hover:text-[#2C448C]">
                                Filter
                            </span>
                            <ChevronDown
                                className={`h-5 w-5 text-gray-600 transition-transform duration-200 ${open ? 'rotate-180' : ''
                                    }`}
                            />
                        </DisclosureButton>
                        <DisclosurePanel className="mt-2 text-sm text-gray-600">
                            <p>Tampilkan berdasarkan:</p>
                            <ul className='flex flex-wrap'>
                                <li className='rounded-xl text-xs text-[#2C448C] border-[1.5px] border-[#2C448C] bg-white px-3 py-2 w-fit mr-1 mt-2'>Semua</li>
                                <li className='rounded-xl text-xs text-[#2C448C] border-[1.5px] border-[#2C448C] bg-white px-3 py-2 w-fit mr-1 mt-2'>Pertanyaan belum terjawab</li>
                                <li className='rounded-xl text-xs text-[#2C448C] border-[1.5px] border-[#2C448C] bg-white px-3 py-2 w-fit mr-1 mt-2'>Pertanyaan sudah terjawab</li>
                                <li className='rounded-xl text-xs text-[#2C448C] border-[1.5px] border-[#2C448C] bg-white px-3 py-2 w-fit mr-1 mt-2'>Baru ditambahkan</li>
                                <li className='rounded-xl text-xs text-[#2C448C] border-[1.5px] border-[#2C448C] bg-white px-3 py-2 w-fit mr-1 mt-2'>Vote terbanyak</li>
                            </ul>
                        </DisclosurePanel>
                    </>
                )}
            </Disclosure>

            <Disclosure as="div" className="py-4">
                {({ open }) => (
                    <>
                        <DisclosureButton className="group flex w-full items-center justify-between">
                            <span className="text-sm font-medium text-gray-900 group-hover:text-[#2C448C]">
                                Kategori
                            </span>
                            <ChevronDown
                                className={`h-5 w-5 text-gray-600 transition-transform duration-200 ${open ? 'rotate-180' : ''
                                    }`}
                            />
                        </DisclosureButton>
                        <DisclosurePanel className="mt-2 text-sm text-gray-600">
                            <ul className='flex flex-wrap'>
                                <li className='rounded-xl text-xs text-[#2C448C] border-[1.5px] border-[#2C448C] bg-white px-3 py-2 w-fit mr-1 mt-2'>Semua</li>
                                <li className='rounded-xl text-xs text-[#2C448C] border-[1.5px] border-[#2C448C] bg-white px-3 py-2 w-fit mr-1 mt-2'>Akuntansi</li>
                                <li className='rounded-xl text-xs text-[#2C448C] border-[1.5px] border-[#2C448C] bg-white px-3 py-2 w-fit mr-1 mt-2'>Filsafat</li>
                                <li className='rounded-xl text-xs text-[#2C448C] border-[1.5px] border-[#2C448C] bg-white px-3 py-2 w-fit mr-1 mt-2'>Ilmu Ekonomi</li>
                                <li className='rounded-xl text-xs text-[#2C448C] border-[1.5px] border-[#2C448C] bg-white px-3 py-2 w-fit mr-1 mt-2'>Manajemen</li>
                                <li className='rounded-xl text-xs text-[#2C448C] border-[1.5px] border-[#2C448C] bg-white px-3 py-2 w-fit mr-1 mt-2'>Teknik Elektro</li>
                                <li className='rounded-xl text-xs text-[#2C448C] border-[1.5px] border-[#2C448C] bg-white px-3 py-2 w-fit mr-1 mt-2'>Teknik Geologi</li>
                                <li className='rounded-xl text-xs text-[#2C448C] border-[1.5px] border-[#2C448C] bg-white px-3 py-2 w-fit mr-1 mt-2'>Ekonomi dan Bisnis</li>
                                <li className='rounded-xl text-xs text-[#2C448C] border-[1.5px] border-[#2C448C] bg-white px-3 py-2 w-fit mr-1 mt-2'>Hukum</li>
                                <li className='rounded-xl text-xs text-[#2C448C] border-[1.5px] border-[#2C448C] bg-white px-3 py-2 w-fit mr-1 mt-2'>Ilmu Sosial</li>
                                <li className='rounded-xl text-xs text-[#2C448C] border-[1.5px] border-[#2C448C] bg-white px-3 py-2 w-fit mr-1 mt-2'>Aljabar Linier</li>
                                <li className='rounded-xl text-xs text-[#2C448C] border-[1.5px] border-[#2C448C] bg-white px-3 py-2 w-fit mr-1 mt-2'>Kedokteran dan Ilmu Kesehatan</li>
                                <li className='rounded-xl text-xs text-[#2C448C] border-[1.5px] border-[#2C448C] bg-white px-3 py-2 w-fit mr-1 mt-2'>Psikologi</li>
                                <li className='rounded-xl text-xs text-[#2C448C] border-[1.5px] border-[#2C448C] bg-white px-3 py-2 w-fit mr-1 mt-2'>Kehutanan</li>
                                <li className='rounded-xl text-xs text-[#2C448C] border-[1.5px] border-[#2C448C] bg-white px-3 py-2 w-fit mr-1 mt-2'>Pertanian</li>
                            </ul>
                        </DisclosurePanel>
                    </>
                )}
            </Disclosure>
        </div>
    )
}
