using System;
using System.Collections.Generic;
using System.Linq;
using Lib;
using TDLibrary;
using Emlak.Data;

namespace Emlak.Servis
{
    public class EmlakService : IEmlakService
    {
        EmlakEntities entity = new EmlakEntities();

        public PropertyData Ilan(string ilanurl)
        {
            PropertyData ilan = new PropertyData();

            sp_AndroidPropertyByUrl_Result data = entity.sp_AndroidPropertyByUrl(ilanurl).FirstOrDefault();

            if (data != null)
            {
                ilan.ID = data.ID.ToString();
                ilan.KatID = data.CatID.ToString();
                ilan.AltKatID = data.PCatID.ToString();
                ilan.Baslik = data.TBaslik;
                ilan.Icerik = data.Aciklama;
                ilan.Fiyat = data.Fiyat.ToString();
                ilan.Sehir = data.Sehir;
                ilan.Ilce = data.Ilce;
                ilan.Semt = data.Semt;
                ilan.Url = data.Url;
                ilan.Sahip = data.Sahibi;
                ilan.Kod = data.Code;
                ilan.Enlem = data.Enlem;
                ilan.Boylam = data.Boylam;
                ilan.Yeni = data.Yeni == true ? "1" : "0";
                ilan.Resim = AppMgr.UploadPath + "/" + data.Picture;
            }

            return ilan;
        }

        public List<PropertyData> Ilanlar(string kelime, string adet)
        {
            List<PropertyData> ilanlar = new List<PropertyData>();

            string kategoriAdi = "Arama Sonuçları (" + kelime + ")";

            int? _adet = adet?.ToInteger();

            List<sp_PropertyForListSelect_Result> dataList = new List<sp_PropertyForListSelect_Result>();

            if (!String.IsNullOrEmpty(kelime))
            {
                switch (kelime)
                {
                    case "tum":
                        kategoriAdi = "Tüm İlanlar";
                        dataList = entity.sp_PropertyForListSelect("TR", null, null, null, null, null, null, null, _adet).ToList();
                        break;
                    case "rasgele":
                        kategoriAdi = "Rasgele İlanlar";
                        dataList = entity.sp_PropertyForListSelect("TR", null, null, null, null, null, null, true, _adet).ToList();
                        break;
                    case "yeni":
                        kategoriAdi = "Yeni İlanlar";
                        dataList = entity.sp_PropertyForListSelect("TR", null, null, null, null, true, null, true, _adet).ToList();
                        break;
                    case "satilik":
                        kategoriAdi = "Satılık İlanlar";
                        dataList = entity.sp_PropertyForListSelect("TR", null, null, null, true, null, null, null, _adet).ToList();
                        break;
                    case "kiralik":
                        kategoriAdi = "Kiralık İlanlar";
                        dataList = entity.sp_PropertyForListSelect("TR", null, null, null, false, null, null, null, _adet).ToList();
                        break;
                    case "vitrin":
                        kategoriAdi = "Vitrin İlanları";
                        dataList = entity.sp_PropertyForListSelect("TR", null, null, null, null, null, null, true, _adet).ToList();
                        break;
                    default:
                        kategoriAdi = "Arama Sonuçları (" + kelime + ")";
                        dataList = entity.sp_PropertyForListSelect("TR", null, null, kelime, null, null, null, null, _adet).ToList();
                        break;
                }
            }

            if (dataList.Count > 0)
            {
                foreach (sp_PropertyForListSelect_Result item in dataList)
                {
                    ilanlar.Add(new PropertyData()
                    {
                        ID = item.ID.ToString(),
                        KatID = item.PCatID.ToString(),
                        AltKatID = item.CatID.ToString(),
                        Baslik = item.TBaslik,
                        Fiyat = item.Fiyat.ToString(),
                        Sehir = item.Sehir,
                        Resim = AppMgr.UploadPath + "/" + item.Picture,
                        Ilce = item.Ilce,
                        Semt = item.Semt,
                        Url = item.Url,
                        Enlem = item.Enlem,
                        Boylam = item.Boylam,
                        KategoriAdi = kategoriAdi,
                        Yeni = item.Yeni == true ? "1" : "0"
                    });
                }
            }

            return ilanlar;
        }

        public List<PropertyData> KategoriIlanlar(string kategori)
        {
            List<PropertyData> ilanlar = new List<PropertyData>();

            List<sp_PropertyForListSelect_Result> dataList;

            if (!String.IsNullOrEmpty(kategori))
            {
                kategori = kategori.Replace("zzz", "-");

                string katText = "";

                foreach (string item in kategori.Split('-'))
                {
                    katText += item.FirstCharToUpperCase().ToUrl() + "-";
                }

                kategori = katText.TrimEnd('-');
            }

            dataList = entity.sp_PropertyForListSelect("TR", null, kategori, null, null, null, null, null, null).ToList();

            foreach (sp_PropertyForListSelect_Result item in dataList)
            {
                ilanlar.Add(new PropertyData()
                {
                    ID = item.ID.ToString(),
                    KatID = item.PCatID.ToString(),
                    AltKatID = item.CatID.ToString(),
                    Baslik = item.Baslik,
                    Fiyat = item.Fiyat.ToString(),
                    Sehir = item.Sehir,
                    Resim = AppMgr.UploadPath + "/" + item.Picture,
                    Ilce = item.Ilce,
                    Semt = item.Semt,
                    Url = item.Url,
                    Enlem = item.Enlem,
                    Boylam = item.Boylam,
                    KategoriAdi = item.CategoryName,
                    Yeni = item.Yeni == true ? "1" : "0"
                });
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

            var rb = entity.sp_CategoriesByParentID(pid, "TR").ToList();

            foreach (sp_CategoriesByParentID_Result item in rb)
            {
                kategoriler.Add(new CategoryData()
                {
                    ID = item.ID.ToString(),
                    ParentID = item.ParentID.ToString(),
                    Url = item.Url.ToLower().ToUrl(true),
                    CategoryName = item.CategoryName,
                    SubCategories = AltKategoriler(item.ID.ToString())
                });
            }

            return kategoriler.Count > 0 ? kategoriler : null;
        }

        List<CategoryData> Kategoriler()
        {
            List<CategoryData> kategoriler = new List<CategoryData>();

            var rb = entity.sp_CategoriesByParentID(null, "TR").ToList();

            foreach (sp_CategoriesByParentID_Result item in rb)
            {
                kategoriler.Add(new CategoryData()
                {
                    ID = item.ID.ToString(),
                    ParentID = item.ParentID.ToString(),
                    Url = item.Url.ToLower().ToUrl(true),
                    CategoryName = item.CategoryName,
                    SubCategories = AltKategoriler(item.ID.ToString())
                });
            }

            return kategoriler.Count > 0 ? kategoriler : null;
        }

        List<CategoryData> AltKategoriler(string parentid)
        {
            List<CategoryData> kategoriler = new List<CategoryData>();

            int pid = parentid.ToInteger();

            var rb = entity.sp_CategoriesByParentID(pid, "TR").ToList();

            foreach (sp_CategoriesByParentID_Result item in rb)
            {
                kategoriler.Add(new CategoryData()
                {
                    ID = item.ID.ToString(),
                    ParentID = item.ParentID.ToString(),
                    Url = item.Url.ToLower().ToUrl(true),
                    CategoryName = item.CategoryName,
                    SubCategories = AltKategoriler(item.ID.ToString())
                });
            }

            return kategoriler.Count > 0 ? kategoriler : null;
        }

        public List<GalleryData> Galeri(string ilanurl, string isthumb)
        {
            List<GalleryData> picNames = new List<GalleryData>();

            var pictures = entity.sp_PropertyPicturesByUrl(ilanurl).ToList();

            foreach (var item in pictures)
            {
                string resim = isthumb == null ? item.PictureUrl : item.ThumbUrl;
                picNames.Add(new GalleryData() { Picture = AppMgr.UploadPath + "/" + resim });
            }

            return picNames;
        }

        public SpecsData Ozellikler(string ilanurl)
        {
            var item = entity.sp_AndroidPropertyByUrl(ilanurl).FirstOrDefault();

            SpecsData specs = new SpecsData()
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

            return specs;
        }

        public List<NewsData> Haberler()
        {
            List<NewsData> haberler = new List<NewsData>();

            var haberList = entity.sp_AndroidContentNews().ToList();

            foreach (var item in haberList)
            {
                haberler.Add(new NewsData()
                {
                    Content = item.Description,
                    Url = item.Url,
                    Title = item.ContentName
                });
            }

            return haberler;
        }

        public NewsData Haber(string haberurl)
        {
            NewsData haber = new NewsData();

            string url = "";

            foreach (string item in haberurl.Split('-'))
            {
                url += item.FirstCharToUpperCase().ToUrl() + "-";
            }

            haberurl = url.TrimEnd('-');

            var haberList = entity.sp_ContentDetailByUrl(haberurl, "TR").FirstOrDefault();

            haber.Title = haberList.ContentName;
            haber.Content = haberList.Description.Replace("\\r\\n", "");

            return haber;
        }

        public List<ContentData> Bilgiler()
        {
            List<ContentData> icerikler = new List<ContentData>();

            List<sp_AndroidContentWithImage_Result> rb = entity.sp_AndroidContentWithImage(null, true, null).ToList();

            foreach (sp_AndroidContentWithImage_Result item in rb)
            {
                ContentData icerik = new ContentData();
                icerik.Name = item.ContentName;
                icerik.Content = item.Description.Replace("\\r\\n", "");
                icerik.Url = item.Url.ToUrl(true);
                icerik.Image = AppMgr.UploadPath + "/" + item.Picture;

                icerikler.Add(icerik);
            }

            return icerikler;
        }

        public ContentData Icerik(string contenturl)
        {
            ContentData icerik = new ContentData();

            string url = "";

            foreach (string item in contenturl.Split('-'))
            {
                url += item.FirstCharToUpperCase().ToUrl() + "-";
            }

            contenturl = url.TrimEnd('-');

            sp_AndroidContentWithImage_Result rb = entity.sp_AndroidContentWithImage(1, null, contenturl).FirstOrDefault();

            if (rb != null)
            {
                icerik.Name = rb.ContentName;
                icerik.Content = rb.Description.Replace("\\r\\n", "");
                icerik.Url = rb.Url.ToUrl(true);
                icerik.Image = AppMgr.UploadPath + "/" + rb.Picture;
            }

            return icerik;
        }

        public ResimData Resim(string kelime)
        {
            ResimData resim = new ResimData();

            switch (kelime)
            {
                case "banner":
                    resim.ImageUrl = ToolBox.ShuffleBanner();
                    break;
                case "logo":
                    resim.ImageUrl = ToolBox.GetLogo();
                    break;
                case "yeni":
                    resim.ImageUrl = ToolBox.NewLogo;
                    break;
                case "hakkimizda":
                    resim.ImageUrl = AppMgr.ImagePath + "/hakkimizda.png";
                    break;
                case "haberler":
                    resim.ImageUrl = AppMgr.ImagePath + "/haberler.png";
                    break;
                case "iletisim":
                    resim.ImageUrl = ToolBox.ContactPic;
                    break;
                case "detay":
                    resim.ImageUrl = ToolBox.DetailLogo;
                    break;
                default:
                    resim.ImageUrl = ToolBox.ShuffleBanner();
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
        //        content.RouteUrl = newsData.Title.ToUrl();
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
