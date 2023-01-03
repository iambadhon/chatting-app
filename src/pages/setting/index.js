import React from "react";
import Accountsetting from "../../component/Accountsetting";
import Profilesetting from "../../component/Profilesetting";
import Search from "../../component/Search";
import Sidebar from "../../component/Sidebar";

const Setting = () => {
  return (
    <div className="flex flex-col lg:flex-row p-4 gap-x-8">
      <div className="w-full lg:w-[140px] xl:w-[186px]">
        <Sidebar active="setting" />
      </div>
      <div className="w-full lg:w-[1140px]">
        <Search />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-7">
          <div>
            <Profilesetting />
          </div>
          <div>
            <Accountsetting />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Setting;
