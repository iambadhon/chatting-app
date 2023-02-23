import React from "react";
import Accountsetting from "../../component/Accountsetting";
import Profilesetting from "../../component/Profilesetting";
import Sidebar from "../../component/Sidebar";

const Setting = () => {
  return (
    <div className="flex flex-col lg:flex-row p-4 gap-x-8">
      <div className="w-full lg:w-[140px] xl:w-[186px]">
        <Sidebar active="setting" />
      </div>
      <div className="w-full lg:w-[570px]">
        <Profilesetting />
      </div>
      <div className="w-full lg:w-[570px]">
        <Accountsetting />
      </div>
    </div>
  );
};

export default Setting;
