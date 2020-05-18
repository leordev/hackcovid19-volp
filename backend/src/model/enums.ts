export enum HealthStatus {
    Healthy = 1,
    FeelingBad = 2,
    CovidConfirmed = 3,
}

export enum EntityType {
    User = 1,
    Institution = 2,
}

export enum HelpStatus {
    Pending = 1,
    Accepted = 2,
    InProgress = 3,
    Completed = 4,
    Canceled = 5,
}

export enum ReportType {
    // COVID19
    Agglomeration = 1,
    BusyHealthStation = 2,
    HealthStationWithoutTests = 3,
    HealthStationWithoutSupply = 4,
    NoSupply = 5,

    // HURRICANE REPORTS
    // ...

    // EARTHQUAKE REPORTS
    // ...
}
