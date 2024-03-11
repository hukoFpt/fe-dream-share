import { useState, useEffect } from "react";
import axios from "axios";

export function getProduct() {
  const axios = require("axios");
  const [product, setProduct] = useState(null); //Tạo state cho product

  const baseURL = "http://localhost:5000";
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    axios
      .get("http://localhost:5000/products/", {})
      .then(function (res) {
        console.log(res.data.products);
        setProduct(res.data.products);
      })
      .catch(function (err) {
        console.log(err);
      });
    return () => setProduct(null);
  }, []);
  return product;
}

const columns = [
  { name: "ID", uid: "id", sortable: true },
  { name: "NAME", uid: "name", sortable: true },
  {name: "DESCRIPTION", uid:"description", sortable: false},
  { name: "QUANTITY", uid: "quantity", sortable: true },
  { name: "STATUS", uid: "status", sortable: true },
  { name: "ACTIONS", uid: "actions" },
];

const statusOptions = [
  { name: "Active", uid: "active" },
  { name: "Pause", uid: "paused" },
  { name: "Cancel", uid: "cancel" },
];

export { columns, statusOptions };
