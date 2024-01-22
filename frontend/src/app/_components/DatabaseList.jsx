import React, { useContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchDatabases, fetchDatabaseMap } from "../../lib/actions";

const DatabaseList = () => {
  const dispatch = useDispatch();
  const {
    databases: reduxDatabases,
    loadingDatabases,
    databasesError,
    databaseMap,
  } = useSelector((state) => state.app);

  useEffect(() => {
    // Dispatch the fetchDatabases action when the component mounts
    dispatch(fetchDatabases());
    dispatch(fetchDatabaseMap());
  }, [dispatch]);

  console.log("redux databaseMap", databaseMap);

  if (loadingDatabases) {
    return <div>Loading databases...</div>;
  }

  if (databasesError) {
    return <div>Error loading databases: {databasesError}</div>;
  }

  // Render the list of databases from Redux store (reduxDatabases)
  return (
    <div>
      <h2>All Databases</h2>
      <ul>
        {reduxDatabases.map((database, index) => (
          <li key={index}>{database}</li>
        ))}
      </ul>
    </div>
  );
};

export default DatabaseList;
