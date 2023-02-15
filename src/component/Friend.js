import React from "react";
import { BiDotsVerticalRounded, BiMessageDetail } from "react-icons/bi";
import SimpleBar from "simplebar-react";
import { useEffect, useState } from "react";
import {
  getDatabase,
  ref,
  onValue,
  set,
  push,
  remove,
} from "firebase/database";
import { getAuth } from "firebase/auth";
import { useDispatch } from "react-redux";
import { activeChat } from "../slices/activeChat";

const Friend = (props) => {
  //Authentication
  const auth = getAuth();
  //data base
  const db = getDatabase();
  //react redux
  let dispatch = useDispatch();
  //friend request
  let [friends, setFriends] = useState([]);

  //friend
  useEffect(() => {
    const friendsRef = ref(db, "friends");
    onValue(friendsRef, (snapshot) => {
      let arr = [];
      snapshot.forEach((item) => {
        if (
          auth.currentUser.uid == item.val().receiverId ||
          auth.currentUser.uid == item.val().senderId
        ) {
          arr.push({ ...item.val(), id: item.key });
        }
      });
      setFriends(arr);

      // active Chat null fixed
      let userInfo = {};
      if (arr[0].receiverId == auth.currentUser.uid) {
        userInfo.status = "single";
        userInfo.id = arr[0].senderId;
        userInfo.name = arr[0].senderName;
        userInfo.photo = arr[0].senderPhoto;
      } else {
        userInfo.status = "single";
        userInfo.id = arr[0].receiverId;
        userInfo.name = arr[0].receiverName;
        userInfo.photo = arr[0].receiverPhoto;
      }
      dispatch(activeChat(userInfo));
    });
  }, []);

  //handle block
  let handleBlock = (item) => {
    auth.currentUser.uid == item.senderId
      ? set(push(ref(db, "blockUsers")), {
          block: item.receiverName,
          blockId: item.receiverId,
          blockPhoto: item.receiverPhoto,
          blockBy: item.senderName,
          blockById: item.senderId,
          blockByPhoto: item.senderPhoto,
        }).then(() => {
          remove(ref(db, "friends/" + item.id));
        })
      : set(push(ref(db, "blockUsers")), {
          block: item.senderName,
          blockId: item.senderId,
          blockPhoto: item.senderPhoto,
          blockBy: item.receiverName,
          blockById: item.receiverId,
          blockByPhoto: item.receiverPhoto,
        }).then(() => {
          remove(ref(db, "friends/" + item.id));
        });
  };

  //handle Unfriend
  let handleUnfriend = (item) => {
    remove(ref(db, "friends/" + item.id));
  };

  //handle Active Chat
  let handleActiveChat = (item) => {
    let userInfo = {};
    if (item.receiverId == auth.currentUser.uid) {
      userInfo.status = "single";
      userInfo.id = item.senderId;
      userInfo.name = item.senderName;
      userInfo.photo = item.senderPhoto;
    } else {
      userInfo.status = "single";
      userInfo.id = item.receiverId;
      userInfo.name = item.receiverName;
      userInfo.photo = item.receiverPhoto;
    }
    dispatch(activeChat(userInfo));
  };

  return (
    <div
      style={{ marginTop: props.marginT }}
      className="mt-10 lg:mt-0 py-5 px-1 border border-solid border-gray/25 rounded-3xl shadow-[0_4px_4px_rgba(0,0,0,0.25)] overflow-hidden"
    >
      <div className="flex justify-between px-4 pb-2.5 border-b-2 border-solid border-gray/40">
        <h2 className="font-pop font-semibold text-xl text-black">Friends</h2>
        <BiDotsVerticalRounded className="text-3xl cursor-pointer text-primary" />
      </div>
      <SimpleBar className="h-[385px] px-4 pt-5">
        {friends.length == 0 ? (
          <p className="p-2.5 bg-primary text-white text-lg font-pop font-semibold text-center rounded-md capitalize">
            You Have No Friend.
          </p>
        ) : (
          friends.map((item) => (
            <div
              onClick={() => handleActiveChat(item)}
              className="flex items-center justify-between border-b border-solid border-gray pb-4 mb-4 last:pb-0 last:mb-0 last:border-b-0 cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <div className="w-[70px] h-[70px] rounded-full overflow-hidden">
                  <picture>
                    <img
                      className="bg-primary text-white h-full w-full"
                      src={
                        auth.currentUser.uid == item.senderId
                          ? item.receiverPhoto
                          : item.senderPhoto
                      }
                      alt="Profile"
                    />
                  </picture>
                </div>
                <div>
                  <h3 className="font-pop text-lg text-black font-semibold">
                    {auth.currentUser.uid == item.senderId ? (
                      <p>{item.receiverName}</p>
                    ) : (
                      <p>{item.senderName}</p>
                    )}
                  </h3>
                  <p className="font-pop text-sm text-gray font-medium">
                    {item.date}
                  </p>
                </div>
              </div>
              <div className="flex flex-col ">
                {props.block ? (
                  <>
                    <button
                      onClick={() => handleBlock(item)}
                      className="my_btn"
                    >
                      Block
                    </button>
                    <button
                      onClick={() => handleUnfriend(item)}
                      className="my_btn !bg-red-500 !border-red-500 mt-1"
                    >
                      Unfriend
                    </button>
                  </>
                ) : (
                  <button className="my_btn !py-1 !px-2">
                    <BiMessageDetail className="text-3xl" />
                  </button>
                )}
              </div>
            </div>
          ))
        )}
      </SimpleBar>
    </div>
  );
};

export default Friend;
