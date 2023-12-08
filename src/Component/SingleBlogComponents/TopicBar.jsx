import React, { useState } from "react";
import { BlogLink } from "../../Assets/icons";
import ShareModal from "./ShareModal";
import Bookmark from "../common/IconComponents/Bookmark";
import Like from "../common/IconComponents/Like";

const TopicBar = ({
  navbarRef,
  ispreview,
  loading,
  card,
  scrollToCommentSection,
}) => {
  const [shareModalVisible, setShareModalVisible] = useState(false);

  const sharemodal = () => {
    setShareModalVisible(!shareModalVisible);
  };
  return (
    <>
      {shareModalVisible && (
        <ShareModal
          sharemodal={sharemodal}
          currentUrl={window.location.href}
        ></ShareModal>
      )}

      <section
        ref={navbarRef}
        className={`fixed ${
          ispreview && "hidden"
        }  flex justify-between items-center border-b-[1px] border-gray-200 dark:border-darkBorderAll bg-white dark:bg-darkBgMain dark:text-white w-full transition-all ease-in-out duration-300 delay-300`}
      >
        <div className="pl-10  max-sm:pl-3 items-center flex  dark:hover:text-secondary  py-3 max-sm:py-3 tracking-wider ">
          <div className=" pr-3 max-sm:pr-2 border-gray-400 border-r-2">
            <img src={BlogLink} className="max-h-8 rotate-90" alt="" />
          </div>

          <p className="pl-3  max-sm:text-[15px] font-bold text-black capitalize dark:text-white text-[23px]">
            {loading ? (
              <div className="bg-lightSkeleton  shadow  animate-pulse    dark:bg-darkSkeleton h-4 rounded-sm w-32"></div>
            ) : (
              card?.Title
            )}
          </p>
        </div>
        <div className="flex gap-5 max-sm:gap-0 max-sm:mr-3 mr-4">
          <i
            className="dark:text-white max-sm:text-[14px] mt-[8px] fa fa-comment  text-gray-600 hover:text-primaryMain dark:hover:text-primaryMain px-2 text-[20px] "
            onClick={scrollToCommentSection}
          ></i>
          <Bookmark card={card}></Bookmark>
          <Like card={card}></Like>
          <i
            className="dark:text-white block fa fa-share  mt-[8px]  text-gray-600 max-sm:text-[14px] hover:text-primaryMain dark:hover:text-primaryMain px-2 text-[20px]"
            onClick={sharemodal}
          ></i>
        </div>
      </section>
    </>
  );
};

export default TopicBar;
