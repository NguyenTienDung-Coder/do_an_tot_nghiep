import styled from "styled-components";
import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import {
  clearErrors,
  getProductDetails,
  updateProduct,
} from "../../../actions/productAction";
import { UPDATE_PRODUCT_RESET } from "../../../constants/productConstant";
import MetaData from "../../Cart/MetaData";
import Sidebar from "../Sidebar";
import {
  ButtonD,
  ContainerD,
  InputUpdate,
  SelectUpdate,
  TextareaUpdate,
  UProductContainer,
} from "../style/dashboard.styled";
import SpellcheckIcon from "@mui/icons-material/Spellcheck";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import DescriptionIcon from "@mui/icons-material/Description";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import StorageIcon from "@mui/icons-material/Storage";
import { Button } from "@mui/material";
import LinkIcon from "@mui/icons-material/Link";
import PriceCheckIcon from "@mui/icons-material/PriceCheck";

export default function UpdateProduct() {
  let history = useHistory();
  const dispatch = useDispatch();

  let match = useParams();
  const { error, product } = useSelector((state) => state.productDetails);

  const {
    loading,
    error: updateError,
    isUpdated,
  } = useSelector((state) => state.product);

  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [Stock, setStock] = useState(0);
  const [images, setImages] = useState([]);
  const [image, setImage] = useState("");
  const [unitPrice, setUnitPrice] = useState("");
  const [oldImages, setOldImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);

  const categories = ["Hải sản", "Cá", "Mắm", "Thịt"];

  const productId = match.id;

  console.log(match);
  console.log(productId);

  useEffect(() => {
    if (product && product._id !== productId) {
      dispatch(getProductDetails(productId));
    } else {
      setName(product.name);
      setDescription(product.description);
      setPrice(product.price);
      setCategory(product.category);
      setStock(product.Stock);
      setUnitPrice(product.unitPrice);
      setOldImages(product.images);
    }
    if (error) {
      alert(error);
      dispatch(clearErrors());
    }

    if (updateError) {
      alert(updateError);
      dispatch(clearErrors());
    }

    if (isUpdated) {
      alert("Cập nhập sản phẩm thành công");
      history.push("/admin/Dashboard/Product");
      dispatch({ type: UPDATE_PRODUCT_RESET });
    }
  }, [
    dispatch,
    error,
    history,
    isUpdated,
    productId,
    product,
    updateError,
  ]);

  const updateProductSubmitHandler = (e) => {
    e.preventDefault();

    images.push({ url: image });
    const myForm = {
      name,
      price,
      description,
      category,
      Stock,
      unitPrice,
      images,

    };
    dispatch(updateProduct(productId, myForm));
  };

  const updateProductImagesChange = (e) => {
    const files = Array.from(e.target.files);

    setImages([]);
    setImagesPreview([]);
    setOldImages([]);

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
      <MetaData title="Update Product" />
      <ContainerD>
        <Sidebar />
        <div className="dashboard">
          <UProductContainer className="newProductContainer">
            <form
              className="createProductForm"
              encType="multipart/form-data"
              onSubmit={updateProductSubmitHandler}
            >
              <h1>Update Product</h1>

              <div>
                <SpellcheckIcon />
                <InputUpdate
                  type="text"
                  placeholder="Product Name"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div>
                <AttachMoneyIcon />
                <InputUpdate
                  type="number"
                  placeholder="Price"
                  required
                  max="9"
                  onChange={(e) => setPrice(e.target.value)}
                  value={price}
                />
              </div>

              <div>
                <DescriptionIcon />

                <TextareaUpdate
                  placeholder="Product Description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  cols="30"
                  rows="1"
                ></TextareaUpdate>
              </div>

              <div>
                <AccountTreeIcon />
                <SelectUpdate
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <option value="">Choose Category</option>
                  {categories.map((cate) => (
                    <option key={cate} value={cate}>
                      {cate}
                    </option>
                  ))}
                </SelectUpdate>
              </div>

              <div>
                <StorageIcon />
                <InputUpdate
                  type="number"
                  placeholder="Stock"
                  required
                  min="0"
                  onChange={(e) => setStock(e.target.value)}
                  value={Stock}
                />
              </div>

              <div style={{ display: "flex", alignItems: "center" }}>
                <PriceCheckIcon />
                <InputUpdate
                  type="text"
                  placeholder="Unit Price"
                  required
                  value={unitPrice}
                  onChange={(e) => setUnitPrice(e.target.value)}
                />
              </div>

              <div id="createProductFormFile">
                 {oldImages &&
                  oldImages.map((item) => (
                      <div style={{ display: "flex", alignItems: "center" }}>
                      <LinkIcon/>
                      <TextareaUpdate
                        name="avatar"
                        type="text"
                        required
                        placeholder={item.url}
                        onChange={(e) => setImage(e.target.value)}
                      ></TextareaUpdate></div>
                      
                     
                  ))}  
              </div>

              <div id="createProductFormImage">
                {oldImages &&
                  oldImages.map((image, index) => (
                    <img
                      key={index}
                      src={image.url}
                      alt="Old Product Preview"
                    />
                  ))}
              </div>

              <div id="createProductFormImage">
                {imagesPreview.map((image, index) => (
                  <img
                    style={{ width: "100%" }}
                    key={index}
                    src={image}
                    alt="Product Preview"
                  />
                ))}
              </div>

              <div>
                <Button
                  style={{ margin: "10px 43px" }}
                  variant="contained"
                  color="success"
                  id="createProductBtn"
                  type="submit"
                  disabled={loading ? true : false}
                >
                  Update
                </Button>
              </div>
            </form>
          </UProductContainer>
          <ButtonD href="/admin/Dashboard">Back to Dashboard</ButtonD>
        </div>
      </ContainerD>
    </Fragment>
  );
}
