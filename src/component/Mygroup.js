import React from "react";
import { BiDotsVerticalRounded } from "react-icons/bi";
import SimpleBar from "simplebar-react";
import { useState, useEffect } from "react";
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

  return (
    <div className="mt-10 lg:mt-11 py-5 px-1 border border-solid border-gray/25 rounded-3xl shadow-[0_4px_4px_rgba(0,0,0,0.25)] overflow-hidden">
      <div className="flex justify-between px-4 pb-2.5 border-b-2 border-solid border-gray/40">
        <h2 className="font-pop font-semibold text-xl text-black">My Groups</h2>
        {showinfo ? (
          <button onClick={() => setShowInfo(false)} className="my_btn">
            Go Back
          </button>
        ) : showmember ? (
          <button onClick={() => setShowMember(false)} className="my_btn">
            Go Back
          </button>
        ) : (
          <BiDotsVerticalRounded className="text-3xl cursor-pointer text-primary" />
        )}
      </div>
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
