import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";

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
      <InsideStack.Screen name="Home" component={TabNavigator} />
    </InsideStack.Navigator>
  );

  return (
    <Stack.Navigator
      initialRouteName="Auth"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Auth" component={AuthStackNavigator} />
      <Stack.Screen name="Home" component={InsideStackNavigator} />
    </Stack.Navigator>
  );
};

export default StackNavigator;
