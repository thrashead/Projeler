using System;
using System.Collections.Generic;
using System.Web;
using System.Linq;
using HumanResources.Data;
using TDLibrary;

namespace Repository.VisitorsModel
{
	public class Visitors : IVisitors
	{
		readonly HumanResourcesEntities entity = new HumanResourcesEntities();

		#region Model

		public int ID { get; set; }
		public string IPAddress { get; set; }
		public string VisitTime { get; set; }

		public string Mesaj { get; set; }

		#endregion

		#region Methods

		public List<Visitors> List(int? id = null, int? top = null, bool relation = true)
		{
			List<Visitors> table;

			List<usp_VisitorsSelect_Result> tableTemp;
			List<usp_VisitorsSelectTop_Result> tableTopTemp;

			if (top == null)
			{
				tableTemp = entity.usp_VisitorsSelect(id).ToList();
				table = tableTemp.ChangeModelList<Visitors, usp_VisitorsSelect_Result>();
			}
			else
			{
				tableTopTemp = entity.usp_VisitorsSelectTop(id, top).ToList();
				table = tableTopTemp.ChangeModelList<Visitors, usp_VisitorsSelectTop_Result>();
			}

			return table;
		}

		public List<Visitors> ListAll(bool relation = true)
		{
			List<Visitors> table;

			List<usp_VisitorsSelectAll_Result> tableTemp;

			tableTemp = entity.usp_VisitorsSelectAll().ToList();
			table = tableTemp.ChangeModelList<Visitors, usp_VisitorsSelectAll_Result>();

			return table;
		}

		public IVisitors Select(int? id, bool relation = true)
		{
			usp_VisitorsSelectTop_Result tableTemp = entity.usp_VisitorsSelectTop(id, 1).FirstOrDefault();
			Visitors table = tableTemp.ChangeModel<Visitors>();

			return table;
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

		#endregion

		#region User Defined

		public string VisitorCount(string ipAddress)
		{
			int? count = entity.sp_VisitorCount(ipAddress, DateTime.Now.ToShortDateString()).FirstOrDefault();

			return count.ToString();
		}

		#endregion
	}
}
