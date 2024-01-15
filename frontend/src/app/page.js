"use client";

import LoginForm from "./_components/FormComponents/LoginForm";
import ClientSessionProvider from "./_context/ClientSessionProvider";


export default function Home() {
  return (
    <div className="w-1/2 h-1/2">
      <div className=" w-screen h-screen bg-black/90">
        <ClientSessionProvider>
          <LoginForm></LoginForm>
        </ClientSessionProvider>
      </div>
    </div>
  );
}
