using System.Linq;
using System.Web.Mvc;
using System.Collections.Generic;
using Emlak.Data;
using TDLibrary;
using Models;

namespace Emlak.Areas.Admin.Controllers
{
    public class TiplerController : Controller
    {
        readonly EmlakEntities _entity = new EmlakEntities();
        Kullanicilar curUser = AppTools.User;

        public ActionResult Index()
        {
            if (!curUser.HasRight("Tipler"))
                return RedirectToAction("AnaSayfa", "Giris");

            List<usp_TypesSelect_Result> tip = _entity.usp_TypesSelect(null).ToList();

            curUser.Log<Tipler>(null, "s", "Tipler");

            return View(tip);
        }

        public ActionResult Ekle()
        {
            if (!curUser.HasRight("Tipler", "i"))
                return RedirectToAction("AnaSayfa", "Giris");

            Tipler tip = new Tipler();

            return View(tip);
        }

        [HttpPost]
        public ActionResult Ekle(Tipler tip)
        {
            if (!curUser.HasRight("Tipler", "i"))
                return RedirectToAction("AnaSayfa", "Giris");

            if (ModelState.IsValid)
            {
                var result = _entity.usp_TypesInsert(tip.TypeName, tip.Url, tip.TableName, tip.Linkable, tip.Show);

                if (result != null)
                {
                    curUser.Log(tip, "i", "Tipler");

                    return RedirectToAction("Index");
                }
                else
                    tip.Mesaj = "Kayýt eklenemedi.";
            }
            else
                tip.Mesaj = "Model uygun deðil.";

            return View("Ekle", tip);
        }

        [HttpGet]
        public ActionResult Duzenle(int id)
        {
            if (!curUser.HasRight("Tipler", "u"))
                return RedirectToAction("AnaSayfa", "Giris");

            usp_TypesSelectTop_Result table = _entity.usp_TypesSelectTop(id, 1).FirstOrDefault();
            Tipler tip = table.ChangeModel<Tipler>();

            return View(tip);
        }

        [HttpPost]
        public ActionResult Duzenle(Tipler tip)
        {
            if (!curUser.HasRight("Tipler", "u"))
                return RedirectToAction("AnaSayfa", "Giris");

            if (ModelState.IsValid)
            {
                var result = _entity.usp_TypesUpdate(tip.ID, tip.TypeName, tip.Url, tip.TableName, tip.Linkable, tip.Show);

                if (result != null)
                {
                    curUser.Log(tip, "u", "Tipler");

                    return RedirectToAction("Index");
                }
                else
                    tip.Mesaj = "Kayýt düzenlenemedi.";
            }
            else
                tip.Mesaj = "Model uygun deðil.";

            return View("Duzenle", tip);
        }

        public JsonResult Sil(int id)
        {
            try
            {
                if (curUser.HasRight("Tipler", "d"))
                {
                    _entity.usp_TypesCheckDelete(id);

                    curUser.Log(id, "rd", "Tipler");

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
