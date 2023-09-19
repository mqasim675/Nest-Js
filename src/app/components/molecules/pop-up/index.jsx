// NewRecordForm.js
import React, { useState, useEffect } from "react";

function NewRecordForm({ onSave, onClose, recordToEdit }) {
  const [formData, setFormData] = useState({
    userId: "",
    title: "",
    body: "",
  });

  useEffect(() => {
    if (recordToEdit) {
      setFormData({
        userId: recordToEdit.userId,
        title: recordToEdit.title,
        body: recordToEdit.body,
      });
    } else {
      setFormData({
        userId: "",
        title: "",
        body: "",
      });
    }
  }, [recordToEdit]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSave = () => {
    // Validate form fields (you can add more validation logic here)
    if (formData.userId && formData.title && formData.body) {
      // Call the onSave callback to save the new record or update the existing one
      onSave(formData, recordToEdit);
      // Clear the form fields
      setFormData({
        userId: "",
        title: "",
        body: "",
      });
      // Close the pop-up form
      onClose();
    } else {
      alert("Please fill in all fields.");
    }
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center z-50 bg-gray-700">
      <div className="bg-gray-300 p-8 rounded-lg w-full sm:w-96">
        <h2 className="text-xl font-semibold mb-4">
          {recordToEdit ? "Edit Record" : "Create New Record"}
        </h2>
        <div className="mb-4">
          <label
            htmlFor="userId"
            className="block text-sm font-medium text-gray-700"
          >
            User ID:
          </label>
          <input
            type="number"
            id="userId"
            name="userId"
            value={formData.userId}
            onChange={handleInputChange}
            className="w-full px-3 py-2 mt-1 border rounded-md focus:ring-indigo-500 focus:border-indigo-500 text-black"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700"
          >
            Title:
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            className="w-full px-3 py-2 mt-1 border rounded-md focus:ring-indigo-500 focus:border-indigo-500 text-black"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="body"
            className="block text-sm font-medium text-gray-700"
          >
            Body:
          </label>
          <textarea
            id="body"
            name="body"
            value={formData.body}
            onChange={handleInputChange}
            className="w-full px-3 py-2 mt-1 border rounded-md focus:ring-indigo-500 focus:border-indigo-500 text-black"
          />
        </div>
        <div className="flex justify-end">
          <button
            onClick={handleSave}
            className="px-4 py-2 mr-2 text-white bg-indigo-600 rounded hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            {recordToEdit ? "Update" : "Save"}
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-700 bg-gray-300 rounded hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default NewRecordForm;
