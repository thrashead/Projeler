using System.Web.Mvc;
using TDLibrary;
using Repository.UsersModel;
using Repository.LinkTypesModel;

namespace RealEstate.Areas.Ajax.Controllers
{
    public class LinkTypesController : Controller
    {
        LinkTypes model = new LinkTypes();
        Users curUser = AppTools.User;

        [HttpGet]
        public JsonResult Index()
        {
            if (!curUser.HasRight("LinkTypes"))
                return Json(null, JsonRequestBehavior.AllowGet);

            return Json(model.List(), JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public JsonResult Insert()
        {
            if (!curUser.HasRight("LinkTypes", "i"))
                return Json(null, JsonRequestBehavior.AllowGet);

            return Json(model.Insert(), JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult Insert([System.Web.Http.FromBody] LinkTypes link)
        {
            if (!curUser.HasRight("LinkTypes", "i"))
                return Json(null);

            link.Url = link.Title.ToUrl();

            bool result = model.Insert(link);

            if (result)
            {
                curUser.Log(link, "i", "Baðlý Tipler");

                return Json(link);
            }
            else
                link.Mesaj = "Kayýt eklenemedi.";

            link = (LinkTypes)model.Insert(link, null);

            return Json(link);
        }

        [HttpGet]
        public JsonResult Update(int id)
        {
            if (!curUser.HasRight("LinkTypes", "u"))
                return Json(null, JsonRequestBehavior.AllowGet);

            return Json(model.Update(id), JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult Update([System.Web.Http.FromBody] LinkTypes link)
        {
            if (!curUser.HasRight("LinkTypes", "u"))
                return Json(null);

            link.Url = link.Title.ToUrl();

            bool result = model.Update(link);

            if (result)
            {
                curUser.Log(link, "u", "Baðlý Tipler");

                return Json(link);
            }
            else
                link.Mesaj = "Kayýt düzenlenemedi.";

            link = (LinkTypes)model.Update(link.ID, link);

            return Json(link);
        }

        [HttpGet]
        public JsonResult Delete(int id)
        {
            if (!curUser.HasRight("LinkTypes", "d"))
                return Json(false, JsonRequestBehavior.AllowGet);

            bool result = model.Delete(id);

            if (result)
            {
                curUser.Log(id, "d", "Baðlý Tipler");

                return Json(true, JsonRequestBehavior.AllowGet);
            }

            return Json(false, JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public JsonResult Copy(int id)
        {
            if (!curUser.HasRight("LinkTypes", "c"))
                return Json(false, JsonRequestBehavior.AllowGet);

            bool result = model.Copy(id);

            if (result)
            {
                curUser.Log(id, "c", "Baðlý Tipler");

                return Json(true, JsonRequestBehavior.AllowGet);
            }

            return Json(false, JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public JsonResult FillTypes(int? typeID)
        {
            return Json(LinkTypes.ReturnList(typeID), JsonRequestBehavior.AllowGet);
        }
    }
}
