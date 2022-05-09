import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import React, { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import {
  clearErrors,
  deleteOrder,
  getAllOrders,
} from "../../../actions/orderAction";
import { DELETE_ORDER_RESET } from "../../../constants/orderConstants";
import MetaData from "../../Cart/MetaData";
import Sidebar from "../Sidebar";
import { ContainerD } from "../style/dashboard.styled";
import EditIcon from "@mui/icons-material/Edit";
import { Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

export default function OrderList() {
  const dispatch = useDispatch();
  let history = useHistory();

  const { error, orders } = useSelector((state) => state.allOrders);

  const { error: deleteError, isDeleted } = useSelector((state) => state.order);

  const deleteOrderHandler = (id) => {
    dispatch(deleteOrder(id));
  };

  useEffect(() => {
    if (error) {
      alert(error);
      dispatch(clearErrors());
    }

    if (deleteError) {
      alert(deleteError);
      dispatch(clearErrors());
    }

    if (isDeleted) {
      alert("Xoá đơn hàng thành công");
      history.push("/admin/Dashboard/Orders");
      dispatch({ type: DELETE_ORDER_RESET });
    }

    dispatch(getAllOrders());
  }, [dispatch, error, deleteError, history, isDeleted]);

  const columns = [
    { field: "id", headerName: "ID Đơn hàng", minWidth: 270, flex: 1 },

    {
      field: "status",
      headerName: "Trạng thái",
      minWidth: 150,
      flex: 0.5,
      cellClassName: (params) => {
        return params.getValue(params.id, "status") === "Delivered"
          ? "greenColor"
          : "redColor";
      },
    },
    {
      field: "itemsQty",
      headerName: "Số lượng sản phẩm",
      type: "number",
      minWidth: 100,
      flex: 0.4,
    },

    {
      field: "amount",
      headerName: "Tổng tiền",
      type: "number",
      minWidth: 200,
      flex: 0.5,
    },

    {
      field: "actions",
      flex: 0.3,
      headerName: "Hoạt động",
      minWidth: 150,
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <Fragment>
            <Link
              to={`/admin/Dashboard/Order/${params.getValue(params.id, "id")}`}
            >
              <EditIcon />
            </Link>

            <Button
              onClick={() =>
                deleteOrderHandler(params.getValue(params.id, "id"))
              }
            >
              <DeleteIcon />
            </Button>
          </Fragment>
        );
      },
    },
  ];

  const rows = [];

  orders &&
    orders.forEach((item) => {
      rows.push({
        id: item._id,
        itemsQty: item.orderItems.length,
        amount: item.totalPrice,
        status: item.orderStatus,
      });
    });

  return (
    <ContainerD>
      <Sidebar />
      <Fragment>
        <MetaData title={`ALL ORDERS - Admin`} />

        <div className="dashboard" style={{ flex: 1 }}>
          <div className="productListContainer">
            <h1 id="productListHeading">Tất cả đơn hàng</h1>
            <DataGrid
              rows={rows}
              columns={columns}
              pageSize={10}
              disableSelectionOnClick
              className="productListTable"
              autoHeight
              components={{
                Toolbar: GridToolbar,
              }}
            />
          </div>
        </div>
      </Fragment>
    </ContainerD>
  );
}
