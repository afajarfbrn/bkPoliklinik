import { FaAddressCard, FaRegAddressCard, FaUserAlt } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { MdOutlineArrowRightAlt } from "react-icons/md";
import Modals from "../../components/Modals";
import { useState } from "react";
import { Checkbox, Label, TextInput } from "flowbite-react";
import { HiLockClosed, HiMail } from "react-icons/hi";
import { useDispatch } from "react-redux";
import { loginAdmin } from "../../config/Redux/Action/adminAction";
import { useNavigate } from "react-router-dom";
import { loginDokter } from "../../config/Redux/Action/dokterAction";
import {
  loginPasien,
  registerPasien,
} from "../../config/Redux/Action/pasienAction";

const LoginPortal = () => {
  const dispatch = useDispatch();
  const nav = useNavigate();
  const [pasien, setPasien] = useState(false);
  const [dokter, setDokter] = useState(false);
  const [admin, setAdmin] = useState(false);
  const [register, setRegister] = useState(false);
  const [adminForm, setAdminForm] = useState({
    username: "",
    password: "",
  });
  const [dokterForm, setDokterForm] = useState({
    username: "",
    password: "",
  });
  const [pasienRegister, setPasienRegister] = useState({
    nama: "",
    no_ktp: "",
    no_hp: "",
    username: "",
    password: "",
    alamat: "",
  });
  const [pasienForm, setPasienForm] = useState({
    username: "",
    password: "",
  });

  const handleLoginAdmin = (e) => {
    e.preventDefault();
    dispatch(loginAdmin(adminForm, nav));
  };

  const handleLoginDokter = (e) => {
    e.preventDefault();
    dispatch(loginDokter(dokterForm, nav));
  };

  const handleRegisterPasien = (e) => {
    e.preventDefault();
    dispatch(registerPasien(pasienRegister, setRegister));
    setPasienRegister({
      nama: "",
      no_ktp: "",
      no_hp: "",
      username: "",
      password: "",
      alamat: "",
    });
  };

  const handleLoginPasien = (e) => {
    e.preventDefault();
    dispatch(loginPasien(pasienForm, nav));
    setPasienForm({
      username: "",
      password: "",
    });
    setRegister(false);
  };

  return (
    <>
      <div className="min-h-screen relative bg-[#12486B]">
        <div className="flex items-center h-screen justify-center flex-col container mx-auto relative z-20">
          <h1 className="text-4xl font-bold text-white mb-[5rem]">
            {" "}
            Login Portal{" "}
          </h1>
          <div className="w-full flex flex-col items-center">
            {/* Login Admin */}
            <div className="flex flex-col justify-center items-start bg-white text-black p-5 rounded shadow-lg w-[50rem]">
              <div className="bg-[#092635] p-4 rounded">
                <FaUserAlt size={25} color="white" />
              </div>
              <h1 className=" text-2xl font-bold mt-2">Login Sebagai Pasien</h1>
              <p className=" text-lg">
                Apabila Anda adalah pasien, silahkan login disini.
              </p>
              <button
                className="bg-white text-[#12486B] rounded-full py-2 mt-3 flex items-center hover:underline"
                onClick={() => setPasien(true)}
              >
                Klik Disini <MdOutlineArrowRightAlt className="ml-2" />
              </button>
            </div>
            <div className="flex flex-col justify-center items-start bg-white text-black p-5 rounded shadow-lg w-[50rem] my-3">
              <div className="bg-[#092635] p-4 rounded">
                <FaUserAlt size={25} color="white" />
              </div>
              <h1 className=" text-2xl font-bold mt-2">Login Sebagai Dokter</h1>
              <p className=" text-lg">
                Apabila Anda adalah dokter, silahkan login disini.
              </p>
              <button
                className="bg-white text-[#12486B] rounded-full py-2 mt-3 flex items-center hover:underline"
                onClick={() => setDokter(true)}
              >
                Klik Disini <MdOutlineArrowRightAlt className="ml-2" />
              </button>
            </div>
            <div className="flex flex-col justify-center items-start bg-white text-black p-5 rounded shadow-lg w-[50rem]">
              <div className="bg-[#092635] p-4 rounded">
                <FaUserAlt size={25} color="white" />
              </div>
              <h1 className=" text-2xl font-bold mt-2">Login Sebagai Admin</h1>
              <p className=" text-lg">
                Apabila Anda adalah admin, silahkan login disini.
              </p>
              <button
                className="bg-white text-[#12486B] rounded-full py-2 mt-3 flex items-center hover:underline"
                onClick={() => setAdmin(true)}
              >
                Klik Disini <MdOutlineArrowRightAlt className="ml-2" />
              </button>
            </div>
          </div>
        </div>
        <Modals
          openModal={pasien}
          setOpenModal={setPasien}
          size="lg"
          title="Login Pasien"
          buttonClose={false}
          body={
            <>
              <form className="flex flex-col" onSubmit={handleLoginPasien}>
                <div className="w-full">
                  <TextInput
                    id="username"
                    type="text"
                    icon={HiMail}
                    placeholder="Username"
                    name="username"
                    onChange={(e) => {
                      setPasienForm({
                        ...pasienForm,
                        [e.target.name]: e.target.value,
                      });
                    }}
                    required
                  />
                </div>
                <div className="w-full my-3">
                  <TextInput
                    id="password"
                    type="password"
                    icon={HiLockClosed}
                    placeholder="Password"
                    name="password"
                    onChange={(e) => {
                      setPasienForm({
                        ...pasienForm,
                        [e.target.name]: e.target.value,
                      });
                    }}
                    required
                  />
                </div>
                <div className="flex justify-end text-sm text-[#132043] hover:underline my-1">
                  <button onClick={() => setRegister(true)}>
                    Belum punya akun?
                  </button>
                </div>
                <div className="flex justify-between">
                  <div className="flex items-center gap-2">
                    <Checkbox id="accept" />
                    <Label htmlFor="accept" className="flex">
                      Remember Me
                    </Label>
                  </div>
                  <button
                    className="bg-[#132043] text-white p-2 px-4 rounded-lg w-fit"
                    type="submit"
                  >
                    Login
                  </button>
                </div>
              </form>
            </>
          }
        />
        <Modals
          openModal={register}
          setOpenModal={setRegister}
          size="lg"
          title="Register Pasien"
          buttonClose={false}
          body={
            <>
              <form className="flex flex-col" onSubmit={handleRegisterPasien}>
                <div className="w-full">
                  <TextInput
                    id="nama"
                    type="text"
                    icon={HiMail}
                    placeholder="Full Name"
                    name="nama"
                    onChange={(e) => {
                      setPasienRegister({
                        ...pasienRegister,
                        [e.target.name]: e.target.value,
                      });
                    }}
                    required
                  />
                </div>
                <div className="w-full mt-3">
                  <TextInput
                    id="alamat"
                    type="text"
                    icon={FaLocationDot}
                    placeholder="Alamat"
                    name="alamat"
                    onChange={(e) => {
                      setPasienRegister({
                        ...pasienRegister,
                        [e.target.name]: e.target.value,
                      });
                    }}
                    required
                  />
                </div>
                <div className="w-full mt-3">
                  <TextInput
                    id="no_ktp"
                    type="number"
                    icon={FaAddressCard}
                    placeholder="No. KTP"
                    name="no_ktp"
                    onChange={(e) => {
                      setPasienRegister({
                        ...pasienRegister,
                        [e.target.name]: e.target.value,
                      });
                    }}
                    required
                  />
                </div>
                <div className="w-full mt-3">
                  <TextInput
                    id="no_hp"
                    type="number"
                    icon={FaRegAddressCard}
                    placeholder="No. HP"
                    name="no_hp"
                    onChange={(e) => {
                      setPasienRegister({
                        ...pasienRegister,
                        [e.target.name]: e.target.value,
                      });
                    }}
                    required
                  />
                </div>
                <div className="w-full mt-3">
                  <TextInput
                    id="username"
                    type="text"
                    icon={HiMail}
                    placeholder="Username"
                    name="username"
                    onChange={(e) => {
                      setPasienRegister({
                        ...pasienRegister,
                        [e.target.name]: e.target.value,
                      });
                    }}
                    required
                  />
                </div>
                <div className="w-full my-3">
                  <TextInput
                    id="password"
                    type="password"
                    icon={HiLockClosed}
                    placeholder="Password"
                    name="password"
                    onChange={(e) => {
                      setPasienRegister({
                        ...pasienRegister,
                        [e.target.name]: e.target.value,
                      });
                    }}
                    required
                  />
                </div>

                <div className="flex justify-between">
                  <div className="flex items-center gap-2">
                    <Checkbox id="accept" />
                    <Label htmlFor="accept" className="flex">
                      I agree with the&nbsp;
                      <a
                        href="#"
                        className="text-cyan-600 hover:underline dark:text-cyan-500"
                      >
                        terms and conditions
                      </a>
                    </Label>
                  </div>
                  <button
                    className="bg-[#132043] text-white p-2 px-4 rounded-lg w-fit"
                    type="submit"
                  >
                    Register
                  </button>
                </div>
                <div className="flex justify-end text-sm text-[#132043] hover:underline my-1">
                  <button
                    onClick={() => setRegister(false)}
                    className="text-[#132043]"
                    type="button"
                  >
                    Sudah memiliki akun?
                  </button>
                </div>
              </form>
            </>
          }
        />
        <Modals
          openModal={dokter}
          setOpenModal={setDokter}
          size="lg"
          title="Login Dokter"
          buttonClose={false}
          body={
            <>
              <form className="flex flex-col" onSubmit={handleLoginDokter}>
                <div className="w-full">
                  <TextInput
                    id="nama"
                    type="text"
                    icon={HiMail}
                    placeholder="Username"
                    name="username"
                    onChange={(e) => {
                      setDokterForm({
                        ...dokterForm,
                        [e.target.name]: e.target.value,
                      });
                    }}
                    required
                  />
                </div>
                <div className="w-full my-3">
                  <TextInput
                    id="nama"
                    type="password"
                    icon={HiLockClosed}
                    placeholder="Password"
                    name="password"
                    onChange={(e) => {
                      setDokterForm({
                        ...dokterForm,
                        [e.target.name]: e.target.value,
                      });
                    }}
                    required
                  />
                </div>
                <div className="flex justify-between">
                  <div className="flex items-center gap-2">
                    <Checkbox id="accept" />
                    <Label htmlFor="accept" className="flex">
                      Remember Me
                    </Label>
                  </div>
                  <button
                    className="bg-[#132043] text-white p-2 px-4 rounded-lg w-fit"
                    type="submit"
                  >
                    Login
                  </button>
                </div>
              </form>
            </>
          }
        />
        <Modals
          openModal={admin}
          setOpenModal={setAdmin}
          size="lg"
          title="Login Admin"
          buttonClose={false}
          body={
            <>
              <form className="flex flex-col" onSubmit={handleLoginAdmin}>
                <div className="w-full">
                  <TextInput
                    id="nama"
                    type="text"
                    icon={HiMail}
                    placeholder="Username"
                    name="username"
                    onChange={(e) => {
                      setAdminForm({
                        ...adminForm,
                        [e.target.name]: e.target.value,
                      });
                    }}
                    required
                  />
                </div>
                <div className="w-full my-3">
                  <TextInput
                    id="nama"
                    type="password"
                    icon={HiLockClosed}
                    placeholder="Password"
                    name="password"
                    onChange={(e) => {
                      setAdminForm({
                        ...adminForm,
                        [e.target.name]: e.target.value,
                      });
                    }}
                    required
                  />
                </div>
                <div className="flex justify-between">
                  <div className="flex items-center gap-2">
                    <Checkbox id="accept" />
                    <Label htmlFor="accept" className="flex">
                      Remember Me
                    </Label>
                  </div>
                  <button
                    className="bg-[#132043] text-white p-2 px-4 rounded-lg w-fit"
                    type="submit"
                  >
                    Login
                  </button>
                </div>
              </form>
            </>
          }
        />
      </div>
    </>
  );
};

export default LoginPortal;
