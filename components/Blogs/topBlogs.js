import React, { useState, useEffect } from "react";
/* CSS in App.js as 'Card CSS' */
import { getBlogs } from "../../api/blogs";
import BlogCard from "./BlogItem";

const TopBlogs = ({ count = 3 }) => {
  const [blogs, setBlogs] = useState([]);
  useEffect(() => {
    getBlogs(count)
      .then((blogs) => {
        setBlogs(blogs);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return blogs.map((blog) => (
    <BlogCard
      type={blog.type}
      title={blog.title}
      author={blog.author}
      date="Mar 16, 2020"
      time={blog.read_time}
      delay="100"
      link={`/blogs/${blog.permalink}`}
      image={blog.image_url}
      description={blog.description}
    />
  ));
};
export default TopBlogs;
