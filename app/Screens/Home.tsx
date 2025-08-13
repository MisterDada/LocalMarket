import React, { useEffect, useState } from "react";
import {
  FlatList,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Filters from "../Components/Categories";

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
      <View style={{ paddingHorizontal: 30 }}>
        <View style={styles.news}>
          <View style={{ gap: 20, maxWidth: "40%" }}>
            <Text style={{ fontSize: 30, color: "white" }}>
              Clearance Sales
            </Text>
            <TouchableOpacity style={styles.newsButton}>
              <Text style={{ color: "#26ab3eff" }}>% up to 50%</Text>
            </TouchableOpacity>
          </View>
          <View>
            {/*There will be an image here. Z-index of 1, so the image will overflow at the top */}
          </View>
        </View>
        <View style={{ gap: 20 }}>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text style={{ fontSize: 20 }}>Categories</Text>
            <Text style={{ color: "#26ab3eff", fontSize: 18 }}>See all</Text>
          </View>

          <ScrollView horizontal>
            <Filters />
          </ScrollView>
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
    marginBottom: 10,
  },
  search: {
    backgroundColor: "#6c6c6c34",
    padding: 15,
    borderRadius: 10,
  },
  news: {
    backgroundColor: "#26ab3eff",
    height: 150,
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
  },
  newsButton: {
    borderRadius: 20,
    backgroundColor: "white",
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
  },
});
