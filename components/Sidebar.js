import React, { useState } from "react";
import { MdDashboard, MdTrackChanges } from "react-icons/md";
import { BiFoodMenu } from "react-icons/bi";
import { FiSettings } from "react-icons/fi";
import { useSelector } from "react-redux";
import Link from "next/link";

import Logo from "../public/assets/logo_outline_white.png";
const Sidebar = () => {
  const [sidebar, setSidebar] = useState(true);
  const { isLoggedIn, username } = useSelector((store) => store);
  const [selected, setSelected] = useState(0);

  const sidebar_items = [
    {
      name: "Dashboard",
      link: "/fitness/dashboard",
      icon: <MdDashboard size={28} className="mx-3" />,
    },
    {
      name: "My Track",
      link: "/fitness/track",
      icon: <MdTrackChanges size={28} className="mx-3" />,
    },
    {
      name: "Meal Plan",
      link: "/fitness/diet",
      icon: <BiFoodMenu size={28} className="mx-3" />,
    },
    // {
    //   name: "Workout Chart",
    //   link: "/fitness/workout",
    //   icon: <IoFitnessOutline size={28} className="mx-3" />,
    // },
    {
      name: "Settings",
      link: "/fitness/settings",
      icon: <FiSettings size={28} className="mx-3" />,
    },
  ];

  return (
    <>
      {/* <!-- Off-canvas menu for mobile, show/hide based on off-canvas menu state. --> */}
      <div className="lg:hidden">
        <div
          className={`fixed inset-0 flex z-40 transition-opacity ease-linear duration-300 ${
            sidebar ? "hidden" : ""
          }`}
          onClick={() => setSidebar(!sidebar)}
        >
          {/* <!--
          Off-canvas menu overlay, show/hide based on off-canvas menu state.
  
          Entering: "transition-opacity ease-linear duration-300"
            From: "opacity-0"
            To: "opacity-100"
          Leaving: "transition-opacity ease-linear duration-300"
            From: "opacity-100"
            To: "opacity-0"
        --> */}
          <div
            className={`fixed inset-0 ${
              sidebar ? "opacity-0 hidden" : "opacity-75"
            }`}
            onClick={() => setSidebar(!sidebar)}
          >
            <div
              className={`absolute inset-0 bg-gray-600 ${
                sidebar ? "opacity-0 hidden" : "opacity-75"
              }`}
              aria-hidden="true"
            ></div>
          </div>
          {/* <!--
          Off-canvas menu, show/hide based on off-canvas menu state.
  
          Entering: "transition ease-in-out duration-300 transform"
            From: "-translate-x-full"
            To: "translate-x-0"
          Leaving: "transition ease-in-out duration-300 transform"
            From: "translate-x-0"
            To: "-translate-x-full"
        --> */}
          <div
            className={`relative flex-1 flex flex-col transition ease-in-out duration-300 transform max-w-xs w-full pt-5 pb-4 bg-black ${
              sidebar ? "-translate-x-full" : "translate-x-0"
            }`}
          >
            <div className="absolute top-0 right-0 -mr-12 pt-2">
              <button
                onClick={() => setSidebar(!sidebar)}
                className={`ml-1 flex items-center text-black justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white ${
                  sidebar ? "" : ""
                }`}
              >
                <span className="sr-only">Close sidebar</span>
                {/* <!-- Heroicon name: x --> */}
                <svg
                  className="h-6 w-6 text-black"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeRidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <Link
              href="/fitness"
              className="flex-shrink-0 flex items-center px-4"
            >
              <img
                className="mx-auto h-10 w-auto"
                src={"/public/assets/logo_outline_white.png"}
                alt="Benorml"
              />
            </Link>
            <nav
              className="mt-5 flex-shrink-0 h-full divide-y divide-gray-800 overflow-y-auto"
              aria-label="Sidebar"
            >
              <div className="px-2 space-y-1">
                {/* <!--MOBILE Current: "bg-gray-800 text-white", Default: "text-gray-100 hover:text-white hover:bg-gray-600" --> */}
                {sidebar_items.map((item, key) => (
                  <Link
                    href={item.link}
                    onClick={() => setSelected(key)}
                    key={key}
                    className={`group flex items-center px-2 py-2 text-base font-semibold rounded-md ${
                      selected !== key
                        ? "text-white"
                        : "text-gray-900 bg-white hover:text-black"
                    }`}
                  >
                    <span>
                      {item.icon}
                      {item.name}
                    </span>
                  </Link>
                ))}{" "}
              </div>
            </nav>
          </div>
          <div className="flex-shrink-0 w-14" aria-hidden="true">
            {/* <!-- Dummy element to force sidebar to shrink to fit close icon --> */}
          </div>
        </div>
      </div>
      {/* <!-- Static sidebar for desktop --> */}
      <div className="hidden bg-gray-700 lg:flex lg:flex-shrink-0">
        <div className="flex flex-col w-64">
          {/* <!-- Sidebar component, swap this element with another sidebar if you like --> */}
          <div className="flex flex-col flex-grow bg-black pt-5 pb-4 overflow-y-auto">
            <Link href="/" className="flex items-center flex-shrink-0 px-4">
              <img className="mx-auto h-10 w-auto" src={Logo} alt="Benomrl" />
            </Link>
            <nav
              className="mt-5 flex-1 flex flex-col divide-y divide-gray-800 overflow-y-auto"
              aria-label="Sidebar"
            >
              <div className="px-2 space-y-1">
                {/* <!-- Current: "bg-gray-800 text-white", Default: "text-gray-100 hover:text-white hover:bg-gray-600" --> */}

                {sidebar_items.map((item, key) => (
                  <Link
                    href={item.link}
                    key={key}
                    onClick={() => setSelected(key)}
                    style={{
                      backgroundColor: selected !== key ? "black" : "white",
                    }}
                    className={`group flex items-center px-2 py-2 text-base font-medium rounded-md ${
                      selected !== key
                        ? "bg-gray-500 text-white font-bold hover:bg-gray-800"
                        : "text-gray-600 hover:text-black font-semibold"
                    }`}
                  >
                    <span>
                      {/* <!-- Heroicon name: clock --> */}
                      {item.icon}
                      {item.name}
                    </span>
                  </Link>
                ))}
              </div>
            </nav>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
