using System.Linq;
using System.Web.Mvc;
using System.Collections.Generic;
using Emlak.Data;
using TDLibrary;
using Models;

namespace Emlak.Areas.Ajax.Controllers
{
    public class FormTiplerController : Controller
    {
        readonly EmlakEntities entity = new EmlakEntities();
        Users curUser = AppTools.User;

        [HttpGet]
        public JsonResult Index()
        {
            if (!curUser.HasRight("FormEleman"))
                return Json(null, JsonRequestBehavior.AllowGet);

            List<usp_PropertyTypesSelect_Result> formeleman = entity.usp_PropertyTypesSelect(null).ToList();

            return Json(formeleman, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult Ekle([System.Web.Http.FromBody] FormTipler formeleman)
        {
            if (!curUser.HasRight("FormEleman", "i"))
                return Json(null);

            var result = entity.usp_PropertyTypesInsert(formeleman.Name, formeleman.Type, formeleman.ShortName, formeleman.HasValue).FirstOrDefault();

            if (result != null)
            {
                curUser.Log(formeleman, "i", "Form Tipleri");

                return Json(formeleman);
            }
            else
                formeleman.Mesaj = "Kayýt eklenemedi.";

            return Json(formeleman);
        }

        [HttpGet]
        public JsonResult Duzenle(int id)
        {
            if (!curUser.HasRight("FormEleman", "u"))
                return Json(null, JsonRequestBehavior.AllowGet);

            usp_PropertyTypesSelectTop_Result table = entity.usp_PropertyTypesSelectTop(id, 1).FirstOrDefault();

            FormTipler formeleman = table.ChangeModel<FormTipler>();

            return Json(formeleman, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult Duzenle([System.Web.Http.FromBody] FormTipler formeleman)
        {
            if (!curUser.HasRight("FormEleman", "u"))
                return Json(null);

            var result = entity.usp_PropertyTypesUpdate(formeleman.ID, formeleman.Name, formeleman.Type, formeleman.ShortName, formeleman.HasValue).FirstOrDefault();

            if (result != null)
            {
                curUser.Log(formeleman, "u", "Form Tipleri");

                return Json(formeleman);
            }
            else
                formeleman.Mesaj = "Kayýt düzenlenemedi.";

            return Json(formeleman);
        }

        [HttpGet]
        public JsonResult Sil(int id)
        {
            if (!curUser.HasRight("FormEleman", "d"))
                return Json(false, JsonRequestBehavior.AllowGet);

            try
            {
                entity.usp_PropertyTypesCheckDelete(id);

                curUser.Log(id, "rd", "Form Tipleri");

                return Json(true, JsonRequestBehavior.AllowGet);
            }
            catch
            {
                return Json(false, JsonRequestBehavior.AllowGet);
            }
        }
    }
}
