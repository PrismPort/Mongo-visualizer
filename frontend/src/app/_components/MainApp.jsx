"use client";

import React, { useEffect, useContext, StrictMode } from "react";

import { useRouter } from "next/navigation";

import ToggleSwitch from "./AtomarComponents/ToggleSwitch";
import {AllCharts} from "./ChartComponents/AllCharts";
import DatabaseList from "./DatabaseList";
import SideNavigation from "./NavBarComponents/SideNavigation";
import CollectionDashboard from "./SchemaSidebarComponents/CollectionDashboard";

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
        <main style={{ overflowY: 'scroll', height: 'calc(100vh - 100px)', padding: '20px' }}>
          <StrictMode>
            <AllCharts />
          </StrictMode>
          <ToggleSwitch />
        </main>
        <CollectionDashboard />
      </>
    );
  }
}
