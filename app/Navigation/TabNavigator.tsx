import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";

//Main Screens
import CreateProoduct from "../Screens/CreateProduct";
import Home from "../Screens/Home";
import Profile from "../Screens/Profile";

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{ headerShown: false }}
    >
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Create" component={CreateProoduct} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
};

export default TabNavigator;
