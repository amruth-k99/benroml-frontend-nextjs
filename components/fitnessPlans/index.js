import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Router } from "next/router";
const AllFitnessPlans = () => {
  const [error, setError] = useState("");
  return (
    <div className="mt-12 space-y-4 sm:mt-16 sm:space-y-0 sm:grid sm:grid-cols-2 sm:gap-12 lg:max-w-4xl lg:mx-auto xl:max-w-none xl:mx-0 xl:grid-cols-3">
      {error !== "" && (
        <PaymentAlert
          data={error}
          color={error === "error" ? "red" : "green"}
          onClose={() => setError("")}
        />
      )}
      <PlanComponent
        title="Determination"
        price={2634}
        recommended="Try Us Out"
        months="3 months"
        includes
        delay="100"
        color="black"
        setError={(e) => setError(e)}
        description="It is the intent and desire to start your fitness journey. The body takes a proper 3 months to adapt to new beginnings."
      />
      <PlanComponent
        title="Dedication"
        price={4365}
        months="6 months"
        includes
        delay="250"
        recommended="Recommended"
        color="red"
        setError={(e) => setError(e)}
        description="It is the commitment of your fitness journey after the intent and desire. Staying committed gives excellent results. The body takes a proper 3-6 months to see change."
      />
      <PlanComponent
        title="Discipline"
        price={8364}
        months="12 months"
        includes
        delay="450"
        color="blue"
        setError={(e) => setError(e)}
        recommended="Loyal Benefits"
        description="It is the consistency of your dedication. With this plan, fitness becomes a part of your life."
      />
      {/* <PlanComponent
        title="16-week Transformation Plan"
        price="12000"
        months="16 weeks"
        color="yellow"
        delay="660"
        recommended="Quick Fix"
        description="It involves fad diets to follow with supplements and intense
    workouts"
      /> */}
    </div>
  );
};

const PlanComponent = ({
  description,
  title,
  color,
  months,
  price,
  includes,
  recommended,
  setError,
  delay = "100",
}) => {
  const { isLoggedIn, token, username, email } = useSelector((store) => store);

  const [user_subscribed, setState] = useState(false);
  const [discount_price, setPrice] = useState(price);
  const [coupon, setCoupon] = useState(null);
  const [validCoupon, setValidCoupon] = useState("null");
  const [className] = useState(
    `cursor-pointer uppercase rounded-t-xl block w-full ${
      color === "black" ? "bg-black" : `bg-${color}-500`
    } border border-transparent py-1 text-md font-semibold text-white text-center`
  );

  const [classNameBottom] = useState(
    `cursor-pointer uppercase rounded-b-xl -mb-2 block w-full ${
      color === "black" ? "bg-black" : `bg-${color}-500`
    } border border-transparent py-1 text-md font-semibold text-white text-center`
  );

  const onBuyNow = async () => {
    //PAYMENT
    if (!isLoggedIn) {
      Router.push({
        pathname: "/login",
        state: { error: "Please login to activate this plan!" },
      });
      return;
    }
    const data = await fetch("http://localhost:2001/payment/order", {
      body: JSON.stringify({ order_id: price, coupon }),
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": token,
      },
    }).then((res) => res.json());

    if (data.error) {
      setError("error");
      return;
    }
    console.log("qq", data);
    if (data.expiresIn) {
      setError("success");
    }

    const options = {
      // //Put this in an API
      key: "rzp_live_3HqMLIvFdKUrOV",
      name: "Benorml Fitness",
      description: `Payment for ${months} Fitness Subscription`,
      order_id: data.id,
      currency: data.currency,
      amount: 50000,
      //Here dont send amount, but, send
      handler: async (response) => {
        console.log(response);
        const res = await fetch("http://localhost:2001/payment/payment", {
          body: JSON.stringify({
            payment_id: response.razorpay_payment_id,
            amount: price,
            currency: data.currency,
          }),
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-auth-token": token,
          },
        }).then((res) => res.json());
        console.log(res);
        if (res.status === "captured") {
          setState(true);
          setError("success");
        } else {
          setError("error");
          return;
        }
      },
      prefill: {
        name: username,
        email: email,
        contact: "",
      },
      theme: {
        color: "#686CFD",
      },
    };

    const rzp1 = await new window.Razorpay(options);
    await rzp1.open();
  };

  const checkCoupon = async () => {
    fetch(`http://localhost:2001/fitness/refer/${price}/${coupon}`, {
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": token,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setValidCoupon(data.valid);
        if (data.valid && !isNaN(data.valid)) {
          setPrice(price - data.valid);
        }
      });
  };

  // if (user_subscribed) {
  //   return <Redirect to="fitness/dashboard" />;
  // }

  // if (loading) {
  //   return <Loading />;
  // }

  return (
    <div
      data-aos="fade-up"
      data-aos-duration="600"
      data-aos-delay={delay}
      className={`border-l-4 border-r-4 ${
        color === "black" ? "border-black" : `border-${color}-500`
      } bg-white rounded-xl shadow-sm divide-y divide-gray-200 mt-10 lg:mt-1`}
    >
      <div className={className}>{recommended}</div>

      <div className="p-6 px-4">
        <h2 className="text-2xl font-extrabold uppercase leading-6 text-center text-gray-900">
          {title}
        </h2>
        <p
          style={{ height: includes ? "90px" : "50px" }}
          className="mt-4 text-justify text-md text-gray-500"
        >
          {description}
        </p>
        <p className="mt-8 text-center">
          <span className="text-4xl text-center font-extrabold text-blue-900">
            ₹{discount_price}
          </span>
          <span className="text-base font-semibold text-gray-500">
            {" "}
            / {months}
          </span>
        </p>
        <p className="text-center">
          <span className="text-base text-gray-400">( inclusive of GST )</span>
        </p>{" "}
        <div className="flex my-2">
          <input
            id="referral"
            value={coupon}
            onChange={(e) => setCoupon(e.target.value)}
            name="referral"
            type="referral"
            placeholder="Enter coupon code"
            className="appearance-none block w-full text-black px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
          <button
            onClick={checkCoupon}
            className="ml-3 py-2 px-4 border border-pink-500 duration-150 hover:bg-pink-500 hover:text-white rounded-md shadow-sm text-xs text-pink-600"
          >
            Apply
          </button>
        </div>
        {/*  */}
        {validCoupon && !isNaN(validCoupon) && (
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
                  Congrats! a discount of ₹{" "}
                  <span className="font-semibold">{validCoupon}</span> has been
                  applied
                </p>
              </div>
            </div>
          </div>
        )}
        {/*  */}
        {validCoupon === "invalid" && (
          <div className="rounded-md bg-yellow-50 p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                {/* <!-- Heroicon name: solid/check-circle --> */}
                <svg
                  className="h-5 w-5 text-yellow-400"
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
                <p className="text-sm font-medium text-yellow-800">
                  This coupon is not applicable for this plan
                </p>
              </div>
            </div>
          </div>
        )}
        {/*  */}
        {validCoupon === false && (
          <div className="rounded-md bg-red-50 p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                {/* <!-- Heroicon name: solid/check-circle --> */}
                <svg
                  className="h-5 w-5 text-red-400"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fill-rule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                    clip-rule="evenodd"
                  />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-red-800">
                  Sorry! Invalid coupon
                </p>
              </div>
            </div>
          </div>
        )}
        {/*  */}
        <div
          onClick={onBuyNow}
          className="mt-6 block cursor-pointer w-full bg-gradient-to-r from-orange-500 to-pink-500 border border-transparent rounded-md shadow py-2 text-sm font-semibold text-white text-center hover:to-pink-600"
        >
          Buy {title} Plan
        </div>
        {/* <div
            onClick={onBuyNow}
            className="mt-8 cursor-pointer rounded-lg font-bold block w-full bg-green-600 border border-transparent py-4 text-lg text-white text-center hover:bg-green-700"
          >
            Buy Now!
          </div> */}
      </div>

      <div className="pt-6 pb-8 px-6">
        <h3 className="text-xs font-semibold text-gray-900 tracking-wide uppercase">
          What's included
        </h3>
        <ul className="mt-6 space-y-4">
          <li className="flex space-x-3">
            {/* <!-- Heroicon name: solid/check --> */}
            <svg
              className="flex-shrink-0 h-5 w-5 text-green-500"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fill-rule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clip-rule="evenodd"
              />
            </svg>
            <span className="text-sm text-gray-600">Daily Workout Plans</span>
          </li>
          <li className="flex space-x-3">
            {/* <!-- Heroicon name: solid/check --> */}
            <svg
              className="flex-shrink-0 h-5 w-5 text-green-500"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fill-rule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clip-rule="evenodd"
              />
            </svg>
            <span className="text-sm text-gray-700">Diet Guidance</span>
          </li>
          <li className="flex space-x-3">
            {/* <!-- Heroicon name: solid/check --> */}
            <svg
              className="flex-shrink-0 h-5 w-5 text-green-500"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fill-rule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clip-rule="evenodd"
              />
            </svg>
            <span className="text-sm text-gray-700">Workouts</span>
          </li>
          <li className="flex space-x-3">
            {/* <!-- Heroicon name: solid/check --> */}
            <svg
              className="flex-shrink-0 h-5 w-5 text-green-500"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fill-rule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clip-rule="evenodd"
              />
            </svg>
            <span className="text-sm text-gray-700">
              Designated user Account
            </span>
          </li>
          <li className="flex space-x-3">
            {/* <!-- Heroicon name: solid/check --> */}
            <svg
              className="flex-shrink-0 h-5 w-5 text-green-500"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fill-rule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clip-rule="evenodd"
              />
            </svg>
            <span className="text-sm text-gray-700">
              Constant Progress Tracking
            </span>
          </li>
        </ul>
      </div>

      <div className={classNameBottom}>{recommended}</div>
    </div>
  );
};

export { AllFitnessPlans };
