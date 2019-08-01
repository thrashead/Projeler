using System.Web.Mvc;
using TDLibrary;
using Repository.KullanicilarModel;
using Repository.KullaniciGrupTabloModel;

namespace AdminPanel.Areas.Admin.Controllers
{
    public class KullaniciGrupTabloController : Controller
    {
        KullaniciGrupTablo table = new KullaniciGrupTablo();
        Kullanicilar curUser = AppTools.User;

        public ActionResult Index()
        {
            if (!curUser.HasRight("Kullanicilar"))
                return RedirectToAction("AnaSayfa", "Giris");

            return View(table.List());
        }

        public ActionResult Ekle(string groupID)
        {
            if (!curUser.HasRight("Kullanicilar", "i"))
                return RedirectToAction("AnaSayfa", "Giris");

            int linkID = groupID == null ? 0 : groupID.ToInteger();

            return View(table.Insert(linkID));
        }

        [HttpPost]
        public ActionResult Ekle(KullaniciGrupTablo kullanici)
        {
            if (!curUser.HasRight("Kullanicilar", "i"))
                return RedirectToAction("AnaSayfa", "Giris");

            if (ModelState.IsValid)
            {
                bool result = table.Insert(kullanici);

                if (result)
                {
                    curUser.Log(kullanici, "i", "Kullanýcý Grup Tablolarý");

                    return RedirectToAction("Index");
                }
                else
                    kullanici.Mesaj = "Kayýt eklenemedi veya bu þekilde bir Kullanýcý Grup Tablosu zaten eklenmiþ.";
            }
            else
                kullanici.Mesaj = "Model uygun deðil.";

            kullanici = (KullaniciGrupTablo)table.Insert(kullanici.UserGroupID, kullanici.TypeID, kullanici);

            return View("Ekle", kullanici);
        }

        [HttpGet]
        public ActionResult Duzenle(int id)
        {
            if (!curUser.HasRight("Kullanicilar", "u"))
                return RedirectToAction("AnaSayfa", "Giris");

            return View(table.Update(id));
        }

        [HttpPost]
        public ActionResult Duzenle(KullaniciGrupTablo kullanici)
        {
            if (!curUser.HasRight("Kullanicilar", "u"))
                return RedirectToAction("AnaSayfa", "Giris");

            if (ModelState.IsValid)
            {
                bool result = table.Update(kullanici);

                if (result)
                {
                    curUser.Log(kullanici, "u", "Kullanýcý Grup Tablolarý");

                    return RedirectToAction("Index");
                }
                else
                    kullanici.Mesaj = "Kayýt düzenlenemedi veya bu þekilde bir Kullanýcý Grup Tablosu zaten eklenmiþ.";
            }
            else
                kullanici.Mesaj = "Model uygun deðil.";

            kullanici = (KullaniciGrupTablo)table.Update(kullanici.ID, kullanici);

            return View("Duzenle", kullanici);
        }

        public JsonResult Sil(int id)
        {
            if (curUser.HasRight("Kullanicilar", "d"))
            {
                bool result = table.Delete(id);

                if (result)
                {
                    curUser.Log(id, "d", "Kullanýcý Grup Tablolarý");

                    return Json(true);
                }
            }

            return Json(false);
        }
    }
}
