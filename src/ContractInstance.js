import { ethers } from "ethers"
import contractAbi from './contract/Abi.json'
import { contractAddress } from "./contract/contractAddress"

export default function getContractInstance(){
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const signer = provider.getSigner()
    const contractInstance=new ethers.Contract(contractAddress,contractAbi,signer)

    return contractInstance
}

