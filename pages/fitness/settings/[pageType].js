import Head from "next/head";
import Link from "next/link";
import DashboardLayout from "./../../../components/Layout/DashboardLayout";
import { useDispatch, useSelector } from "react-redux";
import Loading from "./../../../components/Loading";
import { clearData } from "../../../redux/actions/userActions";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { getPlans } from "./../../../api/dashboard";
import moment from "moment";

const routes = [
  {
    link: "/fitness/settings/account",
    title: "Account",
    permalink: "account",
  },
  {
    link: "/fitness/settings/password",
    title: "Passwords",
    permalink: "password",
  },
  {
    link: "/fitness/settings/plans",
    title: "Billing and Plans",
    permalink: "plans",
  },
];

export default function SettingsPage() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { pageType } = router.query;
  const { token } = useSelector((store) => store);

  const [data, setData] = useState({
    full_name: "",
    email_verified: false,
    email: "",
    age: "",
    gender: "",
    user_state: "",
    weights: [],
    mobile: "",
  });
  const [loading, setLoading] = useState(false);
  const [current, setCurrent] = useState(pageType);

  useEffect(() => {
    setLoading(true);

    if (!pageType) {
      router.push("/fitness/settings/account");
    }

    fetch(`${process.env.BaseURL}/fitness/user`, {
      headers: {
        "x-auth-token": token,
      },
    })
      .then((result) => result.json())
      .then((result) => {
        console.log("Settings", result);

        if (result.notLoggedIn) {
          dispatch(clearData());
        } else {
          setData(result);
          setLoading(false);
        }
      });
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <DashboardLayout>
      <Head>
        <title>
          Dashboard | BENORML | Where fitness becomes your lifestyle
        </title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <div className="relative max-w-4xl mx-auto md:px-8 xl:px-0">
          <div className="pt-10 pb-16">
            <div className="px-4 sm:px-6 md:px-0">
              <h1 className="text-3xl font-extrabold text-black">Settings</h1>
            </div>
            <div className="px-4 sm:px-6 md:px-0">
              <div className="py-6">
                {/* <!-- Tabs --> */}
                <div className="">
                  <div className="border-b border-gray-200">
                    <nav className="-mb-px flex">
                      {/* <!-- Current: "border-purple-500 text-purple-600", Default: "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700" --> */}
                      {routes.map((route, k) => (
                        <Link
                          href={route.link}
                          key={k}
                          onClick={() => {
                            setCurrent(route.permalink);
                          }}
                        >
                          <span
                            className={`${
                              route.permalink === pageType
                                ? "border-black font-bold text-gray-800"
                                : "border-transparent text-black hover:border-white hover:text-gray-700"
                            } whitespace-nowrap cursor-pointer py-2 mt-2 px-3 border-b-2 font-medium text-sm`}
                          >
                            {route.title}
                          </span>
                        </Link>
                      ))}
                    </nav>
                  </div>
                </div>

                <div className="space-y-6 sm:px-6 lg:px-0 lg:col-span-9 mt-6">
                  {pageType === "account" && <Account />}

                  {/* <!-- Passwords --> */}
                  {pageType === "password" && <PasswordsPage />}

                  {pageType === "plans" && (
                    <Plans transactions={data.transactions} />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </DashboardLayout>
  );
}

const Account = () => {
  const { token } = useSelector((store) => store);
  const [data, setData] = useState({
    full_name: "",
    email_verified: false,
    email: "",
    age: "",
    gender: "",
    user_state: "",
    weights: [],
    mobile: "",
  });
  const [emailModal, openEmailModal] = useState(false);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    fetch(`${process.env.BaseURL}/fitness/user`, {
      headers: {
        "x-auth-token": token,
      },
    })
      .then((result) => result.json())
      .then((result) => {
        if (result.notLoggedIn) {
          dispatch(clearData());
        } else {
          setData(result);
        }
      });
  }, []);

  const onFormSubmit = (e) => {
    setSuccess(false);
    setError(false);
    e.preventDefault();
    let body = {};
    for (let x = 0; x < e.target.length; x++) {
      body[e.target[x].name] = e.target[x].value;
    }
    console.log(body);

    body.type = "settings";

    fetch(`${process.env.BaseURL}/fitness/update/user`, {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "x-auth-token": token,
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.error) {
          setSuccess(false);
          setError(res.error);
        } else {
          console.log(res);
          setSuccess(true);
          setError(false);
        }
      })
      .catch((err) => {
        console.log(err);
        setError(err);
      });
  };

  return (
    <section aria-labelledby="settings">
      <form onSubmit={onFormSubmit}>
        <div className="shadow sm:rounded-md sm:overflow-hidden">
          <div className="bg-white py-6 px-4 sm:p-6">
            <div>
              <h2
                id="payment_details_heading"
                className="text-lg leading-6 font-bold text-blue-700"
              >
                User Account
              </h2>
              <p className="mt-1 text-sm text-gray-500">
                Update your billing information. Please note that updating your
                location could affect your tax rates.
              </p>
            </div>

            <div className="mt-6 grid grid-cols-4 gap-6">
              <div className="col-span-4 sm:col-span-3">
                <label
                  htmlFor="full_name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Full Name
                </label>
                <input
                  type="text"
                  name="full_name"
                  autoComplete="name"
                  defaultValue={data.full_name}
                  id="full_name"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-gray-900 focus:border-gray-900 sm:text-sm"
                />
              </div>

              <div className="col-span-4 sm:col-span-2">
                <label
                  htmlFor="email_address"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email address{" "}
                  {!data.email_verified ? (
                    <span>
                      ( This Email is{" "}
                      <span className="text-red-500"> NOT VERIFIED</span> )
                      <p className="mt-1 text-sm text-gray-500">
                        To verify your email,{" "}
                        <span
                          className="cursor-pointer text-black underline"
                          onClick={() => openEmailModal(!emailModal)}
                        >
                          click here
                        </span>
                        {emailModal ? (
                          <Modal hide={() => openEmailModal(!emailModal)} />
                        ) : (
                          ""
                        )}
                      </p>
                    </span>
                  ) : (
                    <span>
                      ( This Email is{" "}
                      <span className="text-green-500">VERIFIED </span>)
                    </span>
                  )}
                </label>
                <input
                  type="text"
                  name="email_address"
                  id="email_address"
                  disabled
                  value={data.email}
                  autocomplete="email"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-gray-900 focus:border-gray-900 sm:text-sm"
                />
              </div>
              {/* Age */}
              <div className="col-span-4 sm:col-span-2">
                <label
                  htmlFor="age"
                  className="block text-sm font-medium text-gray-700"
                >
                  Age
                  <p className="mt-1 text-sm text-white">.</p>
                </label>{" "}
                <input
                  type="text"
                  name="age"
                  defaultValue={data.age}
                  id="age"
                  required
                  placeholder="Ex: 170"
                  className="mt-1 block w-full border border-gray-300 rounded-md hover:shadow-lg shadow-sm py-2 px-3 focus:outline-none focus:ring-gray-900 focus:border-gray-900 sm:text-sm"
                />
              </div>

              {/* height */}
              <div className="col-span-4 sm:col-span-2">
                <label
                  htmlFor="height"
                  className="block text-sm font-medium text-gray-700"
                >
                  Height ( in CMs )
                </label>
                <div className="flex">
                  <input
                    aria-label="height"
                    name="height"
                    id="height"
                    type="number"
                    maxLength={10}
                    required
                    minLength={10}
                    defaultValue={data.height}
                    placeholder="Ex: 170"
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-gray-900 focus:border-gray-900 sm:text-sm"
                  />
                </div>
              </div>

              {/* weight */}
              <div className="col-span-4 sm:col-span-2">
                <label
                  htmlFor="weight"
                  className="block text-sm font-medium text-gray-700"
                >
                  Inital Weight (in KGs)
                </label>
                <div className="flex">
                  <input
                    aria-label="Weight"
                    name="weight"
                    id="weight"
                    type="number"
                    required
                    disabled
                    defaultValue={data.initialWeight}
                    placeholder="Ex: 80"
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-gray-900 focus:border-gray-900 sm:text-sm"
                  />
                </div>
              </div>

              {/* Gender */}
              <div className="col-span-4 sm:col-span-2">
                <label
                  htmlFor="gender"
                  className="block text-sm font-medium text-gray-700"
                >
                  Gender
                </label>

                <select
                  id="gender"
                  name="gender"
                  autocomplete="gender"
                  required
                  defaultValue={data.gender ? data.gender : ""}
                  className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                >
                  <option value={""}></option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Prefer not to say">Prefer not to say</option>
                </select>
              </div>

              <div className="col-span-4 sm:col-span-2">
                <label
                  htmlFor="postal_code"
                  className="block text-sm font-medium text-gray-700"
                >
                  Mobile number
                </label>
                <div className="flex">
                  <input
                    aria-label="Mobile Number"
                    name="mobile"
                    id="mobile"
                    type="number"
                    maxLength={10}
                    required
                    minLength={10}
                    defaultValue={data.mobile}
                    placeholder="Ex: 9876452130"
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-gray-900 focus:border-gray-900 sm:text-sm"
                  />
                </div>
              </div>
            </div>
          </div>
          {success ? (
            <div className="px-3 bg-white">
              <div className="rounded-md bg-green-50 p-4">
                <div className="flex">
                  <div className="flex-shrink-0">
                    {/* <!-- Heroicon name: solid/check-circle --> */}
                    <svg
                      className="h-5 w-5 text-green-400"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clip-rule="evenodd"
                      />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-green-800">
                      Updated Successfully
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            ""
          )}
          {error ? (
            <div className="px-3 bg-white">
              <div className="rounded-md bg-red-50 p-4">
                <div className="flex">
                  <div className="flex-shrink-0">
                    {/* <!-- Heroicon name: solid/check-circle --> */}
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-red-800">{error}</p>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            ""
          )}
          <div className="px-4 py-3 bg-gray-50 text-center sm:px-6">
            <button
              type="submit"
              className="bg-gray-800 border border-transparent rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-white hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900"
            >
              Save
            </button>
          </div>
        </div>
      </form>
    </section>
  );
};

const Modal = (props) => {
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const sendEmail = () => {
    setError(false);
    setLoading(true);
    setSent(false);
    fetch(`${process.env.BaseURL}/fitness/verify-email`, {
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": "token",
      },
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.error) {
          setLoading(false);
          setError(true);
        } else {
          setLoading(false);
          setSent(true);
        }
      })
      .catch((err) => {
        setError(true);
        setLoading(false);
      });
  };
  return (
    <div>
      <div className="fixed z-10 inset-0 overflow-y-auto m-auto">
        <div className="flex my-auto items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <div
            className="fixed my-auto inset-0 transition-opacity"
            aria-hidden="true"
          >
            <div
              onClick={() => props.hide()}
              className="absolute cursor-pointer my-auto inset-0 bg-gray-100 opacity-50"
            ></div>
          </div>

          <span
            className="hidden sm:inline-block my-auto sm:align-middle sm:h-screen"
            aria-hidden="true"
          >
            &#8203;
          </span>

          <div
            className="inline-block my-auto align-center bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-headline"
          >
            <div className="bg-white  my-auto px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <div className="sm:flex sm:items-start">
                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                  <h3
                    className="text-lg leading-6 text-center font-medium text-gray-900"
                    id="modal-headline"
                  >
                    Verify your Email
                  </h3>
                  <div className="mt-2">
                    <p className="text-sm text-center text-gray-500">
                      We have sent you a link to your email address. Click on
                      the link sent to verify your email. Refresh the page after
                      you verify the link.
                    </p>
                  </div>
                  <div className="bg-gray-50 flex justify-center px-4 py-3 text-center sm:px-6 sm:flex sm:flex-row-reverse">
                    <button
                      type="submit"
                      name="submit"
                      onClick={() => {
                        props.hide();
                      }}
                      className="w-full inline-flex justify-center rounded-md border-2 border-black shadow-sm px-4 py-2 bg-white-100 text-base font-medium text-black focus:outline-none focus:ring-2 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
                    >
                      Done
                    </button>
                    <button
                      type="submit"
                      name="submit"
                      onClick={() => {
                        sendEmail();
                      }}
                      className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-main-100 text-base font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
                    >
                      {loading ? "Loading..." : sent ? "Sent!" : "Send Email"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const PasswordsPage = () => {
  const { token } = useSelector((store) => store);
  const [error, setError] = useState(false);
  const [feedback, setFeedback] = useState(false);

  const onFormSubmit = (e) => {
    console.log("=========");
    e.preventDefault();
    setError("");
    let { old_password, password, password_confirm } = e.target.elements;

    if (password.value === password_confirm.value) {
      // API call with {data} data
      fetch(`${process.env.BaseURL}/auth/change-password`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
          "x-auth-token": token,
        },
        body: JSON.stringify({
          old_password: old_password.value,
          password: password.value,
        }),
      })
        .then((res) => res.json())
        .then((res) => {
          if (res.error) {
            console.log(res.error);
            setError(res.error);
          } else {
            console.log(res);
            setFeedback(res.message);
          }
        })
        .catch((err) => {
          console.log(err);
          setError("Something went wrong. Please try again");
        });
    } else {
      setError("Passwords donot match");
    }
  };

  return (
    <section aria-labelledby="passwords">
      <div className="bg-white pt-6 shadow sm:rounded-md sm:overflow-hidden">
        <div className="px-4 sm:px-6">
          <h2
            id="billing_history_heading"
            className="text-lg leading-6 font-medium text-gray-900"
          >
            Change Password
          </h2>
        </div>
        <div className="mt-6 flex flex-col">
          <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
              <div className="overflow-hidden border-t border-gray-200">
                <div className="">
                  <form className="my-auto" onSubmit={onFormSubmit}>
                    <div className="shadow overflow-hidden sm:rounded-md ">
                      <div className="px-4 pt-5 bg-white sm:p-6 ">
                        <div className="grid grid-cols-4 gap-4">
                          <div className="col-span-6 sm:col-span-4">
                            <label
                              htmlFor="old_password"
                              className="block text-sm font-medium text-gray-700"
                            >
                              Old Password
                            </label>
                            <input
                              aria-label="Confirm Password"
                              name={`old_password`}
                              type="password"
                              style={{ borderWidth: "2px" }}
                              required
                              className="mt-1 block w-full border border-gray-200 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-gray-700 focus:border-gray-900 sm:text-sm"
                            />
                          </div>

                          <div className="col-span-6 sm:col-span-4">
                            <label
                              htmlFor="password"
                              className="block text-sm font-medium text-gray-700"
                            >
                              New Password
                            </label>
                            <input
                              aria-label="New Password"
                              name={`password`}
                              type="password"
                              style={{ borderWidth: "2px" }}
                              autocomplete="password"
                              required
                              className="mt-1 block w-full border border-gray-200 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-gray-700 focus:border-gray-900 sm:text-sm"
                            />
                          </div>

                          <div className="col-span-6 sm:col-span-4">
                            <label
                              htmlFor="password_confirm"
                              className="block text-sm font-medium text-gray-700"
                            >
                              Confirm Password
                            </label>
                            <input
                              aria-label="Confirm Password"
                              name={`password_confirm`}
                              type="password"
                              style={{ borderWidth: "2px" }}
                              autocomplete="password"
                              required
                              className="mt-1 block w-full border border-gray-200 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-gray-700 focus:border-gray-900 sm:text-sm"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="mx-6 mx-sm-12 flex items-center justify-between"></div>
                      {error ? (
                        <div
                          className="px-4 mx-4 alert alert-danger"
                          role="alert"
                        >
                          {error}
                        </div>
                      ) : (
                        ""
                      )}
                      {feedback ? (
                        <div
                          className="px-4 mx-4 alert alert-success"
                          role="alert"
                        >
                          {feedback}
                        </div>
                      ) : (
                        ""
                      )}
                      <div className="px-4 py-3 bg-gray-50 text-center sm:px-6">
                        <button
                          type="submit"
                          style={{ backgroundColor: "#007ef2" }}
                          className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                          Submit
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Plans = ({ expiry }) => {
  const dispatch = useDispatch();
  const { token, workouts } = useSelector((store) => store);
  const [date, setDate] = useState("Saturday, 19th of July, 2021");
  const [transactions, setTransactions] = useState(false);
  useEffect(() => {
    getPlans(token)
      .then((res) => {
        if (res.notLoggedIn) {
          dispatch(clearData());
          return;
        }

        if (res.active_plan === false) {
        }

        if (res.error) {
          console.log(res.error);
        } else {
          setTransactions(res.userPayments);
          setDate(
            moment()
              .add(res.daysDifference, "days")
              .format("MMMM DD (ddd), YYYY") +
              ` (${res.daysDifference} Days remaining)`
          );
        }
      })
      .catch((err) => {
        console.log(err);
        setTransactions([]);
      });
  }, []);

  return transactions ? (
    <div>
      <section aria-labelledby="subscription_ending">
        <div className="bg-white pt-6 shadow sm:rounded-md sm:overflow-hidden">
          <div className="px-4 sm:px-6">
            <h2
              id="billing_history_heading"
              className="text-lg leading-6 font-medium text-gray-900"
            >
              Plan Expiration
            </h2>
          </div>
          <div className="mt-6 flex flex-col">
            <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                <div className="border-t text-center border-gray-200 px-4 py-3">
                  Your Plan expires on <span className="text-xl ">{date}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section aria-labelledby="billing_history_heading">
        <div className="bg-white pt-6 shadow sm:rounded-md sm:overflow-hidden">
          <div className="px-4 sm:px-6">
            <h2
              id="billing_history_heading"
              className="text-lg leading-6 font-medium text-gray-900"
            >
              Billing history
            </h2>
          </div>
          <div className="mt-6 flex flex-col">
            <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                <div className="overflow-hidden border-t border-gray-200">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Date
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Description
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Amount
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Status
                        </th>
                        {/* <!--
            `relative` is added here due to a weird bug in Safari that causes `sr-only` headings to introduce overflow on the body on mobile.
          --> */}
                        <th
                          scope="col"
                          className="relative px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          <span className="sr-only">View receipt</span>
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {transactions.map((transaction, k) => (
                        <tr key={k}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {moment(transaction.paymentDate).format(
                              "DD-MM-YYYY hh:mm a"
                            )}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {transaction.receipt}
                          </td>
                          <td className="px-6 py-4 font-semibold whitespace-nowrap text-sm text-gray-500">
                            ₹ {transaction.amountPaid}
                          </td>
                          {transaction.paymentStatus === "PAID" ? (
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-green-500 font-semibold">
                              {transaction.paymentStatus}
                            </td>
                          ) : (
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {transaction.paymentStatus}
                            </td>
                          )}
                        </tr>
                      ))}

                      {/* <!-- More items... --> */}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  ) : (
    "loading..."
  );
};
