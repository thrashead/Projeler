using System.Web.Mvc;
using AdminPanel.Data;
using Repository.KullanicilarModel;
using Repository.LoglarModel;

namespace AdminPanel.Areas.Admin.Controllers
{
	public class LoglarController : Controller
	{
        Loglar table = new Loglar();
        Kullanicilar curUser = AppTools.User;

        public ActionResult Index()
        {
            if (!curUser.HasRight("Loglar"))
            {
                return RedirectToAction("AnaSayfa", "Giris");
            }

            return View(table.List());
        }

        [HttpPost]
        public JsonResult Sil()
        {
            if (curUser.HasRight("Loglar", "d"))
            {
                bool result = table.Clear();

                if (result)
                {
                    curUser.Log<Loglar>(null, "t", "Loglar");

                    return Json(true);
                }
            }

            return Json(false);
        }
    }
}
