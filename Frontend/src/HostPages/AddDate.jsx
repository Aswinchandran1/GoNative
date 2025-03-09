import React, { useEffect, useState } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { addAvilability, getAvailability } from "../Services/allAPI";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddDate = () => {
  const [selectedDates, setSelectedDates] = useState([]);
  const [fetchedDates, setFetchedDates] = useState([]); // Dates fetched from DB

  const bookedDates = [
    new Date(2025, 2, 5),
    new Date(2025, 2, 10),
    new Date(2025, 2, 15),
  ];

  useEffect(() => {
    const fetchSavedDates = async () => {
      const token = sessionStorage.getItem("token");
      if (!token) return;

      const hostData = sessionStorage.getItem("host");
      if (!hostData) return;

      const hostId = JSON.parse(hostData)._id;
      const reqHeader = { Authorization: `Bearer ${token}` };

      try {
        const response = await getAvailability(hostId, reqHeader);
        console.log("Fetched Dates Response:", response); // Debugging

        if (response?.data.dates) {
          const formattedDates = response.data.dates.map((date) => new Date(date));
          console.log("Formatted Dates:", formattedDates);
          setFetchedDates(formattedDates);
        }
      } catch (error) {
        console.error("Error fetching dates:", error);
      }
    };

    fetchSavedDates();
  }, []);

  const handleSaveDates = async () => {
    const token = sessionStorage.getItem("token");
    if (!token) {
      toast.error("No token found. Please log in.");
      return;
    }

    const hostData = sessionStorage.getItem("host");
    if (!hostData) {
      toast.error("No host found. Please log in.");
      return;
    }

    const hostId = JSON.parse(hostData)._id;

    if (selectedDates.length === 0) {
      toast.warn("Please select at least one date.");
      return;
    }

    const reqHeader = {
      Authorization: `Bearer ${token}`,
    };

    try {
      // Convert dates to ISO format and remove duplicates
      const formattedDates = selectedDates.map((date) => date.toISOString());
      await addAvilability(hostId, { dates: formattedDates }, reqHeader);
      toast.success("Dates saved successfully!");

      // Reset selection after saving
      setSelectedDates([]);

      // Refresh fetched dates
      setFetchedDates([...fetchedDates, ...selectedDates]);
    } catch (error) {
      console.error("Error saving dates:", error);
      toast.error("Failed to save dates. Please try again.");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-xl shadow-black">
      <h2 className="text-xl font-semibold text-center mb-4">Select Dates</h2>

      <div className="flex flex-col md:flex-row justify-center gap-4">
        <DayPicker
          mode="multiple"
          selected={selectedDates}
          onSelect={(dates) => {
            if (dates) {
              const uniqueDates = Array.from(new Set(dates.map(date => date.toISOString()))).map(date => new Date(date));
              setSelectedDates(uniqueDates);
            } else {
              setSelectedDates([]);
            }
          }}
          disabled={{ before: new Date() }}
          modifiers={{
            booked: (date) => bookedDates.some(d => d.getTime() === date.getTime()),
            fetched: (date) => fetchedDates.some(d => d.getTime() === date.getTime()), // Fixed
          }}
          modifiersClassNames={{
            booked: "bg-red-500 text-white rounded-full",
            fetched: "bg-green-400 text-white rounded-full", // Styling for fetched dates
          }}
          numberOfMonths={2}
          pagedNavigation
          className="shadow-md shadow-black rounded-lg p-2"
        />
      </div>

      {selectedDates.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-4 justify-center">
          {selectedDates.map((date, index) => (
            <span
              key={index}
              className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm"
            >
              {date.toLocaleDateString()}
            </span>
          ))}
        </div>
      )}

      <div className="mt-6 flex justify-center">
        <button
          onClick={handleSaveDates}
          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
        >
          Save Dates
        </button>
      </div>
      <ToastContainer position="top-right" autoClose={3000} theme="colored" />

      <div className="mt-4 flex flex-wrap justify-center gap-4">
        <div className="flex items-center gap-2">
          <span className="w-4 h-4 bg-blue-500 rounded-full inline-block"></span>
          <span>Selected Dates</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-4 h-4 bg-green-400 rounded-full inline-block"></span>
          <span>Previously Saved</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-4 h-4 bg-red-500 rounded-full inline-block"></span>
          <span>Booked Dates</span>
        </div>
      </div>

    </div>
  );
};

export default AddDate;
