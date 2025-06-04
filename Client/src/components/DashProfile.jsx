import axios from "axios";
import React, { useState } from "react";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { UpdateSuccess } from "../Redux/auth/userSlice";


 function DashProfile() {
  const {user} = useSelector((state) => state.auth)
  const [currentUser] = useState(user);
 const [formdata, setformdata] = useState({ name: user?.firstName || "", profileImage: null });
  const dispatch = useDispatch()

  const handlechangeProfile = (e) => {
    
    if(e.target.name === "profileImage"){
      setformdata({...formdata , [e.target.name] : e.target.files[0]})
    } else {
      setformdata({...formdata , [e.target.name] : e.target.value});
    }
    
  }
  const handleSubmit = async(e) => {
    e.preventDefault();
    console.log(formdata);
    try {
      const res = await axios.patch(`${import.meta.env.VITE_BaseUrl}/user/updateuserinfo/${currentUser?._id}`,{...formdata},{
        withCredentials:true,
        headers:{
          "Content-Type": "multipart/form-data"
        }
      })
      console.log(res.data);
      dispatch(UpdateSuccess(res?.data?.user))
  
    } catch (error) {
      console.log(error);

    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-100 via-purple-100 to-pink-100 px-4">
      <div className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-md transition-transform transform hover:scale-[1.02]">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          👤 Profile
        </h2>

        <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
          <input type="file" name="profileImage" onChange={handlechangeProfile} accept="image/*" className="hidden" id="fileUpload" />

          <div className="relative w-36 h-36 mx-auto group cursor-pointer" onClick={() => document.getElementById("fileUpload").click()}>
            <img
              src={
                          Array.isArray(currentUser?.profileImage) &&
                          currentUser?.profileImage[0]?.startsWith("https")
                            ? currentUser?.profileImage[0]
                            : `${import.meta.env.VITE_imageUrl}/product/${
                                currentUser?.profileImage?.[0]
                              }`
                        }
              alt="user"
              className="rounded-full w-full h-full object-cover border-4 border-indigo-300 shadow-md"
            />
            <div className="absolute inset-0 bg-black bg-opacity-40 rounded-full flex items-center justify-center text-white text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              Change Photo
            </div>
          </div>

          <input
            type="text"
            className="px-4 py-2 rounded-full shadow-inner border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-all"
            placeholder="Username"
            name="name"
            onChange={handlechangeProfile}
            defaultValue={currentUser?.firstName}
          />
          <input
            type="email"
            className="px-4 py-2 rounded-full shadow-inner border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-all bg-gray-200"
            placeholder="Email"
            disabled
            defaultValue={currentUser?.email}
          />

          <button
            type="submit"
            className="bg-indigo-500 hover:bg-indigo-600 text-white font-medium py-2 rounded-full transition-colors duration-300"
          >
            Update
          </button>

          {currentUser?.role && (
            <Link to="/create-post">
              <button
                type="button"
                className="bg-gray-600 hover:bg-gray-700 text-white font-medium py-2 w-full rounded-full transition-colors duration-300"
              >
                Create a Post
              </button>
            </Link>
          )}
        </form>
      </div>
    </div>
  );
}

export default DashProfile
