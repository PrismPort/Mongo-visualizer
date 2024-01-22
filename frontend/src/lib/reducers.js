import { createSlice } from "@reduxjs/toolkit";
import { fetchDatabases, fetchDatabaseMap } from "./actions"; // Import the async actions

const initialState = {
  database: "all",
  databases: [],
  collection: "all",
  collections: {},
  data: null,
  collectionDbMap: {},
  keysAndDocsInfo: {},
  // Add a new state to handle database fetching status
  databasesLoading: false,
  databasesError: null,
  // Add a new state to handle database map fetching status
  databaseMapLoading: false,
  databaseMapError: null,
  databaseMap: {}, // Initialize the database map state
};

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setDatabase: (state, action) => {
      state.database = action.payload;
    },
    setDatabases: (state, action) => {
      state.databases = action.payload;
    },
    setCollection: (state, action) => {
      state.collection = action.payload;
    },
    setCollections: (state, action) => {
      state.collections = action.payload;
    },
    setData: (state, action) => {
      state.data = action.payload;
    },
    setLoadingDatabases: (state, action) => {
      state.databasesLoading = action.payload;
    },
    setLoadingDatabaseMap: (state, action) => {
      state.databaseMapLoading = action.payload;
    },
    // Define other reducers here
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDatabases.pending, (state) => {
        state.databasesLoading = true;
        state.databasesError = null;
      })
      .addCase(fetchDatabases.fulfilled, (state, action) => {
        state.databasesLoading = false;
        state.databases = action.payload; // Update the state with fetched data
      })
      .addCase(fetchDatabases.rejected, (state, action) => {
        state.databasesLoading = false;
        state.databasesError = action.error.message;
      })
      .addCase(fetchDatabaseMap.pending, (state) => {
        state.databaseMapLoading = true;
        state.databaseMapError = null;
      })
      .addCase(fetchDatabaseMap.fulfilled, (state, action) => {
        state.databaseMapLoading = false;
        state.databaseMap = action.payload; // Update the state with fetched database map
      })
      .addCase(fetchDatabaseMap.rejected, (state, action) => {
        state.databaseMapLoading = false;
        state.databaseMapError = action.error.message;
      });
  },
});

export const {
  setDatabase,
  setDatabases,
  setCollection,
  setCollections,
  setData,
  setLoadingDatabases,
  setLoadingDatabaseMap, // Add this action
  // Export other actions
} = appSlice.actions;

export default appSlice.reducer;
