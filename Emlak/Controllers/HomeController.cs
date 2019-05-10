using Lib;
using Models;
using System.Collections.Generic;
using System.Linq;
using System.Web.Mvc;
using TDLibrary;

namespace Emlak.Controllers
{
    public class HomeController : Controller
    {
        EmlakSiteEntities entity = new EmlakSiteEntities();

        [HttpGet]
        public JsonResult Slider()
        {
            var rb = entity.Gallery.Where(a => a.Active == true && a.Code == "slider").FirstOrDefault();

            if (rb != null)
            {
                var picAssign = entity.Assignments.Where(a => a.MainType == "PicturesNoLang" && a.TargetType == "Gallery" && a.TargetTypeID == rb.ID).ToList();

                if (picAssign.Count > 0)
                {
                    List<PicturesNoLang> rbPic = new List<PicturesNoLang>();
                    var list = new List<PicturesNoLang>();

                    foreach (var item in picAssign)
                    {
                        var listTemp = ((from a in entity.PicturesNoLang
                                         where a.ID == item.MainTypeID && a.Active == true
                                         select new
                                         {
                                             PictureName = a.PictureName == null ? "" : a.PictureName,
                                         }).ToList());

                        list = listTemp.Select(a => new PicturesNoLang
                        {
                            PictureName = a.PictureName == null ? "" : a.PictureName,
                        }).ToList();

                        rbPic.AddRange(list);
                    }

                    if (rbPic.Count > 0)
                    {
                        return Json(rbPic, JsonRequestBehavior.AllowGet);
                    }
                }
            }

            return Json(new List<PicturesNoLang>(), JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public JsonResult VitrinIlanlar(int adet = 0)
        {
            List<RealEstateListViewModel> modelList = new List<RealEstateListViewModel>();

            List<RealEstateAds> listRE = null;

            if (adet == 0)
            {
                listRE = entity.RealEstateAds.Where(a => a.Active == true).ToList();
            }
            else
            {
                listRE = entity.RealEstateAds.Where(a => a.Active == true).Take(adet).ToList();
            }

            if (listRE.Count > 0)
            {
                listRE = listRE.Shuffle().Take(3).ToList();

                foreach (var item in listRE)
                {
                    RealEstateListViewModel model = new RealEstateListViewModel();

                    model.Fiyat = item.Fiyat;
                    model.RouteUrl = item.RouteUrl;
                    model.Yeni = item.Yeni;

                    var rbCat = entity.Category.Where(a => a.Active == true && a.ID == item.KatID).FirstOrDefault();

                    if (rbCat != null)
                    {
                        model.CategoryName = rbCat.CategoryName;

                        var rbCatLang = entity.CategoryLang.Where(a => a.CategoryID == item.KatID && a.Language == ToolBox.LangID).FirstOrDefault();

                        if (rbCatLang != null)
                        {
                            model.CategoryName = rbCatLang.CategoryName;
                        }
                    }

                    var reaLang = entity.RealEstateAdsLang.Where(a => a.EmlakID == item.ID && a.Language == ToolBox.LangID).FirstOrDefault();

                    if (reaLang != null)
                    {
                        model.Baslik = reaLang.Baslik;

                        List<Assignments> picAssign = ToolBox.GetAssignmentList(new Assignments()
                        {
                            TargetType = "RealEstateAds",
                            MainType = "PicturesNoLang",
                            TargetTypeID = item.ID
                        });

                        if (picAssign != null)
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



        public ActionResult Index()
        {
            return View();
        }
    }
}