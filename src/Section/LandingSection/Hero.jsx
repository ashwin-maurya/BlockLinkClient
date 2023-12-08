import React, { useState, useEffect } from "react";
import HomeHeroSkeleton from "../../Component/SkeletonLoaders/HomeHeroSkeleton";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { BannerImg } from "../../Assets/images";
import "react-toastify/dist/ReactToastify.css";
const Hero = () => {
  const [randomBlog, setRandomBlog] = useState(null);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setRandomBlog(null);
    setLoading(true);

    const fetchRandomBlog = async () => {
      try {
        const response = await fetch(
          "https://bloglinkbackend-it3i.onrender.com/api/blogs/fetchrandomblog"
        );
        const data = await response?.json();
        setRandomBlog(data);
      } catch (error) {
        console.error("Error fetching random blog:", error);
      }
    };

    fetchRandomBlog().then(() => {
      setLoading(false);
    });
  }, []);

  return (
    <>
      <section className="w-full relative flex items-center flex-col">
        {loading ? (
          <HomeHeroSkeleton />
        ) : (
          randomBlog && (
            <>
              <img
                src={
                  randomBlog?.Blog_url != "" ? randomBlog?.Blog_url : BannerImg
                }
                alt="hero-image"
                className="max-h-[400px] min-h-[400px] w-full max-sm:max-h-[250px] max-sm:min-h-[250px] overflow-hidden object-cover object-top dark:bg-gray-700 "
              />

              <div className="relative rounded-xl w-[65%] bg-white max-lg:bottom-[50px] bottom-[100px] max-lg:w-[90%] shadow-[0_18px_10px_-15px_rgba(0,0,0,0.1)] group dark:bg-darkBgPrimary max-sm:rounded-sm">
                <div className="px-20 max-sm:px-10 py-10 max-sm:py-5 flex flex-col items-center max-lg:px-10 max-lg:py-5">
                  <span className="text-primaryMain dark:text-secondary text-[18px] font-medium max-lg:text-[12px] tracking-[5px] uppercase cursor-pointer">
                    {randomBlog?.Category}
                  </span>
                  <h1
                    className="text-[40px] font-bold py-5 text-center max-lg:py-2 max-lg:text-[22px] font-serif hover:text-primaryMain dark:text-darkTextMain dark:hover:text-secondary capitalize cursor-pointer line-clamp-3"
                    onClick={() => {
                      navigate(`/blogs/${randomBlog?._id}`);
                    }}
                  >
                    {randomBlog?.Title}
                  </h1>

                  <div className="flex flex-row items-center justify-center max-md:flex-col">
                    <p
                      className="text-lg max-lg:text-[15px] ml-2 font-semibold font-palanquin text-gray-700 dark:text-darkTextMain cursor-pointer"
                      onClick={() => {
                        //("Welcome to Profile");

                        navigate(`/profile/${randomBlog?.author?.username}`);
                      }}
                    >
                      By {randomBlog?.author?.username}
                    </p>
                    <span className="text-lg max-lg:text-[15px] max-lg:text-sm ml-2 font-semibold font-palanquin text-gray-400 max-md:hidden">
                      -
                    </span>
                    <p className="text-lg max-lg:text-sm ml-1 font-semibold font-palanquin text-gray-400 dark:text-darkTextPrimary">
                      {new Date(randomBlog?.Date).toLocaleString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                  </div>
                </div>
              </div>
            </>
          )
        )}
      </section>
    </>
  );
};

export default Hero;
