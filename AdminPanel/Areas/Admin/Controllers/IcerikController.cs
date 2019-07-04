using System.Linq;
using System.Web.Mvc;
using System.Collections.Generic;
using AdminPanel.Data;
using TDLibrary;
using Models;

namespace AdminPanel.Areas.Admin.Controllers
{
    public class IcerikController : Controller
    {
        readonly EmlakEntities _entity = new EmlakEntities();
        Kullanicilar curUser = AppTools.User;

        public ActionResult Index()
        {
            if (!curUser.HasRight("Icerik"))
                return RedirectToAction("AnaSayfa", "Giris");

            List<usp_ContentSelect_Result> icerik = _entity.usp_ContentSelect(null).ToList();

            curUser.Log<Icerik>(null, "s", "Ýçerikler");

            return View(icerik);
        }

        public ActionResult Ekle()
        {
            if (!curUser.HasRight("Icerik", "i"))
                return RedirectToAction("AnaSayfa", "Giris");

            Icerik icerik = new Icerik();

            return View(icerik);
        }

        [HttpPost]
        public ActionResult Ekle(Icerik icerik)
        {
            if (!curUser.HasRight("Icerik", "i"))
                return RedirectToAction("AnaSayfa", "Giris");

            if (ModelState.IsValid)
            {
                icerik.Url = icerik.Title.ToHyperLinkText();

                var result = _entity.usp_ContentInsert(icerik.Title, icerik.Url, icerik.Code, icerik.Active);

                if (result != null)
                {
                    curUser.Log(icerik, "i", "Ýçerikler");

                    return RedirectToAction("Index");
                }
                else
                    icerik.Mesaj = "Kayýt eklenemedi.";
            }
            else
                icerik.Mesaj = "Model uygun deðil.";

            return View("Ekle", icerik);
        }

        [HttpGet]
        public ActionResult Duzenle(int id)
        {
            if (!curUser.HasRight("Icerik", "u"))
                return RedirectToAction("AnaSayfa", "Giris");

            usp_ContentSelectTop_Result table = _entity.usp_ContentSelectTop(id, 1).FirstOrDefault();
            Icerik icerik = table.ChangeModel<Icerik>();

            List<usp_ContentTByLinkedIDSelect_Result> icerikDilList = _entity.usp_ContentTByLinkedIDSelect(id).ToList();
            icerik.ContentTList.AddRange(icerikDilList.ChangeModelList<IcerikDil, usp_ContentTByLinkedIDSelect_Result>());

            return View(icerik);
        }

        [HttpPost]
        public ActionResult Duzenle(Icerik icerik)
        {
            if (!curUser.HasRight("Icerik", "u"))
                return RedirectToAction("AnaSayfa", "Giris");

            if (ModelState.IsValid)
            {
                icerik.Url = icerik.Title.ToHyperLinkText();

                var result = _entity.usp_ContentUpdate(icerik.ID, icerik.Title, icerik.Url, icerik.Code, icerik.Active);

                if (result != null)
                {
                    curUser.Log(icerik, "u", "Ýçerikler");

                    return RedirectToAction("Index");
                }
                else
                    icerik.Mesaj = "Kayýt düzenlenemedi.";
            }
            else
                icerik.Mesaj = "Model uygun deðil.";

            List<usp_ContentTByLinkedIDSelect_Result> icerikDilList = _entity.usp_ContentTByLinkedIDSelect(icerik.ID).ToList();
            icerik.ContentTList.AddRange(icerikDilList.ChangeModelList<IcerikDil, usp_ContentTByLinkedIDSelect_Result>());

            return View("Duzenle", icerik);
        }

        [HttpPost]
        public JsonResult Sil(int id)
        {
            try
            {
                if (curUser.HasRight("Icerik", "d"))
                {
                    _entity.usp_ContentCheckSetDeleted(id);

                    curUser.Log(id, "d", "Ýçerikler");

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
                if (curUser.HasRight("Icerik", "rd"))
                {
                    _entity.usp_ContentCheckDelete(id);

                    curUser.Log(id, "rd", "Ýçerikler");

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
                if (curUser.HasRight("Icerik", "c"))
                {
                    var result = _entity.usp_ContentCopy(id);

                    if (result != null)
                        curUser.Log(id, "c", "Ýçerikler");

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
