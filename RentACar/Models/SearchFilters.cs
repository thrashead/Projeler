namespace Models
{
    public class SearchFilters
    {
        public int Top { get; set; }
        public string Order { get; set; }
        public string MakeCode { get; set; }
        public string ModelCode { get; set; }
        public int PriceMin { get; set; }
        public int PriceMax { get; set; }
        public string BodyTypeCode { get; set; }
        public string FuelTypeCode { get; set; }
        public string CarStatusCode { get; set; }
    }
}