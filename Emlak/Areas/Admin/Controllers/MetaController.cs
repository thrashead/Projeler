using System.Linq;
using System.Web.Mvc;
using System.Collections.Generic;
using Emlak.Data;
using TDLibrary;
using Models;

namespace Emlak.Areas.Admin.Controllers
{
    public class MetaController : Controller
    {
        readonly EmlakEntities _entity = new EmlakEntities();
        Kullanicilar curUser = AppTools.User;

        public ActionResult Index()
        {
            if (!curUser.HasRight("Meta"))
                return RedirectToAction("AnaSayfa", "Giris");

            List<usp_MetaSelect_Result> meta = _entity.usp_MetaSelect(null).ToList();

            curUser.Log<Metalar>(null, "s", "Metalar");

            return View(meta);
        }

        public ActionResult Ekle()
        {
            if (!curUser.HasRight("Meta", "i"))
                return RedirectToAction("AnaSayfa", "Giris");

            Metalar meta = new Metalar();

            return View(meta);
        }

        [HttpPost]
        public ActionResult Ekle(Metalar meta)
        {
            if (!curUser.HasRight("Meta", "i"))
                return RedirectToAction("AnaSayfa", "Giris");

            if (ModelState.IsValid)
            {
                var result = _entity.usp_MetaInsert(meta.Title, meta.Code, meta.Active);

                if (result != null)
                {
                    curUser.Log(meta, "i", "Metalar");

                    return RedirectToAction("Index");
                }
                else
                    meta.Mesaj = "Kayýt eklenemedi.";
            }
            else
                meta.Mesaj = "Model uygun deðil.";

            return View("Ekle", meta);
        }

        [HttpGet]
        public ActionResult Duzenle(int id)
        {
            if (!curUser.HasRight("Meta", "u"))
                return RedirectToAction("AnaSayfa", "Giris");

            usp_MetaSelectTop_Result table = _entity.usp_MetaSelectTop(id, 1).FirstOrDefault();

            Metalar meta = table.ChangeModel<Metalar>();

            List<usp_MetaTByLinkedIDSelect_Result> metaDilList = _entity.usp_MetaTByLinkedIDSelect(id).ToList();
            meta.MetaTList.AddRange(metaDilList.ChangeModelList<MetalarDil, usp_MetaTByLinkedIDSelect_Result>());

            return View(meta);
        }

        [HttpPost]
        public ActionResult Duzenle(Metalar meta)
        {
            if (!curUser.HasRight("Meta", "u"))
                return RedirectToAction("AnaSayfa", "Giris");

            if (ModelState.IsValid)
            {
                var result = _entity.usp_MetaUpdate(meta.ID, meta.Title, meta.Code, meta.Active);

                if (result != null)
                {
                    curUser.Log(meta, "u", "Metalar");

                    return RedirectToAction("Index");
                }
                else
                    meta.Mesaj = "Kayýt düzenlenemedi.";
            }
            else
                meta.Mesaj = "Model uygun deðil.";

            List<usp_MetaTByLinkedIDSelect_Result> metaDilList = _entity.usp_MetaTByLinkedIDSelect(meta.ID).ToList();
            meta.MetaTList.AddRange(metaDilList.ChangeModelList<MetalarDil, usp_MetaTByLinkedIDSelect_Result>());

            return View("Duzenle", meta);
        }

        [HttpPost]
        public JsonResult Sil(int id)
        {
            try
            {
                if (curUser.HasRight("Kullanicilar", "d"))
                {
                    _entity.usp_MetaCheckSetDeleted(id);

                    curUser.Log(id, "d", "Metalar");

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
                if (curUser.HasRight("Kullanicilar", "rd"))
                {
                    _entity.usp_MetaCheckDelete(id);

                    curUser.Log(id, "rd", "Metalar");

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
                if (curUser.HasRight("Kullanicilar", "c"))
                {
                    var result = _entity.usp_MetaCopy(id);

                    if (result != null)
                        curUser.Log(id, "c", "Metalar");

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
