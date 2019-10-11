using System;
using System.Web;

namespace Models
{
    public class SearchFilters
    {
        public int? Top { get; set; }
        public string Order { get; set; }

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

            if (searchFilters != null)
            {
                if (HttpContext.Current.Session["SearchFilters"] != null)
                {
                    SearchFilters sessionFilters = HttpContext.Current.Session["SearchFilters"] as SearchFilters;

                    FillFilters(searchFilters, sessionFilters);
                }
            }

            HttpContext.Current.Session["SearchFilters"] = searchFilters;

            return searchFilters;
        }

        static void FillFilters(SearchFilters searchFilters, SearchFilters sessionFilters)
        {
            if (sessionFilters.BodyTypeCode != null && searchFilters.BodyTypeCode == null)
                searchFilters.BodyTypeCode = sessionFilters.BodyTypeCode;

            if (sessionFilters.CarStatusCode != null && searchFilters.CarStatusCode == null)
                searchFilters.CarStatusCode = sessionFilters.CarStatusCode;

            if (sessionFilters.FuelTypeCode != null && searchFilters.FuelTypeCode == null)
                searchFilters.FuelTypeCode = sessionFilters.FuelTypeCode;

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

            if (sessionFilters.Top != null && searchFilters.Top == null)
                searchFilters.Top = sessionFilters.Top;
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