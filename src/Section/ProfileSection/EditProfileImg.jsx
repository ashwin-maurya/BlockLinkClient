import { useRef, useState } from "react";
import { Button, Modal, Progress } from "antd";

export default function EditProfileImg(props) {
  const { ProfileImg, getImage, uploadImage2, currentImage, progress } = props;

  const ProfileImgRef = useRef(null);
  const [selectedImageName, setSelectedImageName] = useState(null);

  const handleOutsideClick = (event) => {
    if (ProfileImgRef.current === event.target) {
      ProfileImg();
      setSelectedImageName(null);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImageName(file.name);
    } else {
      setSelectedImageName(null);
    }
    getImage(e);
  };

  return (
    <>
      <div
        id="myModal"
        className="fixed z-50 inset-0 flex items-center transition-all ease-in-out duration-300 justify-center backdrop-blur-sm bg-Opacityblack"
        ref={ProfileImgRef}
        onClick={handleOutsideClick}
      >
        <div className="w-1/2 max-lg:w-[90%] h-auto   py-5 px-10 flex rounded-lg bg-white dark:bg-darkBgMain shadow-xl flex-col">
          <h1 className="text-xl pb-4   font-bold text-gray-500 tracking-wide">
            Choose Profile Image.
          </h1>

          <form
            className="form flex flex-col w-full  px-2"
            onChange={handleImageChange}
          >
            <div className="flex items-center justify-center w-full">
              <label className="flex flex-col rounded-lg border-4 border-dashed w-full p-10 group text-center">
                <div className=" w-full text-center flex  items-center justify-center  flex-row">
                  <p className="pointer-none mb-5">
                    <span className="text-sm text-gray-600 dark:text-gray-200">
                      {selectedImageName
                        ? selectedImageName
                        : "Please select an jpg/jpeg file from your computer. Dont use .png images for now."}
                    </span>{" "}
                  </p>
                </div>
                {progress === 0 ? (
                  <></>
                ) : (
                  <div className="progress-bar">
                    <Progress type="circle" percent={progress} />
                  </div>
                )}
                <input
                  onChange={handleImageChange}
                  type="file"
                  className="hidden"
                />
              </label>
            </div>

            <Button
              className="button-submit my-2 text-white rounded-full p-2 px-6 font-bold bg-primaryMain dark:bg-secondary cursor-pointer"
              disabled={selectedImageName ? false : true}
              key="submit"
              type="primary"
              color="purple"
              onClick={uploadImage2}
            >
              Upload Profile Picture
            </Button>
          </form>
        </div>
      </div>
    </>
  );
}
