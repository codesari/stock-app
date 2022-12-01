// import { axiosWithToken } from "../service/axiosInstance";
// yukaridaki import u iptal ettik.çünkü axiosToken icin artik bir hook yazdık,token hook'tan gelecek service klasöründen değil
import { useDispatch } from "react-redux";
import {
  fetchFail,
  fetchStart,
  getSuccess,
  getFetchThreeSuccess,
  getAllStockSuccess,
} from "../features/stockSlice";
import { toastErrorNotify, toastSuccessNotify } from "../helper/ToastNotify";
import useAxios from "./useAxios";

const useStockCalls = () => {
  const dispatch = useDispatch();
  const { axiosWithToken } = useAxios();

  //! ------------ GET CALLS -------------

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
  const getCategories = () => getStockData("categories");
  const getBrands = () => getStockData("brands");
  const getProducts = () => getStockData("products");
  const getPurchases = () => getStockData("purchases");

  const getFetchThree = async () => {
    dispatch(fetchStart());
    try {
      const [products, categories, brands] = await Promise.all([
        axiosWithToken.get("stock/products/"),
        axiosWithToken.get("stock/categories/"),
        axiosWithToken.get("stock/brands/"),
      ]);

      dispatch(
        getFetchThreeSuccess([products?.data, categories?.data, brands?.data])
      );
    } catch (error) {
      console.log(error);
      dispatch(fetchFail());
    }
  };
  const getAllStockData = async () => {
    dispatch(fetchStart());
    try {
      const [purchases, firms, brands, sales, products, categories] =
        await Promise.all([
          axiosWithToken.get("/stock/purchases"),
          axiosWithToken.get("/stock/firms"),
          axiosWithToken.get("/stock/brands"),
          axiosWithToken.get("/stock/sales"),
          axiosWithToken.get("/stock/products"),
          axiosWithToken.get("/stock/categories"),
        ]);
      dispatch(
        getAllStockSuccess([
          purchases.data,
          firms.data,
          brands.data,
          sales.data,
          products.data,
          categories.data,
        ])
      );
    } catch (err) {
      dispatch(fetchFail());
    }
  };

  //! ----------- DELETE CALLS ---------------

  const deleteStockData = async (url, id) => {
    try {
      await axiosWithToken.delete(`stock/${url}/${id}/`);
      toastSuccessNotify(`${url} deleted successfully`);
      getStockData(url);
    } catch (error) {
      console.log(error);
      toastErrorNotify(`${url} can not be deleted`);
    }
  };

  const deleteFirm = (id) => deleteStockData("firms", id);
  const deleteBrand = (id) => deleteStockData("brands", id);
  const deleteProduct = (id) => deleteStockData("products", id);

  //! ----------- POST CALLS ---------------
  const postStockData = async (info, url) => {
    try {
      await axiosWithToken.post(`stock/${url}/`, info);
      toastSuccessNotify(`${url} added successfully`);
      getStockData(url);
    } catch (error) {
      console.log(error);
      toastErrorNotify(`${url} can not be added`);
    }
  };
  const postFirm = (info) => postStockData(info, "firms");

  //! ----------- PUT CALLS ---------------
  const putStockData = async (info, url) => {
    try {
      await axiosWithToken.put(`stock/${url}/${info.id}/`, info);
      toastSuccessNotify(`${url} updated successfully`);
      getStockData(url);
    } catch (error) {
      console.log(error);
      toastErrorNotify(`${url} can not be updated`);
    }
  };
  const putFirm = (info) => putStockData(info, "firms");
  const putBrand = (info) => putStockData(info, "brands");

  return {
    getStockData,
    getFirms,
    getSales,
    deleteFirm,
    postStockData,
    postFirm,
    putFirm,
    putStockData,
    getBrands,
    deleteBrand,
    putBrand,
    getCategories,
    getProducts,
    getPurchases,
    deleteProduct,
    getFetchThree,
    getAllStockData,
  };
};

export default useStockCalls;

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
