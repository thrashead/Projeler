using System.Linq;
using System.Web.Mvc;
using System.Collections.Generic;
using AdminPanel.Data;
using TDLibrary;
using Repository.KullanicilarModel;
using Repository.KullaniciGrupTabloModel;
using Repository.TiplerModel;

namespace AdminPanel.Areas.Admin.Controllers
{
    public class KullaniciGrupTabloController : Controller
    {
        readonly AdminPanelEntities entity = new AdminPanelEntities();
        KullaniciGrupTablo table = new KullaniciGrupTablo();
        Kullanicilar curUser = AppTools.User;

        public ActionResult Index()
        {
            if (!curUser.HasRight("Kullanicilar"))
                return RedirectToAction("AnaSayfa", "Giris");

            return View(table.List());
        }

        public ActionResult Ekle(string groupID)
        {
            if (!curUser.HasRight("Kullanicilar", "i"))
                return RedirectToAction("AnaSayfa", "Giris");

            int linkID = groupID == null ? 0 : groupID.ToInteger();

            List<usp_UserGroupsSelect_Result> tableKullaniciGrup = entity.usp_UserGroupsSelect(null).ToList();
            table.UserGroupsList = tableKullaniciGrup.ToSelectList<usp_UserGroupsSelect_Result, SelectListItem>("ID", "Name", linkID);

            List<Tipler> tableTipler = entity.usp_TypesSelect(null).ToList().ChangeModelList<Tipler, usp_TypesSelect_Result>();
            table.TypesList = tableTipler.ToSelectList<Tipler, SelectListItem>("ID", "TypeName");

            return View(table);
        }

        [HttpPost]
        public ActionResult Ekle(KullaniciGrupTablo kullanici)
        {
            if (!curUser.HasRight("Kullanicilar", "i"))
                return RedirectToAction("AnaSayfa", "Giris");

            if (ModelState.IsValid)
            {
                bool result = table.Insert(kullanici);

                if (result)
                {
                    curUser.Log(kullanici, "i", "Kullan�c� Grup Tablolar�");

                    return RedirectToAction("Index");
                }
                else
                    kullanici.Mesaj = "Kay�t eklenemedi veya bu �ekilde bir Kullan�c� Grup Tablosu zaten eklenmi�.";
            }
            else
                kullanici.Mesaj = "Model uygun de�il.";

            List<usp_UserGroupsSelect_Result> tableKullaniciGrup = entity.usp_UserGroupsSelect(null).ToList();
            kullanici.UserGroupsList = tableKullaniciGrup.ToSelectList<usp_UserGroupsSelect_Result, SelectListItem>("ID", "Name", kullanici.UserGroupID);

            List<Tipler> tableTipler = entity.usp_TypesSelect(null).ToList().ChangeModelList<Tipler, usp_TypesSelect_Result>();
            kullanici.TypesList = tableTipler.ToSelectList<Tipler, SelectListItem>("ID", "TypeName", kullanici.TypeID);

            return View("Ekle", kullanici);
        }

        [HttpGet]
        public ActionResult Duzenle(int id)
        {
            if (!curUser.HasRight("Kullanicilar", "u"))
                return RedirectToAction("AnaSayfa", "Giris");

            IKullaniciGrupTablo kullanici = table.Select(id);

            List<usp_UserGroupsSelect_Result> tableKullaniciGrup = entity.usp_UserGroupsSelect(null).ToList();
            kullanici.UserGroupsList = tableKullaniciGrup.ToSelectList<usp_UserGroupsSelect_Result, SelectListItem>("ID", "Name", kullanici.UserGroupID);

            List<Tipler> tableTipler = entity.usp_TypesSelect(null).ToList().ChangeModelList<Tipler, usp_TypesSelect_Result>();
            kullanici.TypesList = tableTipler.ToSelectList<Tipler, SelectListItem>("ID", "TypeName", kullanici.TypeID);

            return View(kullanici);
        }

        [HttpPost]
        public ActionResult Duzenle(KullaniciGrupTablo kullanici)
        {
            if (!curUser.HasRight("Kullanicilar", "u"))
                return RedirectToAction("AnaSayfa", "Giris");

            if (ModelState.IsValid)
            {
                bool result = table.Update(kullanici);

                if (result)
                {
                    curUser.Log(kullanici, "u", "Kullan�c� Grup Tablolar�");

                    return RedirectToAction("Index");
                }
                else
                    kullanici.Mesaj = "Kay�t d�zenlenemedi veya bu �ekilde bir Kullan�c� Grup Tablosu zaten eklenmi�.";
            }
            else
                kullanici.Mesaj = "Model uygun de�il.";

            List<usp_UserGroupsSelect_Result> tableKullaniciGrup = entity.usp_UserGroupsSelect(null).ToList();
            kullanici.UserGroupsList = tableKullaniciGrup.ToSelectList<usp_UserGroupsSelect_Result, SelectListItem>("ID", "Name", kullanici.UserGroupID);

            List<Tipler> tableTipler = entity.usp_TypesSelect(null).ToList().ChangeModelList<Tipler, usp_TypesSelect_Result>();
            kullanici.TypesList = tableTipler.ToSelectList<Tipler, SelectListItem>("ID", "TypeName", kullanici.TypeID);

            return View("Duzenle", kullanici);
        }

        public JsonResult Sil(int id)
        {
            if (curUser.HasRight("Kullanicilar", "d"))
            {
                bool result = table.Delete(id);

                if (result)
                {
                    curUser.Log(id, "d", "Kullan�c� Grup Tablolar�");

                    return Json(true);
                }
            }

            return Json(false);
        }
    }
}
