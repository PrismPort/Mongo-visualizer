// actions.js
import { createAsyncThunk } from "@reduxjs/toolkit";
import { handleShowDatabases } from "../app/_utils/handleShowDatabases";
import { getDocumentsFromCollection } from "..//app/_utils/getDocumentsFromCollection";
import { buildQuery } from "./helper";

// Action to fetch databases
export const fetchDatabases = createAsyncThunk(
  "databases/fetchDatabases",
  async () => {
    try {
      // Perform the data fetching logic here
      const dbList = await handleShowDatabases();
      return dbList.filter((db) => !["admin", "local", "config"].includes(db));
    } catch (error) {
      throw error;
    }
  }
);

export const fetchDatabaseMap = createAsyncThunk(
  "database/fetchDatabaseMap",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch("http://localhost:4000/database-map", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();

      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Define the async action
export const fetchDocuments = createAsyncThunk(
  "app/fetchDocuments",
  async ({ database, collection, query, limit }, thunkAPI) => {
    const response = await getDocumentsFromCollection(
      database,
      collection,
      query,
      limit
    );
    return response;
  }
);

export const toggleKeyVisibility =
  (keyPath, nestedKeys) => (dispatch, getState) => {
    dispatch({
      type: "app/toggleKeyVisibility",
      payload: { keyPath, nestedKeys },
    });

    const state = getState();
    let query = buildQuery(state.app.keyVisibilities);
    console.log("current query", query);
    dispatch(
      fetchDocuments({
        database: state.app.database,
        collection: state.app.collection,
        query,
        limit: 30,
      })
    );
  };
