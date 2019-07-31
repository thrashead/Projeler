using System.Linq;
using System.Web.Mvc;
using System.Collections.Generic;
using AdminPanel.Data;
using TDLibrary;
using Repository.KullanicilarModel;
using Repository.UrunModel;
using Repository.UrunDilModel;

namespace AdminPanel.Areas.Admin.Controllers
{
    public class UrunController : Controller
    {
        readonly AdminPanelEntities entity = new AdminPanelEntities();
        Urun table = new Urun();
        Kullanicilar curUser = AppTools.User;

        public ActionResult Index()
        {
            if (!curUser.HasRight("Urun"))
                return RedirectToAction("AnaSayfa", "Giris");

            return View(table.List());
        }

        public ActionResult Ekle()
        {
            if (!curUser.HasRight("Urun", "i"))
                return RedirectToAction("AnaSayfa", "Giris");

            return View(table);
        }

        [HttpPost]
        public ActionResult Ekle(Urun urun)
        {
            if (!curUser.HasRight("Urun", "i"))
                return RedirectToAction("AnaSayfa", "Giris");

            if (ModelState.IsValid)
            {
                urun.Url = urun.Title.ToUrl();

                bool result = table.Insert(urun);

                if (result)
                {
                    curUser.Log(urun, "i", "Ürünler");

                    return RedirectToAction("Index");
                }
                else
                    urun.Mesaj = "Kayýt eklenemedi.";
            }
            else
                urun.Mesaj = "Model uygun deðil.";

            return View("Ekle", urun);
        }

        [HttpGet]
        public ActionResult Duzenle(int id)
        {
            if (!curUser.HasRight("Urun", "u"))
                return RedirectToAction("AnaSayfa", "Giris");

            IUrun urun = table.Select(id);

            List<usp_ProductTByLinkedIDSelect_Result> urunDilList = entity.usp_ProductTByLinkedIDSelect(id).ToList();
            urun.ProductTList.AddRange(urunDilList.ChangeModelList<UrunDil, usp_ProductTByLinkedIDSelect_Result>());

            return View(urun);
        }

        [HttpPost]
        public ActionResult Duzenle(Urun urun)
        {
            if (!curUser.HasRight("Urun", "u"))
                return RedirectToAction("AnaSayfa", "Giris");

            if (ModelState.IsValid)
            {
                urun.Url = urun.Title.ToUrl();

                bool result = table.Update(urun);

                if (result)
                {
                    curUser.Log(urun, "u", "Ürünler");

                    return RedirectToAction("Index");
                }
                else
                    urun.Mesaj = "Kayýt düzenlenemedi.";
            }
            else
                urun.Mesaj = "Model uygun deðil.";

            List<usp_ProductTByLinkedIDSelect_Result> urunDilList = entity.usp_ProductTByLinkedIDSelect(urun.ID).ToList();
            urun.ProductTList.AddRange(urunDilList.ChangeModelList<UrunDil, usp_ProductTByLinkedIDSelect_Result>());

            return View("Duzenle", urun);
        }

        [HttpPost]
        public JsonResult Sil(int id)
        {
            if (curUser.HasRight("Urun", "d"))
            {
                bool result = table.Delete(id);

                if (result)
                {
                    curUser.Log(id, "d", "Ürünler");

                    return Json(true);
                }
            }

            return Json(false);
        }

        [HttpPost]
        public JsonResult Kaldir(int id)
        {
            if (curUser.HasRight("Urun", "r"))
            {
                bool result = table.Remove(id);

                if (result)
                {
                    curUser.Log(id, "r", "Ürünler");

                    return Json(true);
                }
            }

            return Json(false);
        }

        [HttpPost]
        public JsonResult Kopyala(int id)
        {
            if (curUser.HasRight("Urun", "c"))
            {
                bool result = table.Copy(id);

                if (result)
                {
                    curUser.Log(id, "c", "Ürünler");

                    return Json(true);
                }
            }

            return Json(false);
        }
    }
}
