import React from "react";
import { FaUsers, FaCalendarCheck, FaBriefcase, FaClipboardList, FaListAlt } from "react-icons/fa";

const AdminDashboard = () => {
  return (
    <section className="flex justify-center items-center p-6" style={{ minHeight: "73vh" }}>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 w-full max-w-6xl">
        {/* Active Users */}
        <div className="flex items-center justify-between p-6 bg-blue-100 text-blue-600 rounded-2xl shadow-md">
          <div>
            <h2 className="text-lg font-semibold">Active Users</h2>
            <p className="text-2xl font-bold">120</p>
          </div>
          <FaUsers className="text-4xl" />
        </div>

        {/* Active Hosts */}
        <div className="flex items-center justify-between p-6 bg-green-100 text-green-600 rounded-2xl shadow-md">
          <div>
            <h2 className="text-lg font-semibold">Active Hosts</h2>
            <p className="text-2xl font-bold">45</p>
          </div>
          <FaBriefcase className="text-4xl" />
        </div>

        {/* Active Experiences */}
        <div className="flex items-center justify-between p-6 bg-yellow-100 text-yellow-600 rounded-2xl shadow-md">
          <div>
            <h2 className="text-lg font-semibold">Active Experiences</h2>
            <p className="text-2xl font-bold">80</p>
          </div>
          <FaListAlt className="text-4xl" />
        </div>

        {/* Total Bookings */}
        <div className="flex items-center justify-between p-6 bg-purple-100 text-purple-600 rounded-2xl shadow-md">
          <div>
            <h2 className="text-lg font-semibold">Total Bookings</h2>
            <p className="text-2xl font-bold">200</p>
          </div>
          <FaCalendarCheck className="text-4xl" />
        </div>

        {/* Pending Host Requests */}
        <div className="flex items-center justify-between p-6 bg-red-100 text-red-600 rounded-2xl shadow-md">
          <div>
            <h2 className="text-lg font-semibold">Pending Host Requests</h2>
            <p className="text-2xl font-bold">5</p>
          </div>
          <FaClipboardList className="text-4xl" />
        </div>
      </div>
    </section>
  );
};

export default AdminDashboard;
