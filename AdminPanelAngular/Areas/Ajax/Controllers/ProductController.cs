using System.Web.Mvc;
using TDLibrary;
using Repository.UsersModel;
using Repository.ProductModel;

namespace AdminPanelAngular.Areas.Ajax.Controllers
{
    public class ProductController : Controller
    {
        Product model = new Product();
        Users curUser = AppTools.User;

        [HttpGet]
        public JsonResult Index()
        {
            if (!curUser.HasRight("Product"))
                return Json(null, JsonRequestBehavior.AllowGet);

            return Json(model.List(), JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult Insert([System.Web.Http.FromBody] Product urun)
        {
            if (!curUser.HasRight("Product", "i"))
                return Json(null);

            urun.Url = urun.Title.ToUrl();

            bool result = model.Insert(urun);

            if (result)
            {
                curUser.Log(urun, "i", "Ürünler");

                return Json(urun);
            }
            else
                urun.Mesaj = "Kayýt eklenemedi.";

            return Json(urun);
        }

        [HttpGet]
        public JsonResult Update(int id)
        {
            if (!curUser.HasRight("Product", "u"))
                return Json(null, JsonRequestBehavior.AllowGet);

            return Json(model.Update(id), JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult Update([System.Web.Http.FromBody] Product urun)
        {
            if (!curUser.HasRight("Product", "u"))
                return Json(null);

            urun.Url = urun.Title.ToUrl();

            bool result = model.Update(urun);

            if (result)
            {
                curUser.Log(urun, "u", "Ürünler");

                return Json(urun);
            }
            else
                urun.Mesaj = "Kayýt düzenlenemedi.";

            urun = (Product)model.Update(urun.ID, urun);

            return Json(urun);
        }

        [HttpGet]
        public JsonResult Delete(int id)
        {
            if (!curUser.HasRight("Product", "d"))
                return Json(false, JsonRequestBehavior.AllowGet);

            bool result = model.Delete(id);

            if (result)
            {
                curUser.Log(id, "d", "Ürünler");

                return Json(true, JsonRequestBehavior.AllowGet);
            }

            return Json(false, JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public JsonResult Remove(int id)
        {
            if (!curUser.HasRight("Product", "r"))
                return Json(false, JsonRequestBehavior.AllowGet);

            bool result = model.Remove(id);

            if (result)
            {
                curUser.Log(id, "r", "Ürünler");

                return Json(true, JsonRequestBehavior.AllowGet);
            }

            return Json(false, JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public JsonResult Copy(int id)
        {
            if (!curUser.HasRight("Product", "c"))
                return Json(false, JsonRequestBehavior.AllowGet);

            bool result = model.Copy(id);

            if (result)
            {
                curUser.Log(id, "c", "Ürünler");

                return Json(true, JsonRequestBehavior.AllowGet);
            }

            return Json(false, JsonRequestBehavior.AllowGet);
        }
    }
}
