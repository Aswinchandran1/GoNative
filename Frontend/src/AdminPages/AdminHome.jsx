import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { FaHome, FaUserCheck, FaUsers, FaUserTie, FaComments, FaSignOutAlt } from "react-icons/fa";

const AdminHome = () => {
    const navigate = useNavigate();

    // Logout Function
    const handleLogout = () => {
        localStorage.removeItem("adminToken"); // Remove token (if used)
        navigate("/login"); // Redirect to login page
    };

    return (
        <section style={{ paddingTop: '80px', minHeight: "89vh" }}>
            <div className='flex'>

                {/* Sidebar */}
                <aside className='flex flex-col border-r-2 fixed border-gray-200 h-[89vh] w-[17%] bg-white shadow-md'>
                    <div className='mt-10 flex-1'>
                        <NavLink to={"/admin"} end className={({ isActive }) =>
                            `flex items-center p-4 gap-4 text-gray-700 hover:bg-gray-200 transition-all
                            ${isActive ? "bg-blue-100 border-r-4 border-blue-500 text-blue-700 font-semibold" : "border-r border-gray-200"}`}>
                            <FaHome className="text-xl" />
                            <p className='text-lg'>Dashboard</p>
                        </NavLink>

                        <NavLink to={"/admin/host-requests"} className={({ isActive }) =>
                            `flex items-center p-4 gap-4 text-gray-700 hover:bg-gray-200 transition-all
                            ${isActive ? "bg-blue-100 border-r-4 border-blue-500 text-blue-700 font-semibold" : "border-r border-gray-200"}`}>
                            <FaUserCheck className="text-xl" />
                            <p className='text-lg'>Approve Hosts</p>
                        </NavLink>

                        <NavLink to={"/admin/view-users"} className={({ isActive }) =>
                            `flex items-center p-4 gap-4 text-gray-700 hover:bg-gray-200 transition-all
                            ${isActive ? "bg-blue-100 border-r-4 border-blue-500 text-blue-700 font-semibold" : "border-r border-gray-200"}`}>
                            <FaUsers className="text-xl" />
                            <p className='text-lg'>All Users</p>
                        </NavLink>

                        <NavLink to={"/admin/view-hosts"} className={({ isActive }) =>
                            `flex items-center p-4 gap-4 text-gray-700 hover:bg-gray-200 transition-all
                            ${isActive ? "bg-blue-100 border-r-4 border-blue-500 text-blue-700 font-semibold" : "border-r border-gray-200"}`}>
                            <FaUserTie className="text-xl" />
                            <p className='text-lg'>All Hosts</p>
                        </NavLink>

                        <NavLink to={"/admin/user-responses"} className={({ isActive }) =>
                            `flex items-center p-4 gap-4 text-gray-700 hover:bg-gray-200 transition-all
                            ${isActive ? "bg-blue-100 border-r-4 border-blue-500 text-blue-700 font-semibold" : "border-r border-gray-200"}`}>
                            <FaComments className="text-xl" />
                            <p className='text-lg'>Manage Comments</p>
                        </NavLink>
                    </div>

                    {/* Logout Button */}
                    <button onClick={handleLogout} className="flex items-center p-4 gap-4 text-red-600 hover:bg-red-100 transition-all">
                        <FaSignOutAlt className="text-xl" />
                        <p className='text-lg'>Logout</p>
                    </button>
                </aside>

                {/* Main Content */}
                <div className='ml-[17%] w-[83%] p-6'>
                    <Outlet />
                </div>
            </div>
        </section>
    );
}

export default AdminHome;
