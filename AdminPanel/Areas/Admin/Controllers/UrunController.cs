using System.Linq;
using System.Web.Mvc;
using System.Collections.Generic;
using AdminPanel.Data;
using TDLibrary;
using Models;

namespace AdminPanel.Areas.Admin.Controllers
{
    public class UrunController : Controller
    {
        readonly EmlakEntities _entity = new EmlakEntities();
        Kullanicilar curUser = AppTools.User;

        public ActionResult Index()
        {
            if (!curUser.HasRight("Urun"))
                return RedirectToAction("AnaSayfa", "Giris");

            List<usp_ProductSelect_Result> urun = _entity.usp_ProductSelect(null).ToList();

            curUser.Log<Urun>(null, "s", "Ürünler");

            return View(urun);
        }

        public ActionResult Ekle()
        {
            if (!curUser.HasRight("Urun", "i"))
                return RedirectToAction("AnaSayfa", "Giris");

            Urun urun = new Urun();

            return View(urun);
        }

        [HttpPost]
        public ActionResult Ekle(Urun urun)
        {
            if (!curUser.HasRight("Urun", "i"))
                return RedirectToAction("AnaSayfa", "Giris");

            if (ModelState.IsValid)
            {
                urun.Url = urun.Title.ToHyperLinkText();

                var result = _entity.usp_ProductInsert(urun.Title, urun.Url, urun.Code, urun.Active);

                if (result != null)
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

            usp_ProductSelectTop_Result table = _entity.usp_ProductSelectTop(id, 1).FirstOrDefault();

            Urun urun = table.ChangeModel<Urun>();

            List<usp_ProductTByLinkedIDSelect_Result> urunDilList = _entity.usp_ProductTByLinkedIDSelect(id).ToList();
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
                urun.Url = urun.Title.ToHyperLinkText();

                var result = _entity.usp_ProductUpdate(urun.ID, urun.Title, urun.Url, urun.Code, urun.Active);

                if (result != null)
                {
                    curUser.Log(urun, "u", "Ürünler");

                    return RedirectToAction("Index");
                }
                else
                    urun.Mesaj = "Kayýt düzenlenemedi.";
            }
            else
                urun.Mesaj = "Model uygun deðil.";

            List<usp_ProductTByLinkedIDSelect_Result> urunDilList = _entity.usp_ProductTByLinkedIDSelect(urun.ID).ToList();
            urun.ProductTList.AddRange(urunDilList.ChangeModelList<UrunDil, usp_ProductTByLinkedIDSelect_Result>());

            return View("Duzenle", urun);
        }

        [HttpPost]
        public JsonResult Sil(int id)
        {
            try
            {
                if (curUser.HasRight("Urun", "d"))
                {
                    _entity.usp_ProductCheckSetDeleted(id);

                    curUser.Log(id, "d", "Ürünler");

                    return Json(true);
                }
            }
            catch
            {
                return Json(false);
            }

            return Json(false);
        }

        [HttpPost]
        public JsonResult Kaldir(int id)
        {
            try
            {
                if (curUser.HasRight("Urun", "rd"))
                {
                    _entity.usp_ProductCheckDelete(id);

                    curUser.Log(id, "rd", "Ürünler");

                    return Json(true);
                }
            }
            catch
            {
                return Json(false);
            }

            return Json(false);
        }

        [HttpPost]
        public JsonResult Kopyala(int id)
        {
            try
            {
                if (curUser.HasRight("Urun", "d"))
                {
                    var result = _entity.usp_ProductCopy(id);

                    if (result != null)
                        curUser.Log(id, "c", "Ürünler");

                    return Json(result == null ? false : true);
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
