import axios from "axios";
import { addDetailPriksa } from "./detailPriksaAction";

export const getPeriksa = () => {
  return async (dispatch) => {
    dispatch({ type: "SET_IS_LOADING", payload: true });
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}api/periksa/`
      );
      dispatch({ type: "SET_PERIKSA", payload: data.data });
    } catch (err) {
      console.log(err);
    }
  };
};

export const getPeriksaByDafPol = (id) => {
  return async (dispatch) => {
    dispatch({ type: "SET_IS_LOADING", payload: true });
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}api/periksa/daftar_poli/${id}`
      );
      dispatch({ type: "SET_PERIKSA_BY_DAF_POL_ID", payload: data.data[0] });
    } catch (err) {
      console.log(err);
    }
  };
};

export const getPeriksaById = (id) => {
  return async (dispatch) => {
    dispatch({ type: "SET_IS_LOADING", payload: true });
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}api/periksa/${id}`
      );
      dispatch({ type: "SET_PERIKSA_BY_ID", payload: data.data });
    } catch (err) {
      console.log(err);
    }
  };
};

export const storePeriksa = (data, nav, id, obat) => {
  return async (dispatch) => {
    dispatch({ type: "SET_IS_LOADING", payload: true });
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}api/periksa/`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      nav("/dokter/daftar-periksa/" + id);
      dispatch(getPeriksa());
      dispatch({ type: "SET_ID_DATA_ADD", payload: res.data.data.id });

      if (obat.length > 0) {
        obat.map((item) => {
          const data = {
            id_periksa: res.data.data.id,
            id_obat: item.value,
          };
          dispatch(addDetailPriksa(data));
        });
      }
    } catch (err) {
      console.log(err);
    }
  };
};

export const updatePeriksa = (id, data, obat) => {
  return async (dispatch) => {
    dispatch({ type: "SET_IS_LOADING", payload: true });
    try {
      await axios.put(
        `${import.meta.env.VITE_API_URL}api/periksa/${id}`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const detailPriksaResponse = await axios.get(
        `${import.meta.env.VITE_API_URL}api/detail_periksa/periksa/${id}`
      );

      const detailPriksa = detailPriksaResponse.data.data;

      // Mengumpulkan hanya ID obat dari detailPriksa dan obat
      const detailObatIDs = detailPriksa.map((detail) => detail.obat.id);
      const obatIDs = obat.map((item) => item.value);

      // Menghapus ID obat yang ada di detailPeriksa tetapi tidak ada di obat
      const obatToDelete = detailObatIDs.filter(
        (obatID) => !obatIDs.includes(obatID)
      );
      obatToDelete.forEach(async (obatID) => {
        // Lakukan operasi hapus data di database untuk ID obat yang tidak ada di obat
        await axios.delete(
          `${
            import.meta.env.VITE_API_URL
          }api/detail_periksa/obat/${obatID}/${id}`
        );
      });

      // Menambahkan ID obat yang ada di obat tetapi tidak ada di detailPeriksa
      const obatToAdd = obatIDs.filter(
        (obatID) => !detailObatIDs.includes(obatID)
      );
      obatToAdd.forEach(async (obatID) => {
        // Lakukan operasi tambah data di database untuk ID obat yang tidak ada di detailPeriksa
        const newData = {
          id_periksa: id,
          id_obat: obatID,
          // Jika ada fields tambahan, sesuaikan di sini
        };
        await axios.post(
          `${import.meta.env.VITE_API_URL}api/detail_periksa`,
          newData
        );
      });

      dispatch(getPeriksa());
    } catch (err) {
      console.log(err);
    }
  };
};

export const deletePeriksa = (id) => {
  return async (dispatch) => {
    dispatch({ type: "SET_IS_LOADING", payload: true });
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}api/periksa/${id}`);

      dispatch(getPeriksa());
    } catch (err) {
      console.log(err);
    }
  };
};
