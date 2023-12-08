import { useState, useContext, useEffect } from "react";
import AuthContext from "../../../Helper/Context/AuthContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoadingBar from "react-top-loading-bar";

export default function Register({
  setSign,
  ModalStatus,
  setAuthStatus,
  RelevantModalStatus,
}) {
  const context = useContext(AuthContext);
  const { adduserdetail, getCurrentUser } = context;

  const [Registercreds, setRegistercreds] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    name: "",
  });

  const [loadingBarProgress, setLoadingBarProgress] = useState(0);

  const host = "https://bloglinkbackend-it3i.onrender.com";

  const RegisterOnchange = (e) => {
    setRegistercreds({
      ...Registercreds,
      [e.target.name]: e.target.value,
    });
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const Register = async (e) => {
    e.preventDefault();
    const { name, password, confirmPassword, email } = Registercreds;

    // Validate email
    if (!validateEmail(email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    // Validate name
    if (name.trim().length < 3) {
      toast.error("Name must be at least 3 characters long");
      return;
    }

    // Validate password length
    if (password.length < 6) {
      toast.error("Password must be at least 6 characters long");
      return;
    }

    // Validate password matching
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    setLoadingBarProgress(40);
    const parts = email.split("@");
    const username = parts[0];

    try {
      const response = await fetch(`${host}/api/auth/createuser`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, name, email, password }),
      });

      setLoadingBarProgress(50);

      const json = await response.json();

      if (json.success) {
        localStorage.setItem("UserData", JSON.stringify(json));
        setLoadingBarProgress(80);

        setAuthStatus(true);
        toast.success("Registered Successfully");

        adduserdetail({
          username: json.username,
          description: "",
          work: "",
          education: "",
          location: "",
          profileImg: "",
          bannerImg: "",
          socialLinks: {
            github: "",
            linkedin: "",
            instagram: "",
            twitter: "",
          },
        });

        getCurrentUser(JSON.parse(localStorage.getItem("UserData")).UserID);
        RelevantModalStatus();
        ModalStatus();
      } else {
        toast.error("Server error! Please try again!");
      }
    } catch (error) {
      console.error("Registration error:", error);
      toast.error("An error occurred during registration");
    } finally {
      setLoadingBarProgress(100);

      setTimeout(() => {
        setLoadingBarProgress(0);
      }, 500);
    }
  };

  return (
    <>
      <div className="container flex flex-col justify-center items-center max-sm:p-5 p-10 max-lg:py-20 max-lg:px-20 w-[50%] max-lg:w-[90%]">
        <p className="font-bold text-black dark:text-darkTextMain">Register</p>

        <p className="my-2 dark:text-darkTextMain  text-center w-full mb-5"></p>
        <form className="form flex flex-col  w-full">
          <input
            type="text"
            placeholder="Name"
            value={Registercreds.name}
            onChange={RegisterOnchange}
            name="name"
            className="border border-gray-300 bg-transparent dark:text-darkTextPrimary rounded-md p-2 mb-2 focus:outline-none dark:focus:border-secondary focus:border-primaryMain"
          />
          <input
            type="text"
            placeholder="Email"
            value={Registercreds.email}
            onChange={RegisterOnchange}
            name="email"
            required
            className="border border-gray-300 bg-transparent dark:text-darkTextPrimary rounded-md p-2 mb-2 focus:outline-none dark:focus:border-secondary focus:border-primaryMain"
          />
          <input
            type="password"
            value={Registercreds.password}
            onChange={RegisterOnchange}
            name="password"
            placeholder="Password"
            required
            className="border border-gray-300 bg-transparent dark:text-darkTextPrimary rounded-md p-2 mb-2 focus:outline-none dark:focus:border-secondary focus:border-primaryMain"
          />
          <input
            type="password"
            value={Registercreds.confirmPassword}
            onChange={RegisterOnchange}
            name="confirmPassword"
            placeholder="Confirm Password"
            required
            className="border border-gray-300 bg-transparent dark:text-darkTextPrimary rounded-md p-2 mb-2 focus:outline-none dark:focus:border-secondary focus:border-primaryMain"
          />
          <input
            onClick={Register}
            id="next"
            type="submit"
            value="Register"
            className="button-submit  my-2 text-white rounded-full p-2 font-bold bg-primaryMain dark:bg-secondary cursor-pointer"
          />
        </form>
        <p
          id="signup"
          className="text-gray-500 dark:text-darkTextPrimary text-sm mt-2"
        >
          Have an account ?{" "}
          <a
            href="#"
            className="text-primaryMain dark:text-secondary font-semibold"
            onClick={() => setSign(true)}
          >
            LogIn
          </a>
        </p>
      </div>

      <LoadingBar
        color="#2196F3"
        height={5}
        progress={loadingBarProgress}
        onLoaderFinished={() => setLoadingBarProgress(0)}
      />
    </>
  );
}
