import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Button, TableCell } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import React, { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import styled from "styled-components";
import {
  clearErrors,
  deleteProduct,
  getAdminProduct,
} from "../../../actions/productAction";
import { DELETE_PRODUCT_RESET } from "../../../constants/productConstant";
import MetaData from "../../Cart/MetaData";
import Loader from "../../Loader/Loader";
import Sidebar from "../Sidebar";
import "../style/dashboard.css";
import { ButtonD, ContainerD } from "../style/dashboard.styled";
const Pwrapper = styled.div`
  width: 100%;
  height: 100%;
  margin: 10px auto;
`;
const CellTable = styled(TableCell)`
  &&& {
    color: white;
    font-size: 14px;
    text-align: center;
  }
`;
const Prev = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 6vmax;
`;
const ProductContain = styled.div`
  width: 100%;
`;
export default function ProductList() {
  let history = useHistory();

  const dispatch = useDispatch();

  const { loading, error, products } = useSelector(
    (state) => state.productsAdmin
  );

  const { error: deleteError, isDeleted } = useSelector(
    (state) => state.product
  );

  const deleteProductHandler = (id) => {
    dispatch(deleteProduct(id));
  };

  useEffect(() => {
    if (error) {
      alert(error);
      dispatch(clearErrors());
    }

    if (deleteError) {
      alert(deleteError);
      dispatch(clearErrors);
    }

    if (isDeleted) {
      alert("Xoá sản phẩm thành công");
      history.push("/admin/Dashboard/Product");
      dispatch({ type: DELETE_PRODUCT_RESET });
    }

    dispatch(getAdminProduct());
  }, [dispatch, error, deleteError, history, isDeleted]);

  const columns = [
    { field: "id", headerName: "ID Sản phẩm", minWidth: 150, flex: 0.5 },

    {
      field: "name",
      headerName: "Tên",
      minWidth: 250,
      flex: 1,
    },
    {
      field: "stock",
      headerName: "Số lượng",
      type: "number",
      minWidth: 70,
      flex: 0.3,
    },

    {
      field: "price",
      headerName: "Giá",
      type: "number",
      minWidth: 150,
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
              to={`/admin/Dashboard/Product/${params.getValue(
                params.id,
                "id"
              )}`}
            >
              <EditIcon />
            </Link>

            <Button
              onClick={() =>
                deleteProductHandler(params.getValue(params.id, "id"))
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

  products &&
    products.forEach((item) => {
      rows.push({
        id: item._id,
        stock: item.Stock,
        price: item.price,
        name: item.name,
      });
    });

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <ContainerD>
          <Sidebar></Sidebar>
          <Fragment>
            <MetaData title={`ALL PRODUCTS - Admin`} />
            <div className="dashboard">
              <div className="productListContainer">
                <h1 id="productListHeading">Tất cả sản phẩm</h1>
                <div dir="rtl">
                  <span>Thêm sản phẩm</span>
                  <IconButton href="/admin/Dashboard/NewProduct">
                    <AddIcon />
                  </IconButton>
                </div>
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
              <ButtonD href="/admin/Dashboard">Trở về bảng điều khiển</ButtonD>
            </div>
          </Fragment>
        </ContainerD>
      )}
    </>
  );
}
