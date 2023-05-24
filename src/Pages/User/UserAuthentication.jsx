import React, { useState, useEffect } from "react";
import { RingSpinnerOverlay } from "react-spinner-overlay";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import {AiOutlineLogin} from 'react-icons/ai'
import getContractInstance from "../../ContractInstance";

const UserAuthentication = () => {
  const history = useNavigate();
  const [PendingUsers,setPendingUsers]=useState(false)
  const [Loader, setLoader] = useState(false);
  const contractInstance=getContractInstance()

  
  useEffect(() => {
    async function getData() {
        await contractInstance.functions.getUsers().then((res) => {
          console.log(res[0])
          setPendingUsers(res[0])
        });
      }
    getData();
    
  }, []);

  const checkAuthentication=(address)=>{
    console.log(PendingUsers)
    const newArr=PendingUsers.filter((item)=> item.status===true && item.wallet.toLowerCase()===address.toLowerCase())
    return newArr.length
  }

  const connectMetaMask = async () => {
    if (window.ethereum) {
      console.log("Connected to metamask");
      const chainId = await window.ethereum.request({ method: "eth_chainId" });
      const ganacheChainId = "0x539";
      if (chainId !== ganacheChainId) {
        return;
      } else {
        console.log("Connected to ganache");
      }
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      console.log(accounts);
    const boolVal=checkAuthentication(accounts[0])
      if (boolVal) {
        toast.success("Permission Granted", {
          position: "bottom-center",
          autoClose: 5000,
          theme: "dark",
        });
        history("/user");
      } else {
        toast.error("Permission Denied", {
          position: "bottom-center",
          autoClose: 10000,
          theme: "dark",
        });
      }
    }
  };

  const handleClick = async(e) => {
    e.preventDefault();
    setLoader(true);
   await connectMetaMask();
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
             <span className="mr-3"> SIGN IN AS BUS CONSULTANT</span>
              <AiOutlineLogin/>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserAuthentication;
