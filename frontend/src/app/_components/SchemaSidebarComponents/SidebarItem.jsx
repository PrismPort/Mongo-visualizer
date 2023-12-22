"use client";

import React, { useState } from 'react';
import './SidebarItem.css';
import { EyeIcon } from './EyeIcon.jsx';

export default function SidebarItem({item}){
    const [open, setOpen] = useState(false);
    const [ visibility, setVisibility] = useState(false);

    function generateRandomString(length) {
        let result = '';
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        const charactersLength = characters.length;
        let counter = 0;
        while (counter < length) {
          result += characters.charAt(Math.floor(Math.random() * charactersLength));
          counter += 1;
        }
        return result;
    }

    if(item.children){
        const eyeId = generateRandomString(10);
        return (
            <div className={open ? "sidebar-item open" : "sidebar-item"}>
                <div className="sidebar-title">
                    <span>
                        <div className="flex-item"><EyeIcon label={eyeId} name={eyeId} id={eyeId} setVisibility={setVisibility}/></div>
                        <div className={visibility ? "flex-item key-name toggledOff" : "flex-item key-name"} >{item.name}</div>
                        <div className={visibility ? "flex-item type-name toggledOff" : "flex-item type-name"}>{Array.isArray(item.type) ? <label>{item.type[0]}</label> : <label>{item.type}</label>}</div>
                        <div className={visibility ? "flex-item probability toggledOff" : "flex-item probability"}>{Math.round(item.probability*100)}%</div>
                        <div className="flex-item"><i className="bi-chevron-down toggle-btn" onClick={() => setOpen(!open)}></i></div>
                    </span>
                </div>
                <div className="sidebar-content">
                    { item.children.map((child, index) => <SidebarItem key={index} item={child} />) }
                </div>
            </div>
        )
    }else{
        const eyeId = generateRandomString(10);
        return (
            <div className={open ? "sidebar-item open" : "sidebar-item"}>
                <div className="sidebar-title">
                    <span>
                        <div className="flex-item"><EyeIcon label={eyeId} name={eyeId} id={eyeId} setVisibility={setVisibility}/></div>
                        <div className={visibility ? "flex-item key-name toggledOff" : "flex-item key-name"} >{item.name}</div>
                        <div className={visibility ? "flex-item type-name toggledOff" : "flex-item type-name"}>{Array.isArray(item.type) ? <label>{item.type[0]}</label> : <label>{item.type}</label>}</div>
                        <div className={visibility ? "flex-item probability toggledOff" : "flex-item probability"}>{Math.round(item.probability*100)}%</div>
                    </span>
                </div>
            </div>
        )
    }
    
}