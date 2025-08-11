import * as SecureStore from "expo-secure-store";
import React from "react";
import {
  Button,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";

const Profile = () => {
  const userName = SecureStore.getItemAsync("username");
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <StatusBar barStyle={"dark-content"} />
      <View style={styles.header}>
        <Text>{userName}</Text>
        <Button
          title="logout"
          onPress={() => SecureStore.deleteItemAsync("token")}
        />
      </View>
    </SafeAreaView>
  );
};

export default Profile;

const styles = StyleSheet.create({
  header: {},
});
