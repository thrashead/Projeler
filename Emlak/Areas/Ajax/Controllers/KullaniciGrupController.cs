using System.Linq;
using System.Web.Mvc;
using System.Collections.Generic;
using Emlak.Data;
using TDLibrary;
using Models;

namespace Emlak.Areas.Ajax.Controllers
{
    public class KullaniciGrupController : Controller
    {
        readonly EmlakEntities entity = new EmlakEntities();
        Users curUser = AppTools.User;

        [HttpGet]
        public JsonResult Index()
        {
            if (!curUser.HasRight("Kullanicilar"))
                return Json(null, JsonRequestBehavior.AllowGet);

            List<usp_UserGroupsSelect_Result> kullanici = entity.usp_UserGroupsSelect(null).ToList();

            curUser.Log<KullaniciGrup>(null, "s", "Kullanýcý Gruplarý");

            return Json(kullanici, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult Ekle([System.Web.Http.FromBody] KullaniciGrup kullanici)
        {
            if (!curUser.HasRight("Kullanicilar", "i"))
                return Json(null);

            var result = entity.usp_UserGroupsInsert(kullanici.Name, kullanici.ShortName, kullanici.Description).FirstOrDefault();

            if (result != null)
            {
                curUser.Log(kullanici, "i", "Kullanýcý Gruplarý");

                return Json(kullanici);
            }
            else
                kullanici.Mesaj = "Kayýt eklenemedi.";

            return Json(kullanici);
        }

        [HttpGet]
        public JsonResult Duzenle(int id)
        {
            if (!curUser.HasRight("Kullanicilar", "u"))
                return Json(null, JsonRequestBehavior.AllowGet);

            usp_UserGroupsSelectTop_Result table = entity.usp_UserGroupsSelectTop(id, 1).FirstOrDefault();

            KullaniciGrup kullanici = table.ChangeModel<KullaniciGrup>();

            kullanici.UserGroupTablesList = entity.usp_UserGroupTablesDetailSelect(id).ToList().ChangeModelList<KullaniciGrupTablo, usp_UserGroupTablesDetailSelect_Result>();
            kullanici.UserGroupRightsList = entity.usp_UserGroupRightsDetailSelect(id).ToList().ChangeModelList<KullaniciGrupHak, usp_UserGroupRightsDetailSelect_Result>();
            kullanici.UsersList = entity.usp_UsersDetailSelect(id).ToList().ChangeModelList<Kullanicilar, usp_UsersDetailSelect_Result>();

            return Json(kullanici, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult Duzenle([System.Web.Http.FromBody] KullaniciGrup kullanici)
        {
            if (!curUser.HasRight("Kullanicilar", "u"))
                return Json(null);

            var result = entity.usp_UserGroupsUpdate(kullanici.ID, kullanici.Name, kullanici.ShortName, kullanici.Description).FirstOrDefault();

            if (result != null)
            {
                curUser.Log(kullanici, "u", "Kullanýcý Gruplarý");

                return Json(kullanici);
            }
            else
                kullanici.Mesaj = "Kayýt düzenlenemedi.";

            kullanici.UserGroupTablesList = entity.usp_UserGroupTablesDetailSelect(kullanici.ID).ToList().ChangeModelList<KullaniciGrupTablo, usp_UserGroupTablesDetailSelect_Result>();
            kullanici.UserGroupRightsList = entity.usp_UserGroupRightsDetailSelect(kullanici.ID).ToList().ChangeModelList<KullaniciGrupHak, usp_UserGroupRightsDetailSelect_Result>();
            kullanici.UsersList = entity.usp_UsersDetailSelect(kullanici.ID).ToList().ChangeModelList<Kullanicilar, usp_UsersDetailSelect_Result>();

            return Json(kullanici);
        }

        [HttpGet]
        public JsonResult Sil(int id)
        {
            if (!curUser.HasRight("Kullanicilar", "d"))
                return Json(false, JsonRequestBehavior.AllowGet);

            try
            {
                entity.usp_UserGroupsCheckDelete(id);

                curUser.Log(id, "rd", "Kullanýcý Gruplarý");

                return Json(true, JsonRequestBehavior.AllowGet);
            }
            catch
            {
                return Json(false, JsonRequestBehavior.AllowGet);
            }
        }
    }
}
