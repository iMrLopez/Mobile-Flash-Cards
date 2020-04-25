import React from "react";
import { View, StatusBar, Platform } from "react-native";
import { createStore, applyMiddleware } from "redux";
import reducer from "./reducers";
import { Provider } from "react-redux";
import NewDeck from "./components/NewDeck";
import thunk from "redux-thunk";
import { composeWithDevTools } from "remote-redux-devtools";
import MainPage from "./components/MainPage";
import DeckDetails from "./components/DeckDetails";
import Quiz from "./components/Quiz";
import NewCard from "./components/NewCard";
import { setLocalNotification } from "./utils/helpers";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
const Tab = createBottomTabNavigator();


const HomeStack = createStackNavigator();

function HomeStackScreen() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen name="MainPage" component={MainPage} />
      <HomeStack.Screen name="DeckDetails" component={DeckDetails} />
      <HomeStack.Screen name="Quiz" component={Quiz} />
      <HomeStack.Screen name="NewCard" component={NewCard} />
    </HomeStack.Navigator>
  );
}


const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)));

export default class App extends React.Component {
  componentDidMount() {
   setLocalNotification();
  }

  render() {
    return (
      <Provider store={store}>
        <View style={{ flex: 1 }}>
          <View>
            <StatusBar translucent />
          </View>
          <NavigationContainer>
            <Tab.Navigator>
              <Tab.Screen name="Home" component={HomeStackScreen} />
              <Tab.Screen name="Add new deck" component={NewDeck} />
            </Tab.Navigator>
          </NavigationContainer>
        </View>
      </Provider>
    );
  }
}
