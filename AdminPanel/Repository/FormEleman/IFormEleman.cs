using Repository.FormElemanDegerModel;
using Repository.FormElemanOzellikModel;
using System.Collections.Generic;
using System.Web.Mvc;

namespace Repository.FormElemanModel
{
    public interface IFormEleman
    {
        int ID { get; set; }
        int PropTypeID { get; set; }
        int? GroupID { get; set; }
        string Title { get; set; }
        string Description { get; set; }
        string ErrorMessage { get; set; }
        string Code { get; set; }
        int? OrderNumber { get; set; }

        string Mesaj { get; set; }

        bool? HasValue { get; set; }

        List<SelectListItem> PropertyTypesList { get; set; }
        List<SelectListItem> PropertyGroupList { get; set; }

        string GroupAdi { get; set; }
        string TypeAdi { get; set; }

        List<FormElemanOzellik> PropertyAttributesList { get; set; }
        List<FormElemanDeger> PropertyValuesList { get; set; }

        List<FormEleman> List();
        IFormEleman Select(int id);
        bool Insert(IFormEleman formeleman);
        bool Update(IFormEleman formeleman);
        bool Delete(int id);
        bool Copy(int id);
    }
}
