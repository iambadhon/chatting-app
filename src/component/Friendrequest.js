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

const Friendrequest = () => {
  //Authentication
  const auth = getAuth();
  //data base
  const db = getDatabase();
  //friend request
  let [friendrequest, setFriendRequest] = useState([]);

  //friend request
  useEffect(() => {
    const friendRequestRef = ref(db, "friendRequest/");
    onValue(friendRequestRef, (snapshot) => {
      let arr = [];
      snapshot.forEach((item) => {
        if (item.val().receiverId == auth.currentUser.uid) {
          arr.push({ ...item.val(), id: item.key });
        }
      });
      setFriendRequest(arr);
    });
  }, []);

  //handle Accecpt Friend Request
  let handleAccecptFriendRequest = (item) => {
    set(push(ref(db, "friends")), {
      id: item.id,
      senderName: item.senderName,
      senderId: item.senderId,
      receiverName: item.receiverName,
      receiverId: item.receiverId,
      date: `${new Date().getDate()}/${
        new Date().getMonth() + 1
      }/${new Date().getFullYear()}`,
    }).then(() => {
      remove(ref(db, "friendRequest/" + item.id));
    });
  };

  return (
    <div className="mt-10 lg:mt-11 py-5 px-1 border border-solid border-gray/25 rounded-3xl shadow-[0_4px_4px_rgba(0,0,0,0.25)] overflow-hidden">
      <div className="flex justify-between px-4 pb-2.5 border-b-2 border-solid border-gray/40">
        <h2 className="font-pop font-semibold text-xl text-black">
          Friend Request
        </h2>
        <BiDotsVerticalRounded className="text-3xl cursor-pointer text-primary" />
      </div>
      <SimpleBar className="h-[380px] px-4 pt-5">
        {friendrequest.map((item) => (
          <div className="flex items-center justify-between border-b border-solid border-gray pb-4 mb-4 last:pb-0 last:mb-0 last:border-b-0">
            <div className="flex items-center gap-2">
              <div className="w-[70px] h-[70px] rounded-full overflow-hidden">
                <picture>
                  <img
                    className="bg-primary text-white h-full w-full"
                    src={item.photoURL}
                    alt="Profile"
                  />
                </picture>
              </div>
              <div>
                <h3 className="font-pop text-lg text-black font-semibold">
                  {item.senderName}
                </h3>
                <p className="font-pop text-sm text-gray font-medium">
                  {item.date}
                </p>
              </div>
            </div>
            <div>
              <button
                onClick={() => handleAccecptFriendRequest(item)}
                className="my_btn"
              >
                Accecpt
              </button>
            </div>
          </div>
        ))}
      </SimpleBar>
    </div>
  );
};

export default Friendrequest;
