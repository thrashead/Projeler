using System.Collections.Generic;
using System.Web.Mvc;

namespace Repository.PicturesModel

{
    public interface IPictures
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

        bool? HasFile { get; set; }
        string OldPictureUrl { get; set; }
        string OldThumbUrl { get; set; }

        List<Pictures> List();
        IPictures Select(int id);
        bool Insert(IPictures resim);
        bool Update(IPictures resim);
        bool Delete(int id);
        bool Remove(int id);
    }
}
