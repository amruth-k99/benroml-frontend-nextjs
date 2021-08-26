import Head from "next/head";
import Image from "next/image";
import Link from "next/link";

import { AllFitnessPlans } from "./../../components/fitnessPlans";
import Layout from "./../../components/Layout/Layout";
import Meditate from "../../assets/Backgrounds/meditate.jpg";
import Yoga from "assets/images/yoga.jpg";
import Shoes from "../../assets/Backgrounds/show-wallpaper-cropped.jpg";
import Squat from "../../assets/images/yoga_computer.jpg";
import Food from "../../assets/images/food1.jpg";
import Slider from "react-slick";
import HelpfulResources from "./../../components/Blogs/HelpfulResources";

import { AiFillCaretLeft, AiFillCaretRight } from "react-icons/ai";
import { useSelector } from "react-redux";
import { BsArrowDown } from "react-icons/bs";
import { BsArrowRight } from "react-icons/bs";
import { useEffect, useRef, useState } from "react";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import NavBar from "./../../components/Navbar";

export default function Fitness() {
  const { isLoggedIn, username } = useSelector((store) => store);
  const [reviews, setReview] = useState([]);
  const [aboutToExpire] = useState(false);
  const [expired] = useState(false);
  const plansRef = useRef();

  useEffect(() => {
    let new_reviews = [
      {
        name: "A M Sivakrishna",
        designation: "SK's Basics",
        comment: `I am able to lose my extra pounds naturally without any additional supplements and proper guidance were provided as per my body conditions. I believe in the process and Benorml helps to achieve my goals now.`,
      },
      {
        name: "Shalini",
        designation: "Executive engineer,  Apollo Tyres",
        comment: `I found BENROML as one of the best ways for those who is looking forward to kick start their new fitness beginnings. It has clear meal plans mentioned and a dashboard indicating the workouts, activity charts etc. Monitoring our own activities is one among the great ideas involved. Apart from these, it has the blogs where everyone can post their ideas or get to learn new things. I also found the plan cost to be quite good compared to many other fitness websites.`,
      },
      {
        name: "Mohana",
        designation: "MBA",
        comment:
          "Building muscle was never the goal, it was about building a lifestyle, I feel confident and at ease in my own skin thanks to Benorml. I am stronger and flexible still maintaining weight and shape. Little targets helped me stay on track and remain patient while I worked towards my objectives. BENORML has been there when I needed the nudge and I am healthier and happier in my daily fitness lifestyle and they are doing great at it...",
      },
      {
        name: "Harsha",
        designation: "M.Tech",
        comment: `First thing , your body and exercise will definitely eat the right nutrition for a healthy lifestyle. No matter what item you are consuming , make sure you know what you’re taking. BENORML will guide u and be like shadow in achieving your healthy life style goal`,
      },
    ];

    for (let i = 0; i < new_reviews.length; i++) {
      let comment = new_reviews[i].comment.split(" ");
      comment = comment.join(" ");
      new_reviews[i].comment = comment;
    }

    setReview(new_reviews);
  }, []);

  const ScrollToPlans = () => {
    if (plansRef.current) {
      plansRef.current.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    }
  };

  if (!reviews.length) {
    return "loading";
  }

  return (
    <Layout>
      <Head>
        <title>Fitness | BENORML | Where fitness becomes your lifestyle</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <div className="max-w-7xl mx-auto">
          <div className="relative z-10 pb-8 bg-white sm:pb-16 md:pb-20 lg:max-w-2xl lg:min-h-screen lg:w-full lg:pb-28 xl:pb-32">
            <svg
              className="hidden lg:block absolute right-0 inset-y-0 h-full w-48 text-white transform translate-x-1/2"
              fill="currentColor"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <polygon points="50,0 100,0 50,100 0,100" />
            </svg>

            <NavBar />

            <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
              <div className="sm:text-center lg:text-left">
                {isLoggedIn ? (
                  <p
                    data-aos="fade-up"
                    data-aos-duration="600"
                    data-aos-delay="100"
                    className="mt-3 text-base text-black sm:mt-5 sm:text-xl lg:text-lg xl:text-xl"
                  >
                    Hey{" "}
                    <span className="font-bold text-orange-500">
                      {username ? username.split(" ")[0] : ""}
                    </span>
                    , Good to see you today!
                  </p>
                ) : (
                  <p
                    data-aos="fade-up"
                    data-aos-duration="600"
                    data-aos-delay="100"
                    className="mt-3 text-base text-black sm:mt-5 sm:text-xl lg:text-lg xl:text-xl"
                  ></p>
                )}
                <h1
                  data-aos="fade-up"
                  data-aos-duration="600"
                  data-aos-delay="100"
                  className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl"
                >
                  <span className="block xl:inline">
                    {" "}
                    Fitness is a part of life’s journey.
                  </span>
                  <span className="block text-green-600">
                    Any place, Anywhere.
                  </span>
                </h1>
                <p
                  data-aos="fade-up"
                  data-aos-duration="600"
                  data-aos-delay="100"
                  className="mt-3 text-base text-black sm:mt-5 sm:text-xl lg:text-lg xl:text-xl"
                >
                  Our plan is about
                  <span className="font-bold uppercase">sustainability</span>.
                </p>
                {aboutToExpire && (
                  <div className="rounded-md bg-yellow-50 p-4 my-3">
                    <div className="flex">
                      <div className="flex-shrink-0">
                        {/* <!-- Heroicon name: solid/exclamation --> */}
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
                        <h3 className="text-sm text-left font-semibold text-yellow-800">
                          Your plan is about to expire
                        </h3>
                        <div className="mt-2 text-sm text-yellow-700">
                          <p>
                            Please renew the plan to continue receiving the
                            workouts
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                {expired && (
                  <div className="rounded-md bg-red-50 p-4 my-3">
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
                        <h3 className="text-sm text-left font-semibold text-red-800">
                          Your plan has expired.
                        </h3>
                        <div className="mt-2 text-sm text-red-700">
                          <p>
                            Please renew the plan to continue receiving the
                            workouts
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                <div
                  data-aos="fade-up"
                  data-aos-duration="600"
                  data-aos-delay="100"
                  className="mt-5 sm:mt-8 flex items-center justify-evenly sm:justify-center lg:justify-start"
                >
                  {isLoggedIn ? (
                    <>
                      {
                        <div className="rounded-md shadow">
                          <Link href="/fitness/dashboard">
                            <span className="flex items-center justify-center px-8 py-3 border duration-150 border-transparent text-base font-medium rounded-md text-white bg-orange-500 hover:bg-orange-600 md:py-4 md:text-lg md:px-10">
                              Dashboard
                            </span>
                          </Link>
                        </div>
                      }
                      <div className="sm:mt-0 sm:ml-3">
                        <a
                          onClick={ScrollToPlans}
                          className="flex items-center cursor-pointer justify-center px-8 py-3 duration-150 border border-transparent text-base font-medium rounded-md text-gray-800 bg-gray-200 hover:bg-gray-300 md:py-4 md:text-lg md:px-10"
                        >
                          Our Plans
                        </a>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="rounded-md shadow">
                        <a
                          href="#start"
                          className="flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10"
                        >
                          Get started
                        </a>
                      </div>
                      <div className="sm:mt-0 sm:ml-3">
                        <a
                          onClick={ScrollToPlans}
                          className="flex items-center cursor-pointer justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 md:py-4 md:text-lg md:px-10"
                        >
                          Our Plans
                        </a>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </main>
          </div>
          <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
            <div
              data-aos="fade-up"
              data-aos-duration="600"
              data-aos-delay="100"
              className="w-full object-cover h-72 md:h-96 lg:w-full lg:h-full"
            >
              <Image
                width={950}
                height={900}
                src={Yoga}
                objectFit="cover"
                alt=""
              />
            </div>
          </div>
        </div>

        {/* Why Benorml */}
        <div id="start" className="my-12 pb-5 overflow-hidden">
          {/* <div
          aria-hidden="true"
          className="absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-gray-100"
        ></div> */}
          <div className="mt-20 bg-gray-200">
            <div className="lg:mx-auto lg:max-w-7xl lg:px-8 lg:grid lg:grid-cols-2 lg:grid-flow-col-dense lg:gap-10">
              <div className="px-4 max-w-xl mx-auto sm:px-6 py-4 lg:py-32 lg:max-w-none lg:mx-0 lg:px-0 lg:col-start-2">
                <div>
                  <div>
                    <span className="h-12 w-12 my-5 rounded-md flex items-center justify-center bg-gradient-to-r from-purple-600 to-indigo-600">
                      {/* <!-- Heroicon name: outline/sparkles --> */}
                      <svg
                        className="h-6 w-6 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
                        />
                      </svg>
                    </span>
                  </div>
                  <div className="mt-6">
                    <h2
                      data-aos="fade-up"
                      data-aos-duration="600"
                      data-aos-delay="100"
                      className="text-4xl lg:text-5xl font-extrabold tracking-tight text-gray-900"
                    >
                      What is Fitness?
                    </h2>
                    <p
                      data-aos="fade-up"
                      data-aos-duration="600"
                      data-aos-delay="100"
                      className="mt-4 text-lg md:text-xl text-justify text-gray-700"
                    >
                      Fitness is simply the condition of being{" "}
                      <span className="font-bold">Physically Fit</span> and{" "}
                      <span className="font-bold">Healthy</span>. As human
                      beings, we all have particular roles in our life depending
                      on situations and age. It gives us the quality of being
                      suitable to fulfill those roles, improves the overall
                      health for longevity by staying active mentally as well.
                      Fitness is not about how you look, it’s about how you{" "}
                      <span className="font-bold">Feel</span>. It’s all about
                      Consistency.
                    </p>
                    <div className="mt-6">
                      <a
                        data-aos="fade-up"
                        data-aos-duration="600"
                        data-aos-delay="100"
                        onClick={ScrollToPlans}
                        className="inline-flex px-4 py-2 cursor-pointer border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700"
                      >
                        Our Plans
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-12 sm:mt-16 lg:mt-0 lg:col-start-1">
                <div className="sm:pr-6 lg:px-0 lg:m-0 lg:flex lg:h-full">
                  <img
                    className="w-full object-contain my-auto rounded-xl shadow-xl lg:w-auto"
                    src="https://benorml.com/static/media/show-wallpaper-cropped.54dba912.jpg"
                    alt="Customer profile user interface"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="relative mt-24">
            <div className="lg:mx-auto bg-gradient-to-r from-gray-800 to-red-600 lg:rounded-3xl lg:max-w-7xl lg:px-8 lg:grid lg:grid-cols-2 lg:grid-flow-col-dense lg:gap-24">
              <div className="px-4 max-w-xl mx-auto sm:px-6 lg:py-16 lg:max-w-none lg:mx-0 lg:px-0">
                <div>
                  <div className="mt-6">
                    <h2
                      data-aos="fade-up"
                      data-aos-duration="600"
                      data-aos-delay="100"
                      className="text-4xl lg:text-5xl font-extrabold tracking-tight text-white"
                    >
                      Why BENORML fitness?
                    </h2>
                    <p
                      data-aos="fade-up"
                      data-aos-duration="600"
                      data-aos-delay="100"
                      className="mt-4 text-xl text-white text-justify"
                    >
                      We strongly believe in transforming lives with fitness by
                      improving health, we are not in a number game like
                      counting calories. We have vast experience in the fitness
                      industry, specializing in various types of Training,
                      Diets, and Workouts of any kind. We personalize your plan
                      with a{" "}
                      <span className="font-bold text-xl text-white">
                        Designated User Account
                      </span>
                      , irrespective of the place (Home, Hostels, College, etc.)
                      and accessibility to equipment and food. Our trusted plan
                      is mainly about you spending{" "}
                      <span className="font-bold text-xl text-white">
                        less money
                      </span>{" "}
                      and{" "}
                      <span className="font-bold text-xl text-white">time</span>{" "}
                      on your goals. For us, diet is all about{" "}
                      <span className="font-bold text-xl text-white">
                        sustainability
                      </span>
                      .
                    </p>
                    <p
                      data-aos="fade-up"
                      data-aos-duration="600"
                      data-aos-delay="100"
                      className="text-white text-xl font-bold mt-3"
                    >
                      Trust us and follow our plans, live a healthy life by
                      joining us in your fitness journey.
                    </p>
                    <div className="mt-6">
                      <a
                        href="#s"
                        className="inline-flex px-8 font-bold py-2 border border-transparent text-base shadow-sm bg-white text-black duration-200"
                      >
                        Get started <BsArrowRight className="my-auto ml-3" />
                      </a>
                    </div>
                  </div>
                </div>
                <div
                  data-aos="fade-up"
                  data-aos-duration="600"
                  data-aos-delay="100"
                  className="mt-8 border-t border-gray-200 py-6"
                >
                  <blockquote>
                    <div>
                      <p className="text-justify text-xl text-white">
                        <span className="ml-3"></span>&ldquo;Fitness is a
                        lifetime element. Acquire lasting results through a slow
                        and steady process. Focus on the process over immediate
                        results. Trust the process and stay commited. &rdquo;
                      </p>
                    </div>
                    <footer className="mt-3 border-t-2 border-white pt-2">
                      <div className="flex items-center space-x-3">
                        <div className="flex-shrink-0">
                          <img
                            className="h-6 w-6 rounded-full"
                            src="https://benorml.com/static/media/yoga.5b79d528.jpg"
                            alt=""
                          />
                        </div>
                        <div className="text-xl font-medium text-white">
                          Sumanth Babu, CEO, Benorml Fitness
                        </div>
                      </div>
                    </footer>
                  </blockquote>
                </div>
              </div>
              <div className="mt-12 sm:mt-16 lg:mt-0">
                <div className="pl-4 sm:pl-6 lg:rounded-3xl md:-mr-16 lg:px-0 lg:m-0 lg:relative lg:h-full">
                  <img
                    data-aos="fade-up"
                    data-aos-duration="600"
                    data-aos-delay="100"
                    className="w-full object-contain h-72 lg:rounded-3xl md:h-96 lg:w-full lg:h-full"
                    src={
                      "https://benorml.com/static/media/yoga_computer.be2cf39e.jpg"
                    }
                    alt="Yoga infront of lappy"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="mt-20">
            <div className="lg:mx-auto lg:max-w-7xl lg:px-8 lg:grid lg:grid-cols-2 lg:grid-flow-col-dense lg:gap-24">
              <div className="px-4 max-w-xl sm:px-6 lg:py-32 lg:max-w-none lg:mx-0 lg:px-0 lg:col-start-2">
                <div>
                  <div>
                    <span className="h-12 w-12 rounded-md flex items-center justify-center bg-gradient-to-r from-purple-600 to-indigo-600">
                      {/* <!-- Heroicon name: outline/sparkles --> */}
                      <svg
                        className="h-6 w-6 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
                        />
                      </svg>
                    </span>
                  </div>
                  <div className="mt-6">
                    <h2
                      data-aos="fade-up"
                      data-aos-duration="600"
                      data-aos-delay="100"
                      className="text-5xl font-extrabold tracking-tight text-gray-900"
                    >
                      What is Benorml Diet?
                    </h2>
                    <p
                      data-aos="fade-up"
                      data-aos-duration="600"
                      data-aos-delay="100"
                      className="mt-4 text-lg text-justify text-gray-700"
                    >
                      Consciously creating and maintaining clean, healthy and
                      tradional food with portion control is more sustainable in
                      the long run than counting calories per meal. Not Every
                      Calorie is a calorie. Benorml Diet, indulges in healthy
                      food without compromising on taste and satiation. benorml
                      Diet can be followed universally.
                    </p>
                    <div className="mt-6">
                      <a
                        data-aos="fade-up"
                        data-aos-duration="600"
                        data-aos-delay="100"
                        onClick={ScrollToPlans}
                        className="inline-flex cursor-pointer px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700"
                      >
                        Our Plans
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-12 sm:mt-16 lg:mt-0 lg:col-start-1">
                <div className="pr-4 -ml-48 sm:pr-6 md:-ml-16 lg:px-0 lg:m-0 lg:relative lg:h-full">
                  <img
                    data-aos="fade-up"
                    data-aos-duration="600"
                    data-aos-delay="100"
                    className="w-full rounded-xl shadow-xl lg:absolute lg:right-0 lg:h-full lg:w-auto lg:max-w-none"
                    src={"https://benorml.com/static/media/food1.55904deb.jpg"}
                    alt="Spices"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Pricing */}
        <div
          ref={plansRef}
          className=" bg-gradient-to-r from-yellow-200 to-green-200"
        >
          {/* <!-- Pricing Section --> */}
          <div className="max-w-7xl my-16 lg:my-24 mx-auto pt-16 pb-24 px-4 sm:px-6 lg:px-8">
            <div className="sm:flex sm:flex-col justify-center sm:align-center mx-auto text-center">
              <h1
                data-aos="fade-up"
                data-aos-duration="600"
                data-aos-delay="100"
                className="text-4xl font-extrabold mx-auto text-gray-900 sm:text-center"
              >
                Pricing Plans
              </h1>
              <p
                data-aos="fade-up"
                data-aos-duration="600"
                data-aos-delay="100"
                className="mt-5 text-lg text-gray-900 sm:text-center"
              >
                ONLY Homemade food. NO supplements.
              </p>
            </div>
            <AllFitnessPlans />
          </div>
        </div>

        {/* <!-- Testimonial section --> */}
        <Reviews reviews={reviews} />

        {/* <!-- Blog section --> */}

        <HelpfulResources />
      </main>
    </Layout>
  );
}

const Reviews = ({ reviews }) => {
  const settings = {
    dots: true,
    infinite: true,
    slidesToScroll: 1,
    autoplay: true,
    speed: 700,
    slidesToShow: 1,
    autoplaySpeed: 6000,
    cssEase: "linear",
    nextArrow: <AiFillCaretRight color="black" size={40} />,
    prevArrow: <AiFillCaretLeft color="black" size={60} />,
    responsive: [
      {
        breakpoint: 580,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <section className="my-24 px-2 py-16 bg-gray-50 overflow-hidden">
      <div className="font-bold text-4xl text-center">Our Testimonials</div>
      <div
        data-aos="fade-up"
        data-aos-duration="600"
        data-aos-delay="100"
        className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        <svg
          className="absolute top-full right-full transform translate-x-1/3 -translate-y-1/4 lg:translate-x-1/2 xl:-translate-y-1/2"
          width="404"
          height="404"
          fill="none"
          viewBox="0 0 404 404"
          role="img"
          aria-labelledby="svg-workcation"
        >
          <defs>
            <pattern
              id="ad119f34-7694-4c31-947f-5c9d249b21f3"
              x="0"
              y="0"
              width="20"
              height="20"
              patternUnits="userSpaceOnUse"
            >
              <rect
                x="0"
                y="0"
                width="4"
                height="4"
                className="text-gray-200"
                fill="currentColor"
              />
            </pattern>
          </defs>
          <rect
            width="404"
            height="404"
            fill="url(#ad119f34-7694-4c31-947f-5c9d249b21f3)"
          />
        </svg>

        <div className="max-w-4xl mx-auto">
          <Slider {...settings}>
            {reviews.map((review, i) => (
              <div className="relative" key={i}>
                {/* <img
                  className="mx-auto h-8"
                  src="https://tailwindui.com/img/logos/workcation-logo-indigo-600-mark-gray-800-and-indigo-600-text.svg"
                  alt="Workcation"
                /> */}
                <div className="max-w-3xl mx-auto mt-10 text-center text-xl leading-9 font-medium text-gray-900">
                  <p style={{ maxWidth: "95vw" }}>{review.comment}</p>
                </div>
                <footer className="mt-8">
                  <div className="md:flex md:items-center md:justify-center">
                    <div className="md:flex-shrink-0">
                      {/* <img
                          className="mx-auto h-10 w-10 rounded-full"
                          src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixqx=njH25oYiQW&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                          alt=""
                        /> */}
                    </div>
                    <div className="mt-3 text-center md:mt-0 md:ml-4 md:flex md:items-center">
                      <div className="text-base font-medium text-gray-900">
                        - {review.name}
                      </div>

                      <svg
                        className="hidden md:block mx-1 h-5 w-5 text-indigo-600"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M11 0h3L9 20H6l5-20z" />
                      </svg>

                      <div className="text-base font-medium text-gray-500">
                        {review.designation}
                      </div>
                    </div>
                  </div>
                </footer>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </section>
  );
};
