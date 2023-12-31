import axios from "axios";

export const getDokter = (token, isLogin = false, nav) => {
  return async (dispatch) => {
    try {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}api/auth/dokter/me`
      );
      dispatch({ type: "SET_DOKTER", payload: res.data });
      dispatch({ type: "SET_IS_LOGIN", payload: true });
      localStorage.setItem("role", res.data.role);
      if (isLogin) {
        nav("/" + res.data.id);
      }
    } catch (err) {
      console.log(err);
    }
  };
};

export const loginDokter = (data, nav) => {
  return async (dispatch) => {
    dispatch({ type: "SET_IS_LOADING", payload: true });
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}api/auth/dokter/login`,
        data
      );
      localStorage.setItem("token", res.data.access_token);
      dispatch(getDokter(res.data.access_token, true, nav));
    } catch (err) {
      console.log(err);
    }
  };
};

export const logoutDokter = (token, nav) => {
  return async (dispatch) => {
    try {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      await axios.post(`${import.meta.env.VITE_API_URL}api/auth/dokter/logout`);
      localStorage.removeItem("token");
      dispatch({ type: "SET_IS_LOGIN", payload: false });
      dispatch({ type: "SET_DOKTER", payload: {} });
      nav("/");
    } catch (err) {
      console.log(err);
    }
  };
};
