using System.Collections.Generic;
using System.Web.Mvc;

namespace Repository.FormAttributesModel
{
    public interface IFormAttributes
    {
        int ID { get; set; }
        int FormItemID { get; set; }
        string Name { get; set; }
        string Value { get; set; }

        string Mesaj { get; set; }

        List<SelectListItem> FormItemsList { get; set; }
        string FormItemsAdi { get; set; }

        List<FormAttributes> List();
        IFormAttributes Select(int id);
        IFormAttributes Insert(int? propID, IFormAttributes formeleman);
        bool Insert(IFormAttributes formeleman);
        IFormAttributes Update(int id, IFormAttributes formeleman);
        bool Update(IFormAttributes formeleman);
        bool Delete(int id);
        bool Copy(int id);
    }
}
