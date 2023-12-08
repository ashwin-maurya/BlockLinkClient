import React, { useContext, useEffect, useState } from "react";
import AuthContext from "../../Helper/Context/AuthContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function SocialUpdate() {
  const context = useContext(AuthContext);
  const { UserDetails, getCurrentUser } = context;
  const host = "https://bloglinkbackend-it3i.onrender.com";

  const [socialLinks, setSocialLinks] = useState({
    github: "",
    linkedin: "",
    instagram: "",
    twitter: "",
  });
  useEffect(() => {
    console.log(UserDetails);
    setSocialLinks({
      github: UserDetails?.socialLinks?.github || "",
      linkedin: UserDetails?.socialLinks?.linkedin || "",
      instagram: UserDetails?.socialLinks?.instagram || "",
      twitter: UserDetails?.socialLinks?.twitter || "",
    });
  }, [UserDetails]);
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setSocialLinks((prevSocialLinks) => ({
      ...prevSocialLinks,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const userId = UserDetails?._id;
    const apiUrl = `${host}/api/auth/updateSocialLinks/${userId}`;

    try {
      const response = await fetch(apiUrl, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ socialLinks }),
      });

      if (response.ok) {
        //("Social links updated");
        getCurrentUser(JSON.parse(localStorage.getItem("UserData")).UserID);
      } else {
        toast.error("Failed to update social links");
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred while updating social links");
    }
  };
  return (
    <div className="w-full h-auto py-5 px-10 max-lg:px-2 flex rounded-lg bg-gray-100 dark:bg-darkBgPrimary shadow-xl flex-col">
      <h1 className="text-xl pb-4 font-bold text-gray-500 tracking-wide">
        Fill Profile URLs
      </h1>
      <form
        className="form flex flex-col w-full overflow-y-scroll px-2"
        onSubmit={handleSubmit}
      >
        <label
          className="text-sm font-bold text-gray-500 tracking-wide mt-2"
          htmlFor="github"
        >
          GitHub
        </label>
        <input
          type="text"
          placeholder="GitHub URL"
          name="github"
          autoComplete="on"
          value={socialLinks.github}
          onChange={handleInputChange}
          className="border border-gray-300 bg-transparent dark:text-darkTextPrimary rounded-md p-2 mb-2 focus:outline-none dark:focus:border-secondary focus:border-primaryMain"
        />
        <label
          className="text-sm font-bold text-gray-500 tracking-wide mt-2"
          htmlFor="linkedin"
        >
          LinkedIn
        </label>
        <input
          type="text"
          placeholder="LinkedIn URL"
          name="linkedin"
          autoComplete="on"
          value={socialLinks.linkedin}
          onChange={handleInputChange}
          className="border border-gray-300 bg-transparent dark:text-darkTextPrimary rounded-md p-2 mb-2 focus:outline-none dark:focus:border-secondary focus:border-primaryMain"
        />
        <label
          className="text-sm font-bold text-gray-500 tracking-wide mt-2"
          htmlFor="instagram"
        >
          Instagram
        </label>
        <input
          type="text"
          placeholder="Instagram URL"
          name="instagram"
          autoComplete="on"
          value={socialLinks.instagram}
          onChange={handleInputChange}
          className="border border-gray-300 bg-transparent dark:text-darkTextPrimary rounded-md p-2 mb-2 focus:outline-none dark:focus:border-secondary focus:border-primaryMain"
        />
        <label
          className="text-sm font-bold text-gray-500 tracking-wide mt-2"
          htmlFor="twitter"
        >
          Twitter
        </label>
        <input
          type="text"
          placeholder="Twitter URL"
          name="twitter"
          autoComplete="on"
          value={socialLinks.twitter}
          onChange={handleInputChange}
          className="border border-gray-300 bg-transparent dark:text-darkTextPrimary rounded-md p-2 mb-2 focus:outline-none dark:focus:border-secondary focus:border-primaryMain"
        />
        <div>
          <button
            type="submit"
            name="submit"
            className="button-submit my-2 text-white rounded-full p-2 px-6 font-bold bg-primaryMain dark:bg-secondary cursor-pointer"
          >
            Update Social
          </button>
        </div>
      </form>
    </div>
  );
}
