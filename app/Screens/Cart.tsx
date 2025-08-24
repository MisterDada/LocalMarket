import React, { useEffect, useState } from "react";
import {
  Dimensions,
  FlatList,
  Image,
  ListRenderItem,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { getUserCart } from "../api/cart";
import { User } from "../Interface/User";

const { width } = Dimensions.get("window");
const CARD_MARGIN = 12;
const CARD_WIDTH = (width - CARD_MARGIN * 3) / 2;

export default function Index() {
  const [cartItems, setCartItems] = useState<User[]>([]);
  const numColumns = 2;

  useEffect(() => {
    const fetchData = async () => {
      const data = await getUserCart();
      setCartItems(data);
    };
    fetchData();
  }, [cartItems]);

  const renderItem: ListRenderItem<User> = ({ item }) => (
    <View style={styles.card}>
      <Image
        source={{
          uri: item.product.image?.url,
        }}
        style={styles.productImage}
        resizeMode="cover"
      />
      <Text style={styles.productName}>{item.product.name}</Text>
      <Text style={styles.productDesc} numberOfLines={2}>
        {item.product.description}
      </Text>
      <Text style={styles.productPrice}>₦ {item.product.price}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.header}>
        <Text style={styles.title}>Cart</Text>
      </View>
      <FlatList
        data={cartItems}
        key={numColumns}
        keyExtractor={(item) => item.product._id?.toString()}
        renderItem={renderItem}
        ListEmptyComponent={
          <Text style={styles.emptyText}>Getting Items...</Text>
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
  emptyText: {
    textAlign: "center",
    color: "#888",
    fontSize: 18,
    marginTop: 40,
  },
});
