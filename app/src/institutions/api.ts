import Constants from "expo-constants";
import { Coordinate } from "react-native-maps";
import { InstitutionPin, Institution } from "./interfaces";

const { backendAddress } = Constants.manifest.extra.settings;
const INSTITUTION_API = `${backendAddress}/institution`;
const DEFAULT_RADIUS = 1.0; // TODO: revisit

export const getInstitutionPins = async (pos: Coordinate): Promise<InstitutionPin[]> => {
  const query = `latitude=${pos[0]}&longitude=${pos[1]}&radius=${DEFAULT_RADIUS}`;
  const institutionsQueryUrl = `${INSTITUTION_API}?${query}`;
  const response = await fetch(institutionsQueryUrl);
  const institutions = await response.json();
  return institutions;
};

export const getInstitution = async (id: number): Promise<Institution> => {
  const response = await fetch(`${INSTITUTION_API}/${id}`);
  const institution = await response.json();
  return institution;
};
