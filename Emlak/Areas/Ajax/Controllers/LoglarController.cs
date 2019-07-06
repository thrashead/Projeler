using System.Linq;
using System.Web.Mvc;
using System.Collections.Generic;
using Emlak.Data;
using Models;

namespace Emlak.Areas.Ajax.Controllers
{
	public class LoglarController : Controller
	{
        readonly EmlakEntities entity = new EmlakEntities();
        Users curUser = AppTools.User;

        [HttpGet]
        public JsonResult Index()
        {
            if (!curUser.HasRight("Loglar"))
                return Json(null, JsonRequestBehavior.AllowGet);

            List<usp_LogsDetailSelect_Result> log = entity.usp_LogsDetailSelect(null, curUser.GroupID).ToList();

            return Json(log, JsonRequestBehavior.AllowGet);
        }
    }
}
