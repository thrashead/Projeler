using System.Collections.Generic;
using System.Web.Mvc;

namespace Repository.FormValuesModel
{
    public interface IFormValues
    {
        int ID { get; set; }
        int FormItemID { get; set; }
        string Text { get; set; }
        string Value { get; set; }
        string Code { get; set; }

        string Mesaj { get; set; }

        List<SelectListItem> FormItemsList { get; set; }
        string FormItemsAdi { get; set; }

        List<FormValues> List();
        IFormValues Select(int id);
        IFormValues Insert(int? propID, IFormValues formeleman);
        bool Insert(IFormValues formeleman);
        IFormValues Update(int id, IFormValues formeleman);
        bool Update(IFormValues formeleman);
        bool Delete(int id);
        bool Copy(int id);
    }
}
