import React from "react";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { RiSendPlaneFill } from "react-icons/ri";
import { HiOutlinePhotograph } from "react-icons/hi";
import { FaRegSmile } from "react-icons/fa";
import ScrollToBottom from "react-scroll-to-bottom";
import { useSelector } from "react-redux";

const Messagefield = () => {
  //data
  let data = useSelector((state) => state.activeChat.value);

  return (
    <div className="mt-10 lg:mt-0 pt-6 pb-8 mb-20 md:mb-24 lg:mb-0 border border-solid border-gray/25 rounded-3xl shadow-[0_4px_4px_rgba(0,0,0,0.25)]">
      <div className="flex items-center justify-between border-b-2 border-solid border-gray pb-4 mx-4 md:mx-8">
        <div className="flex items-center gap-4">
          <picture className="w-[75px] h-[75px] rounded-full overflow-hidden">
            <img src="images/profile.png" alt="Profile" />
          </picture>
          <div>
            <h3 className="font-pop text-lg text-black font-semibold">
              {data.name}
            </h3>
            <p className="font-pop text-sm text-gray font-medium">Online</p>
          </div>
        </div>
        <div>
          <BiDotsVerticalRounded className=" text-3xl cursor-pointer text-primary" />
        </div>
      </div>
      <ScrollToBottom className="pb-7 mx-4 md:mx-8 h-[741px]">
        <div className="mt-5">
          <p className="relative py-3 px-6 mr-10 md:mr-16 lg:mr-20 ml-3 bg-lightwhite text-black rounded-lg inline-block font-pop font-medium after:absolute after:bottom-0 after:-left-3 after:content-[''] after:w-5 after:h-6 after:clip-path-leftpolygon after:bg-lightwhite">
            Hey There !
          </p>
          <p className="font-pop font-medium text-gray text-xs pl-2 mt-1">
            Today, 2:01pm
          </p>
        </div>
        <div className="mt-5 flex justify-end">
          <div>
            <p className="relative py-3 px-6 ml-10 md:ml-16 lg:ml-20 mr-3 bg-primary text-white rounded-lg inline-block font-pop font-medium after:absolute after:bottom-0 after:-right-3 after:content-[''] after:w-5 after:h-6 after:clip-path-rightpolygon after:bg-primary">
              Hello...
            </p>
            <p className="flex justify-end font-pop font-medium text-gray text-xs pr-2 mt-1">
              Today, 2:01pm
            </p>
          </div>
        </div>
        <div className="mt-5">
          <p className="relative py-3 px-6 mr-10 md:mr-16 lg:mr-20 ml-3 bg-lightwhite text-black rounded-lg inline-block font-pop font-medium after:absolute after:bottom-0 after:-left-3 after:content-[''] after:w-5 after:h-6 after:clip-path-leftpolygon after:bg-lightwhite">
            How are you doing?
          </p>
          <p className="font-pop font-medium text-gray text-xs pl-2 mt-1">
            Today, 2:01pm
          </p>
        </div>
        <div className="mt-5 flex justify-end">
          <div>
            <p className="relative py-3 px-6 ml-10 md:ml-16 lg:ml-20 mr-3 bg-primary text-white rounded-lg inline-block font-pop font-medium after:absolute after:bottom-0 after:-right-3 after:content-[''] after:w-5 after:h-6 after:clip-path-rightpolygon after:bg-primary">
              I am good and hoew about you?
            </p>
            <p className="flex justify-end font-pop font-medium text-gray text-xs pr-2 mt-1">
              Today, 2:01pm
            </p>
          </div>
        </div>
        <div className="mt-5">
          <p className="relative py-3 px-6 mr-10 md:mr-16 lg:mr-20 ml-3 bg-lightwhite text-black rounded-lg inline-block font-pop font-medium after:absolute after:bottom-0 after:-left-3 after:content-[''] after:w-5 after:h-6 after:clip-path-leftpolygon after:bg-lightwhite">
            I am doing well. Can we meet up tomorrow?
          </p>
          <p className="font-pop font-medium text-gray text-xs pl-2 mt-1">
            Today, 2:01pm
          </p>
        </div>
        <div className="mt-5 flex justify-end">
          <div>
            <picture className="relative p-2 ml-10 md:ml-16 lg:ml-20 mr-3 bg-primary rounded-lg inline-block after:absolute after:bottom-0 after:-right-3 after:content-[''] after:w-5 after:h-6 after:clip-path-rightpolygon after:bg-primary">
              <img src="images/login.png" alt="chat" />
            </picture>
            <p className="flex justify-end font-pop font-medium text-gray text-xs pr-2 mt-1">
              Today, 2:01pm
            </p>
          </div>
        </div>
        <div className="mt-5">
          <picture className="relative p-2 mr-10 md:mr-16 lg:mr-20 ml-3 bg-lightwhite rounded-lg inline-block after:absolute after:bottom-0 after:-left-3 after:content-[''] after:w-5 after:h-6 after:clip-path-leftpolygon after:bg-lightwhite">
            <img src="images/gig-img.png" alt="chat" />
          </picture>
          <p className="font-pop font-medium text-gray text-xs pl-2 mt-1">
            Today, 2:01pm
          </p>
        </div>
      </ScrollToBottom>
      <div className="border-t-2 border-solid border-gray flex gap-x-2 sml:gap-x-5 pt-7 mx-4 md:mx-8">
        <div className="w-[88%] sml:w-[90%] relative">
          <input
            type="text"
            placeholder="Write Your Message"
            className="py-3 sml:py-3.5 pl-2.5 sml:pl-6 pr-[58px] sml:pr-20 bg-lightwhite text-black font-pop font-medium rounded-lg w-full border-2 border-solid border-transparent focus:border-primary outline-none"
          />
          <HiOutlinePhotograph className="absolute top-3.5 right-2 sml:right-3 text-2xl sml:text-3xl cursor-pointer text-primary" />
          <FaRegSmile className="absolute top-[17px] right-9 sml:right-12 text-xl sml:text-2xl cursor-pointer text-primary" />
        </div>
        <button className="my_btn !p-0 w-[12%] sml:w-[10%]">
          <RiSendPlaneFill className="text-3xl sml:text-4xl lg:!text-3xl xl:!text-4xl mx-auto" />
        </button>
      </div>
    </div>
  );
};

export default Messagefield;
