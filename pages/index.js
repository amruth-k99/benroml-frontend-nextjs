import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import Layout from "../components/Layout/Layout";
import Logo from "../assets/logo_outline_1.png";
import Meditate from "../assets/Backgrounds/meditate.jpg";
import BlogsCategory from "../assets/images/blogs_category.jpg";
import YogaPose from "../assets/images/yoga_pose.jpg";
import FitnessCategory from "../assets/images/fitness_category.jpg";
import LogoOutLine from "../assets/logo-white-outline.png";
import Collage from "../assets/Backgrounds/collage.jpg";
import SumanthBabu from "../assets/images/thinking.jpg";
import { MdFitnessCenter } from "react-icons/md";
import { BiRun } from "react-icons/bi";
import { SiMicroDotBlog } from "react-icons/si";
import TopBlogs from "../components/Blogs/topBlogs";
import Yoga from "../assets/images/yoga.jpg";
import SumanthImage from "../assets/images/sumanth.jpg";
import Support from "../components/support";
import { BsArrowDown } from "react-icons/bs";
import { useSelector } from "react-redux";
import { useState } from "react";

export default function Fitness() {
  const { isLoggedIn, username } = useSelector((store) => store);
  const [reviews, setReview] = useState([]);
  const [aboutToExpire] = useState(false);
  const [expired] = useState(false);
  return (
    <Layout>
      <Head>
        <title>BENORML | Where fitness becomes your lifestyle</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <div className="bg-white overflow-hidden">
          <div className="max-w-7xl mx-auto">
            <div className="relative z-10 pb-8 bg-white sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
              <main className="my-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col my-auto justify-center sm:text-center mt-24 lg:mt-0 lg:h-screen lg:text-left">
                  <h1 className="text-5xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-8xl">
                    <span
                      className="block xl:inline my-3"
                      style={{ fontFamily: "audiowide" }}
                    >
                      {" "}
                      BENORML
                    </span>
                    <span
                      className="block text-2xl sm:text-3xl md:text-5xl mb-3 tracking-wide text-green-600"
                      style={{ fontFamily: "Kaushan Script" }}
                    >
                      Makes life happy
                    </span>
                  </h1>
                  <p className="mt-3 text-base text-black sm:mt-5 sm:text-xl lg:text-lg xl:text-xl">
                    Every second is a new chance to live happily.
                  </p>
                  <div className="mt-10 text-center mx-auto">
                    <a href="#read">
                      <BsArrowDown className="text-center animate-bounce duration-300 mx-auto text-3xl my-5 mb-7" />
                    </a>
                  </div>
                </div>
                <svg
                  className="hidden lg:block absolute right-0 inset-y-0 min-h-screen w-48 text-white transform translate-x-1/2"
                  fill="currentColor"
                  viewBox="0 0 100 100"
                  preserveAspectRatio="none"
                  aria-hidden="true"
                >
                  <polygon points="50,0 100,0 50,100 0,100" />
                </svg>
              </main>
            </div>
          </div>

          <div className="block lg:hidden lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
            <div className="w-full object-cover">
              <Image className="w-full object-cover" src={Meditate} alt="" />
            </div>
          </div>

          <div className="hidden lg:block lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
            <div style={{ height: "100vh" }} className="w-full object-cover">
              <Image
                className="w-full object-cover"
                src={Meditate}
                layout="fill"
                alt=""
              />
            </div>
          </div>
        </div>

        <div className="relative overflow-hidden">
          <main>
            {/* <!-- Feature section with grid --> */}

            <div
              id="read"
              className="bg-black lg:rounded-3xl pt-2 mt-20 pb-16 max-w-7xl text-center mx-auto"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12">
                <div className="col-span-1 lg:col-span-4 flex flex-col justify-center text-center mx-auto px-4 sm:px-6 lg:px-8">
                  <div className="mx-auto text-center">
                    <div className="my-auto text-center justify-center">
                      <h2
                        className="text-5xl lg:text-6xl my-4 font-extrabold text-white sm:text-4xl"
                        data-aos="fade-up"
                        data-aos-duration="600"
                      >
                        Categories
                      </h2>
                      <div className="mt-3 text-white">
                        Click on your preferred choice for more info{" "}
                      </div>

                      <Link href="/fitness">
                        <div className="flex justify-center hover:scale-110 duration-150 my-auto mt-3 rounded-md bg-white text-black p-1 py-2 w-full">
                          Click to find more about Fitness{" "}
                          <BiRun className="my-auto ml-2" />
                        </div>
                      </Link>

                      <Link href="/blogs">
                        <>
                          Click to find more about Blogs{" "}
                          <BiRun className="my-auto ml-2" />
                        </>
                      </Link>
                    </div>
                  </div>
                </div>

                <div className="col-span-1 lg:col-span-8 mx-auto text-center mt-10 py-12 sm:pb-16">
                  <div className="relative">
                    <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                      <div
                        className="mx-auto"
                        data-aos="fade-up"
                        data-aos-duration="600"
                        data-aos-delay="100"
                      >
                        <div className="mt-12 mx-auto">
                          <div className="text-center justify-center grid grid-cols-1 gap-14 sm:grid-cols-2 lg:grid-cols-2">
                            <SectionItem
                              title="Fitness"
                              image={FitnessCategory}
                              link="/fitness"
                              background="#ef4544"
                              icon={<MdFitnessCenter color="white" size="36" />}
                              description="Feel fit, healthy & confident with our engaging workouts to keep you driven."
                            />

                            <SectionItem
                              title="Blogs"
                              image={BlogsCategory}
                              link="/blogs"
                              background="#4f46e5"
                              icon={<SiMicroDotBlog color="white" size="36" />}
                              description="Knowledge, Information, Thoughts."
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:rounded-3xl pt-2 pb-16 max-w-7xl text-center mx-auto my-20 lg:my-36">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                <div>
                  <div
                    data-aos="fade-up"
                    data-aos-duration="600"
                    data-aos-delay="100"
                    className="aspect-w-10 aspect-h-6 lg:rounded-xl shadow-xl overflow-hidden sm:aspect-w-16 sm:aspect-h-7 lg:aspect-none lg:h-full"
                  >
                    <img
                      className="object-cover lg:h-full lg:w-full"
                      src={
                        "https://benorml.com/static/media/collage.221401c3.jpg"
                      }
                      alt=""
                    />
                  </div>
                </div>

                <div className="lg:rounded-3xl m-auto">
                  <div className="px-4 text-center sm:px-6 lg:px-8">
                    <p
                      data-aos="fade-up"
                      data-aos-duration="600"
                      data-aos-delay="100"
                      className="mt-2 text-4xl lg:text-6xl font-extrabold text-gray-900 tracking-tight"
                    >
                      Everything you need
                    </p>
                    <p
                      data-aos="fade-up"
                      data-aos-duration="600"
                      data-aos-delay="100"
                      className="mt-5 max-w-5xl mx-auto text-lg md:text-xl text-justify text-gray-700"
                    >
                      <div className="leading-7">
                        BENORML is designed in a way that every user can log in
                        and enjoy their user-designated account, enjoying
                        constant interaction with us. Offering you all these for
                        less money and with time efficiency. We, as a
                        fraternity, are handy for every person irrespective of
                        age and place. Our plans and products are based on{" "}
                        <span className="font-bold underline">
                          family traditions
                        </span>{" "}
                        making life simple, happy, and BENORML.
                      </div>
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="lg:rounded-3xl bg-black max-w-7xl text-center mx-auto my-10 lg:my-36">
              <div className="relative">
                <div className="h-80 absolute inset-x-0 bottom-0 xl:top-0 xl:h-full">
                  <div className="h-full w-full xl:grid xl:grid-cols-2">
                    <div className="h-full xl:relative xl:col-start-2">
                      <div className="h-full w-full object-cover lg:rounded-r-3xl xl:absolute xl:inset-0">
                        <img
                          className="h-full w-full object-cover lg:rounded-r-3xl xl:absolute xl:inset-0"
                          src={
                            "https://benorml.com/static/media/yoga_pose.c71cf7f5.jpg"
                          }
                          alt="People working on laptops"
                        />
                      </div>

                      <div
                        aria-hidden="true"
                        className="absolute inset-x-0 top-0 h-32  xl:inset-y-0 xl:left-0 xl:h-full xl:w-24"
                      ></div>
                    </div>
                  </div>
                </div>
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:max-w-7xl lg:px-8 xl:grid xl:grid-cols-2 xl:grid-flow-col-dense xl:gap-x-8">
                  <div className="relative pt-12 pb-64 sm:pt-24 sm:pb-64 xl:col-start-1 xl:pb-24">
                    <h2 className="text-sm font-semibold tracking-wide uppercase">
                      <span className="bg-gradient-to-r from-purple-300 to-indigo-300 bg-clip-text text-transparent">
                        We have more for you...
                      </span>
                    </h2>
                    <p className="mt-3 text-4xl lg:text-6xl font-extrabold text-white">
                      We believe in our methods
                    </p>
                    <p className="mt-5 text-lg md:text-xl text-justify text-gray-300">
                      <span className="font-semibold text-2xl">BENORML</span>{" "}
                      sincerely work for the betterment of our society by
                      respecting individual choices and preferences. We are
                      persistent in improving the overall happiness and
                      self-satisfaction of every individual and driven by our
                      own choices. Our aim is to make your life happy and
                      wholesome through an all-round living, both physically and
                      mentally. Therefore, we strive to provide happiness in our
                      known unique and experienced form of fitness and pursue
                      good habits.
                    </p>
                    <div className="mt-8 mb-24 grid grid-cols-1 gap-y-4 gap-x-6 sm:grid-cols-2">
                      <p>
                        <span className="block text-3xl font-bold text-white">
                          300+
                        </span>
                        <span className="mt-1 block text-base text-gray-300">
                          <span className="font-medium text-md text-white">
                            Active weekly users
                          </span>
                        </span>
                      </p>

                      <p>
                        <span className="block text-3xl font-bold text-white">
                          24/7
                        </span>
                        <span className="mt-1 block text-base text-gray-300">
                          <span className="font-medium text-md text-white">
                            Team Response
                          </span>{" "}
                        </span>
                      </p>

                      <p>
                        <span className="block text-3xl font-bold text-white">
                          100%
                        </span>
                        <span className="mt-1 block text-base text-gray-300">
                          <span className="font-medium text-md text-white">
                            Dedication
                          </span>
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <section className="py-12 bg-gray-50 overflow-hidden md:py-20 mb-10 lg:py-24">
              <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <svg
                  className="absolute top-full right-full transform translate-x-1/3 -translate-y-1/4 lg:translate-x-1/2 xl:-translate-y-1/2"
                  width="404"
                  height="404"
                  fill="none"
                  viewBox="0 0 404 404"
                  role="img"
                  aria-labelledby="svg-Benorml"
                >
                  <title id="svg-Benorml">Benorml</title>
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

                <div className="relative">
                  <div className="mx-auto h-12 w-54 opacity-5 z-0">
                    <Image className="w-54 h-12" src={Logo} alt="Benorml" />
                  </div>
                  <blockquote className="mt-10">
                    <div className="max-w-3xl mx-auto text-center text-2xl leading-9 font-medium text-gray-900">
                      <p className="bg-gray-50 text-black font-bold">
                        &ldquo;Family, culture & tradition are predominant in
                        life. Attain an enhanced version with simple & subtle
                        changes with BENORML&rdquo;
                      </p>
                    </div>
                    <footer className="mt-8">
                      <div className="md:flex md:items-center md:justify-center">
                        <div className="md:flex-shrink-0 ">
                          <div className="mx-auto h-10 w-10 rounded-full">
                            <Image
                              className="mx-auto h-10 w-10 rounded-full"
                              src={SumanthImage}
                              alt=""
                            />
                          </div>
                        </div>
                        <div className="mt-3 text-center md:mt-0 md:ml-4 md:flex md:items-center">
                          <div className="text-base font-medium text-gray-900">
                            Sumanth
                          </div>

                          <svg
                            className="hidden md:block mx-1 h-5 w-5 text-red-500"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M11 0h3L9 20H6l5-20z" />
                          </svg>

                          <div className="text-base font-medium text-gray-800">
                            CEO, Benorml
                          </div>
                        </div>
                      </div>
                    </footer>
                  </blockquote>
                </div>
              </div>
            </section>

            {/* <!-- Blog section --> */}
            <div className="relative bg-green-50 pt-6 pb-16 my-24">
              <div className="relative">
                <div className="text-center mx-auto max-w-md px-4 sm:max-w-3xl sm:px-6 lg:px-8 lg:max-w-7xl">
                  <h2
                    style={{ color: "#024438" }}
                    data-aos="fade-up"
                    data-aos-duration="600"
                    data-aos-delay="100"
                    className="text-base font-semibold tracking-wider text-cyan-600 uppercase"
                  >
                    Learn
                  </h2>
                  <p
                    data-aos="fade-up"
                    data-aos-duration="600"
                    data-aos-delay="100"
                    className="mt-2 text-3xl font-extrabold text-gray-900 tracking-tight sm:text-4xl"
                  >
                    Helpful Resources
                  </p>
                  <p
                    data-aos="fade-up"
                    data-aos-duration="600"
                    data-aos-delay="100"
                    className="mt-5 mx-auto max-w-prose text-xl text-gray-500"
                  >
                    What do you think?
                  </p>
                </div>
                <div className="mt-12 mx-auto max-w-md px-4 grid gap-8 sm:max-w-lg sm:px-6 lg:px-8 lg:grid-cols-3 lg:max-w-7xl">
                  <TopBlogs count={3} />
                </div>
              </div>
            </div>

            {/* <!-- Support Section --> */}
            <Support />
          </main>
        </div>
      </main>
    </Layout>
  );
}

const SectionItem = ({ image, link, icon, title, description }) => {
  return (
    <div className="pt-6 transform shadow-xl h-full hover:scale-105 rounded-lg hover:shadow-2xl duration-200 flex flex-1 w-full">
      <Link href={link}>
        <div
          data-aos="fade-up"
          data-aos-duration="600"
          data-aos-delay="100"
          className="flow-root bg-gray-50 rounded-lg px-6 pb-8 my-4 w-full"
        >
          <div className="-mt-24">
            <div>
              <span className="inline-flex items-center justify-center rounded-md shadow-lg">
                <Image
                  src={image}
                  className="transition transform duration-300 scale-100 hover:scale-105"
                  alt="cat"
                />
              </span>
            </div>
            <p className="mt-3 text-base text-gray-600 font-semibold">
              {description}
            </p>
          </div>
        </div>
      </Link>
    </div>
  );
};
