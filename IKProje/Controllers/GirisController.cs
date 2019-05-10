using System.Collections.Generic;
using System.Web.Mvc;
using TDFramework;
using TDFramework.Common;
using Models.FirmaModel;

namespace IKProje.Controllers
{
    public class GirisController : Controller
    {
        public ActionResult AnaSayfa()
        {
            return View();
        }

        [HttpGet]
        public JsonResult SirketLogolarJson()
        {
            List<Firma> firmalar = new List<Firma>();
            Table<Firma> table = new Table<Firma>();

            table.Columns = new List<FirmaColumns>() {
                FirmaColumns.Url,
                FirmaColumns.Guid,
                FirmaColumns.Logo
            };

            table.SelectSettings.Top = 18;
            table.WhereList.Add(new Where(FirmaColumns.Aktif, true));
            table.WhereList.Add(new Where(FirmaColumns.KullaniciAdi, "yonet", true));
            table.Select();

            if (table.HasData)
            {
                firmalar = ((List<Firma>)table.Data);
            }

            return Json(firmalar, JsonRequestBehavior.AllowGet);
        }
    }
}
