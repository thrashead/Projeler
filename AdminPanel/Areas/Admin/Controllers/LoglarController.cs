using System.Linq;
using System.Web.Mvc;
using System.Collections.Generic;
using AdminPanel.Data;
using Models;

namespace AdminPanel.Areas.Admin.Controllers
{
	public class LoglarController : Controller
	{
        readonly AdminPanelEntities _entity = new AdminPanelEntities();
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
