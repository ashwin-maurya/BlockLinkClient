import React, { useState } from "react";
import { toast } from "react-toastify";

export default function NewsletterCard({ onSubscribe }) {
  const [email, setEmail] = useState("");

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const subscribeHandler = () => {
    if (!isValidEmail(email.trim())) {
      toast.error("Please enter a valid email address");
      return;
    }

    // Display success toast
    toast.success("Your're now subscribed to the newsletter");

    // Clear the input field
    setEmail("");

    // Call the onSubscribe prop
    if (onSubscribe) {
      onSubscribe();
    }
  };

  return (
    <>
      <div className="mb-6 max-sm:mb-0 flex-row md:mb-0 md:flex">
        <div className="relative mb-3 w-full flex justify-center md:mr-3 md:mb-0">
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="group block w-full max-sm:w-[80%] p-2  text-lg rounded-md dark:text-darkTextMain text-gray-900 border-2 dark:bg-darkBgPrimary border-gray-300 dark:border-gray-700 hover:border-primaryMain hover:dark:border-secondary focus:border-primaryMain focus:dark:border-secondary outline-none transition-colors duration-300 ease-in-out"
            placeholder="Enter your email"
          />
        </div>
        <button
          type="button"
          onClick={subscribeHandler}
          className="border-2 border-slate-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-400   rounded-md bg-primaryMain dark:bg-secondary px-4 py-1 font-semibold text-white"
        >
          Subscribe
        </button>
      </div>
    </>
  );
}
