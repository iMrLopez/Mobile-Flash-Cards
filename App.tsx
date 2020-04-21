import React from "react";
import { StyleSheet, View, StatusBar } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import DeckList from "./components/DeckList";
import AddDeck from "./components/AddDeck";
import Ionicons from "react-native-vector-icons/Ionicons";
import Constants from "expo-constants";

const Tab = createBottomTabNavigator();


function Navigation() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            if (route.name === "AddDeck") {
              iconName = focused ? "ios-add-circle" : "ios-add-circle-outline";
            } else if (route.name === "Decks") {
              iconName = focused ? "ios-list-box" : "ios-list";
            }
            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
        tabBarOptions={{
          activeTintColor: "tomato",
          inactiveTintColor: "gray",
        }}
      >
        <Tab.Screen name="Decks" component={DeckList} />
        <Tab.Screen name="AddDeck" component={AddDeck} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default function App({ ...props }) {
  return (
    <View style={{ flex: 1 }}>
      <View style={{ height: Constants.statusBarHeight }}>
        <StatusBar
          translucent
          {...props}
        />
      </View>
      <Navigation />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
