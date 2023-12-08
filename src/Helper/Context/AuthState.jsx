import React, { useState } from "react";
import AuthContext from "./AuthContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const AuthState = (props) => {
  const host = "https://bloglinkbackend-it3i.onrender.com";

  const [UserDetails, setUserDetails] = useState();
  const [AuthStatus, setAuthStatus] = useState(false);
  const [UserProfile, setUserProfile] = useState();
  const [UserExistStatus, setUserExistStatus] = useState();
  const [loggedin, setLoggedin] = useState({});
  const [loggedinStatus, setLoggedinStatus] = useState(false);
  const [userDetailExist, setUserDetailExist] = useState();
  const [showAuthModal, setAuthModal] = useState(false);

  //Get all notes
  const googlelogin = async (GoogleCreds) => {
    //API call
    const response = await fetch(`${host}/api/auth/googlelogin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: GoogleCreds.email,
      }),
    });

    const json = await response.json();
    setLoggedin(json);
    setLoggedinStatus(json.success);
  };

  //Get all notes
  const googlesignup = async (GoogleCreds) => {
    //API call
    const response = await fetch(`${host}/api/auth/googlesignup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: GoogleCreds.name,
        email: GoogleCreds.email,
        username: GoogleCreds.username,
      }),
    });

    const json = await response.json();
    setLoggedin(json);
    setLoggedinStatus(json.success);
    adduserdetail({
      description: "",
      work: "",
      education: "",
      location: "",
      profileImg: "",
      bannerImg: "",
      socialLinks: {},
    });
  };

  //Get all notes
  const getCurrentUser = async (id) => {
    //API call
    const response = await fetch(`${host}/api/auth/getCurrentuser`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": JSON.parse(localStorage.getItem("UserData")).authtoken,
      },
      user: id,
    });
    const json = await response.json();
    if (json) {
      const UserID = json._id;
      const response1 = await fetch(
        `${host}/api/auth/getCurrentUserDetails/${UserID}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "auth-token": JSON.parse(localStorage.getItem("UserData"))
              .authtoken,
          },
        }
      );

      const UserDetail = await response1.json();
      if (UserDetail) {
        const updatedUserDetails = {
          // ...UserDetail,
          ...json,
          userID: UserDetail.userID,
          description: UserDetail.description,
          education: UserDetail.education,
          work: UserDetail.work,
          location: UserDetail.location,
          profileImg: UserDetail.profileImg,
          bannerImg: UserDetail.bannerImg,
          relevant: UserDetail.relevant,
          socialLinks: UserDetail.socialLinks,
        };
        setUserDetails(updatedUserDetails);
      } else {
        setUserDetails(json);
      }
    }
  };

  const getUser = async (username) => {
    //API call
    const response = await fetch(
      `${host}/api/auth/getuser?username=${username}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const json = await response.json();

    if (json) {
      const userID = json._id;
      const response1 = await fetch(
        `${host}/api/auth/getCurrentUserDetails/${userID}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const UserDetail = await response1.json();
      if (UserDetail) {
        const updatedUserDetails = {
          ...json,
          ID: UserDetail._id,
          userID: UserDetail.userID,
          description: UserDetail.description,
          education: UserDetail.education,
          work: UserDetail.work,
          location: UserDetail.location,
          profileImg: UserDetail.profileImg,
          bannerImg: UserDetail.bannerImg,
          relevant: UserDetail.relevant,
          socialLinks: UserDetail.socialLinks,
        };

        setUserProfile(updatedUserDetails);
      } else {
        setUserProfile(json);
      }
    }
    // console.log(UserDetail);
  };

  const userexist = async (email) => {
    //API call
    const response = await fetch(`${host}/api/auth/userexist?email=${email}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const json = await response.json();
    setUserExistStatus(json.status);
  };

  const userdetailexist = async () => {
    //API call
    const userID = UserDetails._id;
    const response = await fetch(
      `${host}/api/auth/userdetailexist?userID=${userID}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const json = await response.json();
    setUserDetailExist(json.status);
  };

  const adduserdetail = async (userDetail) => {
    const {
      username,
      description,
      work,
      education,
      location,
      profileImg,
      bannerImg,
      socialLinks,
    } = userDetail;
    const obj = JSON.parse(localStorage.getItem("UserData"));

    const userID = obj.UserID;
    const response = await fetch(`${host}/api/auth/adduserdetail`, {
      method: "POST",
      headers: {
        "auth-token": obj.authtoken,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userID,
        username,
        description,
        work,
        education,
        location,
        profileImg,
        bannerImg,
        socialLinks,
      }),
    });
    const ProfileUpdated = await response.json();
    console.log("ProfileUpdated");
    console.log(ProfileUpdated);
    const response1 = await fetch(`${host}/api/auth/addUserDetailIdToUsers`, {
      method: "POST",
      headers: {
        "auth-token": obj.authtoken,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userID: JSON.parse(localStorage.getItem("UserData")).UserID,
        userDetailId: ProfileUpdated._id,
      }),
    });
    const json1 = await response1.json();
    console.log("json1");
    console.log(json1);
    localStorage.setItem("UserData", JSON.stringify(json1));

    if (ProfileUpdated) {
      const updatedUserDetails = {
        ...UserDetails,
        userID: ProfileUpdated.userID,
        description: ProfileUpdated.description,
        education: ProfileUpdated.education,
        work: ProfileUpdated.work,
        location: ProfileUpdated.location,
        profileImg: ProfileUpdated.profileImg,
        bannerImg: ProfileUpdated.bannerImg,
        relevant: ProfileUpdated.relevant,
        socialLinks: ProfileUpdated.socialLinks,
      };
      setUserDetails(updatedUserDetails);
      setUserDetailExist();
    } else {
      toast.error("Failed!!");
    }
  };
  const updateuserdetail = async (userDetail) => {
    const userID = UserDetails._id;
    const { description, work, education, location } = userDetail;
    const obj = JSON.parse(localStorage.getItem("UserData"));

    const response = await fetch(
      `${host}/api/auth/updateuserdetail/${userID}`,
      {
        method: "PUT",
        headers: {
          "auth-token": obj.authtoken,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          description,
          work,
          education,
          location,
        }),
      }
    );
    const UpdatedProfileJson = await response.json();

    const UpdatedProfile = UpdatedProfileJson.updatedUserDetails;
    const updatedUserDetails = {
      ...UserDetails,
      userID: UpdatedProfile.userID,
      description: UpdatedProfile.description,
      education: UpdatedProfile.education,
      work: UpdatedProfile.work,
      location: UpdatedProfile.location,
    };
    setUserDetails(updatedUserDetails);
    setUserDetailExist();
    toast.success("Profile Updated");

    setUserDetailExist();
  };

  const addImg = async (data) => {
    // todo api call
    //API call

    const obj = JSON.parse(localStorage.getItem("UserData"));
    const { key, imgUrl, userID } = data;
    const response = await fetch(`${host}/api/auth/addimg`, {
      method: "POST",
      headers: {
        "auth-token": obj.authtoken,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        key,
        imgUrl,
        userID,
      }),
    });
    const comments2 = await response.json();

    // console.log(SingleBlogComment);

    getUser(userID);
    getCurrentUser(JSON.parse(localStorage.getItem("UserData")).UserID);
  };

  return (
    <AuthContext.Provider
      value={{
        UserDetails,
        getCurrentUser,
        AuthStatus,
        setAuthStatus,
        getUser,
        UserProfile,
        UserExistStatus,
        userexist,
        loggedin,
        setLoggedin,
        googlelogin,
        loggedinStatus,
        setLoggedinStatus,
        setUserExistStatus,
        googlesignup,
        setUserDetails,
        adduserdetail,
        userDetailExist,
        setUserDetailExist,
        userdetailexist,
        updateuserdetail,
        addImg,
        showAuthModal,
        setAuthModal,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;
