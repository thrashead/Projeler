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

        public static BookSearchFilters Check(BookSearchFilters searchFilters)
        {
            searchFilters = CheckNull(searchFilters);

            if (searchFilters != null)
            {
                if (HttpContext.Current.Session["BookSearchFilters"] != null)
                {
                    BookSearchFilters sessionFilters = HttpContext.Current.Session["BookSearchFilters"] as BookSearchFilters;

                    FillFilters(searchFilters, sessionFilters);
                }
            }

            HttpContext.Current.Session["BookSearchFilters"] = searchFilters;

            return searchFilters;
        }

        static void FillFilters(BookSearchFilters searchFilters, BookSearchFilters sessionFilters)
        {
            if (sessionFilters.BodyTypeCode != null && searchFilters.BodyTypeCode == null)
                searchFilters.BodyTypeCode = sessionFilters.BodyTypeCode;

            if (sessionFilters.CarStatusCode != null && searchFilters.CarStatusCode == null)
                searchFilters.CarStatusCode = sessionFilters.CarStatusCode;

            if (sessionFilters.FuelTypeCode != null && searchFilters.FuelTypeCode == null)
                searchFilters.FuelTypeCode = sessionFilters.FuelTypeCode;

            if (sessionFilters.DriveTypeCode != null && searchFilters.DriveTypeCode == null)
                searchFilters.DriveTypeCode = sessionFilters.DriveTypeCode;

            if (sessionFilters.GearTypeCode != null && searchFilters.GearTypeCode == null)
                searchFilters.GearTypeCode = sessionFilters.GearTypeCode;

            if (sessionFilters.EngineTypeCode != null && searchFilters.EngineTypeCode == null)
                searchFilters.EngineTypeCode = sessionFilters.EngineTypeCode;

            if (sessionFilters.MakeCode != null && searchFilters.MakeCode == null)
                searchFilters.MakeCode = sessionFilters.MakeCode;

            if (sessionFilters.ModelCode != null && searchFilters.ModelCode == null)
                searchFilters.ModelCode = sessionFilters.ModelCode;

            if (sessionFilters.Order != null && searchFilters.Order == null)
                searchFilters.Order = sessionFilters.Order;

            if (sessionFilters.PriceMax != null && searchFilters.PriceMax == null)
                searchFilters.PriceMax = sessionFilters.PriceMax;

            if (sessionFilters.PriceMin != null && searchFilters.PriceMin == null)
                searchFilters.PriceMin = sessionFilters.PriceMin;

            if (sessionFilters.YearMin != null && searchFilters.YearMin == null)
                searchFilters.YearMin = sessionFilters.YearMin;

            if (sessionFilters.YearMax != null && searchFilters.YearMax == null)
                searchFilters.YearMax = sessionFilters.YearMax;

            if (sessionFilters.DriveTypeCode != null && searchFilters.DriveTypeCode == null)
                searchFilters.DriveTypeCode = sessionFilters.DriveTypeCode;

            if (sessionFilters.GearTypeCode != null && searchFilters.GearTypeCode == null)
                searchFilters.GearTypeCode = sessionFilters.GearTypeCode;

            if (sessionFilters.EngineTypeCode != null && searchFilters.EngineTypeCode == null)
                searchFilters.EngineTypeCode = sessionFilters.EngineTypeCode;

            if (sessionFilters.EngineCapacity != null && searchFilters.EngineCapacity == null)
                searchFilters.EngineCapacity = sessionFilters.EngineCapacity;

            if (sessionFilters.StartDate != null && searchFilters.StartDate == null)
                searchFilters.StartDate = sessionFilters.StartDate;

            if (sessionFilters.EndDate != null && searchFilters.EndDate == null)
                searchFilters.EndDate = sessionFilters.EndDate;

            if (sessionFilters.GearCount != null && searchFilters.GearCount == null)
                searchFilters.GearCount = sessionFilters.GearCount;

            if (sessionFilters.Cylinders != null && searchFilters.Cylinders == null)
                searchFilters.Cylinders = sessionFilters.Cylinders;

            if (sessionFilters.Mileage != null && searchFilters.Mileage == null)
                searchFilters.Mileage = sessionFilters.Mileage;

            if (sessionFilters.Seats != null && searchFilters.Seats == null)
                searchFilters.Seats = sessionFilters.Seats;

            if (sessionFilters.Doors != null && searchFilters.Doors == null)
                searchFilters.Doors = sessionFilters.Doors;

            if (sessionFilters.ExteriorColor != null && searchFilters.ExteriorColor == null)
                searchFilters.ExteriorColor = sessionFilters.ExteriorColor;

            if (sessionFilters.InteriorColor != null && searchFilters.InteriorColor == null)
                searchFilters.InteriorColor = sessionFilters.InteriorColor;
        }

        static BookSearchFilters CheckNull(BookSearchFilters searchFilters)
        {
            searchFilters = CheckNullAsAll(searchFilters);

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

        static BookSearchFilters CheckNullAsAll(BookSearchFilters searchFilters)
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
    }
}