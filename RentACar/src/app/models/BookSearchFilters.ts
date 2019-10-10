export interface BookSearchFilters {
    MakeCode: string;
    ModelCode: string;
    PriceMin: number;
    PriceMax: number;
    YearMin: number;
    YearMax: number;
    BodyTypeCode: string;
    FuelTypeCode: string;
    CarStatusCode: string;
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
}
