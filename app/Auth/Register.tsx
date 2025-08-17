import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React, { useState } from "react";
import {
  ActivityIndicator,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Register } from "../API/user";
import { RootStackParamList } from "../types/Navigation";

const Login = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    try {
      await Register({ name, password, role });
      navigation.navigate("MainHome");
    } catch (error) {
      console.log("rehistration failed", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar barStyle={"dark-content"} />
      <View style={styles.screen}>
        <Text style={{ fontSize: 30, marginBottom: 30, letterSpacing: 2 }}>
          REGISTER
        </Text>
        <TextInput
          style={styles.input}
          placeholder="Username"
          placeholderTextColor="grey"
          value={name}
          onChangeText={setName}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          autoComplete="off"
          secureTextEntry
          placeholderTextColor="grey"
          value={password}
          onChangeText={setPassword}
        />
        <TextInput
          style={styles.input}
          autoComplete="off"
          placeholder="Seller / Buyer"
          placeholderTextColor="grey"
          value={role}
          onChangeText={setRole}
        />
        <Text style={{ marginTop: 20, fontSize: 16, color: "grey" }}>
          Already have an account?{" "}
          <Text style={{ color: "#234f9fff" }}>Login</Text>
        </Text>
        <TouchableOpacity style={styles.button} onPress={handleRegister}>
          {loading ? (
            <ActivityIndicator />
          ) : (
            <Text style={{ color: "white", letterSpacing: 2, fontSize: 16 }}>
              CREATE ACCOUNT
            </Text>
          )}
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Login;

export const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 60,
  },
  input: {
    borderWidth: 0,
    borderBottomWidth: 1,
    paddingLeft: 20,
    width: "100%",
    fontSize: 18,
    paddingBottom: 5,
    marginTop: 50,
  },
  button: {
    paddingHorizontal: 50,
    paddingVertical: 20,
    backgroundColor: "black",
    marginTop: 50,
  },
});
