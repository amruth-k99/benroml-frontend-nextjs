import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import DashboardLayout from "../../../components/Layout/DashboardLayout";
import LineChart from "../../../components/Charts/LineChart";
import { useDispatch, useSelector } from "react-redux";
import YetToStart from "../../../components/yet_to_start";
import Confetti from "../../../components/confetti";
import { getDashboardData } from "../../../api/dashboard";
import Loading from "../../../components/Loading";
import {
  clearData,
  setTodaysWorkout,
} from "../../../redux/actions/userActions";
import { useEffect, useState } from "react";
import moment from "moment";

export default function FitnessDashboard() {
  const dispatch = useDispatch();
  const { token, workouts } = useSelector((store) => store);

  const [active_plan, setActvePlan] = useState(true);
  const [data, setData] = useState(false);
  const [loading, setLoading] = useState(true);
  const [yet_to_start, setYetToStart] = useState(false);
  const [new_weight, setNewWeight] = useState(null);
  const [show_weight, setShowWeight] = useState(false);
  const [errors, setErrors] = useState({ weight: false, update: false });
  const [user_details, setUserDetails] = useState({
    age: "",
    height: "",
    weight: "",
    gender: "",
  });

  const [today_values, setTodayValues] = useState({
    "Meal 1": false,
    "Meal 2": false,
    "Meal 3": false,
    Warmup: false,
    Workout: false,
    Cardio: false,
    "Have you followed today's diet correctly?": false,
    "How is today's workout?": "2",
  });

  let [today] = useState([
    { type: "Meal 1", response: false },
    { type: "Meal 2", response: false },
    { type: "Meal 3", response: false },
    { type: "Workout", response: false },
    { type: "Have you followed today's diet correctly?", response: false },
    { type: "How is today's workout?", response: 2 },
  ]);

  useEffect(() => {
    setLoading(true);

    if (workouts) {
      console.log("no need to update again");
    } else {
      getDashboardData(token).then((res) => {
        if (res.notLoggedIn) {
          dispatch(clearData());
          return;
        }

        if (res.isExpired) {
          setActvePlan(false);
          setLoading(false);
          return;
        }

        let weights = res.weeklyWeights.map((i) => i.weight);
        console.log({ ...res, weeklyWeights: weights });
        setUserDetails({ ...res, weeklyWeights: weights });

        if (res.yetToStart) {
          setYetToStart(true);
          setLoading(false);
          return;
        }

        if (res.fitnessFeedback.length) {
          console.log(res.fitnessFeedback[5]);
          setTodayValues({
            "Meal 1": res.fitnessFeedback[0],
            "Meal 2": res.fitnessFeedback[1],
            "Meal 3": res.fitnessFeedback[2],
            Warmup: res.fitnessFeedback[3],
            "Have you followed today's diet correctly?": res.fitnessFeedback[4],
            "How is today's workout?": res.fitnessFeedback[5],
          });
        }
        const today = moment();
        const lastUpdate = moment(res.lastWeightUpdated);

        let difference = today.diff(lastUpdate, "days");
        console.log(difference);
        if (difference >= 7) {
          setShowWeight(true);
        }
        setData({ ...res, weeklyWeights: weights });

        setLoading(false);
      });
    }
  }, []);

  const onSubmit = (e) => {
    e.preventDefault();
    let data = {};
    for (let i = 0; i < e.target.length; i++) {
      if (data[e.target[i].name] === undefined) {
        //first
        if (e.target[i].name === "How is today's workout?") {
          data[e.target[i].name] = e.target[i].value;
        } else {
          data[e.target[i].name] = e.target[i].checked;
        }
      }
    }
    delete data[""];

    console.log(data);

    fetch(
      `${process.env.BaseURL}/fitness/update/daily`,
      {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "x-auth-token": token,
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        setLoading(false);
        setData({ ...data, todaysUpdate: true });
      })
      .catch((err) => {
        setErrors({ ...errors, weight: true });
        console.log(err);
      });
  };

  const updateWeight = () => {
    const weight = parseFloat(document.getElementById("weight").value);
    console.log(isNaN(weight));
    if (!isNaN(weight)) {
      fetch(
        `${process.env.BaseURL}/fitness/update/weight`,
        {
          method: "POST",
          body: JSON.stringify({ weight }),
          headers: {
            "x-auth-token": token,
            "Content-Type": "application/json",
          },
        }
      )
        .then((res) => res.json())
        .then((res) => {
          console.log(res);
          setLoading(false);
          setData({ ...data, weightUpdateFeedback: true });
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      setErrors({ ...errors, weight: true });
    }
  };

  if (loading) {
    return <Loading />;
  }

  if (!active_plan) {
    return <NoActivePlan />;
  }

  if (yet_to_start) {
    return <YetToStart details={user_details.userID} />;
  }

  return (
    <DashboardLayout>
      <Head>
        <title>MyTrack | BENORML | Where fitness becomes your lifestyle</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl my-5 leading-6 font-bold text-black">
            My Track
          </h2>

          <div className="mt-8 mx-auto grid grid-cols-1 gap-6 lg:grid-flow-col-dense lg:grid-cols-3">
            <div className="space-y-6 lg:col-start-1 lg:col-span-2">
              {/* <!-- Description list--> */}
              <section aria-labelledby="applicant-information-title">
                <div className="bg-white shadow sm:rounded-lg">
                  <div className="px-4 py-5 sm:px-6">
                    <h2
                      id="applicant-information-title"
                      className="text-xl leading-6 font-bold text-gray-900"
                    >
                      Weight Graph
                    </h2>
                    <p className="mt-1 max-w-2xl text-sm text-gray-500">
                      Check your weekly progress and update your weight every
                      week
                    </p>
                  </div>
                  <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
                    <LineChart weights={data.weeklyWeights} />
                  </div>
                  {show_weight && (
                    <div className="my-6 px-2 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                      <div className="sm:col-span-6">
                        <label
                          for="username"
                          className="block mb-2 text-sm font-medium text-gray-700"
                        >
                          Please update your weight
                        </label>
                        <div className="mt-1 flex rounded-md shadow-sm">
                          <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 sm:text-sm">
                            Week {parseInt(user_details.currentDay / 7) + 1}
                          </span>
                          <input
                            type="text"
                            name="weight"
                            id="weight"
                            autocomplete="weight"
                            placeholder="in Kgs"
                            defaultValue={new_weight}
                            onClick={(e) => {
                              setNewWeight(e.target.value);
                            }}
                            className="flex-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full min-w-0 rounded-none rounded-r-md sm:text-sm border-gray-300"
                          />
                        </div>
                        {data.weightUpdateFeedback && (
                          <div className="w-full rounded-md bg-green-50 p-4 my-3">
                            <div className="flex">
                              <div className="flex-shrink-0">
                                {/* <!-- Heroicon name: solid/check-circle --> */}
                                <svg
                                  onClick={() =>
                                    setData({
                                      ...data,
                                      weightUpdateFeedback: false,
                                    })
                                  }
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
                                  Successfully uploaded
                                </p>
                              </div>
                              <div className="ml-auto pl-3">
                                <div className="-mx-1.5 -my-1.5">
                                  <button className="inline-flex bg-green-50 rounded-md p-1.5 text-green-500 hover:bg-green-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-green-50 focus:ring-green-600">
                                    <span className="sr-only">Dismiss</span>
                                    {/* <!-- Heroicon name: solid/x --> */}
                                    <svg
                                      className="h-5 w-5"
                                      xmlns="http://www.w3.org/2000/svg"
                                      viewBox="0 0 20 20"
                                      fill="currentColor"
                                      aria-hidden="true"
                                    >
                                      <path
                                        fill-rule="evenodd"
                                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                        clip-rule="evenodd"
                                      />
                                    </svg>
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                        <div className="py-5">
                          <div className="flex justify-center">
                            <button
                              onClick={() => updateWeight()}
                              type="submit"
                              className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                              Save
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}{" "}
                </div>
              </section>

              {/* Today's Section */}
              <section aria-labelledby="applicant-information-title">
                <form
                  onSubmit={onSubmit}
                  className="bg-white shadow sm:rounded-lg"
                >
                  <div className="px-4 py-5 sm:px-6">
                    <h2
                      id="applicant-information-title"
                      className="text-xl leading-6 font-bold text-gray-900"
                    >
                      How did today's workout go?
                    </h2>
                    <p className="mt-1 max-w-2xl text-sm text-gray-500">
                      Don't cheat yourself, mark "YES" only if you follow your
                      meal portions properly...!
                    </p>
                  </div>

                  <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
                    <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                      {today.map((item, k) => (
                        <li className="col-span-1 bg-white rounded-lg shadow divide-y divide-gray-200">
                          <div className="w-full flex items-center justify-between p-6 space-x-6">
                            <div className="flex-1">
                              <div className="flex items-center space-x-3">
                                <h3 className="text-gray-900 text-sm font-medium">
                                  {item.type}
                                </h3>
                              </div>
                            </div>
                          </div>
                          {k === 5 ? (
                            <div>
                              <div className="-mt-px flex divide-x divide-gray-200">
                                <label
                                  htmlhtmlFor={`${item.type}_today_yes`}
                                  className="w-0 py-3 flex-1 flex cursor-pointer"
                                >
                                  <div className="flex mx-auto items-center">
                                    <label
                                      htmlhtmlFor={`${item.type}_today_yes`}
                                      className="mr-3 block text-sm font-medium text-gray-700"
                                    >
                                      Easy
                                    </label>
                                    {console.log(
                                      "aaa",
                                      today_values[item.type]
                                    )}
                                    <input
                                      id={`${item.type}_today_yes`}
                                      name={`${item.type}`}
                                      type="range"
                                      max="100"
                                      className="h-4 border-gray-300"
                                      defaultValue={today_values[item.type]}
                                    />
                                    <label
                                      htmlhtmlFor={`${item.type}_today_yes`}
                                      className="ml-3 block text-sm font-medium text-gray-700"
                                    >
                                      Hard
                                    </label>
                                  </div>
                                </label>
                              </div>
                            </div>
                          ) : (
                            <div>
                              <div className="-mt-px flex divide-x divide-gray-200">
                                <label
                                  htmlhtmlFor={`${item.type}_today_yes`}
                                  className="w-0 py-3 flex-1 flex cursor-pointer"
                                >
                                  <div className="flex mx-auto items-center">
                                    <input
                                      id={`${item.type}_today_yes`}
                                      name={`${item.type}`}
                                      value={true}
                                      type="radio"
                                      className="h-4 w-4 border-gray-300"
                                      defaultChecked={
                                        today_values[item.type] ? true : false
                                      }
                                    />
                                    <label
                                      htmlhtmlFor={`${item.type}_today_yes`}
                                      className="ml-3 block text-sm font-medium text-gray-700"
                                    >
                                      Yes
                                    </label>
                                  </div>
                                </label>
                                <label
                                  htmlhtmlFor={`${item.type}_today_no`}
                                  className="-ml-px w-0 flex-1 flex cursor-pointer"
                                >
                                  <div className="flex mx-auto items-center">
                                    <input
                                      id={`${item.type}_today_no`}
                                      value={false}
                                      name={`${item.type}`}
                                      type="radio"
                                      className="h-4 w-4 border-gray-300"
                                      defaultChecked={
                                        !today_values[item.type] ? true : false
                                      }
                                    />
                                    <label
                                      htmlhtmlFor={`${item.type}_today_no`}
                                      className="ml-3 block text-sm font-medium text-gray-700"
                                    >
                                      No
                                    </label>
                                  </div>
                                </label>
                              </div>
                            </div>
                          )}{" "}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {data.todaysUpdate && (
                    <div className="w-full rounded-md bg-green-50 p-4 my-3">
                      <div className="flex">
                        <div className="flex-shrink-0">
                          {/* <!-- Heroicon name: solid/check-circle --> */}
                          <svg
                            onClick={() =>
                              setData({
                                ...data,
                                todaysUpdate: false,
                              })
                            }
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
                            Successfully uploaded
                          </p>
                        </div>
                        <div className="ml-auto pl-3">
                          <div className="-mx-1.5 -my-1.5">
                            <button className="inline-flex bg-green-50 rounded-md p-1.5 text-green-500 hover:bg-green-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-green-50 focus:ring-green-600">
                              <span className="sr-only">Dismiss</span>
                              {/* <!-- Heroicon name: solid/x --> */}
                              <svg
                                className="h-5 w-5"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                                aria-hidden="true"
                              >
                                <path
                                  fill-rule="evenodd"
                                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                  clip-rule="evenodd"
                                />
                              </svg>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="flex my-2 justify-center text-center mx-auto">
                    <button
                      type="submit"
                      className="w-100 my-2 text-center items-center px-2 py-2 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                    >
                      Submit
                    </button>
                  </div>
                </form>
              </section>
              {/* Analyse */}
            </div>

            {/* BLOGS */}
            <section
              aria-labelledby="timeline-title"
              className="lg:col-start-3 lg:col-span-1"
            >
              <div className="bg-white shadow sm:rounded-lg">
                <div className="px-4 py-5 sm:px-6">
                  <h2
                    id="timeline-title"
                    className="text-xl leading-6 font-bold text-gray-900"
                  >
                    What's New!
                  </h2>
                  <p className="mt-1 max-w-2xl text-sm text-gray-500">
                    Checkout our new articles about Physical and mental health
                  </p>
                </div>
                <div className="border-t pt-5 flow-root">
                  <div className="bg-gray-50 pr-4 sm:pr-6 lg:pr-8 lg:flex-shrink-0 lg:border-l lg:border-gray-200 xl:pr-0">
                    <div className="px-6">
                      <div className="pt-2 pb-2">
                        <h2 className="text-sm font-semibold">Blogs</h2>
                      </div>
                      <div>
                        <ul className="divide-y divide-gray-200">
                          <li className="py-4">
                            <a
                              className="flex space-x-3"
                              href="/blogs/What_is_the_right_time_to_exercise"
                              target="_blank"
                            >
                              <img
                                className="h-6 w-6 rounded-full"
                                src="https://images.unsplash.com/photo-1517365830460-955ce3ccd263?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=256&h=256&q=80"
                                alt=""
                              />
                              <div className="flex-1 space-y-1">
                                <div className="flex items-center justify-between">
                                  <h3 className="text-sm font-medium">
                                    What is the right time to exercise?
                                  </h3>
                                  <p className="text-sm text-gray-500">1h</p>
                                </div>
                                <p className="text-sm text-gray-500">
                                  By Sumanth Babu
                                </p>
                              </div>
                            </a>
                          </li>
                          <li className="py-4">
                            <a
                              className="flex space-x-3"
                              href="/blogs/What_is_the_right_time_to_exercise"
                              target="_blank"
                            >
                              <img
                                className="h-6 w-6 rounded-full"
                                src="https://images.unsplash.com/photo-1517365830460-955ce3ccd263?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=256&h=256&q=80"
                                alt=""
                              />
                              <div className="flex-1 space-y-1">
                                <div className="flex items-center justify-between">
                                  <h3 className="text-sm font-medium">
                                    What is the right time to exercise?
                                  </h3>
                                  <p className="text-sm text-gray-500">3d</p>
                                </div>
                                <p className="text-sm text-gray-500">
                                  By Sumanth Babu
                                </p>
                              </div>
                            </a>
                          </li>
                          <li className="py-4">
                            <a
                              className="flex space-x-3"
                              href="/blogs/Queen_of_spices_Cardamom"
                              target="_blank"
                            >
                              <img
                                className="h-6 w-6 rounded-full"
                                src="https://i.pinimg.com/736x/c4/a2/23/c4a22319149b308d4f9b455bb889a619.jpg"
                                alt=""
                              />
                              <div className="flex-1 space-y-1">
                                <div className="flex items-center justify-between">
                                  <h3 className="text-sm font-medium">
                                    Queen of spices - Cardamom
                                  </h3>
                                  <p className="text-sm text-gray-500">4d</p>
                                </div>
                                <p className="text-sm text-gray-500">
                                  By Sumanth Babu
                                </p>
                              </div>
                            </a>
                          </li>

                          {/* <!-- More items... --> */}
                        </ul>
                        <div className="py-4 text-sm border-t border-gray-200">
                          <a
                            href="/blogs"
                            target="_blank"
                            className="text-indigo-600 font-semibold hover:text-indigo-900"
                          >
                            View all activity{" "}
                            <span aria-hidden="true">&rarr;</span>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </main>
    </DashboardLayout>
  );
}

const WorkoutSetsItem = (props) => {
  const { data, number, color } = props;
  return (
    <div className="flex flex-col bg-white overflow-hidden shadow rounded-lg">
      <div className="align-middle min-w-full overflow-x-auto shadow overflow-hidden sm:rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr>
              <th
                style={{ backgroundColor: color }}
                className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider"
              >
                {data.title} ({number})
              </th>
              <th
                style={{ backgroundColor: color }}
                className="px-6 py-3 text-right text-xs font-medium text-white uppercase tracking-wider"
              >
                Count
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            <tr className="bg-white">
              <td className="max-w-0 w-full px-6 py-4 whitespace-nowrap text-sm text-black">
                <div className="flex">
                  <div className="group cursor-pointer inline-flex space-x-2  text-sm">
                    {/* <!-- Heroicon name: cash --> */}
                    <svg
                      className="flex-shrink-0 cursor-pointer h-5 w-5 text-red-700 group-hover:text-gray-800"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <p className="text-red-700 font-semibold group-hover:text-gray-900">
                      Sets
                    </p>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 text-right whitespace-nowrap text-sm text-red-700">
                <span className="text-red-700 font-extrabold">
                  {props.data.sets}
                </span>
              </td>
            </tr>

            {data.cooldown.map((item, k) => (
              <tr className="bg-white" key={k}>
                <td className="max-w-0 w-full px-6 py-4 whitespace-nowrap text-sm text-black">
                  <div className="flex">
                    <a
                      href="#reference"
                      onClick={() => props.exerciseClicked(item)}
                      className="group cursor-pointer inline-flex space-x-2 text-sm"
                    >
                      {/* <!-- Heroicon name: cash --> */}
                      <svg
                        className="flex-shrink-0 cursor-pointer h-5 w-5 text-black group-hover:text-black"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          fillRule="evenodd"
                          d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <p className="text-black group-hover:text-gray-900">
                        {item.name}
                      </p>
                    </a>
                  </div>
                </td>
                <td className="px-6 py-4 text-right whitespace-nowrap text-sm text-black">
                  <span className="text-black font-medium">{item.count}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const WorkoutItem = (props) => {
  const { data, number, color } = props;
  return (
    <div className="flex flex-col bg-white overflow-hidden shadow rounded-lg">
      <div className="align-middle min-w-full overflow-x-auto shadow overflow-hidden sm:rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead style={{ backgroundColor: color }}>
            <tr style={{ backgroundColor: color }}>
              <th
                style={{ backgroundColor: color }}
                className="px-6 py-3 text-white text-left text-xs font-medium uppercase tracking-wider"
              >
                {data.title} ({number})
              </th>
              <th
                style={{ backgroundColor: color }}
                className="px-6 py-3 text-right text-white text-xs font-medium uppercase tracking-wider"
              >
                Count
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {data.cooldown.map((item, k) => (
              <tr className="bg-white" key={k}>
                <td className="max-w-0 w-full px-6 py-4 whitespace-nowrap text-sm text-black">
                  <div className="flex">
                    <a
                      href="#reference"
                      onClick={() =>
                        props.exerciseClicked({
                          name: item.name,
                          link: item.link,
                        })
                      }
                      className="group cursor-pointer inline-flex space-x-2 text-sm"
                    >
                      {/* <!-- Heroicon name: cash --> */}
                      <svg
                        className="flex-shrink-0 cursor-pointer h-5 w-5 text-black group-hover:text-gray-500"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          fillRule="evenodd"
                          d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <p className="text-black group-hover:text-black">
                        {item.name}
                      </p>
                    </a>
                  </div>
                </td>
                <td className="px-6 py-4 text-right whitespace-nowrap text-sm text-gray-500">
                  <span className="text-black font-medium">{item.count}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const WellDone = () => {
  return (
    <div>
      <Confetti />
    </div>
  );
};

const WellDoneModal = (props) => {
  return (
    <div className="fixed top-40 left-4 lg:left-64 md:right-44 mx-auto rounded-md duration-200 fadeIn bg-white border-2 border-gray-300 shadow-2xl h-auto mr-4">
      <div className="p-2">
        <div className="font-bold text-center mt-4 text-2xl">
          🎉 Well Done! 🎉
        </div>
        <div className="text-center mt-3">Rest and Recover.</div>
        <div className="text-center mt-3">
          You need to regain the energy needed to comeback again!
        </div>
        <div className="text-center mt-3">Because you are worth the fight!</div>

        <div
          onClick={() => {
            props.finished();
          }}
          className="text-center mt-3 uppercase cursor-pointer text-md font-bold border-2 py-2 rounded-xl bg-green-500 text-white "
        >
          Exit
        </div>
      </div>
    </div>
  );
};

const SundayMessage = () => {
  return (
    <div className="p-3">
      <div className="rounded-md bg-blue-50 p-4">
        <div className="flex">
          <div className="flex-shrink-0">
            {/* <!-- Heroicon name: solid/information-circle --> */}
            <svg
              className="h-5 w-5 text-blue-400"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fill-rule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                clip-rule="evenodd"
              />
            </svg>
          </div>
          <div className="ml-3 flex-1 md:flex md:justify-between">
            <p className="text-sm font-bold text-blue-700">
              Suday is an active recovery day!
              <p className="font-normal">
                Stay active by walking for 30-45 minutes
              </p>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
