import { useDateRangeValidation } from "@mui/lab/internal/pickers/hooks/useValidation";
import {
  Button,
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import React, { Fragment, useEffect } from "react";
import styled from "styled-components";
import Sidebar from "../Sidebar";
import { ButtonD, ContainerD } from "../style/dashboard.styled";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { useDemoData } from "@mui/x-data-grid-generator";
import { useDispatch, useSelector } from "react-redux";
import { deleteUser, getAllUsers } from "../../../actions/userAction";
import { clearErrors } from "../../../actions/productAction";
import { DELETE_USER_RESET } from "../../../constants/userConstants";
import { Link, useHistory } from "react-router-dom";
import MetaData from "../../Cart/MetaData";
import AddIcon from '@mui/icons-material/Add';
import IconButton from '@mui/material/IconButton';

const Uwrapper = styled.div`
  width: 100%;
  height: 100%;
  margin: 10px auto;
`;
export default function UserList() {
  const dispatch = useDispatch();
  const { error, users } = useSelector((state) => state.allUsers);
  let history = useHistory();

  const {
    error: deleteError,
    isDeleted,
  } = useSelector((state) => state.profile);

  const deleteUsserHandler = (id) => {
    dispatch(deleteUser(id));
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
      alert("Xoá người dùng thành công");
      history.push("/admin/Dashboard/User");
      dispatch({ type: DELETE_USER_RESET });
    }

    dispatch(getAllUsers());
  }, [dispatch, error, deleteError, history, isDeleted]);
  const columns = [
    { field: "id", headerName: "ID Người dùng", minWidth: 180, flex: 0.8 },

    {
      field: "email",
      headerName: "Email",
      minWidth: 200,
      flex: 1,
    },
    {
      field: "name",
      headerName: "Tên",
      minWidth: 150,
      flex: 0.5,
    },
    {
      field: "role",
      headerName: "Quyền",
      type: "number",
      minWidth: 150,
      flex: 0.3,
      cellClassName: (params) => {
        return params.getValue(params.id, "role") === "admin"
          ? "greenColor"
          : "redColor";
      },
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
            <Link to={`/admin/Dashboard/User/${params.getValue(params.id, "id")}`}>
              <EditIcon />
            </Link>

            <Button
              onClick={() =>
                deleteUsserHandler(params.getValue(params.id, "id"))
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

  users &&
    users.forEach((item) => {
      rows.push({
        id: item._id,
        role: item.role,
        email: item.email,
        name: item.name,
      });
    });

  return (
    <ContainerD>
      <Sidebar />

      <Fragment>
        <MetaData title={`ALL USERS - Admin`} />

        <div className="dashboard" style={{ flex: 1 }}>
          <div className="productListContainer">
            <h1 id="productListHeading">Tất cả người dùng</h1>
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
          <ButtonD href="/admin/Dashboard">
            Back to Dashboard
          </ButtonD>
        </div>
      </Fragment>
    </ContainerD>
  );
}
