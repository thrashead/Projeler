using System;
using System.Collections.Generic;

namespace Repository.VisitorsModel
{
	public interface IVisitors
	{
		#region Model

		int ID { get; set; }
		string IPAddress { get; set; }
		string VisitTime { get; set; }

		string Mesaj { get; set; }

		#endregion

		#region Methods

		List<Visitors> List(int? id, int? top, bool relation);
		List<Visitors> ListAll(bool relation);
		IVisitors Select(int? id, bool relation);

		#endregion
	}
}
