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
        EmlakSiteEntities entity = new EmlakSiteEntities();

        [HttpGet]
        public JsonResult GetLangs()
        {
            List<Lang> rb = entity.Lang.ToList();

            if (rb != null)
            {
                var list = ((from a in rb
                             select new
                             {
                                 FlagImage = a.FlagImage == null ? "" : a.FlagImage,
                                 ShortName = a.ShortName == null ? "" : a.ShortName,
                                 LangName = a.LangName == null ? "" : a.LangName,
                             }).ToList());

                return Json(list, JsonRequestBehavior.AllowGet);
            }

            return Json(new List<Lang>(), JsonRequestBehavior.AllowGet);
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
            return Json(Lib.ToolBox.ShuffleBanner(), JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public JsonResult IcerikGetir(string kod)
        {
            IcerikJson icerik = new IcerikJson();

            var content = entity.Content.Where(a => a.Active == true && a.RouteUrl == kod).FirstOrDefault();

            if (content != null)
            {
                icerik.Baslik = content.ContentName;

                var contentLang = entity.ContentLang.Where(a => a.ContentID == content.ID && a.Language == ToolBox.LangID).FirstOrDefault();

                if (contentLang != null)
                {
                    icerik.Baslik = contentLang.ContentName;
                    icerik.Aciklama = contentLang.Description;
                }
            }

            if (kod == "Iletisim")
            {
                var rbPic = entity.Pictures.Where(a => a.Active == true && a.Code == "iletisim").FirstOrDefault();

                if (rbPic != null)
                {
                    var rbPicLang = entity.PicturesLang.Where(a => a.PictureID == rbPic.ID && a.Language == ToolBox.LangID).FirstOrDefault();

                    if (rbPicLang != null)
                    {
                        icerik.Resim = AppMgr.UploadPath + "/Gallery/" + rbPicLang.PictureName;
                    }
                    else
                    {
                        icerik.Resim = AppMgr.ImagePath + "/iletisim.png";
                    }
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
            var list = new List<Category>();

            var listTemp = ((from a in entity.Category
                             join b in entity.CategoryLang on a.ID equals b.CategoryID
                             where a.Active == true && a.ParentID == 0
                             && b.Language == ToolBox.LangID
                             select new
                             {
                                 ID = a.ID == null ? 0 : a.ID,
                                 CategoryName = a.CategoryName == null ? "" : a.CategoryName,
                                 Code = a.Code == null ? "" : a.Code,
                                 Active = a.Active == null ? false : a.Active,
                                 Queue = a.Queue == null ? 0 : a.Queue,
                                 RouteUrl = a.RouteUrl == null ? "" : a.RouteUrl,
                                 Sample = b.CategoryName == null ? "" : b.CategoryName
                             }).Take(4).ToList());

            list = listTemp.Select(a => new Category
            {
                ID = a.ID == null ? 0 : a.ID,
                CategoryName = a.CategoryName == null ? "" : a.CategoryName,
                Code = a.Code == null ? "" : a.Code,
                Active = a.Active == null ? false : a.Active,
                Queue = a.Queue == null ? 0 : a.Queue,
                RouteUrl = a.RouteUrl == null ? "" : a.RouteUrl,
                Sample = a.Sample == null ? "" : a.Sample,
            }).ToList();

            return Json(list, JsonRequestBehavior.AllowGet);
        }
    }
}