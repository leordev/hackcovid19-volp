import React from "react";
import MapView, { Region } from "react-native-maps";
import { StyleSheet, View, Dimensions, Text } from "react-native";
import { Portal, FAB } from "react-native-paper";
import { StackNavigationProp } from "@react-navigation/stack";

import * as appConstants from "../helpers/constants";
import { getInstitutionPins } from "../institutions/api";
import { InstitutionPin } from "../institutions/interfaces";
import InstitutionMark from "../institutions/components/InstitutionMark";
import { RootStackParamlist } from "../navigationParams";
import { useIsFocused } from "@react-navigation/native";

// Initial Default Location: Tijuca, Rio de Janeiro, BR
export const INITIAL_REGION: Region = {
  latitude: -22.9315801,
  longitude: -43.2587466,
  latitudeDelta: 0.0922,
  longitudeDelta: 0.0421,
};

type MapScreenNavigationProp = StackNavigationProp<RootStackParamlist, "Map">;

interface Props {
  navigation: MapScreenNavigationProp;
}

export default function MapScreen({ navigation }: Props) {
  const isFocused = useIsFocused();

  const [region, _setRegion] = React.useState(INITIAL_REGION);
  const [institutions, setInstitutions] = React.useState([] as InstitutionPin[]);

  React.useEffect(() => {
    loadInstitutions();
  }, []);

  const loadInstitutions = async () => {
    const institutionsList = await getInstitutionPins([region.latitude, region.longitude]);
    setInstitutions(institutionsList);
  };

  const renderMarkers = () => {
    return institutions.map((item, index) => (
      <InstitutionMark
        key={index}
        institution={item}
        navigateToInstitution={() => {
          console.info("navigating to institution", item.id);
          navigation.navigate("Institution", { id: item.id });
        }}
      />
    ));
  };

  return (
    <React.Fragment>
      <View style={styles.container}>
        <MapView region={region} style={styles.mapStyle}>
          {renderMarkers()}
        </MapView>
      </View>
      <Portal>
        <FAB
          visible={isFocused}
          icon="call-made"
          style={{
            position: "absolute",
            bottom: 60,
            right: 20,
          }}
        />
      </Portal>
    </React.Fragment>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: appConstants.LIGHT_GRAY,
    opacity: 0.6,
  },
  mapStyle: {
    flex: 1,
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
    zIndex: 0,
  },
  containerInfo: {
    flexDirection: "column",
    paddingVertical: 10,
  },
  checkPeople: {
    flexDirection: "row",
    width: "60%",
    marginTop: 5,
    paddingLeft: 5,
  },
  pendingGreen: {
    backgroundColor: "green",
    height: 15,
    width: 15,
    borderRadius: 13,
  },
  pendingYellow: {
    backgroundColor: "yellow",
    height: 15,
    width: 15,
    borderRadius: 13,
  },
  pendingRed: {
    backgroundColor: "red",
    height: 15,
    width: 15,
    borderRadius: 13,
  },
});
