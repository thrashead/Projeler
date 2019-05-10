using Lib;
using Models.FirmaIlanModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using TDFramework;
using TDFramework.Common;

namespace IKProje.Areas.Sirket.Controllers
{
    public class IlanController : Controller
    {
        public ActionResult Listele()
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

        public ActionResult Ver()
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

        public ActionResult Guncelle(string id, string ilan)
        {
            if (SabitDegerler.AktifFirma != null)
            {
                if (!String.IsNullOrEmpty(ilan) && !String.IsNullOrEmpty(id))
                {
                    Table<FirmaIlan> table = new Table<FirmaIlan>();
                    table.WhereList.Add(new Where() { Column = FirmaIlanColumns.IlanNo, Values = new List<dynamic>() { id } });

                    table.SelectSettings.Top = 1;

                    table.Select();

                    if (table.HasData)
                    {
                        return View(((table.Data) as List<FirmaIlan>).FirstOrDefault());
                    }
                    else
                    {
                        return SabitSayfalar.Sirket.SirketAnaSayfa;
                    }
                }
                else
                {
                    return SabitSayfalar.Sirket.SirketAnaSayfa;
                }
            }
            else
            {
                return SabitSayfalar.Sirket.SirketGiris;
            }
        }
    }
}
