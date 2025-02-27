import React, { useState } from "react";
import { Modal, Box, Typography, Button } from "@mui/material";

const ViewHost = () => {
  const [selectedHost, setSelectedHost] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const hosts = [
    {
      id: 1,
      userName: "Jane Smith",
      email: "jane.smith@example.com",
      profilePic: "https://via.placeholder.com/100",
      phone: "+91 9876543210",
      aboutHost: "A passionate traveler and local guide with 7 years of experience."
    },
  ];

  const openModal = (host) => {
    setSelectedHost(host);
    setShowModal(true);
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h2 className="text-3xl font-semibold mb-6 text-center text-gray-800">View Hosts</h2>
      <div className="overflow-hidden rounded-lg shadow-lg">
        <table className="w-full border-collapse">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="p-4 text-left">User Name</th>
              <th className="p-4 text-left">Email</th>
              <th className="p-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {hosts.map((host) => (
              <tr key={host.id} className="hover:bg-gray-100">
                <td className="p-4">{host.userName}</td>
                <td className="p-4">{host.email}</td>
                <td className="p-4 text-center">
                  <button
                    onClick={() => openModal(host)}
                    className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition"
                  >
                    View Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Host Details Modal */}
      <Modal open={showModal} onClose={() => setShowModal(false)}>
        <Box className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-3xl mx-auto mt-20">
          {selectedHost && (
            <>
              <Typography variant="h6" className="mb-4 text-center">Host Details</Typography>
              <div className="flex justify-center items-center">
                <div className="flex flex-col items-center ">
                  <img
                    src={selectedHost.profilePic}
                    alt="Host Profile"
                    className="w-24 h-24 rounded-full border-4 border-blue-400 shadow-lg"
                  />
                  <Typography variant="subtitle1" className="mt-2 font-bold">{selectedHost.userName}</Typography>
                  <Typography className="text-gray-600">📞 {selectedHost.phone}</Typography>
                  <Typography className="text-gray-600">✉️ {selectedHost.email}</Typography>
                </div>
              </div>
              <div className="mt-6 text-center">
                <Typography variant="body1" className="font-semibold">Description About Host:</Typography>
                <Typography className="text-gray-700 bg-gray-100 p-3 rounded-md inline-block max-w-xl">{selectedHost.aboutHost}</Typography>
              </div>
              <div className="mt-6 flex justify-end">
                <Button variant="contained" color="primary" onClick={() => setShowModal(false)}>Close</Button>
              </div>
            </>
          )}
        </Box>
      </Modal>
    </div>
  );
};

export default ViewHost;
