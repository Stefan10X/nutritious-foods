import { Edit, Delete } from "@mui/icons-material";
import {
  Box,
  Typography,
  Button,
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";
import { currencyFormat } from "../../app/util/util";
import useProducts from "../../app/hooks/useProducts";
import AppPagination from "../../app/components/AppPagination";
import { useAppDispatch } from "../../app/store/configureStore";
import { removeProduct, setPageNumber } from "../catalog/catalogSlice";
import { useState } from "react";
import ProductForm from "./ProductForm";
import { Product } from "../../app/models/product";
import agent from "../../app/api/agent";
import { LoadingButton } from "@mui/lab";

export default function Inventory() {
  const { products, metaData } = useProducts();
  const [editMode, setEditMode] = useState(false);
  const dispatch = useAppDispatch();
  const [selectedProduct, setSelectedProduct] = useState<Product | undefined>(
    undefined,
  );
  const [loading, setLoading] = useState(false);
  const [target, setTarget] = useState(0);

  function handleSelectProduct(product: Product) {
    setSelectedProduct(product);
    setEditMode(true);
  }

  function cancelEdit() {
    if (selectedProduct) setSelectedProduct(undefined);
    setEditMode(false);
  }

  function handleDeleteProduct(id: number) {
    setLoading(true);
    setTarget(id);
    agent.Admin.deleteProduct(id)
      .then(() => dispatch(removeProduct(id)))
      .catch((error) => console.log(error))
      .finally(() => setLoading(false));
  }

  if (editMode)
    return <ProductForm cancelEdit={cancelEdit} product={selectedProduct} />;

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        minHeight: "100vh",
        width: "100%",
        p: 2,
      }}
    >
      <Box
        sx={{ maxWidth: 1200, width: "100%" }}
        display="flex"
        justifyContent="space-between"
      >
        <Typography sx={{ p: 2 }} variant="h4">
          Inventory
        </Typography>
        <Button
          sx={{ m: 2 }}
          size="large"
          variant="contained"
          onClick={() => setEditMode(true)}
        >
          Create
        </Button>
      </Box>
      <TableContainer sx={{ maxWidth: 1200, width: "100%" }} component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell
                sx={{
                  fontSize: "1.1rem",
                }}
                align="left"
              >
                Image
              </TableCell>

              <TableCell
                sx={{
                  fontSize: "1.1rem",
                }}
                align="left"
              >
                Name
              </TableCell>

              <TableCell
                sx={{
                  fontSize: "1.1rem",
                }}
                align="right"
              >
                Price
              </TableCell>
              <TableCell
                sx={{
                  fontSize: "1.1rem",
                }}
                align="center"
              >
                SideDish
              </TableCell>
              <TableCell
                sx={{
                  fontSize: "1.1rem",
                }}
                align="center"
              >
                Meat
              </TableCell>
              <TableCell
                sx={{
                  fontSize: "1.1rem",
                }}
                align="center"
              >
                Quantity
              </TableCell>
              <TableCell
                sx={{
                  fontSize: "1.1rem",
                }}
                align="right"
              ></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((product) => (
              <TableRow
                key={product.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell
                  sx={{
                    fontSize: "1.1rem",
                  }}
                  align="left"
                >
                  <Box display="flex" alignItems="center">
                    <img
                      src={product.pictureUrl}
                      alt={product.name}
                      style={{ height: 60, width: 80 }}
                    />
                  </Box>
                </TableCell>
                <TableCell
                  sx={{
                    fontSize: "1.1rem",
                  }}
                  align="left"
                >
                  <Box display="flex" alignItems="center">
                    <span>{product.name}</span>
                  </Box>
                </TableCell>
                <TableCell
                  sx={{
                    fontSize: "1.1rem",
                  }}
                  align="right"
                >
                  {currencyFormat(product.price)}
                </TableCell>
                <TableCell
                  sx={{
                    fontSize: "1.1rem",
                  }}
                  align="center"
                >
                  {product.sideDish}
                </TableCell>
                <TableCell
                  sx={{
                    fontSize: "1.1rem",
                  }}
                  align="center"
                >
                  {product.meat}
                </TableCell>
                <TableCell
                  sx={{
                    fontSize: "1.1rem",
                  }}
                  align="center"
                >
                  {product.quantityInStock}
                </TableCell>
                <TableCell
                  sx={{
                    fontSize: "1.1rem",
                  }}
                  align="right"
                >
                  <Button
                    startIcon={<Edit />}
                    onClick={() => handleSelectProduct(product)}
                  />
                  <LoadingButton
                    loading={loading && target === product.id}
                    startIcon={<Delete />}
                    color="error"
                    onClick={() => handleDeleteProduct(product.id)}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {metaData && (
        <Box sx={{ pt: 2, maxWidth: 1200, width: "100%" }}>
          <AppPagination
            metaData={metaData}
            onPageChange={(page) =>
              dispatch(setPageNumber({ pageNumber: page }))
            }
          />
        </Box>
      )}
    </Box>
  );
}
