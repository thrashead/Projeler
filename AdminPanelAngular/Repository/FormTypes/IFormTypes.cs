using System.Collections.Generic;

namespace Repository.FormTypesModel
{
    public interface IFormTypes
    {
        int ID { get; set; }
        string Name { get; set; }
        string Type { get; set; }
        string ShortName { get; set; }
        bool HasValue { get; set; }

        string Mesaj { get; set; }

        List<FormTypes> List();
        IFormTypes Select(int id);
        bool Insert(IFormTypes formeleman);
        bool Update(IFormTypes formeleman);
        bool Delete(int id);
    }
}
