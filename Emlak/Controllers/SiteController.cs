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
    public class SiteController : Controller
    {
        EmlakEntities entity = new EmlakEntities();

        #region Ilanlar

        [HttpPost]
        public JsonResult Listele([System.Web.Http.FromBody] ListeleInputItem param)
        {
            ListeleOutputItem reOutputItem = new ListeleOutputItem();

            if (param.Detail)
            {
                reOutputItem = DetayliArama(param);
                return Json(reOutputItem, JsonRequestBehavior.AllowGet);
            }

            param.Word = param.Word == null ? "" : param.Word;
            param.OrderBy = param.OrderBy == null ? "" : param.OrderBy;
            param.Page = param.Page < 1 ? 1 : param.Page;

            List<sp_PropertyForListSelect_Result> list = new List<sp_PropertyForListSelect_Result>();

            string pageHeader = "";
            int count = 0;

            if (Session["Emlaklar"] == null)
            {
                if (param.Word.ToLower() == "satilik")
                {
                    list = entity.sp_PropertyForListSelect(ToolBox.LangCode, null, null, null, true, null, null, null, null).ToList();

                    pageHeader = LangBaslik.KodlaGetir("stlk").Text;
                }
                else if (param.Word.ToLower() == "kiralik")
                {
                    list = entity.sp_PropertyForListSelect(ToolBox.LangCode, null, null, null, false, null, null, null, null).ToList();

                    pageHeader = LangBaslik.KodlaGetir("krlk").Text;
                }
                else if (param.Word.ToLower() == "yeni")
                {
                    list = entity.sp_PropertyForListSelect(ToolBox.LangCode, null, null, null, null, true, null, null, null).ToList();

                    pageHeader = LangBaslik.KodlaGetir("newi").Text;
                }
                else if (param.Word.ToLower() == "tumu")
                {
                    list = entity.sp_PropertyForListSelect(ToolBox.LangCode, null, null, null, null, null, null, null, null).ToList();
                }
                else
                {
                    pageHeader = entity.sp_CategoryNameByUrlAndTransCode(param.Word, ToolBox.LangCode).FirstOrDefault();

                    if (!pageHeader.IsNull())
                    {
                        list = entity.sp_PropertyForListSelect(ToolBox.LangCode, null, param.Word, null, null, null, null, null, null).ToList();
                    }
                    else
                    {
                        pageHeader = param.Word;

                        list = entity.sp_PropertyForListSelect(ToolBox.LangCode, null, null, param.Word, null, null, null, null, null).ToList();
                    }
                }

                switch (param.OrderBy)
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
                reOutputItem.Sayfa = param.Page;

                list = list.Skip(12 * (param.Page - 1)).Take(12).ToList();
            }
            else
            {
                list = Session["Emlaklar"] as List<sp_PropertyForListSelect_Result>;

                pageHeader = LangBaslik.KodlaGetir("dsrs").Text;

                switch (param.OrderBy)
                {
                    case "atoz": list = list.OrderBy(a => a.TBaslik).ToList(); break;
                    case "ztoa": list = list.OrderByDescending(a => a.TBaslik).ToList(); break;
                    case "1to9": list = list.OrderBy(a => a.Fiyat).ToList(); break;
                    case "9to1": list = list.OrderByDescending(a => a.Fiyat).ToList(); break;
                    case "dto9": list = list.OrderBy(a => a.ID).ToList(); break;
                    case "dto1": list = list.OrderByDescending(a => a.ID).ToList(); break;
                    default: list = list.OrderBy(a => a.TBaslik).ToList(); break;
                }

                count = list.Count;

                list = list.Skip(12 * (param.Page - 1)).Take(12).ToList();
            }


            if (pageHeader != "")
            {
                reOutputItem.Baslik = pageHeader;
            }
            else
            {
                reOutputItem.Baslik = LangBaslik.KodlaGetir("alli").Text;
            }

            List<ListeleItem> returnList = new List<ListeleItem>();

            foreach (sp_PropertyForListSelect_Result item in list)
            {
                ListeleItem reItem = new ListeleItem();

                reItem.Baslik = item.TBaslik;
                reItem.Yeni = item.Yeni == null ? false : true;
                reItem.Fiyat = item.Fiyat;
                reItem.Url = item.Url;
                reItem.Enlem = item.Enlem;
                reItem.Boylam = item.Boylam;
                reItem.CategoryName = item.CategoryName;
                reItem.PictureName = item.Picture != null ? AppMgr.UploadPath + "/" + item.Picture : AppMgr.ImagePath + "/resimyok.png";
                reOutputItem.Adet = count;
                reOutputItem.DetayLogo = ToolBox.DetailLogo;
                reItem.NewLogo = ToolBox.NewLogo;

                if (pageHeader != "")
                {
                    reOutputItem.Baslik = pageHeader;
                }
                else
                {
                    reOutputItem.Baslik = LangBaslik.KodlaGetir("alli").Text;
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
        public class ListeleItem : RealEstates
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
        public JsonResult Detay(string param)
        {
            RealEstateAdsModel model = new RealEstateAdsModel();

            param = param.IsNull() == true ? Urling.URLBlocks[3] : param;

            var realestateads = entity.sp_PropertyByUrl(ToolBox.LangCode, param).FirstOrDefault();

            if (realestateads != null)
            {
                model.ID = realestateads.ID;
                model.Baslik = realestateads.TBaslik;
                model.Aciklama = realestateads.Aciklama;
                model.Code = realestateads.Code;
                model.Fiyat = realestateads.Fiyat;
                model.Yeni = realestateads.Yeni == null ? false : true;
                model.GununEmlagi = realestateads.GununEmlagi == null ? false : true;
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
                model.RouteUrl = realestateads.Url;
                model.Enlem = realestateads.Enlem;
                model.Boylam = realestateads.Boylam;

                var pictures = entity.sp_PropertyPicturesByID(realestateads.ID).ToList();

                model.Pictures.AddRange(pictures);
            }

            return Json(model, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult DetayliAramaSession([System.Web.Http.FromBody] RealEstateAdsExt param)
        {
            Session["DetayKriter"] = param;

            return Json(true);
        }

        public ListeleOutputItem DetayliArama(ListeleInputItem listRE)
        {
            RealEstateAdsExt listReCP = new RealEstateAdsExt();

            ListeleOutputItem reOutputItem = new ListeleOutputItem();

            reOutputItem.Baslik = LangBaslik.KodlaGetir("dsrs").Text;

            if (Session["DetayKriter"] != null)
            {
                listReCP = (RealEstateAdsExt)Session["DetayKriter"];
            }

            List<sp_PropertyForListSelect_Result> rb = new List<sp_PropertyForListSelect_Result>();

            if (listReCP.KatID == null)
            {
                rb = entity.sp_PropertyForListSelect(ToolBox.LangCode, null, null, null, null, null, null, null, null).ToList();
            }
            else
            {
                rb = entity.sp_PropertyForListSelect(ToolBox.LangCode, listReCP.KatID, null, null, null, null, null, null, null).ToList();
            }

            if (!listReCP.Baslik.IsNull())
                rb = rb.Where(a => a.Baslik.ToLower().Contains(listReCP.Baslik.ToLower()) || a.TBaslik.ToLower().Contains(listReCP.Baslik.ToLower())).ToList();
            if (listReCP.Sehir != null)
                rb = rb.Where(a => a.SehirID == listReCP.Sehir).ToList();
            if (!listReCP.Ilce.IsNull())
                rb = rb.Where(a => a.Ilce.ToLower().Contains(listReCP.Ilce.ToLower())).ToList();
            if (!listReCP.Semt.IsNull())
                rb = rb.Where(a => a.Semt.ToLower().Contains(listReCP.Semt.ToLower())).ToList();
            if (listReCP.Durum != null)
                rb = rb.Where(a => a.DurumID == listReCP.Durum).ToList();
            if (listReCP.IsinmaTipi != null)
                rb = rb.Where(a => a.IsinmaTipiID == listReCP.IsinmaTipi).ToList();
            if (listReCP.YakitTipi != null)
                rb = rb.Where(a => a.YakitTipiID == listReCP.YakitTipi).ToList();
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

                reOutputItem.Emlaklar = rb.ChangeModelList<ListeleItem, sp_PropertyForListSelect_Result>();

                List<ListeleItem> returnList = new List<ListeleItem>();

                foreach (sp_PropertyForListSelect_Result item in rb)
                {
                    ListeleItem reItem = new ListeleItem();

                    reItem.Baslik = item.TBaslik;
                    reItem.Yeni = item.Yeni == null ? false : true;
                    reItem.Fiyat = item.Fiyat;
                    reItem.NewLogo = ToolBox.NewLogo;
                    reItem.Url = item.Url;
                    reItem.CategoryName = item.CategoryName;
                    reItem.Baslik = item.TBaslik;
                    reItem.PictureName = item.Picture != null ? AppMgr.UploadPath + "/" + item.Picture : AppMgr.ImagePath + "/resimyok.png";
                    returnList.Add(reItem);
                }

                reOutputItem.Emlaklar = returnList;
            }

            return reOutputItem;
        }
        public class RealEstateAdsExt
        {
            public int? ID { get; set; }
            public int? KatID { get; set; }
            public int? AltKatID { get; set; }
            public int? Sehir { get; set; }
            public int? Durum { get; set; }
            public int? YakitTipi { get; set; }
            public int? IsinmaTipi { get; set; }
            public string Baslik { get; set; }
            public string Code { get; set; }
            public int? Fiyat { get; set; }
            public bool? Yeni { get; set; }
            public bool? GununEmlagi { get; set; }
            public string Ilce { get; set; }
            public string Semt { get; set; }
            public string Sahibi { get; set; }
            public int? OdaSayisi { get; set; }
            public int? KatSayisi { get; set; }
            public int? SalonSayisi { get; set; }
            public int? BulunduguKat { get; set; }
            public int? Alan { get; set; }
            public int? BinaYasi { get; set; }
            public bool? ArkaCephe { get; set; }
            public bool? OnCephe { get; set; }
            public bool? CaddeyeYakin { get; set; }
            public bool? DenizeSifir { get; set; }
            public bool? DenizeYakin { get; set; }
            public bool? Manzara { get; set; }
            public bool? Merkezde { get; set; }
            public bool? Metro { get; set; }
            public bool? Otoban { get; set; }
            public bool? TopluUlasim { get; set; }
            public bool? Asansor { get; set; }
            public bool? Bahce { get; set; }
            public bool? Guvenlik { get; set; }
            public bool? Hidrofor { get; set; }
            public bool? Mantolama { get; set; }
            public bool? Jenerator { get; set; }
            public bool? Kapici { get; set; }
            public bool? Satilik { get; set; }
            public bool? Otopark { get; set; }
            public bool? OyunParki { get; set; }
            public bool? PVCDograma { get; set; }
            public bool? SiteIci { get; set; }
            public bool? YanginMerdiveni { get; set; }
            public bool? YuzmeHavuzu { get; set; }
            public bool? Alarm { get; set; }
            public bool? Balkon { get; set; }
            public bool? CelikKapi { get; set; }
            public bool? GoruntuluDiafon { get; set; }
            public bool? Jakuzi { get; set; }
            public bool? KabloTVUydu { get; set; }
            public bool? Klima { get; set; }
            public bool? Active { get; set; }
            public string RouteUrl { get; set; }
            public string Enlem { get; set; }
            public string Boylam { get; set; }
            public int? Fiyat2 { get; set; }
            public int? OdaSayisi2 { get; set; }
            public int? KatSayisi2 { get; set; }
            public int? SalonSayisi2 { get; set; }
            public int? BulunduguKat2 { get; set; }
            public int? Alan2 { get; set; }
            public int? BinaYasi2 { get; set; }
            public bool? Kiralik { get; set; }
        }

        [HttpGet]
        public JsonResult AramaSonuc(string param, string param2)
        {
            switch (param2)
            {
                case "kelime":
                    List<SiralaREReturnJson> kelimeModel = KelimeAra(param);
                    if (kelimeModel == null)
                    {
                        return Json("", JsonRequestBehavior.AllowGet);
                    }
                    else
                    {
                        return Json(kelimeModel, JsonRequestBehavior.AllowGet);
                    }
                case "kod":
                    RealEstateAdsModel kodModel = KodAra(param);
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

            var rb = entity.sp_PropertyForListSelect(ToolBox.LangCode, null, null, kelime, null, null, null, null, null).ToList();

            if (rb.Count > 0)
            {
                _listRV = new List<SiralaREReturnJson>();

                foreach (var item in rb)
                {
                    SiralaREReturnJson reItem = new SiralaREReturnJson();

                    reItem.Baslik = item.Baslik;
                    reItem.Fiyat = item.Fiyat;
                    reItem.Yeni = item.Yeni == null ? false : true;
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
        public JsonResult VitrinIlanlar(int param = 0)
        {
            var modelList = entity.sp_PropertyForListSelect(ToolBox.LangCode, null, null, null, null, null, null, true, param).ToList();

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
        public JsonResult GununIlani()
        {
            var item = entity.sp_PropertyForListSelect(ToolBox.LangCode, null, null, null, null, null, true, null, 1).FirstOrDefault();

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
        public JsonResult YeniIlanlar(int param = 0)
        {
            var modelList = entity.sp_PropertyForListSelect(ToolBox.LangCode, null, null, null, null, true, null, true, param).ToList();

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

        #endregion

        #region Kategori

        [HttpGet]
        public JsonResult KategoriMenu()
        {
            var menuList = entity.sp_CategoriesByParentID(0, ToolBox.LangCode).ToList();

            return Json(menuList, JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public JsonResult Kategoriler(int param)
        {
            List<sp_CategoriesByParentID_Result> result = entity.sp_CategoriesByParentID(param, ToolBox.LangCode).ToList();

            return Json(result, JsonRequestBehavior.AllowGet);
        }

        #endregion

        #region İçerik

        [HttpGet]
        public JsonResult IcerikGetir(string param)
        {
            IcerikJson icerik = new IcerikJson();

            var content = entity.sp_ContentDetailByUrl(param, ToolBox.LangCode).FirstOrDefault();

            if (content != null)
            {
                icerik.Baslik = content.ContentName;
                icerik.Aciklama = content.Description;
            }

            if (param == "Iletisim")
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
        public JsonResult Sayfalar()
        {
            var modelList = entity.sp_ContentLinks(ToolBox.LangCode).Where(a => a.Url != "Hakkimizda" && a.Url != "Iletisim").ToList();

            return Json(modelList, JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public JsonResult Haberler()
        {
            var modelList = entity.sp_ContentNews(ToolBox.LangCode).ToList();

            return Json(modelList, JsonRequestBehavior.AllowGet);
        }

        #endregion

        #region Diller

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
        public JsonResult ChangeLang(string param)
        {
            try
            {
                Session["lang"] = param;

                int? langID = entity.sp_TranslationIDByShortName(param).FirstOrDefault();

                if (langID != null)
                {
                    Session["LangID"] = (int)langID;
                }
                else
                {
                    Session["LangID"] = null;
                }
            }
            catch (Exception)
            {
                return Json(false, JsonRequestBehavior.AllowGet);
            }

            return Json(true, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult GetLangItems([System.Web.Http.FromBody] List<LangItem> param)
        {
            List<LangItem> returnList = new List<LangItem>();

            foreach (LangItem item in param)
            {
                LangBaslik baslik = LangBaslik.KodlaGetir(item.Code);

                if (baslik != null)
                {
                    returnList.Add(new LangItem() { Code = baslik.Code, Value = baslik.Text });
                }
            }

            return Json(returnList);
        }

        #endregion

        #region Slider

        [HttpGet]
        public JsonResult Slider()
        {
            List<Resim> pictures = entity.sp_PictureByCodeSelect("banner").ToList().ChangeModelList<Resim, sp_PictureByCodeSelect_Result>();

            return Json(pictures, JsonRequestBehavior.AllowGet);
        }

        #endregion

        #region Ekstra

        [HttpGet]
        public JsonResult Sayac()
        {
            return Json(ToolBox.VisitorCount, JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public JsonResult Sehirler()
        {
            List<usp_CitySelect_Result> result = entity.usp_CitySelect(null).ToList();

            return Json(result, JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public JsonResult Durumlar()
        {
            List<sp_PropertyStatusSelect_Result> result = entity.sp_PropertyStatusSelect(null, ToolBox.LangID).ToList();

            return Json(result, JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public JsonResult YakitTipleri()
        {
            List<sp_FuelTypeSelect_Result> result = entity.sp_FuelTypeSelect(null, ToolBox.LangID).ToList();

            return Json(result, JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public JsonResult IsinmaTipleri()
        {
            List<sp_WarmTypeSelect_Result> result = entity.sp_WarmTypeSelect(null, ToolBox.LangID).ToList();

            return Json(result, JsonRequestBehavior.AllowGet);
        }

        #endregion
    }
}