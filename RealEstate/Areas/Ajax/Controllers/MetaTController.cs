using System.Web.Mvc;
using Repository.UsersModel;
using Repository.MetaTModel;

namespace RealEstate.Areas.Ajax.Controllers
{
    public class MetaTController : Controller
    {
        MetaT model = new MetaT();
        Users curUser = AppTools.User;

        [HttpGet]
        public JsonResult Index()
        {
            if (!curUser.HasRight("Meta"))
                return Json(null, JsonRequestBehavior.AllowGet);

            return Json(model.List(), JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public JsonResult Insert(int? linkID)
        {
            if (!curUser.HasRight("Meta", "i"))
                return Json(null, JsonRequestBehavior.AllowGet);

            return Json(model.Insert(linkID), JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult Insert([System.Web.Http.FromBody] MetaT meta)
        {
            if (!curUser.HasRight("Meta", "i"))
                return Json(null);

            if (meta.MetaID > 0)
            {
                bool result = model.Insert(meta);

                if (result)
                {
                    curUser.Log(meta, "i", "Metalar (Dil)");

                    return Json(meta);
                }
                else
                    meta.Mesaj = "Kay�t eklenemedi veya ayn� dilde zaten veri eklenmi�.";
            }
            else
                meta.Mesaj = "Model uygun de�il.";

            meta = (MetaT)model.Insert(meta.MetaID, meta.TransID, meta);

            return Json(meta);
        }

        [HttpGet]
        public JsonResult Update(int id)
        {
            if (!curUser.HasRight("Meta", "u"))
                return Json(null, JsonRequestBehavior.AllowGet);

            return Json(model.Update(id), JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult Update([System.Web.Http.FromBody] MetaT meta)
        {
            if (!curUser.HasRight("Meta", "u"))
                return Json(null);

            bool result = model.Update(meta);

            if (result)
            {
                curUser.Log(meta, "u", "Metalar (Dil)");

                return Json(meta);
            }
            else
                meta.Mesaj = "Kay�t d�zenlenemedi veya ayn� dilde zaten veri eklenmi�.";

            meta = (MetaT)model.Update(meta.ID, meta);

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
                curUser.Log(id, "d", "Metalar (Dil)");

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
                curUser.Log(id, "r", "Metalar (Dil)");

                return Json(true, JsonRequestBehavior.AllowGet);
            }

            return Json(false, JsonRequestBehavior.AllowGet);
        }
    }
}
