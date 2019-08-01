using System.Collections.Generic;
using System.Web.Mvc;

namespace Repository.KullaniciGrupTabloModel
{
    public interface IKullaniciGrupTablo
    {
        int ID { get; set; }
        int TypeID { get; set; }
        int UserGroupID { get; set; }

        string Mesaj { get; set; }

        List<SelectListItem> TypesList { get; set; }
        List<SelectListItem> UserGroupsList { get; set; }

        string TypeAdi { get; set; }
        string UserGroupAdi { get; set; }

        List<KullaniciGrupTablo> List();
        IKullaniciGrupTablo Select(int id);
        IKullaniciGrupTablo Insert(int? groupID, int? typeID, IKullaniciGrupTablo kullanici);
        bool Insert(IKullaniciGrupTablo kullanici);
        IKullaniciGrupTablo Update(int id, IKullaniciGrupTablo kullanici);
        bool Update(IKullaniciGrupTablo kullanici);
        bool Delete(int id);
    }
}
