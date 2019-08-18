using System.Web.Mvc;
using Repository.UsersModel;
using Repository.CategoryTModel;

namespace AdminPanelAngular.Areas.Ajax.Controllers
{
    public class CategoryTController : Controller
    {
        CategoryT model = new CategoryT();
        Users curUser = AppTools.User;

        [HttpGet]
        public JsonResult Index()
        {
            if (!curUser.HasRight("Category"))
                return Json(null, JsonRequestBehavior.AllowGet);

            return Json(model.List(), JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public JsonResult Insert(int? linkID)
        {
            if (!curUser.HasRight("Category", "i"))
                return Json(null, JsonRequestBehavior.AllowGet);

            return Json(model.Insert(linkID), JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult Insert([System.Web.Http.FromBody] CategoryT kategori)
        {
            if (!curUser.HasRight("Category", "i"))
                return Json(null);

            if (kategori.CatID > 0)
            {
                bool result = model.Insert(kategori);

                if (result)
                {
                    curUser.Log(kategori, "i", "Kategoriler (Dil)");

                    return Json(kategori);
                }
                else
                    kategori.Mesaj = "Kayýt eklenemedi veya ayný dilde zaten veri eklenmiþ.";
            }
            else
                kategori.Mesaj = "Model uygun deðil.";

            kategori = (CategoryT)model.Insert(kategori.CatID, kategori.TransID, kategori);

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
        public JsonResult Update([System.Web.Http.FromBody] CategoryT kategori)
        {
            if (!curUser.HasRight("Category", "u"))
                return Json(null);

            bool result = model.Update(kategori);

            if (result)
            {
                curUser.Log(kategori, "u", "Kategoriler (Dil)");

                return Json(kategori);
            }
            else
                kategori.Mesaj = "Kayýt düzenlenemedi veya ayný dilde zaten veri eklenmiþ.";

            kategori = (CategoryT)model.Update(kategori.ID, kategori);

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
                curUser.Log(id, "d", "Kategoriler (Dil)");

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
                curUser.Log(id, "r", "Kategoriler (Dil)");

                return Json(true, JsonRequestBehavior.AllowGet);
            }

            return Json(false, JsonRequestBehavior.AllowGet);
        }
    }
}
