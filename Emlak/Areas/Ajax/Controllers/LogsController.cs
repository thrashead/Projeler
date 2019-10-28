using System.Linq;
using System.Web.Mvc;
using System.Collections.Generic;
using Emlak.Data;
using Models;

namespace Emlak.Areas.Ajax.Controllers
{
	public class LogsController : Controller
	{
        readonly EmlakEntities entity = new EmlakEntities();
        Users curUser = AppTools.User;

        [HttpGet]
        public JsonResult Index()
        {
            if (!curUser.HasRight("Logs"))
                return Json(null, JsonRequestBehavior.AllowGet);

            List<usp_LogsDetailSelect_Result> log = entity.usp_LogsDetailSelect(null, curUser.GroupID).ToList();

            return Json(log, JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public JsonResult Clear()
        {
            if (!curUser.HasRight("Logs", "d"))
                return Json(false, JsonRequestBehavior.AllowGet);

            try
            {
                entity.usp_LogsClear();

                curUser.Log<Logs>(null, "d", "Loglar");

                return Json(true, JsonRequestBehavior.AllowGet);
            }
            catch
            {
                return Json(false, JsonRequestBehavior.AllowGet);
            }
        }
    }
}
