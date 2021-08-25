import React from "react";
import Head from "next/head";
import Link from "next/link";
import Layout from "../../components/Layout/Layout";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import GoogleLogin from "react-google-login";
import { AiFillEye } from "react-icons/ai";

export default function Fitness() {
  const dispatch = useDispatch();
  const { isLoggedIn } = useSelector((store) => store);
  const initialState = {
    email: "",
    password: "",
    name: "",
    mobile: "",
    isSubmitting: false,
    errorMessage: null,
  };

  const [data, setData] = React.useState(initialState);

  const handleInputChange = (event) => {
    setData({
      ...data,
      [event.target.name]: event.target.value,
    });
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    setData({
      ...data,
      isSubmitting: true,
      errorMessage: null,
    });

    console.log(
      JSON.stringify({
        email: data.email,
        password: data.password,
        name: data.name,
        mobile: data.mobile,
      })
    );

    fetch(
      "https://e1i8ucbq53.execute-api.ap-south-1.amazonaws.com/dev/auth/signup",
      {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: data.email.trim(),
          name: data.name.trim(),
          password: data.password.trim(),
          mobile: data.mobile.trim(),
        }),
      }
    )
      .then((res) => res.json())
      .then((resJson) => {
        if (resJson.error) {
          console.log(resJson);
          setData({
            ...data,
            isSubmitting: false,
            errorMessage: resJson.error,
          });
        } else {
          console.log(resJson);
          dispatch(
            storeAuthData({
              token: resJson.token,
              email: resJson.email,
              username: resJson.full_name,
              active_plans: resJson.active_plans,
              isLoggedIn: true,
            })
          );
        }
      })
      .catch((error) => {
        setData({
          ...data,
          isSubmitting: false,
          errorMessage: error.message || error.statusText,
        });
      });
  };

  const responseSuccessGoogle = (response) => {
    fetch(
      `https://e1i8ucbq53.execute-api.ap-south-1.amazonaws.com/dev/auth/google`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ tokenId: response.tokenId }),
      }
    )
      .then((res) => res.json())
      .then((resJson) => {
        if (resJson.error) {
          setData({
            ...data,
            isSubmitting: false,
            errorMessage: resJson.error,
          });
        } else {
          console.log(resJson.active_plans);
          dispatch(
            storeAuthData({
              token: resJson.token,
              email: resJson.email,
              username: resJson.name,
              isLoggedIn: true,
              active_plans: resJson.active_plans,
            })
          );
        }
      })
      .catch((error) => {
        setData({
          ...data,
          isSubmitting: false,
          errorMessage: error.error,
        });
      });
  };

  const responseGoogle = (response) => {
    console.log(response);
  };

  return (
    <Layout>
      <Head>
        <title>Register | BENORML | Where fitness becomes your lifestyle</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="mt-12">
        <div className="relative bg-white">
          <div className="max-w-7xl mx-auto">
            <div
              data-aos="fade-up"
              data-aos-duration="600"
              className="relative z-10 pb-16 bg-white sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32"
            >
              <main>
                <div className=" bg-gray-50 flex flex-col justify-center py-8 sm:px-6 lg:px-8">
                  <div className="sm:mx-auto sm:w-full sm:max-w-md">
                    <h2 className="mt-6 text-center text-2xl font-extrabold text-gray-900">
                      Register your account
                    </h2>
                    <p className="text-center text-sm text-gray-600 max-w">
                      Or{" "}
                      <Link href="/login">
                        <span className="font-medium text-indigo-600 hover:text-indigo-500">
                          Login to your Account
                        </span>
                      </Link>
                    </p>
                  </div>

                  <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                    <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                      <form className="space-y-6" onSubmit={handleFormSubmit}>
                        <div>
                          <label
                            htmlFor="name"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Full Name
                          </label>
                          <div className="mt-1">
                            <input
                              id="name"
                              value={data.name}
                              onChange={handleInputChange}
                              name="name"
                              type="text"
                              autocomplete="name"
                              required
                              className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            />
                          </div>
                        </div>
                        <div>
                          <label
                            htmlFor="email"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Email address
                          </label>
                          <div className="mt-1">
                            <input
                              id="email"
                              value={data.email}
                              onChange={handleInputChange}
                              name="email"
                              type="email"
                              autocomplete="email"
                              required
                              className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            />
                          </div>
                        </div>
                        <div>
                          <label
                            htmlFor="password"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Password
                          </label>
                          <div className="mt-1">
                            <input
                              id="password"
                              name="password"
                              type="password"
                              value={data.password}
                              onChange={handleInputChange}
                              autocomplete="current-password"
                              required
                              className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            />
                          </div>
                        </div>
                        <div>
                          <label
                            htmlFor="mobile"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Mobile Number
                          </label>
                          <div className="mt-1">
                            <input
                              id="mobile"
                              value={data.mobile}
                              onChange={handleInputChange}
                              name="mobile"
                              type="number"
                              autocomplete="tel"
                              minLength={10}
                              required
                              className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            />
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <input
                              id="remember_me"
                              name="remember_me"
                              type="checkbox"
                              required
                              className="h-4 w-4 text-indigo-600 border-gray-300 rounded"
                            />
                            <label
                              htmlFor="remember_me"
                              className="ml-2 block text-sm text-gray-900"
                            >
                              I agree to your{" "}
                              <a
                                href="/terms-and-conditions"
                                target="_blank"
                                rel="noreferrer"
                                className="underline text-indigo-500 hover:text-indigo-600"
                              >
                                Terms and Conditions
                              </a>
                              ,{" "}
                              <a
                                href="/privacy"
                                target="_blank"
                                rel="noreferrer"
                                className="underline text-indigo-500 hover:text-indigo-600"
                              >
                                Privacy
                              </a>{" "}
                              and{" "}
                              <a
                                href="/disclaimer"
                                target="_blank"
                                rel="noreferrer"
                                className="underline text-indigo-500 hover:text-indigo-600"
                              >
                                Disclaimer
                              </a>{" "}
                              Policies
                            </label>
                          </div>
                        </div>
                        <div className="flex justify-end text-sm">
                          <Link href="/forgot-password">
                            <span className="font-medium text-indigo-600 hover:text-indigo-500">
                              Forgot your password?
                            </span>
                          </Link>
                        </div>
                        {data.errorMessage && (
                          <div className="bg-red-50 border-l-4 border-red-400 p-4">
                            <div className="flex">
                              <div className="flex-shrink-0">
                                {/* <!-- Heroicon name: solid/exclamation --> */}
                                <svg
                                  className="h-5 w-5 text-red-400"
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 20 20"
                                  fill="currentColor"
                                  aria-hidden="true"
                                >
                                  <path
                                    fill-rule="evenodd"
                                    d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                                    clip-rule="evenodd"
                                  />
                                </svg>
                              </div>
                              <div className="ml-3">
                                <p className="text-sm text-red-700">
                                  {data.errorMessage}
                                </p>
                              </div>
                            </div>
                          </div>
                        )}
                        <div>
                          <button
                            disabled={data.isSubmitting}
                            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                          >
                            {data.isSubmitting ? "Loading..." : "Register"}
                          </button>
                        </div>
                      </form>

                      <div className="mt-6">
                        <div className="relative">
                          <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-300"></div>
                          </div>
                          <div className="relative flex justify-center text-sm">
                            <span className="px-2 bg-white text-gray-500">
                              Or continue with
                            </span>
                          </div>
                        </div>

                        <div className="mt-6 grid mx-auto grid-cols-1 gap-3">
                          <GoogleLogin
                            clientId="1031888379347-n0atmq80jpogbq1fbm215q4svb2ld7go.apps.googleusercontent.com"
                            buttonText="Sign in with Google"
                            className="mx-auto font-bold border-black shadow-lg rounded-lg"
                            onSuccess={responseSuccessGoogle}
                            onFailure={responseGoogle}
                            cookiePolicy={"single_host_origin"}
                          />
                          <div>
                            {/* <Link
                        href="#"
                        className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                      >
                        <span className="sr-only">Sign in with Google</span>
                        {/* <FcGoogle size={30} />{" "}
                        <span className="font-medium ml-3 my-auto">
                          Sign in with Google
                        </span>
                      </Link> */}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </main>
            </div>
          </div>
          <div
            className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2"
            data-aos="fade-up"
            data-aos-duration="600"
            data-aos-delay="200"
          >
            <img
              className="w-full object-cover h-96 lg:w-full lg:h-full"
              src={"assets/meditate.jpg"}
              alt=""
            />
          </div>
        </div>
      </main>
    </Layout>
  );
}
