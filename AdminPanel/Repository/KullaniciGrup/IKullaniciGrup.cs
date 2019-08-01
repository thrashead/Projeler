using Repository.KullaniciGrupHakModel;
using Repository.KullaniciGrupTabloModel;
using System.Collections.Generic;

namespace Repository.KullaniciGrupModel
{
    public interface IKullaniciGrup
    {
        int ID { get; set; }
        string Name { get; set; }
        string ShortName { get; set; }
        string Description { get; set; }

        string Mesaj { get; set; }

        List<KullaniciGrupTablo> UserGroupTablesList { get; set; }
        List<KullaniciGrupHak> UserGroupRightsList { get; set; }

        List<KullaniciGrup> List();
        IKullaniciGrup Select(int id);
        bool Insert(IKullaniciGrup kullanici);
        IKullaniciGrup Update(int id, IKullaniciGrup kullanici);
        bool Update(IKullaniciGrup kullanici);
        bool Delete(int id);
    }
}
