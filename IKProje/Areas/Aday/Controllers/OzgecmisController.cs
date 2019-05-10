using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using TDLibrary;
using TDFramework;
using TDFramework.Common;
using Models.KullaniciModel;
using Lib;
using Models.OnyaziModel;

namespace IKProje.Areas.Aday.Controllers
{
    public class OzgecmisController : Controller
    {
        public ActionResult AnaSayfa()
        {
            if (SabitDegerler.AktifKullanici == null)
            {
                return SabitSayfalar.Aday.AdayGiris;
            }
            else
            {
                return View();
            }
        }

        [HttpGet]
        public JsonResult KullaniciJson()
        {
            if (SabitDegerler.AktifKullanici != null)
            {
                return Json(SabitDegerler.AktifKullanici, JsonRequestBehavior.AllowGet);
            }
            else
            {
                return Json(null, JsonRequestBehavior.AllowGet);
            }
        }

        public ActionResult Basvurular()
        {
            if (SabitDegerler.AktifKullanici != null)
            {
                return View();
            }
            else
            {
                return SabitSayfalar.Aday.AdayGiris;
            }
        }

        public ActionResult Goster()
        {
            if (SabitDegerler.AktifKullanici != null)
            {
                return View(SabitDegerler.AktifKullanici);
            }
            else
            {
                return SabitSayfalar.Aday.AdayGiris;
            }
        }

        public ActionResult Yazdir()
        {
            if (SabitDegerler.AktifKullanici != null)
            {
                return View(SabitDegerler.AktifKullanici);
            }
            else
            {
                return SabitSayfalar.Aday.AdayGiris;
            }
        }

        public ActionResult Guncelle()
        {
            if (SabitDegerler.AktifKullanici != null)
            {
                return View();
            }
            else
            {
                return SabitSayfalar.Aday.AdayGiris;
            }
        }

        public ActionResult Onyazilar()
        {
            if (SabitDegerler.AktifKullanici != null)
            {
                Table<Onyazi> tablo = new Table<Onyazi>();
                tablo.Columns = new List<OnyaziColumns>()
                {
                    OnyaziColumns.ID,
                    OnyaziColumns.Baslik
                };

                tablo.WhereList.Add(new Where() { Column = OnyaziColumns.Aktif, Values = new List<dynamic>() { true } });
                tablo.WhereList.Add(new Where() { Column = OnyaziColumns.KullaniciID, Values = new List<dynamic>() { SabitDegerler.AktifKullanici.ID } });

                tablo.Select();

                if (tablo.HasData)
                {
                    return View(tablo.Data as List<Onyazi>);
                }

                return View(new List<Onyazi>());
            }
            else
            {
                return SabitSayfalar.Aday.AdayGiris;
            }
        }

        public ActionResult Dosyalar()
        {
            if (SabitDegerler.AktifKullanici != null)
            {
                return View();
            }
            else
            {
                return SabitSayfalar.Aday.AdayGiris;
            }
        }

        public ActionResult Mesajlar()
        {
            if (SabitDegerler.AktifKullanici != null)
            {
                return View();
            }
            else
            {
                return SabitSayfalar.Aday.AdayGiris;
            }
        }
    }
}
