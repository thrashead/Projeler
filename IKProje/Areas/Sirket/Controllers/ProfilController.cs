using System.Collections.Generic;
using System.Linq;
using System.Web.Mvc;
using Lib;
using Models.FirmaModel;
using TDFramework;
using TDFramework.Common;

namespace IKProje.Areas.Sirket.Controllers
{
    public class ProfilController : Controller
    {
        public ActionResult AnaSayfa()
        {
            if (SabitDegerler.AktifFirma != null)
            {
                return View(SabitDegerler.AktifFirma);
            }
            else
            {
                return SabitSayfalar.Sirket.SirketGiris;
            }
        }

        public ActionResult Hakkimizda()
        {
            if (SabitDegerler.AktifFirma != null)
            {
                return View();
            }
            else
            {
                return SabitSayfalar.Sirket.SirketGiris;
            }
        }

        public ActionResult Dosyalar()
        {
            if (SabitDegerler.AktifFirma != null)
            {
                return View();
            }
            else
            {
                return SabitSayfalar.Sirket.SirketGiris;
            }
        }

        public ActionResult Basvurular()
        {
            if (SabitDegerler.AktifFirma != null)
            {
                return View();
            }
            else
            {
                return SabitSayfalar.Sirket.SirketGiris;
            }
        }

        public ActionResult Mesajlar()
        {
            if (SabitDegerler.AktifFirma != null)
            {
                return View();
            }
            else
            {
                return SabitSayfalar.Sirket.SirketGiris;
            }
        }

        public ActionResult Ozgecmisler()
        {
            if (SabitDegerler.AktifFirma != null)
            {
                return View();
            }
            else
            {
                return SabitSayfalar.Sirket.SirketGiris;
            }
        }

        public ActionResult Detay(string id)
        {
            Firma firma = new Firma();

            Table<Firma> table = new Table<Firma>();

            table.WhereList.Add(new Where(FirmaColumns.Url, id));
            table.SelectSettings.Top = 1;

            table.Select();

            if (table.HasData)
            {
                firma = ((List<Firma>)table.Data).FirstOrDefault();

                return View(firma);
            }
            else
            {
                return SabitSayfalar.AnaSayfa;
            }
        }
    }
}