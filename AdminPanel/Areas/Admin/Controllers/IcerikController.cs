using System.Linq;
using System.Web.Mvc;
using System.Collections.Generic;
using AdminPanel.Data;
using TDLibrary;
using Repository.KullanicilarModel;
using Repository.IcerikModel;
using Repository.IcerikDilModel;

namespace AdminPanel.Areas.Admin.Controllers
{
    public class IcerikController : Controller
    {
        readonly AdminPanelEntities entity = new AdminPanelEntities();
        Icerik table = new Icerik();
        Kullanicilar curUser = AppTools.User;

        public ActionResult Index()
        {
            if (!curUser.HasRight("Icerik"))
                return RedirectToAction("AnaSayfa", "Giris");

            return View(table.List());
        }

        public ActionResult Ekle()
        {
            if (!curUser.HasRight("Icerik", "i"))
                return RedirectToAction("AnaSayfa", "Giris");

            return View(table);
        }

        [HttpPost]
        public ActionResult Ekle(Icerik icerik)
        {
            if (!curUser.HasRight("Icerik", "i"))
                return RedirectToAction("AnaSayfa", "Giris");

            if (ModelState.IsValid)
            {
                icerik.Url = icerik.Title.ToUrl();

                bool result = table.Insert(icerik);

                if (result)
                {
                    curUser.Log(icerik, "i", "��erikler");

                    return RedirectToAction("Index");
                }
                else
                    icerik.Mesaj = "Kay�t eklenemedi.";
            }
            else
                icerik.Mesaj = "Model uygun de�il.";

            return View("Ekle", icerik);
        }

        [HttpGet]
        public ActionResult Duzenle(int id)
        {
            if (!curUser.HasRight("Icerik", "u"))
                return RedirectToAction("AnaSayfa", "Giris");

            IIcerik icerik = table.Select(id);

            List<usp_ContentTByLinkedIDSelect_Result> icerikDilList = entity.usp_ContentTByLinkedIDSelect(id).ToList();
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
                icerik.Url = icerik.Title.ToUrl();

                bool result = table.Update(icerik);

                if (result)
                {
                    curUser.Log(icerik, "u", "��erikler");

                    return RedirectToAction("Index");
                }
                else
                    icerik.Mesaj = "Kay�t d�zenlenemedi.";
            }
            else
                icerik.Mesaj = "Model uygun de�il.";

            List<usp_ContentTByLinkedIDSelect_Result> icerikDilList = entity.usp_ContentTByLinkedIDSelect(icerik.ID).ToList();
            icerik.ContentTList.AddRange(icerikDilList.ChangeModelList<IcerikDil, usp_ContentTByLinkedIDSelect_Result>());

            return View("Duzenle", icerik);
        }

        [HttpPost]
        public JsonResult Sil(int id)
        {
            if (curUser.HasRight("Icerik", "d"))
            {
                bool result = table.Delete(id);

                if (result)
                {
                    curUser.Log(id, "d", "��erikler");

                    return Json(true);
                }
            }

            return Json(false);
        }

        [HttpPost]
        public JsonResult Kaldir(int id)
        {
            if (curUser.HasRight("Icerik", "r"))
            {
                bool result = table.Remove(id);

                if (result)
                {
                    curUser.Log(id, "r", "��erikler");

                    return Json(true);
                }
            }

            return Json(false);
        }

        [HttpPost]
        public JsonResult Kopyala(int id)
        {
            if (curUser.HasRight("Icerik", "c"))
            {
                bool result = table.Copy(id);

                if (result)
                {
                    curUser.Log(id, "c", "��erikler");

                    return Json(true);
                }
            }

            return Json(false);
        }
    }
}
