import React, { Component } from "react";
import { View, TouchableOpacity, Text, StyleSheet, Button } from "react-native";
import { white, red, green, gray } from "../utils/colors";
import { useNavigation } from "@react-navigation/native";

class Quiz extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      header: null,
    };
  };

  state = {
    cardsLoaded: false,
    cards: [],
    currentCard: 0,
    answeredCorrect: 0,
    quizFinished: false,
    viewAnswer: false,
  };

  componentDidMount() {
    this.getCards();
  }

  getCards = () => {
    this.setState({ cards: this.props.route.params }, () => {
      this.setState({ cardsLoaded: true });
    });
  };

  pressedIncorrect = () => {
    let updatedCard = this.state.currentCard;
    let answeredCorrect = this.state.answeredCorrect;
    if (this.state.currentCard === this.state.cards.length - 1) {
      if (!this.state.cards[this.state.currentCard].answer) {
        answeredCorrect++;
        this.setState({ answeredCorrect });
      }
      this.setState({ currentCard: updatedCard });
      this.setState({ quizFinished: true });
    } else {
      if (!this.state.cards[this.state.currentCard].answer) {
        answeredCorrect++;
        this.setState({ answeredCorrect });
      }
      updatedCard++;
      this.setState({ currentCard: updatedCard });
    }
  };

  pressedCorrect = () => {
    let updatedCard = this.state.currentCard;
    let answeredCorrect = this.state.answeredCorrect;
    if (this.state.currentCard === this.state.cards.length - 1) {
      if (this.state.cards[this.state.currentCard].answer) {
        answeredCorrect++;
        this.setState({ answeredCorrect });
      }
      this.setState({ currentCard: updatedCard });
      this.setState({ quizFinished: true });
    } else {
      if (this.state.cards[this.state.currentCard].answer) {
        answeredCorrect++;
        this.setState({ answeredCorrect });
      }
      updatedCard++;
      this.setState({ currentCard: updatedCard });
    }
  };

  viewAnswer = () => {
    this.setState({ viewAnswer: !this.state.viewAnswer });
  };

  restartQuiz = () => {
    this.setState({
      currentCard: 0,
      answeredCorrect: 0,
      quizFinished: false,
      viewAnswer: false,
    });
  };

  render() {
    const state = this.state;
    const passingScore = state.cards.length - 2;

    const inProgress = (
      <View style={styles.center}>
        <View>
          <Text>
            Question {1 + state.currentCard} out of {state.cards.length}
          </Text>
        </View>
        <View
          style={{
            flex: 1,
            justifyContent: "space-around",
            alignItems: "center",
          }}
        >
          {!state.cardsLoaded ? null : (
            <View style={{ alignItems: "center" }}>
              <Text style={{ fontSize: 22 }}>
                {this.state.cards[this.state.currentCard].question}
              </Text>
              <Button
                onPress={() => this.viewAnswer()}
                style={{ marginBottom: 15 }}
                title={this.state.viewAnswer ? "Hide Answer" : "View Answer"}
                color={gray}
              />
              {this.state.viewAnswer ? (
                <View>
                  {this.state.cards[this.state.currentCard].answer ? (
                    <Text style={{ color: green, fontSize: 23 }}>Correct</Text>
                  ) : (
                    <Text style={{ color: red, fontSize: 23 }}>Incorrect</Text>
                  )}
                </View>
              ) : null}
            </View>
          )}

          <TouchableOpacity
            style={[styles.correctBtn, { bottom: 130 }]}
            onPress={() => this.pressedCorrect()}
          >
            <Text style={styles.correctBtnText}>Correct</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.incorrectBtn, { bottom: 65 }]}
            onPress={() => this.pressedIncorrect()}
          >
            <Text style={styles.incorrectBtnText}>Incorrect</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
    const quizFinished = (
      <View style={styles.center}>
        <View style={styles.row}>
          {passingScore <= state.answeredCorrect ? (
            <View
              style={{ alignItems: "center", justifyContent: "space-evenly" }}
            >
              <View>
                <Text style={{ fontSize: 25, color: green }}>
                  Congrats you passed
                </Text>
                <Text>
                  {state.answeredCorrect} out of {state.cards.length} decks were
                  answered right!
                </Text>
              </View>
            </View>
          ) : (
            <View
              style={{
                alignItems: "center",
                flex: 1,
                justifyContent: "space-evenly",
              }}
            >
              <View>
                <Text style={{ fontSize: 25, color: red }}>
                  Sorry, You didn't pass
                </Text>
                <Text style={{ fontSize: 17 }}>Keep it up thought</Text>
                <Text style={{ marginTop: 25, fontSize: 20 }}>
                  {state.answeredCorrect} out of {state.cards.length} decks were
                  answered right! (You need at least {passingScore} cards
                  answered right to pass)
                </Text>
              </View>
            </View>
          )}
          <TouchableOpacity
            style={[styles.endBtns, { bottom: 125 }]}
            onPress={() => this.props.navigation.navigate("MainPage")}
          >
            <Text style={styles.correctBtnText}>New deck</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.endBtns, { bottom: 60 }]}
            onPress={() => this.restartQuiz()}
          >
            <Text style={styles.correctBtnText}>Restart now!</Text>
          </TouchableOpacity>
        </View>
      </View>
    );

    return (
      <View style={styles.container}>
        <View style={styles.row}>
          {state.quizFinished ? quizFinished : inProgress}
        </View>
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
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 30,
    marginRight: 30,
  },
  correctBtn: {
    backgroundColor: "transparent",
    borderWidth: 2,
    borderColor: green,
    padding: 5,
    width: 170,
    borderRadius: 50,
    height: 45,
    justifyContent: "center",
    position: "absolute",
    alignItems: "center",
  },
  incorrectBtn: {
    backgroundColor: "transparent",
    borderWidth: 2,
    borderColor: gray,
    padding: 5,
    width: 170,
    borderRadius: 50,
    height: 45,
    justifyContent: "center",
    position: "absolute",
    alignItems: "center",
  },
  correctBtnText: {
    color: green,
    fontSize: 22,
    textAlign: "center",
  },
  incorrectBtnText: {
    color: gray,
    fontSize: 22,
    textAlign: "center",
  },
  endBtns: {
    backgroundColor: "transparent",
    borderWidth: 2,
    borderColor: gray,
    padding: 5,
    width: 170,
    borderRadius: 50,
    height: 45,
    bottom: 100,
    justifyContent: "center",
    position: "absolute",
    alignItems: "center",
  },
});

export default (props) => {
  const navigation = useNavigation();
  return <Quiz {...props} navigation={navigation} />;
};
