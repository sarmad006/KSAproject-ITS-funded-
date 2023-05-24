import React, { useEffect, useState } from "react";
import getContractInstance from "../../ContractInstance";
import Sidebar from "../../Components/Sidebar/Sidebar";
import { RingSpinnerOverlay } from "react-spinner-overlay";
import {toast} from 'react-toastify'
import axios from "axios";

const PendingUsers = () => {
  const [PendingUsers, setPendingUsers] = useState(false);
  const [allUsers,setAllUsers]=useState([]);
  const [Loader,setLoader]=useState(false)
  const contractInstance = getContractInstance();

  useEffect(() => {
    async function getData() {
        await contractInstance.functions.getUsers().then((res) => {
          console.log(res[0])
          setAllUsers(res[0])
         const newArr=res[0].filter((item)=>item.status===false && item.isOperated===false)
          setPendingUsers(newArr)
        });
      }
    getData();
    
  }, []);

  const getIndex=(userID)=>{
    const getID=hexToDecimal(userID._hex)
    const indexValue=allUsers.findIndex(item=>(hexToDecimal(item.userID._hex))===getID)
    return indexValue
  }

  const hexToDecimal = (hex) => parseInt(hex, 16);
  
  async function handleClick(e,approval,email,userID){
    const index=getIndex(userID)
    setLoader(true)
    e.preventDefault()
    if(approval)
    await axios.post("http://localhost:5000/api/user/verify",{
      email:email
    }).then((response)=>{
      toast.success("Email sent to verified user",{
        position: "bottom-center",
        autoClose: 5000,
        theme: "dark",
     })
    })
    .catch((error)=>{
      console.log(error)
    })
    await contractInstance.functions.approveUser(index,approval).then((res)=>{
     toast.success("updated successfully",{
        position: "bottom-center",
        autoClose: 5000,
        theme: "dark",
     })
    }).catch((error)=>{
        toast.error(error.message,{
            position: "bottom-center",
            autoClose: 5000,
            theme: "dark",
         })
    })
    setLoader(false)
  }

  return (
    <>
     {Loader && <RingSpinnerOverlay loading={Loader} color="blue" />}
      <Sidebar />
      <div className="flex flex-col items-center justify-center mx-80 mt-20 mb-12">
        <h2 className="text-2xl font-semibold text-white">Pending User Requests</h2>
      </div>
      <div className="flex flex-col items-start justify-center mx-80 mb-20 gap-y-4">
        {PendingUsers.length > 0 ? (
          <div>
            <ul className="flex  w-full gap-x-20 ">
              {PendingUsers.map((application, index) => (
                  <div className={`flex w-full py-3 px-3 bg-black  rounded-xl shadow `}>
                  <div className="flex flex-col space-y-4 w-full">
                    <div className="flex justify-center items-center ">
                      <p className=" text-white ">User Request <span className="font-semibold">#{hexToDecimal(application.userID)}</span></p>
                  </div>
                  <div className="flex flex-col space-y-2 bg-grey-200 rounded-lg p-2">
                    <div className="flex gap-x-8 px-2 py-1 rounded-lg  bg-grey-100">
                     <p className=" text-white w-40">Company Name</p>
                     <div className="border-l-2 border-white border-opacity-10 pl-2">
                     <p className=" text-white text-opacity-50 ">{application.orgName}</p>
                     </div>
                    </div>
        
                    <div className="flex gap-x-8 px-2 py-1 rounded-lg  bg-grey-100">
                     <p className=" text-white w-40">Email</p>
                     <div className="border-l-2 border-white border-opacity-10 pl-2">
                     <p className=" text-white text-opacity-50 ">{application.email}</p>
                     </div>
                    </div>
        
                    <div className="flex gap-x-8 px-2 py-1 rounded-lg  bg-grey-100 gap-x-4">
                     <p className=" text-white w-40">Address</p>
                     <div className="border-l-2 border-white border-opacity-10 pl-2">
                     <p className=" text-white text-opacity-50 ">{application.wallet}</p>
                     </div>
                    </div>
                  </div>
                  <div className="flex justify-between px-2 py-1 rounded-lg gap-x-4">
                  <button onClick={(e)=>handleClick(e,true,application.email,application.userID)} className="text-blue-500 border-2 border-blue-500 bg-transparent shadow-2xl py-2.5 px-6 rounded text-sm">Approve Request</button>
                  <button  onClick={(e)=>handleClick(e,false,application.email,application.userID)} className="text-red-500 border-2 border-red-500 bg-transparent shadow-2xl py-2.5 px-6 rounded text-sm">Cancel Request</button>
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

export default PendingUsers;
