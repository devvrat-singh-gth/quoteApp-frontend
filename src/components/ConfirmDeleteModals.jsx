import React from "react";

const ConfirmDeleteModals = ({ onCancel, onConfirm }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded shadow-lg max-w-sm w-full">
        <h2 className="text-xl font-semibold mb-4 text-red-600">
          DELETE PERMANENTLY?
        </h2>
        <p className="mb-6 text-gray-700">
          Are you sure you want to permanently delete this quote?
        </p>
        <div className="flex justify-end gap-2">
          <button
            onClick={onCancel}
            className="px-4 py-2 border rounded hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Delete Permanently
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDeleteModals;
