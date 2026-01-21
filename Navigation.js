import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./HomeScreen";
import EditUserScreen from "./EditUserScreen";
import AddUserScreen from "./AddUserScreen";
const Stack = createNativeStackNavigator();

export default function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Edit" component={EditUserScreen} />
        <Stack.Screen name="Add" component={AddUserScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
