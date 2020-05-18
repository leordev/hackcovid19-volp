import { ReportType } from "./enums";

export interface Report {
    device_id: string;
    type: ReportType;
    is_risky: boolean;
    latitude: number;
    longitude: number;
    created_at: Date;
}
