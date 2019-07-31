using System.Collections.Generic;

namespace Repository.FormTiplerModel
{
    public interface IFormTipler
    {
        int ID { get; set; }
        string Name { get; set; }
        string Type { get; set; }
        string ShortName { get; set; }
        bool HasValue { get; set; }

        string Mesaj { get; set; }

        List<FormTipler> List();
        IFormTipler Select(int id);
        bool Insert(IFormTipler formeleman);
        bool Update(IFormTipler formeleman);
        bool Delete(int id);
    }
}
