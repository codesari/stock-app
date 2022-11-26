// import { axiosWithToken } from "../service/axiosInstance";
// yukaridaki import u iptal ettik.çünkü axiosToken icin artik bir hook yazdık,token hook'tan gelecek service klasöründen değil
import { useDispatch } from "react-redux";
import { fetchFail, fetchStart, getSuccess } from "../features/stockSlice";
import useAxios from "./useAxios";

const useStockCall = () => {
  const dispatch = useDispatch();
  const { axiosWithToken } = useAxios();

  const getStockData = async (url) => {
    dispatch(fetchStart());
    try {
      const { data } = await axiosWithToken.get(`stock/${url}/`);
      dispatch(getSuccess({ data, url }));
    } catch (error) {
      console.log(error);
      dispatch(fetchFail());
    }
  };
  const getFirms = () => getStockData("firms");
  const getSales = () => getStockData("sales");

  return { getFirms, getSales };
};

export default useStockCall;

// const getFirms = async () => {
//   const url = "firms";
//   dispatch(fetchStart());

//   try {
//      const { data } = await axios.get(`${BASE_URL}stock/firms/`, {
//        headers: { Authorization: `Token ${token}` },
//      });
//     //* axios instance ın icinde base url ve headers bilgileri old. icin yukaridaki kod blogu yerine
//     //* axios instanle yazdigimiz formati kullaniyoruz (axios yerine axiosWithToken li kısmı kullaniyoruz)
//     const { data } = await axiosWithToken.get("stock/firms/");
//     console.log(data);
//      dispatch(getSuccess({data,"firms"}))
//      yukaridaki sekilde firms kabul etmiyor obje formati istiyor.bu yüzden firm ü url degiskeni olarak veriyoruz.
//     dispatch(getSuccess({ data, url }));
//   } catch (error) {
//     console.log(error);
//     dispatch(fetchFail());
//   }
// };
