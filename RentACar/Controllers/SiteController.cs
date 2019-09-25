using Repository.BlogCategoryModel;
using Repository.BlogModel;
using Repository.CarFeatsBodyTypeModel;
using Repository.CarFeatsDriveTypeModel;
using Repository.CarFeatsEngineTypeModel;
using Repository.CarFeatsFuelTypeModel;
using Repository.CarFeatsGearsTypeModel;
using Repository.CarFeatsMakeModel;
using Repository.CarFeatsModelModel;
using Repository.CarStatusModel;
using Repository.ContentModel;
using Repository.LangContentModel;
using Repository.NoLangContentModel;
using Repository.PicturesModel;
using Repository.TranslationModel;
using Repository.WorkersModel;
using System.Linq;
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

        #region Blog

        [HttpGet]
        public JsonResult GetBlogCategories(string param)
        {
            BlogCategory categories = new BlogCategory();

            if (param.ToInteger() > 1 || param == null || param == "null")
                return Json(categories.BlogCategoryDetailSelectAll(AppTools.GetLang.ID, param.ToInteger()), JsonRequestBehavior.AllowGet);
            else
                return Json(categories.BlogCategoryDetailSelectAll(AppTools.GetLang.ID, param.ToInteger()).FirstOrDefault(), JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public JsonResult GetBlogPosts(string param, string param2)
        {
            Blog blog = new Blog();

            if (param.ToInteger() > 1 || param == null || param == "null")
                return Json(blog.DetailSelect(param2.ToInteger(), AppTools.GetLang.ID, param.ToInteger()), JsonRequestBehavior.AllowGet);
            else
                return Json(blog.DetailSelect(param2.ToInteger(), AppTools.GetLang.ID, param.ToInteger()).FirstOrDefault(), JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public JsonResult GetBlogPostsByCode(string param, string param2)
        {
            Blog blog = new Blog();

            if (param2.ToInteger() > 1 || param2 == null || param2 == "null")
                return Json(blog.DetailSelectByCode(param, AppTools.GetLang.ID, param2.ToInteger()), JsonRequestBehavior.AllowGet);
            else
                return Json(blog.DetailSelectByCode(param, AppTools.GetLang.ID, param2.ToInteger()).FirstOrDefault(), JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public JsonResult GetPopularBlogPosts(string param)
        {
            Blog blog = new Blog();

            if (param.ToInteger() > 1 || param == null || param == "null")
                return Json(blog.PopularSelect(AppTools.GetLang.ID, param.ToInteger()), JsonRequestBehavior.AllowGet);
            else
                return Json(blog.PopularSelect(AppTools.GetLang.ID, param.ToInteger()).FirstOrDefault(), JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public JsonResult GetBlogPostByUrl(string param)
        {
            Blog blog = new Blog();

            return Json(blog.DetailSelectByUrl(param, AppTools.GetLang.ID), JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public JsonResult GetBlogSimilarPosts(string param, string param2)
        {
            Blog blog = new Blog();

            if (param2.ToInteger() > 1 || param2 == null || param2 == "null")
                return Json(blog.SimilarSelect(param, AppTools.GetLang.ID, param2.ToInteger()), JsonRequestBehavior.AllowGet);
            else
                return Json(blog.SimilarSelect(param, AppTools.GetLang.ID, param2.ToInteger()).FirstOrDefault(), JsonRequestBehavior.AllowGet);
        }

        #endregion

        #region CarFeatures

        [HttpGet]
        public JsonResult GetCarMakes()
        {
            CarFeatsMake makes = new CarFeatsMake();

            return Json(makes.CarMakesSelect(), JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public JsonResult GetCarModelsByCode(string param)
        {
            CarFeatsModel model = new CarFeatsModel();

            return Json(model.CarModelsByCode(param), JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public JsonResult GetCarModelsByID(string param, string param2)
        {
            CarFeatsModel model = new CarFeatsModel();

            return Json(model.CarModelsByID(param.ToInteger(), param2.ToInteger()), JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public JsonResult GetCarStatus()
        {
            CarStatus carStatus = new CarStatus();

            return Json(carStatus.CarStatusSelect(AppTools.GetLang.ID), JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public JsonResult GetBodyTypes()
        {
            CarFeatsBodyType bodyType = new CarFeatsBodyType();

            return Json(bodyType.BodyTypesSelect(AppTools.GetLang.ID), JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public JsonResult GetGearTypes()
        {
            CarFeatsGearsType gearType = new CarFeatsGearsType();

            return Json(gearType.GearTypesSelect(AppTools.GetLang.ID), JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public JsonResult GetFuelTypes()
        {
            CarFeatsFuelType fuelType = new CarFeatsFuelType();

            return Json(fuelType.FuelTypesSelect(AppTools.GetLang.ID), JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public JsonResult GetDriveTypes()
        {
            CarFeatsDriveType driveType = new CarFeatsDriveType();

            return Json(driveType.DriveTypesSelect(AppTools.GetLang.ID), JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public JsonResult GetEngineTypes()
        {
            CarFeatsEngineType engineType = new CarFeatsEngineType();

            return Json(engineType.EngineTypesSelect(AppTools.GetLang.ID), JsonRequestBehavior.AllowGet);
        }

        #endregion

        #region Workers

        [HttpGet]
        public JsonResult GetWorkers()
        {
            Workers workers = new Workers();

            return Json(workers.WorkersDetailSelectAll(AppTools.GetLang.ID), JsonRequestBehavior.AllowGet);
        }

        #endregion

        #region LangContent

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

        #region NoLangContent

        [HttpGet]
        public JsonResult GetNoLangContentByCode(string param, string param2)
        {
            NoLangContent noLangContent = new NoLangContent();

            if (param2.ToInteger() > 1 || param2 == null || param2 == "null")
                return Json(noLangContent.DetailSelectByCode(param, param2.ToInteger()), JsonRequestBehavior.AllowGet);
            else
                return Json(noLangContent.DetailSelectByCode(param, param2.ToInteger()).FirstOrDefault(), JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public JsonResult GetNoLangContentByShortCode(string param, string param2)
        {
            NoLangContent noLangContent = new NoLangContent();

            if (param2.ToInteger() > 1 || param2 == null || param2 == "null")
                return Json(noLangContent.DetailSelectByShortCode(param, param2.ToInteger()), JsonRequestBehavior.AllowGet);
            else
                return Json(noLangContent.DetailSelectByShortCode(param, param2.ToInteger()).FirstOrDefault(), JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public JsonResult GetNoLangContentByCodeAndShortCode(string param, string param2, string param3)
        {
            NoLangContent noLangContent = new NoLangContent();

            if (param3.ToInteger() > 1 || param3 == null || param3 == "null")
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

            if (param2.ToInteger() > 1 || param2 == null || param2 == "null")
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

        [HttpGet]
        public JsonResult GetPicturesByCode(string param, string param2)
        {
            Pictures pictures = new Pictures();

            if (param2.ToInteger() > 1 || param2 == null || param2 == "null")
                return Json(pictures.PicturesByCode(param, param2.ToInteger()), JsonRequestBehavior.AllowGet);
            else
                return Json(pictures.PicturesByCode(param, param2.ToInteger()).FirstOrDefault(), JsonRequestBehavior.AllowGet);
        }

        #endregion
    }
}