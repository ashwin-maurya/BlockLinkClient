import React, { useContext, useEffect, useState } from "react";
import AuthContext from "../../Helper/Context/AuthContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function PasswordUpdate() {
  const context = useContext(AuthContext);
  const { UserDetails, getCurrentUser, AuthStatus } = context;
  const host = "https://bloglinkbackend-it3i.onrender.com";

  const [oldPassword, setOldPassword] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState(null);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (name === "oldPassword") setOldPassword(value);
    if (name === "password") setPassword(value);
    if (name === "confirmPassword") setConfirmPassword(value);
  };
  useEffect(() => {
    if (password !== confirmPassword) {
      setPasswordError("Passwords do not match.");
    } else {
      setPasswordError(null);
    }
  }, [confirmPassword]);
  const changepassword = async (event) => {
    event.preventDefault();

    try {
      const userId = UserDetails?._id;
      const response = await fetch(
        `${host}/api/auth/updatePassword/${userId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "auth-token": JSON.parse(localStorage.getItem("UserData"))
              .authtoken,
          },
          body: JSON.stringify({ oldPassword, newPassword: password }),
        }
      );
      const data = await response.json();
      console.log(data);

      if (response.ok) {
        //("Password updated successfully");
        getCurrentUser(JSON.parse(localStorage.getItem("UserData")).UserID);
      } else {
        toast.error(data.error);
      }
    } catch (error) {
      console.error(error);
    }
  };
  const setpassword = async (event) => {
    event.preventDefault();

    try {
      const userId = UserDetails?._id;
      const response = await fetch(`${host}/api/auth/setpassword/${userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "auth-token": JSON.parse(localStorage.getItem("UserData")).authtoken,
        },
        body: JSON.stringify({ newPassword: password }),
      });
      const data = await response.json();
      console.log(data);

      if (response.ok) {
        //("Password set successfully");
        getCurrentUser(JSON.parse(localStorage.getItem("UserData")).UserID);
      } else {
        toast.error(data.error);
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="w-full h-auto py-5 px-10 max-lg:px-2 flex rounded-lg bg-gray-100 dark:bg-darkBgPrimary shadow-xl flex-col">
      <h1 className="text-xl pb-4 max-lg:pb-0 font-bold text-gray-500 tracking-wide">
        Update Password
      </h1>
      {AuthStatus &&
      JSON.parse(localStorage.getItem("UserData")).isGoogleSignup ? (
        <form
          className="form flex flex-col w-full overflow-y-scroll px-2"
          onSubmit={setpassword}
        >
          <span></span>
          <label
            className="text-sm font-bold text-gray-500 tracking-wide mt-2"
            htmlFor="password"
          >
            <div className="text-red-500 font-normal my-2">
              * You have not set your password yet. To login using email and
              password please set a password
            </div>
          </label>
          <input
            type="password"
            placeholder="New Password"
            name="password"
            autoComplete="new-password"
            value={password}
            onChange={handleInputChange}
            className="border border-gray-300 bg-transparent dark:text-darkTextPrimary rounded-md p-2 mb-2 focus:outline-none dark:focus:border-secondary focus:border-primaryMain"
          />
          <label
            className="text-sm font-bold text-gray-500 tracking-wide mt-2"
            htmlFor="confirmPassword"
          >
            Confirm Password
          </label>
          <input
            type="password"
            placeholder="Confirm Password"
            name="confirmPassword"
            autoComplete="new-password"
            value={confirmPassword}
            onChange={handleInputChange}
            className="border border-gray-300 bg-transparent dark:text-darkTextPrimary rounded-md p-2 mb-2 focus:outline-none dark:focus:border-secondary focus:border-primaryMain"
          />
          {passwordError && (
            <div className="text-red-500 mt-2">{passwordError}</div>
          )}

          <div>
            <button
              type="submit"
              name="submit"
              className={`button-submit my-2 text-white rounded-full p-2 px-6 font-bold bg-primaryMain dark:bg-secondary  cursor-pointer ${
                passwordError !== null ? "bg-purple-300 dark:bg-red-200" : ""
              }`}
            >
              Change Password
            </button>
          </div>
        </form>
      ) : (
        <form
          className="form flex flex-col w-full overflow-y-scroll px-2"
          onSubmit={changepassword}
        >
          <label
            className="text-sm font-bold text-gray-500 tracking-wide mt-2"
            htmlFor="oldPassword"
          >
            Old Password
          </label>
          <input
            type="password"
            placeholder="Old Password"
            name="oldPassword"
            autoComplete="current-password"
            value={oldPassword}
            onChange={handleInputChange}
            className="border border-gray-300 bg-transparent dark:text-darkTextPrimary rounded-md p-2 mb-2 focus:outline-none dark:focus:border-secondary focus:border-primaryMain"
          />
          <label
            className="text-sm font-bold text-gray-500 tracking-wide mt-2"
            htmlFor="password"
          >
            New Password
          </label>
          <input
            type="password"
            placeholder="New Password"
            name="password"
            autoComplete="new-password"
            value={password}
            onChange={handleInputChange}
            className="border border-gray-300 bg-transparent dark:text-darkTextPrimary rounded-md p-2 mb-2 focus:outline-none dark:focus:border-secondary focus:border-primaryMain"
          />
          <label
            className="text-sm font-bold text-gray-500 tracking-wide mt-2"
            htmlFor="confirmPassword"
          >
            Confirm Password
          </label>
          <input
            type="password"
            placeholder="Confirm Password"
            name="confirmPassword"
            autoComplete="new-password"
            value={confirmPassword}
            onChange={handleInputChange}
            className="border border-gray-300 bg-transparent dark:text-darkTextPrimary rounded-md p-2 mb-2 focus:outline-none dark:focus:border-secondary focus:border-primaryMain"
          />
          {passwordError && (
            <div className="text-red-500 mt-2">{passwordError}</div>
          )}
          <div>
            <button
              type="submit"
              name="submit"
              className={`button-submit my-2 text-white rounded-full p-2 px-6 font-bold bg-primaryMain dark:bg-secondary cursor-pointer`}
            >
              Change Password
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
