import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import getContractInstance from "../ContractInstance";
import Sidebar from "./Sidebar/Sidebar";
import { RingSpinnerOverlay } from "react-spinner-overlay";
import Approval from "./Modals/Approval";
import { HiDownload } from "react-icons/hi";
import { TiTickOutline, TiCancelOutline } from "react-icons/ti";
import { toast } from "react-toastify";
import PreviewDetails from "./Modals/PreviewDetails";
import { useNavigate } from "react-router-dom";

const GovernmentPending = () => {
  const [hashfile, setHashFile] = useState(false);
  const contractInstance = getContractInstance();
  const [Loader, setLoader] = useState(false);
  const [index, setIndex] = useState(0);
  const [details, setDetails] = useState();
  const [isPreview, setIspreview] = useState(false);
  const [allApplications,setAllApplications]=useState(false)
  const navigate=useNavigate()

  const [modalIsOpen, setIsOpen] = useState(false);

  async function handlepreviewDetails(address) {
    setLoader(true);
    await contractInstance.functions.getUsers().then((res) => {
      const newArr = res[0].filter(
        (item) =>
          item.wallet.toString().toLowerCase() ===
          address.toString().toLowerCase()
      );
      setDetails(newArr[0]);
      setLoader(false);
    });
    setIspreview(true);
  }

  function closeModal() {
    setIsOpen(false);
    setIspreview(false);
  }

  useEffect(() => {
    getData();
    verifySignature();
  }, []);

  async function verifySignature() {
    let privateKey = process.env.REACT_APP_PRIVATE_GOVT;
    let wallet = new ethers.Wallet(privateKey);
    let messageHash = ethers.utils.id("Government");
    let messageHashBytes = ethers.utils.arrayify(messageHash);
    let flatSig = await wallet.signMessage(messageHashBytes);
    let sig = ethers.utils.splitSignature(flatSig);
    console.log(sig);

    const addressReturn = await contractInstance.functions.VerifyMessage(
      messageHash,
      sig.v,
      sig.r,
      sig.s
    );
    if (wallet.address.toLowerCase() === addressReturn.toString().toLowerCase())
      return true;
    else return false;
  }

  async function getData() {
    await contractInstance.functions.getApplicationInfo().then((res) => {
      setAllApplications(res[0])
      let newArr = res[0].filter((item) => {
        return (
          item.Progress === false &&
          item.CoOrdinatorApproved === true &&
          item.GovernmentApproved === false
        );
      });
      console.log(newArr);
      setHashFile(newArr);
    });
  }

  const getIndex=(appID)=>{
    const getID=hexToDecimal(appID._hex)
    const indexValue=allApplications.findIndex(item=>(hexToDecimal(item.applicationID._hex))===getID)
    return indexValue
  }

  const hexToDecimal = (hex) => parseInt(hex, 16);

  async function handleApproval(appID, comment) {
    const index=getIndex(appID)
    setLoader(true);
    if ((await verifySignature()) === true)
      await contractInstance.functions
        .setGovernmentApproval(index, true, comment)
        .then((res) => {
          toast.success(
            "Application has been approved and added to approved section",
            {
              position: "bottom-center",
              autoClose: 5000,
              theme: "dark",
            }
          );
        })
        .catch((error) => {
          setLoader(false);
          toast.error(error.message, {
            position: "bottom-center",
            autoClose: 5000,
            theme: "dark",
          });
        });
    else {
      setLoader(false);
      toast.error("Digital Signature not matched", {
        position: "bottom-center",
        autoClose: 5000,
        theme: "dark",
      });
    }

    setLoader(false);
  }
  async function handleCancellation(appID) {
    const index=getIndex(appID)
    console.log(index)
    if ((await verifySignature()) === true)
      await contractInstance.functions
        .setGovernmentApproval(index, false,"")
        .then((res) => {
          toast
            .success("Application has been rejected", {
              position: "bottom-center",
              autoClose: 5000,
              theme: "dark",
            })
            .catch((error) => {
              setLoader(false);
              toast.error(error.message, {
                position: "bottom-center",
                autoClose: 5000,
                theme: "dark",
              });
            });
        });
    else {
      setLoader(false);
      toast.error("Digital Signature not matched", {
        position: "bottom-center",
        autoClose: 5000,
        theme: "dark",
      });
    }
  }

  return (
    <>
      {modalIsOpen && (
        <Approval
          modalIsOpen={modalIsOpen}
          closeModal={closeModal}
          index={index}
          handleApproval={handleApproval}
        />
      )}
      {isPreview && (
        <PreviewDetails
          modalIsOpen={isPreview}
          closeModal={closeModal}
          details={details}
        />
      )}
      {Loader && <RingSpinnerOverlay loading={Loader} color="blue" />}
      <Sidebar />

      <div className="flex flex-col items-center  justify-center mx-80 mt-20 mb-12">
        <h2 className="text-2xl font-semibold text-white">Pending Applications</h2>
      </div>
      <div className="flex flex-col items-start justify-center mx-80 mb-20 gap-y-4 w-4/6">
        {hashfile.length > 0 ? (
          <div>
            <ul className="flex w-full gap-x-20 text-sm font-medium text-gray-900 ">
              {hashfile.map((application, index) => (
                <div className="flex w-full py-3 px-3 bg-black  rounded-xl shadow">
                  <div className="flex flex-col space-y-4 w-full">
                    <div className="flex justify-center border-b-2 border-gray-200 pb-2">
                      <p className="text-white">Application #{hexToDecimal(application.applicationID)}</p>
                    </div>
                    <div className="flex justify-center gap-x-2">
                      <p className="text-white">Status </p>
                      <p className="text-sm text-gray-400">Pending</p>
                    </div>
                    <div className="flex justify-between gap-x-2 px-4">
                      <button
                        onClick={(e) =>
                          handlepreviewDetails(application.wallet)
                        }
                        className="text-white border-b-2 border-blue-600"
                      >
                        View Details
                      </button>
                      <button
                        className="my-2 bg-transparent text-blue-600 inline-flex items-center justify-center"
                        onClick={(e) =>
                          (window.location.href = `https://ipfs.io/ipfs/${application.hashValue}`)
                        }
                      >
                        <span className="mr-2">Download Application</span>
                        <HiDownload />
                      </button>
                    </div>
                    <div className="flex justify-center gap-x-12">
                    <button
                        className="my-2 bg-transparent text-blue-600 inline-flex items-center justify-center"
                        onClick={(e) =>
                       navigate('/government/fileFormat',  {state:{hash:application.hashValue}})
                        }
                      >
                        <span className="mr-2">Preview Application</span>
                       
                      </button>
                    </div>
                    <div className="flex justify-between gap-x-12 ">
                      <button
                        type="button"
                        onClick={(e) => {
                          setIsOpen(true);
                          setIndex(application.applicationID);
                        }}
                        className="bg-blue-600 text-white py-1 px-2 rounded inline-flex items-center"
                      >
                        <span className="mr-1"> Approve Application</span>
                        <TiTickOutline size={25} />
                      </button>
                      <button
                        type="button"
                        onClick={(e) => handleCancellation(application.applicationID)}
                        className="bg-red-600 text-white px-2 py-1 rounded inline-flex items-center"
                      >
                        <TiCancelOutline size={25} />
                        <span className="ml-1">Cancel Application</span>
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

export default GovernmentPending;
