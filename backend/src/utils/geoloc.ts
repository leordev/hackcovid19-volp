export const DEFAULT_NEARBY_RADIUS_FOR_NOTIFICATIONS = 0.1; /// TODO: revisit

export interface Coordinate {
    latitude: number;
    longitude: number;
}

export interface RegionQueryParams {
    latitude: string;
    longitude: string;
    radius: string;
}

export const calculateRegionFromQueryParams = (queryParams: RegionQueryParams) => {
    const latitude = parseFloat(queryParams.latitude);
    const longitude = parseFloat(queryParams.longitude);
    const radius = parseFloat(queryParams.radius);
    return calculateRegion(latitude, longitude, radius);
};

export const calculateRegion = (latitude: number, longitude: number, radius: number) => {
    const start = {
        longitude: longitude - radius,
        latitude: latitude - radius,
    };

    const end = {
        longitude: longitude + radius,
        latitude: latitude + radius,
    };

    return { start, end };
};
