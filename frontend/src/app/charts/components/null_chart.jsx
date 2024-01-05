import React from 'react';
import Chart from 'chart.js/auto';

export function NullChart({ data }) {
    return (
        <div className="rounded-lg border-black border-solid border-2 bg-red-500 p-4">
            <p>There is no chart defined for this data:</p>
            <p>{`${JSON.stringify(data.types, null, 2)}`}</p>
        </div>
    );
}