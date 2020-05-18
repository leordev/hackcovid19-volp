import React from "react";
import { Marker, Callout } from "react-native-maps";
import { InstitutionPin } from "../interfaces";
import { Avatar, Card, Title, Paragraph } from "react-native-paper";

interface Props {
  institution: InstitutionPin;
  navigateToInstitution: () => void;
}

export default function InstitutionMark({
  institution: { latitude, longitude, name, address1, description, profile_picture },
  navigateToInstitution,
}: Props) {
  const coordinate = { latitude, longitude };
  const formattedDescription = description.split("\n\n")[0].substr(0, 128);
  const imageUri = { uri: profile_picture };

  return (
    <Marker coordinate={coordinate} pinColor="blue">
      <Callout onPress={navigateToInstitution} tooltip={true}>
        <Card style={{ width: 300 }}>
          <Card.Title
            title={name}
            subtitle={address1}
            left={() => <Avatar.Image size={48} source={imageUri} />}
          />
          <Card.Content>
            <Paragraph>{formattedDescription}</Paragraph>
          </Card.Content>
        </Card>
      </Callout>
    </Marker>
  );
}
