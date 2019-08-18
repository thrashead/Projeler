using System.Web.Mvc;
using Repository.UsersModel;
using Repository.TypesModel;

namespace AdminPanelAngular.Areas.Ajax.Controllers
{
    public class TypesController : Controller
    {
        Types model = new Types();
        Users curUser = AppTools.User;

        [HttpGet]
        public JsonResult Index()
        {
            if (!curUser.HasRight("Types"))
                return Json(null, JsonRequestBehavior.AllowGet);

            return Json(model.List(), JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult Insert([System.Web.Http.FromBody] Types tip)
        {
            if (!curUser.HasRight("Types", "i"))
                return Json(null);

            bool result = model.Insert(tip);

            if (result)
            {
                curUser.Log(tip, "i", "Tipler");

                return Json(tip);
            }
            else
                tip.Mesaj = "Kayýt eklenemedi.";

            return Json(tip);
        }

        [HttpGet]
        public JsonResult Update(int id)
        {
            if (!curUser.HasRight("Types", "u"))
                return Json(null, JsonRequestBehavior.AllowGet);

            return Json(model.Select(id), JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult Update([System.Web.Http.FromBody] Types tip)
        {
            if (!curUser.HasRight("Types", "u"))
                return Json(null);

            bool result = model.Update(tip);

            if (result)
            {
                curUser.Log(tip, "u", "Tipler");

                return Json(tip);
            }
            else
                tip.Mesaj = "Kayýt düzenlenemedi.";

            return Json(tip);
        }

        [HttpGet]
        public JsonResult Delete(int id)
        {
            if (!curUser.HasRight("Types", "d"))
                return Json(false, JsonRequestBehavior.AllowGet);

            bool result = model.Delete(id);

            if (result)
            {
                curUser.Log(id, "d", "Tipler");

                return Json(true, JsonRequestBehavior.AllowGet);
            }

            return Json(false, JsonRequestBehavior.AllowGet);
        }
    }
}
