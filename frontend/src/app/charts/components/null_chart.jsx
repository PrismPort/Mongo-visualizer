import React from 'react';
import Chart from 'chart.js/auto';

export function NullChart(){
    let data = 'TODO';
    return (<p className="rounded-lg border-black border-solid border-2 bg-red-500 p-4">`There is no chart defined for this ${data}`</p>)
}