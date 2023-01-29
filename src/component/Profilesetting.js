import React from "react";
import { RiEdit2Fill } from "react-icons/ri";
import { TbEdit } from "react-icons/tb";
import { MdHelpOutline } from "react-icons/md";
import { RiImageAddFill } from "react-icons/ri";

const Profilesetting = () => {
  return (
    <div className="h-[700px] md:h-[800px] lg:h-[875px] mt-10 md:mb-24 lg:mb-0 py-8 px-6 sml:p-10 border border-gray/25 rounded-3xl shadow-[0_4px_4px_rgba(0,0,0,0.25)] relative">
      <h2 className="font-pop font-semibold text-xl text-black">
        Profile Settings
      </h2>
      <div className="flex items-center gap-x-4 sml:gap-x-6 md:!gap-x-4 lg:!gap-x-6 border-b border-solid border-gray pb-7 lg:mx-0 xl:mx-5 mt-12">
        <div className="w-[80px] h-[80px] sml:w-[100px] sml:h-[100px] rounded-full overflow-hidden">
          <picture>
            <img
              className="bg-primary text-white"
              src="images/profile.png"
              alt="Profile Picture"
            />
          </picture>
        </div>
        <div>
          <h3 className="font-pop font-semibold text-black text-2xl mb-1">
            A B M Shawon Islam
          </h3>
          <p className="font-pop font-normal text-black text-base">
            Stay home stay safe
          </p>
        </div>
      </div>
      <div className="mt-10 sml:mx-12 md:!mx-2 lg:!mx-2 xl:!mx-12">
        <div className="flex items-center gap-x-6 mb-8">
          <RiEdit2Fill className="text-3xl text-black" />
          <p className="font-pop font-normal text-xl text-black cursor-pointer">
            Edit Profile Name.
          </p>
        </div>
        <div className="flex items-center gap-x-6 mb-8">
          <TbEdit className="text-3xl text-black" />
          <p className="font-pop font-normal text-xl text-black cursor-pointer">
            Edit Profile Status Info.
          </p>
        </div>
        <div className="flex items-center gap-x-6 mb-8">
          <RiImageAddFill className="text-3xl text-black" />
          <p className="font-pop font-normal text-xl text-black cursor-pointer">
            Edit Profile Photo.
          </p>
        </div>
        <div className="flex items-center gap-x-6">
          <MdHelpOutline className="text-3xl text-black" />
          <p className="font-pop font-normal text-xl text-black cursor-pointer">
            Help.
          </p>
        </div>
      </div>
      <span className="absolute bottom-12 left-[50%] -translate-x-2/4 font-pop font-normal text-xl text-gray">
        Chat App
      </span>
    </div>
  );
};

export default Profilesetting;
