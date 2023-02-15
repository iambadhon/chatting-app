import React from "react";
import { useState, useEffect } from "react";
import SimpleBar from "simplebar-react";
import { ThreeDots } from "react-loader-spinner";
import { ToastContainer, toast } from "react-toastify";
import { getDatabase, ref, onValue, set, push } from "firebase/database";
import { getAuth } from "firebase/auth";

const Grouplist = () => {
  //Authentication
  const auth = getAuth();
  //data base
  const db = getDatabase();
  //create group
  let [creategroup, setCreateGroup] = useState(false);
  // validation
  let [groupname, setGroupName] = useState("");
  let [grouptagline, setGroupTagline] = useState("");
  // validation error
  let [groupnameerr, setGroupNameErr] = useState("");
  let [grouptaglineerr, setGroupTaglineErr] = useState("");
  //react loading
  let [loading, setLoading] = useState(false);
  //group list
  let [grouplist, setGroupList] = useState([]);
  //member join request
  let [groupjoinrequest, setgroupJoinRequest] = useState([]);
  //member list
  let [memberlist, setMemberList] = useState([]);

  // handle Group Name
  let handleGroupName = (e) => {
    setGroupName(e.target.value);
    setGroupNameErr("");
  };

  // handle Group tagline
  let handleGroupTagline = (e) => {
    setGroupTagline(e.target.value);
    setGroupTaglineErr("");
  };

  //handle Create Group
  let handleCreateGroup = () => {
    //group name error
    if (!groupname) {
      setGroupNameErr("Group Name is required");
    } else {
      if (groupname.length < 3) {
        setGroupNameErr("Group Name must be greater than 3");
      }
    }
    //group tagline error
    if (!grouptagline) {
      setGroupTaglineErr("Group Tagline is required");
    } else {
      if (grouptagline.length < 3) {
        setGroupTaglineErr("Group Tagline must be greater than 3");
      }
    }

    if (
      groupname &&
      grouptagline &&
      groupname.length >= 3 &&
      grouptagline.length >= 3
    ) {
      setLoading(true);
      set(push(ref(db, "groups")), {
        groupName: groupname,
        groupTagline: grouptagline,
        adminName: auth.currentUser.displayName,
        adminId: auth.currentUser.uid,
      }).then(() => {
        toast("Done! Group successfully created.", {
          autoClose: 1500,
        });
        setCreateGroup(false);
        setLoading(false);
        setGroupName("");
        setGroupTagline("");
        setGroupNameErr("");
        setGroupTaglineErr("");
      });
    }
  };

  useEffect(() => {
    const groupsRef = ref(db, "groups");
    onValue(groupsRef, (snapshot) => {
      let arr = [];
      snapshot.forEach((item) => {
        if (item.val().adminId != auth.currentUser.uid) {
          arr.push({ ...item.val(), groupId: item.key });
        }
      });
      setGroupList(arr);
    });
  }, []);

  //handle Group Join
  let handleGroupJoin = (item) => {
    set(push(ref(db, "groupJoinRequest")), {
      adminId: item.adminId,
      adminName: item.adminName,
      groupId: item.groupId,
      groupName: item.groupName,
      groupTagline: item.groupTagline,
      userId: auth.currentUser.uid,
      userName: auth.currentUser.displayName,
      userPhoto: auth.currentUser.photoURL,
      date: `${new Date().getDate()}/${
        new Date().getMonth() + 1
      }/${new Date().getFullYear()}`,
    });

    //notification
    set(push(ref(db, "notification")), {
      adminId: item.adminId,
      adminName: item.adminName,
      groupId: item.groupId,
      groupName: item.groupName,
      userId: auth.currentUser.uid,
      userName: auth.currentUser.displayName,
      userPhoto: auth.currentUser.photoURL,
      date: `${new Date().getDate()}/${
        new Date().getMonth() + 1
      }/${new Date().getFullYear()}`,
    });
  };

  //group Join Request
  useEffect(() => {
    const groupJoinRequestRef = ref(db, "groupJoinRequest");
    onValue(groupJoinRequestRef, (snapshot) => {
      let arr = [];
      snapshot.forEach((item) => {
        arr.push(item.val().groupId + item.val().userId);
      });
      setgroupJoinRequest(arr);
    });
  }, []);

  //Member List
  useEffect(() => {
    const groupMembersRef = ref(db, "groupMembers");
    onValue(groupMembersRef, (snapshot) => {
      let arr = [];
      snapshot.forEach((item) => {
        arr.push(item.val().groupId + item.val().userId);
      });
      setMemberList(arr);
    });
  }, []);

  return (
    <section>
      <ToastContainer
        position="top-center"
        closeOnClick={false}
        theme="colored"
        className={`!px-3 !mt-3`}
      />
      <div className="mt-10 py-5 px-1 border border-solid border-gray/25 rounded-3xl shadow-[0_4px_4px_rgba(0,0,0,0.25)] overflow-hidden">
        <div className="flex justify-between px-4 pb-2.5 border-b-2 border-solid border-gray/40">
          <h2 className="font-pop font-semibold text-xl text-black">
            Group List
          </h2>
          <button
            onClick={() => setCreateGroup(!creategroup)}
            className="my_btn"
          >
            {creategroup ? "Go Back" : "Create Group"}
          </button>
        </div>
        <SimpleBar className="h-[283px] px-4 pt-5">
          {creategroup ? (
            <>
              <div className="relative mt-1">
                <input
                  className="w-full text-durkblue border-2 border-solid rounded-lg py-3 px-6 font-nunito text-xl focus:border-primary outline-none placeholder-transparent peer border-gray/25"
                  type="text"
                  placeholder="Group Name"
                  onChange={handleGroupName}
                />
                <p className="absolute -top-2.5 left-8 bg-white px-3 text-sm font-semibold font-nunito text-[#11175db3] pointer-events-none peer-placeholder-shown:top-3.5 peer-placeholder-shown:left-4 peer-placeholder-shown:bg-transparent peer-placeholder-shown:text-xl peer-focus:-top-2.5 peer-focus:left-8 peer-focus:bg-white peer-focus:text-sm peer-focus:text-primary duration-300">
                  Group Name
                </p>
                {groupnameerr && (
                  <p className="text-red-500 ml-2 mt-1 text-sm font-semibold font-nunito">
                    {groupnameerr}
                  </p>
                )}
              </div>
              <div className="relative mt-5">
                <input
                  className="w-full text-durkblue border-2 border-solid rounded-lg py-3 px-6 font-nunito text-xl focus:border-primary outline-none placeholder-transparent peer border-gray/25"
                  type="text"
                  placeholder="Group Tagline"
                  onChange={handleGroupTagline}
                />
                <p className="absolute -top-2.5 left-8 bg-white px-3 text-sm font-semibold font-nunito text-[#11175db3] pointer-events-none peer-placeholder-shown:top-3.5 peer-placeholder-shown:left-4 peer-placeholder-shown:bg-transparent peer-placeholder-shown:text-xl peer-focus:-top-2.5 peer-focus:left-8 peer-focus:bg-white peer-focus:text-sm peer-focus:text-primary duration-300">
                  Group Tagline
                </p>
                {grouptaglineerr && (
                  <p className="text-red-500 ml-2 mt-1 text-sm font-semibold font-nunito">
                    {grouptaglineerr}
                  </p>
                )}
              </div>
              <div className="mt-5">
                {loading ? (
                  <div className="flex justify-center items-center sml:h-14 md:!h-full">
                    <ThreeDots
                      height="72"
                      width="150"
                      radius="9"
                      color="#5F35F5"
                      ariaLabel="three-dots-loading"
                      visible={true}
                    />
                  </div>
                ) : (
                  <button
                    className="my_btn w-full !text-xl !rounded-full !py-3 !font-nunito after:hover:!bg-lightwhite after:!w-full after:!h-0 after:hover:!top-[unset] after:hover:!bottom-0 after:hover:!h-full"
                    type="button"
                    onClick={handleCreateGroup}
                  >
                    Create Group
                  </button>
                )}
              </div>
            </>
          ) : grouplist.length == 0 ? (
            <p className="p-2.5 bg-primary text-white text-lg font-pop font-semibold text-center rounded-md capitalize">
              No Groups Available for Join
            </p>
          ) : (
            grouplist.map((item) => (
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
                    <p className="font-pop text-xs text-gray font-medium">
                      Admin:
                      <span className="pl-1">{item.adminName}</span>
                    </p>
                  </div>
                </div>
                <div>
                  {memberlist.includes(item.groupId + auth.currentUser.uid) ||
                  memberlist.includes(auth.currentUser.uid + item.groupId) ? (
                    <button className="my_btn">Joined</button>
                  ) : groupjoinrequest.includes(
                      item.groupId + auth.currentUser.uid
                    ) ||
                    groupjoinrequest.includes(
                      auth.currentUser.uid + item.groupId
                    ) ? (
                    <button className="my_btn">Pending</button>
                  ) : (
                    <button
                      onClick={() => handleGroupJoin(item)}
                      className="my_btn"
                    >
                      Join
                    </button>
                  )}
                </div>
              </div>
            ))
          )}
        </SimpleBar>
      </div>
    </section>
  );
};

export default Grouplist;
