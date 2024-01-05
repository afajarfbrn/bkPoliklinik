import { Table } from "flowbite-react";
import { useLocation, useOutletContext, useParams } from "react-router-dom";
import Modals from "../../components/Modals";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPeriksa } from "../../config/Redux/Action/periksaAction";
import {
  getAllPasien,
  getDaftarPoli,
  getDaftarPoliByPasienId,
  getDetailPriksa,
  getPasienById,
} from "../../config/Redux/Action";

const RiwayatPasien = () => {
  const pathName = useLocation().pathname;
  const [openModal, setOpenModal] = useState(false);
  const [role] = useOutletContext();
  const dispatch = useDispatch();
  const { periksa } = useSelector((state) => state.periksaReducer);
  const { id } = useParams();
  const { daftarPoli, daftarPoliByPasienId } = useSelector(
    (state) => state.daftarPoliReducer
  );
  const { detailPriksa } = useSelector((state) => state.detailPeriksaReducer);
  const { pasienAll, pasienById } = useSelector((state) => state.pasienReducer);
  const [riwayat, setRiwayat] = useState([]);
  const [pasien, setPasien] = useState([]);
  const [idPasien, setIdPasien] = useState("");

  const handleOpenModal = (id) => {
    setOpenModal(true);
    setIdPasien(id);
  };

  const formatPriceInRupiah = (price) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(price);
  };

  useEffect(() => {
    dispatch(getPeriksa());
    dispatch(getDaftarPoli());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getAllPasien());
  }, [dispatch]);

  useEffect(() => {
    if (idPasien) {
      dispatch(getDaftarPoliByPasienId(idPasien));
    }
  }, [dispatch, idPasien]);

  useEffect(() => {
    const matchedPatients = periksa
      .map((item) => {
        return daftarPoli.find(
          (item2) =>
            item.id_daftar_poli === item2.id &&
            item2.jadwal_periksa.id_dokter === id
        );
      })
      .filter((matchedItem) => matchedItem !== undefined);

    const matchedPatients2 = matchedPatients
      .map((item) => {
        return pasienAll.find((item2) => item2.id === item.id_pasien);
      })
      .filter((matchedItem) => matchedItem !== undefined);

    const uniquePatients = [
      ...new Map(matchedPatients2.map((item) => [item.id, item])).values(),
    ];

    setPasien(uniquePatients || []);

    return () => {
      setPasien([]);
    };
  }, [pasienAll, daftarPoli, id, periksa]);

  useEffect(() => {
    if (daftarPoliByPasienId.length > 0) {
      const filteredRiwayat = periksa.filter((item2) =>
        daftarPoliByPasienId.some(
          (item) =>
            item.id === item2.id_daftar_poli &&
            item2?.daftar_poli?.jadwal_periksa?.id_dokter === id &&
            item.id_pasien === idPasien
        )
      );
      setRiwayat(filteredRiwayat);
    }
  }, [daftarPoliByPasienId, periksa, id, idPasien]);

  useEffect(() => {
    if (riwayat.length > 0) {
      dispatch(getDetailPriksa());
    }
  }, [riwayat, dispatch]);

  useEffect(() => {
    if (idPasien) {
      dispatch(getPasienById(idPasien));
    }
  }, [dispatch, idPasien]);

  useEffect(() => {
    if (role !== "dokter") {
      window.location.href = "/";
    }
  }, [role]);
  return (
    <div className="container min-h-[90vh] m-5 my-[3rem]">
      <div className="flex justify-between">
        <h1 className="text-xl font-medium">Riwayat Pasien</h1>
        <h1>{pathName}</h1>
      </div>
      <div className="card bg-white p-5 mt-[3rem]">
        <div className="card-body">
          <div className="flex justify-between">
            <h1 className="text-xl font-medium">Daftar Riwayat Pasien</h1>
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
                {pasien.map((item, index) => {
                  return (
                    <Table.Row key={index}>
                      <Table.Cell>{index + 1}</Table.Cell>
                      <Table.Cell>{item.nama}</Table.Cell>
                      <Table.Cell>{item.alamat}</Table.Cell>
                      <Table.Cell>{item.no_ktp}</Table.Cell>
                      <Table.Cell>{item.no_hp}</Table.Cell>
                      <Table.Cell>{item.no_rm}</Table.Cell>
                      <Table.Cell>
                        <button
                          className="bg-[#ff8d9a]  p-2 rounded text-white mx-2"
                          onClick={() => handleOpenModal(item.id)}
                        >
                          Detail Riwayat Periksa
                        </button>
                      </Table.Cell>
                    </Table.Row>
                  );
                })}
              </Table.Body>
            </Table>
            <Modals
              openModal={openModal}
              setOpenModal={setOpenModal}
              size="xxl"
              title={"Riwayat " + pasienById?.nama}
              body={
                <div className="overflow-x-auto">
                  <Table striped>
                    <Table.Head>
                      <Table.HeadCell>No</Table.HeadCell>
                      <Table.HeadCell>Tanggal Periksa</Table.HeadCell>
                      <Table.HeadCell>Nama Pasien</Table.HeadCell>
                      <Table.HeadCell>Nama Dokter</Table.HeadCell>
                      <Table.HeadCell>Keluhan</Table.HeadCell>
                      <Table.HeadCell>Catatan</Table.HeadCell>
                      <Table.HeadCell>Obat</Table.HeadCell>
                      <Table.HeadCell>Biaya Priksa</Table.HeadCell>
                      <Table.HeadCell>Total Biaya</Table.HeadCell>
                    </Table.Head>
                    <Table.Body className="divide-y">
                      {riwayat?.map((item, index) => (
                        <Table.Row key={index}>
                          <Table.Cell>{index + 1}</Table.Cell>
                          <Table.Cell>{item.tanggal}</Table.Cell>
                          <Table.Cell>
                            {item.daftar_poli?.pasien?.nama}
                          </Table.Cell>
                          <Table.Cell>
                            Dr. {item.daftar_poli?.jadwal_periksa?.dokter?.nama}
                          </Table.Cell>
                          <Table.Cell>{item?.daftar_poli?.keluhan}</Table.Cell>
                          <Table.Cell>{item?.catatan}</Table.Cell>
                          <Table.Cell>
                            {detailPriksa?.map((item2, index) => {
                              if (item2.id_periksa === item.id) {
                                return (
                                  <div key={index}>
                                    {item2?.obat?.nama_obat} -{" "}
                                    {formatPriceInRupiah(item2?.obat?.harga)}
                                  </div>
                                );
                              }
                            })}
                          </Table.Cell>
                          <Table.Cell>{formatPriceInRupiah(150000)}</Table.Cell>
                          <Table.Cell>
                            {formatPriceInRupiah(item.biaya_periksa)}
                          </Table.Cell>
                        </Table.Row>
                      ))}
                    </Table.Body>
                  </Table>
                </div>
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RiwayatPasien;
