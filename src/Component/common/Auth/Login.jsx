import { useState, useContext, useEffect } from "react";
import AuthContext from "../../../Helper/Context/AuthContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoadingBar from "react-top-loading-bar";

export default function Login({ setSign, ModalStatus, goolesignin }) {
  const host = "https://bloglinkbackend-it3i.onrender.com";

  const [Logincreds, setLogincreds] = useState({ email: "", password: "" });
  const context = useContext(AuthContext);
  const { setAuthStatus } = context;

  const [loadingBarProgress, setLoadingBarProgress] = useState(0);

  const LoginOnchange = (e) => {
    setLogincreds({
      ...Logincreds,
      [e.target.name]: e.target.value,
    });
  };
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  const login = async (e) => {
    e.preventDefault();

    // Validate name
    if (Logincreds.password == "") {
      toast.error("Password cannot be empty");
      return;
    }

    // Validate email
    if (!validateEmail(Logincreds.email)) {
      toast.error("Please enter a valid email address");
      return;
    }
    setLoadingBarProgress(40);

    try {
      const response = await fetch(`${host}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          email: Logincreds.email,
          password: Logincreds.password,
        }),
      });
      setLoadingBarProgress(50);

      const json = await response.json();
      if (json.success) {
        localStorage.setItem("UserData", JSON.stringify(json));
        setLoadingBarProgress(80);

        ModalStatus();
        setAuthStatus(true);
        window.location.reload();

        toast.success("Account Logged in Successfully");
      } else {
        toast.error("Invalid Credentials");
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.error("An error occurred during login");
    } finally {
      setLoadingBarProgress(100);

      setTimeout(() => {
        setLoadingBarProgress(0);
      }, 500);
    }
  };
  return (
    <>
      <div className="container flex flex-col justify-center items-center max-sm:p-5 p-10 max-lg:py-20 max-lg:px-20 w-[50%] max-lg:w-[90%] ">
        <p className="font-bold  text-black dark:text-darkTextMain">LogIn</p>

        {/* <button
          className="button flex items-center border-2  border-gray-300 rounded-full dark:text-darkTextMain p-4 my-4  w-full"
          onClick={() => goolesignin()}
        >
          <img
            src="https://img.icons8.com/color/48/undefined/google-logo.png"
            alt="google logo"
            className="img pr-2 h-[30px]"
          />
          <p className="font-bold">Sign in with Google</p>
        </button> */}

        <p className="my-2 dark:text-darkTextMain  text-center w-full mb-5"></p>
        <form className="form flex flex-col  w-full">
          <input
            value={Logincreds.email}
            onChange={LoginOnchange}
            name="email"
            type="text"
            required
            placeholder="Email"
            className="border border-gray-300 bg-transparent dark:text-darkTextPrimary rounded-md p-2 mb-2 focus:outline-none dark:focus:border-secondary focus:border-primaryMain"
          />
          <input
            type="password"
            value={Logincreds.password}
            onChange={LoginOnchange}
            name="password"
            required
            placeholder="Password"
            className="border border-gray-300 bg-transparent dark:text-darkTextPrimary  rounded-md p-2 mb-2 focus:outline-none dark:focus:border-secondary focus:border-primaryMain"
          />
          <input
            id="next"
            type="submit"
            value="Sign in"
            onClick={login}
            className="button-submit  my-2 text-white rounded-full p-2 font-bold bg-primaryMain dark:bg-secondary cursor-pointer"
          />
          {/* <input
            id="forgot"
            type="submit"
            value="Forgot Password ?"
            className="button-submit bg-white border border-gray-300 rounded-full p-2 my-5 hover:bg-gray-200 cursor-pointer"
          /> */}
        </form>
        <p
          id="signup"
          className="text-gray-500 dark:text-darkTextPrimary text-sm mt-2"
        >
          Don't have an account ?{" "}
          <a
            href="#"
            className="text-primaryMain dark:text-secondary font-semibold"
            onClick={() => setSign(false)}
          >
            Register
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
