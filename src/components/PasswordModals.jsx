import React, { useState } from "react";

const PasswordModal = ({ onClose, onSubmit, error }) => {
  const [inputPassword, setInputPassword] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    onSubmit(inputPassword);
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded shadow-lg max-w-sm w-full">
        <h2 className="text-xl font-semibold mb-4">Enter Password</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="password"
            value={inputPassword}
            onChange={(e) => setInputPassword(e.target.value)}
            className="w-full px-3 py-2 mb-4 border rounded"
            placeholder="Password"
            autoFocus
          />
          {error && <p className="text-red-600 mb-4">{error}</p>}
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border rounded hover:bg-gray-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PasswordModal;
