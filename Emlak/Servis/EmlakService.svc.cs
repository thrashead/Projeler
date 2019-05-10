using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.ServiceModel;
using System.Text;
using Lib;
using TDLibrary;
using Newtonsoft.Json;

namespace Emlak.Servis
{
    public class EmlakService : IEmlakService
    {
        EmlakSiteEntities entity = new EmlakSiteEntities();

        public RealEstateData Ilan(string ilanurl)
        {
            RealEstateData ilan = new RealEstateData();

            List<RealEstateAds> dataList = entity.RealEstateAds.Where(a => a.Active == true).ToList();

            if (!String.IsNullOrEmpty(ilanurl))
            {
                switch (ilanurl)
                {
                    case "gunun-ilani":
                        dataList = dataList.Where(a => a.GununEmlagi == true).ToList();
                        break;
                    default:
                        string url = "";

                        foreach (string item in ilanurl.Split('-'))
                        {
                            url += item.FirstCharToUpperCase().ToHyperLinkText() + "-";
                        }

                        ilanurl = url.TrimEnd('-');
                        dataList = dataList.Where(a => a.RouteUrl.ToLower() == ilanurl.ToLower()).ToList();
                        break;
                }
            }

            RealEstateAds data = dataList.Take(1).FirstOrDefault();

            if (data != null)
            {
                var rbLang = entity.RealEstateAdsLang.Where(a => a.EmlakID == data.ID && a.Language == 1).FirstOrDefault();

                if (rbLang != null)
                {
                    data.Baslik = rbLang.Baslik;
                    ilan.Icerik = rbLang.Aciklama;
                }

                List<Assignments> assignList = ToolBox.GetAssignmentList(
                new Assignments()
                {
                    MainType = "PicturesNoLang",
                    TargetType = "RealEstateAds",
                    TargetTypeID = data.ID
                });

                if (assignList.Count > 0)
                {
                    foreach (var assign in assignList)
                    {
                        var rbPicNoLang = entity.PicturesNoLang.Where(a => a.Active == true && a.ID == assign.MainTypeID).FirstOrDefault();

                        if (rbPicNoLang != null)
                        {
                            ilan.Resim = AppMgr.UploadPath + "/Gallery/Thumb/" + rbPicNoLang.PictureName;
                        }
                    }
                }

                ilan.ID = data.ID.ToString();
                ilan.KatID = data.KatID.ToString();
                ilan.AltKatID = data.AltKatID.ToString();
                ilan.Baslik = data.Baslik;
                ilan.Fiyat = data.Fiyat.ToString();
                ilan.Sehir = data.Sehir;
                ilan.Ilce = data.Ilce;
                ilan.Semt = data.Semt;
                ilan.Url = data.RouteUrl;
                ilan.Sahip = data.Sahibi;
                ilan.Kod = data.Code;
                ilan.Enlem = data.Enlem;
                ilan.Boylam = data.Boylam;
                ilan.Yeni = data.Yeni == true ? "1" : "0";
            }

            return ilan;
        }

        public List<RealEstateData> Ilanlar(string kelime, string adet)
        {
            List<RealEstateData> ilanlar = new List<RealEstateData>();

            string kategoriAdi = "Arama Sonuçları (" + kelime + ")";

            List<RealEstateAds> dataList = entity.RealEstateAds.Where(a => a.Active == true).ToList();

            if (!String.IsNullOrEmpty(kelime))
            {
                switch (kelime)
                {
                    case "tum":
                        kategoriAdi = "Tüm İlanlar";
                        break;
                    case "rasgele":
                        kategoriAdi = "Rasgele İlanlar";
                        break;
                    case "yeni":
                        kategoriAdi = "Yeni İlanlar";
                        dataList = dataList.Where(a => a.Yeni == true).OrderByDescending(a=> a.ID).ToList();
                        break;
                    case "satilik":
                        kategoriAdi = "Satılık İlanlar";
                        dataList = dataList.Where(a => a.Satilik == true).OrderByDescending(a=> a.ID).ToList();
                        break;
                    case "kiralik":
                        kategoriAdi = "Kiralık İlanlar";
                        dataList = dataList.Where(a => a.Satilik == false).OrderByDescending(a=> a.ID).ToList();
                        break;
                    case "vitrin":
                        kategoriAdi = "Vitrin İlanları";
                        dataList = dataList.OrderByDescending(a=> a.ID).ToList();
                        break;
                    default:
                        dataList = dataList.Where(a => a.Baslik.Contains(kelime)).ToList();
                        break;
                }
            }

            if (dataList.Count > 0)
            {
                if (kelime == "rasgele" || kelime == "yeni" || kelime == "vitrin")
                {
                    if (adet != null)
                    {
                        if (adet.ToInteger() > 0)
                        {
                            int adetNum = adet.ToInteger();
                            dataList = dataList.Shuffle().Take(adetNum).ToList();
                        }
                    }
                }

                foreach (RealEstateAds item in dataList)
                {
                    var rbLang = entity.RealEstateAdsLang.Where(a => a.EmlakID == item.ID && a.Language == 1).FirstOrDefault();

                    if (rbLang != null)
                    {
                        item.Baslik = rbLang.Baslik;
                    }

                    string picName = "";

                    List<Assignments> assignList = ToolBox.GetAssignmentList(
                    new Assignments()
                    {
                        MainType = "PicturesNoLang",
                        TargetType = "RealEstateAds",
                        TargetTypeID = item.ID
                    });

                    if (assignList.Count > 0)
                    {
                        foreach (var assign in assignList)
                        {
                            PicturesNoLang rbPicNoLang = entity.PicturesNoLang.Where(a => a.ID == assign.MainTypeID).FirstOrDefault();

                            if (rbPicNoLang != null)
                            {
                                picName = rbPicNoLang.PictureName;
                            }
                        }
                    }

                    ilanlar.Add(new RealEstateData()
                    {
                        ID = item.ID.ToString(),
                        KatID = item.KatID.ToString(),
                        AltKatID = item.AltKatID.ToString(),
                        Baslik = item.Baslik,
                        Fiyat = item.Fiyat.ToString(),
                        Sehir = item.Sehir,
                        Resim = AppMgr.UploadPath + "/Gallery/Thumb/" + picName,
                        Ilce = item.Ilce,
                        Semt = item.Semt,
                        Url = item.RouteUrl,
                        Enlem = item.Enlem,
                        Boylam = item.Boylam,
                        KategoriAdi = kategoriAdi,
                        Yeni = item.Yeni == true ? "1" : "0"
                    });
                }
            }

            return ilanlar;
        }

        public List<RealEstateData> KategoriIlanlar(string kategori)
        {
            List<RealEstateData> ilanlar = new List<RealEstateData>();

            string kategoriAdi = "Kategori İlanları";

            if (!String.IsNullOrEmpty(kategori))
            {
                kategori = kategori.Replace("zzz", "-");

                string katText = "";

                foreach (string item in kategori.Split('-'))
                {
                    katText += item.FirstCharToUpperCase().ToHyperLinkText() + "-";
                }

                kategori = katText.TrimEnd('-');
            }

            Category cat = entity.Category.Where(a => a.Active == true && a.RouteUrl == kategori).ToList().FirstOrDefault();

            List<RealEstateAds> rb = null;

            if (cat != null)
            {
                kategoriAdi = cat.CategoryName;

                rb = entity.RealEstateAds.Where(a => a.Active == true).ToList();

                if (cat.ParentID == 0 || cat.ParentID == null)
                {
                    rb = rb.Where(a => a.KatID == cat.ID).ToList();
                }
                else
                {
                    rb = rb.Where(a => a.KatID == cat.ParentID).ToList();
                    rb = rb.Where(a => a.AltKatID == cat.ID).ToList();
                }
            }

            if (rb.Count > 0)
            {
                foreach (RealEstateAds item in rb)
                {
                    RealEstateAdsLang rbLang = entity.RealEstateAdsLang.Where(a => a.EmlakID == item.ID && a.Language == 1).ToList().FirstOrDefault();

                    if (rbLang != null)
                    {
                        item.Baslik = rbLang.Baslik;
                    }

                    string picName = "";

                    List<Assignments> assignList = ToolBox.GetAssignmentList(
                    new Assignments()
                    {
                        MainType = "PicturesNoLang",
                        TargetType = "RealEstateAds",
                        TargetTypeID = item.ID
                    });

                    if (assignList.Count > 0)
                    {
                        foreach (var assign in assignList)
                        {
                            var rbPicNoLang = entity.PicturesNoLang.Where(a => a.ID == assign.MainTypeID).FirstOrDefault();

                            if (rbPicNoLang != null)
                            {
                                picName = rbPicNoLang.PictureName;
                            }
                        }
                    }

                    ilanlar.Add(new RealEstateData()
                    {
                        ID = item.ID.ToString(),
                        KatID = item.KatID.ToString(),
                        AltKatID = item.AltKatID.ToString(),
                        Baslik = item.Baslik,
                        Fiyat = item.Fiyat.ToString(),
                        Sehir = item.Sehir,
                        Resim = AppMgr.UploadPath + "/Gallery/Thumb/" + picName,
                        Ilce = item.Ilce,
                        Semt = item.Semt,
                        Url = item.RouteUrl,
                        Enlem = item.Enlem,
                        Boylam = item.Boylam,
                        KategoriAdi = kategoriAdi,
                        Yeni = item.Yeni == true ? "1" : "0"
                    });
                }
            }

            return ilanlar;
        }

        public List<CategoryData> Kategoriler(string parentid)
        {
            List<CategoryData> kategoriler = new List<CategoryData>();

            if (parentid.IsNull())
            {
                return Kategoriler();
            }

            int pid = parentid.ToInteger();

            var rb = entity.Category.Where(a => a.Active == true && a.ParentID == pid).ToList();

            if (rb.Count > 0)
            {
                foreach (Category item in rb)
                {
                    var rbLang = entity.CategoryLang.Where(a => a.CategoryID == item.ID && a.Language == 1).FirstOrDefault();

                    if (rbLang != null)
                    {
                        item.CategoryName = rbLang.CategoryName;
                    }

                    kategoriler.Add(new CategoryData()
                    {
                        ID = item.ID.ToString(),
                        ParentID = item.ParentID.ToString(),
                        Url = item.RouteUrl.ToLower().ToHyperLinkText(true),
                        CategoryName = item.CategoryName,
                        SubCategories = AltKategoriler(item.ID.ToString())
                    });
                }
            }

            return kategoriler.Count > 0 ? kategoriler : null;
        }

        List<CategoryData> Kategoriler()
        {
            List<CategoryData> kategoriler = new List<CategoryData>();

            var rb = entity.Category.Where(a => a.Active == true).ToList();

            if (rb.Count > 0)
            {
                foreach (Category item in rb)
                {
                    var rbLang = entity.CategoryLang.Where(a => a.CategoryID == item.ID && a.Language == 1).FirstOrDefault();

                    if (rbLang != null)
                    {
                        item.CategoryName = rbLang.CategoryName;
                    }

                    kategoriler.Add(new CategoryData()
                    {
                        ID = item.ID.ToString(),
                        ParentID = item.ParentID.ToString(),
                        Url = item.RouteUrl.ToLower().ToHyperLinkText(true),
                        CategoryName = item.CategoryName,
                        SubCategories = AltKategoriler(item.ID.ToString())
                    });
                }
            }

            return kategoriler.Count > 0 ? kategoriler : null;
        }

        List<CategoryData> AltKategoriler(string parentid)
        {
            List<CategoryData> kategoriler = new List<CategoryData>();

            int pID = parentid.ToInteger();

            var rb = entity.Category.Where(a => a.ParentID == pID && a.Active == true).ToList();

            if (rb.Count > 0)
            {
                foreach (Category item in rb)
                {
                    var rbLang = entity.CategoryLang.Where(a => a.CategoryID == item.ID && a.Language == 1).FirstOrDefault();

                    if (rbLang != null)
                    {
                        item.CategoryName = rbLang.CategoryName;
                    }

                    kategoriler.Add(new CategoryData()
                    {
                        ID = item.ID.ToString(),
                        ParentID = item.ParentID.ToString(),
                        Url = item.RouteUrl.ToLower().ToHyperLinkText(true),
                        CategoryName = item.CategoryName,
                        SubCategories = AltKategoriler(item.ID.ToString())
                    });
                }
            }

            return kategoriler.Count > 0 ? kategoriler : null;
        }

        public List<GalleryData> Galeri(string ilanurl, string isthumb)
        {
            List<GalleryData> picNames = new List<GalleryData>();

            var realestateads = entity.RealEstateAds;

            RealEstateAds emlakRb = null;

            if (ilanurl != "gunun-ilani")
            {
                emlakRb = realestateads.Where(a => a.RouteUrl == ilanurl).FirstOrDefault();
            }
            else
            {
                emlakRb = realestateads.Where(a => a.GununEmlagi == true).FirstOrDefault();
            }

            if (emlakRb != null)
            {
                List<Assignments> assignList = ToolBox.GetAssignmentList(
                    new Assignments()
                    {
                        MainType = "PicturesNoLang",
                        TargetType = "RealEstateAds",
                        TargetTypeID = emlakRb.ID
                    });

                foreach (var assign in assignList)
                {
                    var picturesnolang = entity.PicturesNoLang.Where(a => a.ID == assign.MainTypeID).FirstOrDefault();

                    if (picturesnolang != null)
                    {
                        string thumb = isthumb == null ? "" : "Thumb/";
                        picNames.Add(new GalleryData() { Picture = AppMgr.UploadPath + "/Gallery/" + thumb + picturesnolang.PictureName });
                    }
                }
            }

            return picNames;
        }

        public SpecsData Ozellikler(string ilanurl)
        {
            SpecsData specs = new SpecsData();

            var realestateads = entity.RealEstateAds;

            RealEstateAds item = null;

            if (ilanurl != "gunun-ilani")
            {
                item = realestateads.Where(a => a.RouteUrl == ilanurl).FirstOrDefault();
            }
            else
            {
                item = realestateads.Where(a => a.GununEmlagi == true).FirstOrDefault();
            }

            if (item != null)
            {
                specs = new SpecsData()
                {
                    OdaSayisi = item.OdaSayisi.ToString(),
                    SalonSayisi = item.SalonSayisi.ToString(),
                    Alan = item.Alan.ToString() + " m2",
                    KatSayisi = item.KatSayisi.ToString(),
                    BulunduguKat = item.BulunduguKat.ToString(),
                    Durum = item.Durum,
                    IsinmaTipi = item.IsinmaTipi.ToString(),
                    YakitTipi = item.YakitTipi.ToString(),
                    BinaYasi = item.BinaYasi.ToString(),
                    ArkaCephe = item.ArkaCephe == true ? "v" : "y",
                    OnCephe = item.OnCephe == true ? "v" : "y",
                    CaddeyeYakin = item.CaddeyeYakin == true ? "v" : "y",
                    DenizeYakin = item.DenizeYakin == true ? "v" : "y",
                    Manzara = item.Manzara == true ? "v" : "y",
                    Merkezde = item.Merkezde == true ? "v" : "y",
                    Otoban = item.Otoban == true ? "v" : "y",
                    TopluUlasim = item.TopluUlasim == true ? "v" : "y",
                    Asansor = item.Asansor == true ? "v" : "y",
                    Guvenlik = item.Guvenlik == true ? "v" : "y",
                    Hidrofor = item.Hidrofor == true ? "v" : "y",
                    Mantolama = item.Mantolama == true ? "v" : "y",
                    DenizeSifir = item.DenizeSifir == true ? "v" : "y",
                    Metro = item.Metro == true ? "v" : "y",
                    Bahce = item.Bahce == true ? "v" : "y",
                    Kapici = item.Kapici == true ? "v" : "y",
                    Jenerator = item.Jenerator == true ? "v" : "y",
                    Otopark = item.Otopark == true ? "v" : "y",
                    SiteIci = item.SiteIci == true ? "v" : "y",
                    Alarm = item.Alarm == true ? "v" : "y",
                    GoruntuluDiafon = item.GoruntuluDiafon == true ? "v" : "y",
                    Klima = item.Klima == true ? "v" : "y",
                    PVCDograma = item.PVCDograma == true ? "v" : "y",
                    YuzmeHavuzu = item.YuzmeHavuzu == true ? "v" : "y",
                    CelikKapi = item.CelikKapi == true ? "v" : "y",
                    KabloTVUydu = item.KabloTVUydu == true ? "v" : "y",
                    OyunParki = item.OyunParki == true ? "v" : "y",
                    YanginMerdiveni = item.YanginMerdiveni == true ? "v" : "y",
                    Balkon = item.Balkon == true ? "v" : "y",
                    Jakuzi = item.Jakuzi == true ? "v" : "y",
                };
            }

            return specs;
        }

        public List<NewsData> Haberler()
        {
            var haberler = ((from a in entity.Content
                             join b in entity.ContentLang on a.ID equals b.ContentID
                             where a.Active == true && a.Code == "haber" && b.ContentID == a.ID && b.Language == 1
                             select new NewsData
                             {
                                 Url = a.RouteUrl == null ? "" : a.RouteUrl,
                                 Title = b.ContentName == null ? a.ContentName == null ? "" : a.ContentName : b.ContentName,
                             }).ToList());

            return haberler;
        }

        public NewsData Haber(string haberurl)
        {
            NewsData haber = new NewsData();

            string url = "";

            foreach (string item in haberurl.Split('-'))
            {
                url += item.FirstCharToUpperCase().ToHyperLinkText() + "-";
            }

            haberurl = url.TrimEnd('-');

            Content rb = entity.Content.Where(a => a.Active == true && a.RouteUrl == haberurl).FirstOrDefault();

            if (rb != null)
            {
                haber.Title = rb.ContentName;
                haber.Content = "";

                ContentLang rbLang = entity.ContentLang.Where(a => a.ContentID == rb.ID && a.Language == 1).FirstOrDefault();

                if (rbLang != null)
                {
                    haber.Title = rbLang.ContentName;
                    haber.Content = rbLang.Description.Replace("\\r\\n", "");
                }
            }

            return haber;
        }

        public List<ContentData> Bilgiler()
        {
            List<ContentData> icerikler = new List<ContentData>();

            List<Content> rb = entity.Content.Where(a => a.Active == true && a.Code != "haber" && a.Code != "baslik").ToList();

            if (rb != null)
            {
                foreach (Content item in rb)
                {
                    ContentData icerik = new ContentData();
                    icerik.Name = item.ContentName;
                    icerik.Url = item.RouteUrl.ToHyperLinkText(true);

                    List<Assignments> assignList = ToolBox.GetAssignmentList(
                    new Assignments()
                    {
                        MainType = "PicturesNoLang",
                        TargetType = "Content",
                        TargetTypeID = item.ID
                    });

                    if (assignList.Count > 0)
                    {
                        foreach (Assignments assign in assignList)
                        {
                            var rbPic = entity.PicturesNoLang.Where(a => a.Active == true && a.ID == assign.MainTypeID).FirstOrDefault();

                            if (rbPic != null)
                            {
                                icerik.Image = AppMgr.UploadPath + "/Gallery/Thumb/" + rbPic.PictureName;
                            }

                        }
                    }

                    ContentLang rbLang = entity.ContentLang.Where(a => a.ContentID == item.ID && a.Language == 1).FirstOrDefault();

                    if (rbLang != null)
                    {
                        icerik.Name = rbLang.ContentName;
                        icerik.Content = rbLang.Description.Replace("\\r\\n", "");
                    }

                    icerikler.Add(icerik);
                }
            }

            return icerikler;
        }

        public ContentData Icerik(string contenturl)
        {
            ContentData icerik = new ContentData();

            string url = "";

            foreach (string item in contenturl.Split('-'))
            {
                url += item.FirstCharToUpperCase().ToHyperLinkText() + "-";
            }

            contenturl = url.TrimEnd('-');

            Content rb = entity.Content.Where(a => a.Active == true && a.RouteUrl == contenturl).FirstOrDefault();

            if (rb != null)
            {
                icerik.Name = rb.ContentName;
                icerik.Content = "";

                List<Assignments> assignList = ToolBox.GetAssignmentList(
                new Assignments()
                {
                    MainType = "PicturesNoLang",
                    TargetType = "Content",
                    TargetTypeID = rb.ID
                });

                if (assignList.Count > 0)
                {
                    foreach (Assignments assign in assignList)
                    {
                        PicturesNoLang rbPics = entity.PicturesNoLang.Where(a => a.ID == assign.MainTypeID).FirstOrDefault();

                        if (rbPics != null)
                        {
                            icerik.Image = AppMgr.UploadPath + "/Gallery/Thumb/" + rbPics.PictureName;
                        }

                    }
                }

                ContentLang rbLang = entity.ContentLang.Where(a => a.ContentID == rb.ID && a.Language == 1).FirstOrDefault();

                if (rbLang != null)
                {
                    icerik.Name = rbLang.ContentName;
                    icerik.Content = rbLang.Description.Replace("\\r\\n", "");
                }
            }

            return icerik;
        }

        public ResimData Resim(string kelime)
        {
            ResimData resim = new ResimData();

            switch (kelime)
            {
                case "banner":
                    resim.ImageUrl = Lib.ToolBox.ShuffleBanner();
                    break;
                case "logo":
                    resim.ImageUrl = Lib.ToolBox.GetLogo();
                    break;
                case "yeni":
                    resim.ImageUrl = Lib.ToolBox.NewLogo;
                    break;
                case "hakkimizda":
                    resim.ImageUrl = AppMgr.ImagePath + "/hakkimizda.png";
                    break;
                case "haberler":
                    resim.ImageUrl = AppMgr.ImagePath + "/haberler.png";
                    break;
                case "iletisim":
                    resim.ImageUrl = Lib.ToolBox.ContactPic;
                    break;
                case "detay":
                    resim.ImageUrl = Lib.ToolBox.DetailLogo;
                    break;
                default:
                    resim.ImageUrl = Lib.ToolBox.ShuffleBanner();
                    break;
            }

            return resim;
        }

        //Android İçin Deneme
        //public bool HaberEkle(NewsData newsData)
        //{
        //    Content content = new Content();

        //    try
        //    {
        //        if (newsData.Title.IsNull() || newsData.Content.IsNull())
        //        {
        //            return false;
        //        }

        //        content.ContentName = newsData.Title;
        //        content.RouteUrl = newsData.Title.ToHyperLinkText();
        //        content.Code = "haber";
        //        content.Active = true;

        //        bool result = TDHelper<Content>.Insert(content).Result;

        //        return result;
        //    }
        //    catch
        //    {
        //        return false;
        //    }
        //}
    }
}
