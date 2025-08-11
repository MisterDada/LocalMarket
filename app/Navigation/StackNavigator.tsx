import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as SecureStore from "expo-secure-store";
import React, { useEffect, useState } from "react";

//Auth Screens
import ForgotPassword from "../Auth/ForgotPassword";
import Login from "../Auth/Login";
import Register from "../Auth/Register";

//TabNavigator
import TabNavigator from "../Navigation/TabNavigator";

const Stack = createNativeStackNavigator();
const AuthStack = createNativeStackNavigator();
const InsideStack = createNativeStackNavigator();

const StackNavigator = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const AuthStackNavigator = () => (
    <AuthStack.Navigator
      initialRouteName="Register"
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

  const InsideStackNavigator = () => (
    <InsideStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <InsideStack.Screen name="MainHome" component={TabNavigator} />
    </InsideStack.Navigator>
  );

  const checkStatus = async () => {
    const user = await SecureStore.getItemAsync("token");
    if (user) {
      setIsLoggedIn(true);
    }
  };

  useEffect(() => {
    checkStatus();
  }, []);

  return (
    <Stack.Navigator
      initialRouteName="Auth"
      screenOptions={{ headerShown: false }}
    >
      {isLoggedIn ? (
        <Stack.Screen name="Home" component={InsideStackNavigator} />
      ) : (
        <Stack.Screen name="Auth" component={AuthStackNavigator} />
      )}
    </Stack.Navigator>
  );
};

export default StackNavigator;
