"use client";

import ClientSessionProvider from "../_context/ClientSessionProvider";
import MainApp from "../_components/MainApp";

export default function MongoVisualizer() {
  return (
    <>
      <ClientSessionProvider>
        <MainApp></MainApp>
      </ClientSessionProvider>
    </>
  );
}
