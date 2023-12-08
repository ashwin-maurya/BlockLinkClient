import React, { useContext, useEffect, useState } from "react";
import ProfileMain from "../Section/ProfileSection/ProfileMain";
import UserBlogs from "../Section/ProfileSection/UserBlogs";
import AuthContext from "../Helper/Context/AuthContext";
import { useLocation, useParams } from "react-router-dom";
import blogContext from "../Helper/Context/blogContext";

export default function ProfilePage() {
  const [username, setUsername] = useState("");
  let location = useLocation();
  const context = useContext(AuthContext);
  const context1 = useContext(blogContext);
  const { UserProfile, getUser, UserDetails, AuthStatus } = context;
  const { filterblogs, filterData } = context1;
  const [UserMatch, setUserMatch] = useState(false);
  console.log(UserDetails);
  console.log(UserProfile);
  useEffect(() => {
    if (AuthStatus) {
      if (UserDetails?._id === UserProfile?._id) {
        setUserMatch(true);
      } else {
        setUserMatch(false);
      }
    } else {
      setUserMatch(false);
    }
  }, [UserDetails, UserProfile, AuthStatus]);

  useEffect(() => {
    const currentUrl = window.location.href;
    const urlParts = currentUrl.split("/");
    const extractedUsername = urlParts[urlParts.length - 1];
    setUsername(extractedUsername);
    console.log(username);
  }, [location]);

  useEffect(() => {
    if (UserDetails) {
      filterblogs(UserProfile?.ID);
    }
  }, [username, UserDetails]);

  useEffect(() => {
    if (username) {
      getUser(username);
    }
  }, [username, UserDetails]);

  return (
    <>
      <ProfileMain UserProfile={UserProfile} UserMatch={UserMatch} />
      {filterData.length > 0 && (
        <UserBlogs filterData={filterData} UserMatch={UserMatch} />
      )}
    </>
  );
}
