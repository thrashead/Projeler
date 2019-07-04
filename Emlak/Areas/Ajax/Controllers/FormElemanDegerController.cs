using System.Collections.Generic;
using System.Linq;
using System.Web.Mvc;
using Emlak.Data;
using TDLibrary;
using Models;

namespace Emlak.Areas.Ajax.Controllers
{
    public class FormElemanDegerController : Controller
    {
        readonly EmlakEntities entity = new EmlakEntities();
        Users curUser = AppTools.User;

        [HttpGet]
        public JsonResult Index()
        {
            if (!curUser.HasRight("FormEleman"))
                return Json(null, JsonRequestBehavior.AllowGet);

            List<usp_PropertyValuesWithPropertyNameSelect_Result> formeleman = entity.usp_PropertyValuesWithPropertyNameSelect(null).ToList();

            curUser.Log<FormElemanDeger>(null, "s", "Form Eleman Değerleri");

            return Json(formeleman, JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public JsonResult Ekle(int? linkID)
        {
            if (!curUser.HasRight("FormEleman", "i"))
                return Json(null, JsonRequestBehavior.AllowGet);

            FormElemanDeger formeleman = new FormElemanDeger();

            List<usp_PropertyHasValueSelect_Result> tableProperties = entity.usp_PropertyHasValueSelect(null).ToList();
            formeleman.PropertyList = tableProperties.ToSelectList("ID", "Title", linkID);

            return Json(formeleman, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult Ekle([System.Web.Http.FromBody] FormElemanDeger formeleman)
        {
            if (!curUser.HasRight("FormEleman", "i"))
                return Json(null);

            if (formeleman.PropID > 0)
            {
                var result = entity.usp_PropertyValuesInsert(formeleman.PropID, formeleman.Text, formeleman.Value, formeleman.Code).FirstOrDefault();

                if (result != null)
                {
                    curUser.Log(formeleman, "i", "Form Eleman Değerleri");

                    return Json(formeleman);
                }
                else
                    formeleman.Mesaj = "Kayıt eklenemedi.";
            }
            else
                formeleman.Mesaj = "Model uygun değil.";

            List<usp_PropertyHasValueSelect_Result> tableProperties = entity.usp_PropertyHasValueSelect(null).ToList();
            formeleman.PropertyList = tableProperties.ToSelectList("ID", "Title", formeleman.PropID);

            return Json(formeleman);
        }

        [HttpGet]
        public JsonResult Duzenle(int id)
        {
            if (!curUser.HasRight("FormEleman", "u"))
                return Json(null, JsonRequestBehavior.AllowGet);

            usp_PropertyValuesSelectTop_Result table = entity.usp_PropertyValuesSelectTop(id, 1).FirstOrDefault();

            FormElemanDeger formeleman = table.ChangeModel<FormElemanDeger>();

            List<usp_PropertyHasValueSelect_Result> tableProperties = entity.usp_PropertyHasValueSelect(null).ToList();
            formeleman.PropertyList = tableProperties.ToSelectList("ID", "Title", formeleman.PropID);

            return Json(formeleman, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult Duzenle([System.Web.Http.FromBody] FormElemanDeger formeleman)
        {
            if (!curUser.HasRight("FormEleman", "u"))
                return Json(null);

            var result = entity.usp_PropertyValuesUpdate(formeleman.ID, formeleman.PropID, formeleman.Text, formeleman.Value, formeleman.Code).FirstOrDefault();

            if (result != null)
            {
                curUser.Log(formeleman, "u", "Form Eleman Değerleri");

                return Json(formeleman);
            }
            else
                formeleman.Mesaj = "Kayıt düzenlenemedi.";

            List<usp_PropertyHasValueSelect_Result> tableProperties = entity.usp_PropertyHasValueSelect(null).ToList();
            formeleman.PropertyList = tableProperties.ToSelectList("ID", "Title", formeleman.PropID);

            return Json(formeleman);
        }

        [HttpGet]
        public JsonResult Sil(int id)
        {
            if (!curUser.HasRight("FormEleman", "d"))
                return Json(false, JsonRequestBehavior.AllowGet);

            try
            {
                entity.usp_PropertyValuesDelete(id);

                curUser.Log(id, "rd", "Form Eleman Değerleri");

                return Json(true, JsonRequestBehavior.AllowGet);
            }
            catch
            {
                return Json(false, JsonRequestBehavior.AllowGet);
            }
        }

        [HttpGet]
        public JsonResult Kopyala(int id)
        {
            if (!curUser.HasRight("FormEleman", "c"))
                return Json(false, JsonRequestBehavior.AllowGet);

            try
            {
                var result = entity.usp_PropertyValuesCopy(id);

                if (result != null)
                    curUser.Log(id, "c", "Form Eleman Değerleri");

                return Json(result == null ? false : true, JsonRequestBehavior.AllowGet);
            }
            catch
            {
                return Json(false, JsonRequestBehavior.AllowGet);
            }
        }
    }
}