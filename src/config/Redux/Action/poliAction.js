import axios from "axios";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

export const getPoli = () => {
  return async (dispatch) => {
    try {
      dispatch({ type: "SET_LOADING", payload: true });
      const res = await axios.get(`${import.meta.env.VITE_API_URL}api/poli`);
      dispatch({ type: "SET_POLI", payload: res.data.data });
    } catch (err) {
      console.log(err);
      dispatch({ type: "SET_LOADING", payload: false });
    }
  };
};

export const getPoliById = (id) => {
  return async (dispatch) => {
    try {
      dispatch({ type: "SET_LOADING", payload: true });
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}api/poli/${id}`
      );
      dispatch({ type: "SET_POLI_BY_ID", payload: res.data.data });
    } catch (err) {
      console.log(err);
      dispatch({ type: "SET_LOADING", payload: false });
    }
  };
};

export const addPoli = (data) => {
  return async (dispatch) => {
    try {
      dispatch({ type: "SET_LOADING", payload: true });
      await axios.post(`${import.meta.env.VITE_API_URL}api/poli/`, data);
      toast.success("Berhasil ditambahkan");
      dispatch(getPoli());
    } catch (err) {
      console.log(err);
      dispatch({ type: "SET_LOADING", payload: false });
      toast.error(err.response.data.error);
    }
  };
};

export const deletePoli = (id) => {
  return async (dispatch) => {
    try {
      Swal.fire({
        title: "Are you sure?",
        text: "You will delete this data",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
      }).then(async (result) => {
        if (result.isConfirmed) {
          dispatch({ type: "SET_LOADING", payload: true });
          await axios.delete(`${import.meta.env.VITE_API_URL}api/poli/${id}`);
          dispatch(getPoli());
        }
      });
    } catch (err) {
      console.log(err);
      dispatch({ type: "SET_LOADING", payload: false });
    }
  };
};

export const updatePoli = (id, data) => {
  return async (dispatch) => {
    try {
      dispatch({ type: "SET_LOADING", payload: true });
      await axios.put(`${import.meta.env.VITE_API_URL}api/poli/${id}`, data);
      dispatch(getPoli());
      toast.success("Berhasil diupdate");
    } catch (err) {
      console.log(err);
      dispatch({ type: "SET_LOADING", payload: false });
      toast.error(err.response.data.error);
    }
  };
};
