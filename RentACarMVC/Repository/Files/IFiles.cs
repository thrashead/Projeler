using System.Collections.Generic;
using System.Web.Mvc;

namespace Repository.FilesModel
{
    public interface IFiles
    {
        int ID { get; set; }
        string Title { get; set; }
        string Description { get; set; }
        string FileUrl { get; set; }
        string Code { get; set; }
        bool Active { get; set; }
        bool Deleted { get; set; }

        string Mesaj { get; set; }

        List<SelectListItem> TypesList { get; set; }

        List<Files> List();
        IFiles Select(int id);
        bool Insert(IFiles dosya);
        bool Update(IFiles dosya);
        bool Delete(int id);
        bool Remove(int id);
    }
}
