import React from "react";

import ToggleSwitch from "../_components/AtomarComponents/ToggleSwitch";
import DatabaseList from "../_components/DatabaseList";
import SideNavigation from "../_components/NavBarComponents/SideNavigation";
import ChartExample from "../charts/chart_example";

export default function mongovisualizer() {
  return (
    <>
      <SideNavigation />

      <main className="flex h-screen w-screen justify-center bg-white items-center">
        <div className="text-black">
          mongovisualizer
          <DatabaseList />
          <ToggleSwitch />
        </div>
        <div>
          <ChartExample />
        </div>
      </main>
    </>
  );
}
