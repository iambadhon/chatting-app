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
import EmojiPicker from "emoji-picker-react";
import {
  getStorage,
  ref as sref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";

const Messagefield = () => {
  //Authentication
  const auth = getAuth();
  //data base
  const db = getDatabase();
  //firebase storage
  const storage = getStorage();
  //active Chat Data
  let activeChatData = useSelector((state) => state.activeChat.value);
  //message
  let [message, setMessage] = useState("");
  //file
  let [file, setFile] = useState("");
  //file error
  let [fileerr, setFileErr] = useState("");
  //progress
  let [progress, setProgress] = useState("");
  //single message list
  let [singlemessagelist, setSingleMessageList] = useState([]);
  //group message list
  let [groupmessagelist, setGroupMessageList] = useState([]);
  //upload image modlal
  let [sendimageshow, setSendImageShow] = useState(false);
  //emoji show
  let [emojishow, setEmojiShow] = useState(false);

  //handle Message
  let handleMessage = (e) => {
    setMessage(e.target.value);
    setEmojiShow(false);
  };

  //handle Message Send
  let handleMessageSend = () => {
    if (message != "") {
      if (activeChatData.status == "group") {
        set(push(ref(db, "groupMessage")), {
          whoSendId: auth.currentUser.uid,
          whoSendName: auth.currentUser.displayName,
          whoReceiveName: activeChatData.name,
          whoReceiveId: activeChatData.groupId,
          message: message,
          date: `${new Date().getFullYear()}/${
            new Date().getMonth() + 1
          }/${new Date().getDate()}, ${new Date().getHours()}:${new Date().getMinutes()}`,
        }).then(() => {
          setMessage("");
          setEmojiShow(false);
        });
      } else {
        set(push(ref(db, "singleMessage")), {
          whoSendId: auth.currentUser.uid,
          whoSendName: auth.currentUser.displayName,
          whoReceiveName: activeChatData.name,
          whoReceiveId: activeChatData.id,
          message: message,
          date: `${new Date().getFullYear()}/${
            new Date().getMonth() + 1
          }/${new Date().getDate()}, ${new Date().getHours()}:${new Date().getMinutes()}`,
        }).then(() => {
          setMessage("");
          setEmojiShow(false);
        });
      }
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
            item.val().whoReceiveId == activeChatData.id) ||
          (item.val().whoReceiveId == auth.currentUser.uid &&
            item.val().whoSendId == activeChatData.id)
        ) {
          arr.push(item.val());
        }
      });
      setSingleMessageList(arr);
    });
  }, [activeChatData]);

  //group Message List
  useEffect(() => {
    const groupMessageRef = ref(db, "groupMessage");
    onValue(groupMessageRef, (snapshot) => {
      let arr = [];
      snapshot.forEach((item) => {
        arr.push(item.val());
      });
      setGroupMessageList(arr);
    });
  }, [activeChatData]);

  //handle Select Image
  let handleSelectImage = (e) => {
    setFile(e.target.files[0]);
    setFileErr("");
  };

  //handle Image Send
  let handleImageSend = () => {
    if (file !== "") {
      const imageSendRef = sref(storage, "chatImages/" + file.name);
      const uploadTask = uploadBytesResumable(imageSendRef, file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setProgress("Upload is " + progress + "% done");
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
          }
        },
        (error) => {
          // Handle unsuccessful uploads
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            console.log("File available at", downloadURL);

            if (file !== "") {
              if (activeChatData.status == "group") {
                set(push(ref(db, "groupMessage")), {
                  whoSendId: auth.currentUser.uid,
                  whoSendName: auth.currentUser.displayName,
                  whoReceiveName: activeChatData.name,
                  whoReceiveId: activeChatData.groupId,
                  image: downloadURL,
                  date: `${new Date().getFullYear()}/${
                    new Date().getMonth() + 1
                  }/${new Date().getDate()}, ${new Date().getHours()}:${new Date().getMinutes()}`,
                }).then(() => {
                  setSendImageShow(false);
                  setFile("");
                  setFileErr("");
                  setProgress("");
                });
              } else {
                set(push(ref(db, "singleMessage")), {
                  whoSendId: auth.currentUser.uid,
                  whoSendName: auth.currentUser.displayName,
                  whoReceiveName: activeChatData.name,
                  whoReceiveId: activeChatData.id,
                  image: downloadURL,
                  date: `${new Date().getFullYear()}/${
                    new Date().getMonth() + 1
                  }/${new Date().getDate()}, ${new Date().getHours()}:${new Date().getMinutes()}`,
                }).then(() => {
                  setSendImageShow(false);
                  setFile("");
                  setFileErr("");
                  setProgress("");
                });
              }
            }
          });
        }
      );
    } else {
      setFileErr("No File Selected!");
    }
  };

  return activeChatData !== null ? (
    <div className="mt-10 lg:mt-0 pt-6 pb-8 mb-20 md:mb-24 lg:mb-0 border border-solid border-gray/25 rounded-3xl shadow-[0_4px_4px_rgba(0,0,0,0.25)] relative">
      <div className="flex items-center justify-between border-b-2 border-solid border-gray pb-4 mx-4 md:mx-8">
        <div className="flex items-center gap-4">
          <picture className="w-[75px] h-[75px] rounded-full overflow-hidden">
            <img
              className="bg-primary text-white h-full w-full"
              src={activeChatData.photo}
              alt="Profile"
            />
          </picture>
          <div>
            <h3 className="font-pop text-lg text-black font-semibold">
              {activeChatData
                ? activeChatData.name
                : "Select a Group or Friend"}
            </h3>
            <p className="font-pop text-sm text-gray font-medium">Online</p>
          </div>
        </div>
        <div>
          <BiDotsVerticalRounded className=" text-3xl cursor-pointer text-primary" />
        </div>
      </div>
      <ScrollToBottom className="pb-7 mx-4 md:mx-8 h-[741px]">
        {activeChatData.status == "group"
          ? groupmessagelist.map((item) =>
              item.whoSendId == auth.currentUser.uid
                ? item.message
                  ? item.whoReceiveId == activeChatData.groupId && (
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
                    )
                  : item.whoReceiveId == activeChatData.groupId && (
                      <div className="mt-5 flex justify-end">
                        <div>
                          <picture className="relative p-2 ml-10 md:ml-16 lg:ml-20 mr-3 bg-primary rounded-lg inline-block after:absolute after:bottom-0 after:-right-3 after:content-[''] after:w-5 after:h-6 after:clip-path-rightpolygon after:bg-primary">
                            <img src={item.image} alt="chat" />
                          </picture>
                          <p className="flex justify-end font-pop font-medium text-gray text-xs pr-2 mt-1">
                            {moment(item.date).calendar()}
                          </p>
                        </div>
                      </div>
                    )
                : item.message
                ? item.whoReceiveId == activeChatData.groupId && (
                    <div className="mt-5">
                      <p className="font-pop font-medium text-gray text-sm pl-4 mb-1">
                        {item.whoSendName}
                      </p>
                      <p className="relative py-3 px-6 mr-10 md:mr-16 lg:mr-20 ml-3 bg-lightwhite text-black rounded-lg inline-block font-pop font-medium after:absolute after:bottom-0 after:-left-3 after:content-[''] after:w-5 after:h-6 after:clip-path-leftpolygon after:bg-lightwhite">
                        {item.message}
                      </p>
                      <p className="font-pop font-medium text-gray text-xs pl-2 mt-1">
                        {moment(item.date).calendar()}
                      </p>
                    </div>
                  )
                : item.whoReceiveId == activeChatData.groupId && (
                    <div className="mt-5">
                      <p className="font-pop font-medium text-gray text-sm pl-4 mb-1">
                        {item.whoSendName}
                      </p>
                      <picture className="relative p-2 mr-10 md:mr-16 lg:mr-20 ml-3 bg-lightwhite rounded-lg inline-block after:absolute after:bottom-0 after:-left-3 after:content-[''] after:w-5 after:h-6 after:clip-path-leftpolygon after:bg-lightwhite">
                        <img src={item.image} alt="chat" />
                      </picture>
                      <p className="font-pop font-medium text-gray text-xs pl-2 mt-1">
                        {moment(item.date).calendar()}
                      </p>
                    </div>
                  )
            )
          : singlemessagelist.map((item) =>
              item.whoSendId == auth.currentUser.uid ? (
                item.message ? (
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
                  <div className="mt-5 flex justify-end">
                    <div>
                      <picture className="relative p-2 ml-10 md:ml-16 lg:ml-20 mr-3 bg-primary rounded-lg inline-block after:absolute after:bottom-0 after:-right-3 after:content-[''] after:w-5 after:h-6 after:clip-path-rightpolygon after:bg-primary">
                        <img src={item.image} alt="chat" />
                      </picture>
                      <p className="flex justify-end font-pop font-medium text-gray text-xs pr-2 mt-1">
                        {moment(item.date).calendar()}
                      </p>
                    </div>
                  </div>
                )
              ) : item.message ? (
                <div className="mt-5">
                  <p className="relative py-3 px-6 mr-10 md:mr-16 lg:mr-20 ml-3 bg-lightwhite text-black rounded-lg inline-block font-pop font-medium after:absolute after:bottom-0 after:-left-3 after:content-[''] after:w-5 after:h-6 after:clip-path-leftpolygon after:bg-lightwhite">
                    {item.message}
                  </p>
                  <p className="font-pop font-medium text-gray text-xs pl-2 mt-1">
                    {moment(item.date).calendar()}
                  </p>
                </div>
              ) : (
                <div className="mt-5">
                  <picture className="relative p-2 mr-10 md:mr-16 lg:mr-20 ml-3 bg-lightwhite rounded-lg inline-block after:absolute after:bottom-0 after:-left-3 after:content-[''] after:w-5 after:h-6 after:clip-path-leftpolygon after:bg-lightwhite">
                    <img src={item.image} alt="chat" />
                  </picture>
                  <p className="font-pop font-medium text-gray text-xs pl-2 mt-1">
                    {moment(item.date).calendar()}
                  </p>
                </div>
              )
            )}
      </ScrollToBottom>
      <div className="border-t-2 border-solid border-gray flex gap-x-2 sml:gap-x-5 pt-7 mx-4 md:mx-8">
        <div className="w-[88%] sml:w-[90%] relative">
          <input
            onChange={handleMessage}
            value={message}
            type="text"
            placeholder="Write Your Message"
            className="py-3 sml:py-3.5 pl-2.5 sml:pl-6 pr-[58px] sml:pr-20 bg-lightwhite text-black font-pop font-medium rounded-lg w-full border-2 border-solid border-transparent focus:border-primary outline-none"
          />
          <HiOutlinePhotograph
            onClick={() => setSendImageShow(true)}
            className="absolute top-3.5 right-2 sml:right-3 text-2xl sml:text-3xl cursor-pointer text-primary"
          />
          <FaRegSmile
            onClick={() => setEmojiShow(!emojishow)}
            className="absolute top-[17px] right-9 sml:right-12 text-xl sml:text-2xl cursor-pointer text-primary"
          />
        </div>

        <button
          onClick={handleMessageSend}
          className="my_btn !p-0 w-[12%] sml:w-[10%]"
        >
          <RiSendPlaneFill className="text-3xl sml:text-4xl lg:!text-3xl xl:!text-4xl mx-auto" />
        </button>
      </div>
      {emojishow && (
        <div className="absolute bottom-24 left-8">
          <EmojiPicker onEmojiClick={(e) => setMessage(message + e.emoji)} />
        </div>
      )}

      {/* send image modal */}
      {sendimageshow && (
        <div className="fixed top-0 left-0 w-full h-screen bg-black/75 flex justify-center items-center z-10 px-4">
          <div className="p-6 md:p-9 bg-white rounded-lg">
            <h2 className="text-3xl md:text-4xl text-center font-bold text-primary font-nunito mb-6">
              Select Image for Send
            </h2>
            <div className="relative mt-4">
              <input
                className="w-full text-durkblue border-2 border-solid rounded-lg p-3 font-nunito text-base sml:text-xl font-bold focus:border-primary cursor-pointer border-gray/25 "
                type="file"
                onChange={handleSelectImage}
              />
              <p className="text-primary mt-1 ml-2 text-lg font-semibold font-nunito">
                {progress}
              </p>
              {fileerr && (
                <p className="text-red-500 mt-1 ml-2 text-sm font-semibold font-nunito">
                  {fileerr}
                </p>
              )}
            </div>
            <div className="mt-4 flex items-center gap-x-5">
              <button
                className="my_btn !text-base md:!text-xl !rounded-md !p-3 md:!p-4 !font-nunito after:hover:!bg-lightwhite"
                type="button"
                onClick={handleImageSend}
              >
                Send Image
              </button>

              <button
                className="my_btn !text-base md:!text-xl !rounded-md !p-3 md:!p-4 !font-nunito after:hover:!bg-lightwhite !bg-red-500 !border-red-500"
                type="button"
                onClick={() => setSendImageShow(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  ) : (
    <p className="p-4 text-center bg-primary text-xl text-white font-pop font-semibold rounded-md capitalize">
      You Have No Friend.
    </p>
  );
};

export default Messagefield;
