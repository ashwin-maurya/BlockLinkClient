import { useState } from "react";
import blogContext from "./blogContext";

const BlogState = (props) => {
  const host = "https://bloglinkbackend-it3i.onrender.com";
  const bloginitial = [];
  const bloginitial1 = [];

  const [blog, setblogs] = useState(bloginitial);
  const [SingleBlogContent, setSingleBlogContent] = useState({});

  const [filterData, setfilterData] = useState(bloginitial1);
  const [UserImage, setUserImage] = useState({});
  //Get all blogs------------------------------------------------------------------------------------------------
  const getblogs = async () => {
    //API call

    const response = await fetch(`${host}/api/blogs/fetchallblogCards`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const json = await response.json();
    console.log(json);
    setblogs(json);
  };

  //Filter blogs by Username ----------------------------------------------------------------------------------------
  const filterblogs = async (userID) => {
    console.log(userID);
    const response = await fetch(`${host}/api/blogs/filterblog/${userID}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const json = await response.json();
    console.log("json asadbewb wef ewfef ewferfj");
    console.log(json);
    setfilterData(json);
  };

  const getsingleblogContent = async (id) => {
    console.log(id);

    const response = await fetch(`${host}/api/blogs/getsingleblogcontent`, {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: id }),
    });

    const json = await response.json();

    setSingleBlogContent(json);
    console.log(SingleBlogContent);
  };

  //Add a note
  const addblogCard = async (data) => {
    // todo api call
    //API call
    const obj = JSON.parse(localStorage.getItem("UserData"));
    const { Title, postID, userID, UserName, tags, Category, Blog_url } = data;
    const response = await fetch(`${host}/api/blogs/addblogCard`, {
      method: "POST",
      headers: {
        "auth-token": obj.authtoken,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userID,
        Title,
        postID,
        UserName,
        tags,
        Category,
        Blog_url,
      }),
    });
    const blog2 = await response.json();

    console.log(blog2);
    // setblogs(blog.concat(blog2));
  };

  const addblogcontent = async (data) => {
    // todo api call
    //API call
    const {
      userID,
      postID,
      Title,
      UserName,
      Category,
      Blog_url,
      tags,
      description,
    } = data;

    const obj = JSON.parse(localStorage.getItem("UserData"));
    const response = await fetch(`${host}/api/blogs/postblogcontent`, {
      method: "POST",
      headers: {
        "auth-token": obj.authtoken,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userID,
        postID,
        Title,
        description,
        tags,
        Category,
        Blog_url,
      }),
    });
    const blog2 = await response.json();
    console.log(blog2);
    return blog2;
  };

  //Delete a note

  //Edit a note
  const updateblog = async (data, id) => {
    //API call
    console.log(data);
    const { Title, Category, tags, Blog_url, blogcontent } = data;

    console.log(data);
    console.log("data from blog state");
    const obj = JSON.parse(localStorage.getItem("UserData"));

    const response = await fetch(`${host}/api/blogs/updateblog/${id}`, {
      method: "PUT",
      headers: {
        "auth-token": obj.authtoken,

        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        Title,
        Category,
        tags,
        Blog_url,
        blogcontent,
      }),
    });
    const json = await response.json();
    console.log(json);
    getblogs();
  };

  return (
    <blogContext.Provider
      value={{
        blog,
        addblogCard,
        getblogs,
        filterblogs,
        filterData,
        updateblog,
        addblogcontent,
        SingleBlogContent,
        getsingleblogContent,

        // getimg,
        UserImage,
        host,
        // , getnotes, editnote
      }}
    >
      {props.children}
    </blogContext.Provider>
  );
};

export default BlogState;
