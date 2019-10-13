using System;
using System.Web;

namespace Models
{
    public class SearchFilters
    {
        public int? Top { get; set; }
        public string Order { get; set; }

        public string MakeUrl { get; set; }
        public string MakeCode { get; set; }
        public string ModelCode { get; set; }
        public string BodyTypeCode { get; set; }
        public string FuelTypeCode { get; set; }
        public string CarStatusCode { get; set; }

        public int? PriceMin { get; set; }
        public int? PriceMax { get; set; }
        public int? YearMin { get; set; }
        public int? YearMax { get; set; }

        public static SearchFilters Check(SearchFilters searchFilters)
        {
            searchFilters = CheckNull(searchFilters);

            HttpContext.Current.Session["SearchFilters"] = searchFilters;

            return searchFilters;
        }

        static SearchFilters CheckNull(SearchFilters searchFilters)
        {
            searchFilters = CheckAllAsNull(searchFilters);

            if (searchFilters.BodyTypeCode != null)
                return searchFilters;

            if (searchFilters.CarStatusCode != null)
                return searchFilters;

            if (searchFilters.FuelTypeCode != null)
                return searchFilters;

            if (searchFilters.MakeUrl != null)
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

            if (searchFilters.Top != null)
                return searchFilters;

            return null;
        }

        static SearchFilters CheckAllAsNull(SearchFilters searchFilters)
        {
            if (searchFilters.BodyTypeCode == "all")
                searchFilters.BodyTypeCode = null;

            if (searchFilters.CarStatusCode == "all")
                searchFilters.CarStatusCode = null;

            if (searchFilters.FuelTypeCode == "all")
                searchFilters.FuelTypeCode = null;

            if (searchFilters.MakeCode == "all")
                searchFilters.MakeCode = null;

            if (searchFilters.ModelCode == "all")
                searchFilters.ModelCode = null;

            return searchFilters;
        }
    }
}