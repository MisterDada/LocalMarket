import Constants from "expo-constants";
import * as SecureStore from "expo-secure-store";

const CREATE_PRODUCT =
  Constants.expoConfig?.extra?.CREATE_PRODUCT ||
  process.env.CREATE_PRODUCT ||
  "https://local-market-api-dqlf.onrender.com/api/products/createProduct";
const GET_PRODUCTS =
  Constants.expoConfig?.extra?.GET_PRODUCTS ||
  process.env.GET_PRODUCTS ||
  "https://local-market-api-dqlf.onrender.com/api/products/allProducts";

import { CreateProductParams } from "../Interface/Products";

export const createProduct = async ({
  name,
  description,
  price,
  category,
  file,
}: CreateProductParams) => {
  try {
    // debug info
    console.log("createProduct -> endpoint:", CREATE_PRODUCT);
    const token = await SecureStore.getItemAsync("token");
    console.log("createProduct -> token present:", !!token);

    if (!CREATE_PRODUCT) {
      throw new Error(
        "CREATE_PRODUCT URL is not defined. Check your env/app config."
      );
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("price", String(price));
    formData.append("category", category);

    if (file) {
      formData.append("file", {
        uri: file,
        name: "product.jpg",
        type: "image/jpeg",
      } as any);
    }

    const res = await fetch(CREATE_PRODUCT, {
      method: "POST",
      headers: {
        Authorization: token ? `Bearer ${token}` : "",
      },
      body: formData,
    });

    if (!res.ok) {
      const text = await res.text();
      // surface server error for easier debugging
      console.error("createProduct server error:", res.status, text);
      throw new Error(`Server responded with ${res.status}: ${text}`);
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.log("Error creating product:", error);
    throw error;
  }
};

export const getProducts = async () => {
  try {
    console.log("getProducts -> endpoint:", GET_PRODUCTS);
    if (!GET_PRODUCTS) throw new Error("GET_PRODUCTS URL is not defined.");
    const res = await fetch(GET_PRODUCTS, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    if (!res.ok) {
      const text = await res.text();
      console.error("getProducts server error:", res.status, text);
      throw new Error(`Server responded with ${res.status}: ${text}`);
    }

    const data = await res.json();
    return data?.data || [];
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
};
