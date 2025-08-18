import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import * as ImagePicker from "expo-image-picker";
import * as SecureStore from "expo-secure-store";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Button,
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { createProduct } from "../api/products";

type RootStackParamList = {
  Register: undefined;
};

const CreateProduct = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [file, setFile] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const pickImage = async () => {
    // Ask for media library permissions
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permissionResult.granted) {
      alert("Permission to access gallery is required!");
      return;
    }

    // Open the image picker
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: "images",
      allowsEditing: false, // crop feature
      aspect: [1, 1], // aspect ratio
      quality: 1,
    });

    if (!result.canceled) {
      setFile(result.assets[0].uri); // Store the image URI
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const newProduct = await createProduct({
        name,
        description,
        price,
        category,
        file,
      });
      console.log("Product created:", newProduct);
    } catch (err) {
      console.log("Failed to create product", err);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await SecureStore.deleteItemAsync("token");
    await SecureStore.deleteItemAsync("username");
    Alert.alert("Logged out", "You have been logged out.");
    navigation.navigate("Register");
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.header}>
        <Text style={{ fontSize: 25, fontWeight: "condensedBold" }}>
          Create Product
        </Text>
      </View>
      <ScrollView
        contentContainerStyle={{
          paddingHorizontal: 30,
          justifyContent: "center",
          flex: 0.8,
          paddingTop: 100,
        }}
      >
        <TextInput
          style={styles.input}
          placeholder="Product name"
          placeholderTextColor="grey"
          value={name}
          onChangeText={setName}
        />
        <TextInput
          style={styles.input}
          placeholder="Product description"
          placeholderTextColor="grey"
          value={description}
          onChangeText={setDescription}
        />
        <TextInput
          style={styles.input}
          placeholder="Enter a category"
          placeholderTextColor="grey"
          value={category}
          onChangeText={setCategory}
        />
        <TextInput
          style={styles.input}
          keyboardType={"number-pad"}
          placeholder="Enter price"
          placeholderTextColor="grey"
          value={price}
          onChangeText={setPrice}
        />

        <Button title="Pick an image from gallery" onPress={pickImage} />
        {file && (
          <Image
            source={{ uri: file }}
            style={{ width: 200, height: 200, marginTop: 20 }}
          />
        )}
      </ScrollView>
      <View style={{ paddingHorizontal: 30 }}>
        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          {loading ? (
            <ActivityIndicator />
          ) : (
            <Text style={{ color: "white", letterSpacing: 2, fontSize: 16 }}>
              Add Product
            </Text>
          )}
        </TouchableOpacity>
        {/* Logout Button */}
        <TouchableOpacity
          style={[styles.button, { backgroundColor: "#d9534f", marginTop: 20 }]}
          onPress={handleLogout}
        >
          <Text style={{ color: "white", letterSpacing: 2, fontSize: 16 }}>
            LOGOUT
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default CreateProduct;

const styles = StyleSheet.create({
  header: {
    paddingTop: 50,
    paddingHorizontal: 30,
  },
  input: {
    borderWidth: 1.5,
    padding: 20,
    width: "100%",
    fontSize: 18,
    marginTop: 20,
    borderRadius: 10,
    borderColor: "#b3b3b3b2",
  },
  button: {
    paddingHorizontal: 50,
    paddingVertical: 20,
    backgroundColor: "black",
    marginTop: 50,
    borderRadius: 10,
    alignItems: "center",
  },
});
