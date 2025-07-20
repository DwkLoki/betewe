import optionsIcon from '../assets/icons/options.svg'
import upvoteIcon from '../assets/icons/upvote.svg'
import downvoteIcon from '../assets/icons/downvote.svg'
import profilePhoto from '../assets/images/avatar-testi1.png'

export default function Question() {
    return (
        <div className='w-[626px]'>
            <header className='flex w-full space-x-4 items-center'>
                <img src={profilePhoto} alt="profile photo" className='w-[55px] h-[55px]' />
                <div className='flex-1'>
                    <p className='font-bold mb-1 text-[#2C448C]'>Dwiky Darmawansyah</p>
                    <p className='text-xs text-[#84ACF8]'>Teknik Informatika</p>
                </div>
                <img src={optionsIcon} alt="options icon" />
            </header>

            <main className='flex w-full space-x-4 mt-6'>
                {/* bagian untuk vote */}
                <div className='w-[55px] flex flex-col px-4 py-2 space-y-4 items-center'>
                    <img src={upvoteIcon} alt="upvote icon" />
                    <span>32</span>
                    <img src={downvoteIcon} alt="upvote icon" />
                </div>

                {/* bagian pertanyaan */}
                <div className='flex-1'>
                    <p>
                        Jika Tembok Besar Tiongkok dibuat pada zaman sekarang dengan kualitas yang baik, 
                        berapa biaya yang dibutuhkan untuk menyelesaikan proyek tersebut?
                    </p>

                    <div className='flex'>
                        <div>
                            <ul className='flex flex-wrap'>
                                <li className='rounded-xl text-xs text-white bg-[#BCBCBC] px-3 py-2 w-fit mr-2 mt-2'>Keguruan dan Ilmu Pendidikan</li>
                                <li className='rounded-xl text-xs text-white bg-[#BCBCBC] px-3 py-2 w-fit mr-2 mt-2'>Sastra Indonesia</li>
                                <li className='rounded-xl text-xs text-white bg-[#BCBCBC] px-3 py-2 w-fit mr-2 mt-2'>Psikologi</li>
                                <li className='rounded-xl text-xs text-white bg-[#BCBCBC] px-3 py-2 w-fit mr-2 mt-2'>Ekonomi dan Bisnis</li>
                            </ul>

                            <p className='text-sm text-[#BCBCBC] mt-2'>2 menit lalu</p>
                        </div>

                        <button className='bg-[#2C448C] w-[80px] h-[30px] text-white rounded-xl'>Jawab</button>
                    </div>
                </div>
            </main>
        </div>
    )
}