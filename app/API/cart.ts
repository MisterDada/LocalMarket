import * as SecureStore from "expo-secure-store";

const ADD_TO_CART = process.env.ADD_TO_CART;
const GET_CART_ITEMS = process.env.GET_CART_ITEMS;

export const addToCartNew = async (productId: string, quantity: number = 1) => {
  try {
    const token = await SecureStore.getItemAsync("token");
    if (!token) throw new Error("No auth token found");

    const res = await fetch(`${ADD_TO_CART}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ productId, quantity }),
    });

    if (!res.ok) {
      const text = await res.text();
      console.error("Failed to add to cart:", text);
      return null;
    }

    const data = await res.json();
    console.log("Product added successfully", data);

    return data; // returned cart item or API response
  } catch (error) {
    console.error("Error adding to cart:", error);
    return null;
  }
};

export const getUserCart = async () => {
  try {
    const token = await SecureStore.getItemAsync("token");
    const res = await fetch(`${GET_CART_ITEMS}`, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      const text = await res.text();
      console.log("Error", text);
      return null;
    }
    const data = await res.json();
    return data?.data || [];
  } catch (error) {
    console.error("Error fetching Products", error);
  }
};
