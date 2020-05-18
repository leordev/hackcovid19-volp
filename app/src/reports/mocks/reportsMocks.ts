import { Report, HealthStatus } from "../interfaces";
import { Region } from "react-native-maps";

export const generateRandomReports = (region: Region): Report[] => {
    const reports: Report[] = [];
    for (let i = 0; i < 30; i++) {
        const randomReport = {
            id: i,
            status: getRandomStatus(),
            timestamp: getLastRandom15Days(),
            ...getRandomLocation(region.latitude, region.longitude),
        };
        reports.push(randomReport)
    }
    return reports;
}


const getLastRandom15Days = () => Date.now() - Math.random() * (15 * 24 * 60 * 60 * 1000);

const getRandomStatus = (): HealthStatus => {
    const value = Math.floor(Math.random() * 3) + 1;
    return value as HealthStatus;
};

const getRandomLocation = (originLatitude: number, originLongitude: number) => {
    const latitude = originLatitude - 0.05 + Math.random() * 0.1;
    const longitude = originLongitude - 0.05 + Math.random() * 0.1;
    return { latitude, longitude }
};
