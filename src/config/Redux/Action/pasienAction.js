import axios from "axios";
import { toast } from "react-toastify";

export const getAllPasien = () => {
  return async (dispatch) => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}api/auth/pasien/getAll`
      );
      dispatch({ type: "SET_PASIEN_ALL", payload: res.data.data });
    } catch (err) {
      console.log(err);
    }
  };
};

export const getPasienById = (id) => {
  return async (dispatch) => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}api/auth/pasien/get/${id}`
      );

      dispatch({ type: "SET_PASIEN_BY_ID", payload: res.data.data });
      console.log(res.data.data);
    } catch (err) {
      console.log(err);
    }
  };
};

export const updatePasien = (id, data, setLoading, setPasien) => {
  return async (dispatch) => {
    if (setLoading) {
      setLoading(true);
    }
    try {
      await axios.put(
        `${import.meta.env.VITE_API_URL}api/auth/pasien/update/${id}`,
        data
      );
      if (setLoading && setPasien) {
        setLoading(false);
        setPasien(false);
      }
      toast.success("Update Berhasil");
      dispatch(getAllPasien());
    } catch (err) {
      console.log(err);
      toast.error("Update Gagal");
      if (setLoading) {
        setLoading(false);
      }
    }
  };
};

export const registerPasien = (data, setPasien, setLoading) => {
  return async () => {
    if (setLoading) {
      setLoading(true);
    }
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}api/auth/pasien/`, data);
      if (setLoading && setPasien) {
        setLoading(false);
        setPasien(false);
      }
      toast.success("Registrasi Berhasil");
      getAllPasien();
    } catch (err) {
      console.log(err);
      toast.error("Registrasi Gagal");
      if (setLoading) {
        setLoading(false);
      }
    }
  };
};

export const getPasien = (token, isLogin = false, nav) => {
  return async (dispatch) => {
    try {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}api/auth/pasien/me`
      );
      dispatch({ type: "SET_PASIEN", payload: res.data.data });
      dispatch({ type: "SET_IS_LOGIN", payload: true });
      localStorage.setItem("role", res.data.data.role);
      if (isLogin) {
        nav("/" + res.data.data.id);
      }
    } catch (err) {
      console.log(err);
    }
  };
};

export const loginPasien = (data, nav, setLoading, setPasien) => {
  return async (dispatch) => {
    setLoading(true);
    const timer = 2000;
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}api/auth/pasien/login`,
        data
      );
      localStorage.setItem("token", res.data.access_token);

      toast.success("Login Berhasil", { autoClose: timer });
      setTimeout(() => {
        dispatch(getPasien(res.data.access_token, true, nav));
        setLoading(false);
        setPasien(false);
      }, timer);
    } catch (err) {
      console.log(err.response.data.error);
      toast.error(err.response.data.error);
      setLoading(false);
    }
  };
};

export const logoutPasien = (token, nav) => {
  return async (dispatch) => {
    try {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      await axios.post(`${import.meta.env.VITE_API_URL}api/auth/pasien/logout`);
      localStorage.removeItem("token");
      dispatch({ type: "SET_IS_LOGIN", payload: false });
      dispatch({ type: "SET_PASIEN", payload: {} });
      nav("/");
      localStorage.removeItem("role");
    } catch (err) {
      console.log(err);
    }
  };
};
