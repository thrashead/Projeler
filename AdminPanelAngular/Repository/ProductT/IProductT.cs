using System.Collections.Generic;
using System.Web.Mvc;

namespace Repository.ProductTModel
{
    public interface IProductT
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

        List<ProductT> List();
        IProductT Select(int id);
        IProductT Insert(int? prodID, int? transID, IProductT urun);
        bool Insert(IProductT urun);
        IProductT Update(int id, IProductT urun);
        bool Update(IProductT urun);
        bool Delete(int id);
        bool Remove(int id);
    }
}
