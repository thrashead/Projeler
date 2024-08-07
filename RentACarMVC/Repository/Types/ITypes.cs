using System.Collections.Generic;

namespace Repository.TypesModel
{
    public interface ITypes
    {
        int ID { get; set; }
        string TypeName { get; set; }
        string Url { get; set; }
        string TableName { get; set; }
        bool Linkable { get; set; }
        bool Show { get; set; }

        string Mesaj { get; set; }

        List<Types> List();
        ITypes Select(int id);
        bool Insert(ITypes tip);
        bool Update(ITypes tip);
        bool Delete(int id);
    }
}
