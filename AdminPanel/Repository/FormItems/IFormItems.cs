using Repository.FormValuesModel;
using Repository.FormAttributesModel;
using System.Collections.Generic;
using System.Web.Mvc;

namespace Repository.FormItemsModel
{
    public interface IFormItems
    {
        int ID { get; set; }
        int FormTypeID { get; set; }
        int? GroupID { get; set; }
        string Title { get; set; }
        string Description { get; set; }
        string ErrorMessage { get; set; }
        string Code { get; set; }
        int? OrderNumber { get; set; }

        string Mesaj { get; set; }

        bool? HasValue { get; set; }

        List<SelectListItem> FormTypesList { get; set; }
        List<SelectListItem> FormGroupsList { get; set; }

        string FormGroupsAdi { get; set; }
        string FormTypesAdi { get; set; }

        List<FormAttributes> FormAttributesList { get; set; }
        List<FormValues> FormValuesList { get; set; }

        List<FormItems> List();
        IFormItems Select(int id);
        IFormItems Insert(int? groupID, int? formTypeID, IFormItems formeleman);
        bool Insert(IFormItems formeleman);
        IFormItems Update(int id, IFormItems formeleman);
        bool Update(IFormItems formeleman);
        bool Delete(int id);
        bool Copy(int id);
    }
}
