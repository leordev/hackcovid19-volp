import { HealthStatus } from "./interfaces";

export const getHealthStatusColor = (status: HealthStatus): string => {
  switch (status) {
    case HealthStatus.CovidConfirmed:
      return "red";
    case HealthStatus.FeelingBad:
      return "gold";
    case HealthStatus.Healthy:
      return "green";
    default:
      return "tan";
  }
};
