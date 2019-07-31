using System.Linq;
using System.Web.Mvc;
using System.Collections.Generic;
using AdminPanel.Data;
using TDLibrary;
using Repository.KullanicilarModel;
using Repository.KullaniciGrupHakModel;

namespace AdminPanel.Areas.Admin.Controllers
{
    public class KullaniciGrupHakController : Controller
    {
        readonly AdminPanelEntities entity = new AdminPanelEntities();
        KullaniciGrupHak table = new KullaniciGrupHak();
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

            List<usp_UserGroupTablesDetailSelect_Result> tableUserGroupTables = entity.usp_UserGroupTablesDetailSelect(null).ToList();
            foreach (usp_UserGroupTablesDetailSelect_Result item in tableUserGroupTables)
                table.UserGroupTablesList.Add(new SelectListItem() { Value = item.ID.ToString(), Text = item.UserGroupAdi + " > " + item.TypeAdi });

            List<usp_UserGroupProcessSelect_Result> tableKullaniciGrupIslem = entity.usp_UserGroupProcessSelect(null).ToList();
            table.UserGroupProcessList = tableKullaniciGrupIslem.ToSelectList<usp_UserGroupProcessSelect_Result, SelectListItem>("ID", "Name");

            return View(table);
        }

        [HttpPost]
        public ActionResult Ekle(KullaniciGrupHak kullanici)
        {
            if (!curUser.HasRight("Kullanicilar", "i"))
                return RedirectToAction("AnaSayfa", "Giris");

            if (ModelState.IsValid)
            {
                bool result = table.Insert(kullanici);

                if (result)
                {
                    curUser.Log(kullanici, "i", "Kullanýcý Grup Haklarý");

                    return RedirectToAction("Index");
                }
                else
                    kullanici.Mesaj = "Kayýt eklenemedi veya bu þekilde bir Kullanýcý Hakký zaten eklenmiþ.";
            }
            else
                kullanici.Mesaj = "Model uygun deðil.";

            List<usp_UserGroupTablesDetailSelect_Result> tableUserGroupTables = entity.usp_UserGroupTablesDetailSelect(null).ToList();
            foreach (usp_UserGroupTablesDetailSelect_Result item in tableUserGroupTables)
                if (item.ID == kullanici.UserGroupTableID)
                    kullanici.UserGroupTablesList.Add(new SelectListItem() { Value = item.ID.ToString(), Text = item.UserGroupAdi + " > " + item.TypeAdi, Selected = true });
                else
                    kullanici.UserGroupTablesList.Add(new SelectListItem() { Value = item.ID.ToString(), Text = item.UserGroupAdi + " > " + item.TypeAdi });

            List<usp_UserGroupProcessSelect_Result> tableKullaniciGrupIslem = entity.usp_UserGroupProcessSelect(null).ToList();
            kullanici.UserGroupProcessList = tableKullaniciGrupIslem.ToSelectList<usp_UserGroupProcessSelect_Result, SelectListItem>("ID", "Name", kullanici.UserGroupProcessID);

            return View("Ekle", kullanici);
        }

        [HttpGet]
        public ActionResult Duzenle(int id)
        {
            if (!curUser.HasRight("Kullanicilar", "u"))
                return RedirectToAction("AnaSayfa", "Giris");

            IKullaniciGrupHak kullanici = table.Select(id);

            List<usp_UserGroupTablesDetailSelect_Result> tableUserGroupTables = entity.usp_UserGroupTablesDetailSelect(null).ToList();
            foreach (usp_UserGroupTablesDetailSelect_Result item in tableUserGroupTables)
                if (item.ID == kullanici.UserGroupTableID)
                    kullanici.UserGroupTablesList.Add(new SelectListItem() { Value = item.ID.ToString(), Text = item.UserGroupAdi + " > " + item.TypeAdi, Selected = true });
                else
                    kullanici.UserGroupTablesList.Add(new SelectListItem() { Value = item.ID.ToString(), Text = item.UserGroupAdi + " > " + item.TypeAdi });

            List<usp_UserGroupProcessSelect_Result> tableKullaniciGrupIslem = entity.usp_UserGroupProcessSelect(null).ToList();
            kullanici.UserGroupProcessList = tableKullaniciGrupIslem.ToSelectList<usp_UserGroupProcessSelect_Result, SelectListItem>("ID", "Name", kullanici.UserGroupProcessID);

            return View(kullanici);
        }

        [HttpPost]
        public ActionResult Duzenle(KullaniciGrupHak kullanici)
        {
            if (!curUser.HasRight("Kullanicilar", "u"))
                return RedirectToAction("AnaSayfa", "Giris");

            if (ModelState.IsValid)
            {
                bool result = table.Update(kullanici);

                if (result)
                {
                    curUser.Log(kullanici, "u", "Kullanýcý Grup Haklarý");

                    return RedirectToAction("Index");
                }
                else
                    kullanici.Mesaj = "Kayýt düzenlenemedi veya bu þekilde bir Kullanýcý Hakký zaten eklenmiþ.";
            }
            else
                kullanici.Mesaj = "Model uygun deðil.";

            List<usp_UserGroupTablesDetailSelect_Result> tableUserGroupTables = entity.usp_UserGroupTablesDetailSelect(null).ToList();
            foreach (usp_UserGroupTablesDetailSelect_Result item in tableUserGroupTables)
                if (item.ID == kullanici.UserGroupTableID)
                    kullanici.UserGroupTablesList.Add(new SelectListItem() { Value = item.ID.ToString(), Text = item.UserGroupAdi + " > " + item.TypeAdi, Selected = true });
                else
                    kullanici.UserGroupTablesList.Add(new SelectListItem() { Value = item.ID.ToString(), Text = item.UserGroupAdi + " > " + item.TypeAdi });

            List<usp_UserGroupProcessSelect_Result> tableKullaniciGrupIslem = entity.usp_UserGroupProcessSelect(null).ToList();
            kullanici.UserGroupProcessList = tableKullaniciGrupIslem.ToSelectList<usp_UserGroupProcessSelect_Result, SelectListItem>("ID", "Name", kullanici.UserGroupProcessID);

            return View("Duzenle", kullanici);
        }

        public JsonResult Sil(int id)
        {
            if (curUser.HasRight("Kullanicilar", "d"))
            {
                bool result = table.Delete(id);

                if (result)
                {
                    curUser.Log(id, "d", "Kullanýcý Grup Haklarý");

                    return Json(true);
                }
            }

            return Json(false);
        }
    }
}
