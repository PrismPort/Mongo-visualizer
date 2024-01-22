// actions.js
import { createAsyncThunk } from "@reduxjs/toolkit";
import { handleShowDatabases } from "../app/_utils/handleShowDatabases";

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
