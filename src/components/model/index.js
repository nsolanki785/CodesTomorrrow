import React from "react";

const Modal = ({
  title,
  handleChange,
  handleSubmit,
  handleClose,
  editableData = null,
}) => {
  return (
    <>
      {/* Background Overlay */}
      <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-900 opacity-50"></div>

      {/* Modal Box */}
      <div className="fixed z-50 top-1/3 left-1/2 transform -translate-x-1/2 bg-white rounded-lg shadow-lg dark:bg-gray-700 w-1/2">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600 border-gray-200">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
            {title}
          </h3>
          <button
            type="button"
            className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
            onClick={handleClose}
          >
            <svg
              className="w-3 h-3"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 1l6 6m0 0l6 6M7 7l6-6M7 7l-6 6"
              />
            </svg>
            <span className="sr-only">Close modal</span>
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-4 md:p-5 space-y-4">
          <input
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={handleChange}
            value={editableData?.name || ""}
            placeholder={`Enter a ${title} name`}
            type="text"
          />
        </div>

        {/* Modal Footer - Buttons */}
        <div className="flex items-center justify-end p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
          {/* {editableData?.id && (
            <button
              type="button"
              className="text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-500 dark:hover:bg-red-600 dark:focus:ring-red-800"
              onClick={handleDeleteData}
            >
              Delete
            </button>
          )} */}
          <button
            type="button"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 ms-3"
            onClick={handleSubmit}
          >
            Submit
          </button>
          <button
            type="button"
            className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
            onClick={handleClose}
          >
            Cancel
          </button>
        </div>
      </div>
    </>
  );
};

export default Modal;
