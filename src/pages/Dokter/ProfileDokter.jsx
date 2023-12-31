import { useLocation, useOutletContext } from "react-router-dom";
import Input from "../../components/Input";
import TextArea from "../../components/TextArea";
import { useEffect } from "react";

const ProfileDokter = () => {
  const pathName = useLocation().pathname;
  const [role] = useOutletContext();

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
          <form action="">
            <Input label="Nama" type="text" placeholder="Nama Dokter" />
            <TextArea label="Alamat" type="text" placeholder="Alamat Dokter" />
            <Input label="No. HP" type="text" placeholder="No. HP Dokter" />

            <div className="flex justify-end mt-4">
              <button className="bg-[#F1B4BB] p-2 rounded text-white mx-2">
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
