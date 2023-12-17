"use client";

import React, { useState } from "react";

import Logo from "../AtomarComponents/Logo";
import CustomButton from "../NavBarComponents/CustomButton";
import Divider from "../AtomarComponents/Divider";
import { HiOutlineChevronDown, HiOutlineChevronRight } from "react-icons/hi";

export default function SideNavigation() {
  const [loginIsActive, setLoginIsActive] = useState(false); // State to track active/inactive
  const [allDatabasesIsActive, setAlldatabasesIsActive] = useState(false); // State to track active/inactive
  const [allCollectionsIsActive, setAllCollectionsIsActive] = useState(false); // State to track active/inactive
  const username = "testuser";
  const LoginIconComponent = loginIsActive
    ? HiOutlineChevronDown
    : HiOutlineChevronRight;

  const DBIconComponent = allDatabasesIsActive
    ? HiOutlineChevronDown
    : HiOutlineChevronRight;

  const CollectionsIconComponent = allCollectionsIsActive
    ? HiOutlineChevronDown
    : HiOutlineChevronRight;

  const toggleLoginState = () => {
    setLoginIsActive(!loginIsActive); // Toggle the state
  };

  const toggleDatabaseSelection = () => {
    setAlldatabasesIsActive(!allDatabasesIsActive); // Toggle the state
  };

  const toggleCollectionsSelection = () => {
    setAllCollectionsIsActive(!allCollectionsIsActive); // Toggle the state
  };

  return (
    <aside
      className="absolute h-screen w-auto bg-sidebar-bg rounded-r-3xl left-0
    "
    >
      <nav className="flex justify-center flex-col">
        <Logo></Logo>
        <Divider></Divider>
        <CustomButton
          text={username}
          imageSrc="/images/sampleUser.jpg"
          IconComponent={LoginIconComponent}
          variant={loginIsActive ? "active" : "inactive"}
          onClick={toggleLoginState} // Add onClick event handler
        />
        <Divider></Divider>
        <h4 className="bold p-4">databases</h4>
        <CustomButton
          text={"all databases"}
          IconComponent={DBIconComponent}
          imageSrc="/images/allDBIcon.svg"
          imageSize={25}
          variant={allDatabasesIsActive ? "active" : "inactive"}
          onClick={toggleDatabaseSelection}
          onMouseEnter={toggleDatabaseSelection}
          onMouseLeave={toggleDatabaseSelection}
        ></CustomButton>
        <h4 className="bold p-4">collections</h4>
        <CustomButton
          text={"all collections"}
          IconComponent={CollectionsIconComponent}
          imageSrc="/images/allDBIcon.svg"
          imageSize={25}
          variant={allCollectionsIsActive ? "active" : "inactive"}
          onClick={toggleCollectionsSelection}
          onMouseEnter={toggleCollectionsSelection}
          onMouseLeave={toggleCollectionsSelection}
        ></CustomButton>
      </nav>
    </aside>
  );
}
