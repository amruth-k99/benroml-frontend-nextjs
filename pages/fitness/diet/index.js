import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import DashboardLayout from "./../../../components/Layout/DashboardLayout";
import { useDispatch, useSelector } from "react-redux";
import YetToStart from "./../../../components/yet_to_start";
import Loading from "./../../../components/Loading";
import {
  clearData,
  setTodaysWorkout,
} from "../../../redux/actions/userActions";
import { useEffect, useState } from "react";

export default function FitnessDashboard() {
  const dispatch = useDispatch();
  const { token, meal_plan } = useSelector((store) => store);
  const [data, setData] = useState({});
  const [active_plan, setActvePlan] = useState(true);
  const [yet_to_start, setYetToStart] = useState(true);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (meal_plan) {
      setData(meal_plan);
      setLoading(false);
      return;
    }
    fetch(
      `https://e1i8ucbq53.execute-api.ap-south-1.amazonaws.com/dev/fitness/mealplan`,
      {
        headers: {
          "x-auth-token": token,
        },
      }
    )
      .then((res) => res.json())
      .then((res) => {
        console.log("mealplan", res);

        if (res.notLoggedIn) {
          dispatch(clearData());
          return;
        }

        if (!res.active_plan) {
          setActvePlan(false);
          return;
        }

        if (res.yet_to_start) {
          setYetToStart(true);
          setLoading(false);
        } else {
          setYetToStart(false);
        }

        setData(res);
        dispatch({
          type: "SET_MEALPLAN",
          payload: res,
        });

        setLoading(false);
      });
  }, []);

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
        <title>
          Dashboard | BENORML | Where fitness becomes your lifestyle
        </title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl my-5 leading-6 font-bold text-black">
            Meal Plans
          </h2>

          {/* <!-- Weekly Track --> */}
          <section
            aria-labelledby="timeline-title"
            className="lg:col-start-3 lg:col-span-1"
          >
            <div className="bg-white shadow sm:rounded-lg my-7">
              <div className="px-4 py-5 sm:px-6">
                <h2
                  id="timeline-title"
                  className="text-xl leading-6 font-bold text-gray-900"
                >
                  Sample Meal Plan
                </h2>
                <p className="mt-1 max-w-2xl text-sm text-gray-500">
                  This is not a mandatory diet you must follow. This is just a
                  sample meal plan you might take ideas from!
                </p>
              </div>
              <div className="border-t pt-5 flow-root">
                <div className="bg-gray-50 pr-4 sm:pr-6 lg:pr-8 lg:flex-shrink-0 lg:border-l lg:border-gray-200 xl:pr-0">
                  <div className="sm:block">
                    <div className="mx-auto">
                      <div className="flex flex-col mt-2">
                        <div className="align-middle min-w-full overflow-x-auto shadow overflow-hidden sm:rounded-lg">
                          <table className="min-w-full divide-y divide-gray-200">
                            <thead>
                              <tr>
                                <th className="px-6 py-3 bg-yellow-500 text-left text-xs font-medium text-white uppercase tracking-wider">
                                  Day
                                </th>
                                <th className="px-6 py-3 bg-yellow-500 text-left text-xs font-medium text-white uppercase tracking-wider">
                                  Meal-1
                                </th>
                                <th className="px-6 py-3 bg-yellow-500 text-left text-xs font-medium text-white uppercase tracking-wider md:block">
                                  Meal-2
                                </th>
                                <th className="px-6 py-3 bg-yellow-500 text-left text-xs font-medium text-white uppercase tracking-wider">
                                  Meal-3
                                </th>
                              </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                              <TrackItem data={data.monday} day={"Monday"} />
                              <TrackItem data={data.tuesday} day={"Tuesday"} />
                              <TrackItem
                                data={data.wednesday}
                                day={"Wednesday"}
                              />
                              <TrackItem
                                data={data.thursday}
                                day={"Thursday"}
                              />
                              <TrackItem data={data.friday} day={"Friday"} />
                              <TrackItem
                                data={data.saturday}
                                day={"Saturday"}
                              />
                              <TrackItem data={data.sunday} day={"Sunday"} />
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
    </DashboardLayout>
  );
}

const TrackItem = ({ data, day }) => {
  //try different column colors

  const nonVeg =
    "meatchickeneggmuttonbiryanifishchicken biryanimutton biryanichicken curryeggsbolied eggs";

  return (
    <tr className="bg-white">
      <td className=" px-6 py-4 whitespace-nowrap text-gray-900">
        <a href="#s" className="group inline-flex space-x-2 truncate">
          <p className="text-gray-800 text-lg font-bold truncate group-hover:text-gray-900">
            {day}
          </p>
        </a>
      </td>
      <td className="px-6 py-2 text-left text-blue-600 whitespace-nowrap">
        {data["meal1"].map((item, k) => (
          <p
            className={
              nonVeg.includes(item[0].toLowerCase()) ? "text-red-600" : ""
            }
          >
            {console.log(nonVeg.includes(item[0].toLowerCase()))}
            {item[0]} - {item[1]}
          </p>
        ))}
      </td>
      <td className="px-6 py-2 text-left whitespace-nowrap text-blue-600">
        {data["meal2"].map((item, k) => (
          <p
            className={
              nonVeg.includes(item[0].toLowerCase()) ? "text-red-600" : ""
            }
          >
            {item[0]} - {item[1]}
          </p>
        ))}
      </td>
      <td className="px-6 py-2 text-left whitespace-nowrap text-blue-600">
        {data["meal3"].map((item, k) => (
          <p
            className={
              nonVeg.includes(item[0].toLowerCase()) ? "text-red-600" : ""
            }
          >
            {item[0]} - {item[1]}
          </p>
        ))}
      </td>
    </tr>
  );
};
