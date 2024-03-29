import axios from "axios";
import { useSelector } from "react-redux";

const BASE_URL = "https://14268.fullstack.clarusway.com/";

//* Token'siz api istekleri icin bir instance olustur.
export const axiosPublic = axios.create({
  baseURL: BASE_URL,
});

const useAxios = () => {
  const { token } = useSelector((state) => state.auth);

  const axiosWithToken = axios.create({
    baseURL: BASE_URL,
    headers: { Authorization: `Token ${token}` },
  });

  return { axiosWithToken };
};

export default useAxios;
