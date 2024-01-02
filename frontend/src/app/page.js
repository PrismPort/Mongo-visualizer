"use client";

import LoginForm from "./_components/FormComponents/LoginForm";
import ClientSessionProvider from "./_context/ClientSessionProvider";
import { DateBarChart } from './charts/components/date_bar_chart'
import { NumberBarChart } from './charts/components/number_bar_chart'
import SELECTOR from './charts/chart_selector'
import { useContext, createContext } from 'react';


export default function Home() {
  const BarChart = SELECTOR.getChartFor('something')
  const DoughnutChart = SELECTOR.getChartFor('something-different');
  const JetAnotherThing = SELECTOR.getChartFor('something-different');
  return (
    <div className="w-1/2 h-1/2">
      <div className=" w-screen h-screen bg-black/90">
        <ClientSessionProvider>
          <LoginForm></LoginForm>
        </ClientSessionProvider>
      </div>
        {/* <DateBarChart /> */}
      {/* <NumberBarChart /> */}
      {/* <NumberBarChart
          labels={["ten", "twenty", "thirty", "fourty", "fifty", "sixty", "seventy"]}
          numbers={[10, 20, 30, 40, 50, 60, 70]} />
    <DateBarChart />*/}
      {/* <BarChart data='something' />
      <DoughnutChart data='something' /> */}
      {/* <JetAnotherThing /> */}
    </div>
  );
}
