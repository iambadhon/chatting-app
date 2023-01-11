import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { RiEyeCloseFill, RiEyeFill } from "react-icons/ri";
import { useState } from "react";
import { ThreeDots } from "react-loader-spinner";
import { ToastContainer, toast } from "react-toastify";
import {
  getAuth,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  sendPasswordResetEmail,
} from "firebase/auth";

const LogIn = () => {
  //google login
  const provider = new GoogleAuthProvider();
  //Authentication
  const auth = getAuth();
  //Authentication error
  let [firebaseemailerr, setFirebaseEmailErr] = useState("");
  let [firebasepasserr, setFirebasePassErr] = useState("");
  //Authentication success
  // let [loginsuccess, setLoginSuccess] = useState("");

  //react loading
  let [loading, setLoading] = useState(false);
  //redirection
  let navigate = useNavigate();
  // validation
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  // validation error
  let [emailerr, setEmailErr] = useState("");
  let [passworderr, setPasswordErr] = useState("");
  //password show
  let [passwordshow, setPasswordShow] = useState(false);
  //forgot password modlal
  let [forgotpassshow, setForgotPassShow] = useState(false);
  //forgot email
  let [forgotemail, setForgotEmail] = useState("");
  //forgot email error
  let [forgotemailerr, setForgotEmailErr] = useState("");
  //forgot email error
  let [firebaseforgoterr, setFirebaseForgotErr] = useState("");
  //forgot react loading
  let [forgotloading, setForgotLoading] = useState("");

  //handle email
  let handleEmail = (e) => {
    setEmail(e.target.value);
    setEmailErr("");
    setFirebaseEmailErr("");
  };

  //handle password
  let handlePassword = (e) => {
    setPassword(e.target.value);
    setPasswordErr("");
    setFirebasePassErr("");
  };

  //handle login
  let handleLogin = () => {
    if (!email) {
      setEmailErr("Email is required");
    } else {
      if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
        setEmailErr("Valid email is required");
      }
    }

    if (!password) {
      setPasswordErr("Password is required");
    } else {
      if (!/^(?=.*?[A-Z])/.test(password)) {
        setPasswordErr("Password must contain 1 capital letter.");
      } else if (!/^(?=.*?[a-z])/.test(password)) {
        setPasswordErr("Password must contain 1 small letter.");
      } else if (!/^(?=.*?[0-9])/.test(password)) {
        setPasswordErr("Password must contain 1 number.");
      } else if (!/^(?=.*?[#?!@$%^&*-])/.test(password)) {
        setPasswordErr("Password must contain 1 symbol.");
      } else if (!/^.{6,}/.test(password)) {
        setPasswordErr("Password have at lest 6 character.");
      }
      if (
        email &&
        password &&
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email) &&
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#!@$%^&*-])(?=.{6,})/.test(
          password
        )
      ) {
        setLoading(true);
        signInWithEmailAndPassword(auth, email, password)
          .then((user) => {
            toast("Login Successfull. Please wait a secend");
            // setLoginSuccess("Login Successfull. Please wait a secend");
            setTimeout(() => {
              navigate("/");
            }, 4000);
          })
          .catch((error) => {
            setLoading(false);
            const errorCode = error.code;
            if (errorCode.includes("auth/user-not-found")) {
              setFirebaseEmailErr("Sorry! Email not match.");
            }
            if (errorCode.includes("auth/wrong-password")) {
              setFirebasePassErr("Sorry! Wrong Password.");
            }
          });
      }
    }
  };

  //password show
  let handlePasswordShow = () => {
    setPasswordShow(!passwordshow);
  };

  //google login
  let handleGoogleLogin = () => {
    signInWithPopup(auth, provider).then(() => {
      navigate("/");
    });
  };

  //handle Forgot Email
  let handleForgotEmail = (e) => {
    setForgotEmail(e.target.value);
    setForgotEmailErr("");
    setFirebaseForgotErr("");
  };

  //handle Forgot Password
  let handleForgotPassword = () => {
    if (!forgotemail) {
      setForgotEmailErr("Email is required");
    } else {
      if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(forgotemail)) {
        setForgotEmailErr("Valid email is required");
      }
      if (
        forgotemail &&
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(forgotemail)
      ) {
        setForgotLoading(true);
        sendPasswordResetEmail(auth, forgotemail)
          .then(() => {
            toast("Please Check Your Email");
            setTimeout(() => {
              setForgotLoading(false);
              setForgotPassShow(false);
            }, 4000);
          })
          .catch((error) => {
            setForgotLoading(false);
            const errorCode = error.code;
            if (errorCode.includes("auth/user-not-found")) {
              setFirebaseForgotErr(
                "Sorry! User not found! Enter your email correctly."
              );
            }
            if (errorCode.includes("auth/too-many-requests")) {
              setFirebaseForgotErr(
                "Sorry! Too many requests. Try again later."
              );
            }
          });
      }
    }
  };

  return (
    <section>
      <ToastContainer
        position="top-center"
        closeOnClick={false}
        theme="colored"
      />
      <div className="grid grid-cols-1 sml:grid-cols-2 sml:gap-x-10 md:!gap-x-12 lg:!gap-x-36 pl-2.5 pr-2.5 sml:pr-0">
        <div className="flex flex-col items-center sml:items-end justify-center">
          <div className="lg:w-500px mt-10 sml:mt-3.5 md:!mt-8 lg:!mt-0">
            <h1 className="font-nunito text-4xl sml:text-3xl md:!text-4xl font-bold text-durkblue text-center sml:text-left">
              Login to your account!
            </h1>
            <div className="mt-10 sml:mt-6 md:!mt-10 text-center sml:text-left">
              <button
                onClick={handleGoogleLogin}
                className="relative py-5 sml:py-4 md:!py-5 pl-12 pr-7 border-2 border-solid border-gray/25 inline-block rounded-lg font-nunito text-sm text-durkblue font-semibold hover:shadow-md hover:border-primary duration-300"
              >
                <FcGoogle className="absolute top-5 sml:top-4 md:!top-5 left-6 text-xl" />
                Login with Google
              </button>
            </div>
            {/* {loginsuccess && (
              <p className="bg-green-500 text-white mt-4 px-3 py-1.5 text-lg inline-block font-semibold font-nunito rounded-md">
                {loginsuccess}
              </p>
            )} */}

            <form action="#" className="lg:w-[370px] mt-12">
              <div className="relative">
                <input
                  className={`w-full text-durkblue border-b-2 border-solid py-3 font-nunito text-xl focus:border-b-2 focus:border-solid focus:border-primary outline-none placeholder-transparent peer ${
                    emailerr ? "border-red-500" : "border-gray/25"
                  } ${firebaseemailerr ? "border-red-500" : "border-gray/25"}`}
                  type="email"
                  placeholder="email"
                  onChange={handleEmail}
                />
                <p className="absolute -top-5 left-0 text-sm font-semibold font-nunito text-[#11175db3] pointer-events-none peer-placeholder-shown:top-3 peer-placeholder-shown:text-xl peer-focus:-top-5 peer-focus:text-sm peer-focus:text-primary duration-300">
                  Email Addres
                </p>
                {emailerr && (
                  <p className="text-red-500 mt-1 text-sm font-semibold font-nunito rounded-md">
                    {emailerr}
                  </p>
                )}
                {firebaseemailerr && (
                  <p className="text-red-500 mt-1 text-sm font-semibold font-nunito">
                    {firebaseemailerr}
                  </p>
                )}
              </div>
              <div className="relative mt-14 sml:mt-10 md:!mt-14">
                <input
                  className={`w-full text-durkblue border-b-2 border-solid py-3 pr-11 font-nunito text-xl focus:border-b-2 focus:border-solid focus:border-primary outline-none placeholder-transparent peer ${
                    passworderr ? "border-red-500" : "border-gray/25"
                  } ${firebasepasserr ? "border-red-500" : "border-gray/25"}`}
                  type={passwordshow ? "text" : "password"}
                  placeholder="password"
                  onChange={handlePassword}
                />
                <p className="absolute -top-5 left-0 text-sm font-semibold font-nunito text-[#11175db3] pointer-events-none peer-placeholder-shown:top-3 peer-placeholder-shown:text-xl peer-focus:-top-5 peer-focus:text-sm peer-focus:text-primary duration-300">
                  Password
                </p>
                {passworderr && (
                  <p className="text-red-500 mt-1 text-sm font-semibold font-nunito">
                    {passworderr}
                  </p>
                )}
                {firebasepasserr && (
                  <p className="text-red-500 mt-1 text-sm font-semibold font-nunito">
                    {firebasepasserr}
                  </p>
                )}
                {passwordshow ? (
                  <RiEyeFill
                    onClick={handlePasswordShow}
                    className="absolute top-[15px] right-1 text-2xl text-gray cursor-pointer"
                  />
                ) : (
                  <RiEyeCloseFill
                    onClick={handlePasswordShow}
                    className="absolute top-[15px] right-1 text-2xl text-gray cursor-pointer"
                  />
                )}
              </div>
              <div className="mt-12 sml:mt-10 md:!mt-12">
                {loading ? (
                  <div className="flex justify-center items-center sml:h-14 md:!h-full">
                    <ThreeDots
                      height="72"
                      width="150"
                      radius="9"
                      color="#5F35F5"
                      ariaLabel="three-dots-loading"
                      visible={true}
                    />
                  </div>
                ) : (
                  <button
                    className="my_btn w-full !text-xl !rounded-xl !py-5 sml:!py-3 md:sml:!py-5 !font-nunito after:hover:!bg-lightwhite after:!w-full after:!h-0 after:!top-[unset] after:bottom-0 after:hover:!bottom-[unset] after:hover:!top-0 after:hover:!h-full"
                    type="button"
                    onClick={handleLogin}
                  >
                    Login to Continue
                  </button>
                )}
              </div>
            </form>
            <div className="lg:w-[370px] mt-8 sml:mt-4 md:!mt-8 mb-4">
              <button
                onClick={() => setForgotPassShow(!forgotpassshow)}
                className="font-nunito text-sm inline-block font-bold text-red-500 mb-2.5 sml:mb-1.5 md:!mb-2.5 cursor-pointer"
              >
                Forgot Password ?
              </button>
              <div className="flex gap-2 justify-start">
                <p className="font-nunito text-sm font-medium text-durkblue">
                  Don’t have an account ?
                </p>
                <Link
                  to="/registration"
                  className="font-nunito text-sm font-bold text-red-500"
                >
                  Sign up
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="hidden sml:block">
          <picture>
            <img
              className="h-auto md:h-screen w-full object-cover"
              src="images/login.png"
              alt="SignUp"
              loading="lazy"
            />
          </picture>
        </div>
      </div>

      {/* forgot password modal */}
      {forgotpassshow && (
        <div className="fixed top-0 left-0 w-full h-screen bg-black/75 flex justify-center items-center z-10 px-4">
          <div className="p-6 md:p-10 bg-white rounded-lg">
            <h2 className="text-3xl md:text-5xl font-bold text-primary font-nunito">
              Forgot Password
            </h2>
            <div className="relative mt-7 md:mt-10">
              <input
                className={`w-full text-durkblue border-2 border-solid rounded-lg py-3.5 md:py-6 px-5 md:px-8 font-nunito text-xl focus:border-2 focus:border-solid focus:border-primary outline-none placeholder-transparent peer ${
                  forgotemailerr ? "border-red-500" : "border-gray/25"
                } ${firebaseforgoterr ? "border-red-500" : "border-gray/25"}`}
                type="email"
                placeholder="email"
                onChange={handleForgotEmail}
              />
              <p className="absolute -top-2.5 left-6 md:left-8 bg-white px-3 md:px-5 text-sm font-semibold font-nunito text-[#11175db3] pointer-events-none peer-placeholder-shown:top-[17px] md:peer-placeholder-shown:top-[26px] peer-placeholder-shown:left-2 md:peer-placeholder-shown:left-4 peer-placeholder-shown:bg-transparent peer-placeholder-shown:text-xl peer-focus:-top-2.5 md:peer-focus:-top-2.5 peer-focus:left-6 md:peer-focus:left-8 peer-focus:bg-white peer-focus:text-sm peer-focus:text-primary duration-300">
                Email Addres
              </p>
              {forgotemailerr && (
                <p className="text-red-500 mt-1 ml-2 text-sm font-semibold font-nunito rounded-md">
                  {forgotemailerr}
                </p>
              )}
              {firebaseforgoterr && (
                <p className="text-red-500 mt-1 ml-2 text-sm font-semibold font-nunito rounded-md">
                  {firebaseforgoterr}
                </p>
              )}
            </div>
            <div className="mt-6 md:mt-8 flex items-center gap-x-5">
              {forgotloading ? (
                <div className="inline-block">
                  <ThreeDots
                    height="50"
                    width="100"
                    radius="9"
                    color="#5F35F5"
                    ariaLabel="three-dots-loading"
                    visible={true}
                  />
                </div>
              ) : (
                <button
                  className="my_btn !text-base md:!text-xl !rounded-md !p-3 md:!p-4 !font-nunito after:hover:!bg-lightwhite"
                  type="button"
                  onClick={handleForgotPassword}
                >
                  Change Password
                </button>
              )}

              <button
                className="my_btn !text-base md:!text-xl !rounded-md !p-3 md:!p-4 !font-nunito after:hover:!bg-lightwhite !bg-red-500 !border-red-500"
                type="button"
                onClick={() => setForgotPassShow(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default LogIn;
