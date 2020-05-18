import { Region } from "react-native-maps";
import { generateRandomReports } from "./mocks/reportsMocks";

export const getReports = async (region: Region) => {
  if (false) {
    /// TODO call api
  } else {
    return generateRandomReports(region);
  }
};
