using Emlak.Data;
using Lib;
using Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Mvc;
using TDLibrary;

namespace Emlak.Controllers
{
    public class SharedController : Controller
    {
        EmlakEntities entity = new EmlakEntities();

        [HttpGet]
        public JsonResult GetLangs()
        {
            List<Dil> rb = entity.Translation.ToList().ChangeModelList<Dil, Translation>();

            if (rb != null)
            {
                var list = ((from a in rb
                             select new
                             {
                                 FlagImage = a.Flag == null ? "" : AppMgr.UploadPath + "/" + a.Flag,
                                 ShortName = a.ShortName == null ? "" : a.ShortName,
                                 LangName = a.TransName == null ? "" : a.TransName,
                             }).ToList());

                return Json(list, JsonRequestBehavior.AllowGet);
            }

            return Json(new List<Dil>(), JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public JsonResult ChangeLang(string lang)
        {
            try
            {
                Session["lang"] = lang;
            }
            catch (Exception)
            {
                return Json(false, JsonRequestBehavior.AllowGet);
            }

            return Json(true, JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public JsonResult KodlaGetir(string kod)
        {
            return Json(LangBaslik.KodlaGetir(kod), JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public JsonResult RasgeleBanner()
        {
            return Json(ToolBox.ShuffleBanner(), JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public JsonResult BannerSlider()
        {
            return Json(ToolBox.Banners(), JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public JsonResult IcerikGetir(string kod)
        {
            IcerikJson icerik = new IcerikJson();

            var content = entity.sp_ContentDetailByUrl(kod, ToolBox.LangCode).FirstOrDefault();

            if (content != null)
            {
                icerik.Baslik = content.ContentName;
                icerik.Aciklama = content.Description;
            }

            if (kod == "Iletisim")
            {
                string code = ToolBox.LangCode == "TR" ? "iletisim" : "contact";

                var rbPic = entity.sp_PictureByCodeSelect(code).FirstOrDefault();

                if (rbPic != null)
                {
                    icerik.Resim = AppMgr.UploadPath + "/" + rbPic.PictureUrl;
                }
                else
                {
                    icerik.Resim = AppMgr.ImagePath + "/iletisim.png";
                }
            }

            return Json(icerik, JsonRequestBehavior.AllowGet);
        }
        public class IcerikJson
        {
            public string Baslik { get; set; }
            public string Aciklama { get; set; }
            public string Resim { get; set; }
        }

        [HttpGet]
        public JsonResult Kategoriler(string kod)
        {
            var list = entity.sp_CategoryDetail(ToolBox.LangCode).ToList();

            return Json(list, JsonRequestBehavior.AllowGet);
        }
    }
}