"use client";

import ClientSessionProvider from "../_context/ClientSessionProvider";
import MainApp from "../_components/MainApp";
import React, { useContext } from "react";

export default function MongoVisualizer() {
  return (
    <>
      <ClientSessionProvider>
        <MainApp></MainApp>
      </ClientSessionProvider>
    </>
  );
}
