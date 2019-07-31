using System.Collections.Generic;
using System.Web.Mvc;

namespace Repository.FormElemanDegerModel
{
    public interface IFormElemanDeger
    {
        int ID { get; set; }
        int PropID { get; set; }
        string Text { get; set; }
        string Value { get; set; }
        string Code { get; set; }

        string Mesaj { get; set; }

        List<SelectListItem> PropertyList { get; set; }
        string PropertyAdi { get; set; }

        List<FormElemanDeger> List();
        IFormElemanDeger Select(int id);
        bool Insert(IFormElemanDeger formeleman);
        bool Update(IFormElemanDeger formeleman);
        bool Delete(int id);
        bool Copy(int id);
    }
}
