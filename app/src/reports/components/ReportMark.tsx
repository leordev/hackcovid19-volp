import React from "react";
import { Marker } from "react-native-maps";
import { Report, HealthStatus, getHealthStatusColor } from "..";

interface Props {
  report: Report;
}

export default function ReportMark({ report: { latitude, longitude, status } }: Props) {
  const coordinate = { latitude, longitude };
  const title = HealthStatus[status];
  const color = getHealthStatusColor(status);
  return <Marker coordinate={coordinate} title={title} pinColor={color} />;
}
