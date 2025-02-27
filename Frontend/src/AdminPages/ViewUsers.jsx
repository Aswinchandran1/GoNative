import React from 'react'

const ViewUsers = () => {
  return (
    <div style={{ minHeight: "73vh" }}>
      <div className="overflow-x-auto p-4">
        <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="py-3 px-6 text-left">Si No</th>
              <th className="py-3 px-6 text-left">Username</th>
              <th className="py-3 px-6 text-left">Email</th>
              <th className="py-3 px-6 text-left">Nationality</th>
              <th className="py-3 px-6 text-left">Phone</th>
            </tr>
          </thead>
          <tbody className="text-gray-700">
            <tr className="border-b">
              <td className="py-3 px-6">1</td>
              <td className="py-3 px-6">JohnDoe</td>
              <td className="py-3 px-6">johndoe@example.com</td>
              <td className="py-3 px-6 ">USA</td>
              <td className="py-3 px-6">5522445577</td>
            </tr>
            <tr className="border-b bg-gray-100">
              <td className="py-3 px-6">2</td>
              <td className="py-3 px-6">JaneSmith</td>
              <td className="py-3 px-6">janesmith@example.com</td>
              <td className="py-3 px-6">UK</td>
              <td className="py-3 px-6">78457542255</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default ViewUsers