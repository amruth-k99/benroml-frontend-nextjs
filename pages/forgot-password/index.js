import Head from "next/head";
import Link from "next/link";
import Layout from "../../components/Layout/Layout";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import GoogleLogin from "react-google-login";
import { AiFillEye } from "react-icons/ai";
import { Router } from "next/router";

export default function Fitness() {
  const dispatch = useDispatch();
  const { isLoggedIn } = useSelector((store) => store);

  const [showOTP, toggleOTP] = useState(false);

  const [data, setData] = useState({
    email: "",
    otp: "",
    isSubmitting: false,
    secondsLeft: 0,
    message: "",
    errorMessage: null,
  });

  useEffect(() => {
    if (isLoggedIn) {
      Router.push({
        pathname: "/",
      });
    }
  }, []);

  const handleInputChange = (event) => {
    setData({
      ...data,
      [event.target.name]: event.target.value,
    });
  };

  const handleFormSubmit = () => {
    setData({
      ...data,
      isSubmitting: true,
      errorMessage: null,
      message: null,
    });

    fetch(`${BASE_URL}/auth/forgot-password`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: data.email,
        password: data.password,
      }),
    })
      .then((res) => res.json())
      .then((resJson) => {
        if (resJson.error) {
          setData({
            ...data,
            isSubmitting: false,
            errorMessage: resJson.error,
          });
        } else {
          console.log(resJson);
          setData({
            ...data,
            isSubmitting: false,
            message: resJson.message,
          });
          toggleOTP(true);
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

  return (
    <Layout>
      <Head>
        <title>
          Forgot Password | BENORML | Where fitness becomes your lifestyle
        </title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="mt-12">
        <div className="relative bg-white lg:min-h-screen">
          <div className="max-w-7xl mx-auto">
            <div
              data-aos="fade-up"
              data-aos-duration="600"
              className="relative z-10 pb-16 bg-white sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32"
            >
              <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 lg:min-h-screen">
                <div className="flex flex-col justify-center sm:px-6 lg:px-8 py-12">
                  <div className="sm:mx-auto sm:w-full sm:max-w-md">
                    <h2 className="text-center text-3xl font-extrabold text-black">
                      Forgot Password ?
                    </h2>
                    <p className="text-center text-sm max-w text-black">
                      Or{" "}
                      <Link href="/register">
                        <span className="font-medium cursor-pointer text-indigo-600 hover:text-indigo-500">
                          Register a New Account
                        </span>
                      </Link>
                    </p>
                  </div>

                  <div className="mt-2 sm:mx-auto sm:w-full sm:max-w-md">
                    <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                      <div className="space-y-6">
                        <div>
                          <label
                            htmlFor="email"
                            className="block text-md font-medium text-black"
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
                              className="appearance-none block w-full text-black px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            />
                          </div>
                        </div>

                        {data.message && (
                          <div className="bg-indigo-400 rounded p-1 py-2 text-white">
                            {data.message}
                          </div>
                        )}

                        <div>
                          {data.errorMessage && (
                            <div className="my-3 p-2 font-medium text-red-600 border-l-2 border-t-0 border-red-500 bg-red-100">
                              {data.errorMessage}
                            </div>
                          )}
                          {
                            <button
                              onClick={handleFormSubmit}
                              disabled={data.isSubmitting}
                              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-black"
                            >
                              Send Link
                            </button>
                          }
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
              src={"https://benorml.com/static/media/collage.221401c3.jpg"}
              alt=""
            />
          </div>
        </div>
      </main>
    </Layout>
  );
}
