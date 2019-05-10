using Lib;
using Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using TDLibrary;

namespace Emlak.Controllers
{
    public class SolController : Controller
    {
        EmlakSiteEntities entity = new EmlakSiteEntities();

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
        public class SiralaREReturnJson : RealEstateAds
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

            var rb = entity.RealEstateAds.Where(a => a.Active == true && a.Baslik.Contains(kelime)).ToList();

            if (rb.Count > 0)
            {
                _listRV = new List<SiralaREReturnJson>();

                foreach (var item in rb)
                {
                    SiralaREReturnJson reItem = new SiralaREReturnJson();

                    reItem.Baslik = item.Baslik;
                    reItem.Fiyat = item.Fiyat;
                    reItem.Yeni = item.Yeni;
                    reItem.RouteUrl = item.RouteUrl;
                    reItem.Enlem = item.Enlem;
                    reItem.Boylam = item.Boylam;
                    reItem.CategoryName = "";

                    var rbLang = entity.RealEstateAdsLang.Where(a => a.EmlakID == item.ID && a.Language == ToolBox.LangID).FirstOrDefault();

                    if (rbLang != null)
                    {
                        reItem.Baslik = rbLang.Baslik;
                    }

                    var rbCat = entity.Category.Where(a => a.Active == true && a.ID == item.KatID).FirstOrDefault();

                    if (rbCat != null)
                    {
                        reItem.CategoryName = rbCat.CategoryName;

                        var rbCatLang = entity.CategoryLang.Where(a => a.CategoryID == rbCat.ID && a.Language == ToolBox.LangID).FirstOrDefault();

                        if (rb.Count > 0)
                        {
                            reItem.CategoryName = rbCatLang.CategoryName;
                        }
                    }

                    List<Assignments> picAssign = ToolBox.GetAssignmentList(new Assignments()
                    {
                        TargetType = "RealEstateAds",
                        MainType = "PicturesNoLang",
                        TargetTypeID = item.ID
                    });

                    if (picAssign.Count > 0)
                    {
                        int? mID = picAssign.FirstOrDefault().MainTypeID;

                        var rbPic = entity.PicturesNoLang.Where(a => a.Active == true && a.ID == mID).FirstOrDefault();

                        if (rbPic != null)
                        {
                            reItem.PictureName = rbPic.PictureName;
                        }
                        else
                        {
                            reItem.PictureName = "";
                        }
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
            RealEstateAdsModel model = null;

            var realestateads = entity.RealEstateAds.Where(a => a.Active == true && a.Code == kod).FirstOrDefault();

            if (realestateads != null)
            {
                model = new RealEstateAdsModel();
                model.RouteUrl = realestateads.RouteUrl;
            }

            return model;
        }

        [HttpGet]
        public JsonResult GununIlani()
        {
            RealEstateListViewModel model = new RealEstateListViewModel();

            var rea = entity.RealEstateAds.Where(a => a.Active == true && a.GununEmlagi == true).FirstOrDefault();

            if (rea != null)
            {
                model.Fiyat = rea.Fiyat;
                model.RouteUrl = rea.RouteUrl;

                var reaLang = entity.RealEstateAdsLang.Where(a => a.EmlakID == rea.ID && a.Language == ToolBox.LangID).FirstOrDefault();

                if (reaLang != null)
                {
                    model.Baslik = reaLang.Baslik;

                    List<Assignments> picAssign = ToolBox.GetAssignmentList(new Assignments()
                    {
                        TargetType = "RealEstateAds",
                        MainType = "PicturesNoLang",
                        TargetTypeID = rea.ID
                    });

                    if (picAssign.Count > 0)
                    {
                        int? mtID = picAssign.FirstOrDefault().MainTypeID;

                        var rbPicLang = entity.PicturesNoLang.Where(a => a.Active == true && a.ID == mtID).FirstOrDefault();

                        if (rbPicLang != null)
                        {
                            model.Picture = AppMgr.UploadPath + "/Gallery/Thumb/" + rbPicLang.PictureName;
                        }
                        else
                        {
                            model.Picture = AppMgr.ImagePath + "/resimyok.png";
                        }
                    }
                }
                else
                {
                    model.Baslik = rea.Baslik;
                }
            }

            return Json(model, JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public JsonResult YeniIlanlar(int adet = 0)
        {
            List<RealEstateListViewModel> modelList = new List<RealEstateListViewModel>();

            List<RealEstateAds> rb = null;

            if(adet == 0)
            {
                rb = entity.RealEstateAds.Where(a => a.Active == true && a.Yeni == true).ToList();
            }
            else
            {
                rb = entity.RealEstateAds.Where(a => a.Active == true && a.Yeni == true).Take(adet).ToList();
            }


            if (rb.Count > 0)
            {
                foreach (var item in rb)
                {
                    RealEstateListViewModel model = new RealEstateListViewModel();

                    model.Fiyat = item.Fiyat;
                    model.RouteUrl = item.RouteUrl;

                    var reaLang = entity.RealEstateAdsLang.Where(a => a.EmlakID == item.ID && a.Language == ToolBox.LangID).FirstOrDefault();

                    if (rb.Count > 0)
                    {
                        model.Baslik = reaLang.Baslik;

                        List<Assignments> picAssign = ToolBox.GetAssignmentList(new Assignments()
                        {
                            TargetType = "RealEstateAds",
                            MainType = "PicturesNoLang",
                            TargetTypeID = item.ID
                        });

                        if (picAssign.Count > 0)
                        {
                            int? mtID = picAssign.FirstOrDefault().MainTypeID;

                            var rbPicLang = entity.PicturesNoLang.Where(a => a.Active == true && a.ID == mtID).FirstOrDefault();

                            if (rbPicLang != null)
                            {
                                model.Picture = AppMgr.UploadPath + "/Gallery/Thumb/" + rbPicLang.PictureName;
                            }
                            else
                            {
                                model.Picture = AppMgr.ImagePath + "/resimyok.png";
                            }
                        }
                    }
                    else
                    {
                        model.Baslik = item.Baslik;
                    }

                    modelList.Add(model);
                }
            }

            return Json(modelList, JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public JsonResult Haberler()
        {
            List<ContentLeftSideModel> modelList = new List<ContentLeftSideModel>();

            var rb = entity.Content.Where(a => a.Active == true && a.Code == "haber").ToList();

            if (rb.Count > 0)
            {
                foreach (var item in rb)
                {
                    ContentLeftSideModel model = new ContentLeftSideModel();

                    model.RouteUrl = item.RouteUrl;

                    var rbLang = entity.ContentLang.Where(a => a.ContentID == item.ID && a.Language == ToolBox.LangID).FirstOrDefault();

                    if (rbLang != null)
                    {
                        model.ContentName = rbLang.ContentName;
                    }
                    else
                    {
                        model.ContentName = item.ContentName;
                    }

                    modelList.Add(model);
                }
            }

            return Json(modelList, JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public JsonResult KategoriMenu()
        {
            List<MenuList> menuList = new List<MenuList>();

            var rb = entity.Category.Where(a => a.ParentID == 0).ToList();

            if (rb.Count > 0)
            {
                foreach (var item in rb)
                {
                    MenuList menu = new MenuList();

                    menu.LinkText = item.CategoryName;
                    menu.RouteUrl = item.RouteUrl;

                    var rbLang = entity.CategoryLang.Where(a => a.CategoryID == item.ID && a.Language == ToolBox.LangID).FirstOrDefault();

                    if (rbLang != null)
                    {
                        menu.LinkText = rbLang.CategoryName;

                        menuList.Add(menu);
                    }
                }
            }

            return Json(menuList, JsonRequestBehavior.AllowGet);
        }
        public class MenuList
        {
            public string LinkText { get; set; }
            public string RouteUrl { get; set; }
        }

        [HttpGet]
        public JsonResult Sayac()
        {
            return Json(ToolBox.VisitorCount, JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public JsonResult Sayfalar()
        {
            List<ContentLeftSideModel> modelList = new List<ContentLeftSideModel>();

            var rb = entity.Content.Where(a => a.Active == true && (a.Code == "solmenu" || a.Code == "hakkimizda" || a.Code == "iletisim")).ToList();

            if (rb.Count > 0)
            {
                foreach (var item in rb)
                {
                    ContentLeftSideModel model = new ContentLeftSideModel();

                    model.RouteUrl = item.RouteUrl;

                    var rbLang = entity.ContentLang.Where(a => a.ContentID == item.ID && a.Language == ToolBox.LangID).FirstOrDefault();

                    if (rbLang != null)
                    {
                        model.ContentName = rbLang.ContentName;
                    }
                    else
                    {
                        model.ContentName = item.ContentName;
                    }

                    modelList.Add(model);
                }
            }

            return Json(modelList, JsonRequestBehavior.AllowGet);
        }
    }
}