import React, { Component } from "react";
import {
  TouchableOpacity,
  KeyboardAvoidingView,
  TextInput,
  Text,
  StyleSheet,
  Picker,
  View,
  Alert,
} from "react-native";
import { connect } from "react-redux";
import { white, red } from "../utils/colors";
import { addNewCard } from "../actions";
import { useNavigation } from "@react-navigation/native";

class NewCard extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      header: null,
    };
  };

  state = {
    card: {
      question: "",
      answer: true,
    },
  };

  getQa = (input) => {
    let card = { ...this.state.card };
    card.question = input;
    this.setState(() => ({ card }));
  };

  getQaAns = (input) => {
    let card = { ...this.state.card };
    if (input === "true") {
      card.answer = true;
    }
    if (input === "false") {
      card.answer = false;
    }
    this.setState(() => ({ card }));
  };

  save = () => {
    if (this.state.card.question === "") {
      Alert.alert("Error","I need you to give me a question first!.",[{text: 'OK', onPress: () => console.log('No Pressed'), style: 'cancel'}], { cancelable: true });
    } else {
      const card = { ...this.state.card };
      const deck = this.props.route.params;
      const deckId = deck.deckId;
      this.props.addNewCard(deckId, card);
      this.props.navigation.navigate("DeckDetails", { deck: deck });
    }
  };

  toHome = () => {
    this.props.navigation.navigate("DeckDetails", { deckId: deckId });
  };

  componentDidMount() {}

  render() {
    return (
      <View style={styles.container}>
        <KeyboardAvoidingView behavior="padding" style={styles.row}>
          <Text style={{ fontSize: 20, marginBottom: 10 }}>
            Whats your question?
          </Text>
          <TextInput onChangeText={this.getQa} style={styles.input} />
          <Text style={{ fontSize: 20, marginBottom: 10 }}>
            Select a right answer: Correct/Incorrect
          </Text>
          <Picker
            selectedValue={this.state.card.answer ? "true" : "false"}
            mode="dropdown"
            style={{ width: 280, height: 110, marginBottom: 10 }}
            itemStyle={styles.select}
            onValueChange={(itemValue) => this.getQaAns(itemValue)}
          >
            <Picker.Item label="Correct" value="true" />
            <Picker.Item label="Incorrect" value="false" />
          </Picker>
          <TouchableOpacity style={styles.btn} onPress={this.save}>
            <Text style={styles.btnTxt}>Save question</Text>
          </TouchableOpacity>
        </KeyboardAvoidingView>
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
  select: {
    backgroundColor: white,
    color: red,
    borderBottomColor: red,
    borderRadius: 10,
    borderColor: red,
    borderWidth: 1,
    height: 110,
  },
  input: {
    backgroundColor: white,
    height: 50,
    width: 280,
    padding: 5,
    marginBottom: 20,
    borderRadius: 5,
    borderColor: red,
    borderWidth: 1,
  },
});

const mapDispatchToProps = (dispatch) => ({
  addNewCard: (deckId, card) => dispatch(addNewCard(deckId, card)),
});

export default connect(
  null,
  mapDispatchToProps
)((props) => {
  const navigation = useNavigation();
  return <NewCard {...props} navigation={navigation} />;
});
