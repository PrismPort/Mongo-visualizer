"use client";

import React, { useEffect, useContext } from "react";

import { useRouter } from "next/navigation";

import ToggleSwitch from "./AtomarComponents/ToggleSwitch";
import DatabaseList from "./DatabaseList";
import SideNavigation from "./NavBarComponents/SideNavigation";
import CollectionDashboard from "./SchemaSidebarComponents/CollectionDashboard";

import { AppContext } from "../_context/AppContext";

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
            mongovisualizer
            <ToggleSwitch />
          </div>
        </main>

        <CollectionDashboard />
      </>
    );
  }
}
