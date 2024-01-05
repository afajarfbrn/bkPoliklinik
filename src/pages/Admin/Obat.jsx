import Input from "../../components/Input";
import { useLocation } from "react-router-dom";
import { Table } from "flowbite-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteObat,
  getObat,
  storeObat,
  getObatById,
  updateObat,
} from "../../config/Redux/Action/obatAction";
import Modals from "../../components/Modals";

const Obat = () => {
  const pathName = useLocation().pathname;
  const dispatch = useDispatch();
  const [editObat, setEditObat] = useState(false);
  const { obat, obatById } = useSelector((state) => state.obatReducer);
  const [obatForm, setObatForm] = useState({
    nama_obat: "",
    kemasan: "",
    harga: "",
  });
  const [obatEditForm, setObatEditForm] = useState({
    nama_obat: "",
    kemasan: "",
    harga: "",
  });
  const [idObat, setIdObat] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(storeObat(obatForm));
    setObatForm({
      nama_obat: "",
      kemasan: "",
      harga: "",
    });
  };

  const handleEdit = (id) => {
    setEditObat(true);
    setIdObat(id);
  };

  const handleDelete = (id) => {
    dispatch(deleteObat(id));
  };

  const handleSumbitEdit = (e) => {
    e.preventDefault();
    dispatch(updateObat(idObat, obatEditForm));
    setEditObat(false);
  };

  const formatPriceInRupiah = (price) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(price);
  };

  useEffect(() => {
    dispatch(getObat());
  }, [dispatch]);

  useEffect(() => {
    if (idObat) {
      dispatch(getObatById(idObat));
    }
  }, [idObat, dispatch]);

  useEffect(() => {
    setObatEditForm({
      nama_obat: obatById.nama_obat,
      kemasan: obatById.kemasan,
      harga: obatById.harga,
    });
  }, [obatById]);

  return (
    <>
      <div className="container min-h-[90vh] m-5 my-[3rem]">
        <div className="flex justify-between">
          <h1 className="text-xl font-medium">Obat</h1>
          <h1>{pathName}</h1>
        </div>
        <form className="mt-5" onSubmit={handleSubmit}>
          <Input
            label="Nama Obat"
            type="text"
            placeholder="Nama Obat"
            name={"nama_obat"}
            value={obatForm.nama_obat}
            onChange={(e) =>
              setObatForm({ ...obatForm, nama_obat: e.target.value })
            }
          />
          <Input
            label="Kemasan"
            type="text"
            placeholder="Kemasan"
            name={"kemasan"}
            value={obatForm.kemasan}
            onChange={(e) =>
              setObatForm({ ...obatForm, kemasan: e.target.value })
            }
          />
          <Input
            label="Harga"
            type="number"
            placeholder="Harga"
            name={"harga"}
            value={obatForm.harga}
            onChange={(e) =>
              setObatForm({ ...obatForm, harga: e.target.value })
            }
          />

          <div className="flex justify-end mt-4">
            <button
              className="bg-slate-500 p-2 px-3 text-sm rounded-md text-white"
              type="reset"
            >
              Reset Form
            </button>
            <button
              className="bg-[#ff8d9a] p-2 px-3 text-sm rounded-md text-white mx-2"
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
            <div className="overflow-auto mt-4 max-h-[40vh]">
              <Table striped>
                <Table.Head>
                  <Table.HeadCell>No</Table.HeadCell>
                  <Table.HeadCell width="40%">Nama Obat</Table.HeadCell>
                  <Table.HeadCell>Kemasan</Table.HeadCell>
                  <Table.HeadCell>Harga</Table.HeadCell>
                  <Table.HeadCell>Aksi</Table.HeadCell>
                </Table.Head>
                <Table.Body className="divide-y">
                  {obat.map((item, index) => (
                    <Table.Row key={item.id}>
                      <Table.Cell>{index + 1}</Table.Cell>
                      <Table.Cell>{item.nama_obat}</Table.Cell>
                      <Table.Cell>{item.kemasan}</Table.Cell>
                      <Table.Cell>{formatPriceInRupiah(item.harga)}</Table.Cell>
                      <Table.Cell>
                        <button
                          className="bg-[#ff8d9a] p-2 rounded text-white mx-2"
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
                  ))}
                </Table.Body>
              </Table>
              <Modals
                openModal={editObat}
                setOpenModal={() => setEditObat(false)}
                title={"Edit Obat"}
                buttonClose={false}
                body={
                  <form className="flex flex-col" onSubmit={handleSumbitEdit}>
                    <Input
                      label="Nama Obat"
                      type="text"
                      placeholder="Nama Obat"
                      name={"nama_obat"}
                      value={obatEditForm.nama_obat}
                      onChange={(e) =>
                        setObatEditForm({
                          ...obatEditForm,
                          nama_obat: e.target.value,
                        })
                      }
                    />
                    <Input
                      label="Kemasan"
                      type="text"
                      placeholder="Kemasan"
                      name={"kemasan"}
                      value={obatEditForm.kemasan}
                      onChange={(e) =>
                        setObatEditForm({
                          ...obatEditForm,
                          kemasan: e.target.value,
                        })
                      }
                    />
                    <Input
                      label="Harga"
                      type="number"
                      placeholder="Harga"
                      name={"harga"}
                      value={obatEditForm.harga}
                      onChange={(e) =>
                        setObatEditForm({
                          ...obatEditForm,
                          harga: e.target.value,
                        })
                      }
                    />
                    <div className="flex justify-end mt-4">
                      <button
                        className="bg-[#ff8d9a] p-2 px-3 rounded text-white mx-2"
                        type="submit"
                      >
                        Update
                      </button>
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

export default Obat;
