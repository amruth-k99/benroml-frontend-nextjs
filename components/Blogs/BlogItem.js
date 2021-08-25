import React from "react";
// import { Link } from "react-router-dom";
import Image from "next/image";
import SumanthImage from "../../assets/images/sumanth.jpg";
const BlogCard = ({
  author,
  link,
  title,
  type,
  time,
  image,
  date,
  author_image = SumanthImage,
  description,
  delay = "100",
}) => {
  return (
    <div className="shadow-xl rounded-xl rounded-t-lg hover:shadow-2xl duration-200 flex">
      <a
        href={link}
        target="_blank"
        rel="noreferrer"
        data-aos="fade-up"
        data-aos-duration="600"
        data-aos-delay={delay}
        className="flex flex-col overflow-hidden rounded-xl"
      >
        <div className="flex-shrink-0">
          <img className="h-48 w-full object-cover" src={image} alt={title} />
        </div>
        <div className="flex-1 bg-white p-6 flex flex-col justify-between">
          <div className="flex-1">
            <p className="text-sm font-medium text-cyan-600">
              <a href="#s" className="hover:underline">
                {type}
              </a>
            </p>
            <a href={link} className="block mt-2">
              <p className="text-xl font-semibold text-gray-900">{title}</p>
              <p className="mt-3 text-base text-gray-500">{description}</p>
            </a>
          </div>
          <div className="mt-6 flex items-center">
            <div className="flex-shrink-0">
              <a href={link}>
                <span className="sr-only">{author}</span>
                <div className="h-10 w-10 rounded-full object-cover">
                  <Image
                    className="h-10 w-10 rounded-full object-cover"
                    src={author_image}
                    alt={"author"}
                  />
                </div>
              </a>
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-900">
                <a href={link} className="hover:underline">
                  {author}
                </a>
              </p>
              <div className="flex space-x-1 text-sm text-gray-500">
                <time dateTime="2021-03-16">{date}</time>
                <span aria-hidden="true">&middot;</span>
                <span>{time} read</span>
              </div>
            </div>
          </div>
        </div>
      </a>
    </div>
  );
};
export default BlogCard;
