import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
  Box,
} from "@mui/material";
import { useEffect } from "react";
import { useState } from "react";
import agent from "../../app/api/agent";
import LoadingComponent from "../../app/layout/LoadingComponent";
import { Order } from "../../app/models/order";
import { currencyFormat } from "../../app/util/util";
import OrderDetailed from "./OrderDetailed";

export default function Orders() {
  const [orders, setOrders] = useState<Order[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedOrderNumber, setSelectedOrderNumber] = useState(0);

  useEffect(() => {
    setLoading(true);
    agent.Orders.list()
      .then((orders) => setOrders(orders))
      .catch((error) => console.log(error))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <LoadingComponent name="orders..." />;

  if (selectedOrderNumber > 0 && orders)
    return (
      <OrderDetailed
        order={orders.find((o) => o.id === selectedOrderNumber)!}
        setSelectedOrder={setSelectedOrderNumber}
      />
    );

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        minHeight: "100vh",
      }}
    >
      <TableContainer sx={{ maxWidth: 1000 }} component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell
                sx={{
                  width: "25%",
                  textAlign: "center",
                  verticalAlign: "middle",
                  fontSize: "1.1rem",
                }}
              >
                Order Number
              </TableCell>
              <TableCell
                sx={{
                  width: "25%",
                  textAlign: "center",
                  verticalAlign: "middle",
                  fontSize: "1.1rem",
                }}
              >
                Total
              </TableCell>
              <TableCell
                sx={{
                  width: "25%",
                  textAlign: "center",
                  verticalAlign: "middle",
                  fontSize: "1.1rem",
                }}
              >
                Order Date
              </TableCell>
              <TableCell
                sx={{
                  width: "25%",
                  textAlign: "center",
                  verticalAlign: "middle",
                  fontSize: "1.1rem",
                }}
              ></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders?.map((order) => (
              <TableRow
                key={order.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell
                  component="th"
                  scope="row"
                  sx={{
                    width: "25%",
                    textAlign: "center",
                    verticalAlign: "middle",
                    fontSize: "1.1rem",
                  }}
                >
                  {order.id}
                </TableCell>
                <TableCell
                  sx={{
                    width: "25%",
                    textAlign: "center",
                    verticalAlign: "middle",
                    fontSize: "1.1rem",
                  }}
                >
                  {currencyFormat(order.total)}
                </TableCell>
                <TableCell
                  sx={{
                    width: "25%",
                    textAlign: "center",
                    verticalAlign: "middle",
                    fontSize: "1.1rem",
                  }}
                >
                  {order.orderDate.split("T")[0]}
                </TableCell>
                <TableCell
                  sx={{
                    width: "25%",
                    textAlign: "center",
                    verticalAlign: "middle",
                    fontSize: "1.1rem",
                  }}
                >
                  <Button onClick={() => setSelectedOrderNumber(order.id)}>
                    View
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
