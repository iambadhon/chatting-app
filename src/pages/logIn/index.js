import React from "react";
import { Link } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { RiEyeCloseFill, RiEyeFill } from "react-icons/ri";
import { useState } from "react";

const LogIn = () => {
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let [emailerr, setEmailErr] = useState("");
  let [passworderr, setPasswordErr] = useState("");
  let [passwordshow, setPasswordShow] = useState(false);

  let handleEmail = (e) => {
    setEmail(e.target.value);
    setEmailErr("");
  };

  let handlePassword = (e) => {
    setPassword(e.target.value);
    setPasswordErr("");
  };

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
    }
  };

  let handlePasswordShow = () => {
    setPasswordShow(!passwordshow);
  };
  return (
    <section>
      <div className="grid grid-cols-1 sml:grid-cols-2 sml:gap-x-10 md:!gap-x-12 lg:!gap-x-36 pl-2.5 pr-2.5 sml:pr-0">
        <div className="flex flex-col items-center sml:items-end justify-center">
          <div className="lg:w-500px mt-10 sml:mt-3.5 md:!mt-8 lg:!mt-0">
            <h1 className="font-nunito text-4xl sml:text-3xl md:!text-4xl font-bold text-durkblue text-center sml:text-left">
              Login to your account!
            </h1>
            <div className="mt-10 sml:mt-6 md:!mt-10 text-center sml:text-left">
              <a
                href="#"
                className="relative py-5 sml:py-4 md:!py-5 pl-12 pr-7 border-2 border-solid border-gray/25 inline-block rounded-lg font-nunito text-sm text-durkblue font-semibold hover:shadow-md hover:border-primary duration-300"
              >
                <FcGoogle className="absolute top-5 sml:top-4 md:!top-5 left-6 text-xl" />
                Login with Google
              </a>
            </div>

            <form action="#" className="lg:w-[370px] mt-12">
              <div className="relative">
                <input
                  className={`w-full text-durkblue border-b-2 border-solid py-3 font-nunito text-xl focus:border-b-2 focus:border-solid focus:border-primary outline-none placeholder-transparent peer ${
                    emailerr ? "border-red-500" : "border-gray/25"
                  }`}
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
              </div>
              <div className="relative mt-14 sml:mt-10 md:!mt-14">
                <input
                  className={`w-full text-durkblue border-b-2 border-solid py-3 pr-11 font-nunito text-xl focus:border-b-2 focus:border-solid focus:border-primary outline-none placeholder-transparent peer ${
                    passworderr ? "border-red-500" : "border-gray/25"
                  }`}
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
                <button
                  className="my_btn w-full !text-xl !rounded-xl py-5 sml:py-3 md:!py-5 px-8 !font-nunito after:hover:!bg-lightwhite after:!w-full after:!h-0 after:!top-[unset] after:bottom-0 after:hover:!bottom-[unset] after:hover:!top-0 after:hover:!h-full"
                  type="button"
                  onClick={handleLogin}
                >
                  Login to Continue
                </button>
              </div>
            </form>
            <div className="lg:w-[370px] mt-8 sml:mt-4 md:!mt-8 mb-4">
              <p className="font-nunito text-sm font-bold text-red-500 mb-2 sml:mb-1 md:!mb-2 cursor-pointer">
                Forget Password ?
              </p>
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
    </section>
  );
};

export default LogIn;
