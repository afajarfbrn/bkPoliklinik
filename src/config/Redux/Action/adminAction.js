import axios from "axios";
import { toast } from "react-toastify";

export const getAdmin = (token, isLogin = false, nav) => {
  return async (dispatch) => {
    try {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}api/auth/admin/me`
      );
      dispatch({ type: "SET_ADMIN", payload: res.data.data });
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

export const loginAdmin = (data, nav, setLoading, setAdmin) => {
  return async (dispatch) => {
    setLoading(true);
    const timer = 2000;
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}api/auth/admin/login`,
        data
      );
      localStorage.setItem("token", res.data.access_token);
      toast.success("Login Berhasil", { autoClose: timer });
      setTimeout(() => {
        dispatch(getAdmin(res.data.access_token, true, nav));
        setLoading(false);
        setAdmin(false);
      }, timer);
    } catch (err) {
      console.log(err.response.data.error);
      toast.error(err.response.data.error);
      setLoading(false);
    }
  };
};

export const logoutAdmin = (token, nav) => {
  return async (dispatch) => {
    try {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      await axios.post(`${import.meta.env.VITE_API_URL}api/auth/admin/logout`);
      localStorage.removeItem("token");
      dispatch({ type: "SET_IS_LOGIN", payload: false });
      dispatch({ type: "SET_ADMIN", payload: {} });
      nav("/");
      localStorage.removeItem("role");
    } catch (err) {
      console.log(err);
    }
  };
};
