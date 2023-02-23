import React from "react";
import { ImCross } from "react-icons/im";
import { FiSearch } from "react-icons/fi";
import SimpleBar from "simplebar-react";
import { useEffect, useState } from "react";
import { getDatabase, ref, onValue, set, push } from "firebase/database";
import { getAuth } from "firebase/auth";
import Search from "./Search";

const Userlist = () => {
  //Authentication
  const auth = getAuth();
  //data base
  const db = getDatabase();
  //users list
  let [userslist, setUsersList] = useState([]);
  //friend request
  let [friendrequest, setFriendRequest] = useState([]);
  //friends list
  let [friendlist, setFriendList] = useState([]);
  //block list
  let [blocklist, setBlockList] = useState([]);
  //search user
  let [searchuser, setSearchUser] = useState([]);
  //search show
  let [searchshow, setSearchShow] = useState(false);

  useEffect(() => {
    const usersRef = ref(db, "users/");
    onValue(usersRef, (snapshot) => {
      let arr = [];
      snapshot.forEach((item) => {
        if (item.key !== auth.currentUser.uid) {
          arr.push({ ...item.val(), id: item.key });
        }
      });
      setUsersList(arr);
    });
  }, []);

  //handle Friend Request
  let handleFriendRequest = (item) => {
    set(push(ref(db, "friendRequest")), {
      senderName: auth.currentUser.displayName,
      senderId: auth.currentUser.uid,
      senderPhoto: auth.currentUser.photoURL,
      receiverName: item.name,
      receiverId: item.id,
      receiverPhoto: item.photoURL,
      date: `${new Date().getDate()}/${
        new Date().getMonth() + 1
      }/${new Date().getFullYear()}`,
    });
  };

  useEffect(() => {
    const friendRequestRef = ref(db, "friendRequest");
    onValue(friendRequestRef, (snapshot) => {
      let arr = [];
      snapshot.forEach((item) => {
        arr.push(item.val().receiverId + item.val().senderId);
      });
      setFriendRequest(arr);
    });
  }, []);

  //friends list
  useEffect(() => {
    const friendsRef = ref(db, "friends");
    onValue(friendsRef, (snapshot) => {
      let arr = [];
      snapshot.forEach((item) => {
        arr.push(item.val().receiverId + item.val().senderId);
      });
      setFriendList(arr);
    });
  }, []);

  //block user
  useEffect(() => {
    const blockUsersRef = ref(db, "blockUsers");
    onValue(blockUsersRef, (snapshot) => {
      let arr = [];
      snapshot.forEach((item) => {
        arr.push(item.val().blockId + item.val().blockById);
      });
      setBlockList(arr);
    });
  }, []);

  //handle Search
  let handleSearch = (e) => {
    let arr = [];
    userslist.filter((item) => {
      if (e.target.value != "") {
        if (item.name.toLowerCase().includes(e.target.value.toLowerCase())) {
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
    <div className="mt-10 lg:mt-11 xl:mt-0 py-2.5 px-1 border border-solid border-gray/25 rounded-3xl shadow-[0_4px_4px_rgba(0,0,0,0.25)] overflow-hidden">
      {searchshow ? (
        <div className="pb-1.5 border-b-2 border-solid border-gray/40 relative">
          <Search type={handleSearch} />
          <ImCross
            onClick={handleSearchHide}
            className="absolute top-4 right-4 text-md cursor-pointer text-primary"
          />
        </div>
      ) : (
        <div className="flex justify-between items-center px-4 py-3.5 border-b-2 border-solid border-gray/40">
          <h2 className="font-pop font-semibold text-xl text-black">
            User List
          </h2>
          <FiSearch
            onClick={handleSearchShow}
            className="text-2xl cursor-pointer text-primary"
          />
        </div>
      )}

      <SimpleBar className="h-[385px] px-4 pt-5">
        {searchuser.length > 0
          ? searchuser.map((item) => (
              <div className="flex items-center justify-between border-b border-solid border-gray pb-4 mb-4 last:pb-0 last:mb-0 last:border-b-0">
                <div className="flex items-center gap-2">
                  <div className="w-[70px] h-[70px] rounded-full overflow-hidden">
                    <picture>
                      <img
                        className="w-full h-full bg-primary text-white"
                        src={item.photoURL}
                        alt="Profile"
                      />
                    </picture>
                  </div>
                  <div>
                    <h3 className="font-pop text-lg text-black font-semibold">
                      {item.name}
                    </h3>
                    <p className="font-pop text-sm text-gray font-medium">
                      {item.date}
                    </p>
                  </div>
                </div>
                <div>
                  {friendlist.includes(item.id + auth.currentUser.uid) ||
                  friendlist.includes(auth.currentUser.uid + item.id) ? (
                    <button className="my_btn">Friend</button>
                  ) : friendrequest.includes(item.id + auth.currentUser.uid) ||
                    friendrequest.includes(auth.currentUser.uid + item.id) ? (
                    <button className="my_btn">Pending</button>
                  ) : blocklist.includes(item.id + auth.currentUser.uid) ||
                    blocklist.includes(auth.currentUser.uid + item.id) ? (
                    <button className="my_btn">Blocked</button>
                  ) : (
                    <button
                      onClick={() => handleFriendRequest(item)}
                      className="my_btn"
                    >
                      Add Friend
                    </button>
                  )}
                </div>
              </div>
            ))
          : userslist.map((item) => (
              <div className="flex items-center justify-between border-b border-solid border-gray pb-4 mb-4 last:pb-0 last:mb-0 last:border-b-0">
                <div className="flex items-center gap-2">
                  <div className="w-[70px] h-[70px] rounded-full overflow-hidden">
                    <picture>
                      <img
                        className="w-full h-full bg-primary text-white"
                        src={item.photoURL}
                        alt="Profile"
                      />
                    </picture>
                  </div>
                  <div>
                    <h3 className="font-pop text-lg text-black font-semibold">
                      {item.name}
                    </h3>
                    <p className="font-pop text-sm text-gray font-medium">
                      {item.date}
                    </p>
                  </div>
                </div>
                <div>
                  {friendlist.includes(item.id + auth.currentUser.uid) ||
                  friendlist.includes(auth.currentUser.uid + item.id) ? (
                    <button className="my_btn">Friend</button>
                  ) : friendrequest.includes(item.id + auth.currentUser.uid) ||
                    friendrequest.includes(auth.currentUser.uid + item.id) ? (
                    <button className="my_btn">Pending</button>
                  ) : blocklist.includes(item.id + auth.currentUser.uid) ||
                    blocklist.includes(auth.currentUser.uid + item.id) ? (
                    <button className="my_btn">Blocked</button>
                  ) : (
                    <button
                      onClick={() => handleFriendRequest(item)}
                      className="my_btn"
                    >
                      Add Friend
                    </button>
                  )}
                </div>
              </div>
            ))}
      </SimpleBar>
    </div>
  );
};

export default Userlist;
