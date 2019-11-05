using System.Linq;
using System.Collections.Generic;
using TDLibrary;
using System.Web;
using System;
using Emlak;
using Newtonsoft.Json;
using Emlak.Data;
using Models;

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
                if (urlBlocks[1].ToUrl(true) == "icerik")
                {
                    _url = urlBlocks[2];
                }
            }

            if (urlBlocks.Count >= 4)
            {
                if (urlBlocks[2].ToUrl(true) == "detay")
                {
                    _url = urlBlocks[3];
                }
                else
                {
                    if (urlBlocks[3].ToUrl(true) == "satilik")
                    {
                        _viewBag.MetaTags += CreateMetaTags("Title", "Emlak Sitesi - Satılık İlanlar");
                        _viewBag.MetaTags += CreateMetaTags("Keywords", "emlak,emlak sayfası,emlaklar,satılık,emlak ilanları");
                        _viewBag.MetaTags += CreateMetaTags("Description", "Emlak Sitesi, Satılık İlanlar");
                        return;
                    }
                    else if (urlBlocks[3].ToUrl(true) == "kiralik")
                    {
                        _viewBag.MetaTags += CreateMetaTags("Title", "Emlak Sitesi - Kiralık İlanlar");
                        _viewBag.MetaTags += CreateMetaTags("Keywords", "emlak,emlak sayfası,emlaklar,kiralık,emlak ilanları");
                        _viewBag.MetaTags += CreateMetaTags("Description", "Emlak Sitesi, Kiralık İlanlar");
                        return;
                    }
                    else if (urlBlocks[3].ToUrl(true) == "yeni")
                    {
                        _viewBag.MetaTags += CreateMetaTags("Title", "Emlak Sitesi - Yeni İlanlar");
                        _viewBag.MetaTags += CreateMetaTags("Keywords", "emlak,emlak sayfası,emlaklar,yeni,emlak ilanları");
                        _viewBag.MetaTags += CreateMetaTags("Description", "Emlak Sitesi, Yeni İlanlar");
                        return;
                    }
                    else if (urlBlocks[3].ToUrl(true) == "tumu")
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
                        if (urlBlocks[1].ToUrl(true) == "icerik")
                        {
                            url = urlBlocks[2];

                            return "Emlak Sitesi - " + ContentNameFromURL(url);
                        }
                        else if (urlBlocks[1].ToUrl(true) == "emlak")
                        {
                            if (urlBlocks[2].ToUrl(true) == "detayliara")
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
                        if (urlBlocks[2].ToUrl(true) == "detay")
                        {
                            url = urlBlocks[3];
                        }
                        else
                        {
                            if (urlBlocks[3].ToUrl(true) == "satilik")
                            {
                                return "Emlak Sitesi - Satılık İlanlar";
                            }
                            else if (urlBlocks[3].ToUrl(true) == "kiralik")
                            {
                                return "Emlak Sitesi - Kiralık İlanlar";
                            }
                            else if (urlBlocks[3].ToUrl(true) == "yeni")
                            {
                                return "Emlak Sitesi - Yeni İlanlar";
                            }
                            else if (urlBlocks[3].ToUrl(true) == "tumu")
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
            EmlakEntities entity = new EmlakEntities();

            string BannerImage = AppMgr.ImagePath + "/banner.jpg";

            List<Resim> pictures = entity.sp_PictureByCodeSelect("banner").ToList().ChangeModelList<Resim, sp_PictureByCodeSelect_Result>();

            if (pictures.Count > 0)
            {
                BannerImage = AppMgr.UploadPath + "/" + pictures.Shuffle().FirstOrDefault().PictureUrl;
            }

            return BannerImage;
        }

        public static string GetLogo()
        {
            EmlakEntities entity = new EmlakEntities();

            Resim picture = entity.sp_PictureByCodeSelect("logo").FirstOrDefault().ChangeModel<Resim>();

            if (picture != null)
            {
                return AppMgr.UploadPath + "/" + picture.PictureUrl;
            }

            return AppMgr.ImagePath + "/logo.png";
        }

        public static int LangID
        {
            get
            {
                if(HttpContext.Current.Session["LangID"] != null)
                {
                    return (int)HttpContext.Current.Session["LangID"];
                }
                else
                {
                    EmlakEntities entity = new EmlakEntities();

                    int? langID = entity.sp_TranslationIDByShortName(LangCode).FirstOrDefault();

                    if (langID != null)
                    {
                        HttpContext.Current.Session["LangID"] = (int)langID;
                        return (int)langID;
                    }
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
                EmlakEntities entity = new EmlakEntities();

                int sayac = entity.sp_VisitorCounterCheck(HttpContext.Current.Request.UserHostAddress, DateTime.Now.ToShortDateString());

                return sayac.ToString();
            }
        }

        public static string NewLogo
        {
            get
            {
                EmlakEntities entity = new EmlakEntities();

                string code = LangCode == "TR" ? "yeniikon" : "newicon";

                var rbPic = entity.sp_PictureByCodeSelect(code).FirstOrDefault();

                if (rbPic != null)
                {
                    return AppMgr.UploadPath + "/" + rbPic.PictureUrl;
                }

                return LangCode == "TR" ? AppMgr.ImagePath + "/yeni.png" : AppMgr.ImagePath + "/new.png";
            }
        }

        public static string DetailLogo
        {
            get
            {
                EmlakEntities entity = new EmlakEntities();

                string code = LangCode == "TR" ? "detayicon" : "detailicon";

                var rbPic = entity.sp_PictureByCodeSelect(code).FirstOrDefault();

                if (rbPic != null)
                {
                    return AppMgr.UploadPath + "/" + rbPic.PictureUrl;
                }

                return AppMgr.ImagePath + "/" + code + ".png";
            }
        }

        public static string ContactPic
        {
            get
            {
                EmlakEntities entity = new EmlakEntities();

                string code = LangCode == "TR" ? "iletisim" : "contact";

                var rbPic = entity.sp_PictureByCodeSelect(code).FirstOrDefault();

                if (rbPic != null)
                {
                    return AppMgr.UploadPath + "/" + rbPic.PictureUrl;
                }

                return AppMgr.ImagePath + "/" + code + ".png";
            }
        }

        public static string CategoryNameFromURL(string url)
        {
            EmlakEntities entity = new EmlakEntities();

            string rbCategoryName = entity.sp_CategoryNameByUrlAndTransCode(url, LangCode).FirstOrDefault();

            return rbCategoryName;
        }

        public static string ContentNameFromURL(string url)
        {
            EmlakEntities entity = new EmlakEntities();

            string rbContentName = entity.sp_ContentNameByUrlAndTransCode(url, LangCode).FirstOrDefault();

            return rbContentName;
        }

        public static Kullanicilar UserKontrol()
        {
            Kullanicilar user = null;

            if (HttpContext.Current.Session["CurrentUser"] != null)
            {
                try
                {
                    user = ((Kullanicilar)HttpContext.Current.Session["CurrentUser"]);
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