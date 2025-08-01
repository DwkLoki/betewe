import { Outlet } from "react-router-dom"

export default function QuestionLayout() {
    return (
        <section className="font-roboto">
            <Outlet />
        </section>
    )
}