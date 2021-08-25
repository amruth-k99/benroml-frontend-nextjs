import Head from "next/head";
import Link from "next/link";
import Layout from "../../components/Layout/Layout";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import GoogleLogin from "react-google-login";
import { AiFillEye } from "react-icons/ai";
import { useRouter } from "next/router";
import { storeAuthData } from "../../redux/actions/userActions";

const initialState = {
  email: "",
  password: "",
  isSubmitting: false,
  errorMessage: null,
};

export default function LoginPage() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { isLoggedIn } = useSelector((store) => store);
  const [data, setData] = useState(initialState);
  const [showPassword, togglePassword] = useState(false);

  useEffect(() => {
    if (isLoggedIn) {
      router.push("/");
    }
  }, []);

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

    fetch(
      "https://e1i8ucbq53.execute-api.ap-south-1.amazonaws.com/dev/auth/login",
      {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: data.email,
          password: data.password,
        }),
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
          console.log("-", resJson);
          dispatch(
            storeAuthData({
              token: resJson.token,
              email: resJson.email,
              username: resJson.name,
              isLoggedIn: true,
              active_plans: resJson.active_plans,
            })
          );
          router.push("/fitness");
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

  const responseFailGoogle = (response) => {
    console.log(response);
  };

  return (
    <Layout>
      <Head>
        <title>Login | BENORML | Where fitness becomes your lifestyle</title>
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
              <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col justify-center sm:px-6 lg:px-8">
                  <div className="sm:mx-auto sm:w-full sm:max-w-md pt-10">
                    <h2 className="text-center text-3xl pt-10 font-extrabold text-black">
                      Sign in to your account
                    </h2>
                    <p className="text-center text-sm max-w text-black">
                      Or{" "}
                      <Link
                        href="/register"
                        className="font-medium text-indigo-600 hover:text-indigo-500"
                      >
                        Register a New Account
                      </Link>
                    </p>
                  </div>
                 
                  <div className="mt-2 sm:mx-auto sm:w-full sm:max-w-md">
                    <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                      <form className="space-y-6" onSubmit={handleFormSubmit}>
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
                              className="appearance-none block w-full  text-black px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            />
                          </div>
                        </div>

                        <div>
                          <label
                            for="password"
                            class="block text-sm font-medium text-gray-700"
                          >
                            Password
                          </label>
                          <div class="mt-1 relative rounded-md shadow-sm">
                            <input
                              type={showPassword ? "text" : "password"}
                              name="password"
                              id="password"
                              value={data.password}
                              onChange={handleInputChange}
                              autocomplete="current-password"
                              class="focus:ring-indigo-500 focus:border-indigo-500 block w-full pr-10 sm:text-sm border-gray-300 rounded-md"
                              required
                            />
                            <div
                              onClick={() => togglePassword(!showPassword)}
                              class="absolute cursor-pointer  inset-y-0 right-0 pr-3 flex items-center z-50"
                            >
                              {/* <!-- Heroicon name: solid/question-mark-circle --> */}
                              <AiFillEye className="h-5 w-5" />
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <input
                              id="remember_me"
                              name="remember_me"
                              type="checkbox"
                              className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                            />
                            <label
                              htmlFor="remember_me"
                              className="ml-2 block text-sm text-black"
                            >
                              Remember me
                            </label>
                          </div>

                          <div className="text-sm">
                            <Link
                              href="/forgot-password"
                              className="font-medium text-indigo-500 hover:text-indigo-600"
                            >
                              Forgot your password?
                            </Link>
                          </div>
                        </div>

                        <div>
                          {data.errorMessage && (
                            <div className="my-3 p-2 font-medium text-red-600 border-l-2 border-t-0 border-red-500 bg-red-100">
                              {data.errorMessage}
                            </div>
                          )}
                          <button
                            disabled={data.isSubmitting}
                            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-black"
                          >
                            {data.isSubmitting ? "Loading..." : "Login"}
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
                            onFailure={(e) => responseFailGoogle(e)}
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
              src={"https://benorml.com/static/media/collage.221401c3.jpg"}
              alt=""
            />
          </div>
        </div>
      </main>
    </Layout>
  );
}
