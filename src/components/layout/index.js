import React, { useState } from "react";
import Modal from "../model";
import { useDispatch } from "react-redux";
import { AddItem, EditItem, fetchById } from "../../slices";
import { useParams } from "react-router";

const Layout = ({
  children,
  openModal,
  showModal,
  setShowModal,
  modalData,
  setModalData,
}) => {
  const dispatch = useDispatch();
  const { id } = useParams();

  const handleChange = (e) => {
    setModalData((prev) => ({
      ...prev,
      data: { ...prev.data, name: e.target.value },
    }));
  };

  const handleSubmit = () => {
    if (!modalData.data.name) {
      alert("Please enter a name");
      return;
    }

    if (modalData.data.id) {
      // Editing existing item
      dispatch(
        EditItem({
          id: modalData.data.id,
          newName: modalData.data.name,
        })
      );
    } else {
      // Adding a new item
      dispatch(
        AddItem({
          parentid: id || null,
          fileName: modalData.data.name,
          isFolder: modalData.type === "Folder",
        })
      );
    }

    setShowModal(false);
    setModalData({ title: "", type: "", data: {} });

    if (id) {
      setTimeout(() => {
        dispatch(fetchById(id)); // ✅ Fetch updated data
      }, 100);
    }
  };

  return (
    <>
      <nav className="bg-white border-gray-200 dark:bg-gray-900">
        <div className="flex justify-between mx-auto p-4">
          <span className="text-2xl font-semibold dark:text-white">
            File Explorer
          </span>
          <div>
            <button
              onClick={() => openModal("Folder")}
              className="px-3 py-2 text-white bg-blue-700 rounded-sm"
            >
              Add Folder
            </button>
            <button
              onClick={() => openModal("File")}
              className="px-3 py-2 ml-2 text-white bg-blue-700 rounded-sm"
            >
              Add File
            </button>
          </div>
        </div>
      </nav>

      <div className="p-4">{children}</div>

      {showModal && (
        <Modal
          title={modalData.title}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          handleClose={() => setShowModal(false)}
          editableData={modalData.data}
        />
      )}
    </>
  );
};

export default Layout;
