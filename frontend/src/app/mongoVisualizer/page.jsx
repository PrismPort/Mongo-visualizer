"use client";

import React, { useContext } from "react";

import { useRouter } from "next/navigation";

import ToggleSwitch from "../_components/AtomarComponents/ToggleSwitch";
import DatabaseList from "../_components/DatabaseList";
import SideNavigation from "../_components/NavBarComponents/SideNavigation";
import CollectionDashboard from "../_components/SchemaSidebarComponents/CollectionDashboard";

import { AppContext } from "../_context/AppContext";

export default function MongoVisualizer() {
  const { isLoggedIn, databases } = useContext(AppContext);
  const router = useRouter();
  console.log("databases", databases);
  console.log("isLoggedin", isLoggedIn);

  if (typeof window === "undefined") {
    return null;
  } else {
    if (isLoggedIn) {
      return (
        <>
          <SideNavigation />

          <main className="flex h-screen w-screen justify-center bg-white items-center">
            <div className="text-black">
              mongovisualizer
              <DatabaseList />
              <ToggleSwitch />
            </div>
          </main>

          <CollectionDashboard />
        </>
      );
    } else {
      router.push("/");
    }
  }
}
