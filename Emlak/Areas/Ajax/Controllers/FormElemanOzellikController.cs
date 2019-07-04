using System.Collections.Generic;
using System.Linq;
using System.Web.Mvc;
using Emlak.Data;
using TDLibrary;
using Models;

namespace Emlak.Areas.Ajax.Controllers
{
    public class FormElemanOzellikController : Controller
    {
        readonly EmlakEntities entity = new EmlakEntities();
        Users curUser = AppTools.User;

        [HttpGet]
        public JsonResult Index()
        {
            if (!curUser.HasRight("FormEleman"))
                return Json(null, JsonRequestBehavior.AllowGet);

            List<usp_PropertyAttributesWithPropertyNameSelect_Result> formeleman = entity.usp_PropertyAttributesWithPropertyNameSelect(null).ToList();

            curUser.Log<FormElemanOzellik>(null, "s", "Form Eleman Özellikleri");

            return Json(formeleman, JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public JsonResult Ekle(int? linkID)
        {
            if (!curUser.HasRight("FormEleman", "i"))
                return Json(null, JsonRequestBehavior.AllowGet);

            FormElemanOzellik formeleman = new FormElemanOzellik();

            List<Property> tableProperties = entity.Property.ToList();
            formeleman.PropertyList = tableProperties.ToSelectList("ID", "Title", linkID);

            return Json(formeleman, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult Ekle([System.Web.Http.FromBody] FormElemanOzellik formeleman)
        {
            if (!curUser.HasRight("FormEleman", "i"))
                return Json(null);

            if (formeleman.PropID > 0)
            {
                var result = entity.usp_PropertyAttributesInsert(formeleman.PropID, formeleman.Name, formeleman.Value).FirstOrDefault();

                if (result != null)
                {
                    curUser.Log(formeleman, "i", "Form Eleman Özellikleri");

                    return Json(formeleman);
                }
                else
                    formeleman.Mesaj = "Kayıt eklenemedi.";
            }
            else
                formeleman.Mesaj = "Model uygun değil.";

            List<Property> tableProperties = entity.Property.ToList();
            formeleman.PropertyList = tableProperties.ToSelectList("ID", "Title", formeleman.PropID);

            return Json(formeleman);
        }

        [HttpGet]
        public JsonResult Duzenle(int id)
        {
            if (!curUser.HasRight("FormEleman", "u"))
                return Json(null, JsonRequestBehavior.AllowGet);

            usp_PropertyAttributesSelectTop_Result table = entity.usp_PropertyAttributesSelectTop(id, 1).FirstOrDefault();

            FormElemanOzellik formeleman = table.ChangeModel<FormElemanOzellik>();

            List<Property> tableProperties = entity.Property.ToList();
            formeleman.PropertyList = tableProperties.ToSelectList("ID", "Title", formeleman.PropID);

            return Json(formeleman, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult Duzenle([System.Web.Http.FromBody] FormElemanOzellik formeleman)
        {
            if (!curUser.HasRight("FormEleman", "u"))
                return Json(null);

            var result = entity.usp_PropertyAttributesUpdate(formeleman.ID, formeleman.PropID, formeleman.Name, formeleman.Value).FirstOrDefault();

            if (result != null)
            {
                curUser.Log(formeleman, "u", "Form Eleman Özellikleri");

                return Json(formeleman);
            }
            else
                formeleman.Mesaj = "Kayıt düzenlenemedi.";

            List<Property> tableProperties = entity.Property.ToList();
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
                entity.usp_PropertyAttributesDelete(id);

                curUser.Log(id, "rd", "Form Eleman Özellikleri");

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
                var result = entity.usp_PropertyAttributesCopy(id);

                if (result != null)
                    curUser.Log(id, "c", "Form Eleman Özellikleri");

                return Json(result == null ? false : true, JsonRequestBehavior.AllowGet);
            }
            catch
            {
                return Json(false, JsonRequestBehavior.AllowGet);
            }
        }
    }
}
