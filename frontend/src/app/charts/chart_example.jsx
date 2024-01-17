"use client"

import React, { useContext } from "react";
import ExampleDoughnut from './components/old/doughnut';
import { AppProvider, AppContext } from './adapter'
import { handleLoadCollections, handleShowDatabases } from "./adapter";
class DoughnutFactory {
  constructor() {
    this.flavours = new Map();
  }
  register(doughnut) {

  }
  getDoughnutFor() {

  }
}

function ChartFactory() {
  const ctx = useContext(AppContext);
  console.log(ctx)
}

function ChartExample() {

  // let dbs
  // setTimeout(
  //   async () => (
  //     dbs = await handleShowDatabases(),
  //     dbs.forEach(async (db) => {
  //       let collections = await handleLoadCollections(db);
  //       collections.forEach(async (collection) => {
  //         console.log(`database: ${db} collection: ${collection}`);

  //       });
  //     })
  //   ), 0);
  return (
    <AppProvider>
      <ChartFactory />
      <ExampleDoughnut />
    </AppProvider>
  )
}

export default ChartExample;