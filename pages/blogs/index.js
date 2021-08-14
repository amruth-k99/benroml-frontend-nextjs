import Head from "next/head";
import Image from "next/image";
import Link from "next/link";

import { AllFitnessPlans } from "../../components/fitnessPlans";
import Layout from "../../components/Layout/Layout";
import Meditate from "../../assets/Backgrounds/meditate.jpg";
import Yoga from "../../assets/images/yoga.jpg";
import Shoes from "../../assets/Backgrounds/show-wallpaper-cropped.jpg";
import Squat from "../../assets/images/yoga_computer.jpg";
import Food from "../../assets/images/food1.jpg";
import Slider from "react-slick";
import Footer from "../../components/footer";
import HelpfulResources from "../../components/Blogs/HelpfulResources";

import { AiFillCaretLeft, AiFillCaretRight } from "react-icons/ai";
import { useSelector } from "react-redux";
import { BsArrowDown } from "react-icons/bs";
import { BsArrowRight } from "react-icons/bs";
import { useEffect, useState } from "react";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Support from "../../components/support";

export default function Fitness() {
  const { isLoggedIn, username } = useSelector((store) => store);
  const [reviews, setReview] = useState([]);
  const [aboutToExpire] = useState(false);
  const [expired] = useState(false);

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

  if (!reviews.length) {
    return "loading";
  }

  return (
    <Layout>
      <Head>
        <title>Blogs | BENORML | Where fitness becomes your lifestyle</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <div className="relative overflow-hidden">
          <main>
            {/* Stats */}
            <div id="read" className="bg-gray-50 pt-6">
              {/* <!-- Blog section --> */}
              <HelpfulResources count={10} />
            </div>

            <Support />
          </main>
          <Footer />
        </div>
      </main>
    </Layout>
  );
}
