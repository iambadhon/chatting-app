import React from "react";
import Blockeduser from "../../component/Blockeduser";
import Friend from "../../component/Friend";
import Friendrequest from "../../component/Friendrequest";
import Grouprequest from "../../component/Grouprequest";
import Mygroup from "../../component/Mygroup";
import Search from "../../component/Search";
import Sidebar from "../../component/Sidebar";
import Userlist from "../../component/Userlist";

const Home = () => {
  return (
    <div className="flex flex-col lg:flex-row p-4 gap-x-8">
      <div className="w-full lg:w-[140px] xl:w-[186px]">
        <Sidebar active="home" />
      </div>
      <div className="w-full lg:h-[980px] xl:h-full lg:pb-1.5 xl:pb-0 lg:overflow-y-scroll xl:overflow-visible lg:scrollbar-hide xl:scrollbar-default lg:w-[88%] xl:w-[86%] flex flex-col lg:flex-row gap-x-8 lg:flex-wrap xl:flex-nowrap">
        <div className="w-full lg:w-[48%] xl:w-[40%]">
          <Search />
          <Grouprequest />
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
  );
};

export default Home;
