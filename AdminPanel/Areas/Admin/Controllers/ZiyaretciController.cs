using System.Linq;
using System.Web.Mvc;
using System.Collections.Generic;
using AdminPanel.Data;
using Models;

namespace AdminPanel.Areas.Admin.Controllers
{
    public class ZiyaretciController : Controller
    {
        readonly AdminPanelEntities _entity = new AdminPanelEntities();
        Kullanicilar curUser = AppTools.User;

        public ActionResult Index()
        {
            if (!curUser.HasRight("Ziyaretci"))
                return RedirectToAction("AnaSayfa", "Giris");

            List<usp_VisitorCounterSelect_Result> ziyaretci = _entity.usp_VisitorCounterSelect(null).ToList();

            return View(ziyaretci);
        }

        [HttpPost]
        public JsonResult Sil()
        {
            try
            {
                if (curUser.HasRight("Ziyaretci", "d"))
                {
                    _entity.usp_VisitorCounterClear();

                    curUser.Log<Ziyaretci>(null, "rd", "Ziyaretçiler");

                    return Json(true);
                }
            }
            catch
            {
                return Json(false);
            }

            return Json(false);
        }
    }
}
