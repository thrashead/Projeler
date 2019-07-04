using System.Linq;
using System.Web.Mvc;
using System.Collections.Generic;
using AdminPanel.Data;
using TDLibrary;
using Models;

namespace AdminPanel.Areas.Admin.Controllers
{
    public class KullaniciGrupHakController : Controller
    {
        readonly EmlakEntities _entity = new EmlakEntities();
        Kullanicilar curUser = AppTools.User;

        public ActionResult Index()
        {
            if (!curUser.HasRight("Kullanicilar"))
                return RedirectToAction("AnaSayfa", "Giris");

            List<usp_UserGroupRightsDetailSelect_Result> kullanici = _entity.usp_UserGroupRightsDetailSelect(null).ToList();

            curUser.Log<KullaniciGrupHak>(null, "s", "Kullanýcý Grup Haklarý");

            return View(kullanici);
        }

        public ActionResult Ekle()
        {
            if (!curUser.HasRight("Kullanicilar", "i"))
                return RedirectToAction("AnaSayfa", "Giris");

            KullaniciGrupHak kullanici = new KullaniciGrupHak();

            List<usp_UserGroupTablesDetailSelect_Result> tableUserGroupTables = _entity.usp_UserGroupTablesDetailSelect(null).ToList();
            foreach (usp_UserGroupTablesDetailSelect_Result item in tableUserGroupTables)
                kullanici.UserGroupTablesList.Add(new SelectListItem() { Value = item.ID.ToString(), Text = item.UserGroupAdi + " > " + item.TypeAdi });

            List<UserGroupProcess> tableUserGroupProcess = _entity.UserGroupProcess.ToList();
            kullanici.UserGroupProcessList = tableUserGroupProcess.ToSelectList("ID", "Name");

            return View(kullanici);
        }

        [HttpPost]
        public ActionResult Ekle(KullaniciGrupHak kullanici)
        {
            if (!curUser.HasRight("Kullanicilar", "i"))
                return RedirectToAction("AnaSayfa", "Giris");

            if (ModelState.IsValid)
            {
                var result = _entity.usp_UserGroupRightsCheckInsert(kullanici.UserGroupTableID, kullanici.UserGroupProcessID, kullanici.Allow);

                if (result != null)
                {
                    curUser.Log(kullanici, "i", "Kullanýcý Grup Haklarý");

                    return RedirectToAction("Index");
                }
                else
                    kullanici.Mesaj = "Kayýt eklenemedi veya bu þekilde bir Kullanýcý Hakký zaten eklenmiþ.";
            }
            else
                kullanici.Mesaj = "Model uygun deðil.";

            List<usp_UserGroupTablesDetailSelect_Result> tableUserGroupTables = _entity.usp_UserGroupTablesDetailSelect(null).ToList();
            foreach (usp_UserGroupTablesDetailSelect_Result item in tableUserGroupTables)
                if (item.ID == kullanici.UserGroupTableID)
                    kullanici.UserGroupTablesList.Add(new SelectListItem() { Value = item.ID.ToString(), Text = item.UserGroupAdi + " > " + item.TypeAdi, Selected = true });
                else
                    kullanici.UserGroupTablesList.Add(new SelectListItem() { Value = item.ID.ToString(), Text = item.UserGroupAdi + " > " + item.TypeAdi });

            List<UserGroupProcess> tableUserGroupProcess = _entity.UserGroupProcess.ToList();
            kullanici.UserGroupProcessList = tableUserGroupProcess.ToSelectList("ID", "Name", kullanici.UserGroupProcessID);

            return View("Ekle", kullanici);
        }

        [HttpGet]
        public ActionResult Duzenle(int id)
        {
            if (!curUser.HasRight("Kullanicilar", "u"))
                return RedirectToAction("AnaSayfa", "Giris");

            usp_UserGroupRightsSelectTop_Result table = _entity.usp_UserGroupRightsSelectTop(id, 1).FirstOrDefault();
            KullaniciGrupHak kullanici = table.ChangeModel<KullaniciGrupHak>();

            List<usp_UserGroupTablesDetailSelect_Result> tableUserGroupTables = _entity.usp_UserGroupTablesDetailSelect(null).ToList();
            foreach (usp_UserGroupTablesDetailSelect_Result item in tableUserGroupTables)
                if (item.ID == kullanici.UserGroupTableID)
                    kullanici.UserGroupTablesList.Add(new SelectListItem() { Value = item.ID.ToString(), Text = item.UserGroupAdi + " > " + item.TypeAdi, Selected = true });
                else
                    kullanici.UserGroupTablesList.Add(new SelectListItem() { Value = item.ID.ToString(), Text = item.UserGroupAdi + " > " + item.TypeAdi });

            List<UserGroupProcess> tableUserGroupProcess = _entity.UserGroupProcess.ToList();
            kullanici.UserGroupProcessList = tableUserGroupProcess.ToSelectList("ID", "Name", kullanici.UserGroupProcessID);

            return View(kullanici);
        }

        [HttpPost]
        public ActionResult Duzenle(KullaniciGrupHak kullanici)
        {
            if (!curUser.HasRight("Kullanicilar", "u"))
                return RedirectToAction("AnaSayfa", "Giris");

            if (ModelState.IsValid)
            {
                var result = _entity.usp_UserGroupRightsCheckUpdate(kullanici.ID, kullanici.UserGroupTableID, kullanici.UserGroupProcessID, kullanici.Allow);

                if (result != null)
                {
                    curUser.Log(kullanici, "u", "Kullanýcý Grup Haklarý");

                    return RedirectToAction("Index");
                }
                else
                    kullanici.Mesaj = "Kayýt düzenlenemedi veya bu þekilde bir Kullanýcý Hakký zaten eklenmiþ.";
            }
            else
                kullanici.Mesaj = "Model uygun deðil.";

            List<usp_UserGroupTablesDetailSelect_Result> tableUserGroupTables = _entity.usp_UserGroupTablesDetailSelect(null).ToList();
            foreach (usp_UserGroupTablesDetailSelect_Result item in tableUserGroupTables)
                if (item.ID == kullanici.UserGroupTableID)
                    kullanici.UserGroupTablesList.Add(new SelectListItem() { Value = item.ID.ToString(), Text = item.UserGroupAdi + " > " + item.TypeAdi, Selected = true });
                else
                    kullanici.UserGroupTablesList.Add(new SelectListItem() { Value = item.ID.ToString(), Text = item.UserGroupAdi + " > " + item.TypeAdi });

            List<UserGroupProcess> tableUserGroupProcess = _entity.UserGroupProcess.ToList();
            kullanici.UserGroupProcessList = tableUserGroupProcess.ToSelectList("ID", "Name", kullanici.UserGroupProcessID);

            return View("Duzenle", kullanici);
        }

        public JsonResult Sil(int id)
        {
            try
            {
                if (curUser.HasRight("Kullanicilar", "d"))
                {
                    _entity.usp_UserGroupRightsDelete(id);

                    curUser.Log(id, "rd", "Kullanýcý Grup Haklarý");

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
