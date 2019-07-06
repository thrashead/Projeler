using System.Linq;
using System.Web.Mvc;
using System.Collections.Generic;
using Emlak.Data;
using TDLibrary;
using Models;

namespace Emlak.Areas.Ajax.Controllers
{
    public class KullaniciGrupHakController : Controller
    {
        readonly EmlakEntities entity = new EmlakEntities();
        Users curUser = AppTools.User;

        [HttpGet]
        public JsonResult Index()
        {
            if (!curUser.HasRight("Kullanicilar"))
                return Json(null, JsonRequestBehavior.AllowGet);

            List<usp_UserGroupRightsDetailSelect_Result> kullanici = entity.usp_UserGroupRightsDetailSelect(null).ToList();

            return Json(kullanici, JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public JsonResult Ekle()
        {
            if (!curUser.HasRight("Kullanicilar", "i"))
                return Json(null, JsonRequestBehavior.AllowGet);

            KullaniciGrupHak kullanici = new KullaniciGrupHak();

            List<usp_UserGroupTablesDetailSelect_Result> tableUserGroupTables = entity.usp_UserGroupTablesDetailSelect(null).ToList();
            foreach (usp_UserGroupTablesDetailSelect_Result item in tableUserGroupTables)
                kullanici.UserGroupTablesList.Add(new SelectListItem() { Value = item.ID.ToString(), Text = item.UserGroupAdi + " > " + item.TypeAdi });

            List<UserGroupProcess> tableUserGroupProcess = entity.UserGroupProcess.ToList();
            kullanici.UserGroupProcessList = tableUserGroupProcess.ToSelectList("ID", "Name");

            return Json(kullanici, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult Ekle([System.Web.Http.FromBody] KullaniciGrupHak kullanici)
        {
            if (!curUser.HasRight("Kullanicilar", "i"))
                return Json(null);

            var result = entity.usp_UserGroupRightsCheckInsert(kullanici.UserGroupTableID, kullanici.UserGroupProcessID, kullanici.Allow).FirstOrDefault();

            if (result != null)
            {
                curUser.Log(kullanici, "i", "Kullanýcý Grup Haklarý");

                return Json(kullanici);
            }
            else
                kullanici.Mesaj = "Kayýt eklenemedi veya bu þekilde bir Kullanýcý Hakký zaten eklenmiþ.";

            List<usp_UserGroupTablesDetailSelect_Result> tableUserGroupTables = entity.usp_UserGroupTablesDetailSelect(null).ToList();
            foreach (usp_UserGroupTablesDetailSelect_Result item in tableUserGroupTables)
                if (item.ID == kullanici.UserGroupTableID)
                    kullanici.UserGroupTablesList.Add(new SelectListItem() { Value = item.ID.ToString(), Text = item.UserGroupAdi + " > " + item.TypeAdi, Selected = true });
                else
                    kullanici.UserGroupTablesList.Add(new SelectListItem() { Value = item.ID.ToString(), Text = item.UserGroupAdi + " > " + item.TypeAdi });

            List<UserGroupProcess> tableUserGroupProcess = entity.UserGroupProcess.ToList();
            kullanici.UserGroupProcessList = tableUserGroupProcess.ToSelectList("ID", "Name", kullanici.UserGroupProcessID);

            return Json(kullanici);
        }

        [HttpGet]
        public JsonResult Duzenle(int id)
        {
            if (!curUser.HasRight("Kullanicilar", "u"))
                return Json(null, JsonRequestBehavior.AllowGet);

            usp_UserGroupRightsSelectTop_Result table = entity.usp_UserGroupRightsSelectTop(id, 1).FirstOrDefault();
            KullaniciGrupHak kullanici = table.ChangeModel<KullaniciGrupHak>();

            List<usp_UserGroupTablesDetailSelect_Result> tableUserGroupTables = entity.usp_UserGroupTablesDetailSelect(null).ToList();
            foreach (usp_UserGroupTablesDetailSelect_Result item in tableUserGroupTables)
                if (item.ID == kullanici.UserGroupTableID)
                    kullanici.UserGroupTablesList.Add(new SelectListItem() { Value = item.ID.ToString(), Text = item.UserGroupAdi + " > " + item.TypeAdi, Selected = true });
                else
                    kullanici.UserGroupTablesList.Add(new SelectListItem() { Value = item.ID.ToString(), Text = item.UserGroupAdi + " > " + item.TypeAdi });

            List<UserGroupProcess> tableUserGroupProcess = entity.UserGroupProcess.ToList();
            kullanici.UserGroupProcessList = tableUserGroupProcess.ToSelectList("ID", "Name", kullanici.UserGroupProcessID);

            return Json(kullanici, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult Duzenle([System.Web.Http.FromBody] KullaniciGrupHak kullanici)
        {
            if (!curUser.HasRight("Kullanicilar", "u"))
                return Json(null);

            var result = entity.usp_UserGroupRightsCheckUpdate(kullanici.ID, kullanici.UserGroupTableID, kullanici.UserGroupProcessID, kullanici.Allow).FirstOrDefault();

            if (result != null)
            {
                curUser.Log(kullanici, "u", "Kullanýcý Grup Haklarý");

                return Json(kullanici);
            }
            else
                kullanici.Mesaj = "Kayýt düzenlenemedi veya bu þekilde bir Kullanýcý Hakký zaten eklenmiþ.";

            List<usp_UserGroupTablesDetailSelect_Result> tableUserGroupTables = entity.usp_UserGroupTablesDetailSelect(null).ToList();
            foreach (usp_UserGroupTablesDetailSelect_Result item in tableUserGroupTables)
                if (item.ID == kullanici.UserGroupTableID)
                    kullanici.UserGroupTablesList.Add(new SelectListItem() { Value = item.ID.ToString(), Text = item.UserGroupAdi + " > " + item.TypeAdi, Selected = true });
                else
                    kullanici.UserGroupTablesList.Add(new SelectListItem() { Value = item.ID.ToString(), Text = item.UserGroupAdi + " > " + item.TypeAdi });

            List<UserGroupProcess> tableUserGroupProcess = entity.UserGroupProcess.ToList();
            kullanici.UserGroupProcessList = tableUserGroupProcess.ToSelectList("ID", "Name", kullanici.UserGroupProcessID);

            return Json(kullanici);
        }

        [HttpGet]
        public JsonResult Sil(int id)
        {
            if (!curUser.HasRight("Kullanicilar", "d"))
                return Json(false, JsonRequestBehavior.AllowGet);

            try
            {
                entity.usp_UserGroupRightsDelete(id);

                curUser.Log(id, "rd", "Kullanýcý Grup Haklarý");

                return Json(true, JsonRequestBehavior.AllowGet);
            }
            catch
            {
                return Json(false, JsonRequestBehavior.AllowGet);
            }
        }
    }
}
