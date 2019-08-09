using Repository.FormItemsModel;
using System.Collections.Generic;

namespace Repository.FormGroupsModel
{
    public interface IFormGroups
    {
        int ID { get; set; }
        string Title { get; set; }
        string Description { get; set; }
        string Code { get; set; }
        bool Active { get; set; }

        string Mesaj { get; set; }

        List<FormItems> FormItemsList { get; set; }

        List<FormGroups> List();
        IFormGroups Select(int id);
        bool Insert(IFormGroups formeleman);
        IFormGroups Update(int id, IFormGroups formeleman);
        bool Update(IFormGroups formeleman);
        bool Delete(int id);
        bool Copy(int id);
    }
}
