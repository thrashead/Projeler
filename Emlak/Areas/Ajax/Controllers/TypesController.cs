using System.Linq;
using System.Web.Mvc;
using System.Collections.Generic;
using Emlak.Data;
using TDLibrary;
using Models;

namespace Emlak.Areas.Ajax.Controllers
{
    public class TypesController : Controller
    {
        readonly EmlakEntities entity = new EmlakEntities();
        Users curUser = AppTools.User;

        [HttpGet]
        public JsonResult Index()
        {
            if (!curUser.HasRight("Types"))
                return Json(null, JsonRequestBehavior.AllowGet);

            List<usp_TypesSelect_Result> tip = entity.usp_TypesSelect(null).ToList();

            return Json(tip, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult Insert([System.Web.Http.FromBody] Tipler tip)
        {
            if (!curUser.HasRight("Types", "i"))
                return Json(null);

            var result = entity.usp_TypesInsert(tip.TypeName, tip.Url, tip.TableName, tip.Linkable, tip.Show).FirstOrDefault();

            if (result != null)
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

            usp_TypesSelectTop_Result table = entity.usp_TypesSelectTop(id, 1).FirstOrDefault();
            Tipler tip = table.ChangeModel<Tipler>();

            return Json(tip, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult Update([System.Web.Http.FromBody] Tipler tip)
        {
            if (!curUser.HasRight("Types", "u"))
                return Json(null);

            var result = entity.usp_TypesUpdate(tip.ID, tip.TypeName, tip.Url, tip.TableName, tip.Linkable, tip.Show).FirstOrDefault();

            if (result != null)
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

            try
            {
                entity.usp_TypesCheckDelete(id);

                curUser.Log(id, "d", "Tipler");

                return Json(true, JsonRequestBehavior.AllowGet);
            }
            catch
            {
                return Json(false, JsonRequestBehavior.AllowGet);
            }
        }
    }
}
