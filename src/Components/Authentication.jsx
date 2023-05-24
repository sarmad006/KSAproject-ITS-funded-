import React,{useState} from 'react'
import { RingSpinnerOverlay } from 'react-spinner-overlay';
import { toast } from 'react-toastify'



import {useNavigate} from 'react-router-dom'

const Authentication = () => {

  const history=useNavigate()


  
    const allowedAccounts={
        "government":"0x03d913b5e6f54062AEd8fe2a8981F8599CDf17EF",
        "coordinator" : "0x86f347fbA6b2D780C19Df8F4C619f514842b9b81",
        "user" : "0x75C699d11b7Df6b7B42118819aCc306D11ffC874"
      }
      const [Loader,setLoader]=useState(false);
    
      
      const connectMetaMask=async(role)=>{
        console.log(role);
        if(window.ethereum){
          console.log("Connected to metamask")
         const chainId= await window.ethereum.request({method:'eth_chainId'})
          const ganacheChainId="0x539";
          if(chainId!==ganacheChainId)
          {
            return;
          }
          else{
            console.log("Connected to ganache");
          }
          const accounts= await window.ethereum.request({method:"eth_requestAccounts"})
          console.log(accounts);
          console.log(role);
          if(role==="government" && accounts[0].toLowerCase()===allowedAccounts.government.toLowerCase())
          {
            
            history('/government')
          }
          else if(role==="coordinator" &&  accounts[0].toLowerCase()===allowedAccounts.coordinator.toLowerCase())
          {
            history('/coordinator')
          }
          else if(role==="user" && accounts[0].toLowerCase()===allowedAccounts.user.toLowerCase())
          {
            history('/user')
          }
          else
          {
            toast.error("Not authorized",{position: "bottom-center",
            autoClose: 5000,
            theme:"dark"
          })

          }
        } 
      }
    
      const handleClick=(e,role)=>{
         e.preventDefault();
         setLoader(true)
         connectMetaMask(role);
         setTimeout(()=>{
          setLoader(false)
         },2000)
        
      }
     
  return (
    <div>
        {Loader && <RingSpinnerOverlay  loading={Loader} color="blue"/>}
       
        
        <div className='bg-[url("/public/background.png")] bg-no-repeat bg-cover bg-center w-full h-screen p-40'>
        <div className="p-2 max-w-sm  bg-white rounded-lg border border-gray-200 shadow-md sm:p-6 lg:p-8 mx-auto">
        <p className="text-lg  border-b-2 border-blue-400 w-1/4 pb-2 font-semibold">Sign In</p>
        <div className='flex flex-col justify-center items-center mt-6 gap-y-2'>
          <button onClick={(e)=>handleClick(e,"user")} className='text-white bg-blue-400 hover:bg-blue-400 shadow-md focus:ring-4 focus:ring-blue-300 font-medium w-2/4 rounded-lg text-sm py-2 mr-2 '>Bus Consultant</button>
          <button onClick={(e)=>handleClick(e,"coordinator")}className='text-white bg-blue-400 hover:bg-blue-400 shadow-md focus:ring-4 focus:ring-blue-300 font-medium w-2/4 rounded-lg text-sm py-2 mr-2 '>Co-ordinator</button>
          <button onClick={(e)=>handleClick(e,"government")}className='text-white bg-blue-400 hover:bg-blue-400 shadow-md focus:ring-4 focus:ring-blue-300 font-medium w-2/4 rounded-lg text-sm py-2 mr-2 '>Government Authority</button>
        </div>
            </div>
        </div>
        
    </div>
  )
}

export default Authentication