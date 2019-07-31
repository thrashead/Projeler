using System.Web.Mvc;
using Repository.KullanicilarModel;
using Repository.FormTiplerModel;

namespace AdminPanel.Areas.Admin.Controllers
{
    public class FormTiplerController : Controller
    {
        FormTipler table = new FormTipler();
        Kullanicilar curUser = AppTools.User;

        public ActionResult Index()
        {
            if (!curUser.HasRight("FormEleman"))
                return RedirectToAction("AnaSayfa", "Giris");

            return View(table.List());
        }

        public ActionResult Ekle()
        {
            if (!curUser.HasRight("FormEleman", "i"))
                return RedirectToAction("AnaSayfa", "Giris");

            return View(table);
        }

        [HttpPost]
        public ActionResult Ekle(FormTipler formeleman)
        {
            if (!curUser.HasRight("FormEleman", "i"))
                return RedirectToAction("AnaSayfa", "Giris");

            if (ModelState.IsValid)
            {
                bool result = table.Insert(formeleman);

                if (result)
                {
                    curUser.Log(formeleman, "i", "Form Tipleri");

                    return RedirectToAction("Index");
                }
                else
                    formeleman.Mesaj = "Kayýt eklenemedi.";
            }
            else
                formeleman.Mesaj = "Model uygun deðil.";

            return View("Ekle", formeleman);
        }

        [HttpGet]
        public ActionResult Duzenle(int id)
        {
            if (!curUser.HasRight("FormEleman", "u"))
                return RedirectToAction("AnaSayfa", "Giris");

            return View(table.Select(id));
        }

        [HttpPost]
        public ActionResult Duzenle(FormTipler formeleman)
        {
            if (!curUser.HasRight("FormEleman", "u"))
                return RedirectToAction("AnaSayfa", "Giris");

            if (ModelState.IsValid)
            {
                bool result = table.Update(formeleman);

                if (result)
                {
                    curUser.Log(formeleman, "u", "Form Tipleri");

                    return RedirectToAction("Index");
                }
                else
                    formeleman.Mesaj = "Kayýt düzenlenemedi.";
            }
            else
                formeleman.Mesaj = "Model uygun deðil.";

            return View("Duzenle", formeleman);
        }

        public JsonResult Sil(int id)
        {
            if (curUser.HasRight("FormEleman", "d"))
            {
                bool result = table.Delete(id);

                if (result)
                {
                    curUser.Log(id, "d", "Form Tipleri");

                    return Json(true);
                }
            }

            return Json(false);
        }
    }
}
