using System.Linq;
using System.Web.Mvc;
using System.Collections.Generic;
using AdminPanel.Data;
using TDLibrary;
using Models;

namespace AdminPanel.Areas.Admin.Controllers
{
    public class KullaniciGrupTabloController : Controller
    {
        readonly AdminPanelEntities _entity = new AdminPanelEntities();
        Kullanicilar curUser = AppTools.User;

        public ActionResult Index()
        {
            if (!curUser.HasRight("Kullanicilar"))
                return RedirectToAction("AnaSayfa", "Giris");

            List<usp_UserGroupTablesDetailSelect_Result> kullanici = _entity.usp_UserGroupTablesDetailSelect(null).ToList();

            curUser.Log<KullaniciGrupTablo>(null, "s", "Kullan�c� Grup Tablolar�");

            return View(kullanici);
        }

        public ActionResult Ekle(string groupID)
        {
            if (!curUser.HasRight("Kullanicilar", "i"))
                return RedirectToAction("AnaSayfa", "Giris");

            int linkID = groupID == null ? 0 : groupID.ToInteger();

            KullaniciGrupTablo kullanici = new KullaniciGrupTablo();

            List<UserGroups> tableUserGroups = _entity.UserGroups.ToList();
            kullanici.UserGroupsList = tableUserGroups.ToSelectList("ID", "Name", linkID);

            List<Types> tableTypes = _entity.Types.ToList();
            kullanici.TypesList = tableTypes.ToSelectList("ID", "TypeName");

            return View(kullanici);
        }

        [HttpPost]
        public ActionResult Ekle(KullaniciGrupTablo kullanici)
        {
            if (!curUser.HasRight("Kullanicilar", "i"))
                return RedirectToAction("AnaSayfa", "Giris");

            if (ModelState.IsValid)
            {
                var result = _entity.usp_UserGroupTablesCheckInsert(kullanici.TypeID, kullanici.UserGroupID);

                if (result != null)
                {
                    curUser.Log(kullanici, "i", "Kullan�c� Grup Tablolar�");

                    return RedirectToAction("Index");
                }
                else
                    kullanici.Mesaj = "Kay�t eklenemedi veya bu �ekilde bir Kullan�c� Grup Tablosu zaten eklenmi�.";
            }
            else
                kullanici.Mesaj = "Model uygun de�il.";

            List<UserGroups> tableUserGroups = _entity.UserGroups.ToList();
            kullanici.UserGroupsList = tableUserGroups.ToSelectList("ID", "Name", kullanici.UserGroupID);

            List<Types> tableTypes = _entity.Types.ToList();
            kullanici.TypesList = tableTypes.ToSelectList("ID", "TypeName", kullanici.TypeID);

            return View("Ekle", kullanici);
        }

        [HttpGet]
        public ActionResult Duzenle(int id)
        {
            if (!curUser.HasRight("Kullanicilar", "u"))
                return RedirectToAction("AnaSayfa", "Giris");

            usp_UserGroupTablesSelectTop_Result table = _entity.usp_UserGroupTablesSelectTop(id, 1).FirstOrDefault();

            KullaniciGrupTablo kullanici = table.ChangeModel<KullaniciGrupTablo>();

            List<UserGroups> tableUserGroups = _entity.UserGroups.ToList();
            kullanici.UserGroupsList = tableUserGroups.ToSelectList("ID", "Name", kullanici.UserGroupID);

            List<Types> tableTypes = _entity.Types.ToList();
            kullanici.TypesList = tableTypes.ToSelectList("ID", "TypeName", kullanici.TypeID);

            return View(kullanici);
        }

        [HttpPost]
        public ActionResult Duzenle(KullaniciGrupTablo kullanici)
        {
            if (!curUser.HasRight("Kullanicilar", "u"))
                return RedirectToAction("AnaSayfa", "Giris");

            if (ModelState.IsValid)
            {
                var result = _entity.usp_UserGroupTablesCheckUpdate(kullanici.ID, kullanici.TypeID, kullanici.UserGroupID);

                if (result != null)
                {
                    curUser.Log(kullanici, "u", "Kullan�c� Grup Tablolar�");

                    return RedirectToAction("Index");
                }
                else
                    kullanici.Mesaj = "Kay�t d�zenlenemedi veya bu �ekilde bir Kullan�c� Grup Tablosu zaten eklenmi�.";
            }
            else
                kullanici.Mesaj = "Model uygun de�il.";

            List<UserGroups> tableUserGroups = _entity.UserGroups.ToList();
            kullanici.UserGroupsList = tableUserGroups.ToSelectList("ID", "Name", kullanici.UserGroupID);

            List<Types> tableTypes = _entity.Types.ToList();
            kullanici.TypesList = tableTypes.ToSelectList("ID", "TypeName", kullanici.TypeID);

            return View("Duzenle", kullanici);
        }

        public JsonResult Sil(int id)
        {
            try
            {
                if (curUser.HasRight("Kullanicilar", "d"))
                {
                    _entity.usp_UserGroupTablesCheckDelete(id);

                    curUser.Log(id, "rd", "Kullan�c� Grup Tablolar�");

                    return Json(true);
                }
            }
            catch
            {
                return Json(false);
            }

            return Json(false);
        }
    }
}
