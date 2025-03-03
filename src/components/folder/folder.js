import React, { useState } from "react";
import { FaRegFolderClosed, FaRegFile } from "react-icons/fa6";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { DeleteItem } from "../../slices/index";

const Folder = ({ explorer, openModal }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  const [contextMenu, setContextMenu] = useState(null);

  const handleRightClick = (event, item) => {
    event.preventDefault();
    setContextMenu({ item, x: event.pageX, y: event.pageY });
  };

  const handleDelete = () => {
    if (
      window.confirm(
        `Are you sure you want to delete "${contextMenu.item.name}"?`
      )
    ) {
      dispatch(DeleteItem({ id: contextMenu.item.id }));
    }
    setContextMenu(null);
  };

  return (
    <>
      <div
        className="grid grid-cols-12 gap-4"
        onClick={() => setContextMenu(null)}
      >
        {explorer.map((explore) => (
          <div
            key={explore?.id}
            className="border-2 p-3 border-zinc-300"
            onClick={() => navigate(`/${explore?.id}`)}
            onContextMenu={(e) => {
              handleRightClick(e, explore);
            }}
          >
            <div className="flex justify-center">
              {explore?.isFolder ? (
                <FaRegFolderClosed size={20} />
              ) : (
                <FaRegFile size={20} />
              )}
            </div>
            <div className="flex justify-center ">{explore.name}</div>
          </div>
        ))}

        {contextMenu && (
          <div
            style={{
              position: "absolute",
              top: `${contextMenu.y}px`,
              left: `${contextMenu.x}px`,
              background: "white",
              border: "1px solid gray",
              padding: "5px",
              boxShadow: "2px 2px 10px rgba(0,0,0,0.2)",
              zIndex: 1000,
            }}
          >
            <div
              className="hover:bg-blue-300 mb-2 p-1 cursor-pointer"
              onClick={() => {
                openModal(
                  contextMenu.item.isFolder ? "Folder" : "File",
                  contextMenu.item
                );
                setContextMenu(null);
              }}
            >
              Rename
            </div>
            <div
              className="hover:bg-blue-300 p-1 cursor-pointer"
              onClick={handleDelete}
            >
              Delete
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Folder;
