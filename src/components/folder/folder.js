import React, { useState } from "react";
// import "../App.css";
import { FaRegFolderClosed } from "react-icons/fa6";
import { FaRegFile } from "react-icons/fa6";

import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";

const Folder = ({ handleInsertNode }) => {
  const navigate = useNavigate();
  const explorer = useSelector((store) => store?.fileExplores?.fileExplores);
  const { id } = useParams();

  const [showInput, setShowInput] = useState({
    visible: false,
    isFolder: null,
  });
  const [expand, setExpand] = useState(false);

  const handleNewFolder = (e, isFolder) => {
    e.stopPropagation();
    setExpand(true);
    setShowInput({
      visible: true,
      isFolder,
    });
  };

  const onAddFolder = (e) => {
    if (e.keyCode === 13 && e.target.value) {
      //logic
      handleInsertNode(explorer.id, e.target.value, showInput.isFolder);
      setShowInput({ ...showInput, visible: false });
    }
  };

  console.log("explorer", explorer);

  return (
    <>
      <div className="grid grid-cols-12 gap-4">
        {explorer.map((explore) => {
          return (
            <div
              className="border-2 p-3 border-zinc-300"
              onClick={() => navigate(`/${explore?.id}`)}
            >
              <div className="flex justify-center ">
                {explore?.isFolder ? (
                  <FaRegFolderClosed size={20} />
                ) : (
                  <FaRegFile size={20} />
                )}
              </div>
              <div>{explore.name}</div>
            </div>
          );
        }) || []}
      </div>
    </>
  );
};

export default Folder;
