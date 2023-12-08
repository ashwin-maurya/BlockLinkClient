import { Tags } from "../../Component/common";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import blogContext from "../../Helper/Context/blogContext";
import { useContext, useEffect, useState, useRef } from "react";
import AuthContext from "../../Helper/Context/AuthContext";
import { profileDefault } from "../../Assets/icons";

import CommentLikeContext from "../../Helper/Context/CommentLikeContext";
import ShareModal from "../SingleBlogComponents/ShareModal";
import FilterContext from "../../Helper/Context/FilterContext";
import Bookmark from "./IconComponents/Bookmark";
import Like from "./IconComponents/Like";
import { BannerImg } from "../../Assets/images";
export default function BlogCard({ card, isBookmark, isLiked }) {
  const context = useContext(blogContext);
  const context6 = useContext(FilterContext);
  const context5 = useContext(CommentLikeContext);

  const { addbookmark, deletebookmark } = context5;
  const { deletenote } = context6;
  const context3 = useContext(AuthContext);
  const navigate = useNavigate();
  const { UserDetails, AuthStatus, showAuthModal, setAuthModal } = context3;

  const [ShowEdit, setShowEdit] = useState(false);
  // console.log(isBookmark);
  const [bookmarked, setbookmarked] = useState(false);

  const modalRef = useRef(null);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [shareModalVisible, setShareModalVisible] = useState(false);

  const bookmark = async () => {
    if (!AuthStatus) {
      setAuthModal((showAuthModal) => !showAuthModal);
    }
    console.log(bookmarked);

    if (bookmarked == true) {
      await deletebookmark({
        userID: JSON.parse(localStorage.getItem("UserData")).userDetailId,
        postID: card?._id,
      });

      //("Bookmark deleted");
      setbookmarked(!bookmarked);
    } else {
      await addbookmark({
        userID: JSON.parse(localStorage.getItem("UserData")).userDetailId,
        postID: card?._id,
      });

      //("Bookmark addedd");
      setbookmarked(!bookmarked);
    }
  };

  const sharemodal = () => {
    setShareModalVisible(!shareModalVisible);
  };

  useEffect(() => {}, [bookmarked]);
  const handleOutsideClick = (event) => {
    console.log("CLICED");
    if (modalRef.current === event.target) {
      profileMenu();
    }
  };
  const profileMenu = () => {
    setIsDropdownVisible(!isDropdownVisible);
  };

  const onDelete = async () => {
    await deletenote(card?._id);
    //("Blog Deleted");
  };

  useEffect(() => {
    if (AuthStatus) {
      if (
        card?.author?._id ===
        JSON.parse(localStorage.getItem("UserData")).userDetailId
      ) {
        setShowEdit(true);
      } else {
        setShowEdit(false);
      }
    } else {
      setShowEdit(false);
    }
    // getUser(card?.UserName);
  }, [UserDetails, card, bookmarked]);

  return (
    <>
      {shareModalVisible && (
        <ShareModal
          sharemodal={sharemodal}
          currentUrl={`${window.location.origin}/blogs/${card?._id?.replace(
            /\s+/g,
            "-"
          )}`}
        ></ShareModal>
      )}
      <div className="md:w-[100%] max-sm:my-1  md:m-auto flex md:my-2 dark:bg-darkBgPrimary my-2 rounded-md bg-bgBlue flex-col  p-6 pt-5 pb-2 w-[80%] max-lg:w-[100%] group max-sm:p-2">
        <div className="max-lg:gap-2  gap-8 flex  justify-center ">
          <div className="w-[70%]">
            <div className="flex justify-between  items-center">
              <div className="mb-2 flex  items-center justify-between max-lg:items-start max-lg:flex-col">
                <div className=" flex items-center ">
                  <div className="group/author  flex items-center ">
                    <img
                      onClick={() => {
                        navigate(`/profile/${card?.author?.username}`);
                      }}
                      src={
                        card?.author?.profileImg != ""
                          ? card?.author?.profileImg
                          : profileDefault
                      }
                      className="border-[1px] border-purple-300 bg-white h-7 w-7  rounded-full object-cover object-top "
                      alt="img"
                    />
                    <div className="flex flex-row ml-2 max-lg:flex-col">
                      <p
                        className="text-md cursor-pointer font-semibold font-palanquin text-gray-700  dark:text-darkTextMain max-sm:text-[13.6px]"
                        onClick={() => {
                          navigate(
                            `/profile/${card?.author?.username?.replace(
                              /\s+/g,
                              "-"
                            )}`,
                            {}
                          );
                        }}
                      >
                        {card?.author?.username}
                      </p>
                      <span className="text-sm ml-2 font-semibold font-palanquin text-gray-400 dark:text-darkTextPrimary max-lg:hidden">
                        -
                      </span>
                      <p
                        className="text-sm ml-1 max-lg:ml-0 font-semibold font-palanquin text-gray-500 dark:text-darkTextPrimary max-sm:text-[12.6px] max-sm:mt-[-6px]"
                        onClick={() => {
                          navigate(`/searchBy/Date/${card?.Date}`);
                        }}
                      >
                        {new Date(card?.Date).toLocaleString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div
              className="flex flex-col "
              onClick={() => {
                navigate(`/blogs/${card._id}`);
              }}
            >
              <h3 className="theme-font-minor text-xl my-1 font-bold font-serif hover:text-primaryMain  dark:hover:text-secondary dark:text-darkTextMain  cursor-pointer max-sm:text-md capitalize line-clamp-2  max-sm:text-[17px] ">
                {card?.Title}
              </h3>
            </div>

            {/* <div className="py-1 flex gap-2 justify-start items-center">
              <button
                className="p-1 rounded-md text-[15px] text-white px-4 border-2 border-slate-200 dark:border-gray-700 hover:border-blue-300  bg-primaryMain dark:hover:border-blue-400"
                onClick={() => {
                 //("Welcome to Blog");

                  navigate(`/blogs/${card._id}`);
                }}
              >
                Read
              </button>
              <button
                className={`p-1 rounded-md text-[15px] dark:hover:border-blue-400 text-white px-4 bg-primaryMain  border-2 border-slate-200 ${
                  bookmarked && "bg-gray-500"
                }  dark:border-gray-700 hover:border-blue-300 `}
                onClick={bookmark}
                disabled={bookmarked}
              >
                Save
              </button>
            </div> */}
          </div>
          <div className="relative flex items-center justify-center w-[30%]">
            <div className="relative">
              <div
                className="overflow-hidden mt-2 rounded-lg z-20"
                onClick={() => {
                  navigate(`/blogs/${card?._id}`);
                }}
              >
                <img
                  src={card?.Blog_url != "" ? card?.Blog_url : BannerImg}
                  className="content-evenly max-h-[90px] object-cover transition-all ease-in-out duration-200 group-hover:scale-[1.2] "
                  width={280}
                  alt="codeimg"
                />
              </div>
              <div className="absolute -top-1 -left-4 z-30">
                <p
                  className="text-[10px] uppercase bg-primaryMain text-darkTextMain dark:bg-secondary dark:text-darkTextMain  font-semibold tracking-widest px-4 max-sm:px-2 max-sm:p-0 max-sm:rounded-sm max-sm:mt-1  rounded-md p-1 max-sm:font-normal"
                  onClick={() => {
                    navigate(`/searchBy/Category/${card?.Category}`);
                  }}
                >
                  {card?.Category}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="relative pb-1 max-sm:mt-0 max-sm:pb-0  flex justify-between items-center  flex-wrap w-full mt-1">
          <div className="flex gap-3  max-sm:gap-1 items-center ">
            {card?.tags?.slice(0, 2)?.map((tag, index) => (
              <Tags key={index} tags={tag} />
            ))}{" "}
          </div>

          <div className="flex  items-center mr-1 max-sm:mt-0  mt-2">
            <div className="mr-1 w-[100%] py-2 px-1 flex   items-center justify-center">
              <p className="text-xs  text-gray-700 dark:text-gray-300 max-sm:text-xs ">
                {card?.view}
              </p>
              <i className="fa fa-eye ml-[4px]  max-sm:text-[13px] text-gray-700 dark:text-white  text-[16px] "></i>
            </div>

            <Bookmark setbookmarked={setbookmarked} card={card}></Bookmark>
            <Like card={card}></Like>

            <div
              className="rounded-full max-sm:px-[7px] max-sm:py-[6px]   py-2 px-3  flex justify-center items-center transition ease-in-out  cursor-pointer "
              onClick={sharemodal}
            >
              {" "}
              <i className="dark:text-white  max-sm:text-[13px] fa fa-share  text-gray-600 text-[16px] "></i>
            </div>
            {ShowEdit && window.location.pathname != "/profile" && (
              <div className="relative">
                {isDropdownVisible && (
                  <div className="relative">
                    <div
                      id="myModal"
                      className="fixed z-50 inset-0 w-full h-full  transition-all ease-in-out duration-300 "
                      ref={modalRef}
                      onClick={handleOutsideClick}
                    ></div>
                    <div
                      id="dropdownAvatarName"
                      className="z-50 block absolute top-6 left-4  max-sm:left-[-20px] max-sm:top-[-65px] max-sm:w-14 bg-white divide-y divide-gray-100 max-sm:rounded-md rounded-lg shadow-sm w-32 dark:bg-darkBgPrimary dark:divide-gray-600 border dark:border-gray-600"
                    >
                      <ul
                        className="py-2 max-sm:py-0 text-sm text-gray-700 dark:text-gray-200"
                        aria-labelledby="dropdownInformdropdownAvatarNameButtonationButton"
                      >
                        <li>
                          <span
                            to="/"
                            className="block cursor-pointer max-sm:px-1 max-sm:py-1 px-3 py-2 max-sm:rounded-md hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                            onClick={() => {
                              navigate(`/updateblog/${card._id}`);
                            }}
                          >
                            Update
                          </span>
                        </li>
                        <li>
                          <span
                            onClick={onDelete}
                            className="block cursor-pointer max-sm:px-1 max-sm:py-1 px-3 py-2 max-sm:rounded-md hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                          >
                            Delete
                          </span>
                        </li>
                      </ul>
                    </div>
                  </div>
                )}
                <div
                  className="rounded-full max-sm:px-[7px] max-sm:py-[6px]  py-2 px-3    group/btn flex justify-center items-center transition ease-in-out  cursor-pointer "
                  onClick={profileMenu}
                >
                  <i className="block max-sm:text-[15px] text-gray-600 dark:text-white fa fa-ellipsis-v"></i>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
