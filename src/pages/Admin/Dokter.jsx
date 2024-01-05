import { useLocation, useOutletContext } from "react-router-dom";
import Input from "../../components/Input";
import { Spinner, Table } from "flowbite-react";
import TextArea from "../../components/TextArea";
import { useEffect, useState } from "react";
import ReactSelect from "../../components/ReactSelect";
import { useDispatch, useSelector } from "react-redux";
import { getPoli, getPoliById } from "../../config/Redux/Action/poliAction";
import {
  getAllDokter,
  getDokterById,
  registerDokter,
  updateDokter,
} from "../../config/Redux/Action/dokterAction";
import Modals from "../../components/Modals";

const Dokter = () => {
  const pathName = useLocation().pathname;
  const [role] = useOutletContext();
  const dispatch = useDispatch();
  const { poli, poliById } = useSelector((state) => state.poliReducer);
  const { allDokter, dokterById } = useSelector((state) => state.dokterReducer);
  const [poliOption, setPoliOption] = useState([]);
  const [poliSelected, setPoliSelected] = useState([]);
  const [dokterForm, setDokterForm] = useState({
    nama: "",
    alamat: "",
    no_hp: "",
    id_poli: "",
    username: "",
    password: "",
    role: "dokter",
  });
  const [editDokter, setEditDokter] = useState(false);
  const [poliEditSelected, setPoliEditSelected] = useState([]);
  const [dokterId, setDokterId] = useState("");
  const [editDokterForm, setEditDokterForm] = useState({
    nama: dokterById?.nama,
    alamat: dokterById?.alamat,
    no_hp: dokterById?.no_hp,
    id_poli: poliEditSelected?.value,
    username: dokterById?.username,
    role: "dokter",
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(registerDokter(dokterForm, setLoading));
    setDokterForm({
      nama: "",
      alamat: "",
      no_hp: "",
      id_poli: "",
      username: "",
      password: "",
      role: "dokter",
    });
    setPoliSelected([]);
  };

  const handleEdit = (id) => {
    setEditDokter(true);
    setDokterId(id);
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    dispatch(updateDokter(dokterId, editDokterForm, setLoading, setEditDokter));
  };

  useEffect(() => {
    setDokterForm({ ...dokterForm, id_poli: poliSelected?.value });
  }, [poliSelected]);

  useEffect(() => {
    if (dokterById) {
      dispatch(getPoliById(dokterById.id_poli));
    }
  }, [dokterById, dispatch]);

  useEffect(() => {
    dispatch(getPoli());
    dispatch(getAllDokter());
  }, [dispatch]);

  useEffect(() => {
    if (poliById) {
      setPoliEditSelected({
        value: poliById.id,
        label: poliById.nama_poli,
      });
    }
  }, [poliById]);

  useEffect(() => {
    if (poli) {
      setPoliOption(
        poli.map((item) => {
          return {
            value: item.id,
            label: item.nama_poli,
          };
        })
      );
    }
  }, [poli]);

  useEffect(() => {
    if (dokterId) {
      dispatch(getDokterById(dokterId));
    }
  }, [dokterId, dispatch]);

  useEffect(() => {
    if (dokterById) {
      setEditDokterForm({
        nama: dokterById.nama,
        alamat: dokterById.alamat,
        no_hp: dokterById.no_hp,
        username: dokterById.username,
        role: "dokter",
      });
    }
  }, [dokterById]);

  useEffect(() => {
    setEditDokterForm({ ...editDokterForm, id_poli: poliEditSelected?.value });
  }, [poliEditSelected]);

  useEffect(() => {
    if (role !== "admin") {
      window.location.href = "/";
    }
  }, [role]);

  return (
    <>
      <div className="container min-h-[90vh] m-5 my-[3rem]">
        <div className="flex justify-between">
          <h1 className="text-xl font-medium">Dokter</h1>
          <h1>{pathName}</h1>
        </div>
        <form className="mt-5" onSubmit={handleSubmit}>
          <Input
            label="Nama"
            type="text"
            placeholder="Nama Dokter"
            value={dokterForm.nama}
            onChange={(e) =>
              setDokterForm({ ...dokterForm, nama: e.target.value })
            }
          />
          <TextArea
            label="Alamat"
            type="text"
            placeholder="Alamat Dokter"
            value={dokterForm.alamat}
            onChange={(e) =>
              setDokterForm({ ...dokterForm, alamat: e.target.value })
            }
          />
          <Input
            label="No HP"
            type="number"
            placeholder="No. HP Dokter"
            value={dokterForm.no_hp}
            onChange={(e) =>
              setDokterForm({ ...dokterForm, no_hp: e.target.value })
            }
          />
          <ReactSelect
            title="Poli"
            data={poliOption}
            value={poliSelected}
            onChange={(e) => setPoliSelected(e)}
          />
          <Input
            label="Username"
            type="text"
            placeholder="Username"
            value={dokterForm.username}
            onChange={(e) =>
              setDokterForm({ ...dokterForm, username: e.target.value })
            }
          />
          <Input
            label="Password"
            type="password"
            placeholder="Password"
            value={dokterForm.password}
            onChange={(e) =>
              setDokterForm({ ...dokterForm, password: e.target.value })
            }
          />

          <div className="flex justify-between mt-4">
            <button
              className="bg-slate-500 p-2 px-3 text-sm rounded text-white"
              type="reset"
            >
              Reset Form
            </button>
            {loading ? (
              <button
                className="bg-[#ff8d9a] p-2 text-sm px-3 rounded text-white mx-2 cursor-default "
                type="button"
              >
                <Spinner color="success" />
              </button>
            ) : (
              <button
                className="bg-[#ff8d9a] p-2 text-sm px-3 rounded text-white mx-2"
                type="submit"
              >
                Tambah
              </button>
            )}
          </div>
        </form>

        <div className="card bg-white p-5 mt-[3rem]">
          <div className="card-body">
            <div className="flex justify-between">
              <h1 className="text-xl font-medium"> Dokter</h1>
            </div>
            <div className="overflow-x-auto mt-4">
              <Table striped>
                <Table.Head>
                  <Table.HeadCell>No</Table.HeadCell>
                  <Table.HeadCell>Nama</Table.HeadCell>
                  <Table.HeadCell>Alamat</Table.HeadCell>
                  <Table.HeadCell>No. HP</Table.HeadCell>
                  <Table.HeadCell>Poli</Table.HeadCell>
                  <Table.HeadCell>Aksi</Table.HeadCell>
                </Table.Head>
                <Table.Body className="divide-y">
                  {allDokter.map((item, index) => (
                    <Table.Row key={index}>
                      <Table.Cell>{index + 1}</Table.Cell>
                      <Table.Cell>Dr. {item.nama}</Table.Cell>
                      <Table.Cell>{item.alamat}</Table.Cell>
                      <Table.Cell>{item.no_hp}</Table.Cell>
                      <Table.Cell>{item?.poli?.nama_poli}</Table.Cell>
                      <Table.Cell>
                        <button
                          className="bg-[#ff8d9a] p-2 rounded text-white mx-2"
                          onClick={() => handleEdit(item.id)}
                        >
                          Edit
                        </button>
                      </Table.Cell>
                    </Table.Row>
                  ))}
                </Table.Body>
              </Table>
              <Modals
                openModal={editDokter}
                setOpenModal={() => setEditDokter(false)}
                title="Edit Dokter"
                buttonClose={false}
                body={
                  <form onSubmit={handleUpdate}>
                    <Input
                      label="Nama"
                      type="text"
                      placeholder="Nama Dokter"
                      value={editDokterForm?.nama}
                      onChange={(e) =>
                        setEditDokterForm({
                          ...editDokterForm,
                          nama: e.target.value,
                        })
                      }
                    />
                    <TextArea
                      label="Alamat"
                      type="text"
                      placeholder="Alamat Dokter"
                      value={editDokterForm?.alamat}
                      onChange={(e) =>
                        setEditDokterForm({
                          ...editDokterForm,
                          alamat: e.target.value,
                        })
                      }
                    />
                    <Input
                      label="No HP"
                      type="number"
                      placeholder="No. HP Dokter"
                      value={editDokterForm?.no_hp}
                      onChange={(e) =>
                        setEditDokterForm({
                          ...editDokterForm,
                          no_hp: e.target.value,
                        })
                      }
                    />
                    <ReactSelect
                      title="Poli"
                      data={poliOption}
                      value={poliEditSelected}
                      onChange={(e) => setPoliEditSelected(e)}
                    />
                    <Input
                      label="Username"
                      type="text"
                      placeholder="Username"
                      value={editDokterForm?.username}
                      onChange={(e) =>
                        setEditDokterForm({
                          ...editDokterForm,
                          username: e.target.value,
                        })
                      }
                    />
                    <div className="flex justify-end">
                      {loading ? (
                        <button
                          className="bg-[#ff8d9a] p-2 text-sm px-3 mt-5 rounded text-white"
                          type="button"
                          disabled
                        >
                          <Spinner color="white" />
                        </button>
                      ) : (
                        <button
                          className="bg-[#ff8d9a] p-2 text-sm px-3 mt-5 rounded text-white"
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

export default Dokter;
