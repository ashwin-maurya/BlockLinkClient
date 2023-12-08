import React from "react";
import { BlogLink } from "../../Assets/icons";
import { Link } from "react-router-dom";

export default function MainAboutUs() {
  return (
    <>
      <section className="pb-24">
        <div className="relative mb-20 h-96">
          <img
            className="object-cover object-right w-full h-full"
            src="https://img.freepik.com/premium-photo/network-connections-world-global-link-generate-ai_98402-22435.jpg?w=900"
            alt=""
          />
          <img
            className="absolute bottom-0 left-0 object-cover w-40 h-40 ml-4 -mb-16 rounded-full lg:ml-12 lg:-mb-24 lg:w-60 lg:h-60 dark:bg-black bg-primaryMain  rotate-90"
            src={BlogLink}
            alt=""
          />
        </div>
        <div className="max-w-3xl px-4 mx-auto text-center">
          <i className="fa fa-quote-right text-4xl text-gray-400 dark:text-darkTextPrimary mb-4"></i>
          <h2 className="text-3xl font-bold text-gray-700 mb-14 lg:text-5xl dark:text-gray-400 font-serif capitalize">
            You are the greatest project you will <br /> ever work on.
          </h2>

          <div className="mx-auto md:max-w-3xl">
            <p className="pb-10 mb-8  text-gray-500 border-b border-gray-200 dark:border-gray-600 dark:text-gray-400 md:text-xl">
              "Discover the tech stories that matter. Join the conversation on
              BlogLink and be part of the digital revolution"
            </p>

            <div className="p-6 mb-4 bg-gray-100 border-l-2 border-blue-500 dark:border-blue-400 dark:bg-gray-900">
              <p className="mb-4 text-xl leading-tight text-gray-800 dark:text-gray-300 md:text-2xl">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam
              </p>
              <span className="text-base text-gray-400 dark:text-gray-400 md:text-lg">
                — John Doe, CEO &amp; Founder
              </span>
            </div>

            <div className="mx-auto md:max-w-3xl">
              <p className="pb-10 mb-8  text-gray-500 border-b border-gray-200 dark:border-gray-600 dark:text-gray-400 md:text-xl">
                Welcome to BlogLink, your premier source for tech insights and
                knowledge. Founded by Ashwin Maurya and Aryan Maurya, BlogLink
                is dedicated to making technology understandable and enjoyable
                for everyone.
              </p>

              <h2 className="mb-4 text-2xl font-semibold text-gray-800 md:text-3xl dark:text-gray-300">
                Our Story
              </h2>
              <p className="mb-4 text-base text-gray-500 md:text-lg dark:text-gray-400">
                BlogLink began as a side project, born out of a shared passion
                for technology and a desire to share knowledge with the world.
                Ashwin and Aryan, both seasoned developers, envisioned a
                platform where they could contribute their expertise and
                insights on a wide range of tech topics.
              </p>

              {/* Add more sections for Mission and Vision, Unique Selling Proposition, Topics We Cover, etc. */}

              <h2 className="mb-4 text-2xl font-semibold text-gray-800 md:text-3xl dark:text-gray-300">
                Mission and Vision
              </h2>
              <p className="mb-4 text-base text-gray-500 md:text-lg dark:text-gray-400">
                At BlogLink, our mission is to empower individuals with
                knowledge about the ever-evolving tech landscape. We believe in
                making tech understandable and enjoyable for everyone, from
                beginners to seasoned professionals.
              </p>

              {/* Add more sections as needed for Unique Selling Proposition, Topics We Cover, Founding Team, etc. */}

              <h2 className="mb-4 text-2xl font-semibold text-gray-800 md:text-3xl dark:text-gray-300">
                Get Involved
              </h2>
              <p className="mb-10 text-base text-gray-500 dark:text-gray-400 md:text-lg">
                Whether you're a seasoned developer or just starting your tech
                journey, BlogLink is here for you. Connect with us on social
                media, explore our articles, and be part of our growing
                community!
              </p>
            </div>

            <div className="flex items-center justify-center mt-4 space-x-5">
              <Link
                to="#"
                className=" text-gray-500 hover:text-gray-900 dark:hover:text-white"
              >
                <i className="fa fa-facebook text-3xl"></i>
              </Link>
              <Link
                to="#"
                className=" text-gray-500 hover:text-gray-900 dark:hover:text-white"
              >
                <i className="fa fa-linkedin text-3xl"></i>
              </Link>
              <Link
                to="#"
                className=" text-gray-500 hover:text-gray-900 dark:hover:text-white"
              >
                <i className="fa fa-twitter text-3xl"></i>
              </Link>
              <Link
                to="#"
                className=" text-gray-500 hover:text-gray-900 dark:hover:text-white"
              >
                <i className="fa fa-github text-3xl"></i>
              </Link>
              <Link
                to="#"
                className=" text-gray-500 hover:text-gray-900 dark:hover:text-white"
              >
                <i className="fa fa-codepen text-3xl"></i>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
