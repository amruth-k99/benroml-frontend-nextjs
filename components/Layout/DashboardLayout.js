import React, { useState } from "react";
import { RiLogoutBoxFill } from "react-icons/ri";
import Link from "next/link";
import Image from "next/image";
import Logo from "../../assets/logo-white-outline.png";

import { BiFoodMenu } from "react-icons/bi";
import { FiSettings } from "react-icons/fi";
import { MdDashboard, MdTrackChanges } from "react-icons/md";
import { FaUserCircle } from "react-icons/fa";

const DashboardLayout = (props) => {
  const [active, setActive] = useState(0);
  const [openSidebar, setSidebar] = useState(false);

  return (
    <div
      style={{ zIndex: 5 }}
      className="relative h-screen flex overflow-hidden bg-white"
    >
      {/* <!-- Off-canvas menu for mobile, show/hide based on off-canvas menu state. --> */}
      <div
        className="fixed inset-0 flex lg:hidden"
        style={openSidebar ? { zIndex: 40 } : { zIndex: -10 }}
        role="dialog"
        aria-modal="true"
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
        {/* {openSidebar && ( */}
        <div
          className={
            openSidebar
              ? "transition-opacity ease-linear duration-300 opacity-100 fixed inset-0 bg-gray-600 bg-opacity-75"
              : "transition-opacity ease-linear duration-300 opacity-0 fixed inset-0 bg-gray-600 bg-opacity-75"
          }
          style={openSidebar ? { zIndex: 10 } : { zIndex: 0 }}
          onClick={() => setSidebar(false)}
          aria-hidden="true"
        ></div>
        {/* )} */}

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
          style={openSidebar ? { zIndex: 50 } : {}}
          className={
            openSidebar
              ? "transition ease-in-out duration-300 transform translate-x-0 relative flex-1 flex flex-col max-w-xs w-full bg-white focus:outline-none"
              : "-translate-x-full transition ease-in-out duration-300 transform relative flex-1 flex flex-col max-w-xs w-full bg-white focus:outline-none"
          }
        >
          {/* <!--
        Close button, show/hide based on off-canvas menu state.

        Entering: "ease-in-out duration-300"
          From: "opacity-0"
          To: "opacity-100"
        Leaving: "ease-in-out duration-300"
          From: "opacity-100"
          To: "opacity-0"
      --> */}
          <div className="absolute top-0 right-0 -mr-12 pt-2">
            <button
              type="button"
              className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
            >
              <span className="sr-only">Close sidebar</span>
              {/* <!-- Heroicon name: outline/x --> */}
              <svg
                className="h-6 w-6 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          <div className="flex-1 h-0 pt-5 pb-4 overflow-y-auto">
            <Link
              href="/dashboard"
              className="flex-shrink-0 flex items-center px-4"
            >
              <img className="h-8 w-auto mx-auto" src={Logo} alt="Databeat" />
            </Link>
            <nav aria-label="Sidebar" className="mt-5">
              <div className="px-2 space-y-1">
                {/* <!-- Current: "bg-gray-100 text-gray-900", Default: "text-gray-600 hover:bg-gray-50 hover:text-gray-900" --> */}
                {dashboardRoutes.map((route, k) => (
                  <Link
                    href={route.link}
                    key={k}
                    className={
                      active === k
                        ? "bg-gray-100 text-gray-900 group flex items-center px-2 py-2 text-base font-medium rounded-md"
                        : "text-gray-600 hover:bg-gray-50 hover:text-gray-900 group flex items-center px-2 py-2 text-base font-medium rounded-md"
                    }
                    onClick={() => {
                      setSidebar(false);
                      setActive(k);
                    }}
                    aria-current="page"
                  >
                    <>
                      <span
                        className={
                          active === k
                            ? "text-gray-500 mr-4 h-6 w-6"
                            : "text-gray-400 group-hover:text-gray-500 mr-4 h-6 w-6"
                        }
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        aria-hidden="true"
                      >
                        {route.icon}
                      </span>
                      {route.name}
                    </>
                  </Link>
                ))}
              </div>
            </nav>
          </div>
          <div className="flex-shrink-0 flex border-t border-gray-200 p-4">
            <a href="#a" className="flex-shrink-0 group block">
              <div className="flex items-center">
                <div>
                  <RiLogoutBoxFill className="h-6 w-6" />
                </div>
                <div className="ml-3">
                  <p className="text-base font-medium text-gray-700 group-hover:text-gray-900">
                    Logout
                  </p>
                </div>
              </div>
            </a>
          </div>
        </div>

        <div className="flex-shrink-0 w-14" aria-hidden="true">
          {/* <!-- Force sidebar to shrink to fit close icon --> */}
        </div>
      </div>

      {/* <!-- Static sidebar for desktop --> */}
      <div className="hidden lg:flex z-10 lg:flex-shrink-0">
        <div className="flex flex-col w-64">
          {/* <!-- Sidebar component, swap this element with another sidebar if you like --> */}
          <div
            className="flex flex-col h-0 flex-1 border-r border-gray-200 "
            style={{ backgroundColor: "#1f2937" }}
          >
            <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
              <Link
                href="/fitness"
                className="flex items-center flex-shrink-0 px-4"
              >
                <div className="h-8 w-auto mx-auto">
                  <Image
                    className="h-8 w-auto mx-auto"
                    src={Logo}
                    alt="Databeat"
                  />
                </div>
              </Link>
              <nav className="mt-14 flex-1" aria-label="Sidebar">
                <div className="px-2 space-y-1">
                  {/* <!-- Current: "bg-gray-200 text-gray-900", Default: "text-gray-600 hover:bg-gray-50 hover:text-gray-900" --> */}
                  {dashboardRoutes.map((route, k) => (
                    <Link
                      href={route.link}
                      key={k}
                      aria-current="page"
                      onClick={() => setActive(k)}
                    >
                      <div
                        className={
                          active === k
                            ? "bg-black text-white group flex items-center px-2 py-2 text-sm font-medium rounded-md"
                            : "text-white hover:bg-black hover:text-white group flex items-center px-2 py-2 text-sm font-medium rounded-md"
                        }
                      >
                        <span
                          className={
                            active === k
                              ? "text-white mr-3 flex-shrink-0 h-6 w-6"
                              : "text-white mr-3 flex-shrink-0 h-6 w-6"
                          }
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          aria-hidden="true"
                        >
                          {route.icon}
                        </span>

                        <span className="ml-3 font-semibold">{route.name}</span>
                      </div>
                    </Link>
                  ))}
                </div>
              </nav>
            </div>
            <div
              className="flex-shrink-0 flex border-t border-black p-4"
              style={{ backgroundColor: "#6bd6d4" }}
            >
              <a href="#a" className="flex-shrink-0 w-full group block">
                <div className="flex items-center justify-center mx-auto">
                  <div>
                    <RiLogoutBoxFill className="text-2xl text-black" />
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-black group-hover:text-gray-900">
                      Logout
                    </p>
                  </div>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col min-w-0 flex-1 overflow-hidden">
        <div className="lg:hidden">
          <div className="flex items-center justify-between bg-gray-50 border-b border-gray-200 px-4 py-1.5">
            <Link href="/dashboard">
              <img className="h-8 w-auto mx-auto" src={Logo} alt="Databeat" />
            </Link>
            <div>
              <button
                type="button"
                onClick={() => setSidebar(true)}
                className="-mr-3 h-12 w-12 inline-flex items-center justify-center rounded-md text-gray-500 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-pink-600"
              >
                <span className="sr-only">Open sidebar</span>
                {/* <!-- Heroicon name: outline/menu --> */}
                <svg
                  className="h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
        <div className="flex-1 relative z-0 flex overflow-hidden">
          <main className="flex-1 relative z-0 overflow-y-auto focus:outline-none xl:order-last">
            {props.children}
          </main>
        </div>
      </div>
    </div>
  );
};
export default DashboardLayout;

const dashboardRoutes = [
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
  {
    name: "Settings",
    link: "/fitness/settings",
    icon: <FiSettings size={28} className="mx-3" />,
  },
];
