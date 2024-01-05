import { Dropdown, Footer, Navbar } from "flowbite-react";
import { Link, useNavigate, useParams } from "react-router-dom";
import udinus from "../assets/logo/udinus.png";
import {
  BsDribbble,
  BsFacebook,
  BsGithub,
  BsInstagram,
  BsTwitter,
} from "react-icons/bs";
import { MdOutlineArrowRightAlt } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getAdmin, logoutAdmin } from "../config/Redux/Action/adminAction";
import { getDokter, logoutDokter } from "../config/Redux/Action/dokterAction";
import {
  addDaftarPoli,
  getJadwalPeriksa,
  getPasien,
  getPoli,
  logoutPasien,
} from "../config/Redux/Action";
import Modals from "../components/Modals";
import Input from "../components/Input";
import ReactSelect from "../components/ReactSelect";
import TextArea from "../components/TextArea";
import { FaStethoscope } from "react-icons/fa";
import SwiperCreative from "../components/SwiperCreative";

const Home = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const nav = useNavigate();
  const { admin, isLogin } = useSelector((state) => state.adminReducer);
  const { dokter, isLoginDokter } = useSelector((state) => state.dokterReducer);
  const { pasien, isLoginPasien } = useSelector((state) => state.pasienReducer);
  const { poli } = useSelector((state) => state.poliReducer);
  const { jadwalPeriksa } = useSelector((state) => state.jadwalPeriksaReducer);
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");
  const [daftarPoli, setDaftarPoli] = useState(false);
  const [poliOption, setPoliOption] = useState([]);
  const [selectedPoli, setSelectedPoli] = useState();
  const [jadwal, setJadwal] = useState([]);
  const [daftarPoliForm, setDaftarPoliForm] = useState({
    id_pasien: pasien.id,
    id_jadwal: "",
    keluhan: "",
  });

  console.log(role);

  const handleLogoutAdmin = () => {
    dispatch(logoutAdmin(token, nav));
  };

  const handleLogoutDokter = () => {
    dispatch(logoutDokter(token, nav));
  };

  const handleLogoutPasien = () => {
    dispatch(logoutPasien(token, nav));
  };

  const handleOpenDaftarPoli = () => {
    setDaftarPoli(true);
    dispatch(getPoli());
  };

  const handleCloseDaftarPoli = () => {
    setDaftarPoli(false);
  };

  const handleDaftarPoli = (e) => {
    e.preventDefault();
    dispatch(addDaftarPoli(daftarPoliForm));
    setDaftarPoli(false);
  };

  const dateFormat = (date) => {
    return date?.split(" ")[0];
  };

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

  useEffect(() => {
    if (role === "admin") {
      if (!token || id === undefined) {
        dispatch(getAdmin(token));
        if (isLogin && admin.id !== undefined) {
          nav("/" + admin.id);
        }
      } else {
        dispatch(getAdmin(token));
      }
    }
  }, [dispatch, id, isLogin, nav, token, admin.id, role]);

  useEffect(() => {
    if (role === "dokter") {
      if (!token || id === undefined) {
        dispatch(getDokter(token));
        if (isLoginDokter && dokter.id !== undefined) {
          nav("/" + dokter.id);
        }
      } else {
        dispatch(getDokter(token));
      }
    }
  }, [dispatch, id, isLoginDokter, nav, token, dokter.id, role]);

  useEffect(() => {
    if (role === "pasien") {
      if (!token || id === undefined) {
        dispatch(getPasien(token));
        if (isLoginPasien && pasien.id !== undefined) {
          nav("/" + pasien.id);
        }
      } else {
        dispatch(getPasien(token));
      }
    }
  }, [dispatch, id, isLoginPasien, nav, token, pasien.id, role]);

  useEffect(() => {
    if (poli) {
      const data = poli.map((item) => {
        return {
          value: item.id,
          label: item.nama_poli,
        };
      });
      setPoliOption(data);
    }
  }, [poli]);

  useEffect(() => {
    if (selectedPoli) {
      dispatch(getJadwalPeriksa());
    }
  }, [dispatch, selectedPoli]);

  useEffect(() => {
    if (jadwalPeriksa) {
      const currentDate = new Date();
      const data = jadwalPeriksa
        .map((item) => {
          const date = item.tanggal.split(" ")[0];
          const time = new Date(`${date}T${item.jam_mulai}`);
          if (
            item.dokter.poli.nama_poli === selectedPoli &&
            time >= currentDate
          ) {
            return {
              value: item.id,
              label: `Dr. ${item.dokter.nama}, ${item.hari}, ${dateFormat(
                item.tanggal
              )}, jam ${timeFormat(item.jam_mulai)} sampai ${timeFormat(
                item.jam_selesai
              )}`,
            };
          }
          // Jika kondisi tidak terpenuhi, kembalikan null atau objek kosong
          return null; // atau return {};
        })
        .filter((item) => item !== null); // Filter elemen yang bernilai null

      setJadwal(data);
    }
  }, [jadwalPeriksa, selectedPoli]);

  return (
    <>
      <Navbar rounded className="shadow-md py-5 bg-[#132043]">
        <Navbar.Brand as={Link} href="https://flowbite-react.com">
          <img
            src={udinus}
            className="mr-3 h-6 sm:h-9"
            alt="Flowbite React Logo"
          />
          <span className="self-center whitespace-nowrap text-xl font-semibold text-white">
            Poliklinik BK
          </span>
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="flex items-center">
          <Navbar.Link
            href="#"
            className="flex items-center h-full text-white  "
            as={Link}
          >
            Home
          </Navbar.Link>
          {id && token ? (
            <>
              {role !== "pasien" && (
                <Link
                  to={role == "admin" ? `/admin/${id}` : `/dokter/${id}`}
                  className="flex items-center h-100 text-white"
                >
                  Dashboard
                </Link>
              )}
              <Dropdown
                renderTrigger={() => (
                  <div className="flex items-center">
                    <div className="flex flex-col justify-center items-end mr-2">
                      <h3 className=" font-bold text-white">
                        {admin.username
                          ? admin.username
                          : dokter.username
                          ? dokter.username
                          : pasien.username}
                      </h3>
                      <span className=" text-[12px] text-white">
                        {admin.role
                          ? admin.role
                          : dokter.role
                          ? dokter.role
                          : pasien.role}
                      </span>
                    </div>
                    <img
                      src="https://i.pravatar.cc/150?img=3"
                      alt="user"
                      className="w-10 h-10 rounded-full"
                    />
                  </div>
                )}
                dismissOnClick={false}
                className="bg-red-500"
              >
                <Dropdown.Item
                  className="text-white hover:text-black"
                  onClick={
                    role === "admin"
                      ? () => handleLogoutAdmin()
                      : role === "dokter"
                      ? () => handleLogoutDokter()
                      : () => handleLogoutPasien()
                  }
                >
                  Logout
                </Dropdown.Item>
              </Dropdown>
            </>
          ) : (
            <Link to={"/login"}>
              <button className="bg-[#F1B4BB] text-black p-2 px-3 rounded-lg">
                Login
              </button>
            </Link>
          )}
        </Navbar.Collapse>
      </Navbar>

      <main className="">
        {/* Hero Section */}
        <section className="relative">
          <div className="flex justify-center z-0">
            <img
              src="https://www.stinabooth.com/wp-content/uploads/2017/05/06nmcclinics-studiosb.jpg"
              alt="hero"
              className="w-full h-[50rem] object-cover z-[-1]"
            />
          </div>
          <div className="bg-white w-[80rem] shadow-md mt-[-5rem] z-10 py-[2rem] px-[3rem] rounded-3xl container mx-auto text-center">
            <h1 className="text-2xl lg:text-4xl font-bold leading-tight ">
              Poliklinik BK Udinus
            </h1>
            <p className="text-md lg:text-lg text-gray-800 mt-4">
              Poliklinik BK Udinus merupakan poliklinik yang berada di dalam
              kampus udinus yang menyediakan layanan kesehatan untuk mahasiswa
              dan masyarakat umum.
            </p>
            <p className="mt-4 z-20 flex justify-center">
              {role === "pasien" ? (
                <button
                  className="bg-[#1F4172] p-2 px-3 mt-4 text-white flex w-fit items-center rounded-md"
                  onClick={() => handleOpenDaftarPoli()}
                >
                  Daftar Poli
                  <MdOutlineArrowRightAlt color="white" className="ml-2" />
                </button>
              ) : role === "admin" || role === "dokter" ? (
                <Link
                  to={`/${role}/${role === "admin" ? admin.id : dokter.id}`}
                  className="bg-[#1F4172] p-2 px-3 mt-4 text-white flex w-fit items-center rounded-md"
                >
                  Dashboard{" "}
                  <MdOutlineArrowRightAlt color="white" className="ml-2" />
                </Link>
              ) : (
                <Link
                  to={`/login`}
                  className="bg-[#1F4172] p-2 px-3 mt-4 text-white flex w-fit items-center rounded-md"
                >
                  Register Now{" "}
                  <MdOutlineArrowRightAlt color="white" className="ml-2" />
                </Link>
              )}
            </p>
          </div>
        </section>

        <Modals
          openModal={daftarPoli}
          setOpenModal={handleCloseDaftarPoli}
          title="Daftar Poli"
          buttonClose={false}
          body={
            <form className="mt-[-1.5rem]" onSubmit={handleDaftarPoli}>
              <Input
                label="Nomor Rekam Medis"
                type="text"
                placeholder="Nomor Rekam Medis"
                value={pasien.no_rm}
              />
              <ReactSelect
                data={poliOption}
                title="Poli"
                onChange={(e) => setSelectedPoli(e.label)}
              />
              <ReactSelect
                data={jadwal}
                title="Pilih Jadwal"
                disabled={selectedPoli === "" ? true : false}
                onChange={(e) =>
                  setDaftarPoliForm({ ...daftarPoliForm, id_jadwal: e.value })
                }
              />
              <TextArea
                label="Keluhan"
                placeholder="Keluhan"
                onChange={(e) =>
                  setDaftarPoliForm({
                    ...daftarPoliForm,
                    keluhan: e.target.value,
                  })
                }
              />
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="bg-[#1F4172] p-2 px-3 mt-4 text-white w-fit rounded-md text-sm"
                >
                  Daftar Poli
                </button>
              </div>
            </form>
          }
        />
        {/* Services Section */}
        <section className="mt-[5rem] container mx-auto">
          <div className="text-center my-3">
            <h1 className="text-4xl font-bold leading-tight text-gray-900">
              Layanan
            </h1>
            <p className="text-xl text-gray-700 mt-2">
              Layanan yang tersedia di poliklinik BK Udinus.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-6 mt-[3rem]">
            <div className="card border p-5 rounded hover:shadow-lg">
              <div className="card-header my-2">
                <FaStethoscope size={50} />
              </div>
              <div className="card-body">
                <h1 className="text-xl font-medium">Periksa</h1>
                <p className="mt-2">
                  Periksa kesehatan dengan dokter yang tersedia di poliklinik BK
                  Udinus.
                </p>
              </div>
            </div>
            <div className="card border p-5 rounded hover:shadow-lg">
              <div className="card-header my-2">
                <FaStethoscope size={50} />
              </div>
              <div className="card-body">
                <h1 className="text-xl font-medium">Periksa</h1>
                <p className="mt-2">
                  Periksa kesehatan dengan dokter yang tersedia di poliklinik BK
                  Udinus.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonial Section */}
        <section className="my-[5rem] grid grid-cols-2 gap-6 container mx-auto items-center">
          <div className="text-end">
            <h1 className="text-4xl font-bold leading-tight text-gray-900">
              Testimonial
            </h1>
            <p className="text-xl text-gray-700 mt-2">
              Apa kata mereka tentang poliklinik BK Udinus?.
            </p>
          </div>
          <div className="my-[3rem]">
            <SwiperCreative />
          </div>
        </section>
      </main>

      <Footer container className="bg-[#132043] rounded-none">
        <div className="container mx-auto">
          <div className="grid w-full justify-between sm:flex sm:justify-between md:flex md:grid-cols-1">
            <div>
              <Footer.Brand
                src={udinus}
                alt="Udinus Logo"
                name="Udinus"
                className="h-[4rem] sm:h-[5rem] text-white"
              />
            </div>
            <div className="grid grid-cols-2 gap-8 sm:mt-4 sm:grid-cols-3 sm:gap-6">
              <div>
                <Footer.Title title="about" />
                <Footer.LinkGroup col>
                  <Footer.Link href="#">Flowbite</Footer.Link>
                  <Footer.Link href="#">Tailwind CSS</Footer.Link>
                </Footer.LinkGroup>
              </div>
              <div>
                <Footer.Title title="Follow us" />
                <Footer.LinkGroup col>
                  <Footer.Link href="#">Github</Footer.Link>
                  <Footer.Link href="#">Discord</Footer.Link>
                </Footer.LinkGroup>
              </div>
              <div>
                <Footer.Title title="Legal" />
                <Footer.LinkGroup col>
                  <Footer.Link href="#">Privacy Policy</Footer.Link>
                  <Footer.Link href="#">Terms &amp; Conditions</Footer.Link>
                </Footer.LinkGroup>
              </div>
            </div>
          </div>
          <Footer.Divider />
          <div className="w-full sm:flex sm:items-center sm:justify-between">
            <Footer.Copyright href="#" by="Flowbite™" year={2022} />
            <div className="mt-4 flex space-x-6 sm:mt-0 sm:justify-center">
              <Footer.Icon href="#" icon={BsFacebook} />
              <Footer.Icon href="#" icon={BsInstagram} />
              <Footer.Icon href="#" icon={BsTwitter} />
              <Footer.Icon href="#" icon={BsGithub} />
              <Footer.Icon href="#" icon={BsDribbble} />
            </div>
          </div>
        </div>
      </Footer>
    </>
  );
};

export default Home;
