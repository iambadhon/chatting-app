import React from "react";
import Search from "../../component/Search";
import Sidebar from "../../component/Sidebar";
import Notificationfield from "../../component/Notificationfield";

const Notification = () => {
  return (
    <div className="flex flex-col lg:flex-row p-4 gap-x-8">
      <div className="w-full lg:w-[140px] xl:w-[186px]">
        <Sidebar active="notification" />
      </div>
      <div className="w-full lg:w-[1140px]">
        <Search />
        <Notificationfield />
      </div>
    </div>
  );
};

export default Notification;
