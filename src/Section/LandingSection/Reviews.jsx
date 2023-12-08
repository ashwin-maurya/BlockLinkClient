import React, { useState, useEffect } from "react";
import { reviewEmojis } from "../../Component/constants";

export default function Reviews() {
  const [reviews, setReviews] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === reviews.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? reviews.length - 1 : prevIndex - 1
    );
  };

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch(
          "https://bloglinkbackend-it3i.onrender.com/api/feedback/getReviews",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (response.ok) {
          const data = await response.json();
          setReviews(data.success ? data.reviews : []);
        } else {
          console.error("Error fetching reviews:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };

    fetchReviews();
  }, []);
  const getEmojiFillColor = (index, rating) => {
    const fillClass =
      index === rating - 1
        ? "fill-red-500"
        : "fill-gray-300 dark:fill-gray-500";
    const sizeClass =
      index === rating - 1 ? "w-12 max-sm:w-10 " : " w-10 max-sm:w-8"; // Increase size for the selected emoji
    return `${fillClass} ${sizeClass}`;
  };
  return (
    <>
      <div className="my-32 max-sm:my-16 max-lg:my-20 mx-auto ">
        <div className="flex flex-col text-center w-full mb-10">
          <h2 className="text-xs dark:text-secondary text-primaryMain font-medium title-font tracking-[5px]">
            USER EXPERIENCES
          </h2>
        </div>
        <div className="relative flex">
          <button
            className=" text-primaryMain dark:text-secondary hover:underline  hover:bg-gray-100 dark:hover:bg-darkBgPrimary p-5 max-lg:p-2 rounded-r-lg"
            onClick={prevSlide}
          >
            <i className="fa fa-chevron-left text-lg w-5 h-3"></i>
          </button>{" "}
          <div className="xl:w-[50%] lg:w-3/4 w-full mx-auto text-center">
            <i className="fa fa-quote-right text-4xl text-gray-400  dark:text-darkTextPrimary mb-8"></i>
            <p className="text-gray-500 dark:text-darkTextPrimary flex justify-center my-3">
              <p className="text-gray-500 dark:text-darkTextPrimary flex justify-center my-3 items-center">
                {Array.from({ length: 5 }, (_, index) => (
                  <span
                    className={`${getEmojiFillColor(
                      index,
                      reviews[currentIndex]?.rating
                    )}  rounded-full mx-1`}
                    key={index}
                    dangerouslySetInnerHTML={{
                      __html: reviewEmojis[index]?.svg,
                    }}
                  />
                ))}
              </p>
            </p>
            <p className="leading-relaxed text-lg max-lg:text-md text-lightTextMain dark:text-darkTextMain ">
              {reviews[currentIndex]?.description &&
              reviews[currentIndex]?.description.length > 200
                ? reviews[currentIndex]?.description.slice(0, 200) + "..."
                : reviews[currentIndex]?.description}
            </p>
            <span className="inline-block h-1 w-10 rounded bg-primaryMain dark:bg-secondary mt-8 mb-6"></span>
            <img
              src={reviews[currentIndex]?.author.profileImg}
              alt=""
              className="w-10 h-10 object-cover object-top rounded-full  m-auto mb-1 "
            />
            <h2 className="font-medium title-font tracking-wider text-sm text-lightTextMain dark:text-darkTextMain">
              {reviews[currentIndex]?.author.username}
            </h2>
            <p className="text-gray-500 dark:text-darkTextPrimary">
              {reviews[currentIndex]?.author.work}
            </p>
          </div>
          <button
            className=" text-primaryMain dark:text-secondary hover:underline  hover:bg-gray-100 dark:hover:bg-darkBgPrimary p-5 max-lg:p-2 rounded-l-lg"
            onClick={nextSlide}
          >
            <i className="fa fa-chevron-right text-lg w-5 h-3"></i>
          </button>
          <div className="absolute w-[100%] flex justify-between"></div>
        </div>
      </div>
    </>
  );
}
