using System.Linq;
using System.Web.Mvc;
using System.Collections.Generic;
using Emlak.Data;
using Models;

namespace Emlak.Areas.Ajax.Controllers
{
    public class VisitorCounterController : Controller
    {
        readonly EmlakEntities entity = new EmlakEntities();
        Users curUser = AppTools.User;

        [HttpGet]
        public JsonResult Index()
        {
            if (!curUser.HasRight("VisitorCounter"))
                return Json(null, JsonRequestBehavior.AllowGet);

            List<usp_VisitorCounterSelect_Result> ziyaretci = entity.usp_VisitorCounterSelect(null).ToList();

            return Json(ziyaretci, JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public JsonResult Clear()
        {
            if (!curUser.HasRight("VisitorCounter", "d"))
                return Json(false, JsonRequestBehavior.AllowGet);

            try
            {
                entity.usp_VisitorCounterClear();

                curUser.Log<Ziyaretci>(null, "d", "Ziyaretçiler");

                return Json(true, JsonRequestBehavior.AllowGet);
            }
            catch
            {
                return Json(false, JsonRequestBehavior.AllowGet);
            }
        }
    }
}
