import { useContext, useEffect } from "react";
import CommentLikeContext from "../Helper/Context/CommentLikeContext";
import { useLocation, useParams } from "react-router";
import { BlogCard } from "../Component/common";
import { Notfound } from "../Assets/images";
import BlogCardSkeleton from "../Component/SkeletonLoaders/BlogCardSkeleton";
const BookmarkPage = () => {
  const context = useContext(CommentLikeContext);
  const { getbookmark, allbookmarks, loading } = context;

  useEffect(() => {
    getbookmark(JSON.parse(localStorage.getItem("UserData")).userDetailId);
    console.log(allbookmarks);
  }, []);

  if (loading) {
    return <BlogCardSkeleton />;
  }
  return (
    <>
      {allbookmarks?.length > 0 ? (
        allbookmarks?.map((card, index) => (
          <BlogCard key={index} isBookmark={true} card={card}></BlogCard>
        ))
      ) : (
        <div className="w-full flex justify-center items-center ">
          <div className="max-w-xs w-full bg-[#eafbff] dark:bg-darkBgPrimary rounded-md flex flex-col justify-center items-center">
            <p className="font-bold text-primaryMain py-2">NO BOOKMARKS</p>
            <img src={Notfound} alt="Not found" className="" />
          </div>
        </div>
      )}
    </>
  );
};

export default BookmarkPage;
