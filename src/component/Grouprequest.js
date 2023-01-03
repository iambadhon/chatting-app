import React from "react";
import SimpleBar from "simplebar-react";
import "simplebar-react/dist/simplebar.min.css";

const Grouprequest = () => {
  return (
    <div className="mt-10 py-5 px-1 border border-solid border-gray/25 rounded-3xl shadow-[0_4px_4px_rgba(0,0,0,0.25)] overflow-hidden">
      <div className="flex justify-between px-4 pb-2.5 border-b-2 border-solid border-gray/40">
        <h2 className="font-pop font-semibold text-xl text-black">
          Group Request
        </h2>
        <button className="my_btn">Create Group</button>
      </div>
      <SimpleBar className="h-[283px] px-4 pt-5">
        <div className="flex items-center justify-between border-b border-solid border-gray pb-4 mb-4">
          <div className="flex items-center gap-2">
            <picture className="w-[70px] h-[70px] rounded-full overflow-hidden">
              <img src="images/profile.png" alt="Profile" />
            </picture>
            <div>
              <h3 className="font-pop text-lg text-black font-semibold">
                Friends Reunion
              </h3>
              <p className="font-pop text-sm text-gray font-medium">
                Hi Guys, Wassup!
              </p>
            </div>
          </div>
          <div>
            <button className="my_btn">Join</button>
          </div>
        </div>
        <div className="flex items-center justify-between border-b border-solid border-gray pb-4 mb-4">
          <div className="flex items-center gap-2">
            <picture className="w-[70px] h-[70px] rounded-full overflow-hidden">
              <img src="images/profile.png" alt="Profile" />
            </picture>
            <div>
              <h3 className="font-pop text-lg text-black font-semibold">
                Friends Reunion
              </h3>
              <p className="font-pop text-sm text-gray font-medium">
                Hi Guys, Wassup!
              </p>
            </div>
          </div>
          <div>
            <button className="my_btn">Join</button>
          </div>
        </div>
        <div className="flex items-center justify-between border-b border-solid border-gray pb-4 mb-4">
          <div className="flex items-center gap-2">
            <picture className="w-[70px] h-[70px] rounded-full overflow-hidden">
              <img src="images/profile.png" alt="Profile" />
            </picture>
            <div>
              <h3 className="font-pop text-lg text-black font-semibold">
                Friends Reunion
              </h3>
              <p className="font-pop text-sm text-gray font-medium">
                Hi Guys, Wassup!
              </p>
            </div>
          </div>
          <div>
            <button className="my_btn">Join</button>
          </div>
        </div>
        <div className="flex items-center justify-between border-b border-solid border-gray pb-4 mb-4 last:pb-0 last:mb-0 last:border-b-0">
          <div className="flex items-center gap-2">
            <picture className="w-[70px] h-[70px] rounded-full overflow-hidden">
              <img src="images/profile.png" alt="Profile" />
            </picture>
            <div>
              <h3 className="font-pop text-lg text-black font-semibold">
                Friends Reunion
              </h3>
              <p className="font-pop text-sm text-gray font-medium">
                Hi Guys, Wassup!
              </p>
            </div>
          </div>
          <div>
            <button className="my_btn">Join</button>
          </div>
        </div>
      </SimpleBar>
    </div>
  );
};

export default Grouprequest;
