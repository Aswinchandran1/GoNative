import React, { useState } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";

const AddDate = () => {
  const [selectedDates, setSelectedDates] = useState([]);

  // Sample booked dates (these would usually come from a database)
  const bookedDates = [
    new Date(2025, 2, 5), // March 5, 2025
    new Date(2025, 2, 10), // March 10, 2025
    new Date(2025, 2, 15), // March 15, 2025
  ];

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-xl shadow-black">
      <h2 className="text-xl font-semibold text-center mb-4">Select Dates</h2>

      <div className="flex flex-col md:flex-row justify-center gap-4">
        <DayPicker
          mode="multiple"
          selected={selectedDates}
          onSelect={setSelectedDates}
          disabled={{ before: new Date() }} // Disable past dates
          modifiers={{ booked: bookedDates }} // Highlight booked dates
          modifiersClassNames={{
            booked: "bg-red-500 text-white rounded-full", // Styling for booked dates
          }}
          numberOfMonths={2} // Show current + next month together
          pagedNavigation // Allow moving forward
          className="shadow-md shadow-black rounded-lg p-2"
        />
      </div>

      {selectedDates.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-4 justify-center">
          {selectedDates.map((date, index) => (
            <span key={index} className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm">
              {date.toLocaleDateString()}
            </span>
          ))}
        </div>
      )}
      <div className="mt-6 flex justify-center">
        <button className=" px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition">Save Dates</button>
      </div>
    </div>
  );
};

export default AddDate;
