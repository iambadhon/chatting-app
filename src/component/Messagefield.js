import React from "react";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { RiSendPlaneFill } from "react-icons/ri";
import { HiOutlinePhotograph } from "react-icons/hi";
import { FaRegSmile } from "react-icons/fa";
import ScrollToBottom from "react-scroll-to-bottom";

const Messagefield = () => {
  return (
    <div className="pt-6 pb-8 border border-solid border-gray/25 rounded-3xl shadow-[0_4px_4px_rgba(0,0,0,0.25)]">
      <div className="flex items-center justify-between border-b-2 border-solid border-gray pb-4 mx-8">
        <div className="flex items-center gap-4">
          <picture className="w-[75px] h-[75px] rounded-full overflow-hidden">
            <img src="images/profile.png" alt="Profile" />
          </picture>
          <div>
            <h3 className="font-pop text-lg text-black font-semibold">
              Swathi
            </h3>
            <p className="font-pop text-sm text-gray font-medium">Online</p>
          </div>
        </div>
        <div>
          <BiDotsVerticalRounded className=" text-3xl cursor-pointer text-primary" />
        </div>
      </div>
      <ScrollToBottom className="py-7 px-4 mx-4 h-[741px] scrollbar-hide">
        <p className="py-3 px-6 mb-6 bg-lightwhite text-black rounded-lg block font-pop font-medium">
          Hi Guys, Wassup!
        </p>
        <p className="py-3 px-6 mb-6 bg-lightwhite text-black rounded-lg block font-pop font-medium">
          Using this feature allows you to control the number of orders you can
          receive. Once the limit you set is reached, your Gig will temporarily
          be removed from Fiverr’s search. Disabling this feature returns your
          Gig to Fiverr’s search (approximately 15 minutes later).
        </p>
        <p className="py-3 px-6 mb-6 bg-lightwhite text-black rounded-lg block font-pop font-medium">
          Hi Guys, Wassup!
        </p>
        <p className="py-3 px-6 mb-6 bg-lightwhite text-black rounded-lg block font-pop font-medium">
          Using this feature allows you to control the number of orders you can
          receive. Once the limit you set is reached, your Gig will temporarily
          be removed from Fiverr’s search. Disabling this feature returns your
          Gig to Fiverr’s search (approximately 15 minutes later).
        </p>
        <p className="py-3 px-6 mb-6 bg-lightwhite text-black rounded-lg block font-pop font-medium">
          The watermark will appear on image delivery previews prior to the
          buyer accepting and completing the order. The watermark will only
          appear on images from completed orders in your Gig portfolio. It will
          not appear on images you upload to your portfolio.
        </p>
        <p className="py-3 px-6 mb-6 bg-lightwhite text-black rounded-lg block font-pop font-medium">
          The watermark will appear on image delivery previews prior to the
          buyer accepting and completing the order. The watermark will only
          appear on images from completed orders in your Gig portfolio. It will
          not appear on images you upload to your portfolio.
        </p>
        <p className="py-3 px-6 mb-6 last:mb-0 bg-lightwhite text-black rounded-lg block font-pop font-medium">
          The watermark will appear on image delivery previews prior to the
          buyer accepting and completing the order. The watermark will only
          appear on images from completed orders in your Gig portfolio. It will
          not appear on images you upload to your portfolio.
        </p>
      </ScrollToBottom>
      <div className="border-t-2 border-solid border-gray flex gap-5 pt-7 mx-8">
        <div className="w-[90%] relative">
          <input
            type="text"
            placeholder="Aa"
            className="py-3.5 pl-6 pr-20 bg-lightwhite text-black font-pop font-medium rounded-lg w-full border-2 border-solid border-transparent focus:border-primary outline-none"
          />
          <HiOutlinePhotograph className="absolute top-3.5 right-3 text-3xl cursor-pointer text-primary" />
          <FaRegSmile className="absolute top-[17px] right-12 text-2xl cursor-pointer text-primary" />
        </div>
        <button className="my_btn w-[10%]">
          <RiSendPlaneFill className="text-3xl mx-auto" />
        </button>
      </div>
    </div>
  );
};

export default Messagefield;
