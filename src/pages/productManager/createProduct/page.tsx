"use client";
import { title } from "@/components/primitives";
import {
  Card,
  Input,
  Select,
  SelectItem,
  Spacer,
  Switch,
  Image,
  Button,
} from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import storage from "../../firebaseConfig";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { CameraIcon } from "./CameraIcon";

export default function CategoriesPage() {
  const baseURL = "http://localhost:5000";
  const axios = require("axios");
  const [types, setType] = useState([]);
  const [brands, setBrand] = useState([]);
  const [productName, setProductName] = useState("PRODUCT NAME HERE");
  //fetch type từ API
  useEffect(() => {
    axios
      .get(`${baseURL}/types`)
      .then(function (res) {
        console.log(res.data.types);
        setType(res.data.types);
      })
      .catch(function (err) {
        console.log(err);
      });
  }, []);
  useEffect(() => {
    axios
      .get(`${baseURL}/brands`)
      .then(function (res) {
        console.log(res.data.brands);
        setBrand(res.data.brands);
      })
      .catch(function (err) {
        console.log(err);
      });
  }, []);
  // Hàm kiểm tra tên sản phẩm không được để trống
  const checkNameValid = React.useMemo(() => {
    if (productName === "") return true;
    return false;
  }, [productName]);
  //Handle upload image
  function handleUpload() {
    if (!file) {
      alert("Please choose a file first");
    }
    const storageRef = ref(storage, `/files/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const percent = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        // update progress
        setPercent(percent);
      },
      (err) => console.log(err),
      () => {
        // download url
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          console.log(url);
        });
      }
    );
  }

  return (
    <div>
      <h1 className="text-3xl">Create New Product</h1>
      
      <Card>
        <Spacer y="20px" />
        <div className="flex w-full flex-wrap md:flex-nowrap gap-4 pt-5 pl-5">
          <Image
            width={300}
            alt="NextUI hero Image"
            src="https://nextui-docs-v2.vercel.app/images/hero-card-complete.jpeg"
          />
          <Button color="success" endContent={<CameraIcon/>}>
            Take a photo
          </Button>
        </div>
        <Spacer y="10px" />
        <div className="w-[700px] p-3">
          <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
            <Input
              type="name"
              label="Name"
              placeholder="Enter product name"
              value={productName}
              isInvalid={checkNameValid}
              color={checkNameValid ? "danger" : "success"}
              errorMessage={checkNameValid && "Please enter a valid name"}
              onValueChange={setProductName}
            />
            <Input
              type="code"
              label="Product code"
              placeholder="Enter product code"
            />
          </div>
          <Spacer y="10px" />
          <Select
            items={types}
            label="Type of the furniture"
            placeholder="Select furniture Type"
            isRequired
            className=""
          >
            {(type) => <SelectItem key={type.id}>{type.name}</SelectItem>}
          </Select>
          <Spacer y="10px" />
          <Select
            type="brand"
            items={brands}
            label="Brand of the furniture"
            placeholder="Select furniture Brand"
            isRequired
            className=""
          >
            {(brand) => <SelectItem key={brand.id}>{brand.name}</SelectItem>}
          </Select>
          <Spacer y="10px" />
          <Input
            type="Description"
            label="Product Description"
            placeholder="Enter product description"
          />
          <Spacer y="10px" />
          <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
            <Switch defaultSelected>High Light</Switch>
            <Input
              type="quantity"
              label="Product Quantity"
              placeholder="Enter product quantity"
            />
            <Input
              type="color"
              label="Product Color"
              placeholder="Enter product color"
            />
          </div>
        </div>
      </Card>
    </div>
  );
}
