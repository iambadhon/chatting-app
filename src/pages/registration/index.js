import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { RiEyeCloseFill, RiEyeFill } from "react-icons/ri";
import { useState } from "react";
import { ThreeDots } from "react-loader-spinner";
import { ToastContainer, toast } from "react-toastify";
import {
  getAuth,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  updateProfile,
} from "firebase/auth";
import { getDatabase, ref, set } from "firebase/database";

const Registration = () => {
  //Authentication
  const auth = getAuth();
  //Authentication error
  let [firebaseerr, setFirebaseErr] = useState("");
  //Authentication success
  // let [regsuccess, setRegSuccess] = useState("");

  //write data
  const db = getDatabase();
  //react loading
  let [loading, setLoading] = useState(false);
  //redirection
  let navigate = useNavigate();
  // validation
  let [email, setEmail] = useState("");
  let [fullname, setFullname] = useState("");
  let [password, setPassword] = useState("");
  // validation error
  let [emailerr, setEmailErr] = useState("");
  let [fullnameerr, setFullnameErr] = useState("");
  let [passworderr, setPasswordErr] = useState("");
  //password error
  let [passAZ, setPassAZ] = useState(false);
  let [passaz, setPassaz] = useState(false);
  let [pass09, setPass09] = useState(false);
  let [passSy, setPassSy] = useState(false);
  let [pass6, setPass6] = useState(false);
  //password show
  let [passwordshow, setPasswordShow] = useState(false);
  // all password is correct
  let [passCorrect, setPassCorrect] = useState(false);

  //handle email
  let handleEmail = (e) => {
    setEmail(e.target.value);
    setEmailErr("");
    setFirebaseErr("");
  };

  //handle fullname
  let handleFullname = (e) => {
    setFullname(e.target.value);
    setFullnameErr("");
  };

  //handle password
  let handlePassword = (e) => {
    let count = 0;
    // A-Z validation
    if (/^(?=.*?[A-Z])/.test(e.target.value)) {
      setPassAZ(true);
      count++;
    } else {
      setPassAZ(false);
    }
    //a-z validation
    if (/^(?=.*?[a-z])/.test(e.target.value)) {
      setPassaz(true);
      count++;
    } else {
      setPassaz(false);
    }
    // 0-9 validation
    if (/^(?=.*?[0-9])/.test(e.target.value)) {
      setPass09(true);
      count++;
    } else {
      setPass09(false);
    }
    // symbol validation
    if (/^(?=.*?[#?!@$%^&*-])/.test(e.target.value)) {
      setPassSy(true);
      count++;
    } else {
      setPassSy(false);
    }
    //  6 charecter validation
    if (/^.{6,}/.test(e.target.value)) {
      setPass6(true);
      count++;
    } else {
      setPass6(false);
    }
    //correct password
    if (count === 5) {
      setPassCorrect(true);
    } else {
      setPassCorrect(false);
    }

    setPassword(e.target.value);
    setPasswordErr("");
  };

  //handle submit
  let handleSubmit = () => {
    if (!email) {
      setEmailErr("Email is required");
    } else {
      if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
        setEmailErr("Valid email is required");
      }
    }

    if (!fullname) {
      setFullnameErr("Full name is required");
    } else {
      if (fullname.length < 3) {
        setFullnameErr("Full name must be greater than 3");
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
      } else if (!/^(?=.*?[#!@$%^&*-])/.test(password)) {
        setPasswordErr("Password must contain 1 symbol.");
      } else if (!/^(?=.{6,})/.test(password)) {
        setPasswordErr("Password have at lest 6 character.");
      }
      if (
        email &&
        fullname &&
        password &&
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email) &&
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#!@$%^&*-])(?=.{6,})/.test(
          password
        )
      ) {
        setLoading(true);
        createUserWithEmailAndPassword(auth, email, password)
          .then((user) => {
            updateProfile(auth.currentUser, {
              displayName: fullname,
              photoURL: "images/profile.png",
            })
              .then(() => {
                sendEmailVerification(auth.currentUser)
                  .then(() => {
                    toast(
                      "Registration Successfull. Please varify your email address"
                    );
                    // setRegSuccess(
                    //   "Registration Successfull. Please varify your email address"
                    // );
                  })
                  .then(() => {
                    set(ref(db, "users/" + user.user.uid), {
                      name: user.user.displayName,
                      email: user.user.email,
                      photoURL: user.user.photoURL,
                    })
                      .then(() => {
                        setTimeout(() => {
                          navigate("/login");
                        }, 4000);
                      })
                      .catch((error) => {
                        console.log(error);
                      });
                  });
              })
              .catch((error) => {
                console.log(error);
              });
          })
          .catch((error) => {
            setLoading(false);
            const errorCode = error.code;
            if (errorCode.includes("auth/email-already-in-use")) {
              setFirebaseErr("Sorry! This Email has already been registered.");
            }
          });
      }
    }
  };
  //password show
  let handlePasswordShow = () => {
    setPasswordShow(!passwordshow);
  };

  return (
    <section>
      <ToastContainer
        position="top-center"
        closeOnClick={false}
        theme="colored"
        className={`!px-3 !mt-3`}
      />
      <div className="grid grid-cols-1 sml:grid-cols-2 sml:gap-x-10 md:!gap-x-12 lg:!gap-x-16 pl-4 pr-4 sml:pr-0">
        <div className="flex flex-col items-center sml:items-end justify-center">
          <div className="lg:w-500px mt-10 sml:mt-3.5 md:!mt-8 lg:!mt-0">
            <h1 className="font-nunito text-4xl sml:text-3xl md:!text-4xl font-bold mb-3 sml:mb-2 md:!mb-3 text-durkblue text-center sml:text-left">
              Get started with easily register
            </h1>
            <p className="font-nunito text-xl sml:text-lg md:!text-xl font-normal text-gray text-center sml:text-left">
              Free register and you can enjoy it
            </p>
            {/* {regsuccess && (
              <p className="bg-green-500 text-white mt-2 px-3 py-1.5 text-lg inline-block font-semibold font-nunito rounded-md">
                {regsuccess}
              </p>
            )} */}
            <form action="#" className="lg:w-[370px] mt-10 sml:mt-6 md:!mt-9">
              <div className="relative">
                <input
                  className={`w-full text-durkblue border-2 border-solid rounded-lg py-6 sml:py-3.5 md:!py-6 px-8 sml:px-5 md:!px-8 font-nunito text-xl focus:border-primary outline-none placeholder-transparent peer ${
                    emailerr ? "border-red-500" : "border-gray/25"
                  }  ${firebaseerr ? "border-red-500" : "border-gray/25"}`}
                  type="email"
                  placeholder="email"
                  onChange={handleEmail}
                />
                <p className="absolute -top-2.5 left-8 bg-white px-5 text-sm font-semibold font-nunito text-[#11175db3] pointer-events-none peer-placeholder-shown:top-[26px] sml:peer-placeholder-shown:top-[17px] md:peer-placeholder-shown:!top-[26px] peer-placeholder-shown:left-4 sml:peer-placeholder-shown:left-2 md:peer-placeholder-shown:!left-4 peer-placeholder-shown:bg-transparent peer-placeholder-shown:text-xl sm:peer-focus:-top-2.5 sml:peer-focus:!-top-2.5 peer-focus:left-8 sml:peer-focus:!left-8 peer-focus:bg-white peer-focus:text-sm peer-focus:text-primary duration-300">
                  Email Addres
                </p>
                {emailerr && (
                  <p className="text-red-500 mt-1 ml-2 text-sm font-semibold font-nunito">
                    {emailerr}
                  </p>
                )}
                {firebaseerr && (
                  <p className="text-red-500 mt-1 ml-2 text-sm font-semibold font-nunito">
                    {firebaseerr}
                  </p>
                )}
              </div>
              <div className="relative mt-8 sml:mt-5 md:!mt-8">
                <input
                  className={`w-full text-durkblue border-2 border-solid rounded-lg py-6 sml:py-3.5 md:!py-6 px-8 sml:px-5 md:!px-8 font-nunito text-xl focus:border-primary outline-none placeholder-transparent peer ${
                    fullnameerr ? "border-red-500" : "border-gray/25"
                  }`}
                  type="text"
                  placeholder="name"
                  onChange={handleFullname}
                />
                <p className="absolute -top-2.5 left-8 bg-white px-5 text-sm font-semibold font-nunito text-[#11175db3] pointer-events-none peer-placeholder-shown:top-[26px] sml:peer-placeholder-shown:top-[17px] md:peer-placeholder-shown:!top-[26px] peer-placeholder-shown:left-4 sml:peer-placeholder-shown:left-2 md:peer-placeholder-shown:!left-4 peer-placeholder-shown:bg-transparent peer-placeholder-shown:text-xl sm:peer-focus:-top-2.5 sml:peer-focus:!-top-2.5 peer-focus:left-8 sml:peer-focus:!left-8 peer-focus:bg-white peer-focus:text-sm peer-focus:text-primary duration-300">
                  Full name
                </p>
                {fullnameerr && (
                  <p className="text-red-500 ml-2 mt-1 text-sm font-semibold font-nunito">
                    {fullnameerr}
                  </p>
                )}
              </div>
              <div className="relative mt-8 sml:mt-5 md:!mt-8">
                <input
                  className={`w-full text-durkblue border-2 border-solid rounded-lg py-6 sml:py-3.5 md:!py-6 pl-8 sml:pl-5 md:!pl-8 pr-11 font-nunito text-xl focus:border-primary outline-none placeholder-transparent peer ${
                    passworderr ? "border-red-500" : "border-gray/25"
                  }`}
                  type={passwordshow ? "text" : "password"}
                  placeholder="password"
                  onChange={handlePassword}
                />
                <p className="absolute -top-2.5 left-8 bg-white px-5 text-sm font-semibold font-nunito text-[#11175db3] pointer-events-none peer-placeholder-shown:top-[26px] sml:peer-placeholder-shown:top-[17px] md:peer-placeholder-shown:!top-[26px] peer-placeholder-shown:left-4 sml:peer-placeholder-shown:left-2 md:peer-placeholder-shown:!left-4 peer-placeholder-shown:bg-transparent peer-placeholder-shown:text-xl sm:peer-focus:-top-2.5 sml:peer-focus:!-top-2.5 peer-focus:left-8 sml:peer-focus:!left-8 peer-focus:bg-white peer-focus:text-sm peer-focus:text-primary duration-300">
                  Password
                </p>
                {passworderr && (
                  <p className="text-red-500 ml-2 mt-1 text-sm font-semibold font-nunito">
                    {passworderr}
                  </p>
                )}
                {passCorrect ? (
                  <p className="text-primary text-sm font-bold font-nunito ml-2 mt-1">
                    Correct & Strong Password
                  </p>
                ) : (
                  <p className="text-sm font-bold font-nunito mt-1 ml-2">
                    <span className={passAZ ? "text-primary" : "text-red-600"}>
                      [A-Z]
                    </span>
                    ,
                    <span className={passaz ? "text-primary" : "text-red-600"}>
                      [a-z]
                    </span>
                    ,
                    <span className={pass09 ? "text-primary" : "text-red-600"}>
                      [0-9]
                    </span>
                    ,
                    <span className={passSy ? "text-primary" : "text-red-600"}>
                      [symbol]
                    </span>
                    ,
                    <span className={pass6 ? "text-primary" : "text-red-600"}>
                      [6 character]
                    </span>
                  </p>
                )}

                {passwordshow ? (
                  <RiEyeFill
                    onClick={handlePasswordShow}
                    className="absolute top-7 sml:top-5 md:!top-7 right-4 text-2xl text-gray cursor-pointer"
                  />
                ) : (
                  <RiEyeCloseFill
                    onClick={handlePasswordShow}
                    className="absolute top-7 sml:top-5 md:!top-7 right-4 text-2xl text-gray cursor-pointer"
                  />
                )}
              </div>
              <div className="mt-12 sml:mt-5 md:!mt-10">
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
                    className="my_btn w-full !text-xl !rounded-full !py-5 sml:!py-3 md:sml:!py-5 !font-nunito after:hover:!bg-lightwhite after:!w-full after:!h-0 after:hover:!top-[unset] after:hover:!bottom-0 after:hover:!h-full"
                    type="button"
                    onClick={handleSubmit}
                  >
                    Sign Up
                  </button>
                )}
              </div>
            </form>
            <div className="lg:w-[370px] flex gap-2 justify-center mt-8 sml:mt-4 md:!mt-6 mb-3">
              <p className="font-nunito text-sm font-medium text-durkblue">
                Already have an account ?
              </p>
              <Link
                to="/login"
                className="font-nunito text-sm font-bold text-red-500"
              >
                Sign In
              </Link>
            </div>
          </div>
        </div>

        <div className="hidden sml:block">
          <picture>
            <img
              className="h-auto md:h-screen w-full object-cover"
              src="images/sign-up.png"
              alt="SignUp"
              loading="lazy"
            />
          </picture>
        </div>
      </div>
    </section>
  );
};

export default Registration;
