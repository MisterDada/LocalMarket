import React from "react";
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const Login = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar barStyle={"dark-content"} />
      <View style={styles.screen}>
        <Text style={{ fontSize: 30, marginBottom: 30, letterSpacing: 2 }}>
          SIGN IN
        </Text>
        <TextInput
          style={styles.input}
          placeholder="Username"
          placeholderTextColor="grey"
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="grey"
        />
        <Text style={{ marginTop: 20, fontSize: 16, color: "grey" }}>
          Don't have an account?{" "}
          <Text style={{ color: "#234f9fff" }}>Register Here</Text>
        </Text>
        <TouchableOpacity style={styles.button}>
          <Text style={{ color: "white", letterSpacing: 2, fontSize: 16 }}>
            LOGIN
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Login;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 80,
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
