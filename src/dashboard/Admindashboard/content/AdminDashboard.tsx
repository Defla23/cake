import { Outlet } from "react-router"
import Navbar from "../../../components/nav/Navbar"
import { AdminDrawer } from "../aside/AdminDrawer"
import { IoMdClose } from "react-icons/io";
import { useState } from "react";
import { FaBars } from "react-icons/fa6";

const AdminDashboard = () => {
    const [drawerOpen, setDrawerOpen] = useState(false);

    const handleDrawerToggle = () => {
        setDrawerOpen((prev) => !prev)
    }




    return (
        <div>
            <Navbar />

            {/* bars */}
            <div className="flex px-4 py-4 bg-teal-500 items-center">
                <button className="mr-4 text-white text-2xl lg:hidden" onClick={handleDrawerToggle}>

                    {drawerOpen ? <IoMdClose /> : <FaBars />}


                </button>
                <span className="text-white text-lg font-semibold">
                    Welcome (admin)✨,Cakes Made With Butter, Love & Magic 🎂✨
                </span>

            </div>

            <div className="flex flex-1">
                <aside
                    className={`
                        fixed top-0 z-40 w-64 bg-gray-700
                        ${drawerOpen ? '' : "hidden"}
                        lg:static lg:block lg:w-64
                        `}
                    style={{ minHeight: "100vh" }}
                >
                    <div>
                        <button
                            className="absolute top-4 right-4 text-white text-4xl lg:hidden"
                            onClick={handleDrawerToggle}
                        >
                            <IoMdClose />

                        </button>
                        <AdminDrawer />
                    </div>
                </aside>
                {/*  */}
                <main className="flex-1 bg-gray-400 min-h-screen">
                    { /* TODO what is an outlet */}
                    <Outlet />
                </main>
            </div>
        </div>
    )
}

export default AdminDashboard