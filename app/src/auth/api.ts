import Constants from "expo-constants";

const { backendAddress } = Constants.manifest.extra.settings;

export const getBackendInfo = async () => {
  const info = await fetch(backendAddress);
  const data = await info.json();
  console.info("backend info data is ", data);
};
