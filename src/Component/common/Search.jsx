import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { search } from "../../Assets/icons";
export default function Search() {
  const [searchtext, setSearchtext] = useState("");
  const [searchResult, setSearchResult] = useState({});
  const [searchResultExist, setSearchResultExist] = useState(false);
  const host = "https://bloglinkbackend-it3i.onrender.com";
  const navigate = useNavigate();

  useEffect(() => {
    if (searchtext.trim() != "") {
      searchForResults();
    }
  }, [searchtext]);

  const handleInputChange = (event) => {
    const { value } = event.target;
    setSearchtext(value);
    if (value.trim() == "") {
      setSearchResultExist(false);
    }
  };
  const handleInputBlur = () => {
    const blurTimeout = setTimeout(() => {
      setSearchResultExist(false);
    }, 200);
  };
  const handleInputFocus = () => {
    if (searchtext.trim() != "") {
      setSearchResultExist(true);
    }
  };
  const searchForResults = async () => {
    if (searchtext.trim() == "") {
      setSearchResultExist(false);
      return;
    }

    try {
      const response = await fetch(
        `${host}/api/blogs/searchForResults/${searchtext}`, // Use the correct URL with the parameter
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const json = await response.json();
      if (json.available) {
        setSearchResultExist(json.available);
        setSearchResult(json.results);
      } else {
        setSearchResultExist(false);
      }
      console.log(searchResultExist);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className="relative">
        <form className=" w-[100%] flex items-centerms  ml-2">
          <label className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">
            Search
          </label>
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 ">
              <img src={search} alt="search image" />
            </div>
            <input
              type="text"
              id="search"
              className="group block w-full p-2 pl-10 text-lg rounded-lg dark:text-darkTextMain text-gray-900 border-2 dark:bg-darkBgPrimary border-gray-300 dark:border-gray-700 hover:border-primaryMain hover:dark:border-secondary focus:border-primaryMain focus:dark:border-secondary outline-none transition-colors duration-300 ease-in-out"
              placeholder="Search...."
              required
              onChange={handleInputChange}
              onBlur={handleInputBlur}
              onFocus={handleInputFocus}
            />
          </div>
        </form>
        {searchResultExist && (
          <div
            id="dropdownAvatarName"
            className="w-[200%] z-50 block absolute left-5 top-11 bg-white divide-y divide-gray-100 rounded-lg shadow-sm dark:bg-darkBgPrimary dark:divide-gray-600 border dark:border-gray-600"
          >
            <h1 className="text-primaryMain m-2 mx-4 text-sm">
              Search Results...
            </h1>
            <ul
              className="py-2 text-sm text-gray-700 dark:text-gray-200"
              aria-labelledby="dropdownAvatarNameButton"
            >
              {searchResult.map((card, index) => (
                <li
                  key={index}
                  onClick={() => {
                    //("Welcome to Blog");

                    navigate(`/blogs/${card?._id}`);
                  }}
                  className="flex justify-between  px-4 py-1 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  <div className="flex flex-col">
                    <span className="">{card?.Title} </span>
                    <span className="text-gray-400 text-xs my-1">
                      @{card?.author.username}{" "}
                    </span>
                  </div>
                  <img
                    src={card?.Blog_url}
                    alt=""
                    className="h-8  object-cover"
                  />
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </>
  );
}
