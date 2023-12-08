import { useState } from "react";
import CommentLikeContext from "./CommentLikeContext";
import blogContext from "./blogContext";
import { useContext } from "react";
const CommentLikeState = (props) => {
  const [allbookmarks, setallbookmarks] = useState([]);
  const [checkbookmark, setcheckbookmark] = useState([]);
  const [editcomment, seteditcomment] = useState([]);
  const [checklike, setchecklike] = useState([]);
  const [loading, setLoading] = useState(true);

  const context = useContext(blogContext);
  // const {}
  const [reply, setreply] = useState({});
  const host = "https://bloglinkbackend-it3i.onrender.com";
  const [SingleBlogComment, setSingleBlogComment] = useState([]);
  const addreply = async (data) => {
    const { id } = data;

    const obj = JSON.parse(localStorage.getItem("UserData"));

    const response = await fetch(`${host}/api/comments/addreply`, {
      method: "POST",
      headers: {
        "auth-token": obj.authtoken,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...data,
      }),
    });
    const comments2 = await response.json();
    getreply(id);
    setreply(comments2);
  };
  const addcomment = async (data) => {
    // todo api call
    //API call
    const obj = JSON.parse(localStorage.getItem("UserData"));
    const { postID, comment, userID } = data;
    const response = await fetch(`${host}/api/comments/addcomment`, {
      method: "POST",
      headers: {
        "auth-token": obj.authtoken,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        postID,
        comment,
        userID,
      }),
    });

    const comments = await response.json();

    // setSingleBlogComment(SingleBlogComment.concat(comments));
  };
  const Editcomment = async (data) => {
    // todo api call
    //API call
    const obj = JSON.parse(localStorage.getItem("UserData"));
    const { id, userID, reply } = data;
    console.log(data);
    const response = await fetch(`${host}/api/comments/editcomment`, {
      method: "PUT",
      headers: {
        "auth-token": obj.authtoken,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id,
        reply,
        userID,
      }),
    });
    const comments = await response.json();
    console.log(comments);
    // getreply(id);
    //  seteditcomment()
  };

  const getsingleblogComment = async (id) => {
    const response = await fetch(
      `${host}/api/comments/getallcommentsbypostID/${id}`,
      {
        method: "GET",

        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const json = await response.json();

    setSingleBlogComment(json);
  };
  const getreply = async (id) => {
    const response = await fetch(`${host}/api/comments/getreply/${id}`, {
      method: "GET",

      headers: {
        "Content-Type": "application/json",
      },
    });

    const json = await response.json();

    setreply(json);
    console.log(reply);
    // console.log(SingleBlogComment);

    return json;
  };

  const updateViews = async (data) => {
    const { view, id } = data;
    let reponse = await fetch(`${host}/api/comments/postViews/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ view }),
    });

    let resp = await reponse.json();
  };

  const addbookmark = async (data) => {
    const obj = JSON.parse(localStorage.getItem("UserData"));

    const resp = await fetch(`${host}/api/comments/addbookmark/`, {
      method: "PUT",
      headers: {
        "auth-token": obj.authtoken,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const resp2 = await resp.json();
  };

  const deletebookmark = async (data) => {
    const obj = JSON.parse(localStorage.getItem("UserData"));

    const resp = await fetch(`${host}/api/comments/deletebookmark/`, {
      method: "PUT",
      headers: {
        "auth-token": obj.authtoken,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const resp2 = await resp.json();
  };

  const addlike = async (data) => {
    const obj = JSON.parse(localStorage.getItem("UserData"));

    const resp = await fetch(`${host}/api/comments/addlike/`, {
      method: "PUT",
      headers: {
        "auth-token": obj.authtoken,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const resp2 = await resp.json();
  };

  const deletelike = async (data) => {
    const obj = JSON.parse(localStorage.getItem("UserData"));

    const resp = await fetch(`${host}/api/comments/deletelike/`, {
      method: "PUT",
      headers: {
        "auth-token": obj.authtoken,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const resp2 = await resp.json();
  };
  const addcommentlike = async (data) => {
    // const obj = JSON.parse(localStorage.getItem("UserData"));
    console.log(data);
    const resp = await fetch(`${host}/api/comments/addcommentlike/`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const resp2 = await resp.json();
    console.log(resp2);
  };

  const deletecommentlike = async (data) => {
    const obj = JSON.parse(localStorage.getItem("UserData"));

    const resp = await fetch(`${host}/api/comments/deletecommentlike/`, {
      method: "PUT",
      headers: {
        "auth-token": obj.authtoken,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const resp2 = await resp.json();
  };
  const Checklike = async (data) => {
    const obj = JSON.parse(localStorage.getItem("UserData"));

    const resp = await fetch(`${host}/api/comments/checklike/`, {
      method: "PUT",
      headers: {
        "auth-token": obj.authtoken,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId: data.userId, postId: data.postId }),
    });

    const resp2 = await resp.json();
    return resp2;
  };
  const Checkcommentlike = async (data) => {
    console.log(data);
    const obj = JSON.parse(localStorage.getItem("UserData"));
    const resp = await fetch(`${host}/api/comments/checkcommentlike/`, {
      method: "PUT",
      headers: {
        "auth-token": obj.authtoken,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId: data.userId, commentId: data.commentId }),
    });

    const resp2 = await resp.json();
    return resp2;
  };

  const getbookmark = async (data) => {
    const obj = JSON.parse(localStorage.getItem("UserData"));

    try {
      const resp = await fetch(`${host}/api/comments/getbookmark/`, {
        method: "PUT",
        headers: {
          "auth-token": obj.authtoken,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ data }),
      });

      const resp2 = await resp.json();
      console.log(resp2);
      setallbookmarks(resp2?.postId);
    } catch (error) {
      console.error("Error fetching bookmarks:", error);
    } finally {
      setLoading(false); // Set loading to false when the request is complete
    }
  };

  const Checkbookmark = async (data) => {
    const obj = JSON.parse(localStorage.getItem("UserData"));

    const resp = await fetch(`${host}/api/comments/checkbookmark/`, {
      method: "PUT",
      headers: {
        "auth-token": obj.authtoken,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId: data.userId, postId: data.postId }),
    });

    const resp2 = await resp.json();

    return resp2;

    // setcheckbookmark(resp2?.postId);
  };

  const countLike = async (data) => {
    const resp = await fetch(`${host}/api/comments/countlike/`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ data }),
    });

    const resp2 = await resp.json();
    return resp2;
  };
  const countcommentLike = async (data) => {
    console.log(data);
    // console.log(data.commentId);

    const resp = await fetch(`${host}/api/comments/countcommentlike`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ data }),
    });

    const resp2 = await resp.json();
    console.log(resp2);
    return resp2;
  };
  const countBookmark = async (data) => {
    const resp = await fetch(`${host}/api/comments/countbookmark/`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ data }),
    });

    const resp2 = await resp.json();
    return resp2;
  };

  return (
    <CommentLikeContext.Provider
      value={{
        updateViews,
        addreply,
        reply,
        getreply,
        setreply,
        addbookmark,
        addlike,
        getbookmark,
        setallbookmarks,
        allbookmarks,
        Checkbookmark,
        Checklike,
        addcomment,
        SingleBlogComment,
        getsingleblogComment,
        checkbookmark,
        deletebookmark,
        deletelike,
        countLike,
        countBookmark,
        loading,
        countcommentLike,
        deletecommentlike,
        addcommentlike,
        Checkcommentlike,
        Editcomment,
      }}
    >
      {props.children}
    </CommentLikeContext.Provider>
  );
};

export default CommentLikeState;
