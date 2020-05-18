import React, { useState } from "react";
import { View, Text, StyleSheet, Switch } from "react-native";
import * as appConstants from "../helpers/constants";

interface Props {
  title: string;
  isActive: boolean;
  onToggle: () => void;
}

export default function ToggleCard({title, onToggle, isActive}: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.p}>{title}</Text>

      <Switch
        thumbColor={appConstants.LIGHT_GRAY}
        trackColor={{
          false: appConstants.GRAY,
          true: appConstants.FB_ORANGE,
        }}
        onValueChange={onToggle}
        ios_backgroundColor={appConstants.GRAY}
        value={isActive}
        style={styles.switchToggle}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    backgroundColor:appConstants.LIGHT_GRAY,
    borderColor: appConstants.LIGHT_GRAY,
    borderWidth: 1,
    marginTop: 10,
    marginBottom:10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 1.20,
    shadowRadius: 4.32,
    elevation: 4,
    borderRadius:10,
    justifyContent: "center",

  },
  switchToggle: {
    marginTop: 15,
    marginBottom: 15,
    marginLeft: "auto",
    marginRight: "auto",
    textAlign: "center",
    transform: [{ scaleX: 1.2 }, { scaleY: 1.2 }],
  },
  p: {
    padding: 10,
    marginTop: 20,
    color: appConstants.BLUE,
    fontSize: 20,
    fontWeight: "700",
    textAlign: "center",
  },
});
