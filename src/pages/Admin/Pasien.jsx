import { useEffect, useState } from "react";
import Input from "../../components/Input";
import TextArea from "../../components/TextArea";
import { Spinner, Table } from "flowbite-react";
import { useLocation, useOutletContext } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllPasien,
  getPasienById,
  registerPasien,
  updatePasien,
} from "../../config/Redux/Action/pasienAction";
import Modals from "../../components/Modals";

const Pasien = () => {
  const pathName = useLocation().pathname;
  const [role] = useOutletContext();
  const dispatch = useDispatch();
  const { pasienAll, pasienById } = useSelector((state) => state.pasienReducer);
  const [pasienForm, setPasienForm] = useState({
    nama: "",
    alamat: "",
    no_ktp: "",
    no_hp: "",
    username: "",
    password: "",
  });
  const [editPasienForm, setEditPasienForm] = useState({
    nama: pasienById?.nama,
    alamat: pasienById?.alamat,
    no_ktp: pasienById?.no_ktp,
    no_hp: pasienById?.no_hp,
    username: pasienById?.username,
  });
  const [editPasien, setEditPasien] = useState(false);
  const [idPasien, setIdPasien] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSumit = (e) => {
    e.preventDefault();
    dispatch(registerPasien(pasienForm));
  };

  const handleEdit = (id) => {
    setEditPasien(true);
    setIdPasien(id);
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    dispatch(updatePasien(idPasien, editPasienForm, setLoading, setEditPasien));
  };

  useEffect(() => {
    if (idPasien) {
      dispatch(getPasienById(idPasien));
    }
  }, [dispatch, idPasien]);

  useEffect(() => {
    dispatch(getAllPasien());
  }, [dispatch]);

  useEffect(() => {
    setEditPasienForm({
      nama: pasienById?.nama,
      alamat: pasienById?.alamat,
      no_ktp: pasienById?.no_ktp,
      no_hp: pasienById?.no_hp,
      username: pasienById?.username,
    });
  }, [pasienById]);

  useEffect(() => {
    if (role !== "admin") {
      window.location.href = "/";
    }
  }, [role]);
  return (
    <>
      <div className="container min-h-[90vh] m-5 my-[3rem] ">
        <div className="flex justify-between">
          <h1 className="text-xl font-medium">Pasien</h1>
          <h1>{pathName}</h1>
        </div>
        <form onSubmit={handleSumit} className="mt-5">
          <Input
            label="Nama Pasien"
            type="text"
            placeholder="Nama Pasien"
            onChange={(e) =>
              setPasienForm({ ...pasienForm, nama: e.target.value })
            }
          />
          <TextArea
            label="Alamat"
            type="text"
            placeholder="Alamat Pasien"
            onChange={(e) =>
              setPasienForm({ ...pasienForm, alamat: e.target.value })
            }
          />
          <Input
            label="No. KTP Pasien"
            type="text"
            placeholder="No. KTP Pasien"
            onChange={(e) =>
              setPasienForm({ ...pasienForm, no_ktp: e.target.value })
            }
          />
          <Input
            label="No. HP Pasien"
            type="text"
            placeholder="No. HP Pasien"
            onChange={(e) =>
              setPasienForm({ ...pasienForm, no_hp: e.target.value })
            }
          />
          <Input
            label="Username"
            type="text"
            placeholder="Username"
            onChange={(e) =>
              setPasienForm({ ...pasienForm, username: e.target.value })
            }
          />
          <Input
            label="Password"
            type="password"
            placeholder="Password"
            onChange={(e) =>
              setPasienForm({ ...pasienForm, password: e.target.value })
            }
          />

          <div className="flex justify-between mt-4">
            <button
              className="bg-slate-500 p-2 rounded text-white px-3 text-sm"
              type="reset"
            >
              Reset Form
            </button>
            <button
              className="bg-[#ff8d9a] p-2 rounded text-white mx-2 px-3 text-sm"
              type="submit"
            >
              Tambah
            </button>
          </div>
        </form>

        <div className="card bg-white p-5 mt-[3rem]">
          <div className="card-body">
            <div className="flex justify-between">
              <h1 className="text-xl font-medium">Pasien</h1>
            </div>
            <div className="overflow-x-auto mt-4">
              <Table striped>
                <Table.Head>
                  <Table.HeadCell>No</Table.HeadCell>
                  <Table.HeadCell>Nama</Table.HeadCell>
                  <Table.HeadCell width="30%">Alamat</Table.HeadCell>
                  <Table.HeadCell>No. KTP</Table.HeadCell>
                  <Table.HeadCell>No. HP</Table.HeadCell>
                  <Table.HeadCell>No. RM</Table.HeadCell>
                  <Table.HeadCell>Aksi</Table.HeadCell>
                </Table.Head>
                <Table.Body className="divide-y">
                  {pasienAll.map((pasien, index) => (
                    <>
                      <Table.Row key={index}>
                        <Table.Cell>{index + 1}</Table.Cell>
                        <Table.Cell>{pasien.nama}</Table.Cell>
                        <Table.Cell>{pasien.alamat}</Table.Cell>
                        <Table.Cell>{pasien.no_ktp}</Table.Cell>
                        <Table.Cell>{pasien.no_hp}</Table.Cell>
                        <Table.Cell>{pasien.no_rm}</Table.Cell>
                        <Table.Cell>
                          <button
                            className="bg-[#ff8d9a] p-2 rounded text-white mx-2"
                            onClick={() => handleEdit(pasien.id)}
                          >
                            Edit
                          </button>
                        </Table.Cell>
                      </Table.Row>
                    </>
                  ))}
                </Table.Body>
              </Table>
              <Modals
                openModal={editPasien}
                setOpenModal={setEditPasien}
                title="Edit Pasien"
                buttonClose={false}
                body={
                  <form onSubmit={handleUpdate}>
                    <Input
                      label="No. RM Pasien"
                      type="text"
                      placeholder="No. RM Pasien"
                      value={pasienById?.no_rm}
                      disabled
                    />
                    <Input
                      label="Nama Pasien"
                      type="text"
                      placeholder="Nama Pasien"
                      onChange={(e) =>
                        setEditPasienForm({
                          ...editPasienForm,
                          nama: e.target.value,
                        })
                      }
                      value={editPasienForm.nama}
                    />
                    <TextArea
                      label="Alamat"
                      type="text"
                      placeholder="Alamat Pasien"
                      onChange={(e) =>
                        setEditPasienForm({
                          ...editPasienForm,
                          alamat: e.target.value,
                        })
                      }
                      value={editPasienForm.alamat}
                    />
                    <Input
                      label="No. KTP Pasien"
                      type="text"
                      placeholder="No. KTP Pasien"
                      onChange={(e) =>
                        setEditPasienForm({
                          ...editPasienForm,
                          no_ktp: e.target.value,
                        })
                      }
                      value={editPasienForm.no_ktp}
                    />
                    <Input
                      label="No. HP Pasien"
                      type="text"
                      placeholder="No. HP Pasien"
                      onChange={(e) =>
                        setEditPasienForm({
                          ...editPasienForm,
                          no_hp: e.target.value,
                        })
                      }
                      value={editPasienForm.no_hp}
                    />
                    <Input
                      label="Username"
                      type="text"
                      placeholder="Username"
                      onChange={(e) =>
                        setEditPasienForm({
                          ...editPasienForm,
                          username: e.target.value,
                        })
                      }
                      value={editPasienForm.username}
                    />

                    <div className="flex justify-end mt-4">
                      {loading ? (
                        <button
                          className="bg-[#1B4242] p-2 rounded text-white px-3 text-sm"
                          type="button"
                          disabled
                        >
                          <Spinner
                            color="success"
                            aria-label="Success spinner example"
                          />
                        </button>
                      ) : (
                        <button
                          className="bg-[#ff8d9a] p-2 rounded text-white px-3 text-sm"
                          type="submit"
                        >
                          Edit
                        </button>
                      )}
                    </div>
                  </form>
                }
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Pasien;
