import { useState } from "react";

const UserResponse = () => {
  const [comments, setComments] = useState([
    { _id: "1", text: "This is a great experience!" },
    { _id: "2", text: "Loved the tour, highly recommend it." },
    { _id: "3", text: "The host was amazing and very informative." }
  ]);

  // Delete comment (UI only)
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this comment?")) {
      setComments(comments.filter(comment => comment._id !== id));
    }
  };

  return (
    <div className="p-6 max-w-3xl mx-auto bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">User Comments</h2>
      <ul className="border border-gray-300 p-4 rounded-lg bg-gray-50">
        {comments.length > 0 ? (
          comments.map(comment => (
            <li key={comment._id} className="flex justify-between items-center p-4 mb-2 bg-white shadow-md rounded-lg">
              <span className="text-gray-700 font-medium">{comment.text}</span>
              <button
                onClick={() => handleDelete(comment._id)}
                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition duration-300"
              >
                Delete
              </button>
            </li>
          ))
        ) : (
          <p className="text-gray-500 text-center">No comments available.</p>
        )}
      </ul>
    </div>
  );
};

export default UserResponse;
