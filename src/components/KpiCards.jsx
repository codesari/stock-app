import { Avatar, Grid, Paper, Typography } from "@mui/material";
import { Box } from "@mui/system";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PaymentsIcon from "@mui/icons-material/Payments";
import { amber, indigo, pink } from "@mui/material/colors";
import { useSelector } from "react-redux";

const KpiCards = () => {
  const { sales, purchases } = useSelector((state) => state.stock);

  //   const totalSales = sales
  //     ?.map((sale) => Number(sale.price_total))
  //     .reduce((acc, val) => acc + val, 0);

  //   const totalPurchases = purchases
  //     ?.map((purchase) => Number(purchase.price_total))
  //     .reduce((acc, val) => acc + val, 0);

  const total = (data) =>
    data
      ?.map((item) => Number(item.price_total))
      .reduce((acc, val) => acc + val, 0);

  const totalProfit = total(sales) - total(purchases);

  //* grid,paper,avatar muı nin componentleri
  //? card icinde kullanacagimiz verileri dizi haline getirmek daha kullanisli(data dizisini map yapacagız).JSON formatinda yazmis olduk yani
  //* color indigo vs bunlar muı nin kendi tanimli renkleri
  const data = [
    {
      title: "sales",
      metric: `$${total(sales) || 0}`,
      icon: <MonetizationOnIcon sx={{ fontSize: "3rem" }} />,
      color: indigo[900],
      bgColor: indigo[100],
    },
    {
      title: "profit",
      metric: `$${totalProfit}`,
      icon: <PaymentsIcon sx={{ fontSize: "3rem" }} />,
      color: pink[900],
      bgColor: pink[100],
    },
    {
      title: "purchases",
      metric: `$${total(purchases) || 0}`,
      icon: <ShoppingCartIcon sx={{ fontSize: "3rem" }} />,
      color: amber[900],
      bgColor: amber[100],
    },
  ];
  return (
    <Grid container justifyContent="center" alignItems="center" spacing={2}>
      {data.map((item) => (
        // key hatasının cozumu icin item.title verebiliriz (her item.title birbirinden farklı oldugu icin)
        <Grid item key={item.title} xs={12} sm={6} md={4}>
          <Paper sx={{ p: 2 }} elevation={10}>
            <Box sx={{ display: "flex", gap: 2 }}>
              <Avatar
                sx={{
                  width: "4rem",
                  height: "4rem",
                  color: item.color,
                  backgroundColor: item.bgColor,
                }}
              >
                {item.icon}
              </Avatar>
              <Box>
                {/* buradaki button variantı style olarak buton yazı tipi ve formatine ceviriyor.button elementi ile hicbir alakasi yok */}
                <Typography variant="button">{item.title}</Typography>
                <Typography variant="h5">{item.metric}</Typography>
              </Box>
            </Box>
          </Paper>
        </Grid>
      ))}
    </Grid>
  );
};

export default KpiCards;
