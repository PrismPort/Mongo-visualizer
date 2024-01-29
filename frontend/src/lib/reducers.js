import { createSlice } from "@reduxjs/toolkit";
import { fetchDatabaseMap, fetchDocuments } from "./actions"; // Import the async actions
import {
  initializeKeyVisibilities,
  setAllChildrenVisibility,
  isAnyChildVisible,
} from "./helper";

const initialState = {
  database: "all",
  collection: "all",
  // Add a new state to handle database fetching status
  databasesLoading: false,
  databasesError: null,
  // Add a new state to handle database map fetching status
  databaseMapLoading: false,
  databaseMapError: null,
  databaseMap: {}, // Initialize the database map state

  keyVisibilities: {},
};

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setDatabase: (state, action) => {
      state.database = action.payload;
    },

    setCollection: (state, action) => {
      state.collection = action.payload;
    },

    setLoadingDatabases: (state, action) => {
      state.databasesLoading = action.payload;
    },
    setLoadingDatabaseMap: (state, action) => {
      state.databaseMapLoading = action.payload;
    },
    // Define other reducers here
    toggleKeyVisibility: (state, action) => {
      const { keyPath, nestedKeys } = action.payload;
      let currentVisibility = state.keyVisibilities;

      // Ensure the structure for the current database and collection
      if (!currentVisibility[state.database]) {
        currentVisibility[state.database] = {};
      }
      if (!currentVisibility[state.database][state.collection]) {
        currentVisibility[state.database][state.collection] = {};
      }

      // Navigate through the nested structure
      currentVisibility = currentVisibility[state.database][state.collection];
      for (let i = 0; i < keyPath.length; i++) {
        const key = keyPath[i];
        if (i === keyPath.length - 1) {
          // If the key has nested children, update their visibility
          if (typeof currentVisibility[key] === "object") {
            const newVisibility = !isAnyChildVisible(currentVisibility[key]);
            setAllChildrenVisibility(currentVisibility[key], newVisibility);
          } else {
            // If no nested children, simply toggle the visibility
            currentVisibility[key] = !currentVisibility[key];
          }

          // If nestedKeys are provided, update their visibility
          if (nestedKeys && Array.isArray(nestedKeys)) {
            nestedKeys.forEach((nestedKey) => {
              if (!currentVisibility[key][nestedKey]) {
                currentVisibility[key][nestedKey] = {};
              }
              currentVisibility[key][nestedKey] = !currentVisibility[key];
            });
          }
        } else {
          if (!currentVisibility[key]) {
            currentVisibility[key] = {};
          }
          currentVisibility = currentVisibility[key];
        }
      }
    },
  },
  extraReducers: (builder) => {
    builder

      .addCase(fetchDatabaseMap.pending, (state) => {
        state.databaseMapLoading = true;
        state.databaseMapError = null;
      })
      .addCase(fetchDatabaseMap.fulfilled, (state, action) => {
        state.databaseMapLoading = false;
        state.databaseMap = action.payload; // Update the state with fetched database map
        state.keyVisibilities = initializeKeyVisibilities(action.payload);
      })
      .addCase(fetchDatabaseMap.rejected, (state, action) => {
        state.databaseMapLoading = false;
        state.databaseMapError = action.error.message;
      });

    builder
      .addCase(fetchDocuments.pending, (state) => {
        state.documentsLoading = true;
        state.documentsError = null;
        state.documents = [];
      })
      .addCase(fetchDocuments.fulfilled, (state, action) => {
        state.documentsLoading = false;
        state.documents = action.payload;
      })
      .addCase(fetchDocuments.rejected, (state, action) => {
        state.documentsLoading = false;
        state.documentsError = action.error.message;
      });
  },
});

export const {
  setDatabase,
  setCollection,
  setLoadingDatabaseMap,
  setLoadingDatabases,
  updateVisibility,
} = appSlice.actions;

export default appSlice.reducer;
