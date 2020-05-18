import { AsyncStorage } from "react-native";

const STORAGE_PREFIX = "@CoronaMaps";
const RISK_ANSWERS_KEY = `${STORAGE_PREFIX}:RiskAnswers`;

export interface RiskAnswers {
  isOlderThan60: boolean;
  hasHeartDisease: boolean;
  hasAsthma: boolean;
  hasDiabetes: boolean;
  isSmoker: boolean;
}

export const setRiskAnswers = async (riskAnswers: RiskAnswers) => {
  const jsonData = JSON.stringify(riskAnswers);
  await AsyncStorage.setItem(RISK_ANSWERS_KEY, jsonData);
};

export const getRiskAnswers = async (): Promise<RiskAnswers | undefined> => {
  const jsonData = await AsyncStorage.getItem(RISK_ANSWERS_KEY);
  if (!jsonData) return undefined;
  const riskAnswers = JSON.parse(jsonData);
  return riskAnswers;
};
