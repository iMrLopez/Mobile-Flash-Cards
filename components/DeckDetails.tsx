import React, { Component, Fragment } from "react";
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  Platform,
  ActivityIndicator,
} from "react-native";
import { connect } from "react-redux";
import { white, red } from "../utils/colors";
import { getOneDeck } from "../actions/index";
import { clearLocalNotification, setLocalNotification } from "../utils/helpers";
import { useNavigation } from "@react-navigation/native";

class DeckDetails extends Component {
  static navigationOptions = ({ navigation }) => {
    const { deck } = navigation.state.params;
    return {
      title: deck.deckTitle,
      header: null,
    };
  };

  state = {
    deckLoaded: false,
    deck: "",
    cards: [],
  };

  componentDidMount() {
    this.props.getOneDeck(this.props.route.params.deck.deckId);
  }

  startQuiz = (cards) => {
    if (cards.length === 0) {
      alert("This Deck has no cards, Add a card.");
    } else if (cards.length > 0) {
      clearLocalNotification().then(setLocalNotification);
      this.props.navigation.navigate("Quiz", cards);
    }
  };

  render() {
    const deck = this.props.singleDeck;

    return (
      <View style={styles.container}>
        {deck !== undefined ? (
          <View style={styles.row}>
            <Text style={{ fontSize: 27, fontWeight: "bold" }}>
              {deck.deckTitle}
            </Text>
            {deck.cards === undefined ? null : (
              <Text style={{ paddingBottom: 10 }}>
                {deck.cards.length === 0
                  ? " No cards on this deck! ADD SOME!"
                  : deck.cards.length + " Cards"}
              </Text>
            )}
            <Text style={styles.collateralText}>You can</Text>
            <TouchableOpacity
              style={styles.saveBtn}
              onPress={() => this.props.navigation.navigate("NewCard", deck)}
            >
              <Text style={styles.saveBtnText}>Add a question</Text>
            </TouchableOpacity>
            {deck.cards === undefined ? null : (
              <Fragment>
                <Text style={styles.collateralText}>Or you can ...</Text>
                <TouchableOpacity
                  style={styles.saveBtn}
                  onPress={() => this.startQuiz(deck.cards)}
                >
                  <Text style={styles.saveBtnText}>Start the quiz!</Text>
                </TouchableOpacity>
              </Fragment>
            )}
          </View>
        ) : (
          <ActivityIndicator size="large" color="#0000ff" />
        )}
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
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
    shadowColor: "#222",
    shadowOpacity: 0.4,
    alignItems: "center",
  },
  saveBtn: {
    backgroundColor: "transparent",
    borderWidth: 2,
    borderColor: red,
    padding: 5,
    width: 170,
    borderRadius: 50,
    height: 45,
    marginLeft: 40,
    marginRight: 40,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
  },
  saveBtnText: {
    color: red,
    fontSize: 22,
    textAlign: "center",
  },
  collateralText: {
    fontSize: 15,
    fontWeight: "bold",
    paddingTop: 10,
  },
});

const mapDispatchToProps = (dispatch) => ({
  getOneDeck: (deckId) => dispatch(getOneDeck(deckId)),
});

const mapStateToProps = (state) => ({
  singleDeck: state.allDecks.singleDeck,
  decks: state.allDecks.decks,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)((props) => {
  const navigation = useNavigation();
  return <DeckDetails {...props} navigation={navigation} />;
});
