"use client";

import React, { useEffect, useContext, StrictMode } from "react";

import { useRouter } from "next/navigation";

import ToggleSwitch from "./AtomarComponents/ToggleSwitch";

import { AllCharts } from "./ChartComponents/AllCharts";
import DatabaseList from "./DatabaseList";
import SideNavigation from "./NavBarComponents/SideNavigation";
import CollectionDashboard from "./SchemaSidebarComponents/CollectionDashboard";

import GraphComponent from "./ChartComponents/GraphComponent";

import SearchBar from "./AtomarComponents/SearchBar";
import StringList from "./ChartComponents/StringList";
import { AppContext } from "../_context/AppContext";
import { NullChart } from "../charts/components/null_chart";
export default function MainApp() {
  const { session, loadSession } = useContext(AppContext);
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
        <main className="flex h-full overflow-y-scroll w-screen justify-center bg-white items-center">
          <div className="text-black">
            <h2 className=" text-center text-2xl bold m-12">mongovisualizer</h2>

            <GraphComponent></GraphComponent>
          </div>
        </main>
        <main className="flex flex-wrap overflow-y-auto h-screen w-screen justify-center bg-white items-center">
          <AllCharts />
        </main>
        <CollectionDashboard />
      </>
    );
  }
}
