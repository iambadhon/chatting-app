import React, { useEffect } from "react";
import { useState } from "react";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { RiSendPlaneFill } from "react-icons/ri";
import { HiOutlinePhotograph } from "react-icons/hi";
import { FaRegSmile } from "react-icons/fa";
import ScrollToBottom from "react-scroll-to-bottom";
import { useSelector } from "react-redux";
import { getDatabase, ref, set, push, onValue } from "firebase/database";
import { getAuth } from "firebase/auth";
import moment from "moment/moment";

const Messagefield = () => {
  //Authentication
  const auth = getAuth();
  //data base
  const db = getDatabase();
  //data
  let data = useSelector((state) => state.activeChat.value);
  //message
  let [message, setMessage] = useState("");
  //single message list
  let [singlemessagelist, setSingleMessageList] = useState([]);
  //group message list
  let [groupmessagelist, setGroupMessageList] = useState([]);

  //handle Message
  let handleMessage = (e) => {
    setMessage(e.target.value);
  };

  //handle Message Send
  let handleMessageSend = () => {
    if (data.status == "group") {
      set(push(ref(db, "groupMessage")), {
        whoSendId: auth.currentUser.uid,
        whoSendName: auth.currentUser.displayName,
        whoReceiveName: data.name,
        whoReceiveId: data.groupId,
        message: message,
        date: `${new Date().getFullYear()}/${
          new Date().getMonth() + 1
        }/${new Date().getDate()}, ${new Date().getHours()}:${new Date().getMinutes()}`,
      });
    } else {
      set(push(ref(db, "singleMessage")), {
        whoSendId: auth.currentUser.uid,
        whoSendName: auth.currentUser.displayName,
        whoReceiveName: data.name,
        whoReceiveId: data.id,
        message: message,
        date: `${new Date().getFullYear()}/${
          new Date().getMonth() + 1
        }/${new Date().getDate()}, ${new Date().getHours()}:${new Date().getMinutes()}`,
      });
    }
  };

  //Single Message List
  useEffect(() => {
    const singleMessageRef = ref(db, "singleMessage");
    onValue(singleMessageRef, (snapshot) => {
      let arr = [];
      snapshot.forEach((item) => {
        if (
          (item.val().whoSendId == auth.currentUser.uid &&
            item.val().whoReceiveId == data.id) ||
          (item.val().whoReceiveId == auth.currentUser.uid &&
            item.val().whoSendId == data.id)
        ) {
          arr.push(item.val());
        }
      });
      setSingleMessageList(arr);
    });
  }, [data ? data.id : "ffgf"]);

  //group Message List
  useEffect(() => {
    const groupMessageRef = ref(db, "groupMessage");
    onValue(groupMessageRef, (snapshot) => {
      let arr = [];
      snapshot.forEach((item) => {
        if (
          (item.val().whoSendId == auth.currentUser.uid &&
            item.val().whoReceiveId == data.groupId) ||
          (item.val().whoReceiveId == auth.currentUser.uid &&
            item.val().whoSendId == data.groupId)
        ) {
          arr.push(item.val());
        }
      });
      setGroupMessageList(arr);
    });
  }, [data ? data.groupId : "ffgf"]);

  return (
    <div className="mt-10 lg:mt-0 pt-6 pb-8 mb-20 md:mb-24 lg:mb-0 border border-solid border-gray/25 rounded-3xl shadow-[0_4px_4px_rgba(0,0,0,0.25)]">
      <div className="flex items-center justify-between border-b-2 border-solid border-gray pb-4 mx-4 md:mx-8">
        <div className="flex items-center gap-4">
          <picture className="w-[75px] h-[75px] rounded-full overflow-hidden">
            <img src="images/profile.png" alt="Profile" />
          </picture>
          <div>
            <h3 className="font-pop text-lg text-black font-semibold">
              {data ? data.name : "Select a Group or Friend"}
            </h3>
            <p className="font-pop text-sm text-gray font-medium">Online</p>
          </div>
        </div>
        <div>
          <BiDotsVerticalRounded className=" text-3xl cursor-pointer text-primary" />
        </div>
      </div>
      <ScrollToBottom className="pb-7 mx-4 md:mx-8 h-[741px]">
        {/* group message */}
        {data.status == "group"
          ? groupmessagelist.map((item) =>
              item.whoSendId == auth.currentUser.uid ? (
                <div className="mt-5 flex justify-end">
                  <div>
                    <p className="relative py-3 px-6 ml-10 md:ml-16 lg:ml-20 mr-3 bg-primary text-white rounded-lg inline-block font-pop font-medium after:absolute after:bottom-0 after:-right-3 after:content-[''] after:w-5 after:h-6 after:clip-path-rightpolygon after:bg-primary">
                      {item.message}
                    </p>
                    <p className="flex justify-end font-pop font-medium text-gray text-xs pr-2 mt-1">
                      {moment(item.date).calendar()}
                    </p>
                  </div>
                </div>
              ) : (
                <div className="mt-5">
                  <p className="relative py-3 px-6 mr-10 md:mr-16 lg:mr-20 ml-3 bg-lightwhite text-black rounded-lg inline-block font-pop font-medium after:absolute after:bottom-0 after:-left-3 after:content-[''] after:w-5 after:h-6 after:clip-path-leftpolygon after:bg-lightwhite">
                    {item.message}
                  </p>
                  <p className="font-pop font-medium text-gray text-xs pl-2 mt-1">
                    {moment(item.date).calendar()}
                  </p>
                </div>
              )
            )
          : groupmessagelist.map((item) =>
              item.whoSendId == auth.currentUser.uid ? (
                <div className="mt-5 flex justify-end">
                  <div>
                    <p className="relative py-3 px-6 ml-10 md:ml-16 lg:ml-20 mr-3 bg-primary text-white rounded-lg inline-block font-pop font-medium after:absolute after:bottom-0 after:-right-3 after:content-[''] after:w-5 after:h-6 after:clip-path-rightpolygon after:bg-primary">
                      {item.message}
                    </p>
                    <p className="flex justify-end font-pop font-medium text-gray text-xs pr-2 mt-1">
                      {moment(item.date).calendar()}
                    </p>
                  </div>
                </div>
              ) : (
                <div className="mt-5">
                  <p className="relative py-3 px-6 mr-10 md:mr-16 lg:mr-20 ml-3 bg-lightwhite text-black rounded-lg inline-block font-pop font-medium after:absolute after:bottom-0 after:-left-3 after:content-[''] after:w-5 after:h-6 after:clip-path-leftpolygon after:bg-lightwhite">
                    {item.message}
                  </p>
                  <p className="font-pop font-medium text-gray text-xs pl-2 mt-1">
                    {moment(item.date).calendar()}
                  </p>
                </div>
              )
            )}

        {/* single message */}
        {singlemessagelist.map((item) =>
          item.whoSendId == auth.currentUser.uid ? (
            <div className="mt-5 flex justify-end">
              <div>
                <p className="relative py-3 px-6 ml-10 md:ml-16 lg:ml-20 mr-3 bg-primary text-white rounded-lg inline-block font-pop font-medium after:absolute after:bottom-0 after:-right-3 after:content-[''] after:w-5 after:h-6 after:clip-path-rightpolygon after:bg-primary">
                  {item.message}
                </p>
                <p className="flex justify-end font-pop font-medium text-gray text-xs pr-2 mt-1">
                  {moment(item.date).calendar()}
                </p>
              </div>
            </div>
          ) : (
            <div className="mt-5">
              <p className="relative py-3 px-6 mr-10 md:mr-16 lg:mr-20 ml-3 bg-lightwhite text-black rounded-lg inline-block font-pop font-medium after:absolute after:bottom-0 after:-left-3 after:content-[''] after:w-5 after:h-6 after:clip-path-leftpolygon after:bg-lightwhite">
                {item.message}
              </p>
              <p className="font-pop font-medium text-gray text-xs pl-2 mt-1">
                {moment(item.date).calendar()}
              </p>
            </div>
          )
        )}
        {/* <div className="mt-5 flex justify-end">
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
        </div> */}
      </ScrollToBottom>
      <div className="border-t-2 border-solid border-gray flex gap-x-2 sml:gap-x-5 pt-7 mx-4 md:mx-8">
        <div className="w-[88%] sml:w-[90%] relative">
          <input
            onChange={handleMessage}
            type="text"
            placeholder="Write Your Message"
            className="py-3 sml:py-3.5 pl-2.5 sml:pl-6 pr-[58px] sml:pr-20 bg-lightwhite text-black font-pop font-medium rounded-lg w-full border-2 border-solid border-transparent focus:border-primary outline-none"
          />
          <HiOutlinePhotograph className="absolute top-3.5 right-2 sml:right-3 text-2xl sml:text-3xl cursor-pointer text-primary" />
          <FaRegSmile className="absolute top-[17px] right-9 sml:right-12 text-xl sml:text-2xl cursor-pointer text-primary" />
        </div>
        <button
          onClick={handleMessageSend}
          className="my_btn !p-0 w-[12%] sml:w-[10%]"
        >
          <RiSendPlaneFill className="text-3xl sml:text-4xl lg:!text-3xl xl:!text-4xl mx-auto" />
        </button>
      </div>
    </div>
  );
};

export default Messagefield;
