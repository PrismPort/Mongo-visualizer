"use client";

import LoginForm from "./_components/FormComponents/LoginForm";
import ClientSessionProvider from "./_context/ClientSessionProvider";
import { DateBarChart } from './charts/components/date_bar_chart'
import { NumberBarChart } from './charts/components/number_bar_chart'
import SELECTOR from './charts/chart_selector'

export default function Home() {
  const Thing = SELECTOR.getChartFor('something')
  const AnotherThing = SELECTOR.getChartFor('something-different');
  const JetAnotherThing = SELECTOR.getChartFor('something-different');
  return (
    <>
      {/* <div className=" w-screen h-screen bg-black/90">
        <ClientSessionProvider>
          <LoginForm></LoginForm>
        </ClientSessionProvider>
        <DateBarChart />
      </div> */}
        {/* <NumberBarChart /> */}
        {/* <NumberBarChart
          labels={["ten", "twenty", "thirty", "fourty", "fifty", "sixty", "seventy"]}
          numbers={[10, 20, 30, 40, 50, 60, 70]} />
    <DateBarChart />*/}
          {/* <Thing /> */}
        {/* <AnotherThing /> */}
        <JetAnotherThing />
    </>
  );
}
