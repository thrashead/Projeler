using System.Web;

namespace Models
{
    public class BookSearchFilters : SearchFilters
    {
        public string DriveTypeCode { get; set; }
        public string GearTypeCode { get; set; }
        public string EngineTypeCode { get; set; }
        public int? EngineCapacity { get; set; }
        public string StartDate { get; set; }
        public string EndDate { get; set; }
        public int? GearCount { get; set; }
        public int? Cylinders { get; set; }
        public int? Mileage { get; set; }
        public int? Seats { get; set; }
        public int? Doors { get; set; }
        public string ExteriorColor { get; set; }
        public string InteriorColor { get; set; }

        public bool? ABS { get; set; }
        public bool? Airbag { get; set; }
        public bool? AirConditioning { get; set; }
        public bool? AlloyTires { get; set; }
        public bool? AntiTheft { get; set; }
        public bool? CDPlayer { get; set; }
        public bool? CentralLocking { get; set; }
        public bool? CooledSeats { get; set; }
        public bool? FogLamps { get; set; }
        public bool? FoldingSeats { get; set; }
        public bool? GPS { get; set; }
        public bool? HeatedSeats { get; set; }
        public bool? HeadlightCovers { get; set; }
        public bool? KeylessEntry { get; set; }
        public bool? LeatherSeats { get; set; }
        public bool? LeatherTrim { get; set; }
        public bool? LPG { get; set; }
        public bool? PassengerAirbag { get; set; }
        public bool? PowerGlass { get; set; }
        public bool? PowerMirrors { get; set; }
        public bool? PowerSeats { get; set; }
        public bool? PowerSteering { get; set; }
        public bool? PowerWindows { get; set; }
        public bool? RemoteStart { get; set; }
        public bool? SecuritySystem { get; set; }
        public bool? SideAirbag { get; set; }
        public bool? Spoiler { get; set; }
        public bool? TintedWindows { get; set; }
        public bool? TowBar { get; set; }
        public bool? TripComputer { get; set; }
        public bool? Warrenty { get; set; }
        public bool? AudioRemoteControl { get; set; }
        public bool? EngineImmobiliser { get; set; }
        public bool? HeatedDoorMirrors { get; set; }


        public static BookSearchFilters Check(BookSearchFilters searchFilters)
        {
            searchFilters = CheckNull(searchFilters);

            HttpContext.Current.Session["BookSearchFilters"] = searchFilters;

            return searchFilters;
        }
        static BookSearchFilters CheckNull(BookSearchFilters searchFilters)
        {
            searchFilters = CheckAllAsNull(searchFilters);
            searchFilters = CheckFalseAsNull(searchFilters);

            if (searchFilters.BodyTypeCode != null)
                return searchFilters;

            if (searchFilters.CarStatusCode != null)
                return searchFilters;

            if (searchFilters.FuelTypeCode != null)
                return searchFilters;

            if (searchFilters.MakeCode != null)
                return searchFilters;

            if (searchFilters.ModelCode != null)
                return searchFilters;

            if (searchFilters.Order != null)
                return searchFilters;

            if (searchFilters.PriceMin != null)
                return searchFilters;

            if (searchFilters.PriceMax != null)
                return searchFilters;

            if (searchFilters.YearMin != null)
                return searchFilters;

            if (searchFilters.YearMax != null)
                return searchFilters;

            if (searchFilters.DriveTypeCode != null)
                return searchFilters;

            if (searchFilters.GearTypeCode != null)
                return searchFilters;

            if (searchFilters.EngineTypeCode != null)
                return searchFilters;

            if (searchFilters.EngineCapacity != null)
                return searchFilters;

            if (searchFilters.StartDate != null)
                return searchFilters;

            if (searchFilters.EndDate != null)
                return searchFilters;

            if (searchFilters.GearCount != null)
                return searchFilters;

            if (searchFilters.Cylinders != null)
                return searchFilters;

            if (searchFilters.Mileage != null)
                return searchFilters;

            if (searchFilters.Seats != null)
                return searchFilters;

            if (searchFilters.Doors != null)
                return searchFilters;

            if (searchFilters.ExteriorColor != null)
                return searchFilters;

            if (searchFilters.InteriorColor != null)
                return searchFilters;

            return null;
        }

        static BookSearchFilters CheckAllAsNull(BookSearchFilters searchFilters)
        {
            if (searchFilters.BodyTypeCode == "all")
                searchFilters.BodyTypeCode = null;

            if (searchFilters.CarStatusCode == "all")
                searchFilters.CarStatusCode = null;

            if (searchFilters.FuelTypeCode == "all")
                searchFilters.FuelTypeCode = null;

            if (searchFilters.DriveTypeCode == "all")
                searchFilters.DriveTypeCode = null;

            if (searchFilters.GearTypeCode == "all")
                searchFilters.GearTypeCode = null;

            if (searchFilters.EngineTypeCode == "all")
                searchFilters.EngineTypeCode = null;

            if (searchFilters.MakeCode == "all")
                searchFilters.MakeCode = null;

            if (searchFilters.ModelCode == "all")
                searchFilters.ModelCode = null;

            if (searchFilters.ExteriorColor == "all")
                searchFilters.ExteriorColor = null;

            if (searchFilters.InteriorColor == "all")
                searchFilters.InteriorColor = null;

            return searchFilters;
        }

        static BookSearchFilters CheckFalseAsNull(BookSearchFilters searchFilters)
        {
            if (searchFilters.ABS == false)
                searchFilters.ABS = null;

            if (searchFilters.Airbag == false)
                searchFilters.Airbag = null;

            if (searchFilters.AirConditioning == false)
                searchFilters.AirConditioning = null;

            if (searchFilters.AlloyTires == false)
                searchFilters.AlloyTires = null;

            if (searchFilters.AntiTheft == false)
                searchFilters.AntiTheft = null;

            if (searchFilters.CDPlayer == false)
                searchFilters.CDPlayer = null;

            if (searchFilters.CentralLocking == false)
                searchFilters.CentralLocking = null;

            if (searchFilters.CooledSeats == false)
                searchFilters.CooledSeats = null;

            if (searchFilters.FogLamps == false)
                searchFilters.FogLamps = null;

            if (searchFilters.FoldingSeats == false)
                searchFilters.FoldingSeats = null;

            if (searchFilters.GPS == false)
                searchFilters.GPS = null;

            if (searchFilters.HeatedSeats == false)
                searchFilters.HeatedSeats = null;

            if (searchFilters.HeadlightCovers == false)
                searchFilters.HeadlightCovers = null;

            if (searchFilters.KeylessEntry == false)
                searchFilters.KeylessEntry = null;

            if (searchFilters.LeatherSeats == false)
                searchFilters.LeatherSeats = null;

            if (searchFilters.LeatherTrim == false)
                searchFilters.LeatherTrim = null;

            if (searchFilters.LPG == false)
                searchFilters.LPG = null;

            if (searchFilters.PassengerAirbag == false)
                searchFilters.PassengerAirbag = null;

            if (searchFilters.PowerGlass == false)
                searchFilters.PowerGlass = null;

            if (searchFilters.PowerMirrors == false)
                searchFilters.PowerMirrors = null;

            if (searchFilters.PowerSeats == false)
                searchFilters.PowerSeats = null;

            if (searchFilters.PowerSteering == false)
                searchFilters.PowerSteering = null;

            if (searchFilters.PowerWindows == false)
                searchFilters.PowerWindows = null;

            if (searchFilters.RemoteStart == false)
                searchFilters.RemoteStart = null;

            if (searchFilters.SecuritySystem == false)
                searchFilters.SecuritySystem = null;

            if (searchFilters.SideAirbag == false)
                searchFilters.SideAirbag = null;

            if (searchFilters.Spoiler == false)
                searchFilters.Spoiler = null;

            if (searchFilters.TintedWindows == false)
                searchFilters.TintedWindows = null;

            if (searchFilters.TowBar == false)
                searchFilters.TowBar = null;

            if (searchFilters.TripComputer == false)
                searchFilters.TripComputer = null;

            if (searchFilters.Warrenty == false)
                searchFilters.Warrenty = null;

            if (searchFilters.AudioRemoteControl == false)
                searchFilters.AudioRemoteControl = null;

            if (searchFilters.EngineImmobiliser == false)
                searchFilters.EngineImmobiliser = null;

            if (searchFilters.HeatedDoorMirrors == false)
                searchFilters.HeatedDoorMirrors = null;

            return searchFilters;
        }
    }
}