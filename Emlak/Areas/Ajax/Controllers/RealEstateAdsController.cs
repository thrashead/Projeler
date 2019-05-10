using System;
using System.Linq;
using System.Web.Mvc;
using System.Data;
using TDLibrary;
using Lib;
using System.Collections.Generic;

namespace Emlak.Areas.Ajax.Controllers
{
    public class RealEstateAdsController : Controller
    {
        EmlakSiteEntities entity = new EmlakSiteEntities();

        #region RealEstateAds

        public JsonResult List(string realestateadsName = null, string active = null, int jtStartIndex = 0, int jtPageSize = 0, string jtSorting = null)
        {
            try
            {
                var list = entity.RealEstateAds.ToList();

                if (!realestateadsName.IsNull())
                    list = list.Where(a => a.Baslik.Contains(realestateadsName)).ToList();

                if (active.ToLower() == "active")
                    list = list.Where(a => a.Active == true).ToList();
                else if (active.ToLower() == "passive")
                    list = list.Where(a => a.Active == false).ToList();

                int _recordCount = 0;

                if (list.Count > 0)
                {
                    _recordCount = list.Count;

                    if (jtSorting != null && jtSorting.Split(' ').Length >= 2)
                    {
                        string _orderBy = jtSorting.Split(' ')[0];
                        string _orderDirection = jtSorting.Split(' ')[1].ToLower();

                        if (_orderDirection == "asc")
                        {
                            list = list.OrderBy(a => a.GetType().GetProperty(_orderBy).GetValue(a, null)).Skip(jtStartIndex).Take(jtPageSize).ToList();
                        }
                        else
                        {
                            list = list.OrderByDescending(a => a.GetType().GetProperty(_orderBy).GetValue(a, null)).Skip(jtStartIndex).Take(jtPageSize).ToList();
                        }
                    }
                }


                return Json(new { Result = "OK", Records = list.JsonConverter<List<RealEstateAds>>(), TotalRecordCount = _recordCount });
            }
            catch (Exception ex)
            {
                return Json(new { Result = "ERROR", Message = ex.Message });
            }
        }

        public JsonResult Insert(RealEstateAds record)
        {
            try
            {
                if (record.Baslik.IsNull())
                {
                    return Json(new { Result = "ERROR", Message = "Emlak Başlığı Boş Olamaz." });
                }

                record.RouteUrl = record.Baslik.ToHyperLinkText();

                entity.RealEstateAds.Add(record);

                bool result = entity.SaveChanges() >= 0 ? true : false;

                if (result == true)
                {
                    return Json(new { Result = "OK", Record = record });
                }
                else
                    return Json(new { Result = "ERROR", Message = result });

            }
            catch (Exception ex)
            {
                return Json(new { Result = "ERROR", Message = ex.Message });
            }
        }

        public JsonResult Update(RealEstateAds record)
        {
            try
            {
                if (record.Baslik.IsNull())
                {
                    return Json(new { Result = "ERROR", Message = "Emlak Başlığı Boş Olamaz." });
                }

                record.RouteUrl = record.Baslik.ToHyperLinkText();

                var realestateads = entity.RealEstateAds.Find(record.ID);

                realestateads.Baslik = record.Baslik;
                realestateads.KatID = record.KatID;
                realestateads.AltKatID = record.AltKatID;
                realestateads.Fiyat = record.Fiyat;
                realestateads.Yeni = record.Yeni;
                realestateads.GununEmlagi = record.GununEmlagi;
                realestateads.Sehir = record.Sehir;
                realestateads.Ilce = record.Ilce;
                realestateads.Semt = record.Semt;
                realestateads.Sahibi = record.Sahibi;
                realestateads.OdaSayisi = record.OdaSayisi;
                realestateads.KatSayisi = record.KatSayisi;
                realestateads.IsinmaTipi = record.IsinmaTipi;
                realestateads.SalonSayisi = record.SalonSayisi;
                realestateads.BulunduguKat = record.BulunduguKat;
                realestateads.YakitTipi = record.YakitTipi;
                realestateads.Alan = record.Alan;
                realestateads.Durum = record.Durum;
                realestateads.BinaYasi = record.BinaYasi;
                realestateads.ArkaCephe = record.ArkaCephe;
                realestateads.OnCephe = record.OnCephe;
                realestateads.CaddeyeYakin = record.CaddeyeYakin;
                realestateads.DenizeSifir = record.DenizeSifir;
                realestateads.DenizeYakin = record.DenizeYakin;
                realestateads.Manzara = record.Manzara;
                realestateads.Merkezde = record.Merkezde;
                realestateads.Metro = record.Metro;
                realestateads.Otoban = record.Otoban;
                realestateads.TopluUlasim = record.TopluUlasim;
                realestateads.Asansor = record.Asansor;
                realestateads.Bahce = record.Bahce;
                realestateads.Guvenlik = record.Guvenlik;
                realestateads.Hidrofor = record.Hidrofor;
                realestateads.Mantolama = record.Mantolama;
                realestateads.Jenerator = record.Jenerator;
                realestateads.Kapici = record.Kapici;
                realestateads.Satilik = record.Satilik;
                realestateads.Otopark = record.Otopark;
                realestateads.OyunParki = record.OyunParki;
                realestateads.PVCDograma = record.PVCDograma;
                realestateads.SiteIci = record.SiteIci;
                realestateads.YanginMerdiveni = record.YanginMerdiveni;
                realestateads.YuzmeHavuzu = record.YuzmeHavuzu;
                realestateads.Alarm = record.Alarm;
                realestateads.Balkon = record.Balkon;
                realestateads.CelikKapi = record.CelikKapi;
                realestateads.GoruntuluDiafon = record.GoruntuluDiafon;
                realestateads.Jakuzi = record.Jakuzi;
                realestateads.KabloTVUydu = record.KabloTVUydu;
                realestateads.Klima = record.Klima;
                realestateads.Enlem = record.Enlem;
                realestateads.Boylam = record.Boylam;
                realestateads.Code = record.Code;
                realestateads.RouteUrl = record.RouteUrl;
                realestateads.Queue = record.Queue;
                realestateads.Active = record.Active;

                bool result = entity.SaveChanges() >= 0 ? true : false;

                if (result == true)
                {
                    return Json(new { Result = "OK" });
                }
                else
                    return Json(new { Result = "ERROR", Message = result });
            }
            catch (Exception ex)
            {
                return Json(new { Result = "ERROR", Message = ex.Message });
            }
        }

        public JsonResult Delete(int? ID)
        {
            try
            {
                if (ID != null)
                {
                    bool result = true;

                    var assignments = entity.Assignments.Where(a => a.MainTypeID == ID && a.MainType == "RealEstateAds").ToList();

                    entity.Assignments.RemoveRange(assignments);

                    result = entity.SaveChanges() >= 0 ? true : false;

                    if (result == true)
                    {
                        assignments = entity.Assignments.Where(a => a.TargetTypeID == ID && a.TargetType == "RealEstateAds").ToList();

                        entity.Assignments.RemoveRange(assignments);

                        result = entity.SaveChanges() >= 0 ? true : false;
                    }
                    else
                        return Json(new { Result = "ERROR", Message = result });

                    if (result == true)
                    {
                        var realestateadslang = entity.RealEstateAdsLang.Where(a => a.EmlakID == ID).ToList();

                        entity.RealEstateAdsLang.RemoveRange(realestateadslang);

                        result = entity.SaveChanges() >= 0 ? true : false;
                    }
                    else
                        return Json(new { Result = "ERROR", Message = result });

                    if (result == true)
                    {
                        var realestateads = entity.RealEstateAds.Where(a => a.ID == ID).FirstOrDefault();

                        entity.RealEstateAds.Remove(realestateads);

                        result = entity.SaveChanges() >= 0 ? true : false;
                    }
                    else
                        return Json(new { Result = "ERROR", Message = result });

                    if (result == true)
                    {
                        return Json(new { Result = "OK" });
                    }
                    else
                        return Json(new { Result = "ERROR", Message = result });
                }
                else
                {
                    return Json(new { Result = "ERROR", Message = "ID Boş" });
                }
            }
            catch (Exception ex)
            {
                return Json(new { Result = "ERROR", Message = ex.Message });
            }
        }

        #endregion

        #region RealEstateAds Language

        public JsonResult ListLang()
        {
            try
            {
                int realestateadsID = Request.QueryString["realestateadsID"].ToInteger();

                var list = entity.RealEstateAdsLang.Where(a => a.EmlakID == realestateadsID).ToList();

                return Json(new { Result = "OK", Records = list.JsonConverter<List<RealEstateAdsLang>>(), TotalRecordCount = list.Count });
            }
            catch (Exception ex)
            {
                return Json(new { Result = "ERROR", Message = ex.Message });
            }
        }

        public JsonResult InsertLang(RealEstateAdsLang record)
        {
            try
            {
                if (record.Baslik.IsNull())
                {
                    return Json(new { Result = "ERROR", Message = "Emlak Adı Boş Olamaz." });
                }

                int realestateadsID = Request.QueryString["realestateadsID"].ToInteger();
                record.EmlakID = realestateadsID;

                var contentlang = entity.RealEstateAdsLang.Where(a => a.EmlakID == realestateadsID && a.Language == record.Language).ToList();

                if (contentlang.Count > 0)
                {
                    return Json(new { Result = "ERROR", Message = "Bu dilde zaten kayıt eklenmiş." });
                }

                entity.RealEstateAdsLang.Add(record);

                bool result = entity.SaveChanges() >= 0 ? true : false;

                if (result == true)
                    return Json(new { Result = "OK", Record = record });
                else
                    return Json(new { Result = "ERROR", Message = result });

            }
            catch (Exception ex)
            {
                return Json(new { Result = "ERROR", Message = ex.Message });
            }
        }

        public JsonResult UpdateLang(RealEstateAdsLang record)
        {
            try
            {
                if (record.Baslik.IsNull())
                {
                    return Json(new { Result = "ERROR", Message = "Emlak Adı Boş Olamaz." });
                }

                int realestateadsID = Request.QueryString["realestateadsID"].ToInteger();
                record.EmlakID = realestateadsID;

                var realestateadslang = entity.RealEstateAdsLang.Where(a => a.EmlakID == realestateadsID && a.Language == record.Language && a.ID == record.ID).FirstOrDefault();

                if (realestateadslang != null)
                {
                    return Json(new { Result = "ERROR", Message = "Bu dilde zaten kayıt eklenmiş." });
                }

                realestateadslang.Baslik = record.Baslik;
                realestateadslang.Code = record.Code;
                realestateadslang.Aciklama = record.Aciklama;
                realestateadslang.Language = record.Language;

                bool result = entity.SaveChanges() >= 0 ? true : false;

                if (result == true)
                    return Json(new { Result = "OK" });
                else
                    return Json(new { Result = "ERROR", Message = result });
            }
            catch (Exception ex)
            {
                return Json(new { Result = "ERROR", Message = ex.Message });
            }
        }

        public JsonResult DeleteLang(int? ID)
        {
            try
            {
                if (ID != null)
                {
                    var realestateadslang = entity.RealEstateAdsLang.Where(a => a.ID == ID).FirstOrDefault();

                    entity.RealEstateAdsLang.Remove(realestateadslang);

                    bool result = entity.SaveChanges() >= 0 ? true : false;

                    if (result == true)
                        return Json(new { Result = "OK" });
                    else
                        return Json(new { Result = "ERROR", Message = result });
                }
                else
                {
                    return Json(new { Result = "ERROR", Message = "ID Boş" });
                }
            }
            catch (Exception ex)
            {
                return Json(new { Result = "ERROR", Message = ex.Message });
            }
        }

        #endregion

        #region RealEstateAds Content

        public JsonResult ListContent()
        {
            try
            {
                int realestateadsID = Request.QueryString["realestateadsID"].ToInteger();

                var assignments = entity.Assignments.Where(a => a.MainType == "Content" && a.TargetType == "RealEstateAds" && a.TargetTypeID == realestateadsID).ToList();

                var list = new List<Content>();

                if (assignments.Count > 0)
                {
                    foreach (var item in assignments)
                    {
                        var listTemp = ((from a in entity.Content
                                         join b in entity.ContentLang on a.ID equals b.ContentID
                                         where a.ID == item.MainTypeID
                                         select new
                                         {
                                             ID = a.ID == null ? 0 : a.ID,
                                             ContentName = a.ContentName == null ? "" : a.ContentName,
                                             Code = a.Code == null ? "" : a.Code,
                                             Active = a.Active == null ? false : a.Active,
                                             Queue = a.Queue == null ? 0 : a.Queue,
                                             RouteUrl = a.RouteUrl == null ? "" : a.RouteUrl,
                                             Sample = b.ContentName == null ? "" : b.ContentName,
                                         }).Take(1).ToList());

                        list = listTemp.Select(a => new Content
                        {
                            ID = a.ID == null ? 0 : a.ID,
                            ContentName = a.ContentName == null ? "" : a.ContentName,
                            Code = a.Code == null ? "" : a.Code,
                            Active = a.Active == null ? false : a.Active,
                            Queue = a.Queue == null ? 0 : a.Queue,
                            RouteUrl = a.RouteUrl == null ? "" : a.RouteUrl,
                            Sample = a.Sample == null ? "" : a.Sample,
                        }).ToList();
                    }
                }

                return Json(new { Result = "OK", Records = list.JsonConverter<List<Content>>(), TotalRecordCount = list.Count });
            }
            catch (Exception ex)
            {
                return Json(new { Result = "ERROR", Message = ex.Message });
            }
        }

        public JsonResult DeleteContent(int? ID)
        {
            try
            {
                if (ID != null)
                {
                    int realestateadsID = Request.QueryString["realestateadsID"].ToInteger();

                    var assignments = entity.Assignments.Where(a => a.MainType == "Content" && a.MainTypeID == ID && a.TargetType == "RealEstateAds" && a.TargetTypeID == realestateadsID).ToList();

                    entity.Assignments.RemoveRange(assignments);

                    bool result = entity.SaveChanges() >= 0 ? true : false;

                    if (result == true)
                        return Json(new { Result = "OK" });
                    else
                        return Json(new { Result = "ERROR", Message = "Silinemedi." });
                }
                else
                {
                    return Json(new { Result = "ERROR", Message = "ID Boş" });
                }
            }
            catch (Exception ex)
            {
                return Json(new { Result = "ERROR", Message = ex.Message });
            }
        }

        #endregion

        #region RealEstateAds Gallery

        public JsonResult ListGallery()
        {
            try
            {
                int realestateadsID = Request.QueryString["realestateadsID"].ToInteger();

                var assignments = entity.Assignments.Where(a => a.MainType == "Gallery" && a.TargetType == "RealEstateAds" && a.TargetTypeID == realestateadsID).ToList();

                var list = new List<Gallery>();

                if (assignments.Count > 0)
                {
                    foreach (var item in assignments)
                    {
                        var listTemp = ((from a in entity.Gallery
                                         join b in entity.GalleryLang on a.ID equals b.GalleryID
                                         where a.ID == item.MainTypeID
                                         select new
                                         {
                                             ID = a.ID == null ? 0 : a.ID,
                                             GalleryName = a.GalleryName == null ? "" : a.GalleryName,
                                             Code = a.Code == null ? "" : a.Code,
                                             Active = a.Active == null ? false : a.Active,
                                             Queue = a.Queue == null ? 0 : a.Queue,
                                             RouteUrl = a.RouteUrl == null ? "" : a.RouteUrl,
                                             Sample = b.GalleryName == null ? "" : b.GalleryName
                                         }).Take(1).ToList());

                        list = listTemp.Select(a => new Gallery
                        {
                            ID = a.ID == null ? 0 : a.ID,
                            GalleryName = a.GalleryName == null ? "" : a.GalleryName,
                            Code = a.Code == null ? "" : a.Code,
                            Active = a.Active == null ? false : a.Active,
                            Queue = a.Queue == null ? 0 : a.Queue,
                            RouteUrl = a.RouteUrl == null ? "" : a.RouteUrl,
                            Sample = a.Sample == null ? "" : a.Sample
                        }).ToList();
                    }
                }

                return Json(new { Result = "OK", Records = list.JsonConverter<List<Gallery>>(), TotalRecordCount = list.Count });
            }
            catch (Exception ex)
            {
                return Json(new { Result = "ERROR", Message = ex.Message });
            }
        }

        public JsonResult DeleteGallery(int? ID)
        {
            try
            {
                if (ID != null)
                {
                    int realestateadsID = Request.QueryString["realestateadsID"].ToInteger();

                    var assignments = entity.Assignments.Where(a => a.MainType == "Gallery" && a.MainTypeID == ID && a.TargetType == "RealEstateAds" && a.TargetTypeID == realestateadsID).ToList();

                    entity.Assignments.RemoveRange(assignments);

                    bool result = entity.SaveChanges() >= 0 ? true : false;

                    if (result == true)
                        return Json(new { Result = "OK" });
                    else
                        return Json(new { Result = "ERROR", Message = "Silinemedi." });
                }
                else
                {
                    return Json(new { Result = "ERROR", Message = "ID Boş" });
                }
            }
            catch (Exception ex)
            {
                return Json(new { Result = "ERROR", Message = ex.Message });
            }
        }

        #endregion

        #region RealEstateAds Pictures

        public JsonResult ListPictures()
        {
            try
            {
                int realestateadsID = Request.QueryString["realestateadsID"].ToInteger();

                var assignments = entity.Assignments.Where(a => a.MainType == "Pictures" && a.TargetType == "RealEstateAds" && a.TargetTypeID == realestateadsID).ToList();

                var list = new List<Pictures>();

                if (assignments.Count > 0)
                {
                    foreach (var item in assignments)
                    {
                        var listTemp = ((from a in entity.Pictures
                                         join b in entity.PicturesLang on a.ID equals b.PictureID
                                         where a.ID == item.MainTypeID
                                         select new
                                         {
                                             ID = a.ID == null ? 0 : a.ID,
                                             PictureName = a.PictureName == null ? "" : a.PictureName,
                                             Code = a.Code == null ? "" : a.Code,
                                             Active = a.Active == null ? false : a.Active,
                                             Queue = a.Queue == null ? 0 : a.Queue,
                                             Sample = b.PictureName == null ? "" : b.PictureName
                                         }).Take(1).ToList());

                        list = listTemp.Select(a => new Pictures
                        {
                            ID = a.ID == null ? 0 : a.ID,
                            PictureName = a.PictureName == null ? "" : a.PictureName,
                            Code = a.Code == null ? "" : a.Code,
                            Active = a.Active == null ? false : a.Active,
                            Queue = a.Queue == null ? 0 : a.Queue,
                            Sample = a.Sample == null ? "" : a.Sample
                        }).ToList();
                    }
                }

                return Json(new { Result = "OK", Records = list.JsonConverter<List<Pictures>>(), TotalRecordCount = list.Count });
            }
            catch (Exception ex)
            {
                return Json(new { Result = "ERROR", Message = ex.Message });
            }
        }

        public JsonResult DeletePictures(int? ID)
        {
            try
            {
                if (ID != null)
                {
                    int realestateadsID = Request.QueryString["realestateadsID"].ToInteger();

                    var assignments = entity.Assignments.Where(a => a.MainType == "Pictures" && a.MainTypeID == ID && a.TargetType == "RealEstateAds" && a.TargetTypeID == realestateadsID).ToList();

                    entity.Assignments.RemoveRange(assignments);

                    bool result = entity.SaveChanges() >= 0 ? true : false;

                    if (result == true)
                        return Json(new { Result = "OK" });
                    else
                        return Json(new { Result = "ERROR", Message = "Silinemedi." });
                }
                else
                {
                    return Json(new { Result = "ERROR", Message = "ID Boş" });
                }
            }
            catch (Exception ex)
            {
                return Json(new { Result = "ERROR", Message = ex.Message });
            }
        }

        #endregion

        #region RealEstateAds PicturesNoLang

        public JsonResult ListPicturesNoLang()
        {
            try
            {
                int realestateadsID = Request.QueryString["realestateadsID"].ToInteger();

                var assignments = entity.Assignments.Where(a => a.MainType == "PicturesNoLang" && a.TargetType == "RealEstateAds" && a.TargetTypeID == realestateadsID).ToList();

                var list = new List<PicturesNoLang>();

                if (assignments.Count > 0)
                {
                    foreach (var item in assignments)
                    {
                        var picturesnolang = entity.PicturesNoLang.Where(a => a.ID == item.MainTypeID).ToList();

                        if (picturesnolang.Count > 0)
                        {
                            foreach (PicturesNoLang pic in picturesnolang)
                            {
                                list.Add(pic);
                            }
                        }
                    }
                }

                return Json(new { Result = "OK", Records = list.JsonConverter<List<PicturesNoLang>>(), TotalRecordCount = list.Count });
            }
            catch (Exception ex)
            {
                return Json(new { Result = "ERROR", Message = ex.Message });
            }
        }

        public JsonResult DeletePicturesNoLang(int? ID)
        {
            try
            {
                if (ID != null)
                {
                    int realestateadsID = Request.QueryString["realestateadsID"].ToInteger();

                    var assignments = entity.Assignments.Where(a => a.MainType == "PicturesNoLang" && a.MainTypeID == ID && a.TargetType == "RealEstateAds" && a.TargetTypeID == realestateadsID).ToList();

                    entity.Assignments.RemoveRange(assignments);

                    bool result = entity.SaveChanges() >= 0 ? true : false;

                    if (result == true)
                        return Json(new { Result = "OK" });
                    else
                        return Json(new { Result = "ERROR", Message = "Silinemedi." });
                }
                else
                {
                    return Json(new { Result = "ERROR", Message = "ID Boş" });
                }
            }
            catch (Exception ex)
            {
                return Json(new { Result = "ERROR", Message = ex.Message });
            }
        }

        #endregion

        #region RealEstateAds Files

        public JsonResult ListFiles()
        {
            try
            {
                int realestateadsID = Request.QueryString["realestateadsID"].ToInteger();

                var assignments = entity.Assignments.Where(a => a.MainType == "Files" && a.TargetType == "RealEstateAds" && a.TargetTypeID == realestateadsID).ToList();

                var list = new List<Files>();

                if (assignments.Count > 0)
                {
                    foreach (var item in assignments)
                    {
                        var listTemp = ((from a in entity.Files
                                         join b in entity.FilesLang on a.ID equals b.FileID
                                         where a.ID == item.MainTypeID
                                         select new
                                         {
                                             ID = a.ID == null ? 0 : a.ID,
                                             FileName = a.FileName == null ? "" : a.FileName,
                                             Code = a.Code == null ? "" : a.Code,
                                             Active = a.Active == null ? false : a.Active,
                                             Queue = a.Queue == null ? 0 : a.Queue,
                                             Sample = b.FileName == null ? "" : b.FileName
                                         }).Take(1).ToList());

                        list = listTemp.Select(a => new Files
                        {
                            ID = a.ID == null ? 0 : a.ID,
                            FileName = a.FileName == null ? "" : a.FileName,
                            Code = a.Code == null ? "" : a.Code,
                            Active = a.Active == null ? false : a.Active,
                            Queue = a.Queue == null ? 0 : a.Queue,
                            Sample = a.Sample == null ? "" : a.Sample
                        }).ToList();
                    }
                }

                return Json(new { Result = "OK", Records = list.JsonConverter<List<Files>>(), TotalRecordCount = list.Count });
            }
            catch (Exception ex)
            {
                return Json(new { Result = "ERROR", Message = ex.Message });
            }
        }

        public JsonResult DeleteFiles(int? ID)
        {
            try
            {
                if (ID != null)
                {
                    int realestateadsID = Request.QueryString["realestateadsID"].ToInteger();

                    var assignments = entity.Assignments.Where(a => a.MainType == "Files" && a.MainTypeID == ID && a.TargetType == "RealEstateAds" && a.TargetTypeID == realestateadsID).ToList();

                    entity.Assignments.RemoveRange(assignments);

                    bool result = entity.SaveChanges() >= 0 ? true : false;

                    if (result == true)
                        return Json(new { Result = "OK" });
                    else
                        return Json(new { Result = "ERROR", Message = "Silinemedi." });
                }
                else
                {
                    return Json(new { Result = "ERROR", Message = "ID Boş" });
                }
            }
            catch (Exception ex)
            {
                return Json(new { Result = "ERROR", Message = ex.Message });
            }
        }

        #endregion

        #region RealEstateAds FilesNoLang

        public JsonResult ListFilesNoLang()
        {
            try
            {
                int realestateadsID = Request.QueryString["realestateadsID"].ToInteger();

                var assignments = entity.Assignments.Where(a => a.MainType == "FilesNoLang" && a.TargetType == "RealEstateAds" && a.TargetTypeID == realestateadsID).ToList();

                var list = new List<FilesNoLang>();

                if (assignments.Count > 0)
                {
                    foreach (var item in assignments)
                    {
                        var filesnolang = entity.FilesNoLang.Where(a => a.ID == item.MainTypeID).ToList();

                        if (filesnolang.Count > 0)
                        {
                            foreach (FilesNoLang pic in filesnolang)
                            {
                                list.Add(pic);
                            }
                        }
                    }
                }

                return Json(new { Result = "OK", Records = list.JsonConverter<List<FilesNoLang>>(), TotalRecordCount = list.Count });
            }
            catch (Exception ex)
            {
                return Json(new { Result = "ERROR", Message = ex.Message });
            }
        }

        public JsonResult DeleteFilesNoLang(int? ID)
        {
            try
            {
                if (ID != null)
                {
                    int realestateadsID = Request.QueryString["realestateadsID"].ToInteger();

                    var assignments = entity.Assignments.Where(a => a.MainType == "FilesNoLang" && a.MainTypeID == ID && a.TargetType == "RealEstateAds" && a.TargetTypeID == realestateadsID).ToList();

                    entity.Assignments.RemoveRange(assignments);

                    bool result = entity.SaveChanges() >= 0 ? true : false;

                    if (result == true)
                        return Json(new { Result = "OK" });
                    else
                        return Json(new { Result = "ERROR", Message = "Silinemedi." });
                }
                else
                {
                    return Json(new { Result = "ERROR", Message = "ID Boş" });
                }
            }
            catch (Exception ex)
            {
                return Json(new { Result = "ERROR", Message = ex.Message });
            }
        }

        #endregion

        //#region RealEstateAds Rank

        //public JsonResult ListRank()
        //{
        //    try
        //    {
        //        int realestateadsID = Request.QueryString["realestateadsID"].ToInteger();

        //        List<Rank> contList = new List<Rank>();

        //        ResultBox rb = TDHelper<Assignments>.Select(new List<Where> { new Where(AssignmentsColumns.MainType, "Rank"), new Where(AssignmentsColumns.TargetType, "RealEstateAds"), new Where(AssignmentsColumns.TargetTypeID, realestateadsID) });

        //        if (rb.HasData)
        //        {
        //            foreach (Assignments item in rb.Data as List<Assignments>)
        //            {
        //                ResultBox rbCon = TDHelper<Rank>.Select(new Where(RankColumns.ID, item.MainTypeID));

        //                if (rbCon.HasData)
        //                {
        //                    foreach (Rank rank in (rbCon.Data as List<Rank>))
        //                    {
        //                        contList.Add(rank);
        //                    }
        //                }
        //            }
        //        }

        //        return Json(new { Result = "OK", Records = contList, TotalRecordCount = contList.Count });
        //    }
        //    catch (Exception ex)
        //    {
        //        return Json(new { Result = "ERROR", Message = ex.Message });
        //    }
        //}

        //public JsonResult DeleteRank(int ID)
        //{
        //    try
        //    {
        //        bool result = true;

        //        int realestateadsID = Request.QueryString["realestateadsID"].ToInteger();

        //        result = TDHelper<Assignments>.Delete(new List<Where> { new Where(AssignmentsColumns.MainType, "Rank"), new Where(AssignmentsColumns.MainTypeID, ID), new Where(AssignmentsColumns.TargetType, "RealEstateAds"), new Where(AssignmentsColumns.TargetTypeID, realestateadsID) }).Result;

        //        if (result == true)
        //            return Json(new { Result = "OK" });
        //        else
        //            return Json(new { Result = "ERROR", Message = "Silinemedi." });
        //    }
        //    catch (Exception ex)
        //    {
        //        return Json(new { Result = "ERROR", Message = ex.Message });
        //    }
        //}

        //#endregion

        #region RealEstateAds URLink

        public JsonResult ListURLink()
        {
            try
            {
                int realestateadsID = Request.QueryString["realestateadsID"].ToInteger();

                var assignments = entity.Assignments.Where(a => a.MainType == "URLink" && a.TargetType == "RealEstateAds" && a.TargetTypeID == realestateadsID).ToList();

                var list = new List<URLink>();

                if (assignments.Count > 0)
                {
                    foreach (var item in assignments)
                    {
                        var listTemp = ((from a in entity.URLink
                                         join b in entity.URLinkLang on a.ID equals b.URLinkID
                                         where a.ID == item.MainTypeID
                                         select new
                                         {
                                             ID = a.ID == null ? 0 : a.ID,
                                             URLinkName = a.URLinkName == null ? "" : a.URLinkName,
                                             Code = a.Code == null ? "" : a.Code,
                                             Target = a.Target == null ? "" : a.Target,
                                             Active = a.Active == null ? false : a.Active,
                                             Queue = a.Queue == null ? 0 : a.Queue,
                                             Sample = b.URL == null ? "" : b.URL
                                         }).Take(1).ToList());

                        list = listTemp.Select(a => new URLink
                        {
                            ID = a.ID == null ? 0 : a.ID,
                            URLinkName = a.URLinkName == null ? "" : a.URLinkName,
                            Code = a.Code == null ? "" : a.Code,
                            Target = a.Target == null ? "" : a.Target,
                            Active = a.Active == null ? false : a.Active,
                            Queue = a.Queue == null ? 0 : a.Queue,
                            Sample = a.Sample == null ? "" : a.Sample
                        }).ToList();
                    }
                }

                return Json(new { Result = "OK", Records = list.JsonConverter<List<URLink>>(), TotalRecordCount = list.Count });
            }
            catch (Exception ex)
            {
                return Json(new { Result = "ERROR", Message = ex.Message });
            }
        }

        public JsonResult DeleteURLink(int? ID)
        {
            try
            {
                if (ID != null)
                {
                    int realestateadsID = Request.QueryString["realestateadsID"].ToInteger();

                    var assignments = entity.Assignments.Where(a => a.MainType == "URLink" && a.MainTypeID == ID && a.TargetType == "RealEstateAds" && a.TargetTypeID == realestateadsID).ToList();

                    entity.Assignments.RemoveRange(assignments);

                    bool result = entity.SaveChanges() >= 0 ? true : false;

                    if (result == true)
                        return Json(new { Result = "OK" });
                    else
                        return Json(new { Result = "ERROR", Message = "Silinemedi." });
                }
                else
                {
                    return Json(new { Result = "ERROR", Message = "ID Boş" });
                }
            }
            catch (Exception ex)
            {
                return Json(new { Result = "ERROR", Message = ex.Message });
            }
        }

        #endregion

        #region RealEstateAds URLinkNoLang

        public JsonResult ListURLinkNoLang()
        {
            try
            {
                int realestateadsID = Request.QueryString["realestateadsID"].ToInteger();

                var assignments = entity.Assignments.Where(a => a.MainType == "URLinkNoLang" && a.TargetType == "RealEstateAds" && a.TargetTypeID == realestateadsID).ToList();

                var list = new List<URLinkNoLang>();

                if (assignments.Count > 0)
                {
                    foreach (var item in assignments)
                    {
                        var urlinknolang = entity.URLinkNoLang.Where(a => a.ID == item.MainTypeID).ToList();

                        if (urlinknolang.Count > 0)
                        {
                            foreach (URLinkNoLang pic in urlinknolang)
                            {
                                list.Add(pic);
                            }
                        }
                    }
                }

                return Json(new { Result = "OK", Records = list.JsonConverter<List<URLinkNoLang>>(), TotalRecordCount = list.Count });
            }
            catch (Exception ex)
            {
                return Json(new { Result = "ERROR", Message = ex.Message });
            }
        }

        public JsonResult DeleteURLinkNoLang(int? ID)
        {
            try
            {
                if (ID != null)
                {
                    int realestateadsID = Request.QueryString["realestateadsID"].ToInteger();

                    var assignments = entity.Assignments.Where(a => a.MainType == "URLinkNoLang" && a.MainTypeID == ID && a.TargetType == "RealEstateAds" && a.TargetTypeID == realestateadsID).ToList();

                    entity.Assignments.RemoveRange(assignments);

                    bool result = entity.SaveChanges() >= 0 ? true : false;

                    if (result == true)
                        return Json(new { Result = "OK" });
                    else
                        return Json(new { Result = "ERROR", Message = "Silinemedi." });
                }
                else
                {
                    return Json(new { Result = "ERROR", Message = "ID Boş" });
                }
            }
            catch (Exception ex)
            {
                return Json(new { Result = "ERROR", Message = ex.Message });
            }
        }

        #endregion
    }
}
