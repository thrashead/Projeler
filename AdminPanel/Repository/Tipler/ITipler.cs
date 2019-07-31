using System.Collections.Generic;

namespace Repository.TiplerModel
{
    public interface ITipler
    {
        int ID { get; set; }
        string TypeName { get; set; }
        string Url { get; set; }
        string TableName { get; set; }
        bool Linkable { get; set; }
        bool Show { get; set; }

        string Mesaj { get; set; }

        List<Tipler> List();
        ITipler Select(int id);
        bool Insert(ITipler tip);
        bool Update(ITipler tip);
        bool Delete(int id);
    }
}
