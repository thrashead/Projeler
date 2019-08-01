using System.Collections.Generic;
using System.Web.Mvc;

namespace Repository.FormElemanOzellikModel
{
    public interface IFormElemanOzellik
    {
        int ID { get; set; }
        int PropID { get; set; }
        string Name { get; set; }
        string Value { get; set; }

        string Mesaj { get; set; }

        List<SelectListItem> PropertyList { get; set; }
        string PropertyAdi { get; set; }

        List<FormElemanOzellik> List();
        IFormElemanOzellik Select(int id);
        IFormElemanOzellik Insert(int? propID, IFormElemanOzellik formeleman);
        bool Insert(IFormElemanOzellik formeleman);
        IFormElemanOzellik Update(int id, IFormElemanOzellik formeleman);
        bool Update(IFormElemanOzellik formeleman);
        bool Delete(int id);
        bool Copy(int id);
    }
}
