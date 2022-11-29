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
import { btnHoverStyle } from "../styles/globalStyle";

const Products = () => {
  const { getBrands, getCategories, getProducts } = useStockCall();
  const { products } = useSelector((state) => state.stock);
  const [open, setOpen] = useState(false);
  const [info, setInfo] = useState({});
  const [btnName, setBtnName] = useState("Add New Firm");

  useEffect(() => {
    getBrands();
    getCategories();
    getProducts();
  }, []);

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
      {products?.length > 0 && (
        // elevation,3d görünümü veren güzel bir property
        <TableContainer component={Paper} sx={{ mt: 3 }} elevation={10}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="center">#</TableCell>
                <TableCell align="center">Category</TableCell>
                <TableCell align="center">Brand</TableCell>
                <TableCell align="center">Name</TableCell>
                <TableCell align="center">Stock</TableCell>
                <TableCell align="center">Operation</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {products?.map((product, index) => (
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
