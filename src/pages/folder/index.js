import React, { useEffect } from "react";
import Layout from "../../components/layout";
import { useNavigate, useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { fetchById } from "../../slices";
import { FaRegFile, FaRegFolderClosed } from "react-icons/fa6";

const Folder = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    // dispatch(fetchById(id));
  }, [dispatch, id]);
  const explorer = useSelector((store) => store?.fileExplores?.singleitems);

  console.log("singleitems", explorer);

  return (
    <>
      <Layout>
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
      </Layout>
    </>
  );
};

export default Folder;
