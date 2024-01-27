"use client";

import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { signOut } from "next-auth/react";
import Logo from "../AtomarComponents/Logo";
import CustomButton from "./CustomButton";
import Divider from "../AtomarComponents/Divider";
import { HiOutlineChevronDown, HiOutlineChevronRight } from "react-icons/hi";
import { fetchDatabaseMap } from "../../../lib/actions";

import { handleLogout } from "../../_utils/handleLogout";
import { setDatabase, setCollection } from "../../../lib/reducers";

export default function SideNavigation() {
  const dispatch = useDispatch();

  const { database, collection, databaseMap } = useSelector(
    (state) => state.app
  ); // Use 'app' as your reducer name

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

  const toggleDatabaseExpansion = () => {
    setAllDatabasesIsExpanded(!allDatabasesIsExpanded); // Toggle the state
  };

  const toggleCollectionsExpansion = () => {
    setAllCollectionsIsExpanded(!allCollectionsIsExpanded); // Toggle the state
  };

  const handleDatabaseClick = (selectedDatabase) => {
    dispatch(setDatabase(selectedDatabase));
    dispatch(setCollection("all"));
  };

  const handleCollectionClick = (selectedCollection) => {
    dispatch(setCollection(selectedCollection));
  };

  const handleButtonLogout = () => {
    // Calling the signOut function redirects the user to the sign-out page
    // and then back to the homepage after successfully signing out.
    handleLogout();
    signOut({ callbackUrl: "/" });
  };

  useEffect(() => {
    // Dispatch the fetchDatabases action when the component mounts
    dispatch(fetchDatabaseMap());
  }, [dispatch]);

  // Render a loading message or a spinner while data is being fetched

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
                {Object.keys(databaseMap).map((eachDatabase) => (
                  <CustomButton
                    key={eachDatabase} // Use eachDatabase as key
                    text={eachDatabase}
                    onClick={() => handleDatabaseClick(eachDatabase)}
                    variant={
                      database === eachDatabase ? "dbSelected" : "inactive"
                    }
                  ></CustomButton>
                ))}
              </div>
            ) : (
              Object.keys(databaseMap).map((eachDB) => {
                if (eachDB === database) {
                  return (
                    <CustomButton
                      key={eachDB}
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
            {database === "all" && allCollectionsIsExpanded
              ? Object.entries(databaseMap).map(
                  ([databaseName, collections]) => (
                    <React.Fragment key={databaseName}>
                      {collections.map((currentCollection, index) => (
                        <CustomButton
                          key={Object.keys(currentCollection)}
                          text={Object.keys(currentCollection)}
                          onClick={() =>
                            handleCollectionClick(currentCollection)
                          }
                          variant={
                            collection === currentCollection
                              ? "collectionSelected"
                              : "inactive"
                          }
                        ></CustomButton>
                      ))}
                    </React.Fragment>
                  )
                )
              : database === "all" && !allCollectionsIsExpanded
              ? Object.entries(databaseMap).map(
                  ([databaseName, collections]) => (
                    <React.Fragment key={databaseName}>
                      {collections.map((currentCollection, index) => {
                        if (currentCollection === collection) {
                          return (
                            <CustomButton
                              key={Object.keys(currentCollection)}
                              text={Object.keys(currentCollection)}
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
                    </React.Fragment>
                  )
                )
              : databaseMap[database] && (
                  <div className="flex flex-col justify-center max-h-full overflow-y-auto">
                    {allCollectionsIsExpanded
                      ? databaseMap[database].map((currentCollection) => (
                          <CustomButton
                            key={Object.keys(currentCollection)}
                            text={Object.keys(currentCollection)}
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
                      : databaseMap[database].map((currentCollection) => {
                          if (currentCollection === collection) {
                            return (
                              <CustomButton
                                key={Object.keys(currentCollection)}
                                text={Object.keys(currentCollection)}
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
