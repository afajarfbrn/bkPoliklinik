import { useLocation, useNavigate, useParams } from "react-router-dom";
import Input from "../../../components/Input";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
import { useEffect, useState } from "react";
import {
  addJadwalPeriksa,
  getJadwalPeriksaById,
  updateJadwalPeriksa,
} from "../../../config/Redux/Action/jadwalPeriksaAction";
import ReactSelect from "../../../components/ReactSelect";

const KelolaJadwalPeriksa = () => {
  const pathName = useLocation().pathname;
  const { id, idJadwal } = useParams();
  const { dokter } = useSelector((state) => state.dokterReducer);
  const { jadwalPeriksaById } = useSelector(
    (state) => state.jadwalPeriksaReducer
  );
  const dispatch = useDispatch();
  const nav = useNavigate();
  const [addForm, setAddForm] = useState({
    id_dokter: id,
    hari: "",
    jam_mulai: "",
    jam_selesai: "",
    tanggal: "",
    status: ""
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addJadwalPeriksa(addForm, nav));
  };

  const handleSubmitEdit = (e) => {
    e.preventDefault();
    dispatch(updateJadwalPeriksa(idJadwal, addForm, nav));
  };

  const dateFormat = (date) => {
    return date?.split(" ")[0];
  };

  useEffect(() => {
    if (idJadwal) {
      dispatch(getJadwalPeriksaById(idJadwal));
    }
  }, [dispatch, idJadwal]);

  useEffect(() => {
    if (jadwalPeriksaById) {
      setAddForm({
        id_dokter: id,
        hari: jadwalPeriksaById.hari,
        jam_mulai: jadwalPeriksaById.jam_mulai,
        jam_selesai: jadwalPeriksaById.jam_selesai,
        tanggal: jadwalPeriksaById.tanggal,
        status: jadwalPeriksaById.status,
      });
    }
  }, [id, jadwalPeriksaById]);

  useEffect(() => {
    if (idJadwal === undefined) {
      setAddForm({
        id_dokter: id,
        hari: "",
        jam_mulai: "",
        jam_selesai: "",
        tanggal: "",
        status: "",
      });
    }
  }, [dispatch, idJadwal]);

  return (
    <div className="container min-h-[90vh] m-5 my-[3rem]">
      <div className="flex justify-between">
        <h1 className="text-xl font-medium">Jadwal Periksa</h1>
        <h1>{pathName}</h1>
      </div>
      <div className="card bg-white mt-5 rounded-t-md">
        <div className="header p-3 bg-[#1F4172] text-white rounded-t-md">
          <h2>{id ? "Edit" : "Tambah"} Jadwal Periksa</h2>
        </div>
        <div className="p-5">
          <form
            onSubmit={idJadwal !== undefined ? handleSubmitEdit : handleSubmit}
          >
            <Input
              label="Nama"
              type="text"
              placeholder="Nama Dokter"
              value={dokter.nama}
              disabled
            />
            <div className="my-3">
              <label className="text-black text-sm font-normal mb-5">
                Hari
              </label>
              <Select
                options={[
                  { value: "1", label: "Senin" },
                  { value: "2", label: "Selasa" },
                  { value: "3", label: "Rabu" },
                  { value: "4", label: "Kamis" },
                  { value: "5", label: "Jumat" },
                  { value: "6", label: "Sabtu" },
                  { value: "7", label: "Minggu" },
                ]}
                name="hari"
                onChange={(e) => setAddForm({ ...addForm, hari: e.label })}
                value={{ label: addForm.hari }}
              />
            </div>
            <Input
              label="Jam Mulai"
              type="time"
              placeholder="Jam Mulai"
              name="jam_mulai"
              value={addForm.jam_mulai}
              onChange={(e) =>
                setAddForm({ ...addForm, jam_mulai: e.target.value })
              }
            />
            <Input
              label="Jam Berakhir"
              type="time"
              placeholder="Jam Berakhir"
              name="jam_selesai"
              value={addForm.jam_selesai}
              onChange={(e) =>
                setAddForm({ ...addForm, jam_selesai: e.target.value })
              }
            />
            <Input
              label="Tanggal"
              type="date"
              placeholder="tanggal"
              name="tanggal"
              value={dateFormat(addForm.tanggal)}
              onChange={(e) =>
                setAddForm({ ...addForm, tanggal: e.target.value })
              }
            />
            <ReactSelect
              data={[
                { value: "Y", label: "Aktif" },
                { value: "N", label: "Tidak Aktif" },
              ]}
              title="Status"
              value={
                addForm.status === "Y"
                  ? { label: "Aktif" }
                  : addForm.status === "N"
                  ? { label: "Tidak Aktif" }
                  : null
              }
              onChange={(e) => setAddForm({ ...addForm, status: e.value })}
            />
            <div className="flex justify-end mt-4">
              <button
                className="bg-[#F1B4BB] p-2 rounded text-white mx-2"
                type="submit"
              >
                {idJadwal ? "Edit" : "Tambah"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default KelolaJadwalPeriksa;
