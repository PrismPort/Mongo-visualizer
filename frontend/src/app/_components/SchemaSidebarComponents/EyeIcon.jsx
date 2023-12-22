"use client";

import React, { useState } from 'react';
import './EyeIcon.css';
import { LuEye } from "react-icons/lu";
import { LuEyeOff } from "react-icons/lu";

const EyeIcon = ({label, name, id, setVisibility}) => {
    const [isToggled, setIsToggled] = useState(true);

    // set the toggle icons
    const isToggledIcon = <LuEye />;
    const isNotToggledIcon = <LuEyeOff />;

    return (
        <>
            <div className="checkbox"> {/* EyeIcon is a checkbox you can toggle */}
                <input
                    type="checkbox"
                    name={name}
                    id={id}
                    className="sr-only"
                    checked={isToggled} onChange={ () =>{ //when you press the eye (toggle)
                      setIsToggled(!isToggled); //change toggle state
                      setVisibility(isToggled); //change visibility state for parent (SchemaTable)
                    }}
                />
                <label htmlFor={label}> {/* label = eye-icon */}
                    {isToggled ? isToggledIcon : isNotToggledIcon}
                </label>
            </div>
     
        </>
    );
}

export { EyeIcon };
