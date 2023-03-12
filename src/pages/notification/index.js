import React from "react";
import Sidebar from "../../component/Sidebar";
import Notificationfield from "../../component/Notificationfield";
import { useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useSelector } from "react-redux";

const Notification = () => {
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
          <Sidebar active="notification" />
        </div>
        <div className="w-full lg:w-[1140px]">
          <Notificationfield />
        </div>
      </div>
    )
  );
};

export default Notification;
