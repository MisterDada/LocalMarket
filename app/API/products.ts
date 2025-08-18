import * as SecureStore from "expo-secure-store";

import { CreateProductParams } from "../Interface/Products";

export const createProduct = async ({
  name,
  description,
  price,
  category,
  file,
}: CreateProductParams) => {
  try {
    const token = await SecureStore.getItemAsync("token");
    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("price", String(price)); // formData only accepts strings
    formData.append("category", category);

    if (file) {
      formData.append("file", {
        uri: file,
        name: "product.jpg",
        type: "image/jpeg",
      } as any);
    }

    const res = await fetch(
      "https://local-market-api-dqlf.onrender.com/api/products/createProduct",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      }
    );

    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(errorText);
    }

    const data = await res.json();
    return data; // return server response
  } catch (error) {
    console.log("Error creating product:", error);
    throw error; // let the component handle it
  }
};

export const getProducts = async () => {
  try {
    const res = await fetch(
      "https://local-market-api-dqlf.onrender.com/api/products/allProducts",
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      }
    );
    const data = await res.json();
    return data?.data || [];
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
};
