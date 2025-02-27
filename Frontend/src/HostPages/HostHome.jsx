import { NavLink, Outlet } from "react-router-dom";
import { FaHome, FaCalendarPlus, FaClipboardList, FaEdit, FaUser } from "react-icons/fa";

const HostHome = () => {
    return (
        <section style={{ paddingTop: '80px', minHeight: "89vh" }}>
            <div className='flex'>

                {/* Sidebar */}
                <aside className='flex flex-col border-r-2 fixed border-gray-200 h-[89vh] w-[17%] bg-white shadow-md'>
                    <div className='mt-10'>

                        <NavLink to={"/host"} end
                            className={({ isActive }) =>
                                `flex items-center p-4 gap-4 text-gray-700 hover:bg-gray-200 transition-all
                                ${isActive ? "bg-blue-100 border-r-4 border-blue-500 text-blue-700 font-semibold" : "border-r border-gray-200"}`
                            }>
                            <FaHome className="text-xl" />
                            <p className='text-lg'>Dashboard</p>
                        </NavLink>

                        <NavLink to={"/host/add-date"}
                            className={({ isActive }) =>
                                `flex items-center p-4 gap-4 text-gray-700 hover:bg-gray-200 transition-all
                                ${isActive ? "bg-blue-100 border-r-4 border-blue-500 text-blue-700 font-semibold" : "border-r border-gray-200"}`
                            }>
                            <FaCalendarPlus className="text-xl" />
                            <p className='text-lg'>Add Dates</p>
                        </NavLink>

                        <NavLink to={"/host/view-booking"}
                            className={({ isActive }) =>
                                `flex items-center p-4 gap-4 text-gray-700 hover:bg-gray-200 transition-all
                                ${isActive ? "bg-blue-100 border-r-4 border-blue-500 text-blue-700 font-semibold" : "border-r border-gray-200"}`
                            }>
                            <FaClipboardList className="text-xl" />
                            <p className='text-lg'>Bookings</p>
                        </NavLink>

                        <NavLink to={"/host/manage-experience"}
                            className={({ isActive }) =>
                                `flex items-center p-4 gap-4 text-gray-700 hover:bg-gray-200 transition-all
                                ${isActive ? "bg-blue-100 border-r-4 border-blue-500 text-blue-700 font-semibold" : "border-r border-gray-200"}`
                            }>
                            <FaEdit className="text-xl" />
                            <p className='text-lg'>Edit Experience</p>
                        </NavLink>

                        <NavLink to={"/host/host-profile"}
                            className={({ isActive }) =>
                                `flex items-center p-4 gap-4 text-gray-700 hover:bg-gray-200 transition-all
                                ${isActive ? "bg-blue-100 border-r-4 border-blue-500 text-blue-700 font-semibold" : "border-r border-gray-200"}`
                            }>
                            <FaUser className="text-xl" />
                            <p className='text-lg'>Profile</p>
                        </NavLink>

                    </div>
                </aside>

                {/* Main Content */}
                <div className='ml-[17%] w-[83%] p-6'>
                    <Outlet />
                </div>
            </div>
        </section>
    );
}

export default HostHome;
