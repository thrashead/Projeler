using System.Collections.Generic;
using System.Web.Mvc;

namespace Repository.KullaniciGrupHakModel
{
    public interface IKullaniciGrupHak
    {
        int ID { get; set; }
        int UserGroupTableID { get; set; }
        int UserGroupProcessID { get; set; }
        bool Allow { get; set; }

        string Mesaj { get; set; }

        List<SelectListItem> UserGroupTablesList { get; set; }
        List<SelectListItem> UserGroupProcessList { get; set; }
        string GroupAdi { get; set; }
        string UserGroupTablesAdi { get; set; }
        string UserGroupProcessAdi { get; set; }
        string UserGroupProcessKisaAdi { get; set; }

        List<KullaniciGrupHak> List();
        IKullaniciGrupHak Select(int id);
        bool Insert(IKullaniciGrupHak kullanici);
        bool Update(IKullaniciGrupHak kullanici);
        bool Delete(int id);
    }
}
