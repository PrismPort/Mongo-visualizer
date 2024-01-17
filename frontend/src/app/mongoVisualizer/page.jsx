"use client";

import ClientSessionProvider from "../_context/ClientSessionProvider";
import { GraphProvider } from "../_context/GraphContext.js";
import MainApp from "../_components/MainApp";
import React, { useContext } from "react";

export default function MongoVisualizer() {
  return (
    <>
      <ClientSessionProvider>
        <GraphProvider>
          <MainApp></MainApp>
        </GraphProvider>
      </ClientSessionProvider>
    </>
  );
}
