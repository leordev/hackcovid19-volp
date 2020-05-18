import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import MainScreen from "./screens/MapScreen";
import ProfileScreen from "./screens/ProfileScreen";
import InstitutionScreen from "./screens/InstitutionScreen";
import { RootStackParamlist } from "./navigationParams";

const RootStack = createStackNavigator<RootStackParamlist>();

export const RootNavigator = () => {
  return (
    <RootStack.Navigator initialRouteName="Map">
      <RootStack.Screen options={{ headerShown: false }} name="Map" component={MainScreen} />
      <RootStack.Screen name="Institution" component={InstitutionScreen} />
      <RootStack.Screen name="Profile" component={ProfileScreen} />
    </RootStack.Navigator>
  );
};

export default () => <RootNavigator />;
