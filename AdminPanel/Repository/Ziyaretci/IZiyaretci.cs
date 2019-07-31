using System.Collections.Generic;

namespace Repository.ZiyaretciModel
{
    public interface IZiyaretci
    {
		int ID { get; set; }
		string IPAddress { get; set; }
		string VisitTime { get; set; }

        string Mesaj { get; set; }

        List<Ziyaretci> List();
        bool Clear();
    }
}
