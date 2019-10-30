using System;
using System.Collections.Generic;
using System.Linq;
using HumanResources;
using HumanResources.Data;
using TDLibrary;

namespace Repository.VisitorsModel
{
    public class Visitors : IVisitors
    {
        readonly HumanResourcesEntities entity = new HumanResourcesEntities();

        public int ID { get; set; }
        public string IPAddress { get; set; }
        public string VisitTime { get; set; }

        public string Mesaj { get; set; }


        public string VisitorCount()
        {
            int? sayac = entity.sp_VisitorCounterCheck(AppTools.GetIPAddress, DateTime.Now.ToShortDateString()).FirstOrDefault();

            return sayac.ToString();
        }

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
