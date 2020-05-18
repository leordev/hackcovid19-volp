import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import { Button } from "react-native-paper";
import * as appConstants from "../helpers/constants";

export default function ProfileScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.header}></View>
      <Image style={styles.avatar} source={require("../../assets/user.png")} />
      <Button icon="camera">Press me</Button>

      <View style={styles.body}>
        <View style={styles.bodyContent}>
          <Text style={styles.nameText}>Philipe</Text>
          <Text style={styles.info}>30 anos</Text>
          <Text style={styles.description}> Sou uma paciente de risco</Text>

          <Button>Press me</Button>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: appConstants.LIGHT_GRAY,
  },
  header: {
    backgroundColor: appConstants.DARK_ORANGE,
    height: 200,
  },
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 63,
    borderWidth: 4,
    borderColor: "white",
    marginBottom: 10,
    alignSelf: "center",
    position: "absolute",
    marginTop: 130,
  },
  name: {
    fontSize: 22,
    color: "#FFFFFF",
    fontWeight: "600",
  },
  body: {
    marginTop: 40,
  },
  bodyContent: {
    flex: 1,
    alignItems: "center",
    padding: 30,
  },
  nameText: {
    fontSize: 28,
    color: appConstants.BLACK,
    fontWeight: "600",
  },
  info: {
    fontSize: 16,
    color: "#00BFFF",
    marginTop: 10,
  },
  description: {
    fontSize: 16,
    color: appConstants.BLACK,
    marginTop: 10,
    textAlign: "center",
  },
  buttonContainer: {
    marginTop: 20,
    height: 45,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    width: 250,
    borderRadius: 30,
    backgroundColor: appConstants.DARK_ORANGE,
  },
  textButton: {
    color: appConstants.WHITE,
  },
});
