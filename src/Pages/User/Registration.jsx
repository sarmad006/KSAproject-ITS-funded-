import React, { useState } from "react";
import getContractInstance from "../../ContractInstance";
import { RingSpinnerOverlay } from "react-spinner-overlay";
import { toast } from "react-toastify";

const Registration = () => {
    const [Loader,setLoader]=useState(false)
     const [userForm,setUserForm]=useState({
        email:'',
        address:'',
        org:''
     })
     const handleChange=(e)=>{
        setUserForm({...userForm,[e.target.name]:e.target.value})
     }
     const handleSubmit=async(e)=>{
        setLoader(true)
        e.preventDefault()
        const contract=getContractInstance();
        await contract.registerUser(userForm.email,userForm.address,userForm.org).then((response)=>{
            toast.success("We'll be reviewing you shortly", {
                position: "bottom-center",
                autoClose: 5000,
                theme: "dark",
              }); 
        }).catch((error)=>{
            toast.error(error.message, {
                position: "bottom-center",
                autoClose: 5000,
                theme: "dark",
              });
        })
        setLoader(false)
        setUserForm({
            email:'',
            address:'',
            org:''
         })
     }
  return (
    <>
     {Loader && <RingSpinnerOverlay loading={Loader} color="blue" />}
    <div className='bg-[url("/public/background.png")] bg-no-repeat bg-cover bg-center w-full h-screen p-40'>
      <div className="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 ">
        <form className="space-y-6">
          <h5 className="text-xl font-medium text-gray-900 ">
            Sign up to our platform
          </h5>
          <div>
            <label
              for="email"
              className="block mb-2 text-sm font-medium text-gray-900 "
            >
              Your email
            </label>
            <input
              onChange={handleChange}
              type="email"
              name="email"
              value={userForm.email}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none block w-full p-2.5 "
              placeholder="name@company.com"
              required
            />
          </div>
          <div>
            <label
              for="org"
              className="block mb-2 text-sm font-medium text-gray-900 "
            >
              Your Organization Name
            </label>
            <input
              onChange={handleChange}
              type="text"
              name="org"
              value={userForm.org}
              placeholder="abc@limitedBus"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none block w-full p-2.5"
              required
            />
          </div>
          <div>
            <label
              for="address"
              className="block mb-2 text-sm font-medium text-gray-900 "
            >
              Organization Address
            </label>
            <input
              onChange={handleChange}
              type="text"
              value={userForm.address}
              name="address"
              placeholder="Street 07 xxxx"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none block w-full p-2.5 "
              required
            />
          </div>
          <button
            type="submit"
            onClick={handleSubmit}
            className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
          >
            Register your Company
          </button>
          <div className="text-sm font-medium text-gray-500 ">
            Already registered?{" "}
            <a href="/user/auth" className="text-blue-700 hover:underline ">
              Sign In
            </a>
          </div>
        </form>
      </div>
    </div>
    </>
  );
};

export default Registration;
