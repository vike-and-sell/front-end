import { Outlet } from "react-router-dom"

export default function Home() {

    return(
        <body className="">
            <div className="">
                <Outlet></Outlet>
            </div>
        </body>
    )
}