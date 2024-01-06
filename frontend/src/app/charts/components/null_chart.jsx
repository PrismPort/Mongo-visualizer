import React, {useContext} from 'react';
import Chart from 'chart.js/auto';

import { AppContext } from '../adapter';

export function NullChart({ name }) {
    const {data} = useContext(AppContext);
    const own_data = data.find((item) => item.name ===  name);
    return (
        <div className="rounded-lg border-black border-solid border-2 bg-red-500 p-4">
            <p>There is no chart defined for this own_data:</p>
            <p>{`${own_data ? JSON.stringify(own_data.types, null, 2) : 'undefined'}`}</p>
        </div>
    );
}