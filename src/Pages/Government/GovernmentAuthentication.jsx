import React, { useState, useEffect } from "react";
import { RingSpinnerOverlay } from "react-spinner-overlay";
import { toast } from "react-toastify";
import {BsFillPersonFill} from 'react-icons/bs'
import { useNavigate } from "react-router-dom";

const GovernmentAuthentication = () => {
  const history = useNavigate();


  const [Loader, setLoader] = useState(false);

  const connectMetaMask = async () => {
    if (window.ethereum) {
      console.log("Connected to metamask");
     
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      console.log(accounts[0].toLowerCase());
      console.log(process.env.REACT_APP_GOVERNMENT_ADDRESS)
      if (
        accounts[0].toLowerCase() === process.env.REACT_APP_GOVERNMENT_ADDRESS.toLowerCase() ) 
        {
        history("/government/pending");
      } else {
        toast.error("Not authorized", {
          position: "bottom-center",
          autoClose: 5000,
          theme: "dark",
        });
      }
    }
  };

  const handleClick = (e) => {
    e.preventDefault();
    setLoader(true);
    connectMetaMask();
    setTimeout(() => {
      setLoader(false);
    }, 2000);
  };

  return (
    <div>
      {Loader && <RingSpinnerOverlay loading={Loader} color="blue" />}

      <div className='bg-[url("/public/background.png")] bg-no-repeat bg-cover bg-center w-full h-screen p-40'>
        <div className="p-2 max-w-sm  bg-white rounded-lg border border-gray-200 shadow-md sm:p-6 lg:p-8 mx-auto">
          <div className="flex flex-col justify-center items-center mt-6 gap-y-2">
            <button
              onClick={handleClick}
              className="text-white bg-blue-400 hover:bg-blue-400 focus:ring-4 focus:ring-blue-300 font-medium  rounded-lg text-sm py-2 mr-2 inline-flex items-center px-4 shadow-xl"
            >
            <span className="mr-2">SIGN IN AS GOVERNMENT AUTHORITY</span> 
              <BsFillPersonFill/>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GovernmentAuthentication;
