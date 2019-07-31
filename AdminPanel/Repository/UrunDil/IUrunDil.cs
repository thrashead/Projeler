using System.Collections.Generic;
using System.Web.Mvc;

namespace Repository.UrunDilModel
{
    public interface IUrunDil
    {
		int ID { get; set; }
		int ProdID { get; set; }
		int TransID { get; set; }
		string ProductName { get; set; }
		string ShortText1 { get; set; }
		string ShortText2 { get; set; }
		string Description { get; set; }
        bool Deleted { get; set; }

        string Mesaj { get; set; }

        List<SelectListItem> TranslationList { get; set; }
		List<SelectListItem> ProductList { get; set; }

        string ProductAdi { get; set; }
        string TranslationAdi { get; set; }

        List<UrunDil> List();
        IUrunDil Select(int id);
        bool Insert(IUrunDil urun);
        bool Update(IUrunDil urun);
        bool Delete(int id);
        bool Remove(int id);
    }
}
