import { useState } from 'react';
import avatarTesti1 from '../assets/images/avatar-testi1.png'
import avatarTesti2 from '../assets/images/avatar-testi2.png'
import avatarTesti3 from '../assets/images/avatar-testi3.png'
import avatarTesti4 from '../assets/images/avatar-testi4.png'

const testimonials = [
    {
        name: 'Dewi Lestari',
        age: 21,
        role: 'Mahasiswi Astronomi',
        image: avatarTesti1,
        text: '“Seneng banget bisa nemu Betewe, jadi gampang banget bikin tugas kuliah. Tercanggih deh pokoknya”',
    },
    {
        name: 'Rizky Pratama',
        age: 22,
        role: 'Mahasiswa Teknik',
        image: avatarTesti2,
        text: '“Fitur diskusinya bener-bener ngebantu banget buat dapetin inspirasi dan bertukar pengalaman baru dari sesama mahasiswa dari institusi lainnya. Saya jadi makin pede buat kerjain tugas dan proyek di kuliah”',
    },
    {
        name: 'Lisa Maulana',
        age: 20,
        role: 'Mahasiswi Sastra',
        image: 'https://i.pravatar.cc/100?img=31',
        text: '“Gak nyangka bisa se-efisien ini. Bahkan dosen sampai heran aku submit cepat.”',
    },
    {
        name: 'Siti Nurhaliza',
        age: 19,
        role: 'Mahasiswi Arsitektur',
        image: avatarTesti3,
        text: '“Dampaknya terasa banget! Tugas-tugasku beres lebih cepat bahkan sebelum deadline! Jadi bisa nge-drakor deh.”',
    },
    {
        name: 'Andi Saputra',
        age: 20,
        role: 'Mahasiswa Sastra',
        image: avatarTesti4,
        text: '“Betewe, Mantap!”',
    },
];

export default function TestiCarousel() {
    const [index, setIndex] = useState(0);

    const handleSelect = (i) => setIndex(i);

    return (
        <div className="h-[390px] bg-[#84ACF8] flex flex-col items-center justify-center py-10 px-6 text-center text-white">
            <img
                src={testimonials[index].image}
                alt={testimonials[index].name}
                className="w-20 h-20 rounded-full mx-auto object-cover border-4 border-white"
            />
            <h3 className="mt-4 font-semibold text-black">{testimonials[index].name}</h3>
            <p className="text-sm text-black">{testimonials[index].age}, {testimonials[index].role}</p>
            <p className="mt-4 text-black max-w-xl mx-auto italic">
                {testimonials[index].text}
            </p>

            {/* Dots Indicator */}
            <div className="flex justify-center mt-6 space-x-2">
                {testimonials.map((_, i) => (
                    <button
                        key={i}
                        onClick={() => handleSelect(i)}
                        className={`h-2 rounded-full transition-all duration-300 ${index === i ? 'w-6 bg-[#2C448C]' : 'w-3 bg-blue-200'
                            }`}
                    />
                ))}
            </div>
        </div>
    );
}
