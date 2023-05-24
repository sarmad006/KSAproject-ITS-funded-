import React, { useEffect, useState } from "react";
import axios from "axios";
import { RingSpinnerOverlay } from "react-spinner-overlay";
import { toast } from "react-toastify";
import { FcDocument } from "react-icons/fc";
import { IoCloseCircleOutline } from "react-icons/io5";
import Papa from "papaparse";
import Sidebar from "../../Components/Sidebar/Sidebar";
import Table from "../../Components/Table/Table";
import { useLocation } from "react-router-dom";


const FileFormat = () => {

  const location=useLocation()
  const [Loader, setLoader] = useState(false);
  const [file, setFile] = useState(false);
  const [tableRows, setTableRows] = useState(false);

  useEffect(()=>{
    axios.get(`https://ipfs.io/ipfs/${location.state.hash}`).then((res)=>{
      console.log(res)
      setFile(res.data)
      handleSubmit(res.data)
    })
  },[])

  //State to store the values
  const [values, setValues] = useState([]);

  const handleSubmit = async (fileObj) => {
    Papa.parse(fileObj, {
        header: true,
        skipEmptyLines: true,
        complete: function (results) {
          console.log(results)
          const rowsArray = [];
          const valuesArray = [];
  
          // Iterating data to get column name and their values
          results.data.map((d) => {
            console.log(d)
            rowsArray.push(Object.keys(d));
            valuesArray.push(Object.values(d));
          })
         
          setTableRows(rowsArray[0]);

        // Filtered Values
        setValues(valuesArray);
       
        },
    });
    
  };

  const ChangeValues=(val)=>{
    console.log(val)
    setValues(val)
  }

  return (
    <>
      {Loader && <RingSpinnerOverlay loading={Loader} color="blue" />}
      <Sidebar />
     
      
     {tableRows && <Table columns={tableRows} data={values} file={file} ChangeValues={ChangeValues}/>}

      

    
    </>
  );
};

export default FileFormat;
