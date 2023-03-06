import React, { useEffect } from "react";
import { useState } from "react";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { BsFillMicFill } from "react-icons/bs";
import { ImCross } from "react-icons/im";
import { RiSendPlaneFill, RiDeleteBin5Line } from "react-icons/ri";
import { HiOutlinePhotograph } from "react-icons/hi";
import { FaRegSmile } from "react-icons/fa";
import ScrollToBottom from "react-scroll-to-bottom";
import { useSelector } from "react-redux";
import {
  getDatabase,
  ref,
  set,
  push,
  onValue,
  remove,
} from "firebase/database";
import { getAuth } from "firebase/auth";
import moment from "moment/moment";
import EmojiPicker from "emoji-picker-react";
import {
  getStorage,
  ref as sref,
  uploadBytesResumable,
  getDownloadURL,
  uploadBytes,
} from "firebase/storage";
import { AudioRecorder, useAudioRecorder } from "react-audio-voice-recorder";

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
  //emoji
  let [emoji, setEmoji] = useState("");
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
  //audio
  let [audio, setAudio] = useState("");
  //audio data
  let [audiodata, setAudioData] = useState("");

  //handle Message
  let handleMessage = (e) => {
    setMessage(e.target.value);
    setEmoji(e.target.value);
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
          emoji: emoji,
          date: `${new Date().getFullYear()}/${
            new Date().getMonth() + 1
          }/${new Date().getDate()}, ${new Date().getHours()}:${new Date().getMinutes()}`,
        }).then(() => {
          setMessage("");
          setEmoji("");
          setEmojiShow(false);
        });
      } else {
        if (message) {
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
            setEmoji("");
            setEmojiShow(false);
          });
        } else if (emoji) {
          set(push(ref(db, "singleMessage")), {
            whoSendId: auth.currentUser.uid,
            whoSendName: auth.currentUser.displayName,
            whoReceiveName: activeChatData.name,
            whoReceiveId: activeChatData.id,
            emoji: emoji,
            date: `${new Date().getFullYear()}/${
              new Date().getMonth() + 1
            }/${new Date().getDate()}, ${new Date().getHours()}:${new Date().getMinutes()}`,
          }).then(() => {
            setMessage("");
            setEmoji("");
            setEmojiShow(false);
          });
        }
      }
    }
  };

  //handle Emoji
  let handleEmoji = (e) => {
    setMessage(message + e.emoji);
    setEmoji(emoji + e.emoji);
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
          arr.push({ ...item.val(), sMsgDelKey: item.key });
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
        arr.push({ ...item.val(), gMsgDelKey: item.key });
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

  //Audio Recorder
  const recorderControls = useAudioRecorder();
  const addAudioElement = (blob) => {
    const url = URL.createObjectURL(blob);
    setAudioData(blob);
    setAudio(url);
  };

  // hadle Audio Send
  let hadleAudioSend = () => {
    const audioSendRef = sref(storage, "chatAudio/" + Math.random());
    uploadBytes(audioSendRef, audiodata).then((snapshot) => {
      getDownloadURL(audioSendRef).then((downloadURL) => {
        console.log("File available at", downloadURL);
        if (activeChatData.status == "group") {
          set(push(ref(db, "groupMessage")), {
            whoSendId: auth.currentUser.uid,
            whoSendName: auth.currentUser.displayName,
            whoReceiveName: activeChatData.name,
            whoReceiveId: activeChatData.groupId,
            audio: downloadURL,
            date: `${new Date().getFullYear()}/${
              new Date().getMonth() + 1
            }/${new Date().getDate()}, ${new Date().getHours()}:${new Date().getMinutes()}`,
          }).then(() => {
            setAudio("");
          });
        } else {
          set(push(ref(db, "singleMessage")), {
            whoSendId: auth.currentUser.uid,
            whoSendName: auth.currentUser.displayName,
            whoReceiveName: activeChatData.name,
            whoReceiveId: activeChatData.id,
            audio: downloadURL,
            date: `${new Date().getFullYear()}/${
              new Date().getMonth() + 1
            }/${new Date().getDate()}, ${new Date().getHours()}:${new Date().getMinutes()}`,
          }).then(() => {
            setAudio("");
          });
        }
      });
    });
  };

  // handle Message Delete
  let handleMessageDelete = (id) => {
    remove(ref(db, "groupMessage/" + id));
    remove(ref(db, "singleMessage/" + id));
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
                          <div className="relative">
                            <p className="relative py-3 px-6 ml-10 md:ml-16 lg:ml-20 mr-3 bg-primary text-white rounded-lg inline-block font-pop font-medium after:absolute after:bottom-0 after:-right-3 after:content-[''] after:w-5 after:h-6 after:clip-path-rightpolygon after:bg-primary">
                              {item.message}
                            </p>
                            <RiDeleteBin5Line
                              onClick={() =>
                                handleMessageDelete(item.gMsgDelKey)
                              }
                              className="absolute top-1/2 -translate-y-1/2 left-14 text-primary text-xl cursor-pointer"
                            />
                          </div>
                          <p className="flex justify-end font-pop font-medium text-gray text-xs pr-2 mt-1">
                            {moment(item.date).calendar()}
                          </p>
                        </div>
                      </div>
                    )
                  : item.audio
                  ? item.whoReceiveId == activeChatData.groupId && (
                      <div className="mt-5 flex justify-end">
                        <div>
                          <div className="relative">
                            <p className="relative mr-3 p-1.5 bg-primary rounded-lg inline-block after:absolute after:bottom-0 after:-right-3 after:content-[''] after:w-[18px] after:h-6 after:clip-path-rightpolygon after:bg-primary">
                              <audio
                                controls
                                src={item.audio}
                                className="rounded-lg w-[225px] sml:w-[300px]"
                              ></audio>
                            </p>
                            <RiDeleteBin5Line
                              onClick={() =>
                                handleMessageDelete(item.gMsgDelKey)
                              }
                              className="absolute top-1/2 -translate-y-1/2 -left-6 text-primary text-xl cursor-pointer"
                            />
                          </div>
                          <p className="flex justify-end font-pop font-medium text-gray text-xs pr-2 mt-1">
                            {moment(item.date).calendar()}
                          </p>
                        </div>
                      </div>
                    )
                  : item.whoReceiveId == activeChatData.groupId && (
                      <div className="mt-5 flex justify-end">
                        <div>
                          <div className="relative">
                            <picture className="relative p-2 ml-10 md:ml-16 lg:ml-20 mr-3 bg-primary rounded-lg inline-block after:absolute after:bottom-0 after:-right-3 after:content-[''] after:w-5 after:h-6 after:clip-path-rightpolygon after:bg-primary">
                              <img src={item.image} alt="chat" />
                            </picture>
                            <RiDeleteBin5Line
                              onClick={() =>
                                handleMessageDelete(item.gMsgDelKey)
                              }
                              className="absolute top-1/2 -translate-y-1/2 left-14 text-primary text-xl cursor-pointer"
                            />
                          </div>
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
                : item.audio
                ? item.whoReceiveId == activeChatData.groupId && (
                    <div className="mt-5">
                      <p className="font-pop font-medium text-gray text-sm pl-4 mb-1">
                        {item.whoSendName}
                      </p>
                      <p className="relative p-1.5 ml-3 bg-lightwhite rounded-lg inline-block after:absolute after:bottom-0 after:-left-3 after:content-[''] after:w-[18px] after:h-6 after:clip-path-leftpolygon after:bg-lightwhite">
                        <audio
                          controls
                          src={item.audio}
                          className="rounded-lg w-[225px] sml:w-[300px]"
                        ></audio>
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
                      <div className="relative">
                        <p className="relative py-3 px-6 ml-10 md:ml-16 lg:ml-20 mr-3 bg-primary text-white rounded-lg inline-block font-pop font-medium after:absolute after:bottom-0 after:-right-3 after:content-[''] after:w-5 after:h-6 after:clip-path-rightpolygon after:bg-primary">
                          {item.message}
                        </p>
                        <RiDeleteBin5Line
                          onClick={() => handleMessageDelete(item.sMsgDelKey)}
                          className="absolute top-1/2 -translate-y-1/2 left-14 text-primary text-xl cursor-pointer"
                        />
                      </div>
                      <p className="flex justify-end font-pop font-medium text-gray text-xs pr-2 mt-1">
                        {moment(item.date).calendar()}
                      </p>
                    </div>
                  </div>
                ) : item.emoji ? (
                  <div className="mt-5 flex justify-end">
                    <div>
                      <div className="relative">
                        <p className=" ml-10 md:ml-16 lg:ml-20 mr-3 text-3xl md:text-4xl inline-block !leading-snug">
                          {item.emoji}
                        </p>
                        <RiDeleteBin5Line
                          onClick={() => handleMessageDelete(item.sMsgDelKey)}
                          className="absolute top-1/2 -translate-y-1/3 left-14 text-primary text-xl cursor-pointer"
                        />
                      </div>
                      <p className="flex justify-end font-pop font-medium text-gray text-xs pr-2 mt-1.5">
                        {moment(item.date).calendar()}
                      </p>
                    </div>
                  </div>
                ) : item.audio ? (
                  <div className="mt-5 flex justify-end">
                    <div>
                      <div className="relative">
                        <p className="relative mr-3 p-1.5 bg-primary rounded-lg inline-block after:absolute after:bottom-0 after:-right-3 after:content-[''] after:w-[18px] after:h-6 after:clip-path-rightpolygon after:bg-primary">
                          <audio
                            controls
                            src={item.audio}
                            className="rounded-lg w-[225px] sml:w-[300px]"
                          ></audio>
                        </p>
                        <RiDeleteBin5Line
                          onClick={() => handleMessageDelete(item.sMsgDelKey)}
                          className="absolute top-1/2 -translate-y-1/2 -left-6 text-primary text-xl cursor-pointer"
                        />
                      </div>
                      <p className="flex justify-end font-pop font-medium text-gray text-xs pr-2 mt-1">
                        {moment(item.date).calendar()}
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="mt-5 flex justify-end">
                    <div>
                      <div className="relative">
                        <picture className="relative p-2 ml-10 md:ml-16 lg:ml-20 mr-3 bg-primary rounded-lg inline-block after:absolute after:bottom-0 after:-right-3 after:content-[''] after:w-5 after:h-6 after:clip-path-rightpolygon after:bg-primary">
                          <img src={item.image} alt="chat" />
                        </picture>
                        <RiDeleteBin5Line
                          onClick={() => handleMessageDelete(item.sMsgDelKey)}
                          className="absolute top-1/2 -translate-y-1/2 left-14 text-primary text-xl cursor-pointer"
                        />
                      </div>
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
              ) : item.audio ? (
                <div className="mt-5">
                  <p className="relative p-1.5 ml-3 bg-lightwhite rounded-lg inline-block after:absolute after:bottom-0 after:-left-3 after:content-[''] after:w-[18px] after:h-6 after:clip-path-leftpolygon after:bg-lightwhite">
                    <audio
                      controls
                      src={item.audio}
                      className="rounded-lg w-[225px] sml:w-[300px]"
                    ></audio>
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
        <div className="absolute bottom-32 md:left-8">
          {audio && (
            <div className="flex flex-col sml:flex-row lg:!flex-col xl:!flex-row gap-x-2 w-[225px] md:w-auto">
              <audio controls src={audio} className="rounded-md"></audio>
              <div className="flex gap-x-2 mt-2 sml:mt-0 lg:!mt-2 xl:!mt-0 h-10 sml:h-auto lg:!h-10 xl:!h-auto">
                <button className="my_btn">
                  <RiSendPlaneFill
                    onClick={hadleAudioSend}
                    className="text-2xl mx-auto"
                  />
                </button>
                <button
                  onClick={() => setAudio("")}
                  className="my_btn !bg-red-500 !border-red-500"
                >
                  <RiDeleteBin5Line className="text-2xl mx-auto" />
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="w-[88%] sml:w-[90%] relative">
          <input
            onClick={() => setEmojiShow(false)}
            onChange={handleMessage}
            value={message}
            type="text"
            placeholder="Write Your Message"
            className="py-3 sml:py-3.5 pl-8 sml:pl-11 pr-[60px] sml:pr-[72px] bg-lightwhite text-black font-pop font-medium rounded-lg w-full border-2 border-solid border-transparent focus:border-primary outline-none"
          />
          <HiOutlinePhotograph
            onClick={() => setSendImageShow(true)}
            className="absolute top-3.5 left-2 sml:left-3 text-2xl sml:text-3xl cursor-pointer text-primary"
          />
          <FaRegSmile
            onClick={() => setEmojiShow(!emojishow)}
            className="absolute top-[17px] right-9 sml:right-11 text-xl sml:text-2xl cursor-pointer text-primary"
          />
          <BsFillMicFill className="absolute top-[17px] right-2.5 text-xl sml:text-2xl cursor-pointer text-primary" />
          <div className="absolute top-[3.5px] sml:top-[5.5px] right-0.5 sml:right-0.5">
            <AudioRecorder
              onRecordingComplete={(blob) => addAudioElement(blob)}
              recorderControls={recorderControls}
            />
          </div>
        </div>
        <div className="flex w-[12%] sml:w-[10%]">
          <button onClick={handleMessageSend} className="my_btn">
            <RiSendPlaneFill className="text-3xl sml:text-4xl lg:!text-3xl xl:!text-4xl mx-auto" />
          </button>
        </div>
      </div>
      {emojishow && (
        <>
          <div className="absolute bottom-24 left-4 md:left-8 z-10">
            <EmojiPicker onEmojiClick={handleEmoji} />
            {/* <EmojiPicker onEmojiClick={(e) => setMessage(message + e.emoji)} /> */}
          </div>
          <ImCross
            onClick={() => setEmojiShow(false)}
            className="absolute bottom-[122px] left-[265px] md:left-[350px] lg:left-[280px] xl:left-[350px] text-primary cursor-pointer z-10"
          />
        </>
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
