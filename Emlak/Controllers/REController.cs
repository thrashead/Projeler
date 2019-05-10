using Lib;
using Models;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Xml;
using TDLibrary;

namespace Emlak.Controllers
{
    public class REController : Controller
    {
        EmlakSiteEntities entity = new EmlakSiteEntities();

        [HttpGet]
        public JsonResult Detay(string link)
        {
            RealEstateAdsModel model = new RealEstateAdsModel();

            link = link.IsNull() == true ? Urling.URLBlocks[3] : link;

            var realestateads = entity.RealEstateAds.Where(a => a.RouteUrl == link).FirstOrDefault();

            if (realestateads != null)
            {
                model.ID = realestateads.ID;
                model.KatID = realestateads.KatID;
                model.AltKatID = realestateads.AltKatID;
                model.Baslik = realestateads.Baslik;
                model.Code = realestateads.Code;
                model.Fiyat = realestateads.Fiyat;
                model.Yeni = realestateads.Yeni;
                model.GununEmlagi = realestateads.GununEmlagi;
                model.Sehir = realestateads.Sehir;
                model.Ilce = realestateads.Ilce;
                model.Semt = realestateads.Semt;
                model.Sahibi = realestateads.Sahibi;
                model.OdaSayisi = realestateads.OdaSayisi;
                model.KatSayisi = realestateads.KatSayisi;
                model.IsinmaTipi = realestateads.IsinmaTipi;
                model.SalonSayisi = realestateads.SalonSayisi;
                model.BulunduguKat = realestateads.BulunduguKat;
                model.YakitTipi = realestateads.YakitTipi;
                model.Alan = realestateads.Alan;
                model.Durum = realestateads.Durum;
                model.BinaYasi = realestateads.BinaYasi;
                model.ArkaCephe = realestateads.ArkaCephe;
                model.OnCephe = realestateads.OnCephe;
                model.CaddeyeYakin = realestateads.CaddeyeYakin;
                model.DenizeSifir = realestateads.DenizeSifir;
                model.DenizeYakin = realestateads.DenizeYakin;
                model.Manzara = realestateads.Manzara;
                model.Merkezde = realestateads.Merkezde;
                model.Metro = realestateads.Metro;
                model.Otoban = realestateads.Otoban;
                model.TopluUlasim = realestateads.TopluUlasim;
                model.Asansor = realestateads.Asansor;
                model.Bahce = realestateads.Bahce;
                model.Guvenlik = realestateads.Guvenlik;
                model.Hidrofor = realestateads.Hidrofor;
                model.Mantolama = realestateads.Mantolama;
                model.Jenerator = realestateads.Jenerator;
                model.Kapici = realestateads.Kapici;
                model.Satilik = realestateads.Satilik;
                model.Otopark = realestateads.Otopark;
                model.OyunParki = realestateads.OyunParki;
                model.PVCDograma = realestateads.PVCDograma;
                model.SiteIci = realestateads.SiteIci;
                model.YanginMerdiveni = realestateads.YanginMerdiveni;
                model.YuzmeHavuzu = realestateads.YuzmeHavuzu;
                model.Alarm = realestateads.Alarm;
                model.Balkon = realestateads.Balkon;
                model.CelikKapi = realestateads.CelikKapi;
                model.GoruntuluDiafon = realestateads.GoruntuluDiafon;
                model.Jakuzi = realestateads.Jakuzi;
                model.KabloTVUydu = realestateads.KabloTVUydu;
                model.Klima = realestateads.Klima;
                model.Active = realestateads.Active;
                model.AddDate = realestateads.AddDate;
                model.AddUser = realestateads.AddUser;
                model.UpdateDate = realestateads.UpdateDate;
                model.UpdateUser = realestateads.UpdateUser;
                model.Queue = realestateads.Queue;
                model.RouteUrl = realestateads.RouteUrl;
                model.Enlem = realestateads.Enlem;
                model.Boylam = realestateads.Boylam;

                var realestateadslang = entity.RealEstateAdsLang.Where(a => a.EmlakID == realestateads.ID && a.Language == ToolBox.LangID).FirstOrDefault();

                if (realestateadslang != null)
                {
                    model.Baslik = realestateadslang.Baslik;
                    model.Aciklama = realestateadslang.Aciklama;
                    model.Language = realestateadslang.Language;
                }

                List<Assignments> assignList = ToolBox.GetAssignmentList(
                    new Assignments()
                    {
                        MainType = "PicturesNoLang",
                        TargetType = "RealEstateAds",
                        TargetTypeID = realestateads.ID
                    });

                foreach (var assign in assignList)
                {
                    var picturesnolang = entity.PicturesNoLang.Where(a => a.ID == assign.MainTypeID).FirstOrDefault();

                    if (picturesnolang != null)
                    {
                        model.Pictures.Add(picturesnolang.PictureName);
                    }
                }
            }

            return Json(model, JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public JsonResult Listele(string reData)
        {
            ListeleInputItem listRE = JsonConvert.DeserializeObject<ListeleInputItem>(reData);
            ListeleOutputItem reOutputItem = new ListeleOutputItem();

            if (listRE.Detail)
            {
                reOutputItem = DetayliArama(listRE);
                return Json(reOutputItem, JsonRequestBehavior.AllowGet);
            }

            listRE.Word = listRE.Word == null ? "" : listRE.Word;
            listRE.OrderBy = listRE.OrderBy == null ? "" : listRE.OrderBy;
            listRE.Page = listRE.Page < 1 ? 1 : listRE.Page;

            var list = entity.RealEstateAds.ToList();

            string pageHeader = "";
            int count = 0;

            if (Session["Emlaklar"] == null)
            {
                list = list.Where(a => a.Active == true).ToList();

                if (listRE.Word.ToLower() == "satilik")
                {
                    list = list.Where(a => a.Satilik == true).ToList();

                    pageHeader = LangBaslik.KodlaGetir("stlk");
                }
                else if (listRE.Word.ToLower() == "kiralik")
                {
                    list = list.Where(a => a.Satilik == false).ToList();

                    pageHeader = LangBaslik.KodlaGetir("krlk");
                }
                else if (listRE.Word.ToLower() == "yeni")
                {
                    list = list.Where(a => a.Yeni == true).ToList();

                    pageHeader = LangBaslik.KodlaGetir("newi");
                }
                else if (listRE.Word.ToLower() == "tumu")
                {
                    pageHeader = LangBaslik.KodlaGetir("alli");
                }
                else
                {
                    var _category = entity.Category.Where(a => a.Active == true && a.RouteUrl == listRE.Word).FirstOrDefault();

                    if (_category != null)
                    {
                        var _categoryLang = entity.CategoryLang.Where(a => a.CategoryID == _category.ID && a.Language == ToolBox.LangID).FirstOrDefault();

                        if (_categoryLang != null)
                        {
                            pageHeader = _categoryLang.CategoryName;
                        }
                        else
                        {
                            pageHeader = _category.CategoryName;
                        }

                        if (_category.ParentID == 0)
                        {
                            list = list.Where(a => a.KatID == _category.ID).ToList();
                        }
                        else
                        {
                            list = list.Where(a => a.AltKatID == _category.ID).ToList();
                        }
                    }
                    else
                    {
                        pageHeader = listRE.Word;

                        List<RealEstateAds> listTemp = new List<RealEstateAds>();

                        var rbLang = entity.RealEstateAdsLang.Where(a => a.Baslik.Contains(listRE.Word) && a.Language == ToolBox.LangID).ToList();

                        foreach (var item in rbLang)
                        {
                            listTemp.Add(list.Where(a => a.ID == item.EmlakID).FirstOrDefault());
                        }

                        list = new List<RealEstateAds>();
                        list.AddRange(listTemp);
                    }
                }

                switch (listRE.OrderBy)
                {
                    case "atoz":
                        list = list.OrderBy(a => a.Baslik).ToList();
                        break;
                    case "ztoa":
                        list = list.OrderByDescending(a => a.Baslik).ToList();
                        break;
                    case "1to9":
                        list = list.OrderBy(a => a.Fiyat).ToList();
                        break;
                    case "9to1":
                        list = list.OrderByDescending(a => a.Fiyat).ToList();
                        break;
                    case "dto9":
                        list = list.OrderBy(a => a.ID).ToList();
                        break;
                    case "dto1":
                        list = list.OrderByDescending(a => a.ID).ToList();
                        break;
                    default:
                        list = list.OrderBy(a => a.Baslik).ToList();
                        break;
                }

                count = list.Count;

                reOutputItem.SayfaSayisi = ((count - (count % 12)) / 12) + 1;
                reOutputItem.Sayfa = listRE.Page;

                list = list.Skip(12 * (listRE.Page - 1)).Take(12).ToList();
            }
            else
            {
                list = Session["Emlaklar"] as List<RealEstateAds>;

                pageHeader = LangBaslik.KodlaGetir("dsrs");

                switch (listRE.OrderBy)
                {
                    case "atoz": list = list.OrderBy(a => a.Baslik).ToList(); break;
                    case "ztoa": list = list.OrderByDescending(a => a.Baslik).ToList(); break;
                    case "1to9": list = list.OrderBy(a => a.Fiyat).ToList(); break;
                    case "9to1": list = list.OrderByDescending(a => a.Fiyat).ToList(); break;
                    case "dto9": list = list.OrderBy(a => a.ID).ToList(); break;
                    case "dto1": list = list.OrderByDescending(a => a.ID).ToList(); break;
                    default: list = list.OrderBy(a => a.Baslik).ToList(); break;
                }

                count = list.Count;

                list = list.Skip(12 * (listRE.Page - 1)).Take(12).ToList();
            }


            if (pageHeader != "")
            {
                reOutputItem.Baslik = pageHeader;
            }
            else
            {
                reOutputItem.Baslik = LangBaslik.KodlaGetir("alli");
            }

            List<ListeleItem> returnList = new List<ListeleItem>();

            foreach (RealEstateAds item in list)
            {
                ListeleItem reItem = new ListeleItem();

                reItem.Yeni = item.Yeni;
                reItem.Fiyat = item.Fiyat;
                reItem.RouteUrl = item.RouteUrl;
                reItem.Enlem = item.Enlem;
                reItem.Boylam = item.Boylam;
                reOutputItem.Adet = count;
                reOutputItem.DetayLogo = ToolBox.DetailLogo;
                reItem.NewLogo = ToolBox.NewLogo;

                if (pageHeader != "")
                {
                    reOutputItem.Baslik = pageHeader;
                }
                else
                {
                    reOutputItem.Baslik = LangBaslik.KodlaGetir("alli");
                }

                var rbRealLang = entity.RealEstateAdsLang.Where(a => a.EmlakID == item.ID && a.Language == ToolBox.LangID).FirstOrDefault();

                if (rbRealLang != null)
                {
                    reItem.Baslik = rbRealLang.Baslik;
                }
                else
                {
                    reItem.Baslik = item.Baslik;
                }

                var rbCat = entity.Category.Where(a => a.Active == true && a.ID == item.KatID).FirstOrDefault();

                if (rbRealLang != null)
                {
                    int? catID = rbCat.ID;

                    var rbCatLang = entity.CategoryLang.Where(a => a.CategoryID == catID && a.Language == ToolBox.LangID).FirstOrDefault();

                    if (rbCat != null)
                    {
                        if (rbCatLang != null)
                        {
                            reItem.CategoryName = rbCatLang.CategoryName;
                        }
                        else
                        {
                            reItem.CategoryName = rbCat.CategoryName;
                        }
                    }
                    else
                    {
                        reItem.CategoryName = rbCat.CategoryName;
                    }
                }
                else
                {
                    reItem.CategoryName = "";
                }

                List<Assignments> assignList = ToolBox.GetAssignmentList(
                    new Assignments()
                    {
                        TargetType = "RealEstateAds",
                        MainType = "PicturesNoLang",
                        TargetTypeID = item.ID
                    });

                List<PicturesNoLang> _picNoLang = new List<PicturesNoLang>();

                foreach (Assignments itemAss in assignList)
                {
                    var rbPic = entity.PicturesNoLang.Where(a => a.ID == itemAss.MainTypeID).FirstOrDefault();

                    if (rbPic != null)
                    {
                        _picNoLang.Add(rbPic);
                    }
                }

                if (_picNoLang.Count > 0)
                {
                    reItem.PictureName = _picNoLang.FirstOrDefault().PictureName;
                }
                else
                {
                    reItem.PictureName = "";
                }

                returnList.Add(reItem);
            }

            reOutputItem.Emlaklar = returnList;

            return Json(reOutputItem, JsonRequestBehavior.AllowGet);
        }
        public class ListeleInputItem
        {
            public string OrderBy { get; set; }
            public string Word { get; set; }
            public int Page { get; set; }
            public bool Detail { get; set; }
        }
        public class ListeleItem : RealEstateAds
        {
            public string CategoryName { get; set; }
            public string NewLogo { get; set; }
            public string PictureName { get; set; }
        }
        public class ListeleOutputItem
        {
            public ListeleOutputItem()
            {
                this.Emlaklar = new List<ListeleItem>();
            }

            public List<ListeleItem> Emlaklar { get; set; }
            public string DetayLogo { get; set; }
            public string Baslik { get; set; }
            public int Adet { get; set; }
            public int SayfaSayisi { get; set; }
            public int Sayfa { get; set; }
        }

        [HttpGet]
        public JsonResult DetayliAramaSession(string realCP)
        {
            RealEstateAdsExt listReCP = JsonConvert.DeserializeObject<RealEstateAdsExt>(realCP);
            Session["DetayKriter"] = listReCP;

            return Json(true, JsonRequestBehavior.AllowGet);
        }

        public ListeleOutputItem DetayliArama(ListeleInputItem listRE)
        {
            RealEstateAdsExt listReCP = new RealEstateAdsExt();

            ListeleOutputItem reOutputItem = new ListeleOutputItem();

            reOutputItem.Baslik = "Detaylı Arama Sonuçları";

            if (Session["DetayKriter"] != null)
            {
                listReCP = (RealEstateAdsExt)Session["DetayKriter"];
            }

            var rb = entity.RealEstateAds.Where(a => a.Active == true).ToList();

            if (!listReCP.Baslik.IsNull())
                rb = rb.Where(a => a.Baslik == listReCP.Baslik).ToList();
            if (listReCP.KatID > 0)
                rb = rb.Where(a => a.KatID == listReCP.KatID).ToList();
            if (listReCP.AltKatID > 0)
                rb = rb.Where(a => a.AltKatID == listReCP.AltKatID).ToList();
            if (listReCP.Sehir != "Tümü")
                rb = rb.Where(a => a.Sehir == listReCP.Sehir).ToList();
            if (!listReCP.Ilce.IsNull())
                rb = rb.Where(a => a.Ilce == listReCP.Ilce).ToList();
            if (!listReCP.Semt.IsNull())
                rb = rb.Where(a => a.Semt == listReCP.Semt).ToList();
            if (listReCP.Durum != "Tümü")
                rb = rb.Where(a => a.Durum == listReCP.Durum).ToList();
            if (listReCP.IsinmaTipi != "Farketmez")
                rb = rb.Where(a => a.IsinmaTipi == listReCP.IsinmaTipi).ToList();
            if (listReCP.YakitTipi != "Farketmez")
                rb = rb.Where(a => a.YakitTipi == listReCP.YakitTipi).ToList();
            if (listReCP.ArkaCephe == true)
                rb = rb.Where(a => a.ArkaCephe == listReCP.ArkaCephe).ToList();
            if (listReCP.DenizeYakin == true)
                rb = rb.Where(a => a.DenizeYakin == listReCP.DenizeYakin).ToList();
            if (listReCP.OnCephe == true)
                rb = rb.Where(a => a.OnCephe == listReCP.OnCephe).ToList();
            if (listReCP.Mantolama == true)
                rb = rb.Where(a => a.Mantolama == listReCP.Mantolama).ToList();
            if (listReCP.CaddeyeYakin == true)
                rb = rb.Where(a => a.CaddeyeYakin == listReCP.CaddeyeYakin).ToList();
            if (listReCP.Hidrofor == true)
                rb = rb.Where(a => a.Hidrofor == listReCP.Hidrofor).ToList();
            if (listReCP.Metro == true)
                rb = rb.Where(a => a.Metro == listReCP.Metro).ToList();
            if (listReCP.DenizeSifir == true)
                rb = rb.Where(a => a.DenizeSifir == listReCP.DenizeSifir).ToList();
            if (listReCP.Jenerator == true)
                rb = rb.Where(a => a.Jenerator == listReCP.Jenerator).ToList();
            if (listReCP.Asansor == true)
                rb = rb.Where(a => a.Asansor == listReCP.Asansor).ToList();
            if (listReCP.Kapici == true)
                rb = rb.Where(a => a.Kapici == listReCP.Kapici).ToList();
            if (listReCP.TopluUlasim == true)
                rb = rb.Where(a => a.TopluUlasim == listReCP.TopluUlasim).ToList();
            if (listReCP.Otoban == true)
                rb = rb.Where(a => a.Otoban == listReCP.Otoban).ToList();
            if (listReCP.Manzara == true)
                rb = rb.Where(a => a.Manzara == listReCP.Manzara).ToList();
            if (listReCP.Merkezde == true)
                rb = rb.Where(a => a.Merkezde == listReCP.Merkezde).ToList();
            if (listReCP.Bahce == true)
                rb = rb.Where(a => a.Bahce == listReCP.Bahce).ToList();
            if (listReCP.Guvenlik == true)
                rb = rb.Where(a => a.Guvenlik == listReCP.Guvenlik).ToList();
            if (listReCP.Otopark == true)
                rb = rb.Where(a => a.Otopark == listReCP.Otopark).ToList();
            if (listReCP.OyunParki == true)
                rb = rb.Where(a => a.OyunParki == listReCP.OyunParki).ToList();
            if (listReCP.PVCDograma == true)
                rb = rb.Where(a => a.PVCDograma == listReCP.PVCDograma).ToList();
            if (listReCP.SiteIci == true)
                rb = rb.Where(a => a.SiteIci == listReCP.SiteIci).ToList();
            if (listReCP.YanginMerdiveni == true)
                rb = rb.Where(a => a.YanginMerdiveni == listReCP.YanginMerdiveni).ToList();
            if (listReCP.YuzmeHavuzu == true)
                rb = rb.Where(a => a.YuzmeHavuzu == listReCP.YuzmeHavuzu).ToList();
            if (listReCP.Alarm == true)
                rb = rb.Where(a => a.Alarm == listReCP.Alarm).ToList();
            if (listReCP.Balkon == true)
                rb = rb.Where(a => a.Balkon == listReCP.Balkon).ToList();
            if (listReCP.CelikKapi == true)
                rb = rb.Where(a => a.CelikKapi == listReCP.CelikKapi).ToList();
            if (listReCP.GoruntuluDiafon == true)
                rb = rb.Where(a => a.GoruntuluDiafon == listReCP.GoruntuluDiafon).ToList();
            if (listReCP.Jakuzi == true)
                rb = rb.Where(a => a.Jakuzi == listReCP.Jakuzi).ToList();
            if (listReCP.KabloTVUydu == true)
                rb = rb.Where(a => a.KabloTVUydu == listReCP.KabloTVUydu).ToList();
            if (listReCP.Klima == true)
                rb = rb.Where(a => a.Klima == listReCP.Klima).ToList();
            if (listReCP.Satilik == true)
                rb = rb.Where(a => a.Satilik == listReCP.Satilik).ToList();
            else if (listReCP.Kiralik == true)
                rb = rb.Where(a => a.Satilik == false).ToList();

            if (rb.Count > 0)
            {
                if (listReCP.Fiyat != null)
                {
                    rb = rb.Where(a => a.Fiyat >= listReCP.Fiyat).ToList();
                }
                if (listReCP.Fiyat2 != null)
                {
                    rb = rb.Where(a => a.Fiyat <= listReCP.Fiyat2).ToList();
                }

                if (listReCP.Alan != null)
                {
                    rb = rb.Where(a => a.Alan >= listReCP.Alan).ToList();
                }
                if (listReCP.Alan2 != null)
                {
                    rb = rb.Where(a => a.Alan <= listReCP.Alan2).ToList();
                }

                if (listReCP.OdaSayisi != null)
                {
                    rb = rb.Where(a => a.OdaSayisi >= listReCP.OdaSayisi).ToList();
                }
                if (listReCP.OdaSayisi2 != null)
                {
                    rb = rb.Where(a => a.OdaSayisi <= listReCP.OdaSayisi2).ToList();
                }

                if (listReCP.KatSayisi != null)
                {
                    rb = rb.Where(a => a.KatSayisi >= listReCP.KatSayisi).ToList();
                }
                if (listReCP.KatSayisi2 != null)
                {
                    rb = rb.Where(a => a.KatSayisi <= listReCP.KatSayisi2).ToList();
                }

                if (listReCP.BinaYasi != null)
                {
                    rb = rb.Where(a => a.BinaYasi >= listReCP.BinaYasi).ToList();
                }
                if (listReCP.BinaYasi2 != null)
                {
                    rb = rb.Where(a => a.BinaYasi <= listReCP.BinaYasi2).ToList();
                }

                if (listReCP.BulunduguKat != null)
                {
                    rb = rb.Where(a => a.BulunduguKat >= listReCP.BulunduguKat).ToList();
                }
                if (listReCP.BulunduguKat2 != null)
                {
                    rb = rb.Where(a => a.BulunduguKat <= listReCP.BulunduguKat2).ToList();
                }

                if (listReCP.SalonSayisi != null)
                {
                    rb = rb.Where(a => a.SalonSayisi >= listReCP.SalonSayisi).ToList();
                }
                if (listReCP.SalonSayisi2 != null)
                {
                    rb = rb.Where(a => a.SalonSayisi <= listReCP.SalonSayisi2).ToList();
                }

                switch (listRE.OrderBy)
                {
                    case "atoz":
                        rb = rb.OrderBy(a => a.Baslik).ToList();
                        break;
                    case "ztoa":
                        rb = rb.OrderByDescending(a => a.Baslik).ToList();
                        break;
                    case "1to9":
                        rb = rb.OrderBy(a => a.Fiyat).ToList();
                        break;
                    case "9to1":
                        rb = rb.OrderByDescending(a => a.Fiyat).ToList();
                        break;
                    case "dto9":
                        rb = rb.OrderBy(a => a.ID).ToList();
                        break;
                    case "dto1":
                        rb = rb.OrderByDescending(a => a.ID).ToList();
                        break;
                    default:
                        rb = rb.OrderBy(a => a.Baslik).ToList();
                        break;
                }

                int count = rb.Count;

                reOutputItem.Adet = count;
                reOutputItem.Sayfa = listRE.Page;
                reOutputItem.DetayLogo = ToolBox.DetailLogo;
                reOutputItem.SayfaSayisi = ((count - (count % 12)) / 12) + 1;

                rb = rb.Skip(12 * (listRE.Page - 1)).Take(12).ToList();

                reOutputItem.Emlaklar = rb.ChangeModelList<ListeleItem, RealEstateAds>();

                List<ListeleItem> returnList = new List<ListeleItem>();

                foreach (RealEstateAds item in rb)
                {
                    ListeleItem reItem = new ListeleItem();

                    reItem.Yeni = item.Yeni;
                    reItem.Fiyat = item.Fiyat;
                    reItem.RouteUrl = item.RouteUrl;
                    reItem.NewLogo = ToolBox.NewLogo;

                    var rbRealLang = entity.RealEstateAdsLang.Where(a => a.EmlakID == item.ID && a.Language == ToolBox.LangID).FirstOrDefault();

                    if (rbRealLang != null)
                    {
                        reItem.Baslik = rbRealLang.Baslik;
                    }
                    else
                    {
                        reItem.Baslik = item.Baslik;
                    }

                    var rbCat = entity.Category.Where(a => a.Active == true && a.ID == item.KatID).FirstOrDefault();

                    if (rbRealLang != null)
                    {
                        int? catID = rbCat.ID;

                        var rbCatLang = entity.CategoryLang.Where(a => a.CategoryID == catID && a.Language == ToolBox.LangID).FirstOrDefault();

                        if (rbCat != null)
                        {
                            if (rbCatLang != null)
                            {
                                reItem.CategoryName = rbCatLang.CategoryName;
                            }
                            else
                            {
                                reItem.CategoryName = rbCat.CategoryName;
                            }
                        }
                        else
                        {
                            reItem.CategoryName = rbCat.CategoryName;
                        }
                    }
                    else
                    {
                        reItem.CategoryName = "";
                    }

                    List<Assignments> assignList = ToolBox.GetAssignmentList(
                        new Assignments()
                        {
                            TargetType = "RealEstateAds",
                            MainType = "PicturesNoLang",
                            TargetTypeID = item.ID
                        });

                    List<PicturesNoLang> _picNoLang = new List<PicturesNoLang>();

                    foreach (Assignments itemAss in assignList)
                    {
                        var rbPic = entity.PicturesNoLang.Where(a => a.ID == itemAss.MainTypeID).FirstOrDefault();

                        if (rbPic != null)
                        {
                            _picNoLang.Add(rbPic);
                        }
                    }

                    if (_picNoLang.Count > 0)
                    {
                        reItem.PictureName = _picNoLang.FirstOrDefault().PictureName;
                    }
                    else
                    {
                        reItem.PictureName = "";
                    }

                    returnList.Add(reItem);
                }

                reOutputItem.Emlaklar = returnList;
            }

            return reOutputItem;
        }
        public class RealEstateAdsExt : RealEstateAds
        {
            public int? Fiyat2 { get; set; }
            public int? OdaSayisi2 { get; set; }
            public int? KatSayisi2 { get; set; }
            public int? SalonSayisi2 { get; set; }
            public int? BulunduguKat2 { get; set; }
            public int? Alan2 { get; set; }
            public int? BinaYasi2 { get; set; }
        }

        [HttpGet]
        public JsonResult Kategoriler(int parentID)
        {
            List<FillCategoryReturnJson> _result = new List<FillCategoryReturnJson>();

            _result.Add(new FillCategoryReturnJson() { ID = 0, CategoryName = LangBaslik.KodlaGetir("sctm") });

            var rb = entity.Category.Where(a => a.Active == true && a.ParentID == parentID).ToList();

            if (rb.Count > 0)
            {
                foreach (var item in rb)
                {
                    var rbLang = entity.CategoryLang.Where(a => a.CategoryID == item.ID && a.Language == ToolBox.LangID).FirstOrDefault();

                    if (rbLang != null)
                    {
                        _result.Add(new FillCategoryReturnJson() { ID = (int)rbLang.CategoryID, CategoryName = rbLang.CategoryName });
                    }
                    else
                    {
                        _result.Add(new FillCategoryReturnJson() { ID = (int)item.ID, CategoryName = item.CategoryName });
                    }
                }
            }

            return Json(_result, JsonRequestBehavior.AllowGet);
        }
        public class FillCategoryJson
        {
            public int ParentID { get; set; }
            public string Lang { get; set; }
        }
        public class FillCategoryReturnJson
        {
            public int ID { get; set; }
            public string CategoryName { get; set; }
        }

        [HttpGet]
        public JsonResult Sehirler()
        {
            List<FillCityReturnJson> _result = new List<FillCityReturnJson>();

            XmlReader oku = XmlReader.Create(HttpContext.Server.MapPath("~/App_Data/Sehir.xml"));
            while (oku.Read())
            {
                if (oku.NodeType == XmlNodeType.Element && oku.Name == "sehir")
                {
                    _result.Add(new FillCityReturnJson()
                    {
                        Sehir = oku.GetAttribute("ad").ToString(),
                    });
                }
            }
            oku.Close();

            return Json(_result, JsonRequestBehavior.AllowGet);
        }
        public class FillCityReturnJson
        {
            public string Sehir { get; set; }
        }
    }
}