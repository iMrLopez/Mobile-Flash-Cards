import React, { useState } from "react";
import {
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Platform,
  StyleSheet,
  Button,
  Alert,
} from "react-native";
import { black, white, lightGray } from "../utils/colors";

function saveDeck(title: string) {
  if (title) {
    Alert.alert(title);
    //update Redux
    //update db
    //navigate to Decks list
  }
}

export default function AddDeck() {
  const [title, setTitle] = useState("");

  return (
    <View style={styles.container}>
      <Text style={styles.deckLabel}>What is the title of your new deck?</Text>
      <TextInput
        underlineColorAndroid={"transparent"}
        style={styles.deckTitle}
        editable={true}
        maxLength={50}
        value={title}
        onChangeText={(title) => setTitle(title)}
        placeholder="Deck Title"
      />
      <Button
        onPress={() => saveDeck(title)}
        title="Add Deck"
        accessibilityLabel="Add a deck"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: white,
    padding: 20,
  },
  deckLabel: {
    margin: 10,
    color: black,
    justifyContent: "center",
    alignItems: "center",
    fontSize: 40,
  },
  deckTitle: {
    marginTop: 10,
    marginBottom: 10,
    padding: 10,
    paddingTop: 5,
    paddingBottom: 5,
    borderWidth: 1,
    borderRadius: 4,
    borderColor: lightGray,
  },
});
