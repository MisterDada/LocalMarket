import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  Image,
  ListRenderItem,
  Pressable,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { addToCart } from "../api/cart";
import { getProducts } from "../api/products";
import { RootStackParamList } from "../Interface/Navigation";
import { Product } from "../Interface/Products";

const { width } = Dimensions.get("window");
const CARD_MARGIN = 12;
const CARD_WIDTH = (width - CARD_MARGIN * 3) / 2;

export default function Index() {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const [products, setProducts] = useState([]);
  const [loadingProductId, setLoadingProductId] = useState<string | null>(null);
  const numColumns = 2;

  useEffect(() => {
    const fetchData = async () => {
      const data = await getProducts();
      setProducts(data);
    };
    fetchData();
  }, []);

  const renderItem: ListRenderItem<Product> = ({ item }) => (
    <Pressable
      onPress={() => navigation.navigate("ProductDetails", { product: item })}
    >
      <View style={styles.card}>
        <Image
          source={{ uri: item.image?.url }}
          style={styles.productImage}
          resizeMode="cover"
        />
        <Text style={styles.productName}>{item.name}</Text>
        <Text style={styles.productDesc} numberOfLines={2}>
          {item.description}
        </Text>
        <Text style={styles.productPrice}>₦ {item.price}</Text>
        <TouchableOpacity
          style={styles.buyButton}
          disabled={loadingProductId === item._id}
          onPress={async () => {
            setLoadingProductId(item._id); // only this item shows spinner
            try {
              const result = await addToCart(item._id);
              if (result) alert("Added to cart!");
              else alert("Failed to add product");
            } finally {
              setLoadingProductId(null);
            }
          }}
        >
          {loadingProductId === item._id ? (
            <ActivityIndicator size="small" color="black" />
          ) : (
            <Text
              style={{
                color: "black",
                fontWeight: "bold",
                textAlign: "center",
              }}
            >
              Add to cart
            </Text>
          )}
        </TouchableOpacity>
      </View>
    </Pressable>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.header}>
        <Text style={styles.title}>Local Market</Text>
        <TouchableOpacity onPress={() => navigation.navigate("Cart")}>
          <Text style={styles.cart}>🛒</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.searchContainer}>
        <TextInput
          placeholder="Search products..."
          placeholderTextColor="#888"
          style={styles.searchInput}
        />
      </View>
      <View style={styles.banner}>
        <Text style={styles.bannerText}>🔥 Big Clearance Sales!</Text>
        <Text style={styles.bannerSub}>Up to 50% off selected items</Text>
      </View>
      <FlatList
        data={products}
        key={numColumns}
        keyExtractor={(item) => item._id?.toString()}
        renderItem={renderItem}
        ListEmptyComponent={
          <Text style={styles.emptyText}>Loading Products...</Text>
        }
        numColumns={numColumns}
        contentContainerStyle={styles.listContent}
        columnWrapperStyle={styles.columnWrapper}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

export const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    paddingHorizontal: 24,
    paddingTop: 18,
    paddingBottom: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#fff",
    borderBottomWidth: 0.5,
    borderColor: "#eee",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#222",
    letterSpacing: 1,
  },
  cart: {
    fontSize: 26,
  },
  searchContainer: {
    paddingHorizontal: 24,
    paddingVertical: 10,
    backgroundColor: "#fff",
  },
  searchInput: {
    backgroundColor: "#ececec",
    borderRadius: 12,
    padding: 14,
    fontSize: 16,
    color: "#222",
  },
  banner: {
    marginHorizontal: 24,
    marginVertical: 16,
    backgroundColor: "#8DBCC7",
    borderRadius: 18,
    padding: 24,
    alignItems: "flex-start",
    justifyContent: "center",
    elevation: 2,
  },
  bannerText: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 6,
  },
  bannerSub: {
    color: "#fff",
    fontSize: 16,
    opacity: 0.8,
  },
  listContent: {
    paddingHorizontal: CARD_MARGIN,
    paddingBottom: 30,
  },
  columnWrapper: {
    justifyContent: "space-between",
    marginBottom: CARD_MARGIN,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 16,
    marginBottom: CARD_MARGIN,
    width: CARD_WIDTH,
    elevation: 2,
    shadowColor: "#222",
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    alignItems: "center",
  },
  productImage: {
    width: CARD_WIDTH - 32,
    height: 120,
    borderRadius: 12,
    marginBottom: 12,
    backgroundColor: "#ececec",
  },
  productName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#222",
    marginBottom: 4,
    textAlign: "center",
  },
  productDesc: {
    fontSize: 14,
    color: "#666",
    marginBottom: 8,
    textAlign: "center",
  },
  productPrice: {
    fontSize: 16,
    color: "#222",
    fontWeight: "bold",
    marginBottom: 10,
  },
  buyButton: {
    backgroundColor: "#EBFFD8",
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 24,
    marginTop: 4,
  },
  emptyText: {
    textAlign: "center",
    color: "#888",
    fontSize: 18,
    marginTop: 40,
  },
});
