using System.Web.Mvc;
using Repository.UsersModel;
using Repository.CategoryModel;

namespace HumanResources.Areas.Ajax.Controllers
{
    public class CategoryController : Controller
    {
        Category model = new Category();
        Users curUser = AppTools.User;

        [HttpGet]
        public JsonResult Index()
        {
            if (!curUser.HasRight("Category"))
                return Json(null, JsonRequestBehavior.AllowGet);

            return Json(model.List(), JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public JsonResult Insert()
        {
            if (!curUser.HasRight("Category", "i"))
                return Json(null, JsonRequestBehavior.AllowGet);

            return Json(model.Insert(), JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult Insert([System.Web.Http.FromBody] Category kategori)
        {
            if (!curUser.HasRight("Category", "i"))
                return Json(null);

            bool result = model.Insert(kategori);

            if (result)
            {
                curUser.Log(kategori, "i", "Kategoriler");

                return Json(kategori);
            }
            else
                kategori.Mesaj = "Kayýt eklenemedi.";

            kategori = (Category)model.Insert(kategori, null);

            return Json(kategori);
        }

        [HttpGet]
        public JsonResult Update(int id)
        {
            if (!curUser.HasRight("Category", "u"))
                return Json(null, JsonRequestBehavior.AllowGet);

            return Json(model.Update(id), JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult Update([System.Web.Http.FromBody] Category kategori)
        {
            if (!curUser.HasRight("Category", "u"))
                return Json(null);

            bool result = model.Update(kategori);

            if (result)
            {
                curUser.Log(kategori, "u", "Kategoriler");

                return Json(kategori);
            }
            else
                kategori.Mesaj = "Kayýt düzenlenemedi.";

            kategori = (Category)model.Update(kategori.ID, kategori);

            return Json(kategori);
        }

        [HttpGet]
        public JsonResult Delete(int id)
        {
            if (!curUser.HasRight("Category", "d"))
                return Json(false, JsonRequestBehavior.AllowGet);

            bool result = model.Delete(id);

            if (result)
            {
                curUser.Log(id, "d", "Kategoriler");

                return Json(true, JsonRequestBehavior.AllowGet);
            }

            return Json(false, JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public JsonResult Remove(int id)
        {
            if (!curUser.HasRight("Category", "r"))
                return Json(false, JsonRequestBehavior.AllowGet);

            bool result = model.Remove(id);

            if (result)
            {
                curUser.Log(id, "r", "Kategoriler");

                return Json(true, JsonRequestBehavior.AllowGet);
            }

            return Json(false, JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public JsonResult Copy(int id)
        {
            if (!curUser.HasRight("Category", "c"))
                return Json(false, JsonRequestBehavior.AllowGet);

            bool result = model.Copy(id);

            if (result)
            {
                curUser.Log(id, "c", "Kategoriler");

                return Json(true, JsonRequestBehavior.AllowGet);
            }

            return Json(false, JsonRequestBehavior.AllowGet);
        }
    }
}
