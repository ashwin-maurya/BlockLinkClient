import React from "react";
import { BannerImg } from "../../Assets/images";

const TopSection = ({ blog1 }) => {
  return (
    <div className="flex bg-slate-50  dark:text-white dark:bg-darkBgMain flex-col items-center w-[70%]  max-lg:w-full">
      <div className="relative flex flex-col gap-1 w-full mt-5 mb-6 max-sm:mb-1">
        <p className="tracking-[1.5px] text-[20px] max-md:text-[12px] rounded-md font-semibold dark:text-secondary text-primaryMain m-1 uppercase text-center">
          {blog1?.Category == "" || !blog1?.Category
            ? "Category"
            : blog1?.Category}
        </p>
        <h1 className="max-md:leading-6 text-[40px] max-lg:text-[35px] max-md:text-[28px] max-sm:text-[20px] font-bold leading-[50px] font-montserrat capitalize mb-4 text-center max-lg:px-2">
          {blog1?.Title == "" || !blog1?.Title ? "Title is here" : blog1?.Title}
        </h1>
      </div>
      <div className="overflow-hidden w-full max-h-[400px] max-sm:max-h-[300px]">
        <img
          className="w-full object-cover"
          src={blog1?.Blog_url != "" ? blog1?.Blog_url : BannerImg}
          alt="Blog_url"
        />
      </div>
    </div>
  );
};

export default TopSection;
