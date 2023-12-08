import { useRef, useEffect, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { reviewEmojis } from "../constants";
export default function FeedbackModal({ FeedbackMenu }) {
  const host = "http://localhost:5001";
  const modalRef = useRef(null);
  const [feedbackData, setFeedbackData] = useState({
    feedbackType: "",
    feedbackText: "",
    rating: 1,
  });
  const handleOutsideClick = (event) => {
    if (modalRef.current === event.target) {
      FeedbackMenu();
    }
  };

  const handleInputChange = (field, value) => {
    setFeedbackData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  const handleFeedbackSubmit = async () => {
    try {
      const obj = JSON.parse(localStorage.getItem("UserData"));

      const response = await fetch(
        `${host}/api/feedback/submitFeedback`,

        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "auth-token": obj.authtoken,
          },
          body: JSON.stringify({
            userID: obj.userDetailId,
            type: feedbackData.feedbackType,
            description: feedbackData.feedbackText,
            rating: feedbackData.rating,
          }),
        }
      );
      const result = await response.json();
      console.log("Server response:", result);
      if (result.success) {
        //("Thank You for your Feedback!!");

        setFeedbackData({
          feedbackType: "",
          feedbackText: "",
          rating: 1,
        });

        FeedbackMenu();
      }
    } catch (error) {
      console.error("Error submitting feedback:", error);
    }
  };

  return (
    <>
      <div
        id="myModal"
        className="fixed z-[99] inset-0 flex items-center transition-all ease-in-out duration-300 justify-center backdrop-blur-sm bg-Opacityblack"
        ref={modalRef}
        onClick={handleOutsideClick}
      >
        <div className="w-1/2 max-lg:w-[90%] flex rounded-lg h-auto bg-white dark:bg-darkBgMain shadow-xl">
          <form className="p-4 w-full">
            <h2 className="text-2xl font-bold mb-4 text-center dark:text-white">
              Feedback Form
            </h2>

            <div className="mb-4">
              <label
                htmlFor="feedbackType"
                className="block text-sm font-semibold text-gray-600 dark:text-white"
              >
                Feedback Type
              </label>
              <select
                id="feedbackType"
                className="w-full border border-gray-300 bg-transparent dark:text-darkTextPrimary rounded-md p-2 mb-2 focus:outline-none dark:focus:border-secondary focus:border-primaryMain dark:bg-darkBgMain"
                value={feedbackData.feedbackType}
                onChange={(e) =>
                  handleInputChange("feedbackType", e.target.value)
                }
              >
                <option value="" disabled>
                  Select feedback type
                </option>
                <option value="complaint">Complaint</option>
                <option value="review">Review</option>
                <option value="bug">Report a Bug</option>
              </select>
            </div>

            {feedbackData.feedbackType === "review" && (
              <div className="mb-4">
                <label
                  htmlFor="rating"
                  className="block text-sm font-semibold text-gray-600 dark:text-white"
                >
                  Rating
                </label>
                <div className="flex items-center space-x-2">
                  {reviewEmojis.map((emoji, index) => (
                    <button
                      key={index}
                      type="button"
                      onClick={() => handleInputChange("rating", index + 1)}
                      className={`w-8 h-8 bg-transparent focus:outline-none border-transparent`}
                    >
                      <span
                        className={`${
                          feedbackData.rating === index + 1
                            ? "fill-red-500"
                            : "fill-gray-300  dark:fill-gray-500"
                        }`}
                        dangerouslySetInnerHTML={{ __html: emoji.svg }}
                      />
                    </button>
                  ))}
                </div>
              </div>
            )}
            <div className="mb-4">
              <label
                htmlFor="feedbackText"
                className="block text-sm font-semibold text-gray-600 dark:text-white "
              >
                Feedback Details
              </label>
              <textarea
                id="feedbackText"
                className="w-full border border-gray-300 bg-transparent dark:text-darkTextPrimary rounded-md p-2 mb-2 focus:outline-none dark:focus:border-secondary focus:border-primaryMain"
                value={feedbackData.feedbackText}
                onChange={(e) =>
                  handleInputChange("feedbackText", e.target.value)
                }
                rows="4"
              ></textarea>
            </div>

            <button
              type="button"
              className="bg-primaryMain text-white px-4 py-2 rounded-md hover:bg-blue-600"
              onClick={handleFeedbackSubmit}
            >
              Submit Feedback
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
