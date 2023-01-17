import React from "react";
import { BiDotsVerticalRounded } from "react-icons/bi";
import SimpleBar from "simplebar-react";
import { getDatabase, ref, onValue } from "firebase/database";
import { useEffect } from "react";
import { useState } from "react";
import { getAuth } from "firebase/auth";

const Userlist = () => {
  //Authentication
  const auth = getAuth();
  //Read data
  const db = getDatabase();
  //users list
  let [userslist, setUsersList] = useState([]);

  useEffect(() => {
    const usersRef = ref(db, "users/");
    onValue(usersRef, (snapshot) => {
      let arr = [];
      snapshot.forEach((item) => {
        if (item.key !== auth.currentUser.uid) {
          arr.push(item.val());
        }
      });
      setUsersList(arr);
    });
  }, []);

  return (
    <div className="mt-10 lg:mt-11 xl:mt-0 py-5 px-1 border border-solid border-gray/25 rounded-3xl shadow-[0_4px_4px_rgba(0,0,0,0.25)] overflow-hidden">
      <div className="flex justify-between px-4 pb-2.5 border-b-2 border-solid border-gray/40">
        <h2 className="font-pop font-semibold text-xl text-black">User List</h2>
        <a href="#">
          <BiDotsVerticalRounded className="text-3xl cursor-pointer text-primary" />
        </a>
      </div>
      <SimpleBar className="h-[385px] px-4 pt-5">
        {userslist.map((item) => (
          <div className="flex items-center justify-between border-b border-solid border-gray pb-4 mb-4 last:pb-0 last:mb-0 last:border-b-0">
            <div className="flex items-center gap-2">
              <div className="w-[70px] h-[70px] rounded-full overflow-hidden">
                <picture>
                  <img
                    className="w-full h-full"
                    src={item.photoURL}
                    alt="Profile"
                  />
                </picture>
              </div>
              <div>
                <h3 className="font-pop text-lg text-black font-semibold">
                  {item.name}
                </h3>
              </div>
            </div>
            <div>
              <button className="my_btn">Add</button>
            </div>
          </div>
        ))}
      </SimpleBar>
    </div>
  );
};

export default Userlist;
