"use client";

import React, { useState, useContext, useEffect } from 'react';
import SidebarItem from "./SidebarItem.jsx"
//import items from "../../_dummyData/sidebar.json"
import './Sidebar.css';
import { AppContext } from "../../_context/AppContext"; 


export default function Sidebar(){

    const {
        database,
        databases,
        updateDatabase,
        updateCollection,
        collection,
        mongoURL,
        collections,
        fetchCollectionsForDatabase,
        data,
        handleAnalyzeCollections,
      } = useContext(AppContext);


      const [items, setItems] = useState([]);

    useEffect(() => {
    const fetchData = async () => {
        // Replace this with your actual data fetching logic
        await handleAnalyzeCollections(mongoURL, database, collection);
        setItems(data || []);
        };

        fetchData();
    }, [mongoURL, database, collection, handleAnalyzeCollections]);

  

    return (
        <>
        <div className="schemaSidebar">
        <div className="header"><u><b>SCHEMA</b></u></div>
            { items.map((item, index) => <SidebarItem key={index} item={item} />) }
        </div>
        </>
    )
}