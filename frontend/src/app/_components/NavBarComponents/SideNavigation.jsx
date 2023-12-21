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

  const [loginIsExpanded, setLoginIsExpanded] = useState(false);
  const [allDatabasesIsExpanded, setAllDatabasesIsExpanded] = useState(false);
  const [allCollectionsIsExpanded, setAllCollectionsIsExpanded] =
    useState(false);

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

    fetchCollectionsForDatabase(selectedDatabase).then(() => {
      // Check if collections data for selectedDatabase is available
      if (collections[selectedDatabase]) {
        if (!collections[selectedDatabase].includes(collection)) {
          updateCollection("all");
        }
      } else {
        // Handle the case where collections data isn't available yet
        // For example, set some default state or handle the error
        console.error(
          "Collections data not available yet for",
          selectedDatabase
        );
        // Optionally, reset the collection as a fallback
        updateCollection("all");
      }
    });
  };

  const handleCollectionClick = (selectedCollection) => {
    updateCollection(selectedCollection);
  };

  const toggleDatabaseExpansion = () => {
    setAllDatabasesIsExpanded(!allDatabasesIsExpanded); // Toggle the state
  };

  const toggleCollectionsExpansion = () => {
    fetchCollectionsForDatabase(database);
    setAllCollectionsIsExpanded(!allCollectionsIsExpanded); // Toggle the state
  };

  const handleLogout = () => {
    console.log("Logout");
  };

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
              imageSrc="/images/sampleUser.jpg"
              rounded={true}
              IconComponent={LoginIconComponent}
              variant={loginIsExpanded ? "active" : "inactive"}
            />
            {loginIsExpanded ? (
              <CustomButton
                variant={"inactive"}
                text={"Logout"}
                onClick={handleLogout}
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
                      variant={database === eachDB ? "dbSelected" : "inactive"}
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
              allCollectionsIsExpanded ? "overflow-auto" : "overflow-y-visible"
            }`}
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
            {collections[database] && (
              <div className="flex flex-col max-h-full overflow-y-auto">
                {allCollectionsIsExpanded
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
