// screens/ProductDetails.js
import React from "react";
import { Button, Image, ScrollView, StyleSheet, Text } from "react-native";

export default function ProductDetails({ route }) {
  const { product } = route.params; // Get product data from navigation

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image
        source={{
          uri: product.image?.url || "https://via.placeholder.com/300",
        }}
        style={styles.image}
      />
      <Text style={styles.name}>{product.name}</Text>
      <Text style={styles.price}>${product.price}</Text>
      <Text style={styles.description}>{product.description}</Text>
      <Button title="Add to Cart" onPress={() => console.log("Add to Cart")} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16 },
  image: { width: "100%", height: 300, borderRadius: 10, marginBottom: 16 },
  name: { fontSize: 24, fontWeight: "bold", marginBottom: 8 },
  price: { fontSize: 20, color: "green", marginBottom: 16 },
  description: { fontSize: 16, lineHeight: 24 },
});
