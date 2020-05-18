export enum HealthStatus {
  Healthy = 1,
  FeelingBad = 2,
  CovidConfirmed = 3,
}

export interface Report {
  id: number;
  status: HealthStatus;
  latitude: number;
  longitude: number;
  timestamp: number;
}
