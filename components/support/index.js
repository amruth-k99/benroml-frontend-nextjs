import React from "react";

const Support = () => {
  return (
    <div className="relative bg-gray-900">
      <div className="relative h-56 bg-black sm:h-72 md:absolute md:left-0 md:h-full md:w-1/2">
        <img
          data-aos="fade-up"
          data-aos-duration="600"
          data-aos-delay="100"
          className="w-full h-full object-cover"
          src="https://images.unsplash.com/photo-1525130413817-d45c1d127c42?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1920&q=60&sat=-100"
          alt=""
        />
        <div className="text-red-600 -mt-16 z-40" style={{ zIndex: "100" }}>
          Always happy to help
        </div>
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-r from-teal-500 to-cyan-600"
          style={{ mixBlendMode: "multiply" }}
        ></div>
      </div>
      <div className="relative mx-auto max-w-md px-4 py-12 sm:max-w-7xl sm:px-6 sm:py-20 md:py-28 lg:px-8 lg:py-32">
        <div className="md:ml-auto md:w-1/2 md:pl-10">
          <h2
            data-aos="fade-up"
            data-aos-duration="600"
            data-aos-delay="100"
            className="text-base font-semibold uppercase tracking-wider text-gray-300"
          >
            Support
          </h2>
          <p
            data-aos="fade-up"
            data-aos-duration="600"
            data-aos-delay="100"
            className="mt-2 text-white text-3xl font-extrabold tracking-tight sm:text-4xl"
          >
            Let Us know if you have any questions...
          </p>
          <p
            data-aos="fade-up"
            data-aos-duration="600"
            data-aos-delay="100"
            className="mt-3 text-lg text-gray-300"
          >
            Actively discuss with our team about your thoughts, comments &
            ideas.
          </p>
          <div
            className="mt-8"
            data-aos="fade-up"
            data-aos-duration="600"
            data-aos-delay="100"
          >
            <div className="inline-flex rounded-md shadow">
              <a
                href="mailto:sumirosemahesh@gmail.com"
                className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-gray-900 bg-white hover:bg-gray-50"
              >
                Contact Us
                {/* <!-- Heroicon name: external-link --> */}
                <svg
                  className="-mr-1 ml-3 h-5 w-5 text-gray-400"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
                  <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Support;
