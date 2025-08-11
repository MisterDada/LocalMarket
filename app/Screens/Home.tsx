import React, { useEffect, useState } from "react";
import {
  FlatList,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

export default function Index() {
  const [products, setProducts] = useState([]);

  const renderProducts = async () => {
    try {
      const res = await fetch(
        "https://local-market-api-dqlf.onrender.com/api/products/allProducts",
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        }
      );

      const data = await res.json();
      console.log(data);
      if (!data?.data.length) {
        console.log("No products found");
        setProducts([]);
        return;
      }

      setProducts(data.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    renderProducts();
  }, []);

  const renderItem = ({ item }) => (
    <View style={{ padding: 16, borderBottomWidth: 1, borderColor: "#eee" }}>
      <Text>{item.description}</Text>
      <Text>₦ {item.price}</Text>
    </View>
  );

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.header}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Text style={{ fontSize: 30, fontWeight: 400 }}>Discover</Text>
          <Text>Cart</Text>
        </View>
        <View>
          <TextInput
            placeholder="Search"
            placeholderTextColor="grey"
            style={styles.search}
          />
        </View>
      </View>
      <FlatList
        data={products}
        keyExtractor={(item) => item._id?.toString()}
        renderItem={renderItem}
        ListEmptyComponent={<Text>No products found.</Text>}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: 30,
    gap: 20,
    paddingVertical: 15,
  },
  search: {
    backgroundColor: "#6c6c6c34",
    padding: 15,
    borderRadius: 10,
  },
});
