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

const Mygroup = ({ marginT, hight }) => {
  //Authentication
  const auth = getAuth();
  //data base
  const db = getDatabase();
  //group list
  let [mygrouplist, setMyGroupList] = useState([]);

  useEffect(() => {
    const usersRef = ref(db, "groups");
    onValue(usersRef, (snapshot) => {
      let arr = [];
      snapshot.forEach((item) => {
        if (item.val().adminId == auth.currentUser.uid) {
          arr.push(item.val());
        }
      });
      setMyGroupList(arr);
    });
  }, []);

  return (
    <div
      style={{ marginTop: `${marginT}` }}
      className="mt-10 lg:mt-11 py-5 px-1 border border-solid border-gray/25 rounded-3xl shadow-[0_4px_4px_rgba(0,0,0,0.25)] overflow-hidden"
    >
      <div className="flex justify-between px-4 pb-2.5 border-b-2 border-solid border-gray/40">
        <h2 className="font-pop font-semibold text-xl text-black">My Groups</h2>
        <a href="#">
          <BiDotsVerticalRounded className="text-3xl cursor-pointer text-primary" />
        </a>
      </div>
      <SimpleBar style={{ height: `${hight}` }} className="h-[380px] px-4 pt-5">
        {mygrouplist.map((item) => (
          <div className="flex items-center justify-between border-b border-solid border-gray pb-4 mb-4 last:pb-0 last:mb-0 last:border-b-0">
            <div className="flex items-center gap-2">
              <picture className="w-[70px] h-[70px] rounded-full overflow-hidden">
                <img
                  className="bg-primary text-white"
                  src="images/profile.png"
                  alt="Profile"
                />
              </picture>
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
              <button className="my_btn">Info</button>
              <button className="my_btn mt-1">Members</button>
            </div>
          </div>
        ))}
      </SimpleBar>
    </div>
  );
};

export default Mygroup;
