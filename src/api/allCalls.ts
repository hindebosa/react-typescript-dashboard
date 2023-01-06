import axios from "axios";
import api from ".";

export const getAllproducts = async () => {
  const allproducts = await axios.get(
    `http://localhost:6969/products/allproducts`
  );

  return allproducts.data;
};

export const getSingleProduct = async (id?: string) => {
  const allproducts = await axios.post(
    `http://localhost:6969/products/findproduct/${id}`
  );

  return allproducts.data;
};
