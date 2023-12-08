import React from "react";
import { Link } from "react-router-dom";
export default function TopFoundersCard() {
  return (
    <>
      <h1 className="w-full text-center text-4xl font-bold dark:text-white text-black my-5">
        Meet the Creators
      </h1>
      <div className="flex justify-evenly items-center max-lg:flex-col m-4 gap-5 mb-10 ">
        <div class="relative flex flex-col text-gray-700 bg-bgBlue dark:bg-darkBgPrimary  shadow-md rounded-xl ">
          <div class="relative mx-4 mt-4 overflow-hidden text-gray-700 max-w-md  w-60 h-60 max-lg:h-50 rounded-full ">
            <img
              src="https://firebasestorage.googleapis.com/v0/b/bluesky-e016b.appspot.com/o/profileImages%2F1670333844837.jpeg?alt=media&token=eac5a10b-d04a-4dde-822a-6c1fb49ff698"
              className="object-cover "
              alt="profile-picture"
            />
          </div>
          <div class="px-2 pt-2 text-center">
            <h4 class="block mb-2 font-sans text-2xl  font-semibold leading-snug tracking-normal text-black dark:text-white">
              Aryan Maurya
            </h4>
            <p class="block font-sans text-base  font-medium leading-relaxed text-transparent bg-gradient-to-tr from-pink-600 to-pink-400 bg-clip-text">
              CEO / Co-Founder
            </p>
          </div>
          <div class="flex justify-center py-2 pt-2 gap-7">
            <Link
              to="https://www.linkedin.com/in/aryan-maurya-1a589b24a/"
              target="_blank"
              class="block font-sans text-xl  font-normal leading-relaxed text-transparent bg-gradient-to-tr from-blue-600 to-blue-400 bg-clip-text"
            >
              <i class="fa fa-linkedin" aria-hidden="true"></i>
            </Link>
            <Link
              to="https://github.com/108aryanmaurya"
              target="_blank"
              class="block font-sans text-xl  font-normal leading-relaxed text-transparent bg-gradient-to-tr from-gray-100 to-black bg-clip-text"
            >
              <i class="fa fa-github" aria-hidden="true"></i>
            </Link>
          </div>
        </div>
        <div class="relative flex flex-col text-gray-700 bg-bgBlue dark:bg-darkBgPrimary shadow-md  rounded-xl ">
          <div class="relative mx-4 mt-4 overflow-hidden text-gray-700 w-60 h-60 max-lg:h-50 rounded-full ">
            <img
              src="https://firebasestorage.googleapis.com/v0/b/bluesky-e016b.appspot.com/o/profileImages%2Fprofileupdate.jpg?alt=media&token=7150bbc7-e7dd-4105-88c2-c724af894124"
              className="object-cover"
              alt="profile-picture"
            />
          </div>
          <div class="px-2 pt-2 text-center">
            <h4 class="block mb-2 font-sans text-2xl  font-semibold leading-snug tracking-normal text-black dark:text-white">
              Ashwin Maurya
            </h4>
            <p class="block font-sans text-base  font-medium leading-relaxed text-transparent bg-gradient-to-tr from-pink-600 to-pink-400 bg-clip-text">
              CEO / Co-Founder
            </p>
          </div>
          <div class="flex justify-center py-2 pt-2 gap-7">
            <Link
              to="https://www.linkedin.com/in/ashwin-maurya/"
              target="_blank"
              class="block font-sans text-xl  font-normal leading-relaxed text-transparent bg-gradient-to-tr from-blue-600 to-blue-400 bg-clip-text"
            >
              <i class="fa fa-linkedin" aria-hidden="true"></i>
            </Link>
            <Link
              to="https://github.com/ashwin-maurya"
              target="_blank"
              class="block font-sans text-xl  font-normal leading-relaxed text-transparent bg-gradient-to-tr from-gray-100 to-black bg-clip-text"
            >
              <i class="fa fa-github" aria-hidden="true"></i>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
