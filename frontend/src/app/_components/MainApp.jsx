"use client";

import React, { useEffect, useContext } from "react";

import { useRouter } from "next/navigation";

import ToggleSwitch from "./AtomarComponents/ToggleSwitch";

import SideNavigation from "./NavBarComponents/SideNavigation";
import CollectionDashboard from "./SchemaSidebarComponents/CollectionDashboard";

import GraphComponent from "./ChartComponents/GraphComponent";

import SearchBar from "./AtomarComponents/SearchBar";
import StringList from "./ChartComponents/StringList";
import { AppContext } from "../_context/AppContext";

const sampleData = [
  { value: "Jason", occurance: 8 },
  { value: "Cindy", occurance: 4 },
  { value: "Richard", occurance: 6 },
  { value: "Nicole", occurance: 4 },
  { value: "Alexandra", occurance: 3 },
  { value: "Michael", occurance: 7 },
  { value: "David", occurance: 3 },
  { value: "Russell", occurance: 3 },
  { value: "Cindy", occurance: 8 },
  { value: "John", occurance: 7 },
];

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
        <main className="flex h-screen w-screen justify-center bg-white items-center">
          <div className="text-black">
            <h2 className=" m-12">mongovisualizer</h2>
            <StringList data={sampleData} keyName={"Vorname"}></StringList>
            <GraphComponent></GraphComponent>
          </div>
        </main>

        <CollectionDashboard />
      </>
    );
  }
}
