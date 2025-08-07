import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react'
import { ChevronDown } from 'lucide-react'
import { useSearchParams } from "react-router-dom"
import { useState, useEffect } from 'react'
import axios from 'axios'

export default function Filter() {
    const [searchParams, setSearchParams] = useSearchParams();
    const [categories, setCategories] = useState([])
    console.log(searchParams);

    useEffect(() => {
        getCategories()
    }, []);

    const getCategories = async () => {
        try {
            const response = await axios.get('http://localhost:3000/api/categories')
            setCategories(response.data)
        } catch (error) {
            console.log(error);
        }
    }

    const handleFilterToggle = (key, value) => {
        const newSearchParams = new URLSearchParams(searchParams);
        const currentValue = newSearchParams.get(key);

        // Jika filter sudah aktif dengan value yang sama, hapus (toggle off)
        if (currentValue === value) {
            newSearchParams.delete(key);
        } else {
            // Jika filter tidak aktif atau berbeda value, set value baru
            newSearchParams.set(key, value);
        }

        console.log('Filter toggled:', key, value, 'New params:', newSearchParams.toString());
        setSearchParams(newSearchParams);
    };

    const clearAllFilters = () => {
        const newSearchParams = new URLSearchParams(searchParams);
        newSearchParams.delete('answered');
        newSearchParams.delete('sort');
        console.log('All filters cleared, New params:', newSearchParams.toString());
        setSearchParams(newSearchParams);
    };

    const handleCategoryFilter = (categoryId) => {
        // Create new URLSearchParams to avoid mutation issues
        const newSearchParams = new URLSearchParams(searchParams);
        const currentCategories = newSearchParams.getAll('category');

        if (currentCategories.includes(categoryId.toString())) {
            // Jika kategori sudah dipilih, hapus dari filter
            newSearchParams.delete('category');
            const remainingCategories = currentCategories.filter(id => id !== categoryId.toString());
            remainingCategories.forEach(id => newSearchParams.append('category', id));
        } else {
            // Jika kategori belum dipilih, tambahkan ke filter
            newSearchParams.append('category', categoryId.toString());
        }

        console.log('Category filter changed:', categoryId, 'New params:', newSearchParams.toString());
        setSearchParams(newSearchParams);
    };

    const clearAllCategories = () => {
        const newSearchParams = new URLSearchParams(searchParams);
        newSearchParams.delete('category');
        console.log('All categories cleared, New params:', newSearchParams.toString());
        setSearchParams(newSearchParams);
    };

    // Helper function untuk mengecek apakah filter aktif
    const isFilterActive = (key, value) => {
        if (key === 'category') {
            return searchParams.getAll('category').includes(value.toString());
        }
        return searchParams.get(key) === value;
    };

    const isAnyBasicFilterActive = () => {
        return searchParams.get('answered') || searchParams.get('sort');
    };

    const isAnyFilterActive = () => {
        return searchParams.get('answered') || searchParams.get('sort') || searchParams.getAll('category').length > 0 || searchParams.get('search');
    };

    const getActiveSearchQuery = () => {
        return searchParams.get('search') || '';
    };

    const getSearchKeywords = () => {
        const query = getActiveSearchQuery();
        if (!query) return [];
        return query.split(' ').filter(word => word.length > 0);
    };

    return (
        <div className="max-w-lg divide-y divide-gray-200">
            {/* Search Status Indicator */}
            {/* {getActiveSearchQuery() && (
                <div className="py-3 px-4 bg-blue-50 rounded-lg mb-4">
                    <div className="flex items-center justify-between">
                        <div className="flex-1">
                            <p className="text-sm font-medium text-blue-900">Pencarian Aktif</p>
                            <p className="text-xs text-blue-700 mb-2">Mencari pertanyaan yang mengandung:</p>
                            <div className="flex flex-wrap gap-1">
                                {getSearchKeywords().map((keyword, index) => (
                                    <span
                                        key={index}
                                        className="inline-block bg-blue-200 text-blue-800 text-xs px-2 py-1 rounded-full"
                                    >
                                        {keyword}
                                    </span>
                                ))}
                            </div>
                        </div>
                        <button
                            onClick={() => {
                                const newSearchParams = new URLSearchParams(searchParams);
                                newSearchParams.delete('search');
                                setSearchParams(newSearchParams);
                            }}
                            className="text-blue-600 hover:text-blue-800 text-xs underline ml-3 flex-shrink-0"
                        >
                            Hapus pencarian
                        </button>
                    </div>
                </div>
            )} */}
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
                            <p className="text-xs text-gray-500 mb-2">Klik untuk memilih/membatalkan filter</p>
                            <ul className='flex flex-wrap'>
                                <li
                                    onClick={clearAllFilters}
                                    className={`rounded-xl text-xs border-[1.5px] px-3 py-2 w-fit mr-1 mt-2 cursor-pointer transition-colors ${!isAnyBasicFilterActive()
                                        ? 'text-white bg-[#2C448C] border-[#2C448C]'
                                        : 'text-[#2C448C] border-[#2C448C] bg-white hover:bg-[#2C448C] hover:text-white'
                                        }`}
                                >
                                    Semua
                                </li>
                                <li
                                    onClick={() => handleFilterToggle('answered', 'false')}
                                    className={`rounded-xl text-xs border-[1.5px] px-3 py-2 w-fit mr-1 mt-2 cursor-pointer transition-colors ${isFilterActive('answered', 'false')
                                        ? 'text-white bg-[#2C448C] border-[#2C448C]'
                                        : 'text-[#2C448C] border-[#2C448C] bg-white hover:bg-[#2C448C] hover:text-white'
                                        }`}
                                >
                                    Pertanyaan belum terjawab
                                </li>
                                <li
                                    onClick={() => handleFilterToggle('answered', 'true')}
                                    className={`rounded-xl text-xs border-[1.5px] px-3 py-2 w-fit mr-1 mt-2 cursor-pointer transition-colors ${isFilterActive('answered', 'true')
                                        ? 'text-white bg-[#2C448C] border-[#2C448C]'
                                        : 'text-[#2C448C] border-[#2C448C] bg-white hover:bg-[#2C448C] hover:text-white'
                                        }`}
                                >
                                    Pertanyaan sudah terjawab
                                </li>
                                <li
                                    onClick={() => handleFilterToggle('sort', 'newest')}
                                    className={`rounded-xl text-xs border-[1.5px] px-3 py-2 w-fit mr-1 mt-2 cursor-pointer transition-colors ${isFilterActive('sort', 'newest')
                                        ? 'text-white bg-[#2C448C] border-[#2C448C]'
                                        : 'text-[#2C448C] border-[#2C448C] bg-white hover:bg-[#2C448C] hover:text-white'
                                        }`}
                                >
                                    Baru ditambahkan
                                </li>
                                <li
                                    onClick={() => handleFilterToggle('sort', 'most_votes')}
                                    className={`rounded-xl text-xs border-[1.5px] px-3 py-2 w-fit mr-1 mt-2 cursor-pointer transition-colors ${isFilterActive('sort', 'most_votes')
                                        ? 'text-white bg-[#2C448C] border-[#2C448C]'
                                        : 'text-[#2C448C] border-[#2C448C] bg-white hover:bg-[#2C448C] hover:text-white'
                                        }`}
                                >
                                    Vote terbanyak
                                </li>
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
                            <p className="text-xs text-gray-500 mb-2">Klik untuk memilih/membatalkan kategori (bisa pilih lebih dari satu)</p>
                            <ul className='flex flex-wrap'>
                                <li
                                    onClick={clearAllCategories}
                                    className={`rounded-xl text-xs border-[1.5px] px-3 py-2 w-fit mr-1 mt-2 cursor-pointer transition-colors ${searchParams.getAll('category').length === 0
                                        ? 'text-white bg-[#2C448C] border-[#2C448C]'
                                        : 'text-[#2C448C] border-[#2C448C] bg-white hover:bg-[#2C448C] hover:text-white'
                                        }`}
                                >
                                    Semua
                                </li>
                                {
                                    categories.map(category => {
                                        const isSelected = isFilterActive('category', category.id);
                                        return (
                                            <li
                                                key={category.id}
                                                onClick={() => handleCategoryFilter(category.id)}
                                                className={`rounded-xl text-xs border-[1.5px] px-3 py-2 w-fit mr-1 mt-2 cursor-pointer transition-colors ${isSelected
                                                    ? 'text-white bg-[#2C448C] border-[#2C448C]'
                                                    : 'text-[#2C448C] border-[#2C448C] bg-white hover:bg-[#2C448C] hover:text-white'
                                                    }`}
                                            >
                                                {category.name}
                                                {/* {isSelected && <span className="ml-1">✓</span>} */}
                                            </li>
                                        )
                                    })
                                }
                            </ul>
                            {searchParams.getAll('category').length > 0 && (
                                <div className="mt-3 p-2 bg-blue-50 rounded-lg">
                                    <p className="text-xs text-blue-700">
                                        Kategori terpilih: {searchParams.getAll('category').length} kategori
                                    </p>
                                </div>
                            )}
                        </DisclosurePanel>
                    </>
                )}
            </Disclosure>
        </div>
    )
}
