import { Table } from "flowbite-react";
import { useLocation, useOutletContext } from "react-router-dom";
import Modals from "../../components/Modals";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getPeriksa,
  getPeriksaByDafPol,
} from "../../config/Redux/Action/periksaAction";
import {
  getDaftarPoli,
  getDetailPriksaByPeriksaId,
} from "../../config/Redux/Action";

const RiwayatPasien = () => {
  const pathName = useLocation().pathname;
  const [openModal, setOpenModal] = useState(false);
  const [role] = useOutletContext();
  const dispatch = useDispatch();
  const { periksa, periksaByDafPolId } = useSelector(
    (state) => state.periksaReducer
  );
  const { daftarPoli } = useSelector((state) => state.daftarPoliReducer);
  const { detailPriksaByPriksaId } = useSelector(
    (state) => state.detailPeriksaReducer
  );
  const [riwayat, setRiwayat] = useState([]);
  const [idDaftarPoli, setIdDaftarPoli] = useState("");

  const handleOpenModal = (id) => {
    setOpenModal(true);
    setIdDaftarPoli(id);
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
    if (idDaftarPoli) {
      dispatch(getPeriksaByDafPol(idDaftarPoli));
    }
  }, [idDaftarPoli, dispatch]);

  useEffect(() => {
    daftarPoli.map((item) => {
      periksa.map((item2) => {
        if (item.id === item2.id_daftar_poli) {
          setRiwayat((prev) => [...prev, item2]);
        }
      });
    });

    return () => {
      setRiwayat([]);
    };
  }, [daftarPoli, periksa]);

  useEffect(() => {
    if (periksaByDafPolId) {
      dispatch(getDetailPriksaByPeriksaId(periksaByDafPolId?.id));
    }
  }, [periksaByDafPolId, dispatch]);

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
                {riwayat.map((item, index) => {
                  return (
                    <Table.Row key={index}>
                      <Table.Cell>{index + 1}</Table.Cell>
                      <Table.Cell>{item.daftar_poli.pasien.nama}</Table.Cell>
                      <Table.Cell>{item.daftar_poli.pasien.alamat}</Table.Cell>
                      <Table.Cell>{item.daftar_poli.pasien.no_ktp}</Table.Cell>
                      <Table.Cell>{item.daftar_poli.pasien.no_hp}</Table.Cell>
                      <Table.Cell>{item.daftar_poli.pasien.no_rm}</Table.Cell>
                      <Table.Cell>
                        <button
                          className="bg-[#f78f9b]  p-2 rounded text-white mx-2"
                          onClick={() => handleOpenModal(item.id_daftar_poli)}
                        >
                          Detail Riwayat Periksa
                        </button>
                      </Table.Cell>
                      <Modals
                        buttonClose={false}
                        openModal={openModal}
                        setOpenModal={setOpenModal}
                        size="xxl"
                        title={"Riwayat " + item.daftar_poli.pasien.nama}
                        body={
                          <div className="overflow-x-auto">
                            <Table striped>
                              <Table.Head>
                                <Table.HeadCell>Tanggal Periksa</Table.HeadCell>
                                <Table.HeadCell>Nama Pasien</Table.HeadCell>
                                <Table.HeadCell>Nama Dokter</Table.HeadCell>
                                <Table.HeadCell>Keluhan</Table.HeadCell>
                                <Table.HeadCell>Catatan</Table.HeadCell>
                                <Table.HeadCell>Obat</Table.HeadCell>
                                <Table.HeadCell>Biaya</Table.HeadCell>
                              </Table.Head>
                              <Table.Body className="divide-y">
                                <Table.Row>
                                  <Table.Cell>
                                    {periksaByDafPolId?.tanggal}
                                  </Table.Cell>
                                  <Table.Cell>
                                    {
                                      periksaByDafPolId?.daftar_poli?.pasien
                                        ?.nama
                                    }
                                  </Table.Cell>
                                  <Table.Cell>
                                    Dr.{" "}
                                    {
                                      periksaByDafPolId?.daftar_poli
                                        ?.jadwal_periksa?.dokter?.nama
                                    }
                                  </Table.Cell>
                                  <Table.Cell>
                                    {periksaByDafPolId?.daftar_poli?.keluhan}
                                  </Table.Cell>
                                  <Table.Cell>
                                    {periksaByDafPolId?.catatan}
                                  </Table.Cell>
                                  <Table.Cell>
                                    {detailPriksaByPriksaId?.map(
                                      (item, index) => {
                                        return (
                                          <div key={index}>
                                            {item.obat.nama_obat}
                                          </div>
                                        );
                                      }
                                    )}
                                  </Table.Cell>
                                  <Table.Cell>
                                    {formatPriceInRupiah(
                                      periksaByDafPolId?.biaya_periksa
                                    )}
                                  </Table.Cell>
                                </Table.Row>
                              </Table.Body>
                            </Table>
                          </div>
                        }
                      />
                    </Table.Row>
                  );
                })}
              </Table.Body>
            </Table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RiwayatPasien;

//
