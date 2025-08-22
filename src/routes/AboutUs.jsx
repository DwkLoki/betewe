import NavBar from "../components/NavBar";
import registerPoster from '../assets/images/register-poster.jpg'
import LexicalEditor from "../components/LexicalEditor";

export default function AboutUs() {
    return (
        <section className='text-[#1A1A1A] bg-[#F2F2F2]'>
            <header>
                <NavBar />
            </header>

            <main>
                <section className='relative h-[calc(100vh-80px)]'>
                    <img className="object-cover h-full w-full opacity-40" src={registerPoster} alt="Hero Image" />
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
                        <h1 className="text-2xl md:text-4xl font-bold max-w-3xl">
                            “Tidak ada pencuri, walaupun ulung, dapat merampok pengetahuan seseorang
                            dan itulah mengapa pengetahuan adalah harta terbaik dan teraman untuk dimiliki.”
                        </h1>
                        <p className="mt-4 italic">
                            L. Frank Baum, <span className="font-semibold">The Lost Princess of Oz</span>
                        </p>
                    </div>
                </section>

                <section className='w-full py-20'>
                    <h1 className='lg:text-4xl text-2xl font-bold text-center'>
                        <span className="relative inline-block pb-4 lg:mb-12 mb-6">
                            Tentang Betewe!
                            <span className="absolute left-1/2 -translate-x-1/2 bottom-0 w-2/5 h-[4px] bg-[#84ACF8] rounded-sm"></span>
                        </span>
                    </h1>
                    <div className="flex flex-col w-full items-center gap-4">
                        <p className="lg:w-1/2 w-3/4 text-justify">BETEWE adalah platform diskusi online yang dirancang khusus untuk mahasiswa S1. Di sini, mahasiswa bisa saling bertanya, berbagi jawaban, dan berdiskusi layaknya forum akademik modern. BETEWE hadir untuk membantu mahasiswa menemukan solusi dari permasalahan kuliah, mengasah kemampuan berpikir kritis, sekaligus membangun komunitas belajar yang kolaboratif.</p>
                        <p
                            className="lg:w-1/2 w-3/4 text-justify"
                        >
                            Proyek ini awalnya merupakan salah satu mini project hasil kerja tim saat saya mengikuti bootcamp SYNRGY Academy x Bank BCA. Tim kami beranggotakan 10 orang dengan pembagian peran mulai dari UI/UX designer, frontend developer, backend developer, hingga QA Engineer. Pada saat itu, saya berkontribusi sebagai backend developer, namun merasa peran saya belum terlalu signifikan bagi tim. Karena itu, sejak Mei 2025, saya memutuskan untuk membangun ulang proyek ini secara mandiri
                            sekaligus mengembangkan kembali dengan teknologi yang lebih relevan dan modern agar sesuai dengan kebutuhan saat ini.
                        </p>
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