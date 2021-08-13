import React from "react";
/* CSS in App.js as 'Card CSS' */
import TopBlogs from "./topBlogs";

const HelpfulResources = ({ count = 3 }) => {
  return (
    <div className="relative bg-green-50 pt-6 pb-16">
      <div className="relative">
        <div className="text-center mx-auto max-w-md px-4 sm:max-w-3xl sm:px-6 lg:px-8 lg:max-w-7xl">
          <h2 className="text-base font-semibold tracking-wider text-cyan-600 uppercase">
            Learn
          </h2>
          <p className="mt-2 text-3xl font-extrabold text-gray-900 tracking-tight sm:text-4xl">
            Helpful Resources
          </p>
          <p className="mt-5 mx-auto max-w-prose text-xl text-gray-500">
            What do you think!?
          </p>
        </div>
        <div className="mt-12 mx-auto max-w-md px-4 grid gap-8 sm:max-w-lg sm:px-6 lg:px-8 lg:grid-cols-3 lg:max-w-7xl">
          <TopBlogs count={count} />
        </div>
      </div>
    </div>
  );
};
export default HelpfulResources;
