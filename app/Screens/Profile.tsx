import * as SecureStore from "expo-secure-store";
import React from "react";
import { SafeAreaView, StatusBar, StyleSheet, Text, View } from "react-native";

const Profile = () => {
  const username = SecureStore.getItemAsync("username");
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <StatusBar barStyle={"dark-content"} />
      <View style={styles.header}>
        <Text>{username}</Text>
      </View>
    </SafeAreaView>
  );
};

export default Profile;

const styles = StyleSheet.create({
  header: {},
});
