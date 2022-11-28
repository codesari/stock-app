// import { Box, Typography } from "@mui/material";
// tek tek ilgili yerden cagirmak performans acisindan daha iyi
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";

import { useEffect } from "react";
import useStockCall from "../hooks/useStockCalls";
import { useSelector } from "react-redux";
import FirmCard from "../components/FirmCard";
import NewFirmModal from "../components/modals/NewFirmModal";
import { useState } from "react";

// import { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchFail, fetchStart, getSuccess } from "../features/stockSlice";

const Firms = () => {
  const { getFirms } = useStockCall();
  const { firms } = useSelector((state) => state.stock);
  // firma bilgilerini useSelector ile state'den okuduk
  const [open, setOpen] = useState(false);
  const [info, setInfo] = useState({
    name: "",
    phone: "",
    address: "",
    image: "",
  });

  //! hook cagirdigimiz icin bu kodlara ihtiyac kalmadi.yukarida custom hook dan cagirdigimiz kodlari kullanacagiz.

  // //* state'ler yukarida tanimlanmali
  // const { token } = useSelector((state) => state.auth);
  // const BASE_URL = "https://14268.fullstack.clarusway.com/";

  // //? gelen veriyi state lere aktarmam lazim.bunun icin dispatch kullaniyorum
  // const dispatch = useDispatch();

  // const getFirms = async () => {
  //   const url = "firms";
  //   dispatch(fetchStart());
  //   try {
  //     const { data } = await axios.get(`${BASE_URL}stock/firms/`, {
  //       headers: { Authorization: `Token ${token}` },
  //     });
  //     console.log(data);
  //     // dispatch(getSuccess({data,"firms"}))
  //     // yukaridaki sekilde firms kabul etmiyor obje formati istiyor.bu yüzden firm ü url degiskeni olarak veriyoruz.
  //     dispatch(getSuccess({ data, url }));
  //   } catch (error) {
  //     console.log(error);
  //     dispatch(fetchFail());
  //   }
  // };
  useEffect(() => {
    getFirms();
    console.log(firms);
  }, []);

  return (
    <Box>
      <Typography variant="h4" color="error" mb={1}>
        Firms
      </Typography>
      <Button variant="contained" onClick={() => setOpen(true)}>
        New Firm
      </Button>

      <NewFirmModal
        open={open}
        setOpen={setOpen}
        info={info}
        setInfo={setInfo}
      />
      {firms?.length > 0 && (
        <Grid container justifyContent="center" gap={3}>
          {firms?.map((firm) => (
            <Grid item key={firm.id}>
              <FirmCard firm={firm} />
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default Firms;

//todo: firm leri state e baska yerlerde bize lazım old.icin yazıyoruz.aksi takdirde her seferinde veri cekecektik
