import React, { useState } from "react";
import { RiLogoutBoxFill } from "react-icons/ri";
import Link from "next/link";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { clearData } from "../../redux/actions/userActions";
import Image from "next/image";
import Logo from "../../public/assets/logo-white-outline.png";

import { BiFoodMenu } from "react-icons/bi";
import { FiSettings } from "react-icons/fi";
import { MdDashboard, MdTrackChanges } from "react-icons/md";
import { FaUserCircle } from "react-icons/fa";

const DashboardLayout = (props) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [active, setActive] = useState(0);
  const [openSidebar, setSidebar] = useState(false);

  const onLogout = () => {
    dispatch(clearData());
    router.push("/");
  };

  return (
    <div
      style={{ zIndex: 5 }}
      className="relative h-screen flex overflow-hidden bg-white"
    >
      <div
        className="fixed inset-0 flex lg:hidden"
        style={openSidebar ? { zIndex: 40 } : { zIndex: -10 }}
        role="dialog"
        aria-modal="true"
      >
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
        <div
          style={openSidebar ? { zIndex: 50 } : {}}
          className={
            openSidebar
              ? "transition ease-in-out duration-300 transform translate-x-0 relative flex-1 flex flex-col max-w-xs w-full bg-black focus:outline-none"
              : "-translate-x-full transition ease-in-out duration-300 transform relative flex-1 flex flex-col max-w-xs w-full bg-black focus:outline-none"
          }
        >
          <div className="absolute top-0 right-0 -mr-12 pt-2">
            <button
              type="button"
              onClick={() => {
                setSidebar(false);
              }}
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
            <Link href="/fitness">
              <div className="flex-shrink-0 flex items-center px-4">
                <img
                  className="h-10 w-auto mx-auto"
                  src={
                    "https://benorml.com/static/media/logo_outline_white.5835fcd9.png"
                  }
                  alt="Databeat"
                />
              </div>
            </Link>
            <nav aria-label="Sidebar" className="mt-5">
              <div className="p-2 space-y-1">
                {/* <!-- Current: "bg-gray-100 text-gray-900", Default: "text-gray-600 hover:bg-gray-50 hover:text-gray-900" --> */}
                {dashboardRoutes.map((route, k) => (
                  <Link href={route.link} key={k}>
                    <span
                      className={
                        active === k
                          ? "bg-gray-100 text-gray-900 group flex items-center px-2 py-4 text-base font-bold rounded-md"
                          : "text-black hover:bg-gray-50  group flex items-center px-2 py-4 text-base font-bold rounded-md"
                      }
                      onClick={() => {
                        setSidebar(false);
                        setActive(k);
                      }}
                    >
                      <span
                        className={
                          active === k
                            ? "text-black h-6 w-6 mr-10"
                            : "text-white group-hover:bg-white group-hover:text-black mr-10 h-6 w-6"
                        }
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        aria-hidden="true"
                      >
                        {route.icon}
                      </span>
                      <span
                        className={
                          active === k
                            ? "text-black"
                            : "text-white group-hover:bg-white text-lg group-hover:text-black"
                        }
                      >
                        {route.name}
                      </span>
                    </span>
                  </Link>
                ))}
              </div>
            </nav>
          </div>
          <div onClick={onLogout} className="flex-shrink-0 flex bg-red-600 p-4">
            <div className="flex mx-auto items-center justify-center">
              <div>
                <RiLogoutBoxFill className="h-8 w-8 text-white" />
              </div>
              <div className="ml-3">
                <p className="text-base font-bold text-white">Logout</p>
              </div>
            </div>
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
                <img
                  className="h-10 w-auto mx-auto"
                  src={
                    "https://benorml.com/static/media/logo_outline_white.5835fcd9.png"
                  }
                  alt="Databeat"
                />
              </Link>
              <nav className="mt-7 flex-1" aria-label="Sidebar">
                <div className="px-2 space-y-1">
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

                        <span className="ml-3 font-semibold text-md">
                          {route.name}
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              </nav>
            </div>
            <div
              onClick={onLogout}
              className="flex-shrink-0 flex border-t cursor-pointer border-black bg-red-600 hover:bg-red-700 p-4"
            >
              <a href="#a" className="flex-shrink-0 w-full group block">
                <div className="flex items-center justify-center mx-auto">
                  <div>
                    <RiLogoutBoxFill className="text-2xl text-white" />
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-white font-bold">Logout</p>
                  </div>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col min-w-0 flex-1 overflow-hidden">
        <div className="lg:hidden">
          <div className="flex items-center justify-between bg-black border-b border-gray-200 px-4 py-1.5">
            <Link href="/fitness">
              <img
                className="h-10 w-auto mx-auto"
                src={
                  "https://benorml.com/static/media/logo_outline_white.5835fcd9.png"
                }
                alt="Databeat"
              />
            </Link>
            <div>
              <button
                type="button"
                onClick={() => setSidebar(true)}
                className="-mr-3 h-12 w-12 inline-flex items-center justify-center rounded-md hover:text-white text-gray-50 focus:outline-none"
              >
                <span className="sr-only">Open sidebar</span>
                {/* <!-- Heroicon name: outline/menu --> */}
                <svg
                  className="h-7 w-7"
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
          <main className="flex-1 relative z-0 overflow-y-auto py-4 focus:outline-none xl:order-last">
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
