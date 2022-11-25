import axios from "axios";
import { useSelector } from "react-redux";
import { fetchFail, fetchStart, getSuccess } from "../features/stockSlice";

const Firms = () => {
  //* state'ler yukarida tanimlanmali
  const { token } = useSelector((state) => state.auth);
  const BASE_URL = "https://14268.fullstack.clarusway.com/";

  //? gelen veriyi state lere aktarmam lazim.bunun icin dispatch kullaniyorum
  const dispatch = useDispatch();

  const getFirms = async () => {
    const url = "firms";
    dispatch(fetchStart());
    try {
      const { data } = await axios.get(`${BASE_URL}stock/firms/`, {
        headers: { Authorization: `Token ${token}` },
      });
      console.log(data);
      // dispatch(getSuccess({data,"firms"}))
      // yukaridaki sekilde firms kabul etmiyor obje formati istiyor.bu yüzden firm ü url degiskeni olarak veriyoruz.
      dispatch(getSuccess({ data, url }));
    } catch (error) {
      console.log(error);
      dispatch(fetchFail());
    }
  };
  useEffect(() => {
    getFirms();
  }, []);

  return <div>Firms</div>;
};

export default Firms;

//todo: firm leri state e baska yerlerde bize lazım old.icin yazıyoruz.aksi takdirde her seferinde veri cekecektik
