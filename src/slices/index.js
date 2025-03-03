import { createSlice } from "@reduxjs/toolkit";

// Function to load data from localStorage
const loadState = () => {
  try {
    const storedState = localStorage.getItem("fileExplorerState");
    return storedState ? JSON.parse(storedState) : null;
  } catch (error) {
    console.error("Error loading state from localStorage:", error);
    return null;
  }
};

// Function to save data to localStorage
const saveState = (state) => {
  try {
    localStorage.setItem("fileExplorerState", JSON.stringify(state));
  } catch (error) {
    console.error("Error saving state to localStorage:", error);
  }
};

// Recursive function to find a node by ID
const findNodeById = (nodes, id) => {
  for (let node of nodes) {
    if (node.id == id) return node;
    if (node.isFolder && node.items.length) {
      const found = findNodeById(node.items, id);
      if (found) return found;
    }
  }
  return null;
};

// Load initial state from localStorage or use default state
const initialState = loadState() || {
  fileExplores: [
    {
      id: 1,
      name: "root",
      isFolder: true,
      items: [],
    },
  ],
  singleitems: [],
};

export const fileExploreSlice = createSlice({
  name: "fileExplore",
  initialState,
  reducers: {
    AddItem: (state, action) => {
      const { parentid, fileName, isFolder } = action.payload;
      const parentNode = parentid
        ? findNodeById(state.fileExplores, parentid)
        : null;
      const newId = parentNode
        ? parentNode.items.length + 1
        : state.fileExplores.length + 1;

      const newItem = {
        id: newId, // Updated to use length + 1 instead of Date
        name: fileName,
        isFolder,
        items: isFolder ? [] : [],
      };

      if (parentNode) {
        parentNode.items.push(newItem);
      } else {
        state.fileExplores.push(newItem);
      }

      saveState(state); // ✅ Save updated state
    },

    fetchById: (state, action) => {
      const selectedNode = findNodeById(state.fileExplores, action.payload);
      state.singleitems = selectedNode ? selectedNode.items : [];
    },
  },
});

export const { AddItem, fetchById } = fileExploreSlice.actions;
export default fileExploreSlice.reducer;
