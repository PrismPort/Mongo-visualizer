"use client"

import React from "react";
import ExampleDoughnut from './components/doughnut'
import {AppProvider} from './adapter'
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

function ExampleCollection(database, collection) {
  
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
      <ExampleDoughnut />
      <ExampleCollection
        database={'TestDB'}
        collection={'TestUserData'} />
    </AppProvider>
  )
}

export default ChartExample;