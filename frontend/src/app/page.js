"use client";

import LoginForm from "./_components/FormComponents/LoginForm";
import ClientSessionProvider from "./_context/ClientSessionProvider";
import { DateBarChart } from './charts/components/date_bar_chart'
import { NumberBarChart } from './charts/components/number_bar_chart'

export default function Home() {
  return (
    <div className=" w-screen h-screen bg-black/90">
      <ClientSessionProvider>
        <LoginForm></LoginForm>
      </ClientSessionProvider>
      {/* <NumberBarChart /> */}
      <DateBarChart />
    <div className=" w-screen h-screen">
      <NumberBarChart
        labels={["ten", "twenty", "thirty", "fourty", "fifty", "sixty", "seventy"]}
        numbers={[10, 20, 30, 40, 50, 60, 70]} />
      {/* <DateBarChart /> */}
    </div>
  );
}
