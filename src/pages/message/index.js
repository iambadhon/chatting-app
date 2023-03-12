import React from "react";
import Friend from "../../component/Friend";
import Joinedgrouplist from "../../component/Joinedgrouplist";
import Messagefield from "../../component/Messagefield";
import Sidebar from "../../component/Sidebar";
import { useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useSelector } from "react-redux";

const Message = () => {
  //Authentication
  const auth = getAuth();
  //email Verified
  let [emailvarify, setEmailVarify] = useState(false);
  // user Login Info
  let userData = useSelector((state) => state.userLoginInfo.userInfo);

  //email varify
  onAuthStateChanged(auth, (user) => {
    if (user.emailVerified) {
      setEmailVarify(true);
    }
  });

  return (
    userData !== null &&
    emailvarify && (
      <div className="flex flex-col lg:flex-row p-4 gap-x-8">
        <div className="w-full lg:w-[140px] xl:w-[186px]">
          <Sidebar active="message" />
        </div>
        <div className="w-full lg:w-[426px]">
          <Joinedgrouplist />
          <Friend marginT="37px" />
        </div>
        <div className="w-full lg:w-[690px]">
          <Messagefield />
        </div>
      </div>
    )
  );
};

export default Message;
