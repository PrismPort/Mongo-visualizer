import React from "react";

import ToggleSwitch from "../_components/AtomarComponents/ToggleSwitch";

export default function mongovisualizer() {
  return (
    <>
      <main className="flex h-screen w-screen justify-center bg-white items-center">
        <div className="text-black">
          mongovisualizer
          <ToggleSwitch />
        </div>
      </main>
    </>
  );
}
