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
    if (node.id === id) return node;
    if (node.isFolder && node.items.length) {
      const found = findNodeById(node.items, id);
      if (found) return found;
    }
  }
  return null;
};

// Recursive function to delete a node by ID
const deleteNodeById = (nodes, id) => {
  return nodes.filter((node) => {
    if (node.id === id) return false;
    if (node.isFolder && node.items.length) {
      node.items = deleteNodeById(node.items, id);
    }
    return true;
  });
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
      const newId = Math.floor(Math.random() * 1000);

      const newItem = {
        id: newId,
        name: fileName,
        isFolder,
        items: isFolder ? [] : [],
      };

      if (parentNode) {
        parentNode.items.push(newItem);
      } else {
        state.fileExplores.push(newItem);
      }

      saveState(state);
    },

    fetchById: (state, action) => {
      const selectedNode = findNodeById(state.fileExplores, action.payload);
      state.singleitems = selectedNode ? selectedNode.items : [];
    },

    EditItem: (state, action) => {
      const { id, newName } = action.payload;
      const node = findNodeById(state.fileExplores, id);
      if (node) {
        node.name = newName;
        saveState(state);
      }
    },

    DeleteItem: (state, action) => {
      const { id } = action.payload;
      state.fileExplores = deleteNodeById(state.fileExplores, id);
      saveState(state);
    },
  },
});

export const { AddItem, fetchById, EditItem, DeleteItem } =
  fileExploreSlice.actions;
export default fileExploreSlice.reducer;
