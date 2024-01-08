import React, { useContext } from 'react';
import Chart from 'chart.js/auto';

import { AppContext } from '../adapter';

export class NullChart {
    constructor(data, name) {
        this.data = data;
        this.name = name;
    }
    getComponent() {
        const initial_data = this.data;
        const name = this.name
        return function NullChart() {
            const { data } = useContext(AppContext);
            let own_data = data;
            for (let i = 0; i < path.length; i++) {
                let p = path[i];
                console.log('nextkey', p)
                console.log(own_data[p])
                own_data = own_data[p];
                //own_data = own_data[p];
            }
            let d = data;
            path.forEach(key => {
                d = d[key]
            });
            return (
                <div className="rounded-lg border-black border-solid border-2 bg-red-500 p-4">
                    <p>There is no chart defined for this:</p>
                    <p>{data['one'][0]['two']}</p>
                    <p>{JSON.stringify(own_data)}</p>
                    <p>{JSON.stringify(d)}</p>
                    {/* <p>{`${own_data ? JSON.stringify(own_data.types, null, 2) : 'undefined'}`}</p> */}
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
