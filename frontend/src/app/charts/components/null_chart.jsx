import React from 'react';
import Chart from 'chart.js/auto';

export function NullChart({ specific_data }) {
    return (
        <div className="rounded-lg border-black border-solid border-2 bg-red-500 p-4">
            <p>There is no chart defined for this specific_data:</p>
            <p>{`${specific_data ? JSON.stringify(specific_data.types, null, 2) : 'undefined'}`}</p>
        </div>
    );
}