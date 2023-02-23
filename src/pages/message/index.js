import React from "react";
import Friend from "../../component/Friend";
import Joinedgrouplist from "../../component/Joinedgrouplist";
import Messagefield from "../../component/Messagefield";
import Sidebar from "../../component/Sidebar";

const Message = () => {
  return (
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
  );
};

export default Message;
