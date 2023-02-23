import React from "react";
import { ImCross } from "react-icons/im";
import { FiSearch } from "react-icons/fi";
import { BiDotsVerticalRounded } from "react-icons/bi";
import SimpleBar from "simplebar-react";
import { useState, useEffect } from "react";
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

const Mygroup = () => {
  //Authentication
  const auth = getAuth();
  //data base
  const db = getDatabase();
  //my group list
  let [mygrouplist, setMyGroupList] = useState([]);
  //member list
  let [memberlist, setMemberList] = useState([]);
  //group join request
  let [memberjoinrequest, setMemberJoinRequest] = useState([]);
  //show info
  let [showinfo, setShowInfo] = useState(false);
  //show member
  let [showmember, setShowMember] = useState(false);
  //search user
  let [searchuser, setSearchUser] = useState([]);
  //search show
  let [searchshow, setSearchShow] = useState(false);

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
    });
  }, []);

  //handle Member Join Request Show
  let handleGroupJoinRequestShow = (item) => {
    setShowInfo(true);
    const groupJoinRequestRef = ref(db, "groupJoinRequest");
    onValue(groupJoinRequestRef, (snapshot) => {
      let arr = [];
      snapshot.forEach((groupItem) => {
        if (
          item.adminId == auth.currentUser.uid &&
          item.groupId == groupItem.val().groupId
        ) {
          arr.push({ ...groupItem.val(), groupKey: groupItem.key });
        }
      });
      setMemberJoinRequest(arr);
    });
  };

  //handle Member Request Accept
  let handleMemberRequestAccept = (item) => {
    set(push(ref(db, "groupMembers")), {
      adminId: item.adminId,
      adminName: item.adminName,
      groupId: item.groupId,
      groupName: item.groupName,
      groupTagline: item.groupTagline,
      userId: item.userId,
      userName: item.userName,
      userPhoto: item.userPhoto,
      groupKey: item.groupKey,
      date: `${new Date().getDate()}/${
        new Date().getMonth() + 1
      }/${new Date().getFullYear()}`,
    }).then(() => {
      remove(ref(db, "groupJoinRequest/" + item.groupKey));
    });
  };

  //handle Member Request Reject
  let handleMemberRequestReject = (item) => {
    remove(ref(db, "groupJoinRequest/" + item.groupKey));
  };

  //handle Member
  let handleMember = (item) => {
    setShowMember(true);
    const groupMembersRef = ref(db, "groupMembers");
    onValue(groupMembersRef, (snapshot) => {
      let arr = [];
      snapshot.forEach((memberItem) => {
        if (item.groupId == memberItem.val().groupId) {
          arr.push({ ...memberItem.val(), groupId: memberItem.key });
        }
      });
      setMemberList(arr);
    });
  };

  //handle Member Remove
  let handleMemberRemove = (item) => {
    remove(ref(db, "groupMembers/" + item.groupId));
  };

  //handle Search
  let handleSearch = (e) => {
    let arr = [];
    mygrouplist.filter((item) => {
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
    <div className="mt-10 lg:mt-11 py-2.5 px-1 border border-solid border-gray/25 rounded-3xl shadow-[0_4px_4px_rgba(0,0,0,0.25)] overflow-hidden">
      {searchshow ? (
        <div className="pb-2 border-b-2 border-solid border-gray/40 relative">
          <Search type={handleSearch} />
          <ImCross
            onClick={handleSearchHide}
            className="absolute top-4 right-4 text-md cursor-pointer text-primary"
          />
        </div>
      ) : (
        <div className="flex justify-between items-center px-4 py-3 border-b-2 border-solid border-gray/40">
          <h2 className="font-pop font-semibold text-xl text-black pt-[6px]">
            My Groups
          </h2>
          {showinfo ? (
            <button onClick={() => setShowInfo(false)} className="my_btn">
              Go Back
            </button>
          ) : showmember ? (
            <button onClick={() => setShowMember(false)} className="my_btn">
              Go Back
            </button>
          ) : (
            <FiSearch
              onClick={handleSearchShow}
              className="text-2xl cursor-pointer text-primary"
            />
          )}
        </div>
      )}
      <SimpleBar className="h-[380px] px-4 pt-5">
        {showinfo ? (
          memberjoinrequest.length == 0 ? (
            <p className="p-2.5 bg-primary text-white text-lg font-pop font-semibold text-center rounded-md">
              No Join Request Available.
            </p>
          ) : (
            memberjoinrequest.map((item) => (
              <div className="flex items-center justify-between border-b border-solid border-gray pb-4 mb-4 last:pb-0 last:mb-0 last:border-b-0">
                <div className="flex items-center gap-2">
                  <div className="w-[70px] h-[70px] rounded-full overflow-hidden">
                    <picture>
                      <img
                        className="bg-primary text-white h-full w-full"
                        src={item.userPhoto}
                        alt="Profile"
                      />
                    </picture>
                  </div>
                  <div>
                    <h3 className="font-pop text-lg text-black font-semibold">
                      {item.userName}
                    </h3>
                    <p className="font-pop text-sm text-gray font-medium">
                      {item.date}
                    </p>
                  </div>
                </div>
                <div className="flex flex-col">
                  <button
                    onClick={() => handleMemberRequestAccept(item)}
                    className="my_btn"
                  >
                    Accept
                  </button>
                  <button
                    onClick={() => handleMemberRequestReject(item)}
                    className="my_btn !bg-red-500 !border-red-500 mt-1"
                  >
                    Reject
                  </button>
                </div>
              </div>
            ))
          )
        ) : showmember ? (
          memberlist.length == 0 ? (
            <p className="p-2.5 bg-primary text-white text-lg font-pop font-semibold text-center rounded-md capitalize">
              Group Members will be shown here.
            </p>
          ) : (
            memberlist.map((item) => (
              <div className="flex items-center justify-between border-b border-solid border-gray pb-4 mb-4 last:pb-0 last:mb-0 last:border-b-0">
                <div className="flex items-center gap-2">
                  <div className="w-[70px] h-[70px] rounded-full overflow-hidden">
                    <picture>
                      <img
                        className="bg-primary text-white h-full w-full"
                        src={item.userPhoto}
                        alt="Profile"
                      />
                    </picture>
                  </div>
                  <div>
                    <h3 className="font-pop text-lg text-black font-semibold">
                      {item.userName}
                    </h3>
                    <p className="font-pop text-sm text-gray font-medium">
                      {item.date}
                    </p>
                  </div>
                </div>
                <div>
                  <button
                    onClick={() => handleMemberRemove(item)}
                    className="my_btn !bg-red-500 !border-red-500 mt-1"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))
          )
        ) : searchuser.length > 0 ? (
          searchuser.map((item) => (
            <div className="flex items-center justify-between border-b border-solid border-gray pb-4 mb-4 last:pb-0 last:mb-0 last:border-b-0">
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
                </div>
              </div>
              <div className="flex flex-col">
                <button
                  onClick={() => handleGroupJoinRequestShow(item)}
                  className="my_btn"
                >
                  Info
                </button>
                <button
                  onClick={() => handleMember(item)}
                  className="my_btn mt-1"
                >
                  Members
                </button>
              </div>
            </div>
          ))
        ) : mygrouplist.length == 0 ? (
          <p className="p-2.5 bg-primary text-white text-lg font-pop font-semibold text-center rounded-md capitalize">
            Groups created by you will be shown here.
          </p>
        ) : (
          mygrouplist.map((item) => (
            <div className="flex items-center justify-between border-b border-solid border-gray pb-4 mb-4 last:pb-0 last:mb-0 last:border-b-0">
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
                </div>
              </div>
              <div className="flex flex-col">
                <button
                  onClick={() => handleGroupJoinRequestShow(item)}
                  className="my_btn"
                >
                  Info
                </button>
                <button
                  onClick={() => handleMember(item)}
                  className="my_btn mt-1"
                >
                  Members
                </button>
              </div>
            </div>
          ))
        )}
      </SimpleBar>
    </div>
  );
};

export default Mygroup;
