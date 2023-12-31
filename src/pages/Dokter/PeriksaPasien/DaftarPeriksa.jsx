import { Table } from "flowbite-react";
import { useEffect, useState } from "react";
import { FaEdit, FaStethoscope } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import {
  Link,
  useLocation,
  useOutletContext,
  useParams,
} from "react-router-dom";
import {
  getDaftarPoli,
  getDetailPriksaByPeriksaId,
  getObat,
  getPeriksa,
  getPeriksaByDafPol,
  updatePeriksa,
} from "../../../config/Redux/Action";
import Modals from "../../../components/Modals";
import Input from "../../../components/Input";
import ReactSelect from "../../../components/ReactSelect";

const DaftarPeriksa = () => {
  const pathName = useLocation().pathname;
  const [role] = useOutletContext();
  const { id } = useParams();
  const { daftarPoli } = useSelector((state) => state.daftarPoliReducer);
  const { periksa, periksaByDafPolId } = useSelector(
    (state) => state.periksaReducer
  );
  const { detailPriksaByPriksaId } = useSelector(
    (state) => state.detailPeriksaReducer
  );
  const { obat } = useSelector((state) => state.obatReducer);
  const dispatch = useDispatch();
  const [edit, setEdit] = useState(false);
  const [idPeriksa, setIdPeriksa] = useState("");
  const [obatValue, setObatValue] = useState([]);
  const [editForm, setEditForm] = useState({
    id_daftar_poli: periksaByDafPolId?.id_daftar_poli,
    tgl_periksa: periksaByDafPolId?.tanggal,
    catatan: periksaByDafPolId?.catatan,
    biaya_periksa: obatValue.reduce((acc, curr) => acc + curr.harga, 0),
  });

  const handleEdit = (id) => {
    setEdit(true);
    setIdPeriksa(id);
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    const data = {
      ...editForm,
    };
    dispatch(updatePeriksa(periksaByDafPolId?.id, data, obatValue));
    setEdit(false);
  };

  const formatPriceInRupiah = (price) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(price);
  };

  useEffect(() => {
    dispatch(getDaftarPoli());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getPeriksa());
  }, [dispatch]);

  useEffect(() => {
    if (idPeriksa !== "") {
      dispatch(getPeriksaByDafPol(idPeriksa));
      dispatch(getObat());
    }
  }, [dispatch, idPeriksa]);

  useEffect(() => {
    if (periksaByDafPolId?.id) {
      dispatch(getDetailPriksaByPeriksaId(periksaByDafPolId?.id));
    }
  }, [dispatch, periksaByDafPolId?.id]);

  useEffect(() => {
    if (periksaByDafPolId) {
      setEditForm({
        id_daftar_poli: periksaByDafPolId.id_daftar_poli,
        tgl_periksa: periksaByDafPolId.tanggal,
        catatan: periksaByDafPolId.catatan,
        biaya_periksa: obatValue.reduce((acc, curr) => acc + curr.harga, 0),
      });
    }
  }, [periksaByDafPolId, obatValue]);

  useEffect(() => {
    if (detailPriksaByPriksaId?.length > 0) {
      setObatValue([]); // Reset array obat menjadi kosong sebelum membangun kembali

      detailPriksaByPriksaId?.forEach((item) => {
        setObatValue((obat) => [
          ...obat,
          {
            value: item.obat.id,
            label: item.obat.nama_obat,
            harga: item.obat.harga,
          },
        ]);
      });
    } else {
      setObatValue([]); // Jika detailPriksaByPriksaId kosong, reset obat menjadi array kosong
    }
  }, [detailPriksaByPriksaId]);

  useEffect(() => {
    if (role !== "dokter") {
      window.location.href = "/";
    }
  }, [role]);

  return (
    <div className="container min-h-[90vh] m-5 my-[3rem]">
      <div className="flex justify-between">
        <h1 className="text-xl font-medium">Periksa</h1>
        <h1>{pathName}</h1>
      </div>
      <div className="card bg-white p-5 mt-[3rem]">
        <div className="card-body">
          <div className="flex justify-between">
            <h1 className="text-xl font-medium">Daftar Periksa</h1>
          </div>
          <div className="overflow-x-auto mt-4">
            <Table striped>
              <Table.Head>
                <Table.HeadCell>No</Table.HeadCell>
                <Table.HeadCell>Nama Pasien</Table.HeadCell>
                <Table.HeadCell>Keluhan</Table.HeadCell>
                <Table.HeadCell>Aksi</Table.HeadCell>
              </Table.Head>
              <Table.Body className="divide-y">
                {daftarPoli.map((item, index) => (
                  <>
                    <Table.Row key={index}>
                      <Table.Cell>{index + 1}</Table.Cell>
                      <Table.Cell>{item.pasien.nama}</Table.Cell>
                      <Table.Cell>{item.keluhan}</Table.Cell>
                      <Table.Cell width={150}>
                        {periksa?.find(
                          (periksa) => periksa.id_daftar_poli === item.id
                        ) ? (
                          <button
                            className="bg-[#F1B4BB] p-2 rounded text-white mx-2 flex items-center"
                            onClick={() => handleEdit(item.id)}
                          >
                            <FaEdit className="mr-2" /> Edit
                          </button>
                        ) : (
                          <Link
                            to={
                              "/dokter/daftar-periksa/periksa/" +
                              item.id +
                              "/" +
                              id
                            }
                            className="bg-[#f78f9b] p-2 rounded text-white mx-2 flex items-center w-fit"
                          >
                            <FaStethoscope className="mr-2" /> Periksa
                          </Link>
                        )}
                      </Table.Cell>
                    </Table.Row>
                  </>
                ))}
                <Modals
                  openModal={edit}
                  setOpenModal={() => setEdit(!edit)}
                  title={"Edit Periksa"}
                  buttonClose={false}
                  body={
                    <form className="flex flex-col" onSubmit={handleUpdate}>
                      <Input
                        label="Nama Pasien"
                        disabled
                        value={periksaByDafPolId?.daftar_poli?.pasien?.nama}
                        onChange={(e) =>
                          setEditForm({ ...editForm, nama: e.target.value })
                        }
                      />
                      <Input
                        label="Tanggal Periksa"
                        type="datetime-local"
                        value={editForm.tgl_periksa}
                        onChange={(e) =>
                          setEditForm({
                            ...editForm,
                            tgl_periksa: e.target.value,
                          })
                        }
                      />
                      <Input
                        label="Catatan"
                        value={editForm.catatan}
                        onChange={(e) =>
                          setEditForm({ ...editForm, catatan: e.target.value })
                        }
                      />
                      <ReactSelect
                        title="Obat"
                        value={obatValue}
                        isMulti
                        onChange={(e) => {
                          // Membuat objek baru dengan value, label, dan harga
                          const updatedObatValue = e.map((item) => ({
                            value: item.value,
                            label: item.label,
                            harga:
                              obat.find(
                                (obatItem) => obatItem.id === item.value
                              )?.harga || 0, // Mendapatkan harga dari obat yang cocok dengan value
                          }));
                          setObatValue(updatedObatValue); // Menetapkan nilai yang telah diperbarui ke dalam state obatValue
                        }}
                        data={obat.map((item) => ({
                          value: item.id,
                          label: item.nama_obat,
                        }))}
                      />
                      <div className="my-3">
                        <label className="text-black text-sm font-normal mb-5">
                          Biaya Periksa
                        </label>
                        <h2 className="text-black text-md font-normal mb-5">
                          {formatPriceInRupiah(editForm.biaya_periksa)}
                        </h2>
                      </div>
                      <div className="flex justify-end mt-4">
                        <button
                          className="bg-[#F1B4BB] p-2 px-3 text-sm rounded-md text-white mx-2"
                          type="submit"
                        >
                          Simpan
                        </button>
                      </div>
                    </form>
                  }
                />
              </Table.Body>
            </Table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DaftarPeriksa;
