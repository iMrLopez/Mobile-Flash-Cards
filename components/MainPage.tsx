import React, { Component } from "react";
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  Platform,
  ScrollView,
} from "react-native";
import { connect } from "react-redux";
import { white, red } from "../utils/colors";
import { getAllDecks } from "../actions";
import { useNavigation } from "@react-navigation/native";


class MainPage extends Component {
  state = {};

  componentDidMount() {
    this.props.getAllDecks();
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView>
          {this.props.decks.map((deck) => {
            return (
              <View key={deck.deckTitle} style={styles.deck}>
                <View style={styles.row}>
                  <Text style={{ fontSize: 22, fontWeight: "bold" }}>
                    {" "}
                    {deck.deckTitle}{" "}
                  </Text>
                  <Text style={{ paddingBottom: 10 }}>
                    {deck.cards.length === 0
                      ? " No cards"
                      : deck.cards.length + " Cards"}
                  </Text>
                  <TouchableOpacity
                    style={styles.btn}
                    onPress={() =>
                      this.props.navigation.navigate("DeckDetails", {
                        deck: deck,
                      })
                    }
                  >
                    <Text style={styles.btnTxt}>Open Deck</Text>
                  </TouchableOpacity>
                </View>
              </View>
            );
          })}
        </ScrollView>
      </View>
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
    flex: 1,
    backgroundColor: "#efefef",
    padding: 15,
    alignSelf: "stretch",
    alignItems: "center",
    borderRadius: 10,
  },
  deck: {
    flex: 1,
    margin: 10,
    borderRadius: 5,
    shadowColor: "#222",
    shadowOpacity: 0.4,
    alignItems: "center",
  },
  btn: {
    backgroundColor: "transparent",
    borderWidth: 2,
    borderColor: red,
    padding: 5,
    width: 170,
    borderRadius: 50,
    height: 45,
    marginLeft: 40,
    marginRight: 40,
  },
  btnTxt: {
    color: red,
    fontSize: 22,
    textAlign: "center",
  },
});

const mapDispatchToProps = (dispatch) => ({
  getAllDecks: () => dispatch(getAllDecks()),
});

const mapStateToProps = (state) => ({
  decks: state.allDecks.decks,
});


export default connect(mapStateToProps, mapDispatchToProps)((props) => {
  const navigation = useNavigation();
  return <MainPage {...props} navigation={navigation} />;
});
