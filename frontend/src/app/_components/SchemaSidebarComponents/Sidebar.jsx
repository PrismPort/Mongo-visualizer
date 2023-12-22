import React, { useState } from 'react';
import SidebarItem from "./SidebarItem.jsx"
import items from "../data/sidebar.json"
import './Sidebar.css';

export default function Sidebar(){
    return (
        <>
        <div className="schemaSidebar">
        <div className="header"><u><b>SCHEMA</b></u></div>
            { items.map((item, index) => <SidebarItem key={index} item={item} />) }
        </div>
        </>
    )
}