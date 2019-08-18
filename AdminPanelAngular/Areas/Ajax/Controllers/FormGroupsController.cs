using System.Web.Mvc;
using Repository.UsersModel;
using Repository.FormGroupsModel;

namespace AdminPanelAngular.Areas.Ajax.Controllers
{
    public class FormGroupsController : Controller
    {
        FormGroups model = new FormGroups();
        Users curUser = AppTools.User;

        [HttpGet]
        public JsonResult Index()
        {
            if (!curUser.HasRight("FormItems"))
                return Json(null, JsonRequestBehavior.AllowGet);

            return Json(model.List(), JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult Insert([System.Web.Http.FromBody] FormGroups formeleman)
        {
            if (!curUser.HasRight("FormItems", "i"))
                return Json(null);

            bool result = model.Insert(formeleman);

            if (result)
            {
                curUser.Log(formeleman, "i", "Form Eleman Gruplarý");

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

            return Json(model.Update(id), JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult Update([System.Web.Http.FromBody] FormGroups formeleman)
        {
            if (!curUser.HasRight("FormItems", "u"))
                return Json(null);

            bool result = model.Update(formeleman);

            if (result)
            {
                curUser.Log(formeleman, "u", "Form Eleman Gruplarý");

                return Json(formeleman);
            }
            else
                formeleman.Mesaj = "Kayýt düzenlenemedi.";

            formeleman = (FormGroups)model.Update(formeleman.ID, formeleman);

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
                curUser.Log(id, "d", "Form Eleman Gruplarý");

                return Json(true, JsonRequestBehavior.AllowGet);
            }

            return Json(false, JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public JsonResult Copy(int id)
        {
            if (!curUser.HasRight("FormItems", "c"))
                return Json(false, JsonRequestBehavior.AllowGet);

            bool result = model.Copy(id);

            if (result)
            {
                curUser.Log(id, "c", "Form Eleman Gruplarý");

                return Json(true, JsonRequestBehavior.AllowGet);
            }

            return Json(false, JsonRequestBehavior.AllowGet);
        }
    }
}