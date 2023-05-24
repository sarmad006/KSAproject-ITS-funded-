import React, { useState } from "react";
import Modal from "react-modal";
import {AiOutlineDownload} from 'react-icons/ai'
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
const Template = ({ modalIsOpen, closeModal }) => {
  return (
    <div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <div className="flex justify-center items-center flex-col w-96 space-y-4">
          <h2 className="text-xl font-semibold">Download Template</h2>
          <p className="font-semibold">
            Note :
            <span className="text-gray-400">
              {" "}
              Kindly Download this template as our administration will be
              covering only those applications which follow this template
            </span>
          </p>
          <button
            onClick={() =>
              (window.location.href = "https://ipfs.io/ipfs/QmdfF6V1h52kSzno2nkxWfHUqXVGAUUX9LvKQ2nUpPzwvf")
            }
            className="text-white px-4 py-1.5 shadow-lg rounded bg-blue-600 font-medium inline-flex items-center"
          >
            <span className="mr-3">Download Template</span>
            <AiOutlineDownload/>
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default Template;
