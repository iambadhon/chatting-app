import React from "react";
import { ImCross } from "react-icons/im";
import { FiSearch } from "react-icons/fi";
import SimpleBar from "simplebar-react";
import { useEffect, useState } from "react";
import Search from "./Search";
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
  //search user
  let [searchuser, setSearchUser] = useState([]);
  //search show
  let [searchshow, setSearchShow] = useState(false);

  //friend request
  useEffect(() => {
    const friendRequestRef = ref(db, "friendRequest");
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
      senderPhoto: item.senderPhoto,
      receiverName: item.receiverName,
      receiverId: item.receiverId,
      receiverPhoto: item.receiverPhoto,
      date: `${new Date().getDate()}/${
        new Date().getMonth() + 1
      }/${new Date().getFullYear()}`,
    }).then(() => {
      remove(ref(db, "friendRequest/" + item.id));
    });
  };

  //handle Reject Friend Request
  let handleRejectFriendRequest = (item) => {
    remove(ref(db, "friendRequest/" + item.id));
  };

  //handle Search
  let handleSearch = (e) => {
    let arr = [];
    friendrequest.filter((item) => {
      if (e.target.value != "") {
        if (
          item.receiverName
            .toLowerCase()
            .includes(e.target.value.toLowerCase()) ||
          item.senderName.toLowerCase().includes(e.target.value.toLowerCase())
        ) {
          arr.push(item);
        }
      } else {
        arr = [];
      }
      setSearchUser(arr);
    });
  };

  //handle Search Show
  let handleSearchShow = () => {
    setSearchShow(true);
  };

  //handle Search Hide
  let handleSearchHide = () => {
    setSearchShow(false);
    setSearchUser([]);
  };

  return (
    <div className="mt-10 lg:mt-11 py-2.5 px-1 border border-solid border-gray/25 rounded-3xl shadow-[0_4px_4px_rgba(0,0,0,0.25)] overflow-hidden">
      {searchshow ? (
        <div className="pb-1.5 border-b-2 border-solid border-gray/40 relative">
          <Search type={handleSearch} />
          <ImCross
            onClick={handleSearchHide}
            className="absolute top-4 right-4 text-md cursor-pointer text-primary"
          />
        </div>
      ) : (
        <div className="flex justify-between items-center  px-4 py-3.5 border-b-2 border-solid border-gray/40">
          <h2 className="font-pop font-semibold text-xl text-black">
            Friend Request
          </h2>
          <FiSearch
            onClick={handleSearchShow}
            className="text-2xl cursor-pointer text-primary"
          />
        </div>
      )}
      <SimpleBar className="h-[380px] px-4 pt-5">
        {searchuser.length > 0 ? (
          searchuser.map((item) => (
            <div className="flex items-center justify-between border-b border-solid border-gray pb-4 mb-4 last:pb-0 last:mb-0 last:border-b-0">
              <div className="flex items-center gap-2">
                <div className="w-[70px] h-[70px] rounded-full overflow-hidden">
                  <picture>
                    <img
                      className="bg-primary text-white h-full w-full"
                      src={item.senderPhoto}
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
              <div className="flex flex-col">
                <button
                  onClick={() => handleAccecptFriendRequest(item)}
                  className="my_btn"
                >
                  Accept
                </button>
                <button
                  onClick={() => handleRejectFriendRequest(item)}
                  className="my_btn !bg-red-500 !border-red-500 mt-1"
                >
                  Reject
                </button>
              </div>
            </div>
          ))
        ) : friendrequest.length == 0 ? (
          <p className="p-2.5 bg-primary text-white text-lg font-pop font-semibold text-center rounded-md capitalize">
            No Friend Request Available.
          </p>
        ) : (
          friendrequest.map((item) => (
            <div className="flex items-center justify-between border-b border-solid border-gray pb-4 mb-4 last:pb-0 last:mb-0 last:border-b-0">
              <div className="flex items-center gap-2">
                <div className="w-[70px] h-[70px] rounded-full overflow-hidden">
                  <picture>
                    <img
                      className="bg-primary text-white h-full w-full"
                      src={item.senderPhoto}
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
              <div className="flex flex-col">
                <button
                  onClick={() => handleAccecptFriendRequest(item)}
                  className="my_btn"
                >
                  Accept
                </button>
                <button
                  onClick={() => handleRejectFriendRequest(item)}
                  className="my_btn !bg-red-500 !border-red-500 mt-1"
                >
                  Reject
                </button>
              </div>
            </div>
          ))
        )}
      </SimpleBar>
    </div>
  );
};

export default Friendrequest;
