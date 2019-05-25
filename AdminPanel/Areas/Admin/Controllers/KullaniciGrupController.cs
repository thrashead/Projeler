using System.Linq;
using System.Web.Mvc;
using System.Collections.Generic;
using AdminPanel.Data;
using TDLibrary;
using Models;

namespace AdminPanel.Areas.Admin.Controllers
{
    public class KullaniciGrupController : Controller
    {
        readonly AdminPanelEntities _entity = new AdminPanelEntities();
        Kullanicilar curUser = AppTools.User;

        public ActionResult Index()
        {
            if (!curUser.HasRight("Kullanicilar"))
                return RedirectToAction("AnaSayfa", "Giris");

            List<usp_UserGroupsSelect_Result> kullanici = _entity.usp_UserGroupsSelect(null).ToList();

            curUser.Log<KullaniciGrup>(null, "s", "Kullanýcý Gruplarý");

            return View(kullanici);
        }

        public ActionResult Ekle()
        {
            if (!curUser.HasRight("Kullanicilar", "i"))
                return RedirectToAction("AnaSayfa", "Giris");

            KullaniciGrup kullanici = new KullaniciGrup();

            return View(kullanici);
        }

        [HttpPost]
        public ActionResult Ekle(KullaniciGrup kullanici)
        {
            if (!curUser.HasRight("Kullanicilar", "i"))
                return RedirectToAction("AnaSayfa", "Giris");

            if (ModelState.IsValid)
            {
                var result = _entity.usp_UserGroupsInsert(kullanici.Name, kullanici.ShortName, kullanici.Description);

                if (result != null)
                {
                    curUser.Log(kullanici, "i", "Kullanýcý Gruplarý");

                    return RedirectToAction("Index");
                }
                else
                    kullanici.Mesaj = "Kayýt eklenemedi.";
            }
            else
                kullanici.Mesaj = "Model uygun deðil.";

            return View("Ekle", kullanici);
        }

        [HttpGet]
        public ActionResult Duzenle(int id)
        {
            if (!curUser.HasRight("Kullanicilar", "u"))
                return RedirectToAction("AnaSayfa", "Giris");

            usp_UserGroupsSelectTop_Result table = _entity.usp_UserGroupsSelectTop(id, 1).FirstOrDefault();

            KullaniciGrup kullanici = table.ChangeModel<KullaniciGrup>();

            kullanici.UserGroupTablesList = _entity.usp_UserGroupTablesDetailSelect(id).ToList().ChangeModelList<KullaniciGrupTablo, usp_UserGroupTablesDetailSelect_Result>();
            kullanici.UserGroupRightsList = _entity.usp_UserGroupRightsDetailSelect(id).ToList().ChangeModelList<KullaniciGrupHak, usp_UserGroupRightsDetailSelect_Result>();

            return View(kullanici);
        }

        [HttpPost]
        public ActionResult Duzenle(KullaniciGrup kullanici)
        {
            if (!curUser.HasRight("Kullanicilar", "u"))
                return RedirectToAction("AnaSayfa", "Giris");

            if (ModelState.IsValid)
            {
                var result = _entity.usp_UserGroupsUpdate(kullanici.ID, kullanici.Name, kullanici.ShortName, kullanici.Description);

                if (result != null)
                {
                    curUser.Log(kullanici, "u", "Kullanýcý Gruplarý");

                    return RedirectToAction("Index");
                }
                else
                    kullanici.Mesaj = "Kayýt düzenlenemedi.";
            }
            kullanici.Mesaj = "Model uygun deðil.";

            kullanici.UserGroupTablesList = _entity.usp_UserGroupTablesDetailSelect(kullanici.ID).ToList().ChangeModelList<KullaniciGrupTablo, usp_UserGroupTablesDetailSelect_Result>();
            kullanici.UserGroupRightsList = _entity.usp_UserGroupRightsDetailSelect(kullanici.ID).ToList().ChangeModelList<KullaniciGrupHak, usp_UserGroupRightsDetailSelect_Result>();

            return View("Duzenle", kullanici);
        }

        public JsonResult Sil(int id)
        {
            try
            {
                if (curUser.HasRight("Kullanicilar", "d"))
                {
                    _entity.usp_UserGroupsCheckDelete(id);

                    curUser.Log(id, "rd", "Kullanýcý Gruplarý");

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
