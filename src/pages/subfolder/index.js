import React, { useEffect, useState } from "react";
import Layout from "../../components/layout";
import { useNavigate, useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { fetchById } from "../../slices";
import { FaRegFile, FaRegFolderClosed } from "react-icons/fa6";
import Folder from "../../components/folder/folder";

const SubFolder = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(fetchById(id));
  }, [dispatch, id]);
  const explorer = useSelector((store) => store?.fileExplores?.singleitems);
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
    <>
      <Layout
        openModal={openModal}
        showModal={showModal}
        setShowModal={setShowModal}
        modalData={modalData}
        setModalData={setModalData}
      >
        {" "}
        <Folder explorer={explorer} openModal={openModal} />
      </Layout>
    </>
  );
};

export default SubFolder;
