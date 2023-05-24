import React, { useState } from "react";
import axios from "axios";
import { RingSpinnerOverlay } from "react-spinner-overlay";
import { toast } from "react-toastify";
import { FcDocument } from "react-icons/fc";
import { IoCloseCircleOutline } from "react-icons/io5";
import Sidebar from "./Sidebar/Sidebar";
import getContractInstance from "../ContractInstance";
import Template from "./Modals/Template";

const FileInput = () => {
  const contractInstance = getContractInstance();
  const [Loader, setLoader] = useState(false);
  const [file, setFile] = useState(false);
  const [TransportID, setTransportId] = useState(false);
  const API_KEY = "3a4539e4c87e1b8d2ca1";
  const API_SECRET =
    "030133f4c5c98c7baca0f01db46311a8badcd6d0f6ba47134ea50853308bd22c";

  const handleSubmit = async (e) => {
    setLoader(true);
    const formData = new FormData();
    formData.append("file", file);

    const resFile = await axios({
      method: "post",
      url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
      data: formData,
      headers: {
        pinata_api_key: `${API_KEY}`,
        pinata_secret_api_key: `${API_SECRET}`,
        "Content-Type": "multipart/form-data",
      },
    });
    const ImgHash = resFile.data.IpfsHash;
    console.log("it is here");
    console.log(contractInstance);

    await contractInstance.functions
      .storeApplication(ImgHash)
      .then((res) => console.log(res));

    setTimeout(() => {
      setLoader(false);
      setTransportId("");
      setFile(false);
      toast.success("Your application has been submitted", {
        position: "bottom-center",
        autoClose: 5000,
        theme: "dark",
      });
    }, 2000);
  };

  const [modalIsOpen, setIsOpen] = useState(true);

  function openModal() {
    setIsOpen(true);

  }

  function closeModal() {
    setIsOpen(false);
  }

  const handleChange = (e) => {
    setFile(e.target.files[0]);
    console.log(e.target.files[0]);
  };
  return (
    <>
      {modalIsOpen && <Template modalIsOpen={modalIsOpen} closeModal={closeModal}/>}
      {Loader && <RingSpinnerOverlay loading={Loader} color="blue" />}
      <Sidebar />
      <div className="flex flex-col items-center justify-center mx-80 my-20 gap-y-4 ">
        {file ? (
          <button className="flex flex-col items-center mt-20">
            <FcDocument size="100px" />
            <span className="flex gap-x-2 text-white">
              {file.name}
              <IoCloseCircleOutline
                style={{ marginTop: "4px" }}
                size="16px"
                color="blue"
                onClick={(e) => setFile(false)}
              />
            </span>
          </button>
        ) : (
          <label
            htmlFor="dropzone-file"
            className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50  hover:bg-gray-100 shadow-2xl"
          >
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <svg
                aria-hidden="true"
                className="w-10 h-10 mb-3 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                ></path>
              </svg>
              <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                <span className="font-semibold">Click to upload</span> or drag
                and drop
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                CSV(Max : 5 MB)
              </p>
            </div>

            <input
              id="dropzone-file"
              type="file"
              accept=".csv"
              className="hidden"
              onChange={handleChange}
            />
          </label>
        )}
        <button
          onClick={handleSubmit}
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 shadow-xl focus:outline-none"
        >
          Upload Application
        </button>
      </div>
    </>
  );
};

export default FileInput;
