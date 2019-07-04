using System.Linq;
using System.Web.Mvc;
using System.Collections.Generic;
using Emlak.Data;
using TDLibrary;
using Models;

namespace Emlak.Areas.Ajax.Controllers
{
    public class KullaniciGrupIslemController : Controller
    {
        readonly EmlakEntities entity = new EmlakEntities();
        Users curUser = AppTools.User;

        [HttpGet]
        public JsonResult Index()
        {
            if (!curUser.HasRight("Kullanicilar"))
                return Json(null, JsonRequestBehavior.AllowGet);

            List<usp_UserGroupProcessSelect_Result> kullanici = entity.usp_UserGroupProcessSelect(null).ToList();

            curUser.Log<KullaniciGrupIslem>(null, "s", "Kullanýcý Grup Ýþlemleri");

            return Json(kullanici, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult Ekle([System.Web.Http.FromBody] KullaniciGrupIslem kullanici)
        {
            if (!curUser.HasRight("Kullanicilar", "i"))
                return Json(null);

            var result = entity.usp_UserGroupProcessInsert(kullanici.Name, kullanici.ShortName, kullanici.Description).FirstOrDefault();

            if (result != null)
            {
                curUser.Log(kullanici, "i", "Kullanýcý Grup Ýþlemleri");

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

            usp_UserGroupProcessSelectTop_Result table = entity.usp_UserGroupProcessSelectTop(id, 1).FirstOrDefault();

            KullaniciGrupIslem kullanici = table.ChangeModel<KullaniciGrupIslem>();

            return Json(kullanici, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult Duzenle([System.Web.Http.FromBody] KullaniciGrupIslem kullanici)
        {
            if (!curUser.HasRight("Kullanicilar", "u"))
                return Json(null);

            var result = entity.usp_UserGroupProcessUpdate(kullanici.ID, kullanici.Name, kullanici.ShortName, kullanici.Description).FirstOrDefault();

            if (result != null)
            {
                curUser.Log(kullanici, "u", "Kullanýcý Grup Ýþlemleri");

                return Json(kullanici);
            }
            else
                kullanici.Mesaj = "Kayýt düzenlenemedi.";

            return Json(kullanici);
        }

        [HttpGet]
        public JsonResult Sil(int id)
        {
            if (!curUser.HasRight("Kullanicilar", "d"))
                return Json(false, JsonRequestBehavior.AllowGet);

            try
            {
                entity.usp_UserGroupProcessDelete(id);

                curUser.Log(id, "rd", "Kullanýcý Grup Ýþlemleri");

                return Json(true, JsonRequestBehavior.AllowGet);
            }
            catch
            {
                return Json(false, JsonRequestBehavior.AllowGet);
            }
        }
    }
}
