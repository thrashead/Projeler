using System.Web.Mvc;
using Repository.KullanicilarModel;
using Repository.ZiyaretciModel;

namespace AdminPanel.Areas.Admin.Controllers
{
    public class ZiyaretciController : Controller
    {
        Ziyaretci table = new Ziyaretci();
        Kullanicilar curUser = AppTools.User;

        public ActionResult Index()
        {
            if (!curUser.HasRight("Ziyaretci"))
                return RedirectToAction("AnaSayfa", "Giris");

            return View(table.List());
        }

        [HttpPost]
        public JsonResult Sil()
        {
            if (curUser.HasRight("Ziyaretci", "d"))
            {
                bool result = table.Clear();

                if (result)
                {
                    curUser.Log<Ziyaretci>(null, "t", "Ziyaretçiler");

                    return Json(true);
                }
            }

            return Json(false);
        }
    }
}
