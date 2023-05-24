import React, { useState } from "react";
import Modal from "react-modal";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    borderRadius: "4%",
    transform: "translate(-50%, -50%)",
  },
};
const InspectionDetails = ({
  modalIsOpen,
  closeModal,
  changeForm,
  setStartDate,
  startDate,
  setInspection,
  formData
}) => {

    
  return (
    <div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <div className="flex justify-center items-center flex-col w-96 space-y-6">
          <h2 className="text-xl font-semibold">Enter Inspection Details</h2>
          <div className="flex flex-col items-start w-full space-y-6 mt-8">
            <div className="flex flex-col items-start space-y-2 w-full">
              <label className="text-gray-600 font-medium">Inspector</label>
              <input
                type="text"
                onChange={changeForm}
                name="name"
                className="min-w-full border-b-2  p-1.5 shadow-lg border-blue-600 focus:outline-none text-gray-800 font-medium"
                placeholder="Inspector Name"
              />
            </div>
            <div className="flex flex-col items-start space-y-2 w-full">
              <label className="text-gray-600 font-medium">
                Date of Inspection
              </label>
              <DatePicker
                selected={startDate}
                onChange={(date) => setStartDate(date)}
              />
            </div>
            <div className="flex flex-col items-start space-y-2 w-full">
              <label className="text-gray-600 font-medium">
                Comments
              </label>
              <textarea
                name="comments"
                onChange={changeForm}
                rows="4"
                className="min-w-full border-b-2  p-1.5 shadow-lg border-blue-600 focus:outline-none text-gray-800 font-medium"
                placeholder="Write your thoughts here..."
              ></textarea>
            </div>
          </div>

          <div className="flex justify-between w-full">
            <button
            onClick={(e)=>setInspection(formData.index,formData.email)}
              type="button"
              className="bg-blue-600 text-white py-2 px-4 shadow-xl rounded"
            >
              Send Inspection email
            </button>
            <button
              onClick={closeModal}
              className="bg-red-600 text-white py-2 px-8 shadow-xl rounded"
            >
              Cancel
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default InspectionDetails;
