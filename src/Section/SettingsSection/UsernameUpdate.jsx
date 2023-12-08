import React, { useContext, useState, useEffect } from "react";
import AuthContext from "../../Helper/Context/AuthContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function UsernameUpdate() {
  const context = useContext(AuthContext);
  const { UserDetails, getCurrentUser } = context;
  const host = "https://bloglinkbackend-it3i.onrender.com";

  const [username, setUsername] = useState(UserDetails?.username || "");
  const [usernameExists, setUsernameExists] = useState(false);
  const [containsSpecialChars, setContainsSpecialChars] = useState(false);

  useEffect(() => {
    checkUsernameExists();
  }, [username]);

  useEffect(() => {
    setUsername(UserDetails?.username || "");
  }, [UserDetails]);

  const handleInputChange = (event) => {
    const { value } = event.target;
    setUsername(value);
    validateUsername(value);
  };

  const validateUsername = (value) => {
    const regex = /^[a-zA-Z0-9]+$/; // Only letters and numbers allowed
    setContainsSpecialChars(!regex.test(value));
  };

  const checkUsernameExists = async () => {
    if (username.trim() === "" || containsSpecialChars) {
      setUsernameExists(false);
      return;
    }

    try {
      // Make a Fetch API call to check if the username exists
      const response = await fetch(
        `${host}/api/auth/checkUsernameAvailability?username=${username}`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setUsernameExists(!data.available);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!usernameExists && username.trim() !== "" && !containsSpecialChars) {
      try {
        const userId = UserDetails?._id;
        const response = await fetch(
          `${host}/api/auth/updateUsername/${userId}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              "auth-token": JSON.parse(localStorage.getItem("UserData"))
                .authtoken,
            },
            body: JSON.stringify({ username }),
          }
        );
        if (!response.ok) {
          throw Error("Network response was not ok");
        }
        const data = await response.json();
        console.log(data);
        "Username updated to " + data.username;
        getCurrentUser(JSON.parse(localStorage.getItem("UserData")).UserID);
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <>
      <div className="mt-10">
        <h1 className="text-xl pb-2 font-bold text-gray-500 tracking-wide">
          Select a Username
        </h1>
        <form
          className="form flex flex-col w-full  px-2"
          onSubmit={handleSubmit}
        >
          <div>
            <label
              className="text-sm font-bold text-gray-500 tracking-wide mt-2"
              htmlFor="username"
            >
              Username
            </label>
            <div className="flex flex-row items-center">
              <input
                type="text"
                placeholder="Username"
                name="username"
                autoComplete="on"
                value={username}
                onChange={handleInputChange}
                className="border border-gray-300 bg-transparent dark:text-darkTextPrimary rounded-md p-2 mb-2 focus:outline-none dark:focus:border-secondary focus:border-primaryMain"
              />
              {username.trim() === "" ? (
                <span className="text-red-500 ml-5 font-semibold text-lg">
                  Username cannot be empty
                </span>
              ) : containsSpecialChars ? (
                <span className="text-red-500 ml-5 font-semibold text-lg">
                  No special characters allowed
                </span>
              ) : usernameExists ? (
                <span className="text-red-500 ml-5 font-semibold text-lg">
                  Username Already Exists
                </span>
              ) : (
                <span className="text-green-500 ml-5 font-semibold text-lg">
                  Username Available
                </span>
              )}
            </div>
          </div>
          <div>
            <button
              type="submit"
              name="submit"
              className={`button-submit  my-2 text-white rounded-full p-2 px-6 font-bold bg-primaryMain dark:bg-secondary cursor-pointer ${
                usernameExists || username.trim() === "" || containsSpecialChars
                  ? "bg-blue-300 dark:bg-blue-300"
                  : ""
              }`}
              disabled={
                usernameExists || username.trim() === "" || containsSpecialChars
              }
            >
              Change Username
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
