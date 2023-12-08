import { useState } from "react";
import FilterContext from "./FilterContext";

const FilterState = (props) => {
  const host = "http://localhost:5001";

  const [filterBlogs, setfilterBlogs] = useState([]);
  const getallblogs = async () => {
    //API call

    const response = await fetch(`${host}/api/blogs/fetchallblogCards`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const json = await response.json();
    setfilterBlogs(json);
  };
  const getallcategory = async () => {
    //API call

    const response = await fetch(`${host}/api/filter/getAllCategories`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const json = await response.json();

    let arr = json.map((item) => item?.Category);

    return arr;
  };

  const getrelevantblogs = async (data) => {
    const obj = JSON.parse(localStorage.getItem("UserData"));
    const response = await fetch(`${host}/api/filter/getRelevantBlogs`, {
      method: "POST",
      headers: {
        "auth-token": obj.authtoken,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ data }),
    });

    const resp = await response.json();
    setfilterBlogs(resp);
  };
  const getcategoryblogs = async (data) => {
    const response = await fetch(`${host}/api/filter/getCategoryBlogs`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ category: data }),
    });

    const resp = await response.json();
    return resp;
  };

  const getlatestblogs = async () => {
    let response = await fetch(`${host}/api/filter/getlatestblogs`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    let resp = await response.json();
    setfilterBlogs(resp);
  };

  const getTopBlogs = async (interval) => {
    let response = await fetch(`${host}/api/filter/sortByViews/${interval}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    let resp = await response.json();
    setfilterBlogs(resp);
  };

  const deletenote = async (id) => {
    //API call
    const obj = JSON.parse(localStorage.getItem("UserData"));
    const response = await fetch(`${host}/api/blogs/deleteblog/${id}`, {
      method: "DELETE",
      headers: {
        "auth-token": obj.authtoken,
        "Content-Type": "application/json",
      },
    });

    const json = response.json();
    const output = filterBlogs.filter((blog) => {
      return blog._id != id;
    });
    setfilterBlogs(output);
  };

  const searchBySingleKeyword = async (data) => {
    const { field, keyword } = data;
    console.log(data);
    const obj = JSON.parse(localStorage.getItem("UserData"));
    const response = await fetch(`${host}/api/filter/searchkeyword`, {
      method: "PUT",
      headers: {
        "auth-token": obj.authtoken,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ field, keyword }),
    });

    const resp = await response.json();
    console.log(resp);
    return resp;
  };

  const searchBySingleKeywordarray = async (data) => {
    const { field, keyword } = data;
    const obj = JSON.parse(localStorage.getItem("UserData"));
    const response = await fetch(`${host}/api/filter/searchkeywordarray`, {
      method: "PUT",
      headers: {
        "auth-token": obj.authtoken,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ field, keyword }),
    });

    const resp = await response.json();
    console.log(resp);

    return resp;
  };

  return (
    <FilterContext.Provider
      value={{
        searchBySingleKeywordarray,
        searchBySingleKeyword,
        getrelevantblogs,
        getlatestblogs,
        filterBlogs,
        getallcategory,
        setfilterBlogs,
        getTopBlogs,
        getallblogs,
        deletenote,
        getcategoryblogs,
      }}
    >
      {props.children}
    </FilterContext.Provider>
  );
};

export default FilterState;

// http://localhost:5001
