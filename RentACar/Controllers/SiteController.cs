﻿using Repository.CategoryModel;
using Repository.ContentModel;
using Repository.LangContentModel;
using Repository.NoLangContentModel;
using Repository.PicturesModel;
using Repository.TranslationModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using TDLibrary;

namespace RentACar.Controllers
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

            return Json(true, JsonRequestBehavior.AllowGet);
        }

        #endregion

        #region Category

        [HttpGet]
        public JsonResult SubCategoriesByCode(string param)
        {
            Category category = new Category();

            return Json(category.SubCategoriesByCode(param, AppTools.GetLang.ID), JsonRequestBehavior.AllowGet);
        }

        #endregion

        #region LangContent

        [HttpGet]
        public JsonResult GetLangContentByCode(string param, string param2)
        {
            LangContent langContent = new LangContent();

            if (param2.ToInteger() > 1 || param2 == "null")
                return Json(langContent.DetailSelectByCode(param, AppTools.GetLang.ID, param2.ToInteger()), JsonRequestBehavior.AllowGet);
            else
                return Json(langContent.DetailSelectByCode(param, AppTools.GetLang.ID, param2.ToInteger()).FirstOrDefault(), JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public JsonResult GetLangContentByShortCode(string param, string param2)
        {
            LangContent langContent = new LangContent();

            if (param2.ToInteger() > 1 || param2 == "null")
                return Json(langContent.DetailSelectByShortCode(param, AppTools.GetLang.ID, param2.ToInteger()), JsonRequestBehavior.AllowGet);
            else
                return Json(langContent.DetailSelectByShortCode(param, AppTools.GetLang.ID, param2.ToInteger()).FirstOrDefault(), JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public JsonResult GetLangContentByCodeAndShortCode(string param, string param2, string param3)
        {
            LangContent langContent = new LangContent();

            if (param3.ToInteger() > 1 || param3 == "null")
                return Json(langContent.DetailSelectByCodeAndShortCode(param, param2, AppTools.GetLang.ID, param3.ToInteger()), JsonRequestBehavior.AllowGet);
            else
                return Json(langContent.DetailSelectByCodeAndShortCode(param, param2, AppTools.GetLang.ID, param3.ToInteger()).FirstOrDefault(), JsonRequestBehavior.AllowGet);
        }

        #endregion

        #region NoLangContent

        [HttpGet]
        public JsonResult GetNoLangContentByCode(string param, string param2)
        {
            NoLangContent noLangContent = new NoLangContent();

            if (param2.ToInteger() > 1 || param2 == "null")
                return Json(noLangContent.DetailSelectByCode(param, param2.ToInteger()), JsonRequestBehavior.AllowGet);
            else
                return Json(noLangContent.DetailSelectByCode(param, param2.ToInteger()).FirstOrDefault(), JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public JsonResult GetNoLangContentByShortCode(string param, string param2)
        {
            NoLangContent noLangContent = new NoLangContent();

            if (param2.ToInteger() > 1 || param2 == "null")
                return Json(noLangContent.DetailSelectByShortCode(param, param2.ToInteger()), JsonRequestBehavior.AllowGet);
            else
                return Json(noLangContent.DetailSelectByShortCode(param, param2.ToInteger()).FirstOrDefault(), JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public JsonResult GetNoLangContentByCodeAndShortCode(string param, string param2, string param3)
        {
            NoLangContent noLangContent = new NoLangContent();

            if (param3.ToInteger() > 1 || param3 == "null")
                return Json(noLangContent.DetailSelectByCodeAndShortCode(param, param2, param3.ToInteger()), JsonRequestBehavior.AllowGet);
            else
                return Json(noLangContent.DetailSelectByCodeAndShortCode(param, param2, param3.ToInteger()).FirstOrDefault(), JsonRequestBehavior.AllowGet);
        }

        #endregion

        #region Content

        [HttpGet]
        public JsonResult GetContentByCode(string param, string param2)
        {
            Content content = new Content();

            if (param2.ToInteger() > 1 || param2 == "null")
                return Json(content.DetailSelectByCode(param, AppTools.GetLang.ID, param2.ToInteger()), JsonRequestBehavior.AllowGet);
            else
                return Json(content.DetailSelectByCode(param, AppTools.GetLang.ID, param2.ToInteger()).FirstOrDefault(), JsonRequestBehavior.AllowGet);
        }

        #endregion

        #region Pictures

        [HttpGet]
        public JsonResult MainSliderByCode(string param)
        {
            Pictures pictures = new Pictures();

            return Json(pictures.MainSliderByCode(param, AppTools.GetLang.ID), JsonRequestBehavior.AllowGet);
        }

        #endregion
    }
}