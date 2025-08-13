import { Search } from 'lucide-react';
import heroImg from '../assets/images/section1.png'
import contentImg1 from '../assets/images/content1.png'
import contentImg2 from '../assets/images/content2.png'
import contentImg3 from '../assets/images/content3.png'
import TestiCarousel from '../components/testiCarousel';
import newsLetterImg from '../assets/images/newsletter-img.png'
import NavBar from '../components/NavBar';

export default function Home() {
    return (
        <section className='text-[#1A1A1A] bg-[#F2F2F2]'>
            <header>
                <NavBar />
            </header>

            <main>
                <section className='flex w-full items-center gap-12 lg:px-20 sm:px-10 px-5 py-10'>
                    <img src={heroImg} alt="Hero Image 1" className='w-1/2 hidden md:block' />
                    <div className='md:w-1/2 w-full'>
                        <h1 className='lg:text-4xl text-2xl font-bold'>Bingung ngerjain tugas kuliah?</h1>
                        <p className='lg:text-xl text-base lg:pt-6 lg:pb-8 pt-3 pb-4'>Tenang, Betewe siap membantu kamu mendapatkan informasi dan pembahasan sesuai topik perkuliahanmu!</p>
                        <div className='flex items-center lg:space-x-4 space-x-3 w-full h-[44px] lg:w-[415px] lg:h-[55px] bg-white rounded-2xl lg:pl-6 pl-3 pr-2 focus-within:outline focus-within:outline-[#84ACF8]'>
                            <input type="text" placeholder='Cari jawaban dari pertanyaanmu' className='flex-1 outline-none' />
                            <button className='w-[25px] h-[25px] lg:w-[30px] lg:h-[30px] bg-[#84ACF8] rounded-full flex items-center justify-center'>
                                <Search className="w-4 h-4 lg:w-5 lg:h-5 text-white" />
                            </button>
                        </div>
                    </div>
                </section>

                <section className='w-full lg:px-20 sm:px-10 px-5 py-10'>
                    <h1 className='lg:text-4xl text-2xl font-bold text-center'>
                        Temukan jawaban dari segala <br />
                        <span className="relative inline-block pb-4">
                            pertanyaanmu!
                            <span className="absolute left-1/2 -translate-x-1/2 bottom-0 w-4/5 h-[4px] bg-[#84ACF8] rounded-sm"></span>
                        </span>
                    </h1>
                    <div className='flex flex-col lg:space-y-20 lg:mt-20 space-y-10 mt-10'>
                        <div className='flex sm:flex-row flex-col-reverse lg:gap-32 md:gap-16 gap-6 items-center'>
                            <div className='flex-1'>
                                <p>Tiap habis kelas langsung dikasih tugas dan deadline-nya mepet? Cari materi di buku perlu banyak waktu dan belum tentu nemu?</p>
                                <p className='font-bold mt-2'>BTW, Tanya-Jawab yuk!</p>
                            </div>
                            <img className='sm:w-[45%] w-4/5' src={contentImg1} alt="Gambar Konten Pertama" />
                        </div>
                        <div className='flex sm:flex-row flex-col lg:gap-32 md:gap-16 gap-6 items-center'>
                            <img className='sm:w-[45%] w-4/5' src={contentImg2} alt="Gambar Konten Kedua" />
                            <div className='flex-1'>
                                <p>Kamu suka membahas sebuah topik materi dengan teman-teman lain untuk membantumu mendapat pemahaman yang lebih baik?</p>
                                <p className='font-bold mt-2'>BTW, Diskusi bareng yuk!</p>
                            </div>
                        </div>
                        <div className='flex sm:flex-row flex-col-reverse lg:gap-32 md:gap-16 gap-6 items-center'>
                            <div className='flex-1'>
                                <p>Kesulitan cari referensi berdasarkan program studi-mu? Search by keyword tetapi hasilnya masih belum memuaskan?</p>
                                <p className='font-bold mt-2'>BTW, kategorinya sesuai jurusan loh!</p>
                            </div>
                            <img className='sm:w-[45%] w-4/5' src={contentImg3} alt="Gambar Konten Ketiga" />
                        </div>
                    </div>
                </section>

                <section className='w-full py-10'>
                    <h1 className='lg:text-4xl text-2xl font-bold text-center'>
                        <span className="relative inline-block pb-4 lg:mb-12 mb-6">
                            Baca pendapat mereka yuk!
                            <span className="absolute left-1/2 -translate-x-1/2 bottom-0 w-2/5 h-[4px] bg-[#84ACF8] rounded-sm"></span>
                        </span>
                    </h1>
                    <TestiCarousel />
                </section>

                <section className='flex md:flex-row flex-col w-full md:items-end items-center md:gap-12 gap-6 lg:px-20 sm:px-10 px-5 py-10'>
                    <img className='lg:w-[35%] md:w-[45%] w-4/5' src={newsLetterImg} alt="Gambar Newsletter" />
                    <div className='flex flex-col md:items-start items-center lg:w-[65%] md:w-[55%] space-y-6'>
                        <h1 className='lg:text-4xl text-2xl text-center md:text-left font-bold'>Daftarkan e-mail kamu untuk mendapatkan info terbaru dari kami, GRATIS!</h1>
                        <div className='flex items-center w-full h-[44px] lg:w-[415px] lg:h-[55px] bg-white rounded-2xl px-6'>
                            <input type="text" placeholder='Tulis email kamu di sini' className='w-full outline-none' />
                        </div>
                        <button className='border rounded-xl bg-[#2C448C] w-28 py-1 text-center text-white font-bold'>
                            Kirim
                        </button>
                    </div>
                </section>
            </main>

            <footer className='h-[150px] bg-[#2C448C] text-white flex flex-col justify-center items-center px-5 text-center gap-2'>
                <p>©2025 PT Betewe Apa ya. All Rights Reserved</p>
                <p>Tentang Kami - Ketentuan Privasi - Berlanganan - FAQ - Hubungi Kami</p>
            </footer>
        </section>
    )
}