using System.Linq;
using System.Web.Mvc;
using System.Collections.Generic;
using Emlak.Data;
using TDLibrary;
using Models;

namespace Emlak.Areas.Ajax.Controllers
{
    public class UserGroupRightsController : Controller
    {
        readonly EmlakEntities entity = new EmlakEntities();
        Kullanicilar curUser = AppTools.User;

        [HttpGet]
        public JsonResult Index()
        {
            if (!curUser.HasRight("Users"))
                return Json(null, JsonRequestBehavior.AllowGet);

            List<usp_UserGroupRightsDetailSelect_Result> kullanici = entity.usp_UserGroupRightsDetailSelect(null).ToList();

            return Json(kullanici, JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public JsonResult Insert()
        {
            if (!curUser.HasRight("Users", "i"))
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
        public JsonResult Insert([System.Web.Http.FromBody] KullaniciGrupHak kullanici)
        {
            if (!curUser.HasRight("Users", "i"))
                return Json(null);

            var result = entity.usp_UserGroupRightsCheckInsert(kullanici.UserGroupTableID, kullanici.UserGroupProcessID, kullanici.Allow).FirstOrDefault();

            if (result != null)
            {
                curUser.Log(kullanici, "i", "Kullan�c� Grup Haklar�");

                return Json(kullanici);
            }
            else
                kullanici.Mesaj = "Kay�t eklenemedi veya bu �ekilde bir Kullan�c� Hakk� zaten eklenmi�.";

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
        public JsonResult Update(int id)
        {
            if (!curUser.HasRight("Users", "u"))
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
        public JsonResult Update([System.Web.Http.FromBody] KullaniciGrupHak kullanici)
        {
            if (!curUser.HasRight("Users", "u"))
                return Json(null);

            var result = entity.usp_UserGroupRightsCheckUpdate(kullanici.ID, kullanici.UserGroupTableID, kullanici.UserGroupProcessID, kullanici.Allow).FirstOrDefault();

            if (result != null)
            {
                curUser.Log(kullanici, "u", "Kullan�c� Grup Haklar�");

                return Json(kullanici);
            }
            else
                kullanici.Mesaj = "Kay�t d�zenlenemedi veya bu �ekilde bir Kullan�c� Hakk� zaten eklenmi�.";

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
        public JsonResult Delete(int id)
        {
            if (!curUser.HasRight("Users", "d"))
                return Json(false, JsonRequestBehavior.AllowGet);

            try
            {
                entity.usp_UserGroupRightsDelete(id);

                curUser.Log(id, "d", "Kullan�c� Grup Haklar�");

                return Json(true, JsonRequestBehavior.AllowGet);
            }
            catch
            {
                return Json(false, JsonRequestBehavior.AllowGet);
            }
        }
    }
}
