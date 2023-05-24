import React, { useState } from "react";
import Modal from "react-modal";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    borderRadius:"4%",
    transform: "translate(-50%, -50%)",
  },
};
const PreviewDetails = ({modalIsOpen,closeModal,details}) => {
  console.log(details)
   
  return (
    <div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <div className="flex justify-center items-center flex-col w-96 space-y-6">
          <h2 className="text-xl font-semibold">Preview Details</h2>
          <div className="flex flex-col items-start w-full space-y-6 mt-8">
           <div className="flex flex-col items-start space-y-2 w-full">
            <label className="text-gray-600 font-medium">Organization Name</label>
            <input type="text" className="min-w-full border-2 rounded p-1.5 shadow-lg border-blue-600 focus:outline-none text-gray-800 font-medium" value={details.orgName} readOnly/>
           </div>


           <div className="flex flex-col items-start space-y-2 w-full">
            <label className="text-gray-600 font-medium">Location</label>
            <input type="text" className="min-w-full border-2 rounded p-1.5 shadow-lg border-blue-600 focus:outline-none text-gray-800 font-medium" value={details.loc} readOnly/>
           </div>

           <div className="flex flex-col items-start space-y-2 w-full">
            <label className="text-gray-600 font-medium">Email Address</label>
            <input type="text" className="min-w-full border-2 rounded p-1.5 border-blue-600 focus:outline-none text-gray-800 font-medium shadow-lg" value={details.email} readOnly/>
           </div>
          </div>


        </div>
      </Modal>
    </div>
  );
};

export default PreviewDetails;
