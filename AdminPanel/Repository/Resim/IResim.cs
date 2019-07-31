using System.Collections.Generic;
using System.Web.Mvc;

namespace Repository.ResimModel
{
    public interface IResim
	{
		 int ID { get; set; }
		 string Title { get; set; }
		 string Description { get; set; }
		 string PictureUrl { get; set; }
		 string ThumbUrl { get; set; }
		 string Code { get; set; }
		 bool Active { get; set; }
         bool Deleted { get; set; }

         string Mesaj { get; set; }

         List<SelectListItem> TypesList { get; set; }

        List<Resim> List();
        IResim Select(int id);
        bool Insert(IResim resim);
        bool Update(IResim resim);
        bool Delete(int id);
        bool Remove(int id);
    }
}
