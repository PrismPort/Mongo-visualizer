"use client";

import React, { useState, useContext } from "react";
import { AppContext } from "../../_context/AppContext";

import Logo from "../AtomarComponents/Logo";
import CustomButton from "../NavBarComponents/CustomButton";
import Divider from "../AtomarComponents/Divider";
import { HiOutlineChevronDown, HiOutlineChevronRight } from "react-icons/hi";

export default function SideNavigation() {
  const {
    database,
    databases,
    updateDatabase,
    collections,
    fetchCollectionsForDatabase,
  } = useContext(AppContext);

  const handleDatabaseClick = (selectedDatabase) => {
    updateDatabase(selectedDatabase);
    fetchCollectionsForDatabase(selectedDatabase);
  };

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
          rounded={true}
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
        {databases.map((eachDatabase, index) => {
          return (
            <CustomButton
              key={eachDatabase} // Adding a key for list items
              text={eachDatabase}
              variant={database === eachDatabase ? "active" : "inactive"}
              onClick={() => handleDatabaseClick(eachDatabase)}
            ></CustomButton>
          );
        })}
        <h4 className="bold p-4">collections</h4>
        <CustomButton
          text={"all collections"}
          IconComponent={CollectionsIconComponent}
          imageSrc="/images/collectionsIcon.svg"
          imageSize={18}
          rounded={false}
          variant={allCollectionsIsActive ? "active" : "inactive"}
          onClick={() => setAllCollectionsIsActive(!allCollectionsIsActive)}
        />

        {/* Render collections for the selected database under "all collections" */}
        {allCollectionsIsActive &&
          collections[database] &&
          collections[database].map((collection) => (
            <div key={collection} className="pl-4">
              {" "}
              {/* Add appropriate styling */}
              {collection}
            </div>
          ))}
      </nav>
    </aside>
  );
}
