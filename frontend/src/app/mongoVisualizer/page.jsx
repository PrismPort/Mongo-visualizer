"use client";

import ClientSessionProvider from "../_context/ClientSessionProvider";
import MainApp from "../_components/MainApp";
import React, { useContext } from "react";

import { useRouter } from "next/navigation";

import ToggleSwitch from "../_components/AtomarComponents/ToggleSwitch";
import DatabaseList from "../_components/DatabaseList";
import SideNavigation from "../_components/NavBarComponents/SideNavigation";
import CollectionDashboard from "../_components/SchemaSidebarComponents/CollectionDashboard";
import ChartExample from "../charts/chart_example";

import { AppContext } from "../_context/AppContext";

export default function MongoVisualizer() {
  return (
    <>
      <ClientSessionProvider>
        <MainApp></MainApp>
      </ClientSessionProvider>
    </>
  );
}
