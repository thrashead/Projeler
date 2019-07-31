using System.Linq;
using System.Web.Mvc;
using AdminPanel.Data;
using TDLibrary;
using Repository.KullanicilarModel;
using Repository.KullaniciGrupModel;
using Repository.KullaniciGrupTabloModel;
using Repository.KullaniciGrupHakModel;

namespace AdminPanel.Areas.Admin.Controllers
{
    public class KullaniciGrupController : Controller
    {
        readonly AdminPanelEntities entity = new AdminPanelEntities();
        KullaniciGrup table = new KullaniciGrup();
        Kullanicilar curUser = AppTools.User;

        public ActionResult Index()
        {
            if (!curUser.HasRight("Kullanicilar"))
                return RedirectToAction("AnaSayfa", "Giris");

            return View(table.List());
        }

        public ActionResult Ekle()
        {
            if (!curUser.HasRight("Kullanicilar", "i"))
                return RedirectToAction("AnaSayfa", "Giris");

            return View(table);
        }

        [HttpPost]
        public ActionResult Ekle(KullaniciGrup kullanici)
        {
            if (!curUser.HasRight("Kullanicilar", "i"))
                return RedirectToAction("AnaSayfa", "Giris");

            if (ModelState.IsValid)
            {
                bool result = table.Insert(kullanici);

                if (result)
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

            IKullaniciGrup kullanici = table.Select(id);

            kullanici.UserGroupTablesList = entity.usp_UserGroupTablesDetailSelect(id).ToList().ChangeModelList<KullaniciGrupTablo, usp_UserGroupTablesDetailSelect_Result>();
            kullanici.UserGroupRightsList = entity.usp_UserGroupRightsDetailSelect(id).ToList().ChangeModelList<KullaniciGrupHak, usp_UserGroupRightsDetailSelect_Result>();

            return View(kullanici);
        }

        [HttpPost]
        public ActionResult Duzenle(KullaniciGrup kullanici)
        {
            if (!curUser.HasRight("Kullanicilar", "u"))
                return RedirectToAction("AnaSayfa", "Giris");

            if (ModelState.IsValid)
            {
                bool result = table.Update(kullanici);

                if (result)
                {
                    curUser.Log(kullanici, "u", "Kullanýcý Gruplarý");

                    return RedirectToAction("Index");
                }
                else
                    kullanici.Mesaj = "Kayýt düzenlenemedi.";
            }
            kullanici.Mesaj = "Model uygun deðil.";

            kullanici.UserGroupTablesList = entity.usp_UserGroupTablesDetailSelect(kullanici.ID).ToList().ChangeModelList<KullaniciGrupTablo, usp_UserGroupTablesDetailSelect_Result>();
            kullanici.UserGroupRightsList = entity.usp_UserGroupRightsDetailSelect(kullanici.ID).ToList().ChangeModelList<KullaniciGrupHak, usp_UserGroupRightsDetailSelect_Result>();

            return View("Duzenle", kullanici);
        }

        public JsonResult Sil(int id)
        {
            if (curUser.HasRight("Kullanicilar", "d"))
            {
                bool result = table.Delete(id);

                if (result)
                {
                    curUser.Log(id, "d", "Kullanýcý Gruplarý");

                    return Json(true);
                }
            }

            return Json(false);
        }
    }
}
