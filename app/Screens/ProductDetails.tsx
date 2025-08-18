// screens/ProductDetails.js
import React from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { addToCart } from "../api/cart";

export default function ProductDetails({ route }: any) {
  const { product, _id } = route.params;

  return (
    <View style={styles.page}>
      <View style={styles.imageContainer}>
        <Image
          source={{
            uri: product.image?.url || "https://via.placeholder.com/300",
          }}
          style={styles.image}
        />
      </View>
      <ScrollView style={styles.detailsContainer}>
        <Text style={styles.name}>{product.name}</Text>

        {/* Ratings / Likes / Reviews */}
        <View style={styles.infoRow}>
          <View style={styles.info}>
            <Text style={styles.rating}>⭐ {product.rating || 4.8}</Text>
            <Text style={styles.reviews}>{product.reviews || 117} Reviews</Text>
          </View>
          <View style={styles.info}>
            <Text style={styles.likes}>👍 {product.likes || 94}%</Text>
          </View>
        </View>
        <View
          style={{
            backgroundColor: "#0000000d",
            padding: 15,
            borderRadius: 15,
            justifyContent: "center",
            marginVertical: 15,
          }}
        >
          <Text style={styles.price}>₦{product.price}</Text>
        </View>

        <Text style={styles.description}>
          {product.description?.length > 150
            ? product.description.slice(0, 150) + "... "
            : product.description}
          {product.description?.length > 150 && (
            <Text style={styles.readMore}>Read more</Text>
          )}
        </Text>

        <TouchableOpacity
          style={styles.button}
          onPress={() => addToCart(product._id)} //This function is wrong. Change this later
        >
          <Text style={styles.buttonText}>Add to Cart</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: "#fff",
  },
  imageContainer: {
    width: "100%",
    height: "55%",
    backgroundColor: "#C4E1E6",
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "center",
  },
  detailsContainer: {
    flex: 1,
    padding: 20,
    marginTop: -20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: "#fff",
  },
  name: {
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 10,
  },
  infoRow: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 10,
    alignItems: "center",
  },
  info: {
    borderColor: "grey",
    borderWidth: 1.5,
    paddingHorizontal: 20,
    paddingVertical: 10,
    flexDirection: "row",
    gap: 10,
    borderRadius: 10,
  },
  rating: {
    fontSize: 16,
    color: "#000000",
    fontWeight: "bold",
  },
  likes: {
    fontSize: 16,
    color: "#000",
  },
  reviews: {
    fontSize: 16,
    color: "#777",
  },
  price: {
    fontSize: 22,
    fontWeight: "bold",
  },
  description: {
    fontSize: 16,
    lineHeight: 22,
    color: "#555",
    marginBottom: 20,
  },
  readMore: {
    color: "#0f0",
    fontWeight: "600",
  },
  button: {
    backgroundColor: "#EBFFD8",
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: "center",
    marginBottom: 20,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "700",
    color: "#000",
  },
});
