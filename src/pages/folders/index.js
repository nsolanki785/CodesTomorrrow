import React, { useState } from "react";
import Layout from "../../components/layout";
import Folder from "../../components/folder/folder";
import { useSelector } from "react-redux";

const Folders = () => {
  const explorer = useSelector((store) => store?.fileExplores?.fileExplores);
  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState({ title: "", type: "", data: {} });

  const openModal = (type, data = {}) => {
    setModalData({
      title: type === "Folder" ? "Add Folder" : "Add File",
      type,
      data,
    });
    setShowModal(true);
  };

  return (
    <Layout
      openModal={openModal}
      showModal={showModal}
      setShowModal={setShowModal}
      modalData={modalData}
      setModalData={setModalData}
    >
      <Folder
        explorer={explorer}
        openModal={openModal}
        showModal={showModal}
        setShowModal={setShowModal}
      />
    </Layout>
  );
};

export default Folders;
