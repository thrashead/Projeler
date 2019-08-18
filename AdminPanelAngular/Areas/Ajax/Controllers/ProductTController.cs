using System.Web.Mvc;
using Repository.UsersModel;
using Repository.ProductTModel;

namespace AdminPanelAngular.Areas.Ajax.Controllers
{
    public class ProductTController : Controller
    {
        ProductT model = new ProductT();
        Users curUser = AppTools.User;

        [HttpGet]
        public JsonResult Index()
        {
            if (!curUser.HasRight("Product"))
                return Json(null, JsonRequestBehavior.AllowGet);

            return Json(model.List(), JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public JsonResult Insert(int? linkID)
        {
            if (!curUser.HasRight("Urun", "i"))
                return Json(null, JsonRequestBehavior.AllowGet);

            return Json(model.Insert(linkID), JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult Insert([System.Web.Http.FromBody] ProductT urun)
        {
            if (!curUser.HasRight("Urun", "i"))
                return Json(null);

            if (urun.ProdID > 0)
            {
                bool result = model.Insert(urun);

                if (result)
                {
                    curUser.Log(urun, "i", "Ürünler (Dil)");

                    return Json(urun);
                }
                else
                    urun.Mesaj = "Kayýt eklenemedi veya ayný dilde zaten veri eklenmiþ.";
            }
            else
                urun.Mesaj = "Model uygun deðil.";

            urun = (ProductT)model.Insert(urun.ProdID, urun.TransID, urun);

            return Json(urun);
        }

        [HttpGet]
        public JsonResult Update(int id)
        {
            if (!curUser.HasRight("Urun", "u"))
                return Json(null, JsonRequestBehavior.AllowGet);

            return Json(model.Update(id), JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult Update([System.Web.Http.FromBody] ProductT urun)
        {
            if (!curUser.HasRight("Urun", "u"))
                return Json(null);

            bool result = model.Update(urun);

            if (result)
            {
                curUser.Log(urun, "u", "Ürünler (Dil)");

                return Json(urun);
            }
            else
                urun.Mesaj = "Kayýt düzenlenemedi veya ayný dilde zaten veri eklenmiþ.";

            urun = (ProductT)model.Update(urun.ID, urun);

            return Json(urun);
        }

        [HttpGet]
        public JsonResult Delete(int id)
        {
            if (!curUser.HasRight("Urun", "d"))
                return Json(false, JsonRequestBehavior.AllowGet);

            bool result = model.Delete(id);

            if (result)
            {
                curUser.Log(id, "d", "Ürünler (Dil)");

                return Json(true, JsonRequestBehavior.AllowGet);
            }

            return Json(false, JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public JsonResult Remove(int id)
        {
            if (!curUser.HasRight("Urun", "r"))
                return Json(false, JsonRequestBehavior.AllowGet);

            bool result = model.Remove(id);

            if (result)
            {
                curUser.Log(id, "r", "Ürünler (Dil)");

                return Json(true, JsonRequestBehavior.AllowGet);
            }

            return Json(false, JsonRequestBehavior.AllowGet);
        }
    }
}
