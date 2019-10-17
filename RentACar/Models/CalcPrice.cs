using RentACar;

namespace Models
{
    public class CalcPrice
    {
        public int Time { get; set; }
        public int TimeType { get; set; }
        public int Price { get; set; }

        public static string Calculate(CalcPrice calcPrice)
        {
            string result;

            switch (calcPrice.TimeType)
            {
                case 1:
                    result = (calcPrice.Time * calcPrice.Price).ToString() + " TL";
                    break;
                case 2:
                    result = ((calcPrice.Time * calcPrice.Price * 7) * ((100 - AppTools.WeekDiscount) / 100)).ToString() + " TL";
                    break;
                case 3:
                    result = ((calcPrice.Time * calcPrice.Price * 30) * ((100 - AppTools.MonthDiscount) / 100)).ToString() + " TL";
                    break;
                case 4:
                    result = ((calcPrice.Time * calcPrice.Price * 365) * ((100 - AppTools.YearDiscount) / 100)).ToString() + " TL";
                    break;
                default:
                    result = (calcPrice.Time * calcPrice.Price).ToString() + " TL";
                    break;
            }

            return result;
        }
    }
}