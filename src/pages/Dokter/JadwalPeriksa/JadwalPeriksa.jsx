import { Table } from "flowbite-react";
import { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import {
  Link,
  useLocation,
  useOutletContext,
  useParams,
} from "react-router-dom";
import {
  deleteJadwalPeriksa,
  getJadwalPeriksa,
} from "../../../config/Redux/Action/jadwalPeriksaAction";

const JadwalPeriksa = () => {
  const pathName = useLocation().pathname;
  const [role] = useOutletContext();
  const { id } = useParams();
  const dispatch = useDispatch();
  const { jadwalPeriksa } = useSelector((state) => state.jadwalPeriksaReducer);
  const [jadwal, setJadwal] = useState([]);

  const timeFormat = (time) => {
    const date = new Date(`1970-01-01T${time}`);

    if (isNaN(date)) {
      return "Invalid time";
    }

    return date.toLocaleTimeString("id-ID", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const dateFormat = (date) => {
    const dateObj = new Date(date);
    const month = dateObj.toLocaleString("default", { month: "long" });
    const day = dateObj.getDate();
    const year = dateObj.getFullYear();

    return `${day} ${month} ${year}`;
  };

  const handleDelete = (id) => {
    dispatch(deleteJadwalPeriksa(id));
  };

  useEffect(() => {
    // Mendapatkan waktu saat ini
    const now = new Date();

    // Mendapatkan waktu satu jam ke depan dari saat ini

    // Lakukan pengecekan untuk setiap item jadwalPeriksa
    const updatedJadwal = jadwalPeriksa.map((item) => {
      if (item.id_dokter === id) {
        // Mendapatkan waktu mulai dari jadwal periksa saat ini
        const tanggal = item.tanggal.split(" ")[0];
        const startTime = new Date(`${tanggal}T${item.jam_mulai}`);
        const oneHourBefore = new Date(startTime.getTime() - 60 * 60 * 1000); // Satu jam sebelum

        // Jika waktu mulai dari jadwal periksa saat ini lebih dari satu jam sebelum waktu saat ini
        // maka disableEdit: false
        if (
          startTime > oneHourBefore &&
          startTime > now &&
          now <= oneHourBefore
        ) {
          item.disableEdit = false;
        } else {
          item.disableEdit = true;
        }
      }
      return item;
    });

    setJadwal(updatedJadwal);
  }, [jadwalPeriksa, id]);

  useEffect(() => {
    dispatch(getJadwalPeriksa());
  }, [dispatch]);

  useEffect(() => {
    if (role !== "dokter") {
      window.location.href = "/";
    }
  }, [role]);

  return (
    <div className="container min-h-[90vh] m-5 my-[3rem]">
      <div className="flex justify-between">
        <h1 className="text-xl font-medium">Jadwal Periksa</h1>
        <h1>{pathName}</h1>
      </div>
      <div className="card bg-white p-5 mt-[3rem]">
        <div className="card-body">
          <div className="flex justify-between">
            <h1 className="text-xl font-medium">Daftar Jadwal Periksa</h1>
            <Link
              className="bg-[#1F4172] p-2 rounded text-white mx-2 flex items-center"
              to={"/dokter/jadwal-periksa/kelola-jadwal/" + id}
            >
              <FaPlus className="mr-2" /> Tambah
            </Link>
          </div>
          <div className="overflow-x-auto mt-4">
            <Table striped>
              <Table.Head>
                <Table.HeadCell>No</Table.HeadCell>
                <Table.HeadCell>Nama Dokter</Table.HeadCell>
                <Table.HeadCell>Hari</Table.HeadCell>
                <Table.HeadCell>Jam Mulai</Table.HeadCell>
                <Table.HeadCell>Jam Selesai</Table.HeadCell>
                <Table.HeadCell>Tanggal</Table.HeadCell>
                <Table.HeadCell>Aksi</Table.HeadCell>
              </Table.Head>
              <Table.Body className="divide-y">
                {jadwal.map((item, index) => {
                  if (item.id_dokter === id) {
                    index = 0;
                    return (
                      <Table.Row key={index}>
                        <Table.Cell>{index + 1}</Table.Cell>
                        <Table.Cell>{item.dokter.nama}</Table.Cell>
                        <Table.Cell>{item.hari}</Table.Cell>
                        <Table.Cell>{timeFormat(item.jam_mulai)}</Table.Cell>
                        <Table.Cell>{timeFormat(item.jam_selesai)}</Table.Cell>
                        <Table.Cell>{dateFormat(item.tanggal)}</Table.Cell>
                        <Table.Cell>
                          <Link
                            className={`bg-[#ff8d9a] p-2 rounded text-white mx-2 ${
                              item.disableEdit
                                ? "opacity-50 pointer-events-none"
                                : ""
                            }`}
                            to={`/dokter/jadwal-periksa/kelola-jadwal/${item.id}/${id}`}
                          >
                            Edit
                          </Link>
                          <button
                            className="bg-red-500 p-2 rounded text-white"
                            onClick={() => handleDelete(item.id)}
                          >
                            Hapus
                          </button>
                        </Table.Cell>
                      </Table.Row>
                    );
                  }
                })}
              </Table.Body>
            </Table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JadwalPeriksa;
