import React, { useState } from "react";
import Modal from "react-modal";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};
const Approval = ({modalIsOpen,closeModal,handleApproval,index}) => {
 
    const [comment,setComment]=useState("");

   const handleChange=(e)=>{
    setComment(e.target.value)
   }
  return (
    <div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <div className="flex justify-center items-center flex-col w-96 space-y-6">
          <h2 className="text-xl font-semibold">Approve Application</h2>
          <form className="w-full">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Your Comment
            </label>
            <textarea
              onChange={handleChange}
              rows="4"
              className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg focus:outline-none"
              placeholder="Write your thoughts here..."
            ></textarea>
          </form>
          <div className="flex justify-between w-full">
            <button type="button" onClick={(e)=>handleApproval(index,comment)} className="bg-blue-600 text-white py-2 px-4 shadow-xl rounded">Approve and Comment</button>
            <button onClick={closeModal} className="bg-red-600 text-white py-2 px-8 shadow-xl rounded">Cancel</button>
        </div>
        </div>
      </Modal>
    </div>
  );
};

export default Approval;
