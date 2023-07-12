import React, { useState, useEffect, useRef } from "react";
import { HiMenu } from "react-icons/hi";
import { AiFillCloseCircle } from "react-icons/ai";
import { Link, Route, Routes, useNavigate } from "react-router-dom";

import Sidebar from "../components/Sidebar";
import UserProfile from "../components/UserProfile";
import { client } from "../client";
import AppLogoHome from "../assets/AppLogoHome.png";
import Pins from "./Pins";
import { userQuery } from "../utils/data";
import { fetchUser } from "../utils/fetchUser";

const Home = () => {
  const [toggleSidebar, setToggleSidebar] = useState(false);
  const [user, setUser] = useState(null);
  const scrollRef = useRef(null);

  const userInfo = fetchUser();

  const navigate = useNavigate();
  useEffect(() => {
    if(!userInfo) {  
      navigate("/login");
    }
  }, [])
  // sub is googleId in new oauth lib.
  useEffect(() => {
    const query = userQuery(userInfo?.sub);
    client.fetch(query).then((data) => {
        setUser(data[0]);
      });
  }, [userInfo?.sub]);
  // scroll Ref implementation
  useEffect(() => {
    scrollRef.current.scrollTo(0, 0);
  }, [])

  return (
    <div className="flex bg-gray-50 md:flex-row flex-col h-screen transition-height duration-75 ease-out">
      <div className="hidden md:flex h-screen flex-initial">
        <Sidebar user={user && user} />
      </div>
      <div className="flex md:hidden flex-row">
        <div className="p-3 w-full flex flex-row justify-between items-center shadow-md">
          <HiMenu fontSize={40} className="cursor-pointer" onClick={() => setToggleSidebar(true)} />
          <Link to="/">
            <img src={AppLogoHome} alt="App logo;" className="w-13 h-10 p-1" />
          </Link>
          <Link to={`user-profile/${user?._id}`}>
            <img src={user?.image} alt="user pic" className="w-13 h-10 p-1 rounded-full" />
          </Link>
        </div>
        {toggleSidebar && (
        <div className="fixed w-4/5 bg-white h-screen overflow-y-auto shadow-md z-10 animate-slide-in">
          <div className="absolute w-full flex justify-end items-center p-2">
            <AiFillCloseCircle fontSize={30} className="cursor-pointer" onClick={() => setToggleSidebar(false)} />
          </div>
            <Sidebar user={user && user} closeToggle={setToggleSidebar} />
        </div>
        )}
      </div>
      <div className="pb-2 flex-1 h-screen overflow-y-scroll" ref={scrollRef}>
        <Routes>
          <Route path="/user-profile/:userId" element={<UserProfile />} />
          <Route path="/*" element = {<Pins user={user && user} />} />
        </Routes>
      </div>
    </div>
  )
}

export default Home