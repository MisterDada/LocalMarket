import * as ImagePicker from "expo-image-picker";
import React, { useState } from "react";
import {
  ActivityIndicator,
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

const CreateProduct = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState<string | null>(null);
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
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false, // crop feature
      aspect: [1, 1], // aspect ratio
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri); // Store the image URI
    }
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
          autoComplete="off"
          secureTextEntry
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
        {image && (
          <Image
            source={{ uri: image }}
            style={{ width: 200, height: 200, marginTop: 20 }}
          />
        )}
        <TouchableOpacity style={styles.button}>
          {loading ? (
            <ActivityIndicator />
          ) : (
            <Text style={{ color: "white", letterSpacing: 2, fontSize: 16 }}>
              Add Product
            </Text>
          )}
        </TouchableOpacity>
      </ScrollView>
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
