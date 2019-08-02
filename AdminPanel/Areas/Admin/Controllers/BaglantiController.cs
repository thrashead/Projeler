using System.Web.Mvc;
using Repository.BaglantilarModel;
using Repository.KullanicilarModel;
using TDLibrary;

namespace AdminPanel.Areas.Admin.Controllers
{
    public class BaglantiController : Controller
    {
        Baglantilar table = new Baglantilar();
        Kullanicilar curUser = AppTools.User;

        public ActionResult Index()
        {
            if (!curUser.HasRight("BagliTipler"))
                return RedirectToAction("AnaSayfa", "Giris");

            return View(table.List());
        }

        public ActionResult Ekle()
        {
            if (!curUser.HasRight("BagliTipler", "i"))
                return RedirectToAction("AnaSayfa", "Giris");

            return View(table.Insert());
        }

        [HttpPost]
        public ActionResult Ekle(Baglantilar link)
        {
            if (!curUser.HasRight("BagliTipler", "i"))
                return RedirectToAction("AnaSayfa", "Giris");

            if (ModelState.IsValid && link.LinkID > 0 && link.LinkTypeID > 0)
            {
                bool result = table.Insert(link);

                if (result)
                {
                    curUser.Log(link, "i", "Bağlantılar");

                    return RedirectToAction("Index");
                }
                else
                    link.Mesaj = "Kayıt eklenemedi yada zaten daha önce eklenmiş.";
            }
            else
                link.Mesaj = "Model uygun değil.";

            link = (Baglantilar)table.Insert(link.LinkID, link.LinkTypeID, link);

            return View("Ekle", link);
        }

        [HttpGet]
        public ActionResult Duzenle(int id)
        {
            if (!curUser.HasRight("BagliTipler", "u"))
                return RedirectToAction("AnaSayfa", "Giris");

            return View(table.Update(id));
        }

        [HttpPost]
        public ActionResult Duzenle(Baglantilar link)
        {
            if (!curUser.HasRight("BagliTipler", "u"))
                return RedirectToAction("AnaSayfa", "Giris");

            if (ModelState.IsValid)
            {
                bool result = table.Update(link);

                if (result)
                {
                    curUser.Log(link, "u", "Bağlantılar");

                    return RedirectToAction("Index");
                }
                else
                    link.Mesaj = "Kayıt düzenlenemedi yada zaten daha önce eklenmiş.";
            }
            else
                link.Mesaj = "Model uygun değil.";

            link = (Baglantilar)table.Update(link.ID, link);

            return View("Duzenle", link);
        }

        [HttpPost]
        public JsonResult Sil(int id)
        {
            if (curUser.HasRight("BagliTipler", "d"))
            {
                bool result = table.Delete(id);

                if (result)
                {
                    curUser.Log(id, "d", "Bağlantılar");

                    return Json(true);
                }
            }

            return Json(false);
        }

        [HttpGet]
        public JsonResult FillObject(string linkTypeID)
        {
            return Json(Baglantilar.ReturnList(null, null, linkTypeID.ToInteger()), JsonRequestBehavior.AllowGet);
        }
    }
}