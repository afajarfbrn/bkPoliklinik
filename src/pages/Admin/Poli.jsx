import TextArea from "../../components/TextArea";
import { useLocation, useOutletContext } from "react-router-dom";
import { Table } from "flowbite-react";
import Input from "../../components/Input";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addPoli,
  deletePoli,
  getPoli,
  getPoliById,
  updatePoli,
} from "../../config/Redux/Action/poliAction";
import Modals from "../../components/Modals";

const Poli = () => {
  const pathName = useLocation().pathname;
  const [role] = useOutletContext();
  const dispatch = useDispatch();
  const { poli, poliById } = useSelector((state) => state.poliReducer);
  const [edit, setEdit] = useState(false);
  const [poliForm, setPoliForm] = useState({
    nama_poli: "",
    keterangan: "",
  });
  const [poliFormEdit, setPoliFormEdit] = useState({
    nama_poli: "",
    keterangan: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addPoli(poliForm));
    setPoliForm({
      nama_poli: "",
      keterangan: "",
    });
  };

  const handleDelete = (id) => {
    dispatch(deletePoli(id));
  };

  const handleEdit = (id) => {
    setEdit(true);
    dispatch(getPoliById(id));
  };

  const handleSumbitEdit = (e, id) => {
    e.preventDefault();
    dispatch(updatePoli(id, poliFormEdit));
    setEdit(false);
  };

  useEffect(() => {
    dispatch(getPoli());
  }, [dispatch]);

  useEffect(() => {
    if (poliById) {
      setPoliFormEdit({
        nama_poli: poliById.nama_poli,
        keterangan: poliById.keterangan,
      });
    }
  }, [poliById]);

  useEffect(() => {
    if (role !== "admin") {
      window.location.href = "/";
    }
  }, [role]);

  return (
    <>
      <div className="container min-h-[90vh] m-5 my-[3rem]">
        <div className="flex justify-between">
          <h1 className="text-xl font-medium">Poli</h1>
          <h1>{pathName}</h1>
        </div>
        <form action="" className="mt-5" onSubmit={handleSubmit}>
          <Input
            label="Nama Poli"
            type="text"
            placeholder="Nama Poli"
            name="nama_poli"
            value={poliForm.nama_poli}
            onChange={(e) =>
              setPoliForm({ ...poliForm, nama_poli: e.target.value })
            }
          />
          <TextArea
            label="Keterangan"
            type="text"
            placeholder="Keterangan"
            name="keterangan"
            value={poliForm.keterangan}
            onChange={(e) =>
              setPoliForm({ ...poliForm, keterangan: e.target.value })
            }
          />

          <div className="flex justify-end mt-4">
            <button className="bg-slate-500 p-2 px-3 text-sm rounded-md text-white">
              Reset Form
            </button>
            <button
              className="bg-[#1B4242] p-2 px-3 text-sm rounded-md text-white mx-2"
              type="submit"
            >
              Tambah
            </button>
          </div>
        </form>

        <div className="card bg-white p-5 mt-[3rem]">
          <div className="card-body">
            <div className="flex justify-between">
              <h1 className="text-xl font-medium">Poli</h1>
            </div>
            <div className="overflow-x-auto mt-4">
              <Table striped>
                <Table.Head>
                  <Table.HeadCell>No</Table.HeadCell>
                  <Table.HeadCell>Nama Poli</Table.HeadCell>
                  <Table.HeadCell width="40%">Keterangan</Table.HeadCell>
                  <Table.HeadCell>Aksi</Table.HeadCell>
                </Table.Head>
                <Table.Body className="divide-y">
                  {poli.map((item, index) => (
                    <>
                      <Table.Row key={index}>
                        <Table.Cell>{index + 1}</Table.Cell>
                        <Table.Cell>{item.nama_poli}</Table.Cell>
                        <Table.Cell>{item.keterangan}</Table.Cell>
                        <Table.Cell>
                          <button
                            className="bg-[#5C8374] p-2 rounded text-white mx-2"
                            onClick={() => handleEdit(item.id)}
                          >
                            Edit
                          </button>
                          <button
                            className="bg-red-500 p-2 rounded text-white mx-2"
                            onClick={() => handleDelete(item.id)}
                          >
                            Hapus
                          </button>
                        </Table.Cell>
                      </Table.Row>
                      <Modals
                        openModal={edit}
                        setOpenModal={setEdit}
                        title="Edit Poli"
                        buttonClose={false}
                        body={
                          <form
                            className="mt-[-1.5rem]"
                            onSubmit={(e) => handleSumbitEdit(e, item.id)}
                          >
                            <Input
                              label="Nama Poli"
                              type="text"
                              placeholder="Nama Poli"
                              name="nama_poli"
                              value={poliFormEdit.nama_poli}
                              onChange={(e) =>
                                setPoliFormEdit({
                                  ...poliFormEdit,
                                  nama_poli: e.target.value,
                                })
                              }
                            />
                            <TextArea
                              label="Keterangan"
                              type="text"
                              placeholder="Keterangan"
                              name="keterangan"
                              value={poliFormEdit.keterangan}
                              onChange={(e) =>
                                setPoliFormEdit({
                                  ...poliFormEdit,
                                  keterangan: e.target.value,
                                })
                              }
                            />
                            <div className="flex justify-end mt-4">
                              <button
                                className="bg-[#1F4172] p-2 px-3 text-sm rounded-md text-white mx-2"
                                type="submit"
                              >
                                Edit
                              </button>
                            </div>
                          </form>
                        }
                      />
                    </>
                  ))}
                </Table.Body>
              </Table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Poli;
