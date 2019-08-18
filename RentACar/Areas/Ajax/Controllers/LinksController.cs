using System.Web.Mvc;
using TDLibrary;
using Repository.UsersModel;
using Repository.LinksModel;

namespace RentACar.Areas.Ajax.Controllers
{
    public class LinksController : Controller
    {
        Links model = new Links();
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
        public JsonResult Insert([System.Web.Http.FromBody] Links link)
        {
            if (!curUser.HasRight("LinkTypes", "i"))
                return Json(null);

            if (link.LinkID > 0 && link.LinkTypeID > 0)
            {
                bool result = model.Insert(link);

                if (result)
                {
                    curUser.Log(link, "i", "Bağlantılar");

                    return Json(link);
                }
                else
                    link.Mesaj = "Kayıt eklenemedi yada zaten daha önce eklenmiş.";
            }
            else
                link.Mesaj = "Model uygun değil.";

            link = (Links)model.Insert(link.LinkID, link.LinkTypeID, link);

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
        public JsonResult Update([System.Web.Http.FromBody] Links link)
        {
            if (!curUser.HasRight("LinkTypes", "u"))
                return Json(null);

            bool result = model.Update(link);

            if (result)
            {
                curUser.Log(link, "u", "Bağlantılar");

                return Json(link);
            }
            else
                link.Mesaj = "Kayıt düzenlenemedi yada zaten daha önce eklenmiş.";

            link = (Links)model.Update(link.ID, link);

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
                curUser.Log(id, "d", "Bağlantılar");

                return Json(true, JsonRequestBehavior.AllowGet);
            }

            return Json(false, JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public JsonResult FillObject(string linkTypeID)
        {
            return Json(Links.ReturnList(null, null, linkTypeID.ToInteger()), JsonRequestBehavior.AllowGet);
        }
    }
}