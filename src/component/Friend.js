import React from "react";
import { BiDotsVerticalRounded } from "react-icons/bi";
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

const Friend = ({ marginT }) => {
  //Authentication
  const auth = getAuth();
  //Read data
  const db = getDatabase();
  //friend request
  let [friends, setFriends] = useState([]);

  //friend request
  useEffect(() => {
    const usersRef = ref(db, "friends");
    onValue(usersRef, (snapshot) => {
      let arr = [];
      snapshot.forEach((item) => {
        if (
          auth.currentUser.uid == item.val().receiverid ||
          auth.currentUser.uid == item.val().senderid
        ) {
          arr.push({ ...item.val(), id: item.key });
        }
      });
      setFriends(arr);
    });
  }, []);

  //handle block
  let handleBlock = (item) => {
    auth.currentUser.uid == item.senderid
      ? set(push(ref(db, "blockusers")), {
          block: item.receivername,
          blockid: item.receiverid,
          blockby: item.sendername,
          blockbyid: item.senderid,
        }).then(() => {
          remove(ref(db, "friends/" + item.id));
        })
      : set(push(ref(db, "blockusers")), {
          block: item.sendername,
          blockid: item.senderid,
          blockby: item.receivername,
          blockbyid: item.receiverid,
        }).then(() => {
          remove(ref(db, "friends/" + item.id));
        });
  };

  return (
    <div
      style={{ marginTop: `${marginT}` }}
      className="mt-10 lg:mt-0 py-5 px-1 border border-solid border-gray/25 rounded-3xl shadow-[0_4px_4px_rgba(0,0,0,0.25)] overflow-hidden"
    >
      <div className="flex justify-between px-4 pb-2.5 border-b-2 border-solid border-gray/40">
        <h2 className="font-pop font-semibold text-xl text-black">Friends</h2>
        <a href="#">
          <BiDotsVerticalRounded className="text-3xl cursor-pointer text-primary" />
        </a>
      </div>
      <SimpleBar className="h-[385px] px-4 pt-5">
        {friends.map((item) => (
          <div className="flex items-center justify-between border-b border-solid border-gray pb-4 mb-4 last:pb-0 last:mb-0 last:border-b-0">
            <div className="flex items-center gap-2">
              <picture className="w-[70px] h-[70px] rounded-full overflow-hidden">
                <img src="images/profile.png" alt="Profile" />
              </picture>
              <div>
                <h3 className="font-pop text-lg text-black font-semibold">
                  {auth.currentUser.uid == item.senderid ? (
                    <h3>{item.receivername}</h3>
                  ) : (
                    <h3>{item.sendername}</h3>
                  )}
                </h3>
                <p className="font-pop text-sm text-gray font-medium">
                  {item.date}
                </p>
              </div>
            </div>
            <div>
              <button onClick={() => handleBlock(item)} className="my_btn">
                Block
              </button>
            </div>
          </div>
        ))}
      </SimpleBar>
    </div>
  );
};

export default Friend;
