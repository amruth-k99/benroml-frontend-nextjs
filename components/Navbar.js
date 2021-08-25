import React, { Fragment, useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { clearData } from "../redux/actions/userActions";
import Logo from "assets/logo_outline_white.png";
import LogoBlack from "assets/logo_outline_1.png";

const NavBar = () => {
  const [navbar, setNavbar] = useState(true);
  const dispatch = useDispatch();
  const { isLoggedIn } = useSelector((store) => store);

  const [selected, setSelected] = useState("");
  const nav_items = [
    {
      title: "Fitness",
      link: "/fitness",
    },
    {
      title: "Blogs",
      link: "/blogs",
    },
  ];

  useEffect(() => {
    let url = window.location.pathname;
    console.log(url);
    nav_items.forEach((item, k) => {
      console.log(item.link, url, k);
      if (item.link === url) {
        setSelected(k);
      }
    });
  }, []);

  return (
    <div>
      <div className="relative py-4 px-4 sm:px-6 lg:px-8 w-full">
        <nav
          className="flex items-center w-full justify-between sm:h-10"
          aria-label="Global"
        >
          <div className="flex items-center w-full sm:w-full lg:w-auto justify-between sm:h-10 lg:justify-start">
            <div className="flex items-center w-full sm:w-full lg:w-auto flex-grow flex-shrink-0 lg:flex-grow-0">
              <div className="flex items-center justify-between w-full md:w-auto">
                <Link href="/">
                  <span className="cursor-pointer">
                    <span className="sr-only">Benorml</span>
                    <div className="h-10 w-auto sm:h-10">
                      <Image
                        className="h-10 w-auto sm:h-10"
                        src={Logo}
                        width={150}
                        height={40}
                        alt=""
                      />
                    </div>
                  </span>
                </Link>
                <div className="-mr-2 flex items-center justify-end md:hidden">
                  <button
                    type="button"
                    onClick={() => setNavbar(!navbar)}
                    className="bg-black rounded-md p-2 inline-flex items-center justify-center text-white hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset"
                    aria-expanded="false"
                  >
                    <span className="sr-only">Open main menu</span>
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
            <div className="hidden md:block md:ml-10 md:pr-4 md:space-x-8">
              <div className="w-full flex justify-between">
                <div>
                  {nav_items.map((item, k) => (
                    <Link
                      href={item.link}
                      key={k}
                      onClick={() => setSelected(k)}
                    >
                      <span
                        className={
                          selected === k
                            ? "font-semibold px-7 py-3 text-white hover:bg-orange-600 rounded-lg duration-200"
                            : "font-semibold text-white px-7 py-3 hover:text-white hover:bg-orange-600 rounded-lg duration-200"
                        }
                      >
                        {item.title}
                      </span>
                    </Link>
                  ))}

                  {isLoggedIn ? (
                    <a
                      href="/fitness/dashboard"
                      className="font-semibold px-7 p-3 text-white rounded-lg duration-200 ml-auto"
                    >
                      Dashboard
                    </a>
                  ) : (
                    <Link href="/login">
                      <span className="font-semibold px-7 p-3 rounded-lg duration-200 text-white ml-auto">
                        Log in
                      </span>
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div>
            {isLoggedIn && (
              <a
                href="/login"
                onClick={() => {
                  dispatch(clearData());
                  window.location.reload();
                }}
                className="font-semibold p-3 text-white rounded-lg hidden lg:block duration-200 "
              >
                Logout
              </a>
            )}
          </div>
        </nav>
      </div>

      <div
        className={
          !navbar
            ? "duration-100 ease-in opacity-100 scale-100 z-40 absolute top-0 inset-x-0 p-2 transition transform origin-top-right md:hidden"
            : "duration-150 opacity-0 scale-95 ease-out z-40 absolute top-0 inset-x-0 p-2 transition transform origin-top-right md:hidden"
        }
      >
        <div
          className={
            !navbar
              ? "block rounded-lg shadow-md bg-white ring-1 ring-black ring-opacity-5 overflow-hidden"
              : "duration-150 hidden rounded-lg shadow-md bg-white ring-1 ring-black ring-opacity-5 overflow-hidden"
          }
        >
          <div className="px-5 pt-4 flex items-center justify-between">
            <Link href="/">
              <div className="h-10 w-auto sm:h-10">
                <Image
                  className="h-10 w-auto sm:h-10"
                  src={LogoBlack}
                  width={150}
                  height={40}
                  alt=""
                />
              </div>
            </Link>
            <div className="-mr-2">
              <button
                type="button"
                onClick={() => setNavbar(!navbar)}
                className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
              >
                <span className="sr-only">Close main menu</span>
                {/* <!-- Heroicon name: outline/x --> */}
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
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          </div>
          <div className="px-2 pt-2 pb-3 space-y-1">
            {nav_items.map((item, k) => (
              <a href={item.link || "/"} key={k}>
                <span className="block px-3 py-2 rounded-md text-base font-semibold text-gray-800 hover:text-gray-900 hover:bg-gray-50">
                  {item.title}
                </span>
              </a>
            ))}
          </div>
          {isLoggedIn ? (
            <Link
              href="/login"
              // onClick={() => {
              //   dispatch(clearData());
              //   window.location.reload();
              // }}
            >
              <span className="block w-full px-5 py-3 text-center font-medium text-white bg-red-600 hover:bg-gray-100">
                Log out
              </span>
            </Link>
          ) : (
            <Link href="/login">
              <span className="block w-full px-5 py-3 text-center font-medium text-indigo-600 bg-gray-50 hover:bg-gray-100">
                Log in
              </span>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};
export default NavBar;
