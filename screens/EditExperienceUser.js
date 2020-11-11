import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Firebase } from "../utils/Firebase";


class EditExperienceUser extends Component {
  // Cette fonction permet de naviguer de cet écran à un autre en fonction du paramtètre donné
  // Quand elle sera appelée
  //const pressHandler = () => {
  //navigation.goBack();
  //navigation.push('Accueil');

  constructor(props) {
    super();
    this.state = {
      key: props.navigation.state.params.key,
      domaine: props.navigation.state.params.domaine,
      responsability: props.navigation.state.params.responsability,
      organization: props.navigation.state.params.organization,
      duration: props.navigation.state.params.duration,
      description: props.navigation.state.params.description,
      date: props.navigation.state.params.date,
      AuthId: props.navigation.state.params.AuthId,
      isLoading: true,
    };
  }

  inputValueUpdate = (value, prop) => {
    const state = this.state;
    state[prop] = value;
    this.setState(state);
  };

  updateUser() {
    this.setState({ isLoading: true });

    const UpdateDBRef = Firebase.firestore()
      .collection("experienceUsers")
      .doc(this.state.key);

    UpdateDBRef.set({
      domaine: this.state.domaine,
      responsability: this.state.responsability,
      organization: this.state.organization,
      duration: this.state.duration,
      description: this.state.description,
      date: this.state.date,
      AuthId: this.state.AuthId,
    })
      .then((docRef) => {
        alert("Vos modifications ont bien été Sauvegarder ! ");
        this.props.navigation.navigate("ProfilScreen");
      })
      .catch((error) => {
        alert("Vos modifications n'ont pas été sauvegarder ! ");
        this.setState({
          isLoading: false,
        });
      });
  }

  render() {
    return (
      <SafeAreaView>
        <KeyboardAwareScrollView>
          <View style={styles.container}>
            <Text style={styles.aindia}>J'édite Mon Expérience</Text>

            <TextInput
              style={styles.input}
              placeholder="Domaine"
              value={this.state.domaine}
              onChangeText={(value) => this.inputValueUpdate(value, "domaine")}
            />

            <TextInput
              style={styles.input}
              placeholder="Résponsabilité"
              value={this.state.responsability}
              onChangeText={(value) =>
                this.inputValueUpdate(value, "responsability")
              }
            />

            <TextInput
              style={styles.input}
              placeholder="Organisation"
              value={this.state.organization}
              onChangeText={(value) =>
                this.inputValueUpdate(value, "organization")
              }
            />

            <TextInput
              style={styles.input}
              placeholder="Durée"
              value={this.state.duration}
              onChangeText={(value) => this.inputValueUpdate(value, "duration")}
            />

            <TextInput
              style={styles.description}
              multiline={true}
              numberOfLines={15}
              placeholder="Description"
              value={this.state.description}
              onChangeText={(value) =>
                this.inputValueUpdate(value, "description")
              }
            />

            <TextInput
              style={styles.input}
              placeholder="Année(s)"
              value={this.state.date}
              onChangeText={(value) => this.inputValueUpdate(value, "date")}
            />

            <TouchableOpacity
              style={styles.buttonStyle}
              onPress={() => this.updateUser()}
            >
              <View style={styles.button}>
                <Text style={styles.connexion}>VALIDER</Text>
              </View>
            </TouchableOpacity>
          </View>
        </KeyboardAwareScrollView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1, //important
    backgroundColor: "white",
    flexDirection: "column",
    //justifyContent: "center",
    alignItems: "center",
    //marginTop: Constants.statusBarHeight,
  },
  aindia: {
    textAlign: "center",
    color: "white",
    fontSize: 30,
    marginTop: 20,
    marginBottom: 30,
    color: "#254151",
  },
  input: {
    borderBottomWidth: 1,
    width: 300,
    height: 30,
    marginTop: 10,
  },
  description: {
    borderBottomWidth: 1,
    width: 293,
    //height: 20,
    marginTop: 10,
    padding: 5,
  },
  button: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#254151",
    height: 50,
    width: 180,
    marginTop: 30,
    marginBottom: 220,
    borderRadius: 16,
  },

  connexion: {
    color: "white",
    fontSize: 30,
  },
  errorInput: {
    width: 293,
    color: "red",
    //marginLeft: 8,
    marginTop: 10,
  },
});

export default EditExperienceUser;
