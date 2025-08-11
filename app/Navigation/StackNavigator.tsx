import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { StyleSheet } from "react-native";
import ForgotPassword from "../Auth/ForgotPassword";
import Login from "../Auth/Login";
import Register from "../Auth/Register";

const Stack = createNativeStackNavigator();
const AuthStack = createNativeStackNavigator();

const StackNavigator = () => {
  const AuthStackNavigator = () => (
    <AuthStack.Navigator
      initialRouteName="Login"
      screenOptions={{
        headerShown: false,
        gestureEnabled: false,
      }}
    >
      <AuthStack.Screen name="Login" component={Login} />
      <AuthStack.Screen name="Register" component={Register} />
      <AuthStack.Screen name="ForgotPassword" component={ForgotPassword} />
    </AuthStack.Navigator>
  );

  return (
    <Stack.Navigator>
      <Stack.Screen name="Auth" component={AuthStackNavigator} />
    </Stack.Navigator>
  );
};

export default StackNavigator;

const styles = StyleSheet.create({});
