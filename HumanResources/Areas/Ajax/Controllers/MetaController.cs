using System.Web.Mvc;
using Repository.UsersModel;
using Repository.MetaModel;

namespace HumanResources.Areas.Ajax.Controllers
{
    public class MetaController : Controller
    {
        Meta model = new Meta();
        Users curUser = AppTools.User;

        [HttpGet]
        public JsonResult Index()
        {
            if (!curUser.HasRight("Meta"))
                return Json(null, JsonRequestBehavior.AllowGet);

            return Json(model.List(), JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult Insert([System.Web.Http.FromBody] Meta meta)
        {
            if (!curUser.HasRight("Meta", "i"))
                return Json(null);

            bool result = model.Insert(meta);

            if (result)
            {
                curUser.Log(meta, "i", "Meta");

                return Json(meta);
            }
            else
                meta.Mesaj = "Kayýt eklenemedi.";

            return Json(meta);
        }

        [HttpGet]
        public JsonResult Update(int id)
        {
            if (!curUser.HasRight("Meta", "u"))
                return Json(null, JsonRequestBehavior.AllowGet);

            return Json(model.Select(id), JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult Update([System.Web.Http.FromBody] Meta meta)
        {
            if (!curUser.HasRight("Meta", "u"))
                return Json(null);

            bool result = model.Update(meta);

            if (result)
            {
                curUser.Log(meta, "u", "Meta");

                return Json(meta);
            }
            else
                meta.Mesaj = "Kayýt düzenlenemedi.";

            meta = (Meta)model.Update(meta.ID, meta);

            return Json(meta);
        }

        [HttpGet]
        public JsonResult Delete(int id)
        {
            if (!curUser.HasRight("Meta", "d"))
                return Json(false, JsonRequestBehavior.AllowGet);

            bool result = model.Delete(id);

            if (result)
            {
                curUser.Log(id, "d", "Meta");

                return Json(true, JsonRequestBehavior.AllowGet);
            }

            return Json(false, JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public JsonResult Remove(int id)
        {
            if (!curUser.HasRight("Meta", "r"))
                return Json(false, JsonRequestBehavior.AllowGet);

            bool result = model.Remove(id);

            if (result)
            {
                curUser.Log(id, "r", "Meta");

                return Json(true, JsonRequestBehavior.AllowGet);
            }

            return Json(false, JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public JsonResult Copy(int id)
        {
            if (!curUser.HasRight("Meta", "c"))
                return Json(false, JsonRequestBehavior.AllowGet);

            bool result = model.Copy(id);

            if (result)
            {
                curUser.Log(id, "c", "Meta");

                return Json(true, JsonRequestBehavior.AllowGet);
            }

            return Json(false, JsonRequestBehavior.AllowGet);
        }
    }
}
