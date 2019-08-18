using Repository.ProductTModel;
using System.Collections.Generic;
using System.Web.Mvc;

namespace Repository.ProductModel
{
    public interface IProduct
	{
		int ID { get; set; }
		string Title { get; set; }
		string Url { get; set; }
		string Code { get; set; }
		bool Active { get; set; }
        bool Deleted { get; set; }

        string Mesaj { get; set; }

        List<ProductT> ProductTList { get; set; }
		List<SelectListItem> TypesList { get; set; }

        List<Product> List();
        IProduct Select(int id);
        bool Insert(IProduct urun);
        IProduct Update(int id, IProduct urun);
        bool Update(IProduct urun);
        bool Delete(int id);
        bool Remove(int id);
        bool Copy(int id);
    }
}
