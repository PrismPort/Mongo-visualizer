'use client'
import Image from "next/image";
import LoginForm from "./_components/FormComponents/LoginForm";

import AppProvider from './context/AppContext.js';
import { AppContext } from './context/AppContext.js';

export default function Home() {
  return (
    <AppProvider>
      <LoginForm></LoginForm>
    </AppProvider>
  );
}
