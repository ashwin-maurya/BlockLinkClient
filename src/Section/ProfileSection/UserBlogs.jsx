import React from "react";
import { BlogCard } from "../../Component/common";
export default function UserBlogs({ filterData }) {
  console.log(filterData);
  return (
    <>
      <section className="relative py-4 flex justify-center">
        <div className="container mx-auto px-4 w-[70%] max-md:w-[100%]">
          <div className="relative flex flex-col min-w-0 w-full mb-6 rounded-lg p-10 max-lg:p-0">
            <h1 className="text-xl font-semibold my-1 dark:text-white">
              Your blogs
            </h1>
            {filterData?.map((card, index) => {
              return <BlogCard key={index} card={card}></BlogCard>;
            })}
          </div>
        </div>
      </section>
    </>
  );
}
