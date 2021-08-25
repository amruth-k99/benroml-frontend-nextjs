import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import DashboardLayout from "./../../../components/Layout/DashboardLayout";
import { useDispatch, useSelector } from "react-redux";
import { FaUserCircle } from "react-icons/fa";
import WomanAvatar from "../../../assets/gender/woman.png";
import ManAvatar from "../../../assets/gender/man_1.png";
import { BiRun } from "react-icons/bi";

import Modal from "./../../../components/Modal";
import YetToStart from "./../../../components/yet_to_start";
import Confetti from "./../../../components/confetti";
import { getDashboardData } from "./../../../api/dashboard";
import Loading from "./../../../components/Loading";
import {
  clearData,
  setTodaysWorkout,
} from "../../../redux/actions/userActions";
import { useEffect, useRef, useState } from "react";

export default function FitnessDashboard() {
  const dispatch = useDispatch();
  const { token, username } = useSelector((store) => store);
  const pincodeRef = useRef();
  const workoutRef = useRef();

  const [today_data, setToday] = useState(false);
  const [finished, setFinished] = useState(false);
  const [is_sunday, setSunday] = useState(false);
  const [active_plan, setActvePlan] = useState(true);
  const [user_details, setUserDetails] = useState({
    age: "",
    height: "",
    weight: "",
    gender: "",
  });
  const [yet_to_start, setYetToStart] = useState(true);
  const [current_reference, setCurrentReference] = useState({
    name: "Please click on an exercise",
    link: "",
  });
  const [loading, setLoading] = useState(true);
  const [welldoneModal, setWelldoneModal] = useState(false);

  useEffect(() => {
    setLoading(true);
    console.log("---");

    getDashboardData(token).then((result) => {
      if (result.notLoggedIn) {
        dispatch(clearData());
        return;
      }

      if (result.isExpired) {
        setActvePlan(false);
        setLoading(false);

        return;
      }

      setUserDetails(result);

      console.log("ss", result);
      if (result.yetToStart) {
        setYetToStart(true);
        setLoading(false);
        return;
      }

      setYetToStart(false);

      if (new Date().getDay() > 0) {
        let today = result.weeklyWorkouts;
        setToday(today);
        dispatch(setTodaysWorkout(today));
      } else {
        console.log("Day type ", new Date().getDay());
        setSunday(true);
      }
      setLoading(false);
    });
  }, []);

  const ScrollToWorkout = () => {
    if (workoutRef.current) {
      workoutRef.current.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    }
  };

  const updateCurrentDate = () => {
    fetch(
      `https://e1i8ucbq53.execute-api.ap-south-1.amazonaws.com/dev/fitness/update/date`,
      {
        headers: {
          "x-auth-token": token,
        },
        method: "POST",
        body: "",
      }
    )
      .then((result) => result.json())
      .then((result) => {
        console.log(result, "updated");
      });
  };

  const WorkoutReference = ({ name, link, reference }) => {
    const [newLink, setLink] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      console.log(link);
      let new_link = link;
      if (new_link.includes("=")) {
        let videoID = link.split("=")[1];
        new_link = "https://www.youtube.com/embed/" + videoID;
        setLink(new_link);
      } else if (new_link.includes(".be/")) {
        let videoID = link.split(".be/")[1];
        new_link = "https://www.youtube.com/embed/" + videoID;
        setLink(new_link);
      } else {
        setLink(new_link);
      }
      setTimeout(() => {
        setLoading(false);
      }, 100);
    }, []);

    if (loading) {
      return <div>{newLink}</div>;
    } else
      return (
        <div className="flex my-3 flex-col bg-white overflow-hidden shadow rounded-lg">
          <div className="align-middle min-w-full overflow-x-auto shadow overflow-hidden sm:rounded-lg">
            <div className="text-lg font-bold mb-2 uppercase"> {name}</div>

            <iframe
              src={newLink}
              frameBorder="0"
              width={"100%"}
              height={"300px"}
              allowFullScreen
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              title="video"
            />
          </div>
        </div>
      );
  };

  const WellDoneModal = (props) => {
    return (
      <Modal ref={pincodeRef} onClose={() => setWelldoneModal(false)}>
        <Confetti />
        <div className="p-2">
          <div className="font-bold text-center mt-4 text-2xl">
            🎉 Well Done! 🎉
          </div>
          <div className="text-center mt-3">Rest and Recover.</div>
          <div className="text-center mt-3">
            You need to regain the energy needed to comeback again!
          </div>
          <div className="text-center mt-3">
            Because you are worth the fight!
          </div>

          <div
            onClick={() => {
              props.finished();
            }}
            className="text-center mt-3 uppercase cursor-pointer text-md font-bold border-2 py-2 rounded-sm bg-green-500 hover:bg-green-600 text-white "
          >
            Exit
          </div>
        </div>
      </Modal>
    );
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

  if (is_sunday) {
    return <SundayMessage />;
  }
  return (
    <DashboardLayout>
      <Head>
        <title>
          Dashboard | BENORML | Where fitness becomes your lifestyle
        </title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="my-4">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* <!-- Page header --> */}

          {finished && (
            <div className="block duration-300">
              <WellDone />
              {welldoneModal && (
                <WellDoneModal
                  finished={() => {
                    setFinished(false);
                    window.location.reload();
                  }}
                />
              )}
            </div>
          )}

          <div className="bg-white shadow-md rounded-xl">
            <div className="px-4 sm:px-6 lg:container bg-green-100 rounded-lg lg:mx-auto lg:px-8">
              <div className="py-6 md:flex md:items-center md:justify-between">
                {/* <!-- Profile --> */}
                <dl className="grid grid-cols-1 gap-x-4 gap-y-8 lg:grid-cols-4">
                  <div className="col-span-1 lg:col-span-3">
                    <div className="flex items-center">
                      <span className="hidden h-16 w-16 rounded-full sm:block">
                        {user_details.gender === "Female" ? (
                          <Image
                            className="hidden h-16 w-16 rounded-full sm:block"
                            src={WomanAvatar}
                            alt="avatar"
                          />
                        ) : (
                          <Image
                            className="hidden h-16 w-16 rounded-full sm:block"
                            src={ManAvatar}
                            alt="avatar"
                          />
                        )}
                      </span>
                      <div>
                        <div className="flex items-center">
                          <FaUserCircle className="h-16 w-16 rounded-full sm:hidden" />
                          <h1 className="ml-3 text-2xl font-semibold leading-7 text-gray-900 sm:leading-9 sm:">
                            Welcome, {username}!
                          </h1>
                        </div>
                        <dl className="mt-6 flex flex-col sm:ml-3 sm:mt-1 sm:flex-row sm:flex-wrap">
                          <dd className="mt-3 flex items-center text-sm text-gray-500 font-medium sm:mr-6 sm:mt-0 capitalize">
                            {/* <!-- Heroicon name: check-circle --> */}
                            <h2
                              id="timeline-title"
                              className="text-md text-justify italic font-semibold text-gray-900"
                            >
                              “The path to success is to take massive,
                              determined action.”
                            </h2>
                          </dd>
                          <p className="ml-auto max-w-2xl text-sm text-gray-700">
                            – Tony Robbins
                          </p>
                        </dl>
                      </div>
                    </div>
                  </div>

                  {/* <div className="sm:col-span-1 flex justify-center">
                <div className="m-auto">
                  <Link
                    to="/fitness/start"
                    className="inline-flex  m-auto items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-newblue-100 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    <BiRun size={27} className="mr-2" />
                    Start Workout
                  </Link>
                </div>
              </div> */}
                </dl>
              </div>
            </div>
          </div>

          <div className="mt-8 mx-auto grid grid-cols-1 gap-6 lg:grid-flow-col-dense lg:grid-cols-3">
            <div className="space-y-6 lg:col-start-1 lg:col-span-3">
              {/* <!-- Description list--> */}

              <section aria-labelledby="shadow-lg applicant-information-title">
                <div className="bg-gradient-to-r from-blue-100 to-orange-100 rounded-md shadow-lg sm:rounded-lg">
                  <div className="px-4 py-5 sm:px-6">
                    <h2
                      id="applicant-information-title"
                      className="text-2xl leading-6 font-bold text-gray-900"
                    >
                      Today's Workout
                    </h2>
                    <p className="mt-1 max-w-2xl text-lg text-gray-500">
                      Please remeber these workouts are carefully planned for
                      your only!
                    </p>
                  </div>
                  <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
                    <dl className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-8">
                      <div className="sm:col-span-1">
                        <WorkoutItem
                          data={{
                            title: "Warmup Exercises",
                            cooldown: today_data.warmup,
                          }}
                          number={1}
                          color="#125704"
                          refe="reference"
                          exerciseClicked={(exercise) => {
                            setCurrentReference(exercise);
                            ScrollToWorkout();
                          }}
                        />
                      </div>
                      <div className="sm:col-span-1">
                        <WorkoutSetsItem
                          data={{
                            title: "Workout",
                            cooldown: today_data.workout,
                            sets: today_data.sets,
                          }}
                          number={2}
                          color="red"
                          exerciseClicked={(link) => {
                            setCurrentReference(link);
                            ScrollToWorkout();
                          }}
                        />
                      </div>
                      <div className="sm:col-span-1">
                        <WorkoutItem
                          data={{
                            title: "Cooldown Exercises",
                            cooldown: today_data.cooldown,
                          }}
                          number={3}
                          color="#7c3aed"
                          exerciseClicked={(link) => {
                            setCurrentReference(link);
                            ScrollToWorkout();
                          }}
                        />
                      </div>
                      <div className="mt-7">
                        <WorkoutItem
                          data={{
                            title: "Cardio Exercises",
                            cooldown: today_data.cardio,
                          }}
                          number={4}
                          color="#084abb"
                          refe="reference"
                          exerciseClicked={(link) => {
                            setCurrentReference(link);
                            ScrollToWorkout();
                          }}
                        />
                      </div>
                    </dl>
                  </div>
                </div>
              </section>
            </div>
          </div>

          <div className="mt-8 mx-auto">
            <div className="sm:col-span-1 flex mx-auto justify-center">
              <div className="m-auto">
                <div
                  onClick={() => {
                    setFinished(true);
                    setWelldoneModal(true);
                    updateCurrentDate();
                  }}
                  className="inline-flex cursor-pointer  m-auto items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700"
                >
                  {/* <!-- Heroicon name: solid/mail --> */}
                  <BiRun size={27} className="mr-2" />
                  Finished!
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 mx-auto grid grid-cols-1 gap-6 lg:grid-flow-col-dense lg:grid-cols-3">
            <div className="space-y-6 lg:col-start-1 lg:col-span-3">
              {/* <!-- Description list--> */}

              <section aria-labelledby="shadow-lg applicant-information-title">
                <div className="bg-white rounded-md shadow-lg sm:rounded-lg">
                  <div className="px-4 py-5 sm:px-6">
                    <h2
                      id="applicant-information-title"
                      className="text-xl leading-6 font-bold text-gray-900"
                    >
                      Exercise References
                    </h2>
                    <p className="mt-1 max-w-2xl text-sm text-gray-500">
                      Click on the Video symbol on each exercise, which will
                      redirect you to that sepcific exercise
                    </p>
                  </div>
                  <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
                    <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-3">
                      <div className="sm:col-span-1">
                        <WorkoutReference {...current_reference} />
                      </div>
                    </dl>
                  </div>
                </div>
              </section>
            </div>
          </div>
          <div id="reference" ref={workoutRef}></div>
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
