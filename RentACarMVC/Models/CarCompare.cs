using RentACarMVC.Data;
using System.Linq;
using RentACarMVC;

namespace Models
{
    public class CarCompare
    {
        public CarCompare()
        {
            Main = new sp_CarCompareMainByUrl_Result();
            Basic = new sp_CarCompareDetailBasicByUrl_Result();
            ExtInt = new sp_CarCompareDetailExtIntByUrl_Result();
            Mechanical = new sp_CarCompareDetailMechanicalByUrl_Result();
            Features = new sp_CarCompareDetailFeaturesByUrl_Result();
        }

        public sp_CarCompareMainByUrl_Result Main { get; set; }
        public sp_CarCompareDetailBasicByUrl_Result Basic { get; set; }
        public sp_CarCompareDetailExtIntByUrl_Result ExtInt { get; set; }
        public sp_CarCompareDetailMechanicalByUrl_Result Mechanical { get; set; }
        public sp_CarCompareDetailFeaturesByUrl_Result Features { get; set; }

        public static CarCompare CarCompareByUrl(string url = null)
        {
            RentACarEntities entity = new RentACarEntities();
            CarCompare car = new CarCompare();

            car.Main = entity.sp_CarCompareMainByUrl(url).FirstOrDefault();
            car.Basic = entity.sp_CarCompareDetailBasicByUrl(url, AppTools.GetLang.ID).FirstOrDefault();
            car.ExtInt = entity.sp_CarCompareDetailExtIntByUrl(url, AppTools.GetLang.ID).FirstOrDefault();
            car.Mechanical = entity.sp_CarCompareDetailMechanicalByUrl(url, AppTools.GetLang.ID).FirstOrDefault();
            car.Features = entity.sp_CarCompareDetailFeaturesByUrl(url).FirstOrDefault();

            return car;
        }
    }
}