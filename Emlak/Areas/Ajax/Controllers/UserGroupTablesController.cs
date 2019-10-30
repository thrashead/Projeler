using System.Linq;
using System.Web.Mvc;
using System.Collections.Generic;
using Emlak.Data;
using TDLibrary;
using Models;

namespace Emlak.Areas.Ajax.Controllers
{
    public class UserGroupTablesController : Controller
    {
        readonly EmlakEntities entity = new EmlakEntities();
        Kullanicilar curUser = AppTools.User;

        [HttpGet]
        public JsonResult Index()
        {
            if (!curUser.HasRight("Users"))
                return Json(null, JsonRequestBehavior.AllowGet);

            List<usp_UserGroupTablesDetailSelect_Result> kullanici = entity.usp_UserGroupTablesDetailSelect(null).ToList();

            return Json(kullanici, JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public JsonResult Insert(int? linkID)
        {
            if (!curUser.HasRight("Users", "i"))
                return Json(null, JsonRequestBehavior.AllowGet);

            KullaniciGrupTablo kullanici = new KullaniciGrupTablo();

            List<UserGroups> tableUserGroups = entity.UserGroups.ToList();
            kullanici.UserGroupsList = tableUserGroups.ToSelectList("ID", "Name", linkID);

            List<Types> tableTypes = entity.Types.ToList();
            kullanici.TypesList = tableTypes.ToSelectList("ID", "TypeName");

            return Json(kullanici, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult Insert([System.Web.Http.FromBody] KullaniciGrupTablo kullanici)
        {
            if (!curUser.HasRight("Users", "i"))
                return Json(null);

            var result = entity.usp_UserGroupTablesCheckInsert(kullanici.TypeID, kullanici.UserGroupID).FirstOrDefault();

            if (result != null)
            {
                curUser.Log(kullanici, "i", "Kullanýcý Grup Tablolarý");

                return Json(kullanici);
            }
            else
                kullanici.Mesaj = "Kayýt eklenemedi veya bu þekilde bir Kullanýcý Grup Tablosu zaten eklenmiþ.";

            List<UserGroups> tableUserGroups = entity.UserGroups.ToList();
            kullanici.UserGroupsList = tableUserGroups.ToSelectList("ID", "Name", kullanici.UserGroupID);

            List<Types> tableTypes = entity.Types.ToList();
            kullanici.TypesList = tableTypes.ToSelectList("ID", "TypeName", kullanici.TypeID);

            return Json(kullanici);
        }

        [HttpGet]
        public JsonResult Update(int id)
        {
            if (!curUser.HasRight("Users", "u"))
                return Json(null, JsonRequestBehavior.AllowGet);

            usp_UserGroupTablesSelectTop_Result table = entity.usp_UserGroupTablesSelectTop(id, 1).FirstOrDefault();

            KullaniciGrupTablo kullanici = table.ChangeModel<KullaniciGrupTablo>();

            List<UserGroups> tableUserGroups = entity.UserGroups.ToList();
            kullanici.UserGroupsList = tableUserGroups.ToSelectList("ID", "Name", kullanici.UserGroupID);

            List<Types> tableTypes = entity.Types.ToList();
            kullanici.TypesList = tableTypes.ToSelectList("ID", "TypeName", kullanici.TypeID);

            return Json(kullanici, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult Update([System.Web.Http.FromBody] KullaniciGrupTablo kullanici)
        {
            if (!curUser.HasRight("Users", "u"))
                return Json(null);

            var result = entity.usp_UserGroupTablesCheckUpdate(kullanici.ID, kullanici.TypeID, kullanici.UserGroupID).FirstOrDefault();

            if (result != null)
            {
                curUser.Log(kullanici, "u", "Kullanýcý Grup Tablolarý");

                return Json(kullanici);
            }
            else
                kullanici.Mesaj = "Kayýt düzenlenemedi veya bu þekilde bir Kullanýcý Grup Tablosu zaten eklenmiþ.";

            List<UserGroups> tableUserGroups = entity.UserGroups.ToList();
            kullanici.UserGroupsList = tableUserGroups.ToSelectList("ID", "Name", kullanici.UserGroupID);

            List<Types> tableTypes = entity.Types.ToList();
            kullanici.TypesList = tableTypes.ToSelectList("ID", "TypeName", kullanici.TypeID);

            return Json(kullanici);
        }

        [HttpGet]
        public JsonResult Delete(int id)
        {
            if (!curUser.HasRight("Users", "d"))
                return Json(false, JsonRequestBehavior.AllowGet);

            try
            {
                entity.usp_UserGroupTablesCheckDelete(id);

                curUser.Log(id, "d", "Kullanýcý Grup Tablolarý");

                return Json(true, JsonRequestBehavior.AllowGet);
            }
            catch
            {
                return Json(false, JsonRequestBehavior.AllowGet);
            }
        }
    }
}
