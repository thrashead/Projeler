using Repository.UrunDilModel;
using System.Collections.Generic;
using System.Web.Mvc;

namespace Repository.UrunModel
{
    public interface IUrun
	{
		int ID { get; set; }
		string Title { get; set; }
		string Url { get; set; }
		string Code { get; set; }
		bool Active { get; set; }
        bool Deleted { get; set; }

        string Mesaj { get; set; }

        List<UrunDil> ProductTList { get; set; }
		List<SelectListItem> TypesList { get; set; }

        List<Urun> List();
        IUrun Select(int id);
        bool Insert(IUrun urun);
        IUrun Update(int id, IUrun urun);
        bool Update(IUrun urun);
        bool Delete(int id);
        bool Remove(int id);
        bool Copy(int id);
    }
}
