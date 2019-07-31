using System.Linq;
using System.Web.Mvc;
using System.Collections.Generic;
using AdminPanel.Data;
using TDLibrary;
using Repository.KullanicilarModel;
using Repository.MetalarModel;
using Repository.MetalarDilModel;

namespace AdminPanel.Areas.Admin.Controllers
{
    public class MetalarController : Controller
    {
        readonly AdminPanelEntities entity = new AdminPanelEntities();
        Metalar table = new Metalar();
        Kullanicilar curUser = AppTools.User;

        public ActionResult Index()
        {
            if (!curUser.HasRight("Meta"))
                return RedirectToAction("AnaSayfa", "Giris");

            return View(table.List());
        }

        public ActionResult Ekle()
        {
            if (!curUser.HasRight("Meta", "i"))
                return RedirectToAction("AnaSayfa", "Giris");

            return View(table);
        }

        [HttpPost]
        public ActionResult Ekle(Metalar meta)
        {
            if (!curUser.HasRight("Meta", "i"))
                return RedirectToAction("AnaSayfa", "Giris");

            if (ModelState.IsValid)
            {
                bool result = table.Insert(meta);

                if (result)
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

            IMetalar meta = table.Select(id);

            List<usp_MetaTByLinkedIDSelect_Result> metaDilList = entity.usp_MetaTByLinkedIDSelect(id).ToList();
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
                bool result = table.Update(meta);

                if (result)
                {
                    curUser.Log(meta, "u", "Metalar");

                    return RedirectToAction("Index");
                }
                else
                    meta.Mesaj = "Kayýt düzenlenemedi.";
            }
            else
                meta.Mesaj = "Model uygun deðil.";

            List<usp_MetaTByLinkedIDSelect_Result> metaDilList = entity.usp_MetaTByLinkedIDSelect(meta.ID).ToList();
            meta.MetaTList.AddRange(metaDilList.ChangeModelList<MetalarDil, usp_MetaTByLinkedIDSelect_Result>());

            return View("Duzenle", meta);
        }

        [HttpPost]
        public JsonResult Sil(int id)
        {
            if (curUser.HasRight("Meta", "d"))
            {
                bool result = table.Delete(id);

                if (result)
                {
                    curUser.Log(id, "d", "Metalar");

                    return Json(true);
                }
            }

            return Json(false);
        }

        [HttpPost]
        public JsonResult Kaldir(int id)
        {
            if (curUser.HasRight("Meta", "r"))
            {
                bool result = table.Remove(id);

                if (result)
                {
                    curUser.Log(id, "r", "Metalar");

                    return Json(true);
                }
            }

            return Json(false);
        }

        [HttpPost]
        public JsonResult Kopyala(int id)
        {
            if (curUser.HasRight("Meta", "c"))
            {
                bool result = table.Copy(id);

                if (result)
                {
                    curUser.Log(id, "c", "Metalar");

                    return Json(true);
                }
            }

            return Json(false);
        }
    }
}
