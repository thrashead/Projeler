using System.Linq;
using System.Web.Mvc;
using System.Collections.Generic;
using Emlak.Data;
using Models;

namespace Emlak.Areas.Admin.Controllers
{
    public class ZiyaretciController : Controller
    {
        readonly EmlakEntities entity = new EmlakEntities();
        Kullanicilar curUser = AppTools.User;

        public ActionResult Index()
        {
            if (!curUser.HasRight("Ziyaretci"))
                return RedirectToAction("AnaSayfa", "Giris");

            List<usp_VisitorCounterSelect_Result> ziyaretci = entity.usp_VisitorCounterSelect(null).ToList();

            curUser.Log<Ziyaretci>(null, "s", "Ziyaretçiler");

            return View(ziyaretci);
        }

        [HttpPost]
        public JsonResult Sil()
        {
            try
            {
                if (curUser.HasRight("Ziyaretci", "d"))
                {
                    entity.usp_VisitorCounterClear();

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
