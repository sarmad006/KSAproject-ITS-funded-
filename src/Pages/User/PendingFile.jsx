import React, { useEffect, useState } from "react";
import getContractInstance from "../../ContractInstance";
import Sidebar from "../../Components/Sidebar/Sidebar";
import { HiDownload } from "react-icons/hi";
import { ethers } from "ethers";


const PendingFile = () => {
  const [hashfile, setHashFile] = useState(false);
  const contractInstance = getContractInstance();

  useEffect(() => {
    getData();
  }, []);

  async function getData() {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const accounts = await provider.send("eth_requestAccounts", []);
    await contractInstance.functions.getApplicationInfo().then((res) => {
      let newArr = res[0].filter((item) => {
        return (
          item.Progress === true &&
          item.CoOrdinatorApproved === false &&
          item.GovernmentApproved === false &&
          item.wallet.toLowerCase() === accounts[0]
        );
      });
      console.log(newArr);
      setHashFile(newArr);
    });
  }
  return (
    <>
      <Sidebar />
      <div className="flex flex-col items-center justify-center mx-80 mt-20 mb-12">
        <h2 className="text-2xl font-semibold text-white">
          Pending Applications
        </h2>
      </div>
      <div className="flex flex-col items-start justify-center mx-80 mb-20 gap-y-4 w-4/6">
        {hashfile.length > 0 ? (
          <div>
            <ul className="flex w-full gap-x-20 text-sm font-medium text-gray-900 ">
              {hashfile.map((application, index) => (
                <div className="flex w-full py-3 px-3 bg-black  rounded-xl shadow ">
                  <div className="flex flex-col space-y-4 w-full">
                    <div className="flex justify-center items-center ">
                      <p className=" text-white">Application #{index + 1}</p>
                    </div>
                    <div className="flex flex-col space-y-2 bg-grey-200 rounded-lg p-2">
                      <div className="flex gap-x-8 px-2 py-1 rounded-lg  bg-grey-100">
                        <p className=" text-white w-40">Submitted by</p>
                        <div className="border-l-2 border-white border-opacity-10 pl-2">
                          <p className=" text-white text-opacity-50 ">Me</p>
                        </div>
                      </div>

                      <div className="flex gap-x-8 px-2 py-1 rounded-lg  bg-grey-100">
                        <p className=" text-white w-40">Status</p>
                        <div className="border-l-2 border-white border-opacity-10 pl-2">
                          <p className=" text-white text-opacity-50 ">
                            Pending
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-center px-2  rounded-lg">
                      <button
                        onClick={() =>
                          (window.location.href = `https://ipfs.io/ipfs/${application.hashValue}`)
                        }
                        className="text-blue-500 border-2 border-blue-500 bg-transparent shadow-2xl py-2.5 px-6 rounded text-sm inline-flex justify-center gap-x-2 items-center"
                      >
                        Download Application
                        <HiDownload fontSize={16} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </ul>
          </div>
        ) : (
          <p className="text-center text-white">No File exists</p>
        )}
      </div>
    </>
  );
};

export default PendingFile;
