using Emlak.Data;
using Lib;
using Models;
using System.Collections.Generic;
using System.Linq;
using System.Web.Mvc;
using TDLibrary;

namespace Emlak.Controllers
{
    public class SolController : Controller
    {
        EmlakEntities entity = new EmlakEntities();

        [HttpGet]
        public JsonResult AramaSonuc(string kelime, string tip)
        {
            switch (tip)
            {
                case "kelime":
                    List<SiralaREReturnJson> kelimeModel = KelimeAra(kelime);
                    if (kelimeModel == null)
                    {
                        return Json("", JsonRequestBehavior.AllowGet);
                    }
                    else
                    {
                        return Json(kelimeModel, JsonRequestBehavior.AllowGet);
                    }
                case "kod":
                    RealEstateAdsModel kodModel = KodAra(kelime);
                    if (kodModel == null)
                    {
                        return Json("", JsonRequestBehavior.AllowGet);
                    }
                    else
                    {
                        return Json(kodModel, JsonRequestBehavior.AllowGet);
                    }
            }

            return Json(null, JsonRequestBehavior.AllowGet);
        }
        public class SiralaREReturnJson : RealEstates
        {
            public string CategoryName { get; set; }
            public string DetailLogo { get; set; }
            public string NewLogo { get; set; }
            public string PageHeader { get; set; }
            public string PictureName { get; set; }
            public int TotalCount { get; set; }
        }
        public List<SiralaREReturnJson> KelimeAra(string kelime)
        {
            List<SiralaREReturnJson> _listRV = null;

            var rb = entity.sp_RealEstatesForListSelect(ToolBox.LangCode, null, null, kelime, null, null, null, null, null).ToList();

            if (rb.Count > 0)
            {
                _listRV = new List<SiralaREReturnJson>();

                foreach (var item in rb)
                {
                    SiralaREReturnJson reItem = new SiralaREReturnJson();

                    reItem.Baslik = item.Baslik;
                    reItem.Fiyat = item.Fiyat;
                    reItem.Yeni = item.Yeni;
                    reItem.Url = item.Url;
                    reItem.Enlem = item.Enlem;
                    reItem.Boylam = item.Boylam;
                    reItem.CategoryName = item.CategoryName;

                    if (item.Picture != null)
                    {
                        reItem.PictureName = item.Picture;
                    }
                    else
                    {
                        reItem.PictureName = "";
                    }

                    reItem.NewLogo = ToolBox.NewLogo;
                    reItem.DetailLogo = ToolBox.DetailLogo;

                    _listRV.Add(reItem);
                }
            }

            return _listRV;
        }

        public RealEstateAdsModel KodAra(string kod)
        {
            string urlModel = entity.sp_RealEstatesUrlByCode(kod).FirstOrDefault();

            RealEstateAdsModel model = new RealEstateAdsModel();

            if (urlModel != null)
            {
                model.RouteUrl = urlModel;
            }
            else
            {
                model = null;
            }

            return model;
        }

        [HttpGet]
        public JsonResult GununIlani()
        {
            var item = entity.sp_RealEstatesForListSelect(ToolBox.LangCode, null, null, null, null, null, true, null, 1).FirstOrDefault();

            if (item.Picture != null)
            {
                item.Picture = AppMgr.UploadPath + "/" + item.Picture;
            }
            else
            {
                item.Picture = AppMgr.ImagePath + "/resimyok.png";
            }

            return Json(item, JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public JsonResult YeniIlanlar(int adet = 0)
        {
            var modelList = entity.sp_RealEstatesForListSelect(ToolBox.LangCode, null, null, null, null, true, null, true, adet).ToList();

            foreach (var item in modelList)
            {
                if (item.Picture != null)
                {
                    item.Picture = AppMgr.UploadPath + "/" + item.Picture;
                }
                else
                {
                    item.Picture = AppMgr.ImagePath + "/resimyok.png";
                }
            }

            return Json(modelList, JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public JsonResult Haberler()
        {
            var modelList = entity.sp_ContentNews(ToolBox.LangCode).ToList();

            return Json(modelList, JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public JsonResult KategoriMenu()
        {
            var menuList = entity.sp_CategoriesByParentID(0, ToolBox.LangCode).ToList();

            return Json(menuList, JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public JsonResult Sayac()
        {
            return Json(ToolBox.VisitorCount, JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public JsonResult Sayfalar()
        {
            var modelList = entity.sp_ContentLinks(ToolBox.LangCode).Where(a=> a.Url != "Hakkimizda" && a.Url != "Iletisim").ToList();

            return Json(modelList, JsonRequestBehavior.AllowGet);
        }
    }
}