"use client";

import LoginForm from "./_components/FormComponents/LoginForm";
import { DateBarChart } from './charts/components/date_bar_chart'
import { NumberBarChart } from './charts/components/number_bar_chart'

export default function Home() {
  return (
    <div className=" w-screen h-screen bg-black/90">
      {/* <NumberBarChart /> */}
      <DateBarChart />
    </div>
  );
}
