using System.Linq;
using System.Web.Mvc;
using System.Collections.Generic;
using AdminPanel.Data;
using TDLibrary;
using Repository.KullanicilarModel;
using Repository.LogIslemModel;

namespace AdminPanel.Areas.Admin.Controllers
{
    public class LogIslemController : Controller
    {
        readonly AdminPanelEntities entity = new AdminPanelEntities();
        LogIslem table = new LogIslem();
        Kullanicilar curUser = AppTools.User;

        public ActionResult Index()
        {
            if (!curUser.HasRight("Loglar"))
                return RedirectToAction("AnaSayfa", "Giris");

            return View(table.List());
        }

        public ActionResult Ekle(string logID)
        {
            if (!curUser.HasRight("Loglar", "i"))
                return RedirectToAction("AnaSayfa", "Giris");

            int linkID = logID == null ? 0 : logID.ToInteger();

            List<usp_LogTypesSelect_Result> tableLogTipler = entity.usp_LogTypesSelect(null).ToList();
            table.LogTypesList = tableLogTipler.ToSelectList<usp_LogTypesSelect_Result, SelectListItem>("ID", "Name", linkID);

            return View(table);
        }

        [HttpPost]
        public ActionResult Ekle(LogIslem log)
        {
            if (!curUser.HasRight("Loglar", "i"))
                return RedirectToAction("AnaSayfa", "Giris");

            if (ModelState.IsValid)
            {
                bool result = table.Insert(log);

                if (result)
                {
                    curUser.Log(log, "i", "Log Ýþlemleri");

                    return RedirectToAction("Index");
                }
                else
                    log.Mesaj = "Kayýt eklenemedi.";
            }
            else
                log.Mesaj = "Model uygun deðil.";

            List<usp_LogTypesSelect_Result> tableLogTipler = entity.usp_LogTypesSelect(null).ToList();
            log.LogTypesList = tableLogTipler.ToSelectList<usp_LogTypesSelect_Result, SelectListItem>("ID", "Name", log.LogTypeID);

            return View("Ekle", log);
        }

        [HttpGet]
        public ActionResult Duzenle(int id)
        {
            if (!curUser.HasRight("Loglar", "u"))
                return RedirectToAction("AnaSayfa", "Giris");

            ILogIslem log = table.Select(id);

            List<usp_LogTypesSelect_Result> tableLogTipler = entity.usp_LogTypesSelect(null).ToList();
            log.LogTypesList = tableLogTipler.ToSelectList<usp_LogTypesSelect_Result, SelectListItem>("ID", "Name", log.LogTypeID);

            return View(log);
        }

        [HttpPost]
        public ActionResult Duzenle(LogIslem log)
        {
            if (!curUser.HasRight("Loglar", "u"))
                return RedirectToAction("AnaSayfa", "Giris");

            if (ModelState.IsValid)
            {
                bool result = table.Update(log);

                if (result)
                {
                    curUser.Log(log, "u", "Log Ýþlemleri");

                    return RedirectToAction("Index");
                }
                else
                    log.Mesaj = "Kayýt düzenlenemedi.";
            }
            else
                log.Mesaj = "Model uygun deðil.";

            List<usp_LogTypesSelect_Result> tableLogTipler = entity.usp_LogTypesSelect(null).ToList();
            log.LogTypesList = tableLogTipler.ToSelectList<usp_LogTypesSelect_Result, SelectListItem>("ID", "Name", log.LogTypeID);

            return View("Duzenle", log);
        }

        public JsonResult Sil(int id)
        {
            if (curUser.HasRight("Loglar", "d"))
            {
                bool result = table.Delete(id);

                if (result)
                {
                    curUser.Log(id, "d", "Log Ýþlemleri");

                    return Json(true);
                }
            }

            return Json(false);
        }
    }
}
