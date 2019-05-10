using System.Linq;
using System.Collections.Generic;
using System.Web.UI.HtmlControls;
using System.Web.Http.Metadata;
using TDLibrary;
using System.Web;
using System;
using Emlak;
using System.Xml;
using Newtonsoft.Json;

namespace Lib
{
    public class OptionList
    {
        public string Value { get; set; }
        public string Text { get; set; }
    }

    public class ToolBox
    {
        public static void FillMeta(dynamic _viewBag, string _url)
        {
            _viewBag.MetaTags = "";

            List<string> urlBlocks = Urling.URLBlocks;

            if (urlBlocks.Count == 3)
            {
                if (urlBlocks[1].ToHyperLinkText(true) == "icerik")
                {
                    _url = urlBlocks[2];
                }
            }

            if (urlBlocks.Count >= 4)
            {
                if (urlBlocks[2].ToHyperLinkText(true) == "detay")
                {
                    _url = urlBlocks[3];
                }
                else
                {
                    if (urlBlocks[3].ToHyperLinkText(true) == "satilik")
                    {
                        _viewBag.MetaTags += CreateMetaTags("Title", "Emlak Sitesi - Satılık İlanlar");
                        _viewBag.MetaTags += CreateMetaTags("Keywords", "emlak,emlak sayfası,emlaklar,satılık,emlak ilanları");
                        _viewBag.MetaTags += CreateMetaTags("Description", "Emlak Sitesi, Satılık İlanlar");
                        return;
                    }
                    else if (urlBlocks[3].ToHyperLinkText(true) == "kiralik")
                    {
                        _viewBag.MetaTags += CreateMetaTags("Title", "Emlak Sitesi - Kiralık İlanlar");
                        _viewBag.MetaTags += CreateMetaTags("Keywords", "emlak,emlak sayfası,emlaklar,kiralık,emlak ilanları");
                        _viewBag.MetaTags += CreateMetaTags("Description", "Emlak Sitesi, Kiralık İlanlar");
                        return;
                    }
                    else if (urlBlocks[3].ToHyperLinkText(true) == "yeni")
                    {
                        _viewBag.MetaTags += CreateMetaTags("Title", "Emlak Sitesi - Yeni İlanlar");
                        _viewBag.MetaTags += CreateMetaTags("Keywords", "emlak,emlak sayfası,emlaklar,yeni,emlak ilanları");
                        _viewBag.MetaTags += CreateMetaTags("Description", "Emlak Sitesi, Yeni İlanlar");
                        return;
                    }
                    else if (urlBlocks[3].ToHyperLinkText(true) == "tumu")
                    {
                        _viewBag.MetaTags += CreateMetaTags("Title", "Emlak Sitesi - Tüm İlanlar");
                        _viewBag.MetaTags += CreateMetaTags("Keywords", "emlak,emlak sayfası,emlaklar,emlak ilanları");
                        _viewBag.MetaTags += CreateMetaTags("Description", "Emlak Sitesi, Tüm İlanlar");
                        return;
                    }
                    else
                    {
                        _url = urlBlocks[3];
                    }
                }
            }

            if (string.IsNullOrEmpty(_viewBag.MetaTags))
            {
                _viewBag.MetaTags += CreateMetaTags("Title", "Emlak Sitesi");
                _viewBag.MetaTags += CreateMetaTags("Keywords", "emlak,emlak sayfası,emlaklar,emlak ilanları");
                _viewBag.MetaTags += CreateMetaTags("Description", "Emlak Sitesi, Emlak İlanları");
            }
        }

        public static string ReturnTitle()
        {
            List<string> urlBlocks = Urling.URLBlocks;

            if (urlBlocks.Contains("localhost"))
            {
                urlBlocks.Remove("localhost");
            }

            string url = "";

            if (HttpContext.Current.Session["Emlaklar"] != null)
            {
                return "Emlak Sitesi - Detaylı Arama Sonuçları";
            }
            else
            {
                if (urlBlocks.Count <= 1)
                {
                    return "Emlak Sitesi - Ana Sayfa";
                }
                else
                {
                    if (urlBlocks.Count == 3)
                    {
                        if (urlBlocks[1].ToHyperLinkText(true) == "icerik")
                        {
                            url = urlBlocks[2];

                            return "Emlak Sitesi - " + ContentNameFromURL(url);
                        }
                        else if (urlBlocks[1].ToHyperLinkText(true) == "emlak")
                        {
                            if (urlBlocks[2].ToHyperLinkText(true) == "detayliara")
                            {
                                return "Emlak Sitesi - Detaylı Ara";
                            }

                            return "Emlak Sitesi - Tüm İlanlar";
                        }
                        else
                        {
                            return "Emlak Sitesi - Ana Sayfa";
                        }
                    }

                    if (urlBlocks.Count >= 4)
                    {
                        if (urlBlocks[2].ToHyperLinkText(true) == "detay")
                        {
                            url = urlBlocks[3];
                        }
                        else
                        {
                            if (urlBlocks[3].ToHyperLinkText(true) == "satilik")
                            {
                                return "Emlak Sitesi - Satılık İlanlar";
                            }
                            else if (urlBlocks[3].ToHyperLinkText(true) == "kiralik")
                            {
                                return "Emlak Sitesi - Kiralık İlanlar";
                            }
                            else if (urlBlocks[3].ToHyperLinkText(true) == "yeni")
                            {
                                return "Emlak Sitesi - Yeni İlanlar";
                            }
                            else if (urlBlocks[3].ToHyperLinkText(true) == "tumu")
                            {
                                return "Emlak Sitesi - Tüm İlanlar";
                            }
                            else
                            {
                                url = urlBlocks[3];
                                return "Emlak Sitesi - " + CategoryNameFromURL(url);
                            }
                        }
                    }
                }
            }

            return "";
        }

        public static string CreateMetaTags(string _metaName, string _metaValue)
        {
            string returnMeta = "";
            returnMeta += "<meta name='" + _metaName + "' content='" + _metaValue + "'/>";
            return returnMeta;
        }

        public static string ShuffleBanner()
        {
            EmlakSiteEntities entity = new EmlakSiteEntities();

            List<PicturesNoLang> _listPicturesNoLang = new List<PicturesNoLang>();

            string BannerImage = AppMgr.ImagePath + "/banner.jpg";

            var rb = entity.Gallery.Where(a => a.Active == true && a.Code == "banner").FirstOrDefault();

            if (rb != null)
            {
                List<Assignments> assignList = ToolBox.GetAssignmentList(
                new Assignments()
                {
                    TargetType = "Gallery",
                    MainType = "PicturesNoLang",
                    TargetTypeID = rb.ID
                });

                foreach (Assignments item in assignList)
                {
                    var rbPic = entity.PicturesNoLang.Where(a => a.ID == item.MainTypeID).ToList();

                    if (rbPic.Count > 0)
                    {
                        _listPicturesNoLang.AddRange(rbPic);
                    }
                }
            }

            if (_listPicturesNoLang.Count > 0)
            {
                BannerImage = AppMgr.UploadPath + "/Gallery/" + _listPicturesNoLang.Shuffle().FirstOrDefault().PictureName;
            }

            return BannerImage;
        }

        public static string GetLogo()
        {
            EmlakSiteEntities entity = new EmlakSiteEntities();

            var rbPic = entity.PicturesNoLang.Where(a => a.Active == true && a.Code == "Logo").FirstOrDefault();

            if (rbPic != null)
            {
                return AppMgr.UploadPath + "/Gallery/" + rbPic.PictureName;
            }

            return AppMgr.ImagePath + "/logo.png";
        }

        public static List<Assignments> GetAssignmentList(Assignments _assignProps)
        {
            EmlakSiteEntities entity = new EmlakSiteEntities();

            var rb = entity.Assignments.ToList();

            if (_assignProps.TargetType != null)
            {
                rb = rb.Where(a => a.TargetType == _assignProps.TargetType).ToList();
            }

            if (_assignProps.MainType != null)
            {
                rb = rb.Where(a => a.MainType == _assignProps.MainType).ToList();
            }

            if (_assignProps.TargetTypeID != null)
            {
                rb = rb.Where(a => a.TargetTypeID == _assignProps.TargetTypeID).ToList();
            }

            if (_assignProps.MainTypeID != null)
            {
                rb = rb.Where(a => a.MainTypeID == _assignProps.MainTypeID).ToList();
            }

            return rb.JsonConverter<List<Assignments>>();
        }

        public static int LangID
        {
            get
            {
                EmlakSiteEntities entity = new EmlakSiteEntities();

                var rbLang = entity.Lang.Where(a => a.ShortName == ToolBox.LangCode).FirstOrDefault();

                if (rbLang != null)
                {
                    return rbLang.ID;
                }

                return 1;
            }
        }

        public static string LangCode
        {
            get
            {
                string lang = HttpContext.Current.Session["lang"] != null ? HttpContext.Current.Session["lang"].ToString().IsNull() == true ? "TR" : HttpContext.Current.Session["lang"].ToString() : "TR";

                return lang;
            }
        }

        public static string VisitorCount
        {
            get
            {
                EmlakSiteEntities entity = new EmlakSiteEntities();

                string sayac = "0";

                string date = DateTime.Now.ToShortDateString();

                var rb = entity.Rank.Where(a => a.Code == date && a.RankName == HttpContext.Current.Request.UserHostAddress && a.Active == true).FirstOrDefault();

                if (rb == null)
                {
                    entity.Rank.Add(new Rank() { Code = date, RankName = HttpContext.Current.Request.UserHostAddress, Active = true });
                    entity.SaveChanges();
                }

                var rbSayac = entity.Rank.ToList();

                if (rbSayac.Count > 0)
                {
                    sayac = rbSayac.Count.ToString();
                }

                return sayac;
            }
        }

        public static string NewLogo
        {
            get
            {
                EmlakSiteEntities entity = new EmlakSiteEntities();

                string newLogo = ToolBox.LangCode == "TR" ? AppMgr.ImagePath + "/yeni.png" : AppMgr.ImagePath + "/new.png";

                var rbPic = entity.Pictures.Where(a => a.Code == "yeniikon" && a.Active == true).FirstOrDefault();

                if (rbPic != null)
                {
                    var rbPicLang = entity.PicturesLang.Where(a => a.PictureID == rbPic.ID && a.Language == ToolBox.LangID).FirstOrDefault();

                    if (rbPicLang != null)
                    {
                        newLogo = AppMgr.UploadPath + "/Gallery/" + rbPicLang.PictureName;
                    }
                }

                return newLogo;
            }
        }

        public static string DetailLogo
        {
            get
            {
                EmlakSiteEntities entity = new EmlakSiteEntities();

                string detailLogo = ToolBox.LangCode == "TR" ? AppMgr.ImagePath + "/detayicon.png" : AppMgr.ImagePath + "/detailicon.png";

                var rbPic = entity.Pictures.Where(a => a.Code == "detayikon" && a.Active == true).FirstOrDefault();

                if (rbPic != null)
                {
                    var rbPicLang = entity.PicturesLang.Where(a => a.PictureID == rbPic.ID && a.Language == ToolBox.LangID).FirstOrDefault();

                    if (rbPicLang != null)
                    {
                        detailLogo = AppMgr.UploadPath + "/Gallery/" + rbPicLang.PictureName;
                    }
                }

                return detailLogo;
            }
        }

        public static string ContactPic
        {
            get
            {
                EmlakSiteEntities entity = new EmlakSiteEntities();

                string resim = ToolBox.LangCode == "TR" ? AppMgr.ImagePath + "/iletisim.png" : AppMgr.ImagePath + "/contact.png";

                var rbPic = entity.Pictures.Where(a => a.Code == "iletisim" && a.Active == true).FirstOrDefault();

                if (rbPic != null)
                {
                    var rbPicLang = entity.PicturesLang.Where(a => a.PictureID == rbPic.ID && a.Language == ToolBox.LangID).FirstOrDefault();

                    if (rbPicLang != null)
                    {
                        resim = AppMgr.UploadPath + "/Gallery/" + rbPicLang.PictureName;
                    }
                }

                return resim;
            }
        }

        public static string CategoryNameFromURL(string url)
        {
            EmlakSiteEntities entity = new EmlakSiteEntities();

            var rb = entity.Category.Where(a => a.RouteUrl == url).FirstOrDefault();

            if (rb != null)
            {
                var rbLang = entity.CategoryLang.Where(a => a.CategoryID == rb.ID && a.Language == ToolBox.LangID).FirstOrDefault();

                if (rbLang != null)
                {
                    return rbLang.CategoryName;
                }
            }
            else
            {
                return url;
            }

            return rb.CategoryName;
        }

        public static string ContentNameFromURL(string url)
        {
            EmlakSiteEntities entity = new EmlakSiteEntities();

            var rb = entity.Content.Where(a => a.RouteUrl == url).FirstOrDefault();

            if (rb != null)
            {
                var rbLang = entity.ContentLang.Where(a => a.ContentID == rb.ID && a.Language == ToolBox.LangID).FirstOrDefault();

                if (rbLang != null)
                {
                    return rbLang.ContentName;
                }
            }
            else
            {
                return url;
            }

            return rb.ContentName;
        }

        public static Users UserKontrol()
        {
            Users user = null;

            if (HttpContext.Current.Session["CurrentUser"] != null)
            {
                try
                {
                    user = ((Users)HttpContext.Current.Session["CurrentUser"]);
                }
                catch
                {
                    HttpContext.Current.Session["CurrentUser"] = null;
                    HttpContext.Current.Response.Redirect(AppMgr.MainPath);
                }
            }
            else
            {
                HttpContext.Current.Session["CurrentUser"] = null;
                HttpContext.Current.Response.Redirect(AppMgr.MainPath);
            }

            return user;
        }
    }

    public static class ExtMethods
    {
        public static dynamic JsonConverter<T>(this object jsonObject)
        {
            var jsonList = JsonConvert.SerializeObject(jsonObject, Newtonsoft.Json.Formatting.Indented,
                    new JsonSerializerSettings()
                    {
                        ReferenceLoopHandling = ReferenceLoopHandling.Ignore
                    });

            var jsonListDS = JsonConvert.DeserializeObject<T>(jsonList);

            return jsonListDS;
        }
    }
}