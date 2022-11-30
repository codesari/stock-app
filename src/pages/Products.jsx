import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { useEffect } from "react";
import useStockCall from "../hooks/useStockCalls";
import { useSelector } from "react-redux";
import { useState } from "react";
import ProductModal from "../components/modals/ProductModal";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import DeleteIcon from "@mui/icons-material/Delete";
import { arrowStyle, btnHoverStyle, flex } from "../styles/globalStyle";
import UpgradeIcon from "@mui/icons-material/Upgrade";
import VerticalAlignBottomIcon from "@mui/icons-material/VerticalAlignBottom";
import useSortColumn from "../hooks/useSortColumn";

const Products = () => {
  const { getBrands, getCategories, getProducts } = useStockCall();
  const { products } = useSelector((state) => state.stock);
  const [open, setOpen] = useState(false);
  const [info, setInfo] = useState({});
  const [btnName, setBtnName] = useState("Add New Firm");
  const [selectedProducts, setSelectedProducts] = useState([]);
  useEffect(() => {
    getBrands();
    getCategories();
    getProducts();
  }, []);

  const columnObj = {
    brand: 1,
    name: 1,
    stock: 1,
  };

  const { sortedData, handleSort, columns } = useSortColumn(
    products,
    columnObj
  );

  //? Siralanacak local state (sutun verilerinin local state hali)

  // const [sortedProducts, setSortedProducts] = useState(products);

  //! product state'i her guncellendiginde local state'i de guncelle
  //! verileri sıralamak anlik birsey bu yüzden local ile sıralamak mantikli.sayfa yenilendiginde ilk sırasız hali görünsün.
  //* products state i degistigi zaman products ın kullanıldıgı heryer render edilir bunu istemiyoruz bunun icin localstate kullandik
  //? bu yüzden componentDidUpdate islemi yaptik

  // useEffect(() => {
  //   setSortedProducts(products);
  // }, [products]);

  //* useSortColumn'da kullanmak üzere bu stateleri düz bir obje haline getiriyorum
  // const [toggle, setToggle] = useState({
  //   brand: 1,
  //   name: 1,
  //   stock: 1,
  // });

  // //? Jenerik Sutun siralama fonksiyonu
  // const handleSort = (arg, type) => {
  //   setToggle({ ...toggle, [arg]: toggle[arg] * -1 });
  //   // state obje biciminde old.icin icindeki bir veriyi degistirmek icin önce objeyi acmamiz gerekiyor.
  //   // toggle.arg yazsaydık arg bir değişken oldugu icin hata verirdi obje icinde arg diye bir key arardı.
  //   // arg bir değişken old.icin toggle[arg] seklinde yazıyoruz
  //   setSortedProducts(
  //     sortedProducts
  //       ?.map((item) => item)
  //       .sort((a, b) => {
  //         if (type === "date") {
  //           return toggle[arg] * (new Date(a[arg]) - new Date(b[arg]));
  //         } else if (type === "number") {
  //           return toggle[arg] * (a[arg] - b[arg]);
  //         } else {
  //           if (toggle[arg] === 1) {
  //             return b[arg] > a[arg] ? 1 : b[arg] < a[arg] ? -1 : 0;
  //           } else {
  //             return a[arg] > b[arg] ? 1 : a[arg] < b[arg] ? -1 : 0;
  //           }
  //         }
  //       })
  //   );
  // };

  return (
    <Box>
      <Typography variant="h4" color="error" mb={1}>
        Product
      </Typography>
      <Button
        variant="contained"
        onClick={() => {
          setOpen(true);
          setInfo({});
          // setBtnName("Add New Firm");" 1"
        }}
      >
        New Product
      </Button>

      <ProductModal />
      {sortedData?.length > 0 && (
        // elevation,3d görünümü veren güzel bir property
        <TableContainer component={Paper} sx={{ mt: 3 }} elevation={10}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="center">#</TableCell>
                <TableCell align="center">Category</TableCell>
                <TableCell
                  align="center"
                  sx={() => btnHoverStyle("red")}
                  onClick={() => handleSort("brand", "text")}
                >
                  <Box sx={arrowStyle}>
                    Brand {columns.brand === 1 && <UpgradeIcon />}
                    {columns.brand !== 1 && <VerticalAlignBottomIcon />}
                  </Box>
                </TableCell>
                <TableCell
                  align="center"
                  sx={() => btnHoverStyle("red")}
                  onClick={() => handleSort("name", "text")}
                >
                  <Box sx={arrowStyle}>
                    Name {columns.name === 1 && <UpgradeIcon />}
                    {columns.name !== 1 && <VerticalAlignBottomIcon />}
                  </Box>
                </TableCell>
                <TableCell
                  align="center"
                  sx={() => btnHoverStyle("red")}
                  onClick={() => handleSort("stock", "text")}
                >
                  <Box sx={arrowStyle}>
                    Stock {columns.stock === 1 && <UpgradeIcon />}
                    {columns.stock !== 1 && <VerticalAlignBottomIcon />}
                  </Box>
                </TableCell>
                <TableCell align="center">Operation</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {sortedData?.map((product, index) => (
                <TableRow
                  key={product.name}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell align="center" component="th" scope="row">
                    {index + 1}
                  </TableCell>

                  <TableCell align="center">{product.category}</TableCell>
                  <TableCell align="center">{product.brand}</TableCell>
                  <TableCell align="center">{product.name}</TableCell>
                  <TableCell align="center">{product.stock}</TableCell>
                  <TableCell align="center">
                    <DeleteIcon sx={() => btnHoverStyle("red")} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
};

export default Products;
