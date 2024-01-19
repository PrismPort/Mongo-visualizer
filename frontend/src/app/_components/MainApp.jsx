"use client";

import React, { useEffect, useContext } from "react";

import { useRouter } from "next/navigation";

import SideNavigation from "./NavBarComponents/SideNavigation";
import CollectionDashboard from "./SchemaSidebarComponents/CollectionDashboard";

import GraphComponent from "./ChartComponents/GraphComponent";
import AllDatabasesList from "./AllDatabasesList";
import AllCollectionsList from "./AllCollectionsList";
import HeaderBar from "./HeaderBar";
import { AppContext } from "../_context/AppContext";

export default function MainApp() {
  const { session, loadSession, collection, database } = useContext(AppContext);
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
        <main className="flex flex-col overflow-y-scroll w-screen justify-center bg-white items-center">
          <div className="w-pz90 sticky -mb-pz5 mt-pz5">
            <HeaderBar />
          </div>
          <div className="text-black h-screen flex justify-center items-center ">
            {database === "all" && collection === "all" ? (
              <AllDatabasesList />
            ) : database !== "all" && collection === "all" ? (
              <AllCollectionsList />
            ) : null}
            {collection !== "all" ? <GraphComponent /> : null}
          </div>
        </main>

        <CollectionDashboard />
      </>
    );
  }
}
