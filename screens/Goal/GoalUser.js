import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
} from "react-native";

import { Firebase } from "../../utils/Firebase";
import { Entypo } from "@expo/vector-icons";

import Global from "../../utils/Global";

//import CreateAboutUser from "./CreateAboutUser";

class GoalUser extends Component {
  constructor(props) {
    super();
    this.userInfos = Firebase.firestore()
      .collection("UsersInfos")
      .where("AuthId", "==", Firebase.auth().currentUser.uid);
    this.userGoalInfos = Firebase.firestore()
      .collection("goalUsers")
      .where("AuthId", "==", Firebase.auth().currentUser.uid);
    this.state = {
      isLoading: true,
      userData: [],
    };
  }

  componentDidMount() {
    this.unsubscribe = this.userGoalInfos.onSnapshot(this.getCollection);
    this.unsubscribe_1 = this.userInfos.onSnapshot(this.getCollection_1);
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  getCollection = (querySnapshot) => {
    const userData = [];
    querySnapshot.forEach((res) => {
      const {
        AuthId,
        domaine,
        wantedJob,
        availability,
        workingTime,
        description,
      } = res.data();

      userData.push({
        key: res.id,
        res,
        domaine,
        wantedJob,
        availability,
        workingTime,
        description,
        AuthId,
      });
    });

    this.setState({ userData, isLoading: false });
  };

  getCollection_1 = (querySnapshot) => {
    const userInfos = [];
    querySnapshot.forEach((res) => {
      userInfos.push(res.data());
    });

    this.setState({ userInfos: userInfos });
    Global.name = userInfos[0].firstname + " " + userInfos[0].lastname;
    Global.user = userInfos;
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.card}>
          <FlatList
            data={this.state.userData}
            renderItem={({ item }) => (
              <View>
                <View style={styles.row}>
                  <Text style={styles.goal}>Mon Objectif </Text>
                  <TouchableOpacity>
                    <Text style={styles.iconStudies}></Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.card}>
                  <View style={styles.row}>
                    <View style={styles.details}>

                      <Text style={styles.item}>Domaine</Text>
                      <Text style={styles.itemStyle}>{item.domaine}</Text>

                      <Text style={styles.item}>
                        Poste Recherché
                      </Text>
                      <Text style={styles.itemStyle}>
                        {item.wantedJob}
                      </Text>

                      <Text style={styles.item}>
                        Disponibilité
                      </Text>
                      <Text style={styles.itemStyle}>
                        {item.availability}
                      </Text>

                      <Text style={styles.item}>
                        Durée De Travail Souhaitée
                      </Text>
                      <Text style={styles.itemStyle}>
                        {item.workingTime}
                      </Text>


                      <Text style={styles.item}>
                        Description
                      </Text>
                      <Text style={styles.itemStyle}>
                        {item.description}
                      </Text>
                    </View>
                    <View style={styles.iconStudies}>
                      <TouchableOpacity>
                        <Entypo
                          style={styles.iconStudies}
                          name="edit"
                          size={17}
                          color="black"
                          onPress={() =>
                            this.props.navigation.navigate("EditGoalUser", item)
                          }
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </View>
            )}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    margin: 4,
    //flex: 1,
    backgroundColor: "white",
  },
  card: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 6,
    //elevation: 3,
    height: "100%",
    width: "98%",
    backgroundColor: "white",
    //shadowOffset: {width:1, height:1},
    shadowColor: "#333",
    shadowOpacity: 0.3,
    shadowRadius: 2,
    marginHorizontal: 4,
    marginVertical: 6,
  },
  separator: {
    borderTopWidth: 1,
  },
  row: {
    flexDirection: "row",
    //justifyContent: "space-between",
    //height: "5",
    width: "100%",
    //padding: "4",
    //alignItems: "center",
  },
  addAbout: {
    fontWeight: "bold",
    fontSize: 17,
  },
  goal: {
    //flexDirection: "row",
    marginTop: 2,
    marginLeft: 4,
    width: "80%",
    marginBottom: 2,
    fontWeight: "bold",
    alignItems: "flex-start",
  },
  details: {
    //flexDirection: "row",
    marginTop: 3,
    marginLeft: 4,
    width: "93%",
    marginBottom: 2,
    fontWeight: "bold",
    alignItems: "flex-start",
    //backgroundColor: "red"
  },
  item: {
    marginLeft: 4,
    margin: 2,
    fontSize: 18,
    fontWeight: "bold",
    textDecorationLine: "underline",
  },
  itemStyle: {
    marginLeft: 10,
    margin: 2,
    fontSize: 17,
  },
  icon: {
    //flexDirection: "row",
    marginTop: 1,
    marginBottom: 2,
    fontWeight: "bold",
    alignItems: "flex-end",
    marginLeft: "60%",
  },
  iconStudies: {
    marginTop: 3,
    fontWeight: "bold",
    //marginLeft: "90%",
  },
  studiesContent: {
    padding: 0,
    borderRadius: 1,
    borderWidth: 1,
    borderColor: "black",
  },
  title: {
    textAlign: "center",
    color: "white",
    fontSize: 20,
    marginTop: 2,
  },
});

export default GoalUser;
