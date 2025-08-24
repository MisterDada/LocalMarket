import Constants from "expo-constants";
import * as SecureStore from "expo-secure-store";

const ADD_TO_CART =
  Constants.expoConfig?.extra?.ADD_TO_CART ||
  process.env.ADD_TO_CART ||
  "https://local-market-api-dqlf.onrender.com/api/cart/new/add";

const GET_CART_ITEMS =
  Constants.expoConfig?.extra?.GET_CART_ITEMS ||
  process.env.GET_CART_ITEMS ||
  "https://local-market-api-dqlf.onrender.com/api/cart/new";

export const addToCartNew = async (productId: string, quantity: number = 1) => {
  try {
    console.log("addToCartNew -> endpoint:", ADD_TO_CART);
    const token = await SecureStore.getItemAsync("token");
    console.log("addToCartNew -> token present:", !!token);

    if (!ADD_TO_CART) throw new Error("ADD_TO_CART URL is not defined.");
    if (!token) throw new Error("No auth token found");

    const res = await fetch(ADD_TO_CART, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ productId, quantity }),
    });

    if (!res.ok) {
      const text = await res.text();
      console.error("Failed to add to cart:", res.status, text);
      throw new Error(`Server responded with ${res.status}: ${text}`);
    }

    const data = await res.json();
    console.log("Product added successfully", data);
    return data;
  } catch (error) {
    console.error("Error adding to cart:", error);
    return null;
  }
};

export const getUserCart = async () => {
  try {
    console.log("getUserCart -> endpoint:", GET_CART_ITEMS);
    const token = await SecureStore.getItemAsync("token");
    console.log("getUserCart -> token present:", !!token);

    if (!GET_CART_ITEMS) throw new Error("GET_CART_ITEMS URL is not defined.");
    if (!token) throw new Error("No auth token found");

    const res = await fetch(GET_CART_ITEMS, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      const text = await res.text();
      console.error("Failed to fetch cart items:", res.status, text);
      throw new Error(`Server responded with ${res.status}: ${text}`);
    }
    const data = await res.json();
    return data?.data || [];
  } catch (error) {
    console.error("Error fetching cart items:", error);
    return null;
  }
};
