import * as SecureStore from "expo-secure-store";
import { CreateUserParams } from "../Interface/User";

const REGISTER_USERS = process.env.REGISTER_USERS;

export const Register = async ({ name, password, role }: CreateUserParams) => {
  try {
    const res = await fetch(`${REGISTER_USERS}`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        name,
        password,
        role,
      }),
    });

    // Check if response is OK and content-type is JSON
    if (!res.ok) {
      const text = await res.text();
      console.error("Server error:", res.status, text);
      return;
    }
    const contentType = res.headers.get("content-type");
    if (!contentType || !contentType.includes("application/json")) {
      const text = await res.text();
      console.error("Unexpected response:", text);
      return;
    }

    const data = await res.json();
    if (!data) {
      console.log("No data");
      return;
    }
    const userId = data.user?.id;
    const userName = data.user?.name;
    const token = data.token;

    if (userId) {
      await SecureStore.setItemAsync("token", token);
      await SecureStore.setItemAsync("username", String(userName));
    }
  } catch (error) {
    console.error("Fetch error:", error);
  }
};
