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

const Blockeduser = () => {
  //Authentication
  const auth = getAuth();
  //data base
  const db = getDatabase();
  //Block User
  let [blockuser, setBlockUser] = useState([]);

  //block user
  useEffect(() => {
    const blockUsersRef = ref(db, "blockUsers");
    onValue(blockUsersRef, (snapshot) => {
      let arr = [];
      snapshot.forEach((item) => {
        if (
          item.val().blockId == auth.currentUser.uid ||
          item.val().blockById == auth.currentUser.uid
        ) {
          if (item.val().blockById == auth.currentUser.uid) {
            arr.push({
              id: item.key,
              block: item.val().block,
              blockId: item.val().blockId,
              blockPhoto: item.val().blockPhoto,
              date: `${new Date().getDate()}/${
                new Date().getMonth() + 1
              }/${new Date().getFullYear()}`,
            });
          } else {
            arr.push({
              id: item.key,
              block: item.val().blockBy,
              blockById: item.val().blockById,
              blockPhoto: item.val().blockByPhoto,
              date: `${new Date().getDate()}/${
                new Date().getMonth() + 1
              }/${new Date().getFullYear()}`,
            });
          }
        }
      });
      setBlockUser(arr);
    });
  }, []);

  //handle Unblock
  let handleUnblock = (item) => {
    set(push(ref(db, "friends")), {
      senderName: item.block,
      senderId: item.blockId,
      senderPhoto: item.blockPhoto,
      receiverName: auth.currentUser.displayName,
      receiverId: auth.currentUser.uid,
      receiverPhoto: auth.currentUser.photoURL,
      date: `${new Date().getDate()}/${
        new Date().getMonth() + 1
      }/${new Date().getFullYear()}`,
    }).then(() => {
      remove(ref(db, "blockUsers/" + item.id));
    });
  };

  return (
    <div className="mt-10 lg:mt-11 mb-20 md:mb-24 lg:mb-0 py-5 px-1 border border-solid border-gray/25 rounded-3xl shadow-[0_4px_4px_rgba(0,0,0,0.25)] overflow-hidden">
      <div className="flex justify-between px-4 pb-2.5 border-b-2 border-solid border-gray/40">
        <h2 className="font-pop font-semibold text-xl text-black">
          Blocked Users
        </h2>
        <BiDotsVerticalRounded className="text-3xl cursor-pointer text-primary" />
      </div>
      <SimpleBar className="h-[380px] px-4 pt-5">
        {blockuser.map((item) => (
          <div className="flex items-center justify-between border-b border-solid border-gray pb-4 mb-4 last:pb-0 last:mb-0 last:border-b-0">
            <div className="flex items-center gap-2">
              <div className="w-[70px] h-[70px] rounded-full overflow-hidden">
                <picture>
                  <img
                    className="bg-primary text-white h-full w-full"
                    src={item.blockPhoto}
                    alt="Profile"
                  />
                </picture>
              </div>
              <div>
                <h3 className="font-pop text-lg text-black font-semibold">
                  {item.block}
                </h3>
                <p className="font-pop text-sm text-gray font-medium">
                  {item.date}
                </p>
              </div>
            </div>
            <div>
              {!item.blockById && (
                <button onClick={() => handleUnblock(item)} className="my_btn">
                  Unblock
                </button>
              )}
            </div>
          </div>
        ))}
      </SimpleBar>
    </div>
  );
};

export default Blockeduser;
