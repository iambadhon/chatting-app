import React from "react";
import { GoHome } from "react-icons/go";
import { BiMessageDetail } from "react-icons/bi";
import { IoMdNotificationsOutline } from "react-icons/io";
import { TbSettings } from "react-icons/tb";
import { MdLogout } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";

const Sidebar = ({ active }) => {
  const auth = getAuth();

  //redirection
  let navigate = useNavigate();

  //handle sign out
  let handleSignOut = () => {
    signOut(auth).then(() => {
      navigate("/login");
    });
  };
  return (
    <div className="bg-primary w-full lg:px-5 xl:px-11 p-2 lg:py-9 lg:rounded-3xl overflow-y-hidden lg:overflow-x-hidden fixed bottom-0 left-0 z-10 lg:static flex justify-center lg:flex-col gap-x-5 sml:gap-x-16 md:!gap-x-28">
      <div className="w-[60px] h-[60px] md:w-[80px] md:h-[80px] lg:w-[100px] lg:h-[100px] rounded-full overflow-hidden">
        <picture>
          <img className="w-full h-full" src={auth.currentUser.photoURL} />
        </picture>
      </div>
      <h2 className="font-nunito text-xl font-bold text-white text-center mt-2">
        {auth.currentUser.displayName}
      </h2>
      <div className="flex flex-row lg:flex-col items-center gap-y-20 gap-x-5 sml:gap-x-6 md:!gap-x-11 lg:mt-24">
        <div
          className={`${
            active == "home" &&
            "z-10 px-1 py-3 lg:py-4 xl:py-5 lg:px-10 relative after:absolute lg:after:top-0 after:left-0 lg:after:left-3 xl:after:left-0 after:bottom-0 after:content-[''] after:bg-white after:w-full after:h-[120%] lg:after:w-[125%] lg:after:h-full after:z-[-1] after:rounded-b-xl lg:after:rounded-none lg:after:rounded-l-3xl before:absolute before:-top-2.5 md:before:-top-3.5 lg:before:top-0 before:right-0 lg:before:-right-4 xl:before:-right-10 before:content-[''] before:bg-primary before:w-full before:h-[15%] lg:before:w-[15%] lg:before:h-full before:rounded-b-xl lg:before:rounded-none lg:before:rounded-l-xl"
          }`}
        >
          <Link to="/">
            <GoHome
              className={`text-[32px] sml:text-4xl md:!text-5xl cursor-pointer ${
                active == "home" ? "text-primary" : "text-white"
              }`}
            />
          </Link>
        </div>
        <div
          className={`${
            active == "message" &&
            "z-10 px-1 py-3 lg:py-4 xl:py-5 lg:px-10 relative after:absolute lg:after:top-0 after:left-0 lg:after:left-3 xl:after:left-0 after:bottom-0 after:content-[''] after:bg-white after:w-full after:h-[120%] lg:after:w-[125%] lg:after:h-full after:z-[-1] after:rounded-b-xl lg:after:rounded-none lg:after:rounded-l-3xl before:absolute before:-top-2.5 md:before:-top-3.5 lg:before:top-0 before:right-0 lg:before:-right-4 xl:before:-right-10 before:content-[''] before:bg-primary before:w-full before:h-[15%] lg:before:w-[15%] lg:before:h-full before:rounded-b-xl lg:before:rounded-none lg:before:rounded-l-xl"
          }`}
        >
          <Link to="/message">
            <BiMessageDetail
              className={`text-[32px] sml:text-4xl md:!text-5xl cursor-pointer ${
                active == "message" ? "text-primary" : "text-white"
              }`}
            />
          </Link>
        </div>
        <div
          className={`${
            active == "notification" &&
            "z-10 px-1 py-3 lg:py-4 xl:py-5 lg:px-10 relative after:absolute lg:after:top-0 after:left-0 lg:after:left-3 xl:after:left-0 after:bottom-0 after:content-[''] after:bg-white after:w-full after:h-[120%] lg:after:w-[125%] lg:after:h-full after:z-[-1] after:rounded-b-xl lg:after:rounded-none lg:after:rounded-l-3xl before:absolute before:-top-2.5 md:before:-top-3.5 lg:before:top-0 before:right-0 lg:before:-right-4 xl:before:-right-10 before:content-[''] before:bg-primary before:w-full before:h-[15%] lg:before:w-[15%] lg:before:h-full before:rounded-b-xl lg:before:rounded-none lg:before:rounded-l-xl"
          }`}
        >
          <Link to="/notification">
            <IoMdNotificationsOutline
              className={`text-[32px] sml:text-4xl md:!text-5xl cursor-pointer ${
                active == "notification" ? "text-primary" : "text-white"
              }`}
            />
          </Link>
        </div>
        <div
          className={`${
            active == "setting" &&
            "z-10 px-1 py-3 lg:py-4 xl:py-5 lg:px-10 relative after:absolute lg:after:top-0 after:left-0 lg:after:left-3 xl:after:left-0 after:bottom-0 after:content-[''] after:bg-white after:w-full after:h-[120%] lg:after:w-[125%] lg:after:h-full after:z-[-1] after:rounded-b-xl lg:after:rounded-none lg:after:rounded-l-3xl before:absolute before:-top-2.5 md:before:-top-3.5 lg:before:top-0 before:right-0 lg:before:-right-4 xl:before:-right-10 before:content-[''] before:bg-primary before:w-full before:h-[15%] lg:before:w-[15%] lg:before:h-full before:rounded-b-xl lg:before:rounded-none lg:before:rounded-l-xl"
          }`}
        >
          <Link to="/setting">
            <TbSettings
              className={`text-[32px] sml:text-4xl md:!text-5xl cursor-pointer ${
                active == "setting" ? "text-primary" : "text-white"
              }`}
            />
          </Link>
        </div>
        <div className="sml:ml-10 md:!ml-16 lg:!ml-0 lg:mt-[105px] xl:mt-24 lg:mb-3.5">
          <MdLogout
            onClick={handleSignOut}
            className="text-[32px] sml:text-4xl md:!text-5xl text-white cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
