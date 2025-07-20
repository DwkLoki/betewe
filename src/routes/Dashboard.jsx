import Filter from "../components/Filter";
import Question from "../components/Question";
import AfterLoginNav from "../components/AfterLoginNav"

export default function Dashboard() {
    return (
        <section className="h-screen overflow-hidden">
            <header className="fixed top-0 left-0 right-0 z-20 bg-[#F2F2F2] shadow">
                <AfterLoginNav />
            </header>

            <main className="flex ml-[350px] pt-24 h-screen">
                <aside className="fixed top-20 left-0 w-[300px] h-[calc(100vh-80px)] bg-white border-r z-10 p-6 overflow-y-auto">
                    <button className="mb-4 border rounded-xl bg-[#2C448C] w-28 py-2 text-center text-white font-bold">Tambah</button>
                    <Filter />
                </aside>
                {/* <div className="h-full w-[265px] mr-20">
                    <button>Tambah</button>
                    <Filter />
                </div> */}
                <div className="flex flex-col flex-1 h-full space-y-16 overflow-y-auto">
                    <Question />
                    <Question />
                    <Question />
                    <Question />
                    <Question />
                    <Question />
                    <Question />
                </div>
            </main>
        </section>
    )
}