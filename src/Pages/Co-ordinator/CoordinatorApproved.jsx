import React, { useEffect, useState } from "react";
import getContractInstance from "../../ContractInstance";
import Sidebar from "../../Components/Sidebar/Sidebar";
import { RingSpinnerOverlay } from "react-spinner-overlay";
import { HiDownload } from "react-icons/hi";
import { IoIosNotificationsOutline } from "react-icons/io";
import { toast } from "react-toastify";
import PreviewDetails from "../../Components/Modals/PreviewDetails";
import InspectionDetails from "../../Components/Modals/InspectionDetails";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CoOrdinatorApproved = () => {
  const [hashfile, setHashFile] = useState(false);
  const contractInstance = getContractInstance();
  const [Loader, setLoader] = useState(false);
  const [details, setDetails] = useState();
  const [isPreview, setIspreview] = useState(false);
  const [isInspection,setInspectionModal]=useState(false)
  const[formData,setFormData]=useState({
    name:'',
    comments:'',
    index:0,
    hash:'',
    email:''
  })
  const [startDate, setStartDate] = useState(new Date());
  const navigate=useNavigate()

  useEffect(() => {
    getData();
  }, []);

  async function getData() {
    await contractInstance.functions.getApplicationInfo().then((res) => {
      let newArr = res[0].filter((item) => {
        return (
          item.Progress === true &&
          item.CoOrdinatorApproved === true &&
          item.GovernmentApproved === true
        );
      });
      console.log(newArr);
      setHashFile(newArr);
    });
  }

  function handleChange(e){
    setFormData({
      ...formData,[e.target.name]:e.target.value
    })
  }

  async function setInspection(index,hash,email) {
    setLoader(true);
    await axios.post("http://localhost:5000/api/sendmail",{
      hash:hash,
      email:email
    }).then((response)=> console.log(response)).catch((error)=>console.log(error))
    await contractInstance.functions.setInspection(true, index).then((res) => {
      toast.success(
        "Notification about the inspection has been sent to the organization",
        {
          position: "bottom-center",
          autoClose: 5000,
          theme: "dark",
        }
      );
      console.log(res);
    });
    setLoader(false);
  }

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
  function closeInpectionModal(){
    setInspectionModal(false)
    setFormData({
      name:'',
      comments:''
    })
    setStartDate(new Date())
  }
 async function openInspectionModal(_index,_hash,address){
  let newArr;
    await contractInstance.functions.getUsers().then((res) => {
      newArr = res[0].filter(
        (item) =>
          item.wallet.toString().toLowerCase() ===
          address.toString().toLowerCase()
      )});
    setFormData({
      ...formData,
      index:_index,
      hash:_hash,
      email:newArr[0].email
    })
    setInspectionModal(true)
  }
  function closeModal() {
    setIspreview(false);
  }


  return (
    <>
      {Loader && <RingSpinnerOverlay loading={Loader} color="blue" />}
      <Sidebar />
      {isPreview && (
        <PreviewDetails
          modalIsOpen={isPreview}
          closeModal={closeModal}
          details={details}
        />
      )}
      {isInspection && (
        <InspectionDetails
        modalIsOpen={isInspection}
        closeModal={closeInpectionModal}
        changeForm={handleChange}
        setStartDate={setStartDate}
        startDate={startDate}
        setInspection={setInspection}
        formData={formData}
        />
      )}
      <div className="flex flex-col items-center  justify-center mx-80 mt-20 mb-12">
        <h2 className="text-2xl font-semibold text-white">
          Approved Applications
        </h2>
      </div>
      <div className="flex flex-col items-start justify-center mx-80 mb-20 gap-y-4 w-4/6">
        {hashfile.length > 0 ? (
          <div>
            <ul className="flex w-full gap-x-20 text-sm font-medium text-gray-900 ">
              {hashfile.map((application, index) => (
                <div className="flex w-full py-3 px-3 bg-black  rounded-xl shadow">
                  <div className="flex flex-col space-y-4 w-full">
                    <div className="flex justify-center border-b-2 border-gray-200 pb-2">
                      <p className="text-white">Application {index + 1}</p>
                    </div>
                    <div className="flex justify-between gap-x-2 border-b-2 border-blue-600 py-1">
                      <p className="text-white">Status </p>
                      <p className="text-sm text-gray-400">Approved</p>
                    </div>
                    <div className="flex justify-between gap-x-2 border-b-2 border-blue-600 py-1">
                      <p className="text-white">Comment </p>
                      <p className="text-sm text-gray-400">
                        {application.Comment}
                      </p>
                    </div>
                    {application.Inspection === true && (
                      <div className="flex justify-between gap-x-2 border-b-2 border-blue-600 py-1">
                        <p className="text-white">Inspection </p>
                        <p className="text-sm text-gray-400">Inspected</p>
                      </div>
                    )}

                    <div className="flex justify-between gap-x-12 px-4">
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
                       navigate('/coordinator/fileFormat',  {state:{hash:application.hashValue}})
                        }
                      >
                        <span className="mr-2">Preview Application</span>
                       
                      </button>
                    </div>
                    {application.Inspection === false && (
                      <div className="flex justify-center">
                        <button
                          onClick={(e) => openInspectionModal(index,application.hashValue,application.wallet)}
                          className="bg-transparent border-2 border-blue-600 p-2 font-medium shadow-xl text-blue-600 rounded-xl inline-flex items-center gap-x-2"
                        >
                          Inspect and Notify
                          <IoIosNotificationsOutline />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </ul>
          </div>
        ) : (
          <p className="text-center">No File exists</p>
        )}
      </div>
    </>
  );
};

export default CoOrdinatorApproved;
