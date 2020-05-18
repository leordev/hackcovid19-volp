import React from "react";
import { View, StyleSheet, Alert } from "react-native";
import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import {
  Button,
  Avatar,
  Title,
  Caption,
  Paragraph,
  Text,
  TouchableRipple,
  Switch,
  Subheading,
  Headline,
  ActivityIndicator,
  Divider,
} from "react-native-paper";
import { MarkdownView } from "react-native-markdown-view";

import { RootStackParamlist } from "../navigationParams";
import { Institution, Address } from "../institutions/interfaces";
import { getInstitution } from "../institutions/api";
import { ScrollView } from "react-native-gesture-handler";

type InstitutionScreenNavigationProp = StackNavigationProp<RootStackParamlist, "Institution">;
type InstitutionScreenRouteProp = RouteProp<RootStackParamlist, "Institution">;

interface Props {
  navigation: InstitutionScreenNavigationProp;
  route: InstitutionScreenRouteProp;
}

export default function InstitutionScreen({ route, navigation }: Props) {
  const [institution, setInstitution] = React.useState<Institution | undefined>(undefined);

  React.useEffect(() => {
    loadInstitution();
  }, [route.params.id]);

  const loadInstitution = async () => {
    const loadedInstitution = await getInstitution(route.params.id);
    console.info(loadedInstitution);
    setInstitution(loadedInstitution);
  };

  if (!institution) {
    return <ActivityIndicator />;
  }

  navigation.setOptions({ title: institution.name });

  const address = institution.addresses[0];

  return (
    <ScrollView style={styles.container}>
      <View style={{ flex: 1, alignItems: "center" }}>
        <Avatar.Image
          style={{ margin: "auto" }}
          size={140}
          source={{ uri: institution.profile_picture || require("../../assets/user.png") }}
        />
      </View>
      <View style={{ flex: 5, marginTop: 10 }}>
        <MarkdownView>{institution.description}</MarkdownView>

        <Title style={{ marginTop: 20 }}>Endereço</Title>
        <Paragraph>{address.address1}</Paragraph>
        <Paragraph>
          {address.address2} - {address.city}, {address.state} - {address.zip_code}
        </Paragraph>

        <Title style={{ marginTop: 20 }}>Informações para Doações</Title>
        <MarkdownView>{institution.bank_info}</MarkdownView>

        <Divider style={{ marginTop: 10, marginBottom: 10 }} />

        {institution.website_url ? (
          <Button
            icon="earth"
            style={{ width: "50%", alignSelf: "center", padding: 10 }}
            onPress={() => Alert.alert("todo: acessar website")}
          >
            Acessar Website
          </Button>
        ) : (
          ""
        )}
        {institution.phones.length ? (
          <Button
            icon="phone"
            color="red"
            mode="outlined"
            style={{
              width: "50%",
              alignSelf: "center",
              padding: 10,
              margin: 10,
              borderColor: "red",
            }}
            onPress={() => Alert.alert("todo: efetuar ligação")}
          >
            Fazer Ligação
          </Button>
        ) : (
          ""
        )}
        <Button
          mode="contained"
          style={{ width: "50%", alignSelf: "center", padding: 10, backgroundColor: "green" }}
          onPress={() => Alert.alert("abrir chat do whatsapp")}
        >
          Whatsapp
        </Button>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 8,
    backgroundColor: "#ffffff",
  },
});
