import React from "react";
import { ImKey } from "react-icons/im";
import { BsCircleHalf } from "react-icons/bs";
import { RiDeleteBin5Fill } from "react-icons/ri";

const Accountsetting = () => {
  return (
    <div className="h-[490px] md:h-[800px] lg:h-[875px] mt-10 mb-20 md:mb-24 lg:mb-0 py-8 px-6 sml:p-10 border border-gray/25 rounded-3xl shadow-[0_4px_4px_rgba(0,0,0,0.25)] relative">
      <h2 className="font-pop font-semibold text-xl text-black">
        Account Settings
      </h2>
      <div className="mt-16 sml:mx-12 md:!mx-2 lg:!mx-2 xl:!mx-12">
        <div className="flex items-center gap-x-6 mb-8">
          <ImKey className="text-3xl text-black" />
          <p className="font-pop font-normal text-xl text-black cursor-pointer">
            Change Password.
          </p>
        </div>
        <div className="flex items-center gap-x-6 mb-8">
          <BsCircleHalf className="text-3xl text-black" />
          <p className="font-pop font-normal text-xl text-black cursor-pointer">
            Theme.
          </p>
        </div>
        <div className="flex items-center gap-x-6 mb-8">
          <RiDeleteBin5Fill className="text-3xl text-black" />
          <p className="font-pop font-normal text-xl text-black cursor-pointer">
            Delete Account.
          </p>
        </div>
      </div>

      <span className="absolute bottom-12 left-[50%] -translate-x-2/4 font-pop font-normal text-xl text-gray">
        Chat App
      </span>
    </div>
  );
};

export default Accountsetting;
