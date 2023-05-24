import React, { useState } from 'react'


const Table = ({columns,data,file,ChangeValues}) => {
    
    const[limit,setLimit]=useState(10)
    const [SearchItems,setSearchedItem]=useState('');
    const [TableData,setTableData]=useState(data);
    const onChange=(e)=>{
        setSearchedItem(e.target.value)
    }
    const handleSearch=(e)=>{
        if(SearchItems.length>0)
        { 
            const temp= data.filter((value) => value.includes(SearchItems))
            ChangeValues(temp)
        }
        else{
            ChangeValues(TableData)
        }
    }
   
  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-20 ml-80 mr-20 bg-white">
        <div className='flex justify-end px-3 py-4 items-center'>

        <div className="relative ">
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer" onClick={handleSearch}>
                <svg className="w-5 h-5 text-blue-400 " ariaHidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd"></path></svg>
            </div>
            <input type="text" onChange={onChange}  className="block p-2 pr-10 pl-3 text-sm text-gray-900  rounded-lg w-60 focus:outline-none shadow-xl " placeholder="Search for items"/>
        </div>
        </div>
    <table className="w-full text-sm table-auto overflow-scroll  text-left text-gray-500 ">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 ">
            <tr>
            {columns.map((rows, index) => {
              return <th className="px-6 py-4" key={index}>{rows}</th>;
            })}
            </tr>
        </thead>
        <tbody>
        {data.map((value, index) => {
            return (
              <tr classNameName="bg-white border-b dark:bg-gray-800 " key={index}>
                {value.map((val, i) => {
                  return <td className="px-6 py-4" key={i}>{val}</td>;
                })}
              </tr>
            );
          })}
        </tbody>
    </table>
    {/* <nav className="flex items-center justify-between py-4 px-4" >
        <span className="text-sm font-normal text-gray-500 ">Showing <span className="font-semibold text-gray-900 dark:text-white">1-{data.length*columns.length}</span> of <span className="font-semibold text-gray-900 dark:text-white">{data.length*columns.length}</span></span>
        <ul className="inline-flex items-center -space-x-px pb-2">
            <li>
                <a href="#" className="block px-3 py-2 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 ">
                    <span className="sr-only">Previous</span>
                    <svg className="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd"></path></svg>
                </a>
            </li>
            <li>
                <a href="#" className="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 ">1</a>
            </li>
            <li>
                <a href="#" className="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 ">2</a>
            </li>
            <li>
                <a href="#" aria-current="page" className="z-10 px-3 py-2 leading-tight text-blue-600 border border-blue-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white">3</a>
            </li>
            <li>
                <a href="#" className="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 ">...</a>
            </li>
            <li>
                <a href="#" className="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 ">100</a>
            </li>
            <li>
                <a href="#" className="block px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 ">
                    <span className="sr-only">Next</span>
                    <svg className="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"></path></svg>
                </a>
            </li>
        </ul>
    </nav> */}
</div>
  )
}

export default Table