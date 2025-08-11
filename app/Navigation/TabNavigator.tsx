import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";

//Main Screens
import Explore from "../Screens/Explore";
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
      <Tab.Screen name="Profile" component={Profile} />
      <Tab.Screen name="Explore" component={Explore} />
    </Tab.Navigator>
  );
};

export default TabNavigator;
