import React, { useState, useEffect } from "react";
import { RingSpinnerOverlay } from "react-spinner-overlay";
import { toast } from "react-toastify";
import {BsFillPersonFill} from 'react-icons/bs'
import { useNavigate } from "react-router-dom";

const CoOrdinatorAuthentication = () => {
  const history = useNavigate();

  const allowedAccounts = {
    coordinator: "0x38D2816A3409079cc84e73B18AD8476c59D8d343",
  };
  const [Loader, setLoader] = useState(false);

  const connectMetaMask = async () => {
    if (window.ethereum) {
      console.log("Connected to metamask");
     
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      console.log(accounts);
      if (
        accounts[0].toLowerCase() ===process.env.REACT_APP_COORDINATOR_ADDRESS.toLowerCase()
      ) {
        history("/coordinator/pending");
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
              className="text-white bg-blue-400 hover:bg-blue-400 shadow-xl focus:ring-4 focus:ring-blue-300 font-medium px-4 rounded-lg text-sm py-2 mr-2 inline-flex items-center"
            >
             <span className="mr-3"> SIGN IN AS CO-ORDINATOR</span>
              <BsFillPersonFill/>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoOrdinatorAuthentication;
