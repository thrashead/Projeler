using Repository.FormElemanModel;
using System.Collections.Generic;

namespace Repository.FormElemanGrupModel
{
    public interface IFormElemanGrup
    {
        int ID { get; set; }
        string Title { get; set; }
        string Description { get; set; }
        string Code { get; set; }
        bool Active { get; set; }

        string Mesaj { get; set; }

        List<FormEleman> PropertyList { get; set; }

        List<FormElemanGrup> List();
        IFormElemanGrup Select(int id);
        bool Insert(IFormElemanGrup formeleman);
        IFormElemanGrup Update(int id, IFormElemanGrup formeleman);
        bool Update(IFormElemanGrup formeleman);
        bool Delete(int id);
        bool Copy(int id);
    }
}
