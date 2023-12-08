import { useRef, useState, useContext, useEffect } from "react";
import { auth } from "../../../Assets/images";
import "react-toastify/dist/ReactToastify.css";
import AuthContext from "../../../Helper/Context/AuthContext";
import Login from "./Login";
import Register from "./Register";
import { GoogleSignInAPI } from "../../../api/AuthAPI";
import { toast } from "react-toastify";
import RelevantModal from "./RelevantModal";
export default function Authentication(props) {
  const host = "https://bloglinkbackend-it3i.onrender.com";
  const context = useContext(AuthContext);
  const {
    setAuthStatus,
    UserExistStatus,
    userexist,
    loggedin,
    loggedinStatus,
    adduserdetail,
    getCurrentUser,
  } = context;
  const [GooogleCreds, setGooogleCreds] = useState({});

  const { ModalStatus, RelevantModalStatus } = props;
  const modalRef = useRef(null);
  const [sign, setSign] = useState(true);

  const handleOutsideClick = (event) => {
    if (modalRef.current === event.target) {
      ModalStatus();
    }
  };

  useEffect(() => {
    if (loggedinStatus) {
      if (loggedin.success) {
        localStorage.setItem("UserData", JSON.stringify(loggedin));
        ModalStatus();
        setAuthStatus(true);
        toast.success("Google Loggedin Succesfully");
        window.location.reload();
      } else {
        toast.error("Invalid Credentials");
      }
    }
  }, [loggedinStatus]);

  const goolesignin = async () => {
    let res = await GoogleSignInAPI();
    if (res) {
      const parts = res.user.email.split("@");
      const username = parts[0];
      const input = {
        name: res.user.displayName,
        email: res.user.email,
        username: username,
      };
      setGooogleCreds(input);
      userexist(input.email);
    }
  };

  useEffect(() => {
    if (UserExistStatus) {
      googlelogin(GooogleCreds);
    } else if (UserExistStatus == false) {
      googlesignup(GooogleCreds);
    }
  }, [UserExistStatus]);

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
    if (json.success) {
      localStorage.setItem("UserData", JSON.stringify(json));
      setAuthStatus(true);
      toast.success("Google Registration Succesfull");
      RelevantModalStatus();
      adduserdetail({
        username: GoogleCreds.username,
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
      ModalStatus();
    } else {
      toast.error("Can't Register");
    }
  };

  const googlelogin = async (GoogleCreds) => {
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
    if (json.success) {
      localStorage.setItem("UserData", JSON.stringify(json));
      ModalStatus();
      setAuthStatus(true);
      toast.success("Account Loggedin Succesfully");
    } else {
      toast.error("Can't Register");
    }
  };
  return (
    <>
      <div
        id="myModal"
        className="fixed z-50 inset-0 flex items-center transition-all ease-in-out duration-300 justify-center backdrop-blur-sm bg-Opacityblack"
        ref={modalRef}
        onClick={handleOutsideClick}
      >
        <div className="w-1/2 max-lg:w-[90%] flex rounded-lg h-auto bg-white dark:bg-darkBgPrimary shadow-xl">
          <div className="flex items-center w-[50%] h-[auto]  bg-[#d1e3ff] dark:bg-[#ffd4bb] max-lg:hidden">
            <img src={auth} alt="girl-reading-a-book" />
          </div>

          {sign ? (
            <Login
              ModalStatus={ModalStatus}
              setSign={setSign}
              goolesignin={goolesignin}
            />
          ) : (
            <Register
              ModalStatus={ModalStatus}
              setAuthStatus={setAuthStatus}
              setSign={setSign}
              RelevantModalStatus={RelevantModalStatus}
              goolesignin={goolesignin}
            />
          )}
        </div>
      </div>
    </>
  );
}
