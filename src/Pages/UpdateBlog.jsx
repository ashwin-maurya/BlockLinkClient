import { useState, useContext, useEffect } from "react";
import TinyMCEEditor from "../Helper/Editor";
import blogContext from "../Helper/Context/blogContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import TitleandContent from "../Component/common/WriteComponents/TitleandContent";
import FeaturedImage from "../Component/common/WriteComponents/FeaturedImage";
import Content from "../Component/common/WriteComponents/Content";
import Category from "../Component/common/WriteComponents/Category";
import Tag from "../Component/common/WriteComponents/Tag";
import { useNavigate } from "react-router-dom";

const UpdateBlog = ({ UserDetails, blog2 }) => {
  const navigate = useNavigate();

  const [blogs, setblog] = useState(blog2[0]);
  console.log(blog2);

  const [category, setcategory] = useState("");
  const [featuredImage, setfeaturedImage] = useState(blog2[0]?.Blog_url);

  useEffect(() => {
    setblog(blog2[0]);
    setcategory(blog2[0]?.Category);
    settags(blog2[0]?.tags);
    setfeaturedImage(blog2[0]?.Blog_url);
  }, [blog2]);

  useEffect(() => {
    let input = {
      Blog_url: featuredImage,
    };
    setblog({
      ...blogs,
      ...input,
      Category: category,
    });
    console.log(blogs);
  }, [featuredImage, category]);

  useEffect(() => {
    localStorage.setItem(
      "BlogData",
      JSON.stringify({ ...blogs, author: UserDetails })
    );
  }, [blogs]);

  const context = useContext(blogContext);

  const { updateblog } = context;

  const [tags, settags] = useState(blog2[0]?.tags);

  const updateDesc = (content) => {
    let blogcontent = {
      _id: blog2[0]?.blogcontent?._id,
      description: content,
    };

    setblog({ ...blogs, blogcontent });
  };
  const getTags = (e) => {
    let str = e.target.value;
    let strarr = str.split(",");

    settags(strarr);

    setblog({ ...blogs, tags: strarr });
    console.log(blogs);
  };
  const getInput = (event) => {
    let { name, value } = event.target;
    let input = {
      [name]: value,
    };
    setblog({ ...blogs, ...input });
    console.log(blogs);
  };
  const handleadd = () => {
    try {
      console.log(blog2[0]);
      console.log({ blogs });
      updateblog(blogs, blog2[0]._id);
      navigate(`/blogs/${blog2[0]._id}`);

      console.log("Saved to Database");
      //("Blog Updated Successfully");
    } catch (error) {
      toast.error("Error occured while adding your blog");
    }
  };

  return (
    <>
      <div className="flex w-full justify-end pt-2 pr-5 bg-gray-100 p-3 dark:bg-darkBgPrimary z-50">
        <button
          className="border-2 border-slate-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-400   rounded-md bg-primaryMain dark:bg-secondary px-4 py-1 font-semibold text-white"
          onClick={handleadd}
        >
          Update
        </button>
      </div>
      <section className="p-4 max-lg:p-0 flex max-lg:flex-col  dark:text-white">
        <div className=" w-[70%] px-6 p-3 max-md:p-1 max-lg:w-full">
          <TitleandContent blogs={blogs} getInput={getInput}></TitleandContent>
          <Content blogs={blogs} updateDesc={updateDesc}></Content>
        </div>
        <div className="w-[30%] flex   flex-col justify-between my-3  max-lg:w-full">
          <div className="">
            <Category
              blogs={blogs}
              category={category}
              setcategory={setcategory}
              getInput={getInput}
            ></Category>

            <Tag tags={tags} getTags={getTags}></Tag>
            <FeaturedImage
              setfeaturedImage={setfeaturedImage}
              featuredImage={featuredImage}
              blogs={blogs}
              setblog={setblog}
              getInput={getInput}
            ></FeaturedImage>
          </div>
        </div>
      </section>
    </>

    // <section className="m-3 rounded-lg bg-gray-100 dark:text-white dark:bg-darkBgPrimary">
    //   <div className="text-[24px] ">
    //     <div className="max-lg:flex max-lg:flex-col  flex p-10  ">
    //       <div className="w-[30%]">Title</div>
    //       <div className="w-[60%]">
    //         <input
    //           name="Title"
    //           value={blogs?.Title}
    //           onChange={(e) => {
    //             getInput(e);
    //           }}
    //           className="max-lg:mt-2  w-full  rounded-md dark:text-black dark:focus:border-secondary dark:border-3 w-full border-2  outline-none p-3 text-[23px]"
    //           type="text"
    //         />
    //       </div>
    //     </div>
    //     <div className="max-lg:flex max-lg:flex-col  group flex p-10 ">
    //       <div className=" w-[30%]">Category</div>
    //       <div className="w-[60%]">
    //         <input
    //           name="Category"
    //           value={blogs?.Category}
    //           onChange={(e) => {
    //             getInput(e);
    //           }}
    //           className="max-lg:mt-2  w-full  rounded-md dark:text-black dark:focus:border-secondary dark:border-3 border-2 focus:border-primaryMain outline-none p-3 text-[23px]"
    //           type="text"
    //         />
    //       </div>
    //     </div>
    //     <div className="max-lg:flex max-lg:flex-col  flex p-10 ">
    //       <div className="w-[30%]">Tags</div>
    //       <div className="w-[60%]">
    //         <input
    //           name="tags"
    //           value={tags}
    //           onChange={(e) => {
    //             getTags(e);
    //           }}
    //           className="max-lg:mt-2   rounded-md dark:text-black dark:focus:border-secondary dark:border-3 w-full border-2 outline-none p-3 text-[23px]"
    //           type="text"
    //         />
    //       </div>
    //     </div>
    //     <div className="max-lg:flex max-lg:flex-col   flex p-10 ">
    //       <div className="w-[30%]">Blog Image</div>
    //       <div className="w-[60%]">
    //         <input
    //           name="Blog_url"
    //           value={blogs?.Blog_url}
    //           onChange={(e) => {
    //             getInput(e);
    //           }}
    //           className="max-lg:mt-2  w-full  rounded-md border-2 dark:text-black dark:focus:border-secondary dark:border-3 outline-none p-3 text-[23px]"
    //           type="text"
    //         />
    //       </div>
    //     </div>
    //   </div>
    //   <div className=" flex p-10 flex-col justify-around">
    //     <div className="text-[23px]">Content</div>
    //     <div className="overflow-hidden rounded-xl  mt-10">
    //       <TinyMCEEditor
    //         blogs={blogContent}
    //         description={updateDesc}
    //       ></TinyMCEEditor>
    //     </div>

    //     <div className="flex justify-center items-center ">
    //       <button
    //         className=" border-2 dark:bg-white dark:text-black dark:hover:bg-secondary dark:hover:text-white dark:hover:border-0 border-gray-700 hover:border-blue-800 rounded-lg hover:text-white  mt-3 bg-slate-300 pr-10 pl-10 pt-2 pb-2  hover:bg-primaryMain"
    //         onClick={handleupdate}
    //       >
    //         Update
    //       </button>
    //     </div>
    //   </div>
    // </section>
  );
};

export default UpdateBlog;
