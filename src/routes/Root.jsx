import { Outlet } from "react-router-dom"

export default function Root() {
    return (
        <section className="font-roboto">
            <Outlet />
        </section>
    )
}