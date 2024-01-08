import React, { useContext } from 'react';
import Chart from 'chart.js/auto';

import { AppContext } from '../adapter';

export class NullChart {
    constructor(data) {
        this.data = data;
    }
    getComponent() {
        const initial_data = this.data;
        return function NullChart() {
            const { data } = useContext(AppContext);
            const own_data = initial_data;
            return (
                <div className="rounded-lg border-black border-solid border-2 bg-red-500 p-4">
                    <p>There is no chart defined for this:</p>
                    <p>{JSON.stringify(data)}</p>
                    <p>{JSON.stringify(own_data)}</p>
                    <p>{`${own_data ? JSON.stringify(own_data.types, null, 2) : 'undefined'}`}</p>
                </div>
            );
        }

    }
}
function NullChartComponent({ data }) {
    // const own_data = this.data.find((item) => item.name);
    console.log('hey!')
    return (
        <div className="rounded-lg border-black border-solid border-2 bg-red-500 p-4">
            <p>There is no chart defined for this:</p>
            <p>{data}</p>
            {/* <p>{`${own_data ? JSON.stringify(own_data.types, null, 2) : 'undefined'}`}</p> */}
        </div>
    );
}
