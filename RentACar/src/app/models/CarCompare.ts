export interface CarCompare {
    Main: CompareMain;
    Basic: CompareBasic;
    ExtInt: CompareExtInt;
    Mechanical: CompareMechanical;
    Features: CompareFeatures;
}

export interface CompareMain {
    Title: string;
    Url: string;
    PictureUrl: string;
}

export interface CompareBasic {
    Make: string;
    Model: string;
    Status: string;
    Year: number;
    Price: number;
    Width: number;
    Height: number;
    Length: number;
    WheelBase: number;
    CargoCapacity: number;
    Mileage: number;
}

export interface CompareExtInt {
    Body: string;
    Drive: string;
    Tires: string;
    Seats: number;
    Doors: number;
    ExtColor: string;
    IntColor: string;
    TrimStyle: string;
}

export interface CompareMechanical {
    Engine: string;
    EngineCapacity: number;
    Cylinders: number;
    Horsepower: number;
    Fuel: string;
    FuelCapacity: number;
    CityFuelEconomy: string;
    HighwayFuelEconomy: string;
    Gear: string;
    GearsNumber: number;
    Drivetrain: number;
}

export interface CompareFeatures {
    ABS: boolean;
    Airbag: boolean;
    AirConditioning: boolean;
    AlloyTires: boolean;
    AntiTheft: boolean;
    AudioRemoteControl: boolean;
    CDPlayer: boolean;
    CentralLocking: boolean;
    CooledSeats: boolean;
    EngineImmobiliser: boolean;
    FogLamps: boolean;
    FoldingSeats: boolean;
    GPS: boolean;
    HeatedDoorMirrors: boolean;
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
}
