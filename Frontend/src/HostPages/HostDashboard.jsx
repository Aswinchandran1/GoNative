import React from "react";
import { FaCalendarCheck, FaMoneyBillWave, FaChartLine, FaUsers } from "react-icons/fa";

const HostDashboard = () => {
  return (
    <section className="flex justify-center items-center p-6" style={{ minHeight: "73vh" }}>
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-6 w-full max-w-4xl">
        {/* Total Bookings */}
        <div className="flex items-center justify-between p-6 bg-blue-100 text-blue-600 rounded-2xl shadow-md">
          <div>
            <h2 className="text-lg font-semibold">Total Bookings</h2>
            <p className="text-2xl font-bold">2</p>
          </div>
          <FaCalendarCheck className="text-4xl" />
        </div>
        {/* Earnings This Month */}
        <div className="flex items-center justify-between p-6 bg-green-100 text-green-600 rounded-2xl shadow-md">
          <div>
            <h2 className="text-lg font-semibold">Earnings This Month</h2>
            <p className="text-2xl font-bold">₹15,000</p>
          </div>
          <FaMoneyBillWave className="text-4xl" />
        </div>
        {/* Total Income */}
        <div className="flex items-center justify-between p-6 bg-yellow-100 text-yellow-600 rounded-2xl shadow-md">
          <div>
            <h2 className="text-lg font-semibold">Total Income</h2>
            <p className="text-2xl font-bold">₹75,000</p>
          </div>
          <FaChartLine className="text-4xl" />
        </div>
        {/* Total Guests Hosted */}
        <div className="flex items-center justify-between p-6 bg-purple-100 text-purple-600 rounded-2xl shadow-md">
          <div>
            <h2 className="text-lg font-semibold">Total Guests Hosted</h2>
            <p className="text-2xl font-bold">50</p>
          </div>
          <FaUsers className="text-4xl" />
        </div>
      </div>
    </section>
  );
};

export default HostDashboard;
