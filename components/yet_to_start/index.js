import React, { useState } from "react";
import { useSelector } from "react-redux";

const YetToStart = (props) => {
  const { token } = useSelector((store) => store);
  const [data] = useState({
    full_name: "",
    email_verified: false,
    email: "",
    age: props.details.age === 0 ? "" : props.details.age,
    gender: props.details.gender === "null" ? "" : props.details.gender,
    height: props.details.height === 0 ? "" : props.details.height,
    weight:
      props.details.initialWeight === 0 ? "" : props.details.initialWeight,
    mobile:
      props.details.mobileNumber === "null" ? "" : props.details.mobileNumber,
  });
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  const onFormSubmit = (e) => {
    setSuccess(false);
    setError(false);
    e.preventDefault();
    let body = {};
    for (let x = 0; x < e.target.length; x++) {
      body[e.target[x].name] = e.target[x].value;
    }
    console.log(body);

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
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      {/* <!-- Page header --> */}
      <div className="bg-green-50 rounded-r-lg shadow-md border-l-4 border-green-400 p-4 mb-4">
        <div className="flex">
          <div className="flex-shrink-0">
            {/* <!-- Heroicon name: solid/exclamation --> */}
            <svg
              className="h-10 w-10 text-green-400"
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
            <p className="text-lg text-green-700">
              Your account has been successfully created!
            </p>
            <div className="mt-2 mb-4 text-sm text-gray-700">
              <p>
                We will contact you and update your workouts and diet plans in
                the next 24 hours.
              </p>
              {!(props.details.age || success) && (
                <p>
                  Please provide a few details to personalize your workouts.
                </p>
              )}
            </div>
          </div>
        </div>
        {props.details.age || success ? (
          <section aria-labelledby="update-user-data">
            <div className="mt-2 mb-4 text-lg text-gray-700">
              <p>Thank you for providing the required details.</p>
              <p>
                Please visit this page{" "}
                <span className="font-bold"> after 24 hours</span> for your
                customised health plan!
              </p>
            </div>
          </section>
        ) : (
          <section aria-labelledby="update-user-data">
            <form onSubmit={onFormSubmit}>
              <div className="sm:rounded-md sm:overflow-hidden">
                <div className="pb-6 px-4 sm:p-6">
                  <div className="mt-6 grid grid-cols-4 gap-6">
                    {/* Age */}
                    <div className="col-span-4 sm:col-span-2">
                      <label
                        htmlFor="age"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Age
                      </label>{" "}
                      <input
                        type="text"
                        name="age"
                        defaultValue={data.age}
                        id="age"
                        required
                        placeholder="Ex: 24"
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
                          placeholder="Ex: 170cm"
                          className="mt-1 block w-full border border-gray-300 rounded-md hover:shadow-lg shadow-sm py-2 px-3 focus:outline-none focus:ring-gray-900 focus:border-gray-900 sm:text-sm"
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
                          maxLength={10}
                          step=".01"
                          required
                          minLength={10}
                          defaultValue={data.weight}
                          placeholder="Ex: 80kg"
                          className="mt-1 block w-full border border-gray-300 rounded-md hover:shadow-lg shadow-sm py-2 px-3 focus:outline-none focus:ring-gray-900 focus:border-gray-900 sm:text-sm"
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
                        className="mt-1 block w-full border border-gray-200 rounded-md hover:shadow-lg shadow-sm py-2 px-3 focus:outline-none focus:ring-gray-900 focus:border-gray-900 sm:text-sm"
                      >
                        <option value={""}></option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                      </select>
                    </div>

                    {/* mobile */}
                    <div className="col-span-4 sm:col-span-2">
                      <label
                        htmlFor="mobile"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Mobile NUmber
                      </label>
                      <div className="flex">
                        <input
                          aria-label="mobile"
                          name="mobile"
                          id="mobile"
                          type="number"
                          autoComplete="mobile"
                          maxLength={10}
                          required
                          minLength={10}
                          defaultValue={data.mobile}
                          placeholder="Ex: 9999999999"
                          className="mt-1 block w-full border border-gray-300 rounded-md hover:shadow-lg shadow-sm py-2 px-3 focus:outline-none focus:ring-gray-900 focus:border-gray-900 sm:text-sm"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                {success ? (
                  <div className="px-3">
                    <div className="rounded-md border-2 border-green-500 bg-green-50 p-4">
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
                          <p className="text-sm font-medium text-red-800">
                            {error}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  ""
                )}
                <div className="px-4 py-3 text-center sm:px-6">
                  <button
                    type="submit"
                    className="bg-red-500 border border-transparent rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-white hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-600"
                  >
                    Create my Workouts
                  </button>
                </div>
              </div>
            </form>
          </section>
        )}{" "}
      </div>
    </div>
  );
};

export default YetToStart;
