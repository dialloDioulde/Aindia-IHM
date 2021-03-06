import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  ScrollView,
} from "react-native";
import { Button } from "react-native-elements";

import Global from "../../utils/Global";

import { Title } from "react-native-paper";
import { Firebase } from "../../utils/Firebase";
import { Entypo } from "@expo/vector-icons";

class ProfilUserRecruiter extends Component {
  constructor(props) {
    super();
    this.state = {
      isLoading: true,
      AuthId: props.navigation.state.params.AuthId,
      userData: [],
      userGoalData: [],
      userStudiesData: [],
      userExperiencesData: [],
    };
    this.userInfos = Firebase.firestore()
        .collection("UsersInfos")
        .where("AuthId", "==", this.state.AuthId);
    this.userGoalInfos = Firebase.firestore()
        .collection("goalUsers")
        .where("AuthId", "==", this.state.AuthId);
    this.userStudiesInfos = Firebase.firestore()
        .collection("studiesUsers")
        .where("AuthId", "==", this.state.AuthId);
    this.userExperiencesInfos = Firebase.firestore()
        .collection("experienceUsers")
        .where("AuthId", "==", this.state.AuthId);
  }

  componentDidMount() {
    this.unsubscribe = this.userInfos.onSnapshot(this.getCollection);
    this.unsubscribe_1 = this.userGoalInfos.onSnapshot(this.getCollection_1);
    this.unsubscribe_2 = this.userStudiesInfos.onSnapshot(this.getCollection_2);
    this.unsubscribe_3 = this.userExperiencesInfos.onSnapshot(
        this.getCollection_3
    );
  }

  componentWillUnmount() {
    this.unsubscribe();
    this.unsubscribe_1();
    this.unsubscribe_2();
    this.unsubscribe_3();
  }

  // Infos
  getCollection = (querySnapshot) => {
    const userData = [];
    querySnapshot.forEach((res) => {
      const {
        firstname,
        lastname,
        status,
        phone,
        homeCity,
        postalCode,
        address,
        country,
        AuthId,
      } = res.data();

      userData.push({
        key: res.id,
        res,
        firstname,
        lastname,
        status,
        phone,
        homeCity,
        postalCode,
        address,
        country,
        AuthId,
      });
    });

    this.setState({ userData });
  };
  // Infos

  // Goal
  getCollection_1 = (querySnapshot) => {
    const userGoalData = [];
    querySnapshot.forEach((res) => {
      const {
        AuthId,
        domaine,
        wantedJob,
        availability,
        workingTime,
        description,
      } = res.data();

      userGoalData.push({
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

    this.setState({ userGoalData });
    console.log(userGoalData);
  };
  // Goal

  // Studies
  getCollection_2 = (querySnapshot) => {
    const userStudiesData = [];
    querySnapshot.forEach((res) => {
      const { AuthId, domaine, level, name, school, date } = res.data();

      userStudiesData.push({
        key: res.id,
        res,
        domaine,
        level,
        name,
        school,
        date,
        AuthId,
      });
    });

    this.setState({ userStudiesData, isLoading: false });
    console.log(userStudiesData);
  };
  // Studies

  // Experiencies
  getCollection_3 = (querySnapshot) => {
    const userExperiencesData = [];
    querySnapshot.forEach((res) => {
      const {
        AuthId,
        domaine,
        responsability,
        organization,
        duration,
        description,
        date,
      } = res.data();

      userExperiencesData.push({
        key: res.id,
        res,
        domaine,
        responsability,
        organization,
        duration,
        description,
        date,
        AuthId,
      });
    });

    this.setState({ userExperiencesData, isLoading: false });
  };
  // Experiencies

  render() {
    return (
        <ScrollView
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
        >
          <SafeAreaView style={styles.container}>
            <SafeAreaView style={styles.infos}>
              <FlatList

                  data={this.state.userData}
                  renderItem={({ item }) => (
                      <View style={styles.rowContent}>
                        <View style={styles.details}>
                          <Title style={styles.infos}>
                            {item.lastname} {item.firstname}
                          </Title>

                          <Text style={styles.infos}>{item.status}</Text>

                          <Text style={styles.infos}>{item.address}</Text>

                          <Text style={styles.infos}>
                            {item.postalCode}, {item.homeCity}, {item.country}
                          </Text>
                        </View>
                      </View>
                  )}
              />
            </SafeAreaView>

            <SafeAreaView>
              <FlatList
                  data={this.state.userGoalData}
                  renderItem={({ item }) => (
                      <View style={styles.contentView}>
                        <View>
                          <Text style={styles.content}>Mon Objectif </Text>
                        </View>

                        <View style={styles.card}>
                          <Text style={styles.itemTitle}>
                            Domaine ->
                            <Text
                                style={[styles.itemStyle, { fontWeight: "normal" }]}
                            >
                              {" "}
                              {item.domaine}
                            </Text>
                          </Text>

                          <Text style={styles.itemTitle}>
                            Poste Recherché ->
                            <Text
                                style={[styles.itemStyle, { fontWeight: "normal" }]}
                            >
                              {" "}
                              {item.wantedJob}
                            </Text>
                          </Text>

                          <Text style={styles.itemTitle}>
                            Durée ->
                            <Text
                                style={[styles.itemStyle, { fontWeight: "normal" }]}
                            >
                              {" "}
                              {item.workingTime}
                            </Text>
                          </Text>

                          <Text style={styles.itemTitle}>
                            Disponibilité ->
                            <Text
                                style={[styles.itemStyle, { fontWeight: "normal" }]}
                            >
                              {" "}
                              {item.availability}
                            </Text>
                          </Text>

                          <Text style={styles.itemStyle}>{item.description}</Text>
                        </View>
                      </View>
                  )}
              />
            </SafeAreaView>

            <SafeAreaView style={styles.contentView}>
              <View>
                <Text style={styles.content}>Formations </Text>
              </View>
              <FlatList
                  data={this.state.userStudiesData}
                  renderItem={({ item }) => (
                      <View style={styles.card}>
                        <Text style={styles.itemTitle}>{item.school}</Text>

                        <Text style={styles.itemTitle}>{item.level}</Text>

                        <Text style={styles.itemStyle}>{item.domaine}</Text>

                        <Text style={styles.itemStyle}>{item.name}</Text>

                        <Text style={styles.itemTitle}>{item.date}</Text>
                      </View>
                  )}
              />
            </SafeAreaView>

            <SafeAreaView style={styles.contentView}>
              <View>
                <Text style={styles.content}>Expériences</Text>
              </View>
              <FlatList
                  data={this.state.userExperiencesData}
                  renderItem={({ item }) => (
                      <View style={styles.card}>
                        <Text style={styles.itemTitle}>{item.responsability}</Text>

                        <Text style={styles.itemStyle}>Chez {item.organization}</Text>

                        <Text style={styles.itemStyle}>{item.duration}</Text>

                        <Text style={styles.itemStyle}>{item.description}</Text>

                        <Text style={styles.itemTitle}>Année -- {item.date}</Text>
                      </View>
                  )}
              />
            </SafeAreaView>
            <Button
                title="Communiquer"
                buttonStyle={styles.button}
                titleStyle={styles.buttonContent}
            />
          </SafeAreaView>
        </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    //flex: 1,
    //flexDirection: "column",
    backgroundColor: "white",
    //marginTop: Constants.statusBarHeight,
  },
  itemStyle: {
    marginLeft: 10,
    margin: 3,
    fontSize: 17,
    //width: "80%",
  },
  itemTitle: {
    marginLeft: 10,
    margin: 3,
    fontSize: 17,
    fontWeight: "bold",
  },
  row: {
    flexDirection: "row",
    width: "100%",
    borderTopWidth: 1,
  },
  rowContent: {
    flexDirection: "row",
    width: "100%",
  },
  row1: {
    flexDirection: "row",
    width: "100%",
  },
  content: {
    marginTop: 2,
    marginLeft: 4,
    fontWeight: "bold",
    fontSize: 17,
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
  contentView: {
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
  icon: {
    //flexDirection: "row",
    marginTop: 4,
    marginBottom: 2,
    fontWeight: "bold",
    alignItems: "flex-end",
    //marginLeft: "55%",
  },
  item: {
    marginLeft: 4,
    margin: 2,
    fontSize: 16,
    fontWeight: "bold",
    textDecorationLine: "underline",
    //fontStyle: "italic",
  },

  details: {
    //flexDirection: "row",
    marginTop: 2,
    marginLeft: 4,
    width: "93%",
    marginBottom: 2,
    fontWeight: "bold",
    alignItems: "flex-start",
  },
  studiesContent: {
    borderRadius: 1,
    elevation: 3,
    backgroundColor: "#254151",
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.4,
    shadowColor: "white",
    shadowRadius: 2,
    marginHorizontal: 4,
    marginVertical: 6,
  },

  infos: {
    marginLeft: 6,
    //fontWeight: "bold",
    //fontStyle: "italic",
    //fontFamily:"Century Gothic",
    fontSize: 19,
  },

  separator: {
    borderBottomWidth: 1,
  },
  button: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#254151",
    height: 50,
    width: 250,
    marginVertical:20,
    marginHorizontal:55
  },
  buttonContent: {
    color: "white",
    fontSize: 30,
  },
});

export default ProfilUserRecruiter;
