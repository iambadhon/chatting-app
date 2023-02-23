import React from "react";
import { BiMessageDetail } from "react-icons/bi";
import { ImCross } from "react-icons/im";
import { FiSearch } from "react-icons/fi";
import SimpleBar from "simplebar-react";
import Search from "./Search";
import { useState, useEffect } from "react";
import { getDatabase, ref, onValue } from "firebase/database";
import { getAuth } from "firebase/auth";
import { useDispatch } from "react-redux";
import { activeChat } from "../slices/activeChat";

const Joinedgrouplist = () => {
  //Authentication
  const auth = getAuth();
  //data base
  const db = getDatabase();
  //react redux
  let dispatch = useDispatch();
  //my group list
  let [mygrouplist, setMyGroupList] = useState([]);
  //joined group list
  let [joinedgrouplist, setJoinedGroupList] = useState([]);
  //search user
  let [searchuser, setSearchUser] = useState([]);
  //search show
  let [searchshow, setSearchShow] = useState(false);

  //my group list
  useEffect(() => {
    const groupsRef = ref(db, "groups");
    onValue(groupsRef, (snapshot) => {
      let arr = [];
      snapshot.forEach((item) => {
        if (item.val().adminId == auth.currentUser.uid) {
          arr.push({ ...item.val(), groupId: item.key });
        }
      });
      setMyGroupList(arr);

      // active Chat null fixed
      // let userInfo = {
      //   status: "group",
      //   name: arr[0].groupName,
      //   groupId: arr[0].groupId,
      // };
      // dispatch(activeChat(userInfo));
    });
  }, []);

  //joined group list
  useEffect(() => {
    const groupMembersRef = ref(db, "groupMembers");
    onValue(groupMembersRef, (snapshot) => {
      let arr = [];
      snapshot.forEach((item) => {
        if (auth.currentUser.uid == item.val().userId) {
          arr.push(item.val());
        }
      });
      setJoinedGroupList(arr);
    });
  }, []);

  //handle Active Chat
  let handleActiveChat = (item) => {
    let userInfo = {
      status: "group",
      name: item.groupName,
      groupId: item.groupId,
      photo: item.photoURL,
    };
    dispatch(activeChat(userInfo));
  };

  //handle Search
  let handleSearch = (e) => {
    let arr = [];
    joinedgrouplist.filter((item) => {
      if (e.target.value != "") {
        if (
          item.groupName.toLowerCase().includes(e.target.value.toLowerCase())
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
    <div className="py-2.5 px-1 border border-solid border-gray/25 rounded-3xl shadow-[0_4px_4px_rgba(0,0,0,0.25)] overflow-hidden">
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
            Joined Groups
          </h2>
          <FiSearch
            onClick={handleSearchShow}
            className="text-2xl cursor-pointer text-primary"
          />
        </div>
      )}
      <SimpleBar className="h-[385px] px-4 pt-5">
        {mygrouplist.map((item) => (
          <div
            onClick={() => handleActiveChat(item)}
            className="flex items-center justify-between border-b border-solid border-gray pb-4 mb-4 last:pb-0 last:mb-0 last:border-b-0 cursor-pointer"
          >
            <div className="flex items-center gap-2">
              <div className="w-[70px] h-[70px] rounded-full overflow-hidden">
                <picture>
                  <img
                    className="bg-primary text-white h-full w-full"
                    src="images/profile.png"
                    alt="Profile"
                  />
                </picture>
              </div>
              <div>
                <h3 className="font-pop text-lg text-black font-semibold">
                  {item.groupName}
                </h3>
                <p className="font-pop text-sm text-gray font-medium">
                  {item.groupTagline}
                </p>
                <p className="font-pop text-xs text-gray font-medium">
                  Admin:
                  <span className="pl-1">{item.adminName}</span>
                </p>
              </div>
            </div>
            <div>
              <button className="my_btn !py-1 !px-2">
                <BiMessageDetail className="text-3xl" />
              </button>
            </div>
          </div>
        ))}
        {searchuser.length > 0
          ? searchuser.map((item) => (
              <div
                onClick={() => handleActiveChat(item)}
                className="flex items-center justify-between border-b border-solid border-gray pb-4 mb-4 last:pb-0 last:mb-0 last:border-b-0 cursor-pointer"
              >
                <div className="flex items-center gap-2">
                  <div className="w-[70px] h-[70px] rounded-full overflow-hidden">
                    <picture>
                      <img
                        className="bg-primary text-white h-full w-full"
                        src="images/profile.png"
                        alt="Profile"
                      />
                    </picture>
                  </div>
                  <div>
                    <h3 className="font-pop text-lg text-black font-semibold">
                      {item.groupName}
                    </h3>
                    <p className="font-pop text-sm text-gray font-medium">
                      {item.groupTagline}
                    </p>
                    <p className="font-pop text-xs text-gray font-medium">
                      Admin:
                      <span className="pl-1">{item.adminName}</span>
                    </p>
                  </div>
                </div>
                <div>
                  <button className="my_btn !py-1 !px-2">
                    <BiMessageDetail className="text-3xl" />
                  </button>
                </div>
              </div>
            ))
          : joinedgrouplist.map((item) => (
              <div
                onClick={() => handleActiveChat(item)}
                className="flex items-center justify-between border-b border-solid border-gray pb-4 mb-4 last:pb-0 last:mb-0 last:border-b-0 cursor-pointer"
              >
                <div className="flex items-center gap-2">
                  <div className="w-[70px] h-[70px] rounded-full overflow-hidden">
                    <picture>
                      <img
                        className="bg-primary text-white h-full w-full"
                        src="images/profile.png"
                        alt="Profile"
                      />
                    </picture>
                  </div>
                  <div>
                    <h3 className="font-pop text-lg text-black font-semibold">
                      {item.groupName}
                    </h3>
                    <p className="font-pop text-sm text-gray font-medium">
                      {item.groupTagline}
                    </p>
                    <p className="font-pop text-xs text-gray font-medium">
                      Admin:
                      <span className="pl-1">{item.adminName}</span>
                    </p>
                  </div>
                </div>
                <div>
                  <button className="my_btn !py-1 !px-2">
                    <BiMessageDetail className="text-3xl" />
                  </button>
                </div>
              </div>
            ))}
      </SimpleBar>
    </div>
  );
};

export default Joinedgrouplist;
