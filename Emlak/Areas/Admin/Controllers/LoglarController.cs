using System.Linq;
using System.Web.Mvc;
using System.Collections.Generic;
using Emlak.Data;
using Models;

namespace Emlak.Areas.Admin.Controllers
{
	public class LoglarController : Controller
	{
        readonly EmlakEntities _entity = new EmlakEntities();
        Kullanicilar curUser = AppTools.User;

        public ActionResult Index()
        {
            if (!curUser.HasRight("Loglar"))
            {
                return RedirectToAction("AnaSayfa", "Giris");
            }

            List<usp_LogsDetailSelect_Result> log = _entity.usp_LogsDetailSelect(null).ToList();

            curUser.Log<usp_LogsDetailSelect_Result>(null, "s", "Loglar");

            return View(log);
        }
    }
}
