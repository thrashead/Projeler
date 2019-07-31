using System.Collections.Generic;
using System.Linq;
using AdminPanel.Data;
using TDLibrary;

namespace Repository.ZiyaretciModel
{
	public class Ziyaretci : IZiyaretci
    {
        readonly AdminPanelEntities entity = new AdminPanelEntities();

        public int ID { get; set; }
		public string IPAddress { get; set; }
		public string VisitTime { get; set; }

        public string Mesaj { get; set; }


        public List<Ziyaretci> List()
        {
            return entity.usp_VisitorCounterSelect(null).ToList().ChangeModelList<Ziyaretci, usp_VisitorCounterSelect_Result>();
        }

        public bool Clear()
        {
            try
            {
                entity.usp_VisitorCounterClear();

                return true;
            }
            catch
            {
                return false;
            }
        }
    }
}
