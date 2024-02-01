"use client";

import React, { useEffect, useContext } from "react";

import { useRouter } from "next/navigation";

import HeaderBar from "./NavBarComponents/HeaderBar";
import AllDatabasesList from "./NavBarComponents/AllDatabasesList";
import AllCollectionsList from "./NavBarComponents/AllCollectionsList";
import SideNavigation from "./NavBarComponents/SideNavigation";
import CollectionDashboard from "./SchemaSidebarComponents/CollectionDashboard";

import GraphComponent from "./ChartComponents/GraphComponent";

import { AppContext } from "../_context/AppContext";

export default function MainApp() {
  const { session, loadSession, database, collection } = useContext(AppContext);
  const router = useRouter();

  useEffect(() => {
    // Redirect if not in a session and not loading the session
    if (!session && !loadSession) {
      router.push("/");
    }
  }, [session, loadSession, router]); // Include session and loadSession in the dependency array

  // Render content if in a session or loading the session
  if (session) {
    return (
      <>
        <SideNavigation />
        <main className="flex flex-col h-screen overflow-y-scroll w-screen justify-start bg-white items-center">
          <HeaderBar />
          <div className="flex justify-center w-full">
            {database === "all" && collection === "all" ? (
              <AllDatabasesList />
            ) : database !== "all" && collection === "all" ? (
              <AllCollectionsList />
            ) : (
              <div className="text-black h-vh85 w-full px-8 ">
                <GraphComponent></GraphComponent>
              </div>
            )}
          </div>
          <div className="p-4 mt-auto">© 2022, made with ♥ by PrismPort</div>

          {/* <div className=" p-4">© 2024, made with ♥ by PrismPort</div> */}
        </main>

        <CollectionDashboard />
      </>
    );
  }
}
