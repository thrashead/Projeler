using System.Collections.Generic;
using System.Web.Mvc;

namespace Repository.KullanicilarModel
{
    public interface IKullanicilar
    {
         int ID { get; set; }
         string Username { get; set; }
         int GroupID { get; set; }
         string Password { get; set; }
         bool Active { get; set; }
         string LoginTime { get; set; }
         bool Deleted { get; set; }

         string Mesaj { get; set; }

         List<SelectListItem> UserGroupsList { get; set; }
        string GroupName { get; set; }

        List<Kullanicilar> List();
        IKullanicilar Select(int id);
        IKullanicilar Insert(int? groupID, IKullanicilar kullanici);
        bool Insert(IKullanicilar kullanici);
        IKullanicilar Update(int id, IKullanicilar kullanici);
        bool Update(IKullanicilar kullanici);
        IKullanicilar ChangeGroup(int id, IKullanicilar kullanici = null);
        bool ChangeGroup(IKullanicilar kullanici);
        bool Delete(int id);
        bool Remove(int id);
    }
}
