import React, { useState } from "react";
import { Modal, Box, Typography, Button } from "@mui/material";

const HostReq = () => {
  const [selectedHost, setSelectedHost] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const hostRequests = [
    {
      id: 1,
      hostName: "John Doe",
      experienceName: "Sunset Kayaking Tour",
      profilePic: "https://via.placeholder.com/100",
      userName: "John Doe",
      phone: "+91 9876543210",
      aboutHost: "An adventure lover with 5 years of experience in water sports.",
      title: "Sunset Kayaking Tour",
      location: "Goa, India",
      googleMapLink: "https://goo.gl/maps/example",
      additionalServices: "Snacks, Photography",
      price: "₹1,200 per person",
      category: "Adventure",
      description: "Experience the stunning sunset while kayaking through the serene waters of Goa."
    },
  ];

  const openModal = (host) => {
    setSelectedHost(host);
    setShowModal(true);
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h2 className="text-3xl font-semibold mb-6 text-center text-gray-800">Approve Host Requests</h2>
      <div className="overflow-hidden rounded-lg shadow-lg">
        <table className="w-full border-collapse">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="p-4 text-left">Host Name</th>
              <th className="p-4 text-left">Experience Name</th>
              <th className="p-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {hostRequests.map((host) => (
              <tr key={host.id} className="hover:bg-gray-100">
                <td className="p-4">{host.hostName}</td>
                <td className="p-4">{host.experienceName}</td>
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
              <div className="grid grid-cols-2 gap-6">
                <div className="flex flex-col items-center">
                  <img
                    src={selectedHost.profilePic}
                    alt="Host Profile"
                    className="w-24 h-24 rounded-full border-4 border-blue-400 shadow-lg"
                  />
                  <Typography variant="subtitle1" className="mt-2 font-bold">{selectedHost.userName}</Typography>
                  <Typography className="text-gray-600">📞 {selectedHost.phone}</Typography>
                </div>
                <div>
                  <Typography><strong>About Host:</strong> {selectedHost.aboutHost}</Typography>
                  <Typography><strong>Experience Title:</strong> {selectedHost.title}</Typography>
                  <Typography><strong>Category:</strong> {selectedHost.category}</Typography>
                  <Typography><strong>Location:</strong> {selectedHost.location}</Typography>
                  <Typography><strong>Additional Services:</strong> {selectedHost.additionalServices}</Typography>
                  <Typography><strong>Price per Person:</strong> {selectedHost.price}</Typography>
                  <Typography>
                    <strong>Google Map Location:</strong>{" "}
                    <a href={selectedHost.googleMapLink} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">
                      View on Map
                    </a>
                  </Typography>
                </div>
              </div>
              <div className="mt-6">
                <Typography variant="body1" className="font-semibold">Description:</Typography>
                <Typography className="text-gray-700 bg-gray-100 p-3 rounded-md">{selectedHost.description}</Typography>
              </div>
              <div className="mt-6 flex justify-between">
                <Button variant="contained" color="success" onClick={() => setShowModal(false)}>Approve</Button>
                <Button variant="contained" color="error" onClick={() => setShowModal(false)}>Reject</Button>
              </div>
            </>
          )}
        </Box>
      </Modal>
    </div>
  );
};

export default HostReq;
