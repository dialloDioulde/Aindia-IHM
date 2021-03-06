import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Formik } from "formik";
import * as Yup from "yup";
import { Firebase } from "../../utils/Firebase";
import Global from '../../utils/Global';



// Validation des champs du formulaire d'inscription de l'Utilisateur
const reviewSchema = Yup.object({
  firstname: Yup.string().required("Renseigner un Nom est Obligatoire"),
  lastname: Yup.string().required("Renseigner un Prénom est Obligatoire"),
  status: Yup.string().required("Renseigner un Statut est Obligatoire"),
  phone: Yup.string().min(1).max(50),
  //homeCity: Yup.string().notRequired("Ce champ n'est pas obligatoire"),
  //postalCode: Yup.string().notRequired("Ce champ n'est pas obligatoire"),
  //adress: Yup.string().notRequired("Ce champ n'est pas obligatoire"),
  //country: Yup.string().notRequired("Ce champ n'est pas obligatoire"),
});

// Renvoie l'écran contenant les formulaires
const CreateProfilUser = ({ navigation }) => {

  function addUser(user) {
    user.AuthId = Firebase.auth().currentUser.uid; 
    user.createdAt = Firebase.firestore.FieldValue.serverTimestamp();
    Firebase.firestore()
    .collection('UsersInfos')
    .add(user)
    .then(res => {
      alert("Votre Profil a bien été créé !");
      navigation.navigate("CreateGoalUser");
    })
    .catch((error) => console.log(error));

}

  return (
    <Formik
      initialValues={{
        AuthId: "",
        firstname: "",
        lastname: "",
        status: "",
        phone: "",
        homeCity: "",
        postalCode: "",
        address: "",
        country: "",
      }}
      validationSchema={reviewSchema}
      onSubmit={(values, actions) => {
        
        addUser(values); // On enregistre les Données dans la Base De Données
        Global.name = values.firstname + ' ' + values.lastname;
        console.log(Global.name);
      }}
    >
      {(props) => (
        <SafeAreaView style={styles.container}>
          <KeyboardAwareScrollView>
            <Text style={styles.aindia}>Je Crée Mon Profil</Text>

            <TextInput
              style={styles.input}
              placeholder="Nom * ex: DIALLO"
              onChangeText={props.handleChange("firstname")}
              value={props.values.firstname}
              onBlur={props.handleBlur("firstname")}
            />
            <Text style={styles.errorInput}>
              {props.touched.firstname && props.errors.firstname}
            </Text>

            <TextInput
              style={styles.input}
              placeholder="Prénom * ex: Mamadou"
              onChangeText={props.handleChange("lastname")}
              value={props.values.lastname}
              onBlur={props.handleBlur("lastname")}
            />
            <Text style={styles.errorInput}>
              {props.touched.lastname && props.errors.lastname}
            </Text>

            <TextInput
              style={styles.input}
              placeholder="Statut * ex: Étudiant"
              onChangeText={props.handleChange("status")}
              value={props.values.status}
              onBlur={props.handleBlur("status")}
            />
            <Text style={styles.errorInput}>
              {props.touched.status && props.errors.status}
            </Text>

            <TextInput
              style={styles.input}
              placeholder="Telephone"
              onChangeText={props.handleChange("phone")}
              value={props.values.phone}
              onBlur={props.handleBlur("phone")}
            />
            <Text style={styles.errorInput}>
              {props.touched.phone && props.errors.phone}
            </Text>

            <TextInput
              style={styles.input}
              placeholder="Ville ex: Saint Martin d'Hères"
              onChangeText={props.handleChange("homeCity")}
              value={props.values.homeCity}
              onBlur={props.handleBlur("homeCity")}
            />
            <Text style={styles.errorInput}>
              {props.touched.homeCity && props.errors.homeCity}
            </Text>

            <TextInput
              style={styles.input}
              placeholder="Code Postal ex: 38400"
              onChangeText={props.handleChange("postalCode")}
              value={props.values.postalCode}
              onBlur={props.handleBlur("postalCode")}
            />
            <Text style={styles.errorInput}>
              {props.touched.postalCode && props.errors.postalCode}
            </Text>

            <TextInput
              style={styles.input}
              placeholder="Adresse ex: 55 Allée Condillac"
              onChangeText={props.handleChange("address")}
              value={props.values.address}
              onBlur={props.handleBlur("address")}
            />
            <Text style={styles.errorInput}>
              {props.touched.address && props.errors.address}
            </Text>

            <TextInput
              style={styles.input}
              placeholder="Pays ex: France"
              onChangeText={props.handleChange("country")}
              value={props.values.country}
              onBlur={props.handleBlur("country")}
            />
            <Text style={styles.errorInput}>
              {props.touched.country && props.errors.country}
            </Text>

            <TouchableOpacity
              style={styles.buttonStyle}
              onPress={props.handleSubmit}
            >
              <View style={styles.button}>
                <Text style={styles.connexion}>VALIDER</Text>
              </View>
            </TouchableOpacity>
          </KeyboardAwareScrollView>
        </SafeAreaView>
      )}
    </Formik>
  );
};

// Définition des Styles appliqués sur l'interface RegisterUser
const styles = StyleSheet.create({
  container: {
    flex: 1, //important
    backgroundColor: "white",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    //marginTop: Constants.statusBarHeight,
  },
  aindia: {
    textAlign: "center",
    fontSize: 30,
    marginTop: 25,
    marginBottom: 10,
    color: "#254151",
  },
  input: {
    borderBottomWidth: 1,
    width: 278,
    //height: 40,
    marginTop: 15,
    fontSize: 17,
  },
  button: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#254151",
    height: 50,
    width: 180,
    marginTop: 20,
    marginLeft: 70,
    marginBottom: 20,
    borderRadius: 16,
  },

  connexion: {
    color: "white",
    fontSize: 30,
  },
  errorInput: {
    width: 300,
    color: "red",
    marginLeft: 8,
    marginTop: 5,
  },
});

export default CreateProfilUser;
