"use client";

import React, { useState } from "react";

import InputField from "./InputField";

import { handleLogin } from "../../utils/handleLogin";
import ContainerSelector from "./ContainerSelector";

export default function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [port, setPort] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const loginData = { username, password, address, port };
    const success = await handleLogin(loginData);
    if (success) {
      window.location.href = "/mongoVisualizer";
    } else {
      console.log("Error: Login not successful!");
    }
  };

  return (
    <main className="flex flex-col justify-center items-center">
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

      <ContainerSelector></ContainerSelector>
    </main>
  );
}
