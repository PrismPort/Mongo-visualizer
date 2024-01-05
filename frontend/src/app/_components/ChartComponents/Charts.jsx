import { useContext } from 'react';

function NoData() {
    return (<>No data</>);
}

import { AppContext } from "../../_context/AppContext";
export default function Charts() {
    const { data } = useContext(AppContext);
    if (data === undefined) {
        return <NoData />
    }
    return (<>`charts ${data.length}`</>)
}