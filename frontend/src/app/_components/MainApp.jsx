"use client";

import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import SideNavigation from "./NavBarComponents/SideNavigation";

import GraphComponent from "./ChartComponents/GraphComponent";
import AllDatabasesList from "./AllDatabasesList";
import AllCollectionsList from "./AllCollectionsList";
import HeaderBar from "./HeaderBar";
import Sidebar from "./SchemaSidebarComponents/Sidebar";

export default function MainApp() {
  const router = useRouter();
  const { data: session, status } = useSession();

  const { database, collection } = useSelector((state) => state.app);

  useEffect(() => {
    // Redirect if not in a session and not loading the session
    if (status === "unauthenticated") {
      router.push("/");
    }
  }, [status, router]); // Include status and router in the dependency array

  // Render content if in a session or loading the session
  if (status === "authenticated") {
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

        <Sidebar />
      </>
    );
  }
}
