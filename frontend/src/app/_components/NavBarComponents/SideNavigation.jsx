"use client";

import React, { useState, useContext, useEffect } from "react";
import { AppContext } from "../../_context/AppContext";
import { signOut } from "next-auth/react";
import Logo from "../AtomarComponents/Logo";
import CustomButton from "./CustomButton";
import Divider from "../AtomarComponents/Divider";
import { HiOutlineChevronDown, HiOutlineChevronRight } from "react-icons/hi";

import { handleLogout } from "../../_utils/handleLogout";

export default function SideNavigation() {
  const {
    database,
    databases,
    updateDatabase,
    updateCollection,
    collection,
    collections,
    fetchCollectionsForDatabase,
    loadingDatabases,
    collectionDbMap,
  } = useContext(AppContext);

  const [loginIsExpanded, setLoginIsExpanded] = useState(false);
  const [allDatabasesIsExpanded, setAllDatabasesIsExpanded] = useState(false);
  const [allCollectionsIsExpanded, setAllCollectionsIsExpanded] =
    useState(false);
  const [dataLoaded, setDataLoaded] = useState(false); // New state variable

  const username = "testuser";

  const LoginIconComponent = loginIsExpanded
    ? HiOutlineChevronDown
    : HiOutlineChevronRight;

  const DBIconComponent = allDatabasesIsExpanded
    ? HiOutlineChevronDown
    : HiOutlineChevronRight;

  const CollectionsIconComponent = allCollectionsIsExpanded
    ? HiOutlineChevronDown
    : HiOutlineChevronRight;

  const toggleLoginExpansion = () => {
    setLoginIsExpanded(!loginIsExpanded);
  };

  const handleDatabaseClick = (selectedDatabase) => {
    updateDatabase(selectedDatabase);
    updateCollection("all");

    fetchCollectionsForDatabase(selectedDatabase).then(() => {
      // Check if collections data for selectedDatabase is available
      if (collections[selectedDatabase]) {
        if (!collections[selectedDatabase].includes(collection)) {
          updateCollection("all");
        }
      } else {
        // Handle the case where collections data isn't available
        // Optionally, reset the collection as a fallback
        updateCollection("all");
      }
    });
  };

  const findDatabaseForCollection = (collectionName) => {
    return collectionDbMap[collectionName] || null; // Use the mapping to find the database
  };

  const handleCollectionClick = (selectedCollection) => {
    updateCollection(selectedCollection);
    updateDatabase(findDatabaseForCollection(selectedCollection));
  };
  const handleCollectionClickAll = (selectedCollection) => {
    updateCollection(selectedCollection);
  };

  const toggleDatabaseExpansion = () => {
    setAllDatabasesIsExpanded(!allDatabasesIsExpanded); // Toggle the state
  };

  const toggleCollectionsExpansion = () => {
    setAllCollectionsIsExpanded(!allCollectionsIsExpanded); // Toggle the state
  };

  const handleButtonLogout = () => {
    // Calling the signOut function redirects the user to the sign-out page
    // and then back to the homepage after successfully signing out.
    handleLogout();
    signOut({ callbackUrl: "/" });
  };

  useEffect(() => {
    if (databases.length === 0) {
      return; // If databases are not loaded yet, do nothing
    }
    fetchCollectionsForDatabase(database);
    // Mark data as loaded when this useEffect runs
    setDataLoaded(true);
  }, [loadingDatabases]);

  // Render a loading message or a spinner while data is being fetched
  if (!dataLoaded) {
    return <div>Loading...</div>;
  }

  // Render your component content here once data is loaded
  if (dataLoaded) {
    return (
      <aside className=" h-screen w-vw25 min-w-max bg-sidebar-bg py-5 rounded-r-3xl ">
        <nav className="flex justify-between flex-col h-full">
          <div className="flex flex-col h-full">
            <Logo></Logo>
            <Divider></Divider>
            <div
              className="flex justify-center flex-col"
              onMouseEnter={toggleLoginExpansion}
              onMouseLeave={toggleLoginExpansion}
            >
              <CustomButton
                text={username}
                imageSrc="/images/sample-user.png"
                rounded={true}
                IconComponent={LoginIconComponent}
                variant={loginIsExpanded ? "active" : "inactive"}
              />
              {loginIsExpanded ? (
                <CustomButton
                  variant={"inactive"}
                  text={"Logout"}
                  onClick={handleButtonLogout}
                ></CustomButton>
              ) : null}
            </div>
            <Divider></Divider>
            <div
              onMouseEnter={toggleDatabaseExpansion}
              onMouseLeave={toggleDatabaseExpansion}
              className={`flex justify-center max-h-auto flex-col ${
                allDatabasesIsExpanded ? "overflow-auto" : "overflow-y-visible"
              }`}
            >
              <CustomButton
                text={"all databases"}
                IconComponent={DBIconComponent}
                imageSrc="/images/allDBIcon.svg"
                imageSize={25}
                variant={database === `all` ? "dbSelected" : "inactive"}
                onClick={() => handleDatabaseClick(`all`)}
              ></CustomButton>
              {allDatabasesIsExpanded ? (
                <div className="flex flex-col max-h-full overflow-y-auto">
                  {databases.map((eachDatabase, index) => (
                    <CustomButton
                      key={index}
                      text={eachDatabase}
                      onClick={() => handleDatabaseClick(eachDatabase)}
                      variant={
                        database === eachDatabase ? "dbSelected" : "inactive"
                      }
                    ></CustomButton>
                  ))}
                </div>
              ) : (
                databases.map((eachDB, index) => {
                  if (eachDB === database) {
                    return (
                      <CustomButton
                        key={index}
                        text={eachDB}
                        onClick={() => handleDatabaseClick(eachDB)}
                        variant={
                          database === eachDB ? "dbSelected" : "inactive"
                        }
                      ></CustomButton>
                    );
                  }
                })
              )}
            </div>
            <Divider></Divider>
            <div
              onMouseEnter={toggleCollectionsExpansion}
              onMouseLeave={toggleCollectionsExpansion}
              className={`flex justify-center flex-col max-h-auto ${
                allCollectionsIsExpanded
                  ? "overflow-auto"
                  : "overflow-y-visible"
              }`}
            >
              <CustomButton
                text={"all collections"}
                IconComponent={CollectionsIconComponent}
                imageSrc="/images/collectionsIcon.svg"
                imageSize={18}
                rounded={false}
                variant={
                  collection === "all" ? "collectionSelected" : "inactive"
                }
                onClick={() => handleCollectionClickAll(`all`)}
              />
              {collections[database] && (
                <div className="flex flex-col max-h-full overflow-y-auto">
                  {allCollectionsIsExpanded
                    ? collections[database].map((currentCollection, index) => (
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
                      })}
                </div>
              )}
            </div>

            <div className=" mt-auto">
              <Divider></Divider>
              <div className="flex justify-center flex-col mr-pz5">
                <CustomButton
                  text={"Settings"}
                  imageSrc="/images/settings.svg"
                  imageSize={25}
                  rounded={false}
                  variant={"inactive"}
                />
                <CustomButton
                  text={"Readme"}
                  imageSrc="/images/Readme.svg"
                  imageSize={25}
                  rounded={false}
                  variant={"inactive"}
                />
              </div>
            </div>
          </div>
        </nav>
      </aside>
    );
  }
}
