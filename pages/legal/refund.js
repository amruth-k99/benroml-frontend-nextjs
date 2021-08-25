import Layout from "@/components/Layout/Layout";
import React from "react";

const RefundPolicy = () => {
  return (
    <Layout>
      <div className="bg-white my-5">
        <div className="relative overflow-hidden">
          <main>
            {/* Stats */}
            <div className="relative py-16 bg-white overflow-hidden">
              <div className="hidden lg:block lg:absolute lg:inset-y-0 lg:h-full lg:w-full">
                <div
                  className="relative h-full text-lg max-w-prose mx-auto"
                  aria-hidden="true"
                >
                  <svg
                    className="absolute top-12 left-full transform translate-x-32"
                    width="404"
                    height="384"
                    fill="none"
                    viewBox="0 0 404 384"
                  >
                    <defs>
                      <pattern
                        id="74b3fd99-0a6f-4271-bef2-e80eeafdf357"
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
                      height="384"
                      fill="url(#74b3fd99-0a6f-4271-bef2-e80eeafdf357)"
                    />
                  </svg>
                  <svg
                    className="absolute top-1/2 right-full transform -translate-y-1/2 -translate-x-32"
                    width="404"
                    height="384"
                    fill="none"
                    viewBox="0 0 404 384"
                  >
                    <defs>
                      <pattern
                        id="f210dbf6-a58d-4871-961e-36d5016a0f49"
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
                      height="384"
                      fill="url(#f210dbf6-a58d-4871-961e-36d5016a0f49)"
                    />
                  </svg>
                </div>
              </div>
              <div className="relative px-4 sm:px-6 lg:px-8">
                <div className="text-lg max-w-prose mx-auto">
                  <h1>
                    <span className="mt-2 block text-3xl text-center leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                      Refund Policy
                    </span>
                  </h1>
                </div>
                <div className="mt-6 prose prose-indigo prose-lg max-w-5xl text-gray-500 mx-auto">
                  <h3>SERVICES</h3>
                  <p>
                    When you use our Services, we collect information about you
                    in the following general categories:
                  </p>
                  <ul>
                    <li>
                      Refund policy not applicable for Transformation plan(s)
                    </li>
                    <li>
                      Breach of trust/ misuse of service provided by BENORML PVT
                      LTD from the user end will lead to termination of contract
                      period.
                    </li>
                    <li>
                      If any problem during the duration of Diet plan will be
                      considered in the review process & no monetary refund will
                      be entertained; in case of exceptional cases, BENORML PVT
                      LTD will take a final call.
                    </li>
                    <li>
                      Any dispute arising will be resolved with a humanitarian
                      approach to make the customer happy.
                    </li>
                    <li>
                      For any type of queries, contact{" "}
                      <a href="mailto:support@benorml.com">
                        support@benorml.com
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </Layout>
  );
};

export default RefundPolicy;
