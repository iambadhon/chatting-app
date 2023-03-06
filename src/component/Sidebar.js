import React, { useState, useRef } from "react";
import { GoHome } from "react-icons/go";
import { BiMessageDetail } from "react-icons/bi";
import { IoMdNotificationsOutline } from "react-icons/io";
import { TbSettings } from "react-icons/tb";
import { ImCamera } from "react-icons/im";
import { GoSignOut } from "react-icons/go";
import { Link, useNavigate } from "react-router-dom";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import { ThreeDots } from "react-loader-spinner";
import { ToastContainer, toast } from "react-toastify";
import { getAuth, signOut, updateProfile } from "firebase/auth";
import {
  getStorage,
  ref,
  uploadString,
  getDownloadURL,
} from "firebase/storage";

const Sidebar = ({ active }) => {
  //Authentication
  const auth = getAuth();
  //firebase storage
  const storage = getStorage();
  //upload image modlal
  let [uploadimageshow, setUploadImageShow] = useState(false);
  //redirection
  let navigate = useNavigate();
  //img
  let [img, setImg] = useState("");
  //preview img
  let [previewimg, setPreviewImg] = useState("");
  //img name
  let [imgname, setImgName] = useState("");
  //react loading
  let [loading, setLoading] = useState(false);
  //Upload error
  let [uploaderr, setUploadErr] = useState("");

  //react croper
  const [cropper, setCropper] = useState();
  const cropperRef = useRef(null);
  const onCrop = () => {
    const imageElement = cropperRef?.current;
    const cropper = imageElement?.cropper;
    setPreviewImg(cropper.getCroppedCanvas().toDataURL());
  };

  //handle sign out
  let handleSignOut = () => {
    signOut(auth).then(() => {
      navigate("/login");
    });
  };

  //handle Image Upload
  let handleUploadModal = () => {
    setUploadImageShow(true);
  };

  //handle Select Image
  let handleSelectImage = (e) => {
    setUploadErr("");
    setImgName(e.target.files[0].name);

    let files;
    if (e.dataTransfer) {
      files = e.dataTransfer.files;
    } else if (e.target) {
      files = e.target.files;
    }
    const reader = new FileReader();
    reader.onload = () => {
      setImg(reader.result);
    };
    reader.readAsDataURL(files[0]);
  };

  //handle Upload Image
  const handleUploadImage = () => {
    setLoading(true);
    const storageRef = ref(storage, "profilePicture/" + imgname);
    if (img !== "") {
      if (typeof cropper !== "undefined") {
        cropper.getCroppedCanvas().toDataURL();
        const message4 = cropper.getCroppedCanvas().toDataURL();
        uploadString(storageRef, message4, "data_url").then((snapshot) => {
          getDownloadURL(storageRef).then((downloadURL) => {
            console.log("File available at", downloadURL);
            updateProfile(auth.currentUser, {
              photoURL: downloadURL,
            })
              .then(() => {
                setLoading(false);
                setUploadImageShow(false);
                toast("Profile Photo Update Successfull.", {
                  autoClose: 1500,
                });
                setImg("");
                setPreviewImg("");
              })
              .catch((error) => {
                setLoading(false);
                console.log(error);
              });
          });
        });
      }
    } else {
      setLoading(false);
      setUploadErr("No Photo Selected!");
    }
  };

  //handle Cancel Upload
  let handleUploadCancel = () => {
    setUploadImageShow(!uploadimageshow);
    setImg("");
    setPreviewImg("");
    setLoading(false);
    setUploadErr("");
  };

  return (
    <section>
      <ToastContainer
        position="top-center"
        closeOnClick={false}
        theme="colored"
        className={`!px-3 !mt-3`}
      />
      <div className="bg-primary w-full lg:px-4 p-2 lg:py-9 lg:rounded-3xl overflow-y-hidden lg:overflow-x-hidden fixed bottom-0 left-0 z-30 lg:static flex justify-center lg:flex-col gap-x-5 sml:gap-x-16 md:!gap-x-28">
        <div className="relative group">
          <picture>
            <img
              className="w-[60px] h-[60px] md:w-[80px] md:h-[80px] lg:w-[100px] lg:h-[100px] border-4 border-solid border-white bg-white text-primary rounded-full overflow-hidden lg:mx-auto"
              src={auth.currentUser.photoURL}
              alt="Profile"
            />
          </picture>
          <button
            className="hidden group-hover:block absolute bottom-1 -right-4 lg:bottom-1 lg:right-0 xl:bottom-2 xl:right-5 w-[30px] h-[30px] md:w-[35px] md:h-[35px] rounded-full border-2 md:border-[3px] border-solid border-primary overflow-hidden bg-white text-primary hover:bg-primary hover:text-white hover:border-white duration-300"
            onClick={handleUploadModal}
          >
            <ImCamera className="text-base md:text-lg mx-auto mb-1" />
          </button>
        </div>
        <h2 className="absolute top-[155px] left-4 xl:left-9 w-[140px] hidden lg:block font-nunito text-xl font-bold text-white text-center">
          {auth.currentUser.displayName}
        </h2>
        <div className="flex flex-row lg:flex-col items-center gap-y-20 gap-x-5 sml:gap-x-6 md:!gap-x-11 lg:mt-24">
          <div
            className={`${
              active == "home" &&
              "z-10 px-1 py-3 lg:py-4 xl:py-5 lg:px-10 relative after:absolute lg:after:top-0 after:left-0 lg:after:left-3 xl:after:left-0 after:bottom-0 after:content-[''] after:bg-white after:w-full after:h-[120%] lg:after:w-[125%] lg:after:h-full after:z-[-1] after:rounded-b-xl lg:after:rounded-none lg:after:rounded-l-3xl before:absolute before:-top-2.5 md:before:-top-3.5 lg:before:top-0 before:right-0 lg:before:-right-4 xl:before:-right-9 before:content-[''] before:bg-primary before:w-full before:h-[15%] lg:before:w-[15%] lg:before:h-full before:rounded-b-xl lg:before:rounded-none lg:before:rounded-l-xl"
            }`}
          >
            <Link to="/">
              <GoHome
                className={`text-[32px] sml:text-4xl md:!text-5xl cursor-pointer ${
                  active == "home" ? "text-primary" : "text-white"
                }`}
              />
            </Link>
          </div>
          <div
            className={`${
              active == "message" &&
              "z-10 px-1 py-3 lg:py-4 xl:py-5 lg:px-10 relative after:absolute lg:after:top-0 after:left-0 lg:after:left-3 xl:after:left-0 after:bottom-0 after:content-[''] after:bg-white after:w-full after:h-[120%] lg:after:w-[125%] lg:after:h-full after:z-[-1] after:rounded-b-xl lg:after:rounded-none lg:after:rounded-l-3xl before:absolute before:-top-2.5 md:before:-top-3.5 lg:before:top-0 before:right-0 lg:before:-right-4 xl:before:-right-9 before:content-[''] before:bg-primary before:w-full before:h-[15%] lg:before:w-[15%] lg:before:h-full before:rounded-b-xl lg:before:rounded-none lg:before:rounded-l-xl"
            }`}
          >
            <Link to="/message">
              <BiMessageDetail
                className={`text-[32px] sml:text-4xl md:!text-5xl cursor-pointer ${
                  active == "message" ? "text-primary" : "text-white"
                }`}
              />
            </Link>
          </div>
          <div
            className={`${
              active == "notification" &&
              "z-10 px-1 py-3 lg:py-4 xl:py-5 lg:px-10 relative after:absolute lg:after:top-0 after:left-0 lg:after:left-3 xl:after:left-0 after:bottom-0 after:content-[''] after:bg-white after:w-full after:h-[120%] lg:after:w-[125%] lg:after:h-full after:z-[-1] after:rounded-b-xl lg:after:rounded-none lg:after:rounded-l-3xl before:absolute before:-top-2.5 md:before:-top-3.5 lg:before:top-0 before:right-0 lg:before:-right-4 xl:before:-right-9 before:content-[''] before:bg-primary before:w-full before:h-[15%] lg:before:w-[15%] lg:before:h-full before:rounded-b-xl lg:before:rounded-none lg:before:rounded-l-xl"
            }`}
          >
            <Link to="/notification">
              <IoMdNotificationsOutline
                className={`text-[32px] sml:text-4xl md:!text-5xl cursor-pointer ${
                  active == "notification" ? "text-primary" : "text-white"
                }`}
              />
            </Link>
          </div>
          <div
            className={`${
              active == "setting" &&
              "z-10 px-1 py-3 lg:py-4 xl:py-5 lg:px-10 relative after:absolute lg:after:top-0 after:left-0 lg:after:left-3 xl:after:left-0 after:bottom-0 after:content-[''] after:bg-white after:w-full after:h-[120%] lg:after:w-[125%] lg:after:h-full after:z-[-1] after:rounded-b-xl lg:after:rounded-none lg:after:rounded-l-3xl before:absolute before:-top-2.5 md:before:-top-3.5 lg:before:top-0 before:right-0 lg:before:-right-4 xl:before:-right-9 before:content-[''] before:bg-primary before:w-full before:h-[15%] lg:before:w-[15%] lg:before:h-full before:rounded-b-xl lg:before:rounded-none lg:before:rounded-l-xl"
            }`}
          >
            <Link to="/setting">
              <TbSettings
                className={`text-[32px] sml:text-4xl md:!text-5xl cursor-pointer ${
                  active == "setting" ? "text-primary" : "text-white"
                }`}
              />
            </Link>
          </div>
          <div className="sml:ml-10 md:!ml-16 lg:!ml-0 lg:mt-[105px] xl:mt-24 lg:mb-3.5">
            <GoSignOut
              onClick={handleSignOut}
              className="text-[32px] sml:text-4xl md:!text-5xl text-white cursor-pointer"
            />
          </div>
        </div>
        {/* upload modal */}
        {uploadimageshow && (
          <div className="fixed top-0 left-0 w-full h-screen bg-black/75 flex justify-center items-center z-10 px-4">
            <div className="p-6 md:p-9 bg-white rounded-lg">
              <h2 className="text-3xl md:text-4xl text-center font-bold text-primary font-nunito mb-4">
                Upload Profile Picture
              </h2>
              <div className="flex items-center gap-x-4">
                <p className="text-sm md:text-lg font-nunito font-bold text-durkblue">
                  Preview Image :
                </p>
                <div className="rounded-full overflow-hidden w-[60px] h-[60px] md:w-[100px] md:h-[100px] border-2 border-solid border-primary">
                  <picture>
                    {previewimg ? (
                      <img src={previewimg} />
                    ) : (
                      <img src={auth.currentUser.photoURL} />
                    )}
                  </picture>
                </div>
              </div>
              <div className="relative mt-4">
                <input
                  className={`w-full text-durkblue border-2 border-solid rounded-lg p-3 font-nunito text-base sml:text-xl font-bold focus:border-primary cursor-pointer ${
                    uploaderr ? "border-red-500" : "border-gray/25"
                  }`}
                  type="file"
                  onChange={handleSelectImage}
                />
                {uploaderr && (
                  <p className="text-red-500 mt-1 ml-2 text-sm font-semibold font-nunito rounded-md">
                    {uploaderr}
                  </p>
                )}
                <Cropper
                  className="mt-2"
                  src={img}
                  style={{ height: 100, width: 150 }}
                  // Cropper.js options
                  initialAspectRatio={1 / 1}
                  aspectRatio={1 / 1}
                  guides={false}
                  crop={onCrop}
                  ref={cropperRef}
                  minCropBoxWidth={30}
                  minCropBoxHeight={30}
                  onInitialized={(instance) => {
                    setCropper(instance);
                  }}
                />
              </div>
              <div className="mt-4 flex items-center gap-x-5">
                {loading ? (
                  <div className="flex justify-center items-center sml:h-14 md:!h-full">
                    <ThreeDots
                      height="60"
                      width="150"
                      radius="9"
                      color="#5F35F5"
                      ariaLabel="three-dots-loading"
                      visible={true}
                    />
                  </div>
                ) : (
                  <button
                    className="my_btn !text-base md:!text-xl !rounded-md !p-3 md:!p-4 !font-nunito after:hover:!bg-lightwhite"
                    type="button"
                    onClick={handleUploadImage}
                  >
                    Upload Picture
                  </button>
                )}

                {!loading && (
                  <button
                    className="my_btn !text-base md:!text-xl !rounded-md !p-3 md:!p-4 !font-nunito after:hover:!bg-lightwhite !bg-red-500 !border-red-500"
                    type="button"
                    onClick={handleUploadCancel}
                  >
                    Cancel
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Sidebar;
