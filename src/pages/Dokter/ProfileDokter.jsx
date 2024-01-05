import { useLocation, useOutletContext } from "react-router-dom";
import Input from "../../components/Input";
import TextArea from "../../components/TextArea";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateDokter } from "../../config/Redux/Action";

const ProfileDokter = () => {
  const pathName = useLocation().pathname;
  const [role] = useOutletContext();
  const dispatch = useDispatch();
  const { dokter } = useSelector((state) => state.dokterReducer);
  const [dokterForm, setDokterForm] = useState({
    nama: dokter.nama,
    alamat: dokter.alamat,
    no_hp: dokter.no_hp,
  });

  const handleUpdate = (e) => {
    e.preventDefault();
    dispatch(updateDokter(dokter.id, dokterForm));
  };

  useEffect(() => {
    setDokterForm({
      nama: dokter.nama,
      alamat: dokter.alamat,
      no_hp: dokter.no_hp,
    });
  }, [dokter]);

  useEffect(() => {
    if (role !== "dokter") {
      window.location.href = "/";
    }
  }, [role]);
  return (
    <div className="container min-h-[90vh] m-5 my-[3rem]">
      <div className="flex justify-between">
        <h1 className="text-xl font-medium">Dokter</h1>
        <h1>{pathName}</h1>
      </div>

      <div className="card bg-white mt-5 rounded-t-md">
        <div className="header p-3 bg-[#1F4172] text-white rounded-t-md">
          <h2>Profile Dokter</h2>
        </div>
        <div className="p-5">
          <form onSubmit={handleUpdate}>
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
              label="No. HP"
              type="number"
              placeholder="No. HP Dokter"
              value={dokterForm.no_hp}
              onChange={(e) =>
                setDokterForm({ ...dokterForm, no_hp: e.target.value })
              }
            />

            <div className="flex justify-end mt-4">
              <button
                className="bg-[#ff8d9a] p-2 rounded text-white mx-2"
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

export default ProfileDokter;
