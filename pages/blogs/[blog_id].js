import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import Layout from "../../components/Layout/Layout";
import SumanthImage from "../../assets/images/sumanth.jpg";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Support from "../../components/support";
import { addComment, getBlogs } from "../../api/blogs";
import { AiOutlineLoading } from "react-icons/ai";
import { HiUserCircle } from "react-icons/hi";
import moment from "moment";
import Loading from "../../components/Loading";

const BlogPage = ({ blogData }) => {
  const { isLoggedIn, token, name } = useSelector((store) => store);

  const [blog, setBlog] = useState(blogData);
  const [data, setData] = useState({
    error: "",
    success: "",
    relatedBlogs: [],
  });

  const submitComment = (e) => {
    e.preventDefault();
    setData({ ...data, error: "", success: "" });
    console.log(e.target[0].value);

    // SECURITY ISSUE
    addComment({
      blog_id: blog.permalink,
      token,
      comment: e.target[0].value,
      name,
    })
      .then((response) => {
        if (response.error) {
          setData({ ...data, error: true, success: false });
        } else {
          console.log("coommetn".response);
          setBlog({ ...blog, comments: [...blog.comments, response] });
          setData({ ...data, error: false, success: true });
        }
      })
      .catch((err) => {
        setData({ ...data, error: true, success: false });
      });
  };
  useEffect(() => {
    getBlogs(3)
      .then((blogs) => {
        setData({ ...data, relatedBlogs: blogs });
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  function createMarkup() {
    return { __html: blog.body };
  }

  if (!blog.body) {
    return <Loading />;
  }

  return (
    <Layout>
      <Head>
        <title> {blog.title} | BENORML Blogs</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <div className="relative mt-12 md:mt-20 lg:mt-24 my-10 overflow-hidden">
          <div className="mx-auto px-1 lg:max-w-7xl lg:px-8 lg:grid lg:grid-cols-12 lg:gap-8">
            <main className="col-span-12 lg:col-span-12 xl:col-span-8 mx-auto">
              {/* <!-- Blog section --> */}
              <div className="relative mx-auto py-3">
                <div className="relative md:max-w-5xl lg:max-w-6xl py-4 shadow-2xl">
                  <div className="text-left mx-auto px-4 sm:max-w-4xl sm:px-6 lg:px-8 lg:max-w-7xl">
                    <h2 className="text-base font-semibold tracking-wider text-cyan-600 uppercase">
                      Learn
                    </h2>
                    <p className="mt-2 text-3xl font-extrabold text-gray-900 tracking-tight sm:text-4xl">
                      {blog.title}
                    </p>
                    <div className="max-w-3xl mx-auto py-4 md:flex md:items-center md:justify-between md:space-x-5 lg:max-w-7xl lg:px-3">
                      <div className="flex items-center space-x-5">
                        <div className="flex-shrink-0">
                          <div className="relative">
                            <img
                              className="h-10 w-10 rounded-full"
                              src={
                                "https://benorml.com/static/media/sumanth.053cad2a.jpg"
                              }
                              alt="AuthorImage"
                            />
                            <span
                              className="absolute inset-0 shadow-inner rounded-full"
                              aria-hidden="true"
                            ></span>
                          </div>
                        </div>
                        <div>
                          <h1 className="text-xl font-bold text-gray-900">
                            {blog.author}
                          </h1>
                          <p className="text-sm font-medium text-gray-500">
                            Published on{" "}
                            <time className="mr-2" datetime="2020-08-25">
                              August 25, 2020
                            </time>{" "}
                            | <span className="ml-2">7 min read</span>{" "}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="text-justify">
                      <img
                        className="my-6 w-full text-gray-600"
                        src={blog.image_url}
                        alt=""
                      />
                      <div
                        className="leading-7"
                        dangerouslySetInnerHTML={createMarkup()}
                      />
                    </div>
                    {/* Comments */}

                    <section aria-labelledby="notes-title">
                      <div className="bg-white sm:rounded-lg sm:overflow-hidden">
                        <div className="divide-y divide-gray-200">
                          <div className="py-6">
                            <h2
                              id="notes-title"
                              className="text-xl font-semibold text-gray-900"
                            >
                              Comments
                            </h2>
                          </div>
                          <div className="px-4 py-6">
                            <ul className="space-y-8">
                              {blog.comments.map((comment, k) => (
                                <li key={k}>
                                  <div className="flex space-x-3">
                                    <div className="flex-shrink-0">
                                      <HiUserCircle className="h-10 w-10 rounded-full" />
                                    </div>
                                    <div>
                                      <div className="text-sm">
                                        <a
                                          href="#d"
                                          className="font-semibold text-gray-900"
                                        >
                                          {comment.name}
                                        </a>
                                      </div>
                                      <div className="mt-1 text-sm text-gray-700">
                                        <p>{comment.comment}</p>
                                      </div>
                                      <div className="mt-2 text-sm space-x-2">
                                        <span className="text-gray-500 font-medium">
                                          {moment(comment.timeAgo).fromNow()}
                                        </span>
                                        <span className="text-gray-500 font-medium">
                                          &middot;
                                        </span>
                                        <button
                                          type="button"
                                          className="text-gray-900 font-medium"
                                        >
                                          Reply
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                </li>
                              ))}{" "}
                            </ul>
                          </div>
                        </div>
                        {data.error && (
                          <div className="rounded-md bg-yellow-50 p-4">
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
                                <h3 className="text-sm font-medium text-yellow-800">
                                  Invalid comment
                                </h3>
                                <div className="mt-2 text-sm text-yellow-700">
                                  <p>
                                    Please use only Alpha-numeric characters to
                                    comment.
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                        <div className="bg-gray-50 px-4 py-6 sm:px-6">
                          <div className="flex space-x-3">
                            <div className="flex-shrink-0">
                              <HiUserCircle className="h-10 w-10 rounded-full" />
                            </div>
                            <div className="min-w-0 flex-1">
                              <form onSubmit={(e) => submitComment(e)}>
                                <div>
                                  <label htmlFor="comment" className="sr-only">
                                    About
                                  </label>
                                  <textarea
                                    id="comment"
                                    name="comment"
                                    rows="3"
                                    disabled={isLoggedIn ? false : true}
                                    className="shadow-sm block w-full focus:ring-blue-500 focus:border-blue-500 sm:text-sm border-gray-300 rounded-md"
                                    placeholder="Add a note"
                                  ></textarea>
                                </div>
                                <div className="mt-3 flex items-center justify-between">
                                  <div className="group inline-flex items-start text-sm space-x-2 text-gray-500 hover:text-gray-900"></div>
                                  <button
                                    type="submit"
                                    className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                  >
                                    Comment
                                  </button>
                                </div>
                              </form>
                            </div>
                          </div>
                        </div>
                      </div>
                    </section>
                  </div>
                </div>
              </div>
            </main>

            <aside className="hidden xl:block xl:col-span-4">
              <div className="sticky top-4 space-y-4">
                <section aria-labelledby="trending-heading">
                  <div className="bg-white rounded-lg shadow-2xl">
                    <div className="p-6">
                      <h2
                        id="trending-heading"
                        className="text-base font-medium text-gray-900"
                      >
                        Articles you may like
                      </h2>
                      <div className="mt-6 flow-root">
                        <ul className="-my-4 divide-y divide-gray-200">
                          {data.relatedBlogs.map((blog, k) => (
                            <li key={k} className="flex py-4 space-x-3">
                              <div className="flex-shrink-0">
                                <img
                                  className="h-16 w-16"
                                  src={blog.image_url}
                                  alt={blog.permalink}
                                />
                              </div>
                              <div className="min-w-0 flex-1">
                                <a
                                  href={`/blogs/${blog.permalink}`}
                                  target="_blank"
                                  rel="noreferrer"
                                  className="text-sm text-gray-800"
                                >
                                  {blog.title}
                                </a>
                                <p className="text-xs text-gray-800">
                                  {blog.author}
                                </p>
                                <div className="mt-2 flex">
                                  <span className="inline-flex items-center text-sm">
                                    <button className="inline-flex space-x-2 text-gray-400 hover:text-gray-500">
                                      {/* <!-- Heroicon name: solid/chat-alt --> */}
                                      <svg
                                        className="h-5 w-5"
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                        aria-hidden="true"
                                      >
                                        <path
                                          fill-rule="evenodd"
                                          d="M18 5v8a2 2 0 01-2 2h-5l-5 4v-4H4a2 2 0 01-2-2V5a2 2 0 012-2h12a2 2 0 012 2zM7 8H5v2h2V8zm2 0h2v2H9V8zm6 0h-2v2h2V8z"
                                          clip-rule="evenodd"
                                        />
                                      </svg>
                                      <span className="font-medium text-gray-900">
                                        {2}
                                      </span>
                                    </button>
                                  </span>
                                </div>
                              </div>
                            </li>
                          ))}
                          {/* <!-- More posts... --> */}
                        </ul>
                      </div>
                      <div className="mt-6">
                        <Link
                          href="/blogs"
                          className="w-full block text-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                        >
                          View all
                        </Link>
                      </div>
                    </div>
                  </div>
                </section>
              </div>
            </aside>
          </div>
        </div>
      </main>
    </Layout>
  );
};
export default BlogPage;
export async function getStaticProps({ params }) {
  console.time("blogData");
  const blogData = await fetch(
    `https://y576n6rio7.execute-api.ap-south-1.amazonaws.com/dev/blogs/${params.blog_id}`
  )
    .then((data) => data.json())
    .catch((err) => [{}]);
  console.timeEnd("blogData");
  // let cdata = [];
  return {
    props: { blogData: blogData[0] },
    revalidate: 60,
  };
}

export async function getStaticPaths() {
  const pathdata = await getBlogs(100);
  const paths = pathdata?.map((blog) => ({
    params: { blog_id: blog.permalink },
  }));
  return {
    paths,
    fallback: true,
  };
}
