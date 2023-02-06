import React from "react";
import Blockeduser from "../../component/Blockeduser";
import Friend from "../../component/Friend";
import Friendrequest from "../../component/Friendrequest";
import Grouplist from "../../component/Grouplist";
import Mygroup from "../../component/Mygroup";
import Search from "../../component/Search";
import Sidebar from "../../component/Sidebar";
import Userlist from "../../component/Userlist";
import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";

const Home = () => {
  //Authentication
  const auth = getAuth();
  //emailVerified
  let [emailvarify, setEmailVarify] = useState(false);

  //redirection
  let navigate = useNavigate();

  //email varify
  useEffect(() => {
    if (!auth.currentUser) {
      navigate("/login");
    } else {
      if (auth.currentUser.emailVerified) {
        setEmailVarify(true);
      }
    }
  }, []);

  //handle sign out
  let handleSignOut = () => {
    signOut(auth).then(() => {
      navigate("/login");
    });
  };

  return (
    <>
      {emailvarify ? (
        <div className="flex flex-col lg:flex-row p-4 gap-x-8">
          <div className="w-full lg:w-[140px] xl:w-[186px]">
            <Sidebar active="home" />
          </div>
          <div className="w-full lg:h-[980px] xl:h-full lg:pb-1.5 xl:pb-0 lg:overflow-y-scroll xl:overflow-visible lg:scrollbar-hide xl:scrollbar-default lg:w-[88%] xl:w-[86%] flex flex-col lg:flex-row gap-x-8 lg:flex-wrap xl:flex-nowrap">
            <div className="w-full lg:w-[48%] xl:w-[40%]">
              <Search />
              <Grouplist />
              <Friendrequest />
            </div>
            <div className="w-full lg:w-[48%] xl:w-[30%]">
              <Friend />
              <Mygroup />
            </div>
            <div className="w-full xl:w-[30%] grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-1 lg:gap-x-8 xl:gap-x-0 ">
              <Userlist />
              <Blockeduser />
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center mt-14 px-2">
          <div className="bg-primary p-3 sml:p-4 md:!p-6 inline-block rounded-lg">
            <h2 className=" text-xl sml:text-2xl md:!text-4xl font-bold text-white font-nunito">
              Sorry! First Varify Your Email Address.
            </h2>
            <button
              onClick={handleSignOut}
              className="my_btn !bg-red-500 !border-red-500 after:!bg-primary hover:!text-white  !px-3 !py-1 md:!px-5 md:!py-1.5 mt-6"
            >
              Sign Out
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Home;
