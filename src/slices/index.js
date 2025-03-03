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
    if (Array.isArray(node.items) && node.items.length) {
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

      if (parentid) {
        const selectedNode = findNodeById(
          JSON.parse(JSON.stringify(state.fileExplores)),
          parentid
        ); // 🔥 No cloning
        if (selectedNode) {
          selectedNode.items.push({
            id: Date.now(),
            name: fileName,
            isFolder,
            items: isFolder ? [] : [],
          });

          saveState({ ...state, fileExplores: state.fileExplores }); // 🔥 Save after mutation
        } else {
          console.error(`Parent node with ID ${parentid} not found.`);
        }
      } else {
        // Adding a new root-level item
        const newNode = {
          id: Date.now(),
          name: fileName,
          isFolder,
          items: isFolder ? [] : [],
        };
        state.fileExplores.push(newNode);

        saveState({ ...state, fileExplores: state.fileExplores });
      }
    },

    fetchById: (state, action) => {
      const selectedNode = findNodeById(
        JSON.parse(JSON.stringify(state.fileExplores)),
        action.payload
      );
      state.singleitems = selectedNode ? selectedNode.items : [];

      console.log("Fetched Node:", selectedNode); // ✅ Debugging
    },
  },
});

export const { AddItem, fetchById } = fileExploreSlice.actions;
export default fileExploreSlice.reducer;
