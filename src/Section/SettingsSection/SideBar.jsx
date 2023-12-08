import React from "react";
import { Link } from "react-router-dom";

export default function SideBar() {
  return (
    <>
      <div className="w-[100%] max-w-[400px]  max-lg:w-full max-lg:max-w-full bottom-0 border-t-[1px] border-gray-200 dark:border-gray-800 bg-white  dark:bg-darkBgMain flex justify-evenl overflow-hidden flex-col p-2 max-sm:p-0">
        <ul className="flex-1 flex items-center flex-col max-lg:flex-row ">
          <li className="w-[80%] flex  hover:dark:bg-darkBgPrimary hover:bg-bgBlue  rounded-lg my-1">
            <Link
              to="ProfileUpdate"
              className="w-full  flex items-center max-lg:justify-center text-left font-montserrat leading-normal py-2 text-lg font-semibold dark:hover:text-secondary  text-gray-400  hover:text-primaryMain text-slate-gray dark:text-darkTextMain"
            >
              <div className="w-[20%] max-lg:w-[100%] flex justify-center">
                <div className="w-7 h-7 bg-primaryMain dark:bg-secondary rounded-full m-2 flex justify-center items-center ">
                  <i className="fa fa-user text-bgBlue text-base"></i>
                </div>
              </div>
              <p className="max-lg:hidden">Profile Details</p>
            </Link>
          </li>

          <li className="w-[80%] flex hover:dark:bg-darkBgPrimary hover:bg-bgBlue  rounded-lg my-1">
            <Link
              to="SocialUpdate"
              className="w-full  flex items-center max-lg:justify-center  text-left font-montserrat leading-normal py-2 text-lg font-semibold dark:hover:text-secondary text-gray-400 hover:text-primaryMain text-slate-gray dark:text-darkTextMain"
            >
              <div className="w-[20%] max-lg:w-[100%] flex justify-center">
                <div className="w-7 h-7 bg-primaryMain dark:bg-secondary rounded-full m-2 flex justify-center items-center ">
                  <i className="fa fa-plus text-bgBlue text-base"></i>
                </div>
              </div>
              <p className="max-lg:hidden">Add Social</p>
            </Link>
          </li>
          <li className="w-[80%] flex hover:dark:bg-darkBgPrimary hover:bg-bgBlue  rounded-lg my-1">
            <Link
              to="RelevantUpdate"
              className="w-full  flex items-center max-lg:justify-center  text-left font-montserrat leading-normal py-2 text-lg font-semibold dark:hover:text-secondary text-gray-400 hover:text-primaryMain text-slate-gray dark:text-darkTextMain"
            >
              <div className="w-[20%] max-lg:w-[100%] flex justify-center">
                <div className="w-7 h-7 bg-primaryMain dark:bg-secondary rounded-full m-2 flex justify-center items-center ">
                  <i className="fa fa-heart text-bgBlue text-base"></i>
                </div>
              </div>
              <p className="max-lg:hidden"> Relevant</p>
            </Link>
          </li>
          <li className="w-[80%] flex hover:dark:bg-darkBgPrimary hover:bg-bgBlue  rounded-lg my-1">
            <Link
              to="ResetPassword"
              className="w-full  flex items-center max-lg:justify-center  text-left font-montserrat leading-normal py-2 text-lg font-semibold dark:hover:text-secondary text-gray-400 hover:text-primaryMain text-slate-gray dark:text-darkTextMain"
            >
              <div className="w-[20%] max-lg:w-[100%] flex justify-center">
                <div className="w-7 h-7 bg-primaryMain dark:bg-secondary rounded-full m-2 flex justify-center items-center ">
                  <i className="fa fa-key text-bgBlue text-base"></i>
                </div>
              </div>
              <p className="max-lg:hidden"> Reset Password</p>
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
}
