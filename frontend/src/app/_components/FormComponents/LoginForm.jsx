"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { signIn, useSession } from "next-auth/react"; // Import signIn method

import InputField from "./InputField";

export default function LoginForm() {
  const router = useRouter(); // Use Next.js's router
  const { data: session, status } = useSession(); // Get session data and status

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [port, setPort] = useState("");

  // Redirect to the application page if already in session
  useEffect(() => {
    if (status === "authenticated") {
      router.push("/mongoVisualizer");
    }
  }, [status, router, session]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Use NextAuth's signIn method

    const result = await signIn("credentials", {
      redirect: false, // Prevents automatic redirection
      username,
      password,
      address,
      port,
    });

    if (!result.error) {
      // If authentication is successful
      router.push("/mongoVisualizer");
    } else {
      // Handle failed authentication
      console.log("Error: Login not successful!", result.error);
    }
  };

  return (
    <main className=" h-screen flex flex-col justify-center items-center">
      <form
        onSubmit={handleSubmit}
        className="  w-auto flex flex-col items-center mt-12"
      >
        <section className="bg-green-800 z-20  flex flex-col items-center px-20 py-10 rounded-lg">
          <h1 className="text-white text-2xl font-bold">
            Connect your MongoDB
          </h1>
          <h2 className="text-white mt-1">
            Please enter your data to connect your database
          </h2>
        </section>
        <div className="-mt-16 flex items-center flex-col p-24 rounded-2xl bg-white">
          <InputField
            label="Username"
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <InputField
            label="Password"
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <InputField
            label="Host"
            type="text"
            id="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
          <InputField
            label="Port"
            type="text"
            id="port"
            value={port}
            onChange={(e) => setPort(e.target.value)}
          />
          <button
            type="submit"
            className="bg-green-600 text-white px-16 py-2 rounded-lg mt-6"
          >
            SIGN IN
          </button>

          <p className="text-slate-500 mt-10">
            Don&apos;t have a Database yet? <br />
            Use our{" "}
            <a href="https://docker.com" className="text-blue-600 font-bold">
              Docker Image
            </a>
          </p>
        </div>
      </form>
    </main>
  );
}
