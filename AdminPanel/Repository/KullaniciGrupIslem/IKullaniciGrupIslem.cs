using System.Collections.Generic;

namespace Repository.KullaniciGrupIslemModel
{
    public interface IKullaniciGrupIslem
    {
        int ID { get; set; }
        string Name { get; set; }
        string ShortName { get; set; }
        string Description { get; set; }

        string Mesaj { get; set; }

        List<KullaniciGrupIslem> List();
        IKullaniciGrupIslem Select(int id);
        bool Insert(IKullaniciGrupIslem kullanici);
        bool Update(IKullaniciGrupIslem kullanici);
        bool Delete(int id);
    }
}
