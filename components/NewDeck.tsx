import React, { Component } from "react";
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  Platform,
  KeyboardAvoidingView,
  TextInput,
  Alert,
} from "react-native";
import { connect } from "react-redux";
import { red, white } from "../utils/colors";
import { addNewDeck } from "../actions/index";
import { getRandomNumber } from "../utils/helpers";

class NewDeck extends Component {
  state = {
    deck: {
      deckId: "Deck" + getRandomNumber(),
      deckTitle: "",
      cards: [],
    },
    btnIsDisabled: true,
  };

  grabDeckTitle = (input: string) => {
    if (input.length > 0) {
      this.setState(() => ({ btnIsDisabled: false }));
      let deck = { ...this.state.deck };
      deck.deckTitle = input;
      this.setState(() => ({ deck }));
    }
  };

  saveDeck = () => {
    const newDeck = { ...this.state.deck };
    this.props.addNewDeck(newDeck);
    let resetDeck = { ...this.state.deck };
    this.props.navigation.navigate("MainPage");
    setTimeout(() => {
      this.props.navigation.navigate("DeckDetails", { deck: resetDeck });
    }, 200);
    this.resetState();
  };

  resetState = () => {
    setTimeout(() => {
      let resetDeck = { ...this.state.deck };
      resetDeck.deckTitle = "";
      resetDeck.deckId = "Deck" + getRandomNumber();
      console.log("state reset");
      this.setState(() => ({ deck: resetDeck }));
    }, 500);
  };

  render() {
    return (
      <KeyboardAvoidingView behavior="padding" style={styles.container}>
        <KeyboardAvoidingView behavior="padding" style={styles.row}>
          <Text style={{ fontSize: 20, marginBottom: 10 }}>
            Create your new deck ;)
          </Text>
          <TextInput onChangeText={this.grabDeckTitle} style={styles.input} />
          <TouchableOpacity
            style={styles.saveBtn}
            disabled={this.state.btnIsDisabled}
            onPress={this.saveDeck}
          >
            <Text style={styles.saveBtnText}>Create Deck</Text>
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: white,
  },
  row: {
    justifyContent: "center",
    flex: 1,
    alignItems: "center",
  },
  input: {
    backgroundColor: "#ededed",
    height: 50,
    width: 280,
    marginBottom: 20,
    padding: 7,
    borderRadius: 5,
    borderColor: red,
    borderWidth: 1,
  },

  saveBtn: {
    backgroundColor: red,
    padding: 10,
    width: 170,
    borderRadius: 7,
    height: 45,
    marginLeft: 40,
    marginRight: 40,
  },
  saveBtnText: {
    color: white,
    fontSize: 22,
    textAlign: "center",
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 30,
    marginRight: 30,
  },
});

const mapDispatchToProps = (
  dispatch: (arg0: (dispatch: any) => void) => any
) => ({
  addNewDeck: (id: any, deck: any) => dispatch(addNewDeck(id, deck)),
});

export default connect(null, mapDispatchToProps)(NewDeck);
