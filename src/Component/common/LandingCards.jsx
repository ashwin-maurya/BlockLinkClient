import { Tags } from "../../Component/common";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import blogContext from "../../Helper/Context/blogContext";
import { useContext, useEffect, useState } from "react";
import HelperContext from "../../Helper/Context/HelperContext";
import AuthContext from "../../Helper/Context/AuthContext";
import { code1 } from "../../Assets/images";
import { BannerImg } from "../../Assets/images";
import {
  dark,
  darkprofileDefault,
  profileDefault,
  view,
} from "../../Assets/icons";
import CommentLikeContext from "../../Helper/Context/CommentLikeContext";
import ShareModal from "../SingleBlogComponents/ShareModal";

export default function LandingCards({ card }) {
  const context = useContext(blogContext);
  const context2 = useContext(CommentLikeContext);
  // const getl
  const [like, setlike] = useState(0);
  const [book, setbook] = useState(0);
  const { countLike, countBookmark } = context2;

  const [shareModalVisible, setShareModalVisible] = useState(false);

  useEffect(() => {
    async function func() {
      setlike(await countLike(card._id));
      setbook(await countBookmark(card._id));
    }
    func();
  }, [card]);

  const { deletenote, host } = context;
  const navigate = useNavigate();
  const context3 = useContext(AuthContext);
  const { UserDetails, AuthStatus, getUser, UserProfile } = context3;
  const [date, setdate] = useState("");
  const [ShowEdit, setShowEdit] = useState(false);
  const [user, setuser] = useState("");
  console.log(card);
  const onDelete = async () => {
    await deletenote(card?.postID);
  };

  const startTime = new Date().getTime();

  useEffect(() => {
    if (AuthStatus) {
      if (card?.userID === UserDetails?._id) {
        setShowEdit(true);
      } else {
        setShowEdit(false);
      }
    } else {
      setShowEdit(false);
    }
  }, [UserDetails, card]);

  useEffect(() => {
    const date = new Date(card?.Date);
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    setdate(date.toLocaleString("en-US", options));

    console.log(card?.UserName);

    const func = async () => {
      const response1 = await fetch(
        `${host}/api/blogs/userImg/${card?.userID}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const Userimage = await response1.json();
      setuser(
        Userimage[0]?.profileImg != ""
          ? Userimage[0]?.profileImg
          : profileDefault
      );
    };
    func();
  }, []);

  const sharemodal = () => {
    setShareModalVisible(!shareModalVisible);
  };

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
      <article className="break-inside-avoid mx-auto w-[100%] max-md:w-[95%] p-6 max-sm:p-3 bg-bgBlue rounded-xl  dark:bg-darkBgPrimary flex flex-col bg-clip-border  my-5 group max-md:rounded-md">
        <div className="flex pb-4 max-sm:pb-2 items-center justify-between">
          <div className="flex">
            <img
              className="rounded-full  dark:bg-darkBgMain bg-white max-w-none max-sm:w-8 max-sm:h-8 w-10  h-10 object-cover object-top"
              src={
                card?.author?.profileImg == ""
                  ? profileDefault
                  : card?.author?.profileImg
              }
            />
            <div className="flex flex-col justify-center ml-2">
              <div
                className="flex items-center text-[17px] tracking-[0.8px] dark:text-darkTextMain cursor-pointer font-semibold max-lg:text-[15px] max-sm:text-[11px] max-md:text-[14px] truncate line-clamp-1"
                onClick={() => {
                  navigate(
                    `/profile/${card?.author.username?.replace(/\s+/g, "-")}`,
                    {}
                  );
                }}
              >
                {card?.author?.username}
              </div>
              <div className="text-slate-600 font-semibold text-xs max-lg:text-[15px] max-sm:text-[10px] max-md:text-[12px]  dark:text-darkTextPrimary">
                {date}
              </div>
            </div>
          </div>
          <button
            className="p-1 max-lg:hidden rounded-md text-[15px] text-white px-4 border-2 border-slate-200  dark:border-gray-700 hover:border-blue-300  bg-primaryMain dark:hover:border-blue-400"
            onClick={() => {
              //("Welcome to Blog");

              navigate(`/blogs/${card._id}`);
            }}
          >
            Read
          </button>
        </div>
        <div className="flex gap-10">
          <h2
            className="text-gray-800 text-xl max-lg:text-base max-sm:text-sm leading-7 font-bold font-serif  dark:text-darkTextMain hover:text-primaryMain tracking-wider dark:hover:text-secondary line-clamp-2 cursor-pointer capitalize"
            onClick={() => {
              navigate(`/blogs/${card?._id}`);
            }}
          >
            {card.Title}
          </h2>
        </div>

        <div className="py-3 max-sm:py-2">
          <img
            className="w-full rounded-lg"
            src={card?.Blog_url != "" ? card?.Blog_url : BannerImg}
          />
        </div>
        <div className="flex justify-between">
          <div className="flex gap-10 max-lg:gap-7 max-md:gap-5 max-sm:gap-0">
            <div className="rounded-full max-sm:px-[7px]  max-sm:py-[6px]  py-2 px-3    group/btn flex justify-center items-center transition ease-in-out">
              {" "}
              <p className="text-xs   text-gray-700 dark:text-gray-300 max-sm:text-xs ">
                {like}
              </p>
              <i
                className={` ml-[4px]  text-red-500 dark:text-red-500 fa fa-heart text-[16px] `}
              ></i>
            </div>
            <div className="rounded-full py-2  px-3  max-sm:px-[7px] max-sm:py-[6px]  flex justify-center items-center">
              <p className="text-xs  text-gray-700 dark:text-gray-300 max-sm:text-xs ">
                {book}
              </p>
              <i
                className={`ml-[4px] text-primaryMain dark:text-primaryMain fa fa-bookmark
                hover:text-primaryMain  text-[16px] `}
              ></i>
            </div>
            <div className="w-[100%] flex py-2  px-3  items-center justify-center">
              <p className="text-xs  text-gray-700 dark:text-gray-300 max-sm:text-xs ">
                {card?.view}
              </p>
              <i className="fa fa-eye ml-[4px]  text-gray-700 dark:text-white  text-[16px] "></i>
            </div>
            <div className="rounded-full max-sm:px-[7px] flex-col-reverse max-sm:py-[6px]   flex justify-center items-center transition ease-in-out">
              {" "}
              <i
                className="dark:text-white  fa fa-share  text-gray-600 text-[16px] "
                onClick={sharemodal}
              ></i>
            </div>
          </div>
        </div>
      </article>
    </>
  );
}
