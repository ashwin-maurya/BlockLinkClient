import React, { useState, useContext } from "react";
import "react-toastify/dist/ReactToastify.css";
import EditProfileModal from "./EditProfileModal";
import EditBanner from "./EditBanner";
import { profileDefault } from "../../Assets/icons";
import EditProfileImg from "./EditProfileImg";
import { uploadBannerImage, uploadImage } from "../../api/ImageUpload";
import { useEffect } from "react";
import AuthContext from "../../Helper/Context/AuthContext";
import { BannerImg } from "../../Assets/images";
import { editPen, trash } from "../../Assets/icons";
import ProfileMainSkeleton from "../../Component/SkeletonLoaders/ProfileMainSkeleton";
import { useNavigate } from "react-router";

export default function ProfileMain({ UserProfile, UserMatch }) {
  const context = useContext(AuthContext);
  const navigate = useNavigate();
  const [imgLink, setimgLink] = useState("");
  const { addImg, UserDetails } = context;
  const [showProfileModal, setProfileModal] = useState(false);
  const [showBannerModal, setBannerModal] = useState(false);
  const [showProfileImg, setProfileImg] = useState(false);
  const ProfileModalStatus = () => {
    setProfileModal((showProfileModal) => !showProfileModal);
  };

  const BannerModal = () => {
    setBannerModal((showBannerModal) => !showBannerModal);
  };

  useEffect(() => {
    setimgLink(imgLink);
  }, [imgLink]);

  const ProfileImg = () => {
    setProfileImg((showProfileImg) => !showProfileImg);
  };

  const [currentImage, setCurrentImage] = useState({});
  const [currentBannerImage, setCurrentBannerImage] = useState({});

  const [progress, setProgress] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const getImage = (event) => {
    setCurrentImage(event.target.files[0]);
  };
  const getBannerImage = (event) => {
    setCurrentBannerImage(event.target.files[0]);
  };

  const [profileImg, setprofileImg] = useState(profileDefault);
  const [bannerImg, setbannerImg] = useState(BannerImg);

  const deleteimg = () => {
    addImg({ key: "profileImg", imgUrl: "", userID: UserDetails?._id });
    setprofileImg(profileDefault);
  };
  const deletebannerimg = () => {
    addImg({ key: "bannerImg", imgUrl: "", userID: UserDetails?._id });
    setbannerImg(BannerImg);
  };
  const uploadbannerimg = async () => {
    await uploadBannerImage(
      currentBannerImage,
      UserDetails?._id,
      BannerModal,
      setProgress,
      setCurrentBannerImage,
      addImg
    );
  };
  const uploadImage2 = async () => {
    await uploadImage(
      currentImage,
      UserDetails?._id,
      ProfileImg,
      setModalOpen,
      setProgress,
      setCurrentImage,
      addImg
    );
  };

  if (!UserProfile) {
    return <ProfileMainSkeleton />;
  }

  return (
    <>
      {showProfileModal && (
        <EditProfileModal
          ProfileModalStatus={ProfileModalStatus}
          UserProfile={UserProfile}
        ></EditProfileModal>
      )}
      {showBannerModal && (
        <EditBanner
          BannerModal={BannerModal}
          uploadbannerimg={uploadbannerimg}
          getBannerImage={getBannerImage}
          currentBannerImage={currentBannerImage}
          setProfileModal={setProfileModal}
          progress={progress}
        ></EditBanner>
      )}
      {showProfileImg && (
        <EditProfileImg
          ProfileImg={ProfileImg}
          getImage={getImage}
          uploadImage2={uploadImage2}
          showProfileModal={showProfileModal}
          setProfileModal={setProfileModal}
          currentImage={currentImage}
          progress={progress}
        ></EditProfileImg>
      )}
      <section className="relative block h-[400px] ">
        <div className=" w-full h-full  ">
          <div className="relative group/buttons h-[300px]">
            <img
              className=" w-full h-full bg-center bg-cover object-cover object-top"
              height={10}
              src={
                UserProfile?.bannerImg != ""
                  ? UserProfile?.bannerImg
                  : BannerImg
              }
              alt=""
            />

            {UserMatch && (
              <div className="absolute bg-white dark:bg-darkBgPrimary  top-0 right-0 border-2 border-bgBlue  dark:border-darkBgMain rounded-full m-2 ">
                <div className="hover:bg-bgBlue  rounded-t-full dark:hover:bg-darkBgMain ">
                  <img src={editPen} className="p-2" onClick={BannerModal} />
                </div>
                <div className="hover:bg-bgBlue rounded-b-full dark:hover:bg-darkBgMain ">
                  <img src={trash} className="p-2" onClick={deletebannerimg} />
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="relative pt-8">
        <div className="container mx-auto px">
          <div className="relative flex flex-col min-w-0 bg-white  dark:bg-darkBgPrimary w-[60%] max-lg:w-[95%] mx-auto mb-6 shadow-md rounded-lg -mt-60 p-10 max-lg:py-2 max-lg:px-2">
            <div className=" flex flex-wrap relative justify-center flex-row max-lg:justify-between  ">
              <div className="group/buttons absolute max-lg:relative ">
                <img
                  alt="img"
                  src={
                    UserProfile?.profileImg != ""
                      ? UserProfile?.profileImg
                      : profileImg
                  }
                  className="shadow-xl rounded-full  w-40 h-40 -mt-24 bg-white dark:bg-darkBgMain   border-4 border-white object-cover object-top dark:border-darkBgMain"
                />

                {UserMatch && (
                  <div className="absolute bg-white dark:bg-darkBgPrimary dark:border-darkBgMain  flex -bottom-4 right-9  rounded-full m-2 border-2 border-bgBlue ">
                    <div className="hover:bg-bgBlue rounded-l-full dark:hover:bg-darkBgMain ">
                      <img src={editPen} className="p-2" onClick={ProfileImg} />
                    </div>
                    <img
                      src={trash}
                      className="p-2 hover:bg-bgBlue rounded-r-full dark:hover:bg-darkBgMain "
                      onClick={deleteimg}
                    />
                  </div>
                )}
              </div>
              <div className="w-full max-lg:w-auto items-center max-lg:gap-5 flex justify-between">
                <div className="flex mt-4 space-x-5 sm:justify-center max-lg:mt-0 left-0">
                  {UserDetails?.socialLinks?.linkedin !== "" && (
                    <a
                      href={UserDetails?.socialLinks?.linkedin}
                      target="_blank"
                      rel="noreferrer"
                      className="text-gray-500 dark:text-white hover:text-primaryMain text-2xl dark:hover:text-secondary"
                    >
                      <i className="fa fa-linkedin"></i>
                    </a>
                  )}
                  {UserDetails?.socialLinks?.github !== "" && (
                    <a
                      href={UserDetails?.socialLinks?.github}
                      target="_blank"
                      rel="noreferrer"
                      className="text-gray-500 dark:text-white hover:text-primaryMain text-2xl dark:hover:text-secondary"
                    >
                      <i className="fa fa-github"></i>
                    </a>
                  )}
                  {UserDetails?.socialLinks?.twitter !== "" && (
                    <a
                      href={UserDetails?.socialLinks?.twitter}
                      target="_blank"
                      className="text-gray-500 dark:text-white hover:text-primaryMain text-2xl dark:hover:text-secondary"
                    >
                      <i className="fa fa-twitter"></i>
                    </a>
                  )}
                  {UserDetails?.socialLinks?.instagram !== "" && (
                    <a
                      href={UserDetails?.socialLinks?.instagram}
                      target="_blank"
                      className="text-gray-500 dark:text-white hover:text-primaryMain text-2xl dark:hover:text-secondary"
                    >
                      <i className="fa fa-instagram"></i>
                    </a>
                  )}
                </div>

                {UserMatch && (
                  <div className=" right-0 top-0">
                    <button
                      className=" hover:bg-bgBlue dark:hover:bg-darkBgMain rounded-full  font-semibold text-white"
                      onClick={() => {
                        navigate(`/settings`, {});
                      }}
                    >
                      <img
                        src={editPen}
                        className="p-3 text-base font-semibold  text-white"
                      />
                    </button>
                  </div>
                )}
              </div>
            </div>
            <div className="p-4 my-4  max-lg:my-0 flex flex-col justify-center items-center max-lg:items-start">
              <h3 className="text-3xl font-semibold leading-normals text-blueGray-700  dark:text-darkTextMain">
                {UserProfile?.name}
              </h3>
              <div className="text-sm leading-normal text-blueGray-400 font-light dark:text-darkTextMain">
                {UserProfile?.username}
              </div>

              <div className=" leading-normal mt-2 mb-2 text-blueGray-400 font-light dark:text-darkTextMain">
                <div className="flex flex-col text-lg">
                  <p className="text-center max-lg:text-left">
                    {UserProfile?.description &&
                    UserProfile.description.length > 200
                      ? UserProfile.description.slice(0, 200) + "..."
                      : UserProfile.description}
                  </p>
                </div>
              </div>
            </div>
            <div className="flex min-w-0 break-words w-full max-lg:flex-col gap-4">
              <div className="w-[50%] max-lg:w-[100%] rounded-lg p-5  bg-bgBlue dark:bg-darkBgMain flex flex-col">
                <div className="flex justify-evenly gap-5">
                  <div className="bg-white dark:bg-darkBgPrimary shadow-sm px-4 py-2 rounded-lg flex w-full items-center justify-center">
                    <div className="flex dark:text-secondary text-primaryMain  flex-col justify-center items-center">
                      <div className="text-2xl">-</div>
                      <div className="font-bold">Blogs</div>
                    </div>
                  </div>
                  <div className="bg-white dark:bg-darkBgPrimary shadow-sm px-4 py-2 rounded-lg flex w-full items-center justify-center">
                    <div className="flex dark:text-secondary text-primaryMain  flex-col justify-center items-center">
                      <div className="text-2xl">-</div>
                      <div className="font-bold">Impressions</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-[50%] max-lg:w-[100%] rounded-lg p-5 bg-bgBlue dark:bg-darkBgMain">
                <div className="flex items-center">
                  <div className="w-[20%] max-lg:w-[10%] max-sm:w-[20%]">
                    <div className="w-7 h-7 bg-primaryMain dark:bg-secondary rounded-full m-2 flex justify-center items-center ">
                      <i className="fa fa-briefcase  text-bgBlue text-base"></i>
                    </div>
                  </div>
                  <div className="text-lightTextMain dark:text-darkTextMain font-semibold  w-[90%] ">
                    <p>{UserProfile?.work || "-"}</p>
                  </div>
                </div>
                <div className="flex items-center w-full">
                  <div className="w-[20%] max-lg:w-[10%] max-sm:w-[20%]">
                    <div className="w-7 h-7 bg-primaryMain dark:bg-secondary rounded-full m-2 flex justify-center items-center ">
                      <i className="fa fa-graduation-cap text-bgBlue text-base"></i>
                    </div>
                  </div>
                  <div className="text-lightTextMain dark:text-darkTextMain font-semibold w-[90%]">
                    <p>{UserProfile?.education || "-"}</p>
                  </div>
                </div>
                <div className="flex items-center w-full">
                  <div className="w-[20%] max-lg:w-[10%] max-sm:w-[20%]">
                    <div className="w-7 h-7 bg-primaryMain dark:bg-secondary rounded-full m-2 flex justify-center items-center ">
                      <i className="fa fa-map-marker text-bgBlue text-base"></i>
                    </div>
                  </div>
                  <div className="text-lightTextMain dark:text-darkTextMain font-semibold w-[90%]">
                    <p>{UserProfile?.location || "-"}</p>
                  </div>
                </div>

                <div className="flex items-center w-full">
                  <div className="w-[20%] max-lg:w-[10%] max-sm:w-[20%]">
                    <div className="w-7 h-7 bg-primaryMain dark:bg-secondary rounded-full m-2 flex justify-center items-center ">
                      <i className="fa fa-calendar-o text-bgBlue text-base"></i>
                    </div>
                  </div>
                  <div className="text-lightTextMain dark:text-darkTextMain font-semibold w-[90%]">
                    <p>
                      Joined -
                      {new Date(UserProfile?.Date).toLocaleString("en-US", {
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
        </div>
      </section>
    </>
  );
}
