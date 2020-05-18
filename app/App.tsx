import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { AppearanceProvider } from "react-native-appearance";
import { Provider as PaperProvider } from "react-native-paper";
import { NavigationContainer } from "@react-navigation/native";
import Main from "./src/Main";

export default function App() {
  return (
    <SafeAreaProvider>
      <AppearanceProvider>
        <PaperProvider>
          <NavigationContainer>
            <Main />
          </NavigationContainer>
        </PaperProvider>
      </AppearanceProvider>
    </SafeAreaProvider>
  );
}
