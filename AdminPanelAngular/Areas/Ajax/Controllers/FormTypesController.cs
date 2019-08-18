using System.Web.Mvc;
using Repository.UsersModel;
using Repository.FormTypesModel;

namespace AdminPanelAngular.Areas.Ajax.Controllers
{
    public class FormTypesController : Controller
    {
        FormTypes model = new FormTypes();
        Users curUser = AppTools.User;

        [HttpGet]
        public JsonResult Index()
        {
            if (!curUser.HasRight("FormItems"))
                return Json(null, JsonRequestBehavior.AllowGet);

            return Json(model.List(), JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult Insert([System.Web.Http.FromBody] FormTypes formeleman)
        {
            if (!curUser.HasRight("FormItems", "i"))
                return Json(null);

            bool result = model.Insert(formeleman);

            if (result)
            {
                curUser.Log(formeleman, "i", "Form Tipleri");

                return Json(formeleman);
            }
            else
                formeleman.Mesaj = "Kayýt eklenemedi.";

            return Json(formeleman);
        }

        [HttpGet]
        public JsonResult Update(int id)
        {
            if (!curUser.HasRight("FormItems", "u"))
                return Json(null, JsonRequestBehavior.AllowGet);

            return Json(model.Select(id), JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult Update([System.Web.Http.FromBody] FormTypes formeleman)
        {
            if (!curUser.HasRight("FormItems", "u"))
                return Json(null);

            bool result = model.Update(formeleman);

            if (result)
            {
                curUser.Log(formeleman, "u", "Form Tipleri");

                return Json(formeleman);
            }
            else
                formeleman.Mesaj = "Kayýt düzenlenemedi.";

            return Json(formeleman);
        }

        [HttpGet]
        public JsonResult Delete(int id)
        {
            if (!curUser.HasRight("FormItems", "d"))
                return Json(false, JsonRequestBehavior.AllowGet);

            bool result = model.Delete(id);

            if (result)
            {
                curUser.Log(id, "d", "Form Tipleri");

                return Json(true, JsonRequestBehavior.AllowGet);
            }

            return Json(false, JsonRequestBehavior.AllowGet);
        }
    }
}
