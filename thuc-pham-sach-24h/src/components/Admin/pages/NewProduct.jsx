import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { clearErrors, createProduct } from "../../../actions/productAction";
import { NEW_PRODUCT_RESET } from "../../../constants/productConstant";
import MetaData from "../../Cart/MetaData";
import Sidebar from "../Sidebar";
import {
  ContainerD,
  InputUpdate,
  SelectUpdate,
  TextareaUpdate,
} from "../style/dashboard.styled";
import SpellcheckIcon from "@mui/icons-material/Spellcheck";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import DescriptionIcon from "@mui/icons-material/Description";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import StorageIcon from "@mui/icons-material/Storage";
import { Button } from "@mui/material";
import PriceCheckIcon from "@mui/icons-material/PriceCheck";
import LinkIcon from '@mui/icons-material/Link';


export default function NewProduct() {
  let history = useHistory();
  const dispatch = useDispatch();
  const { loading, error, success } = useSelector((state) => state.newProduct);

  const [name, setName] = useState("");
  const [price, setPice] = useState(0);
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [Stock, setStock] = useState(0);
  const [unitPrice, setUnitPrice] = useState("");
  const [images, setImages] = useState([]);
  const [image, setImage] = useState("")
  const [imagesPreview, setImagesPreview] = useState([]);

  const categories = ["Hải sản", "Cá", "Mắm", "Thịt"];

  useEffect(() => {
    if (error) {
      alert(error);
      dispatch(clearErrors);
    }
    if (success) {
      alert("Thêm sản phẩm thành công");
      history.push("/admin/Dashboard/Product");
      dispatch({ type: NEW_PRODUCT_RESET });
    }
  }, [dispatch, error, history, success]);

  const createProductSubmitHandler = (e) => {
    e.preventDefault();

    images.push({url:image})
    const myForm =  {
      name,
      price,
      description,
      category,
      Stock,
      unitPrice,
      images
    };
/* 
    myForm.set("name", name);
    myForm.set("price", price);
    myForm.set("description", description);
    myForm.set("category", category);
    myForm.set("Stock", Stock);
    myForm.set("unitPrice", unitPrice)

    images.push(image)  */
    dispatch(createProduct(myForm));
  };

  const createProductImagesChange = (e) => {
    const files = Array.from(e.target.files);

    setImages([]);
    setImagesPreview([]);

    files.forEach((file) => {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setImagesPreview((old) => [...old, reader.result]);
          setImages((old) => [...old, reader.result]);
        }
      };

      reader.readAsDataURL(file);
    });
  };

  return (
    <Fragment>
      <MetaData title="Create Product" />
      <ContainerD>
        <Sidebar />
        <div className="dasboard">
          <div className="NewProductContainer">
            <form
              className="createProductForm"
              encType="multipart/form-data"
              onSubmit={createProductSubmitHandler}
            >
              <h1>Thêm sản phẩm</h1>
              <div style={{ display: "flex", alignItems:"center"}}>
                <SpellcheckIcon />
                <InputUpdate
                  type="text"
                  placeholder="Tên sản phẩm"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div style={{ display: "flex", alignItems:"center"}}>
                <AttachMoneyIcon />
                <InputUpdate
                  type="number"
                  placeholder="Giá"
                  required
                  max="9"
                  min="0"
                  onChange={(e) => setPice(e.target.value)}
                />
              </div>
              <div style={{ display: "flex", alignItems:"center"}}>
                <DescriptionIcon />
                <TextareaUpdate
                  placeholder="Mô tả sản phẩm"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  cols="30"
                  rows="1"
                ></TextareaUpdate>
              </div>

              <div style={{ display: "flex", alignItems:"center"}}>
                <AccountTreeIcon />
                <SelectUpdate onChange={(e) => setCategory(e.target.value)}>
                  <option value="">Chọn danh mục</option>
                  {categories.map((cate) => (
                    <option key={cate} value={cate}>
                      {cate}
                    </option>
                  ))}
                </SelectUpdate>
              </div>
              <div style={{ display: "flex", alignItems:"center"}}>
              <StorageIcon />
              <InputUpdate
                type="number"
                placeholder="Số lượng"
                required
                min="0"
                onChange={(e) => setStock(e.target.value)}
              />
              </div >
              <div style={{ display: "flex", alignItems:"center"}}>
                <PriceCheckIcon />
                <InputUpdate
                  type="text"
                  placeholder="Đơn giá"
                  required
                  onChange={(e) => setUnitPrice(e.target.value)}
                />
              </div>

              <div id="createProductFormFile" >
                <LinkIcon/>
                <InputUpdate
                  name="avatar"
                  type="text"
                  reqired
                  placeholder="URL"
                  onChange={(e) => setImage(e.target.value)}
                  value= {image}
                />
              </div>

              <div id="createProductFormImage">
                {imagesPreview.map((image, index) => (
                  <img key={index} src={image} alt="Product Preview" />
                ))}
              </div>

              <Button
                style={{ margin: "10px 43px" }}
                variant="contained"
                color="success"
                id="createProductBtn"
                type="submit"
                disable={loading ? true : false}
              >
                Thêm
              </Button>
            </form>
          </div>
        </div>
      </ContainerD>
    </Fragment>
  );
}
