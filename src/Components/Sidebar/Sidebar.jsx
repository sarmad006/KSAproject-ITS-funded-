import React, { useState } from "react";
import { AiOutlineForm,AiOutlineFileSearch } from "react-icons/ai";
import { MdPendingActions } from "react-icons/md";
import { TiTickOutline } from "react-icons/ti";
import { useLocation } from "react-router-dom";
import {HiOutlineUsers} from "react-icons/hi"


const Sidebar = () => {
  const location = useLocation();
  const user = [
    {
      icon: <AiOutlineForm />,
      title: "Submit Form",
      route: "/user",
    },
    {
      icon: <MdPendingActions />,
      title: "Pending Form",
      route: "/user/pending",
    },
    {
      icon: <TiTickOutline />,
      title: "Approved Application",
      route: "/user/approved",
    },
  ];

  const government = [
    {
      icon: <AiOutlineForm />,
      title: "Pending Requests",
      route: "/government/pending",
    },
    {
      icon: <MdPendingActions />,
      title: "Approved Requests",
      route: "/government/approved",
    }
  ];

  const coordinator = [
    {
      icon: <AiOutlineForm />,
      title: "Pending Requests",
      route: "/coordinator/pending",
    },
    {
      icon: <MdPendingActions />,
      title: "Approved Requests",
      route: "/coordinator/approved",
    },
    {
      icon:<HiOutlineUsers/>,
      title:"Pending Users",
      route:"/coordinator/pendingUser"
    }
  ];

  return (
    <>
      <nav className="fixed top-0 z-50 w-full bg-black">
        <div className="px-3 py-3 lg:px-5 lg:pl-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center justify-start">
              <button
                data-drawer-target="logo-sidebar"
                data-drawer-toggle="logo-sidebar"
                aria-controls="logo-sidebar"
                type="button"
                className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 "
              >
                <span className="sr-only">Open sidebar</span>
                <svg
                  className="w-6 h-6"
                  aria-hidden="true"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    clipRule="evenodd"
                    fillRule="evenodd"
                    d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
                  ></path>
                </svg>
              </button>
              <a href="/user" className="flex ml-2 md:mr-24">
                <img src="./logo.png" className="h-8 mr-3" alt="" />
                <span className="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap text-white">
                  KSA
                </span>
              </a>
            </div>
          </div>
        </div>
      </nav>

      <aside className="fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform -translate-x-full bg-black sm:translate-x-0 mb-4 rounded-xl">
        <div className="h-full px-3 pb-4 overflow-y-auto ">
          <ul className="space-y-2 text-white">
            {location.pathname.includes("/user") &&
              user.map((item) => (
                <li>
                  <a
                    href={item.route}
                    className="flex items-center p-2 text-base font-normal text-white rounded-lg hover:bg-blue-600 "
                  >
                    {item.icon}
                    <span className="ml-3">{item.title}</span>
                  </a>
                </li>
              ))}

            {location.pathname.includes("/government") &&
              government.map((item) => (
                <li>
                  <a
                    href={item.route}
                    className="flex items-center p-2 text-base font-normal text-white  hover:bg-blue-600 rounded-lg "
                  >
                    {item.icon}
                    <span className="ml-3">{item.title}</span>
                  </a>
                </li>
              ))}

            {location.pathname.includes("/coordinator") && coordinator.map((item) => (
                <li>
                  <a
                    href={item.route}
                    className="flex items-center p-2 text-base font-normal text-white rounded-lg hover:bg-blue-600"
                  >
                    {item.icon}
                    <span className="ml-3">{item.title}</span>
                  </a>
                </li>
              ))}
          </ul>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
