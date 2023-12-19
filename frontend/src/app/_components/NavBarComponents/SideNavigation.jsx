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
    updateCollection,
    collection,
    collections,
    fetchCollectionsForDatabase,
  } = useContext(AppContext);

  const [loginIsActive, setLoginIsActive] = useState(false); // State to track active/inactive
  const [allDatabasesIsExpanded, setAlldatabasesIsExpanded] = useState(false); // State to track active/inactive
  const [allCollectionsIsExpanded, setAllCollectionsIsExpanded] =
    useState(false); // State to track active/inactive

  const username = "testuser";

  const LoginIconComponent = loginIsActive
    ? HiOutlineChevronDown
    : HiOutlineChevronRight;

  const DBIconComponent = allDatabasesIsExpanded
    ? HiOutlineChevronDown
    : HiOutlineChevronRight;

  const CollectionsIconComponent = allCollectionsIsExpanded
    ? HiOutlineChevronDown
    : HiOutlineChevronRight;

  const toggleLoginState = () => {
    setLoginIsActive(!loginIsActive); // Toggle the state
  };

  const handleDatabaseClick = (selectedDatabase) => {
    console.log("Selected database:", selectedDatabase); // Check if this is correctly logged
    updateDatabase(selectedDatabase);
    fetchCollectionsForDatabase(selectedDatabase);
  };

  const handleCollectionClick = (selectedCollection) => {
    console.log("Selected collection:", selectedCollection); // Check if this is correctly logged
    updateCollection(selectedCollection);
  };

  const toggleDatabaseExpansion = () => {
    setAlldatabasesIsExpanded(!allDatabasesIsExpanded); // Toggle the state
  };

  const toggleCollectionsExpansion = () => {
    setAllCollectionsIsExpanded(!allCollectionsIsExpanded); // Toggle the state
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
        <div
          onMouseEnter={toggleDatabaseExpansion}
          onMouseLeave={toggleDatabaseExpansion}
          className="flex justify-center flex-col"
        >
          <CustomButton
            text={"all databases"}
            IconComponent={DBIconComponent}
            imageSrc="/images/allDBIcon.svg"
            imageSize={25}
            variant={database === `all` ? "dbSelected" : "inactive"}
            onClick={() => handleDatabaseClick(`all`)}
          ></CustomButton>

          {allDatabasesIsExpanded
            ? databases.map((eachDatabase, index) => {
                return (
                  <CustomButton
                    key={index}
                    text={eachDatabase}
                    onClick={() => handleDatabaseClick(eachDatabase)}
                    variant={
                      database === eachDatabase ? "dbSelected" : "inactive"
                    }
                  ></CustomButton>
                );
              })
            : databases.map((eachDB, index) => {
                if (eachDB === database) {
                  return (
                    <CustomButton
                      key={index}
                      text={eachDB}
                      onClick={() => handleDatabaseClick(eachDB)}
                      variant={database === eachDB ? "dbSelected" : "inactive"}
                    ></CustomButton>
                  );
                }
              })}
        </div>
        <Divider></Divider>
        <div
          onMouseEnter={toggleCollectionsExpansion}
          onMouseLeave={toggleCollectionsExpansion}
          className="flex justify-center flex-col"
        >
          <CustomButton
            text={"all collections"}
            IconComponent={CollectionsIconComponent}
            imageSrc="/images/collectionsIcon.svg"
            imageSize={18}
            rounded={false}
            variant={collection === "all" ? "collectionSelected" : "inactive"}
            onClick={() => handleCollectionClick(`all`)}
          />

          {
            collections[database]
              ? allCollectionsIsExpanded
                ? collections[database].map((currentCollection, index) => (
                    <CustomButton
                      key={index}
                      text={currentCollection}
                      onClick={() => handleCollectionClick(currentCollection)}
                      variant={
                        collection === currentCollection
                          ? "collectionSelected"
                          : "inactive"
                      }
                    ></CustomButton>
                  ))
                : collections[database].map((currentCollection, index) => {
                    if (currentCollection === collection) {
                      return (
                        <CustomButton
                          key={index}
                          text={currentCollection}
                          onClick={() =>
                            handleCollectionClick(currentCollection)
                          }
                          variant={
                            collection === currentCollection
                              ? "collectionSelected"
                              : "inactive"
                          }
                        ></CustomButton>
                      );
                    }
                  })
              : null
            // collections[database].map((currentCol, index) => {
            //     <div>{currentCol}</div>;
            //   })
          }
        </div>
      </nav>
    </aside>
  );
}
