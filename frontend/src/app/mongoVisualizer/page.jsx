import React from "react";

import ToggleSwitch from "../_components/AtomarComponents/ToggleSwitch";
import DatabaseList from "../_components/DatabaseList";
import UserImage from "../_components/AtomarComponents/UserImage";

export default function mongovisualizer() {
  return (
    <>
      <main className="flex h-screen w-screen justify-center bg-white items-center">
        <aside className="absolute h-screen bg-black left-0">
          <nav>test</nav>
          <UserImage
            imageUrl={null}
            altText={"user Image"}
            size={50}
          ></UserImage>
        </aside>
        <div className="text-black">
          mongovisualizer
          <ToggleSwitch />
          <DatabaseList />
        </div>
      </main>
    </>
  );
}
