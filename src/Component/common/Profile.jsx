import { ProfileModal } from "./";
import React, { useState, useRef, useEffect } from "react";

export default function Profile({ profileImg, name }) {
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  const profileMenu = () => {
    setIsDropdownVisible(!isDropdownVisible);
  };

  return (
    <>
      {isDropdownVisible && (
        <ProfileModal profileMenu={profileMenu}></ProfileModal>
      )}

      <div
        className="flex items-center text-sm font-medium text-gray-900 rounded-full hover:text-blue-600 dark:hover:text-blue-500 md:mr-0 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:text-white"
        onClick={profileMenu}
      >
        <span className="sr-only">Open user menu</span>
        <img
          src={profileImg}
          alt=""
          className="rounded-full dark:bg-darkBgPrimary bg-gray-200 h-8 w-8 mr-2"
        />
      </div>
    </>
  );
}
