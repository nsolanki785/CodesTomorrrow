import { useCallback } from "react";

const useTraverseTree = () => {
  const insertNode = useCallback((tree, folderId, item, isFolder) => {
    if (!tree) return null;

    const traverse = (currentNode) => {
      if (currentNode.id === folderId && currentNode.isFolder) {
        currentNode.items = [
          ...currentNode.items,
          {
            id: new Date().getTime(), // Unique ID
            name: item,
            isFolder,
            items: isFolder ? [] : null, // Folder contains items, file does not
          },
        ];
        return currentNode;
      }

      if (currentNode.items) {
        currentNode.items = currentNode.items.map(traverse);
      }
      return currentNode;
    };

    return traverse({ ...tree });
  }, []);

  return { insertNode };
};

export default useTraverseTree;
