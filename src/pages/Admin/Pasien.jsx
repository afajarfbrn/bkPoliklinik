import { useEffect } from "react";
import Input from "../../components/Input";
import TextArea from "../../components/TextArea";
import { Table } from "flowbite-react";
import { useLocation, useOutletContext } from "react-router-dom";

const Pasien = () => {
  const pathName = useLocation().pathname;
  const [role] = useOutletContext();

  useEffect(() => {
    if (role !== "admin") {
      window.location.href = "/";
    }
  }, [role]);
  return (
    <>
      <div className="container min-h-[90vh] m-5 my-[3rem]">
        <div className="flex justify-between">
          <h1 className="text-xl font-medium">Pasien</h1>
          <h1>{pathName}</h1>
        </div>
        <form action="" className="mt-5">
          <Input label="Nama Pasien" type="text" placeholder="Nama Pasien" />
          <TextArea label="Alamat" type="text" placeholder="Alamat Pasien" />
          <Input
            label="No. KTP Pasien"
            type="text"
            placeholder="No. KTP Pasien"
          />
          <Input
            label="No. HP Pasien"
            type="text"
            placeholder="No. HP Pasien"
          />
          <Input label="No. RM" type="text" placeholder="No. RM" />

          <div className="flex justify-end mt-4">
            <button className="bg-slate-500 p-2 px-3 text-sm rounded text-white">
              Reset Form
            </button>
            <button className="bg-[#F1B4BB] p-2 px-3 text-sm rounded text-white mx-2">
              Tambah
            </button>
          </div>
        </form>

        <div className="card bg-white p-5 mt-[3rem]">
          <div className="card-body">
            <div className="flex justify-between">
              <h1 className="text-xl font-medium">Pasien</h1>
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
                  <Table.Row>
                    <Table.Cell>1</Table.Cell>
                    <Table.Cell>Eko</Table.Cell>
                    <Table.Cell>Jl. Sudirman</Table.Cell>
                    <Table.Cell>123456789</Table.Cell>
                    <Table.Cell>08123456789</Table.Cell>
                    <Table.Cell>202312-001</Table.Cell>
                    <Table.Cell>
                      <button className="bg-[#F1B4BB] p-2 rounded text-white mx-2">
                        Edit
                      </button>
                      <button className="bg-red-500 p-2 rounded text-white">
                        Hapus
                      </button>
                    </Table.Cell>
                  </Table.Row>
                </Table.Body>
              </Table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Pasien;