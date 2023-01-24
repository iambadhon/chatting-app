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
  //Read data
  const db = getDatabase();
  //Block User
  let [blockuser, setBlockUser] = useState([]);

  //friend request
  useEffect(() => {
    const usersRef = ref(db, "blockusers");
    onValue(usersRef, (snapshot) => {
      let arr = [];
      snapshot.forEach((item) => {
        if (item.val().blockbyid == auth.currentUser.uid) {
          arr.push({
            id: item.key,
            block: item.val().block,
            blockid: item.val().blockid,
            date: `${new Date().getDate()}/${
              new Date().getMonth() + 1
            }/${new Date().getFullYear()}`,
          });
        } else {
          arr.push({
            id: item.key,
            block: item.val().blockby,
            blockbyid: item.val().blockbyid,
            date: `${new Date().getDate()}/${
              new Date().getMonth() + 1
            }/${new Date().getFullYear()}`,
          });
        }
      });
      setBlockUser(arr);
    });
  }, []);

  //handle Unblock
  let handleUnblock = (item) => {
    set(push(ref(db, "friends")), {
      sendername: item.block,
      senderid: item.blockid,
      receivername: auth.currentUser.displayName,
      receiverid: auth.currentUser.uid,
      date: `${new Date().getDate()}/${
        new Date().getMonth() + 1
      }/${new Date().getFullYear()}`,
    }).then(() => {
      remove(ref(db, "blockusers/" + item.id));
    });
  };

  return (
    <div className="mt-10 lg:mt-11 mb-20 md:mb-24 lg:mb-0 py-5 px-1 border border-solid border-gray/25 rounded-3xl shadow-[0_4px_4px_rgba(0,0,0,0.25)] overflow-hidden">
      <div className="flex justify-between px-4 pb-2.5 border-b-2 border-solid border-gray/40">
        <h2 className="font-pop font-semibold text-xl text-black">
          Blocked Users
        </h2>
        <a href="#">
          <BiDotsVerticalRounded className="text-3xl cursor-pointer text-primary" />
        </a>
      </div>
      <SimpleBar className="h-[380px] px-4 pt-5">
        {blockuser.map((item) => (
          <div className="flex items-center justify-between border-b border-solid border-gray pb-4 mb-4 last:pb-0 last:mb-0 last:border-b-0">
            <div className="flex items-center gap-2">
              <picture className="w-[70px] h-[70px] rounded-full overflow-hidden">
                <img src="images/profile.png" alt="Profile" />
              </picture>
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
              {!item.blockbyid && (
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
