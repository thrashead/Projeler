using System.Collections.Generic;
using System.Linq;
using RentACar.Data;
using TDLibrary;

namespace Repository.VisitorsModel
{
	public class Visitors : IVisitors
    {
        readonly RentACarEntities entity = new RentACarEntities();

        public int ID { get; set; }
		public string IPAddress { get; set; }
		public string VisitTime { get; set; }

        public string Mesaj { get; set; }


        public List<Visitors> List()
        {
            return entity.usp_VisitorsSelect(null).ToList().ChangeModelList<Visitors, usp_VisitorsSelect_Result>();
        }

        public bool Clear()
        {
            try
            {
                entity.usp_VisitorsClear();

                return true;
            }
            catch
            {
                return false;
            }
        }
    }
}
