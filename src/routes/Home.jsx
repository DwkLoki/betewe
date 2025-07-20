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
                <section className='flex flex-col mx-6 sm:flex-row items-center sm:space-x-12 sm:mx-20 py-10'>
                    <img src={heroImg} alt="Hero Image 1" className='hidden sm:block'/>
                    <div>
                        <h1 className='text-2xl sm:text-4xl font-bold'>Bingung ngerjain tugas kuliah?</h1>
                        <p className='text-base pt-4 pb-6 sm:text-xl sm:pt-6 sm:pb-8'>Tenang, Betewe siap membantu kamu mendapatkan informasi dan pembahasan sesuai topik perkuliahanmu!</p>
                        <div className='flex items-center space-x-4 w-full h-[44px] sm:w-[415px] sm:h-[55px] bg-white rounded-2xl pl-6 pr-2'>
                            <input type="text" placeholder='Cari jawaban dari pertanyaanmu' className='flex-1 outline-none'/>
                            <button className='w-[25px] h-[25px] sm:w-[30px] sm:h-[30px] bg-[#84ACF8] rounded-full flex items-center justify-center'>
                                <Search className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                            </button>
                        </div>
                    </div>
                </section>

                <section className='mx-20 pt-20'>
                    <h1 className='text-4xl font-bold text-center'>
                        Temukan jawaban dari segala <br />
                        <span className="relative inline-block pb-4">
                            pertanyaanmu!
                            <span className="absolute left-1/2 -translate-x-1/2 bottom-0 w-4/5 h-[4px] bg-[#84ACF8] rounded-sm"></span>
                        </span>
                    </h1>
                    <div className='flex flex-col space-y-20 my-20'>
                        <div className='flex justify-between items-center'>
                            <div className='w-[470px]'>
                                <p>Tiap habis kelas langsung dikasih tugas dan deadline-nya mepet? Cari materi di buku perlu banyak waktu dan belum tentu nemu?</p>
                                <p className='font-bold mt-2'>BTW, Tanya-Jawab yuk!</p>
                            </div>
                            <img src={contentImg1} alt="Gambar Konten Pertama" />
                        </div>
                        <div className='flex justify-between items-center'>
                            <img src={contentImg2} alt="Gambar Konten Kedua" />
                            <div className='w-[470px]'>
                                <p>Kamu suka membahas sebuah topik materi dengan teman-teman lain untuk membantumu mendapat pemahaman yang lebih baik?</p>
                                <p className='font-bold mt-2'>BTW, Diskusi bareng yuk!</p>
                            </div>
                        </div>
                        <div className='flex justify-between items-center'>
                            <div className='w-[470px]'>
                                <p>Kesulitan cari referensi berdasarkan program studi-mu? Search by keyword tetapi hasilnya masih belum memuaskan?</p>
                                <p className='font-bold mt-2'>BTW, kategorinya sesuai jurusan loh!</p>
                            </div>
                            <img src={contentImg3} alt="Gambar Konten Ketiga" />
                        </div>
                    </div>
                </section>

                <section className='py-20'>
                    <h1 className='text-4xl font-bold text-center'>
                        <span className="relative inline-block pb-4 mb-12">
                            Baca pendapat mereka yuk!
                            <span className="absolute left-1/2 -translate-x-1/2 bottom-0 w-2/5 h-[4px] bg-[#84ACF8] rounded-sm"></span>
                        </span>
                    </h1>
                    <TestiCarousel />
                </section>

                <section className='flex items-end space-x-12 mx-20 pb-20'>
                    <img src={newsLetterImg} alt="Gambar Newsletter" />
                    <div className='flex flex-col space-y-6'>
                        <h1 className='text-4xl font-bold'>Daftarkan e-mail kamu untuk mendapatkan info terbaru dari kami, GRATIS!</h1>
                        <div className='flex items-center space-x-4 w-[415px] h-[55px] bg-white rounded-2xl px-6'>
                            <input type="text" placeholder='Tulis email kamu di sini' className='w-full outline-none' />
                        </div>
                        <button className='border rounded-xl bg-[#2C448C] w-28 py-1 text-center text-white font-bold'>
                            Kirim
                        </button>
                    </div>
                </section>
            </main>

            <footer className='h-[150px] bg-[#2C448C] text-white flex flex-col justify-center items-center'>
                <p>©2025 PT Betewe Apa ya. All Rights Reserved</p>
                <p>Tentang Kami - Ketentuan Privasi - Berlanganan - FAQ - Hubungi Kami</p>
            </footer>
        </section>
    )
}