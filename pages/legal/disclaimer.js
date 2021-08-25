import Layout from "@/components/Layout/Layout";
import React from "react";
const DisclaimerPage = () => {
  return (
    <Layout>
      <div className="bg-white">
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
                  <svg
                    className="absolute bottom-12 left-full transform translate-x-32"
                    width="404"
                    height="384"
                    fill="none"
                    viewBox="0 0 404 384"
                  >
                    <defs>
                      <pattern
                        id="d3eb07ae-5182-43e6-857d-35c643af9034"
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
                      fill="url(#d3eb07ae-5182-43e6-857d-35c643af9034)"
                    />
                  </svg>
                </div>
              </div>
              <div className="relative px-4 sm:px-6 lg:px-8">
                <div className="text-lg max-w-prose mx-auto">
                  <h1>
                    <span className="mt-2 block text-3xl text-center leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                      Disclaimer Policy
                    </span>
                  </h1>
                </div>
                <div className="mt-6 prose prose-indigo prose-lg max-w-5xl text-gray-500 mx-auto">
                  <p>
                    The information provided by BENORML (“we”, “us” or “our”) on
                    benorml.com (“the site”) (and our mobile application) is for
                    general information purposes only. All information on the
                    site (and our mobile application) is provided in good faith,
                    however we make no representation or warranty of any kind,
                    express or implied, regarding the accuracy, adequacy,
                    validity, reliability, availability or completeness of any
                    information on the site (or our mobile application).
                  </p>
                  <p>
                    Under no circumstances shall we have any liability to you
                    for any loss or damage of any kind incurred as a result of
                    the use of the site. (or our mobile application). Your use
                    of the website (and our mobile application) and your
                    reliance on any information on the site. (and our mobile
                    application) is solely at your own risk.
                  </p>

                  <h2>HEALTH RELATED INFORMATION</h2>
                  <p>
                    Health Related Information. The information contained in the
                    Web Site is provided for informational purposes only and is
                    not meant to substitute for the advice provided by your
                    doctor or other health care professional. You should not use
                    the information available on or through the Web Site
                    (including, but not limited to, information that may be
                    provided on the Web Site by healthcare or nutrition
                    professionals employed by or contracting with BENORML PVT
                    LTD) for diagnosing or treating a health problem or disease,
                    or prescribing any medication. Information and statements
                    regarding dietary supplements have not been evaluated by the
                    Food and Drug Administration and are not intended to
                    diagnose, treat, cure, or prevent any disease. You should
                    read carefully all product packaging prior to use. The
                    results from the products will vary from person to person.
                    No individual result should be seen as typical.
                  </p>

                  <h2>EXTERNAL LINKS DISCLAIMER FOR WEBSITE</h2>
                  <p>
                    The site (and our mobile application) may contain (or may be
                    sent through the site) [or our mobile application] links to
                    other websites or content belonging to or originating from
                    third parties or links to websites and features in banners
                    or other advertising. Such external links are not
                    investigated, monitored or checked for accuracy, adequacy,
                    validity, reliability or completeness by us.
                  </p>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </Layout>
  );
};

export default DisclaimerPage;
