import * as SecureStore from "expo-secure-store";

export const addToCart = async (productId: string, quantity: number = 1) => {
  try {
    const token = await SecureStore.getItemAsync("token");
    if (!token) throw new Error("No auth token found");

    const res = await fetch(
      "https://local-market-api-dqlf.onrender.com/api/cart/add",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ productId, quantity }),
      }
    );

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
