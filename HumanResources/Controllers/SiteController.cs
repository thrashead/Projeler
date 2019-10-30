using Models;
using Repository.LangContentModel;
using Repository.TranslationModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using TDLibrary;

namespace HumanResources.Controllers
{
    public class SiteController : Controller
    {
        #region Translation

        [HttpGet]
        public JsonResult GetLangs()
        {
            Translation translation = new Translation();
            return Json(translation.List(), JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public JsonResult SelectedLang()
        {
            return Json((Translation)Session["CurrentLang"], JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public JsonResult SelectLang(int param)
        {
            Translation translation = new Translation();
            Session["CurrentLang"] = translation.Select(param);

            Session["SearchFilters"] = null;

            return Json(true, JsonRequestBehavior.AllowGet);
        }

        #endregion

        #region LangContent

        [HttpPost]
        public JsonResult SetLangContents([System.Web.Http.FromBody] List<LangItem> codes)
        {
            LangContent langContent = new LangContent();

            return Json(langContent.DetailSelect(codes, AppTools.GetLang.ID));
        }

        [HttpGet]
        public JsonResult GetLangContentByCode(string param, string param2)
        {
            LangContent langContent = new LangContent();

            if (param2.ToInteger() > 1 || param2 == null || param2 == "null")
                return Json(langContent.DetailSelectByCode(param, AppTools.GetLang.ID, param2.ToInteger()), JsonRequestBehavior.AllowGet);
            else
                return Json(langContent.DetailSelectByCode(param, AppTools.GetLang.ID, param2.ToInteger()).FirstOrDefault(), JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public JsonResult GetLangContentByShortCode(string param, string param2)
        {
            LangContent langContent = new LangContent();

            if (param2.ToInteger() > 1 || param2 == null || param2 == "null")
                return Json(langContent.DetailSelectByShortCode(param, AppTools.GetLang.ID, param2.ToInteger()), JsonRequestBehavior.AllowGet);
            else
                return Json(langContent.DetailSelectByShortCode(param, AppTools.GetLang.ID, param2.ToInteger()).FirstOrDefault(), JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public JsonResult GetLangContentByCodeAndShortCode(string param, string param2, string param3)
        {
            LangContent langContent = new LangContent();

            if (param3.ToInteger() > 1 || param3 == null || param3 == "null")
                return Json(langContent.DetailSelectByCodeAndShortCode(param, param2, AppTools.GetLang.ID, param3.ToInteger()), JsonRequestBehavior.AllowGet);
            else
                return Json(langContent.DetailSelectByCodeAndShortCode(param, param2, AppTools.GetLang.ID, param3.ToInteger()).FirstOrDefault(), JsonRequestBehavior.AllowGet);
        }

        #endregion
    }
}