import optionsIcon from '../assets/icons/options.svg'
import upvoteIcon from '../assets/icons/upvote.svg'
import downvoteIcon from '../assets/icons/downvote.svg'
// import profilePhoto from '../assets/images/avatar-testi1.png'
import { formatDistanceToNow } from 'date-fns'
import { id } from 'date-fns/locale'  // opsional kalau mau bahasa Indonesia

export default function Question(props) {  
    console.log(props);
     
    return (
        <div className='w-[626px]'>
            <header className='flex w-full space-x-4 items-center'>
                <img src={props.data.User.foto_profil} alt="profile photo" className='w-[55px] h-[55px] rounded-full' />
                <div className='flex-1'>
                    <p className='font-bold mb-1 text-[#2C448C]'>{props.data.User.nama_lengkap || props.data.User.username}</p>
                    <p className='text-xs text-[#84ACF8]'>{props.data.User.jurusan || ''}</p>
                </div>
                <img src={optionsIcon} alt="options icon" />
            </header>

            <main className='flex w-full space-x-4 mt-6'>
                {/* bagian untuk vote */}
                <div className='w-[55px] flex flex-col px-4 py-2 space-y-4 items-center'>
                    <img src={upvoteIcon} alt="upvote icon" />
                    <span>{props.data.vote}</span>
                    <img src={downvoteIcon} alt="upvote icon" />
                </div>

                {/* bagian pertanyaan */}
                <div className='flex-1'>
                    <p className='text-2xl font-bold'>
                        {props.data.title}
                    </p>

                    <div className='flex justify-between'>
                        <div className='mr-5'>
                            <ul className='flex flex-wrap'>
                                {
                                    props.data.categories.map(category => {
                                        return <li key={category.id} className='rounded-xl text-xs text-white bg-[#BCBCBC] px-3 py-2 w-fit mr-2 mt-2'>{category.name}</li>
                                    })
                                }
                                {/* <li className='rounded-xl text-xs text-white bg-[#BCBCBC] px-3 py-2 w-fit mr-2 mt-2'>Teknik Informatika</li>
                                <li className='rounded-xl text-xs text-white bg-[#BCBCBC] px-3 py-2 w-fit mr-2 mt-2'>Sistem Informasi</li>
                                <li className='rounded-xl text-xs text-white bg-[#BCBCBC] px-3 py-2 w-fit mr-2 mt-2'>Teknik</li> */}
                            </ul>

                            <p className='text-sm text-[#BCBCBC] mt-2'>{formatDistanceToNow(new Date(props.data.created_at), { addSuffix: true, locale: id })}</p>
                        </div>

                        <button className='bg-[#2C448C] w-[80px] h-[30px] text-white rounded-xl'>Jawab</button>
                    </div>
                </div>
            </main>
        </div>
    )
}