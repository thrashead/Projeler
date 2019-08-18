using System.Collections.Generic;

namespace Repository.VisitorsModel
{
    public interface IVisitors
    {
		int ID { get; set; }
		string IPAddress { get; set; }
		string VisitTime { get; set; }

        string Mesaj { get; set; }

        List<Visitors> List();
        bool Clear();
    }
}
