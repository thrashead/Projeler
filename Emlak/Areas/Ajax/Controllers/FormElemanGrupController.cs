using System.Collections.Generic;
using System.Linq;
using System.Web.Mvc;
using Emlak.Data;
using TDLibrary;
using Models;

namespace Emlak.Areas.Ajax.Controllers
{
    public class FormElemanGrupController : Controller
    {
        readonly EmlakEntities entity = new EmlakEntities();
        Users curUser = AppTools.User;

        [HttpGet]
        public JsonResult Index()
        {
            if (!curUser.HasRight("FormEleman"))
                return Json(null, JsonRequestBehavior.AllowGet);

            List<usp_PropertyGroupSelect_Result> formeleman = entity.usp_PropertyGroupSelect(null).ToList();

            return Json(formeleman, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult Ekle([System.Web.Http.FromBody] FormElemanGrup formeleman)
        {
            if (!curUser.HasRight("FormEleman", "i"))
                return Json(null);

            var result = entity.usp_PropertyGroupInsert(formeleman.Title, formeleman.Description, formeleman.Code, formeleman.Active).FirstOrDefault();

            if (result != null)
            {
                curUser.Log(formeleman, "i", "Form Eleman Gruplarý");

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

            usp_PropertyGroupSelectTop_Result table = entity.usp_PropertyGroupSelectTop(id, 1).FirstOrDefault();
            FormElemanGrup formeleman = table.ChangeModel<FormElemanGrup>();

            List<usp_PropertyByGroupIDSelect_Result> formelemanGrupList = entity.usp_PropertyByGroupIDSelect(id).ToList();
            formeleman.PropertyList.AddRange(formelemanGrupList.ChangeModelList<FormEleman, usp_PropertyByGroupIDSelect_Result>());

            return Json(formeleman, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult Duzenle([System.Web.Http.FromBody] FormElemanGrup formeleman)
        {
            if (!curUser.HasRight("FormEleman", "u"))
                return Json(null);

            var result = entity.usp_PropertyGroupUpdate(formeleman.ID, formeleman.Title, formeleman.Description, formeleman.Code, formeleman.Active).FirstOrDefault();

            if (result != null)
            {
                curUser.Log(formeleman, "u", "Form Eleman Gruplarý");

                return Json(formeleman);
            }
            else
                formeleman.Mesaj = "Kayýt düzenlenemedi.";

            List<usp_PropertyByGroupIDSelect_Result> formelemanGrupList = entity.usp_PropertyByGroupIDSelect(formeleman.ID).ToList();
            formeleman.PropertyList.AddRange(formelemanGrupList.ChangeModelList<FormEleman, usp_PropertyByGroupIDSelect_Result>());

            return Json(formeleman);
        }

        [HttpGet]
        public JsonResult Sil(int id)
        {
            if (!curUser.HasRight("FormEleman", "d"))
                return Json(false, JsonRequestBehavior.AllowGet);

            try
            {
                entity.usp_PropertyGroupCheckDelete(id);

                curUser.Log(id, "rd", "Form Eleman Gruplarý");

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
                var result = entity.usp_PropertyGroupCopy(id);

                if (result != null)
                    curUser.Log(id, "c", "Form Eleman Gruplarý");

                return Json(result == null ? false : true, JsonRequestBehavior.AllowGet);
            }
            catch
            {
                return Json(false, JsonRequestBehavior.AllowGet);
            }
        }
    }
}