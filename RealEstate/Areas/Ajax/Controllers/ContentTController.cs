using System.Web.Mvc;
using Repository.UsersModel;
using Repository.ContentTModel;

namespace RealEstate.Areas.Ajax.Controllers
{
    public class ContentTController : Controller
    {
        ContentT model = new ContentT();
        Users curUser = AppTools.User;

        [HttpGet]
        public JsonResult Index()
        {
            if (!curUser.HasRight("Content"))
                return Json(null, JsonRequestBehavior.AllowGet);

            return Json(model.List(), JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public JsonResult Insert(int? linkID)
        {
            if (!curUser.HasRight("Content", "i"))
                return Json(null, JsonRequestBehavior.AllowGet);

            return Json(model.Insert(linkID), JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult Insert([System.Web.Http.FromBody] ContentT icerik)
        {
            if (!curUser.HasRight("Content", "i"))
                return Json(null);

            if (icerik.ContID > 0)
            {
                bool result = model.Insert(icerik);

                if (result)
                {
                    curUser.Log(icerik, "i", "Ýçerikler (Dil)");

                    return Json(icerik);
                }
                else
                    icerik.Mesaj = "Kayýt eklenemedi veya ayný dilde zaten veri eklenmiþ.";
            }
            else
                icerik.Mesaj = "Model uygun deðil.";

            icerik = (ContentT)model.Insert(icerik.ContID, icerik.TransID, icerik);

            return Json(icerik);
        }

        [HttpGet]
        public JsonResult Update(int id)
        {
            if (!curUser.HasRight("Content", "u"))
                return Json(null, JsonRequestBehavior.AllowGet);

            return Json(model.Update(id), JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult Update([System.Web.Http.FromBody] ContentT icerik)
        {
            if (!curUser.HasRight("Content", "u"))
                return Json(null);

            bool result = model.Update(icerik);

            if (result)
            {
                curUser.Log(icerik, "u", "Ýçerikler (Dil)");

                return Json(icerik);
            }
            else
                icerik.Mesaj = "Kayýt düzenlenemedi veya ayný dilde zaten veri eklenmiþ.";

            icerik = (ContentT)model.Update(icerik.ID, icerik);

            return Json(icerik);
        }

        [HttpGet]
        public JsonResult Delete(int id)
        {
            if (!curUser.HasRight("Content", "d"))
                return Json(false, JsonRequestBehavior.AllowGet);

            bool result = model.Delete(id);

            if (result)
            {
                curUser.Log(id, "d", "Ýçerikler (Dil)");

                return Json(true, JsonRequestBehavior.AllowGet);
            }

            return Json(false, JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public JsonResult Remove(int id)
        {
            if (!curUser.HasRight("Content", "r"))
                return Json(false, JsonRequestBehavior.AllowGet);

            bool result = model.Remove(id);

            if (result)
            {
                curUser.Log(id, "r", "Ýçerikler (Dil)");

                return Json(true, JsonRequestBehavior.AllowGet);
            }

            return Json(false, JsonRequestBehavior.AllowGet);
        }
    }
}
