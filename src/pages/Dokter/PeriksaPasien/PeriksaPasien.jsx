import {
  useLocation,
  useNavigate,
  useOutletContext,
  useParams,
} from "react-router-dom";
import Input from "../../../components/Input";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getDaftarPoliById,
  getObat,
  storePeriksa,
} from "../../../config/Redux/Action";
import ReactSelect from "../../../components/ReactSelect";

const PeriksaPasien = () => {
  const pathName = useLocation().pathname;
  const { id, idPasien } = useParams();
  const [role] = useOutletContext();
  const { daftarPoliById } = useSelector((state) => state.daftarPoliReducer);
  const { obat } = useSelector((state) => state.obatReducer);
  const dispatch = useDispatch();
  const [addForm, setAddForm] = useState({
    id_daftar_poli: idPasien,
    tanggal: "",
    cataan: "",
  });
  const [obatOption, setObatOption] = useState([]);
  const [obatSelected, setObatSelected] = useState([]);
  const [biayaPeriksa, setBiayaPeriksa] = useState(0);
  const nav = useNavigate();

  const formatPriceInRupiah = (price) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(price);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      ...addForm,
      biaya_periksa: biayaPeriksa,
    };
    dispatch(storePeriksa(data, nav, id, obatSelected));
  };

  useEffect(() => {
    if (idPasien !== undefined) {
      dispatch(getDaftarPoliById(idPasien));
    }
  }, [dispatch, idPasien]);

  useEffect(() => {
    dispatch(getObat());
  }, [dispatch]);

  useEffect(() => {
    if (obat.length > 0) {
      const newObat = obat.map((item) => {
        return {
          value: item.id,
          label: item.nama_obat,
          harga: item.harga,
        };
      });
      setObatOption(newObat);
    }
  }, [obat]);

  useEffect(() => {
    if (obatSelected.length > 0) {
      const newBiayaPeriksa = obatSelected.reduce((acc, item) => {
        return acc + item.harga;
      }, 0);
      setBiayaPeriksa(newBiayaPeriksa);
    } else {
      setBiayaPeriksa(0);
    }
  }, [obatSelected]);

  useEffect(() => {
    if (role !== "dokter") {
      window.location.href = "/";
    }
  }, [role]);
  return (
    <div className="container min-h-[90vh] m-5 my-[3rem]">
      <div className="flex justify-between">
        <h1 className="text-xl font-medium">Periksa </h1>
        <h1>{pathName}</h1>
      </div>
      <div className="card bg-white mt-5 rounded-t-md">
        <div className="header p-3 bg-[#1F4172] text-white rounded-t-md">
          <h2>Periksa Pasien</h2>
        </div>
        <div className="p-5">
          <form onSubmit={handleSubmit}>
            <Input
              label="Nama Pasien"
              type="text"
              placeholder="Nama Pasien"
              value={daftarPoliById?.pasien?.nama}
              disabled
            />
            <Input
              label="Tanggal Periksa"
              type="datetime-local"
              placeholder="Tanggal Periksa"
              value={addForm.tanggal}
              onChange={(e) =>
                setAddForm({ ...addForm, tanggal: e.target.value })
              }
            />
            <Input
              label="Catatan"
              type="text"
              placeholder="Catatan"
              value={addForm.catatan}
              onChange={(e) =>
                setAddForm({ ...addForm, catatan: e.target.value })
              }
            />
            <ReactSelect
              title="Obat"
              isMulti={true}
              data={obatOption}
              onChange={(e) => setObatSelected(e)}
            />
            <div className="my-3">
              <label className="text-black text-sm font-normal mb-5">
                Biaya Periksa
              </label>
              <h2 className="text-black text-md font-normal mb-5">
                {formatPriceInRupiah(biayaPeriksa)}
              </h2>
            </div>
            <div className="flex justify-end mt-4">
              <button
                className="bg-[#F1B4BB] p-2 rounded text-white mx-2"
                type="submit"
              >
                Simpan
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PeriksaPasien;
