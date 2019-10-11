export interface BookSearchFilters {

    MakeCode: string;
    ModelCode: string;
    BodyTypeCode: string;
    FuelTypeCode: string;
    CarStatusCode: string;
    PriceMin: number;
    PriceMax: number;
    YearMin: number;
    YearMax: number;

    DriveTypeCode: string;
    GearTypeCode: string;
    EngineTypeCode: string;
    EngineCapacity: number;
    StartDate: string;
    EndDate: string;
    GearCount: number;
    Cylinders: number;
    Mileage: number;
    Seats: number;
    Doors: number;
    ExteriorColor: string;
    InteriorColor: string;

    FromFeaturesPage: boolean;

    ABS: boolean;
    Airbag: boolean;
    AirConditioning: boolean;
    AlloyTires: boolean;
    AntiTheft: boolean;
    CDPlayer: boolean;
    CentralLocking: boolean;
    CooledSeats: boolean;
    FogLamps: boolean;
    FoldingSeats: boolean;
    GPS: boolean;
    HeatedSeats: boolean;
    HeadlightCovers: boolean;
    KeylessEntry: boolean;
    LeatherSeats: boolean;
    LeatherTrim: boolean;
    LPG: boolean;
    PassengerAirbag: boolean;
    PowerGlass: boolean;
    PowerMirrors: boolean;
    PowerSeats: boolean;
    PowerSteering: boolean;
    PowerWindows: boolean;
    RemoteStart: boolean;
    SecuritySystem: boolean;
    SideAirbag: boolean;
    Spoiler: boolean;
    TintedWindows: boolean;
    TowBar: boolean;
    TripComputer: boolean;
    Warrenty: boolean;
    AudioRemoteControl: boolean;
    EngineImmobiliser: boolean;
    HeatedDoorMirrors: boolean;
}
