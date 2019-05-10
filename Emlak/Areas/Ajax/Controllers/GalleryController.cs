using System;
using System.Linq;
using System.Web.Mvc;
using System.Data;
using TDLibrary;
using Lib;
using System.Collections.Generic;

namespace Emlak.Areas.Ajax.Controllers
{
    public class GalleryController : Controller
    {
        EmlakSiteEntities entity = new EmlakSiteEntities();

        #region Gallery

        public JsonResult List(string galleryName = null, string active = null, int jtStartIndex = 0, int jtPageSize = 0, string jtSorting = null)
        {
            try
            {
                var list = entity.Gallery.ToList();

                if (!galleryName.IsNull())
                    list = list.Where(a => a.GalleryName.Contains(galleryName)).ToList();

                if (active.ToLower() == "active")
                    list = list.Where(a => a.Active == true).ToList();
                else if (active.ToLower() == "passive")
                    list = list.Where(a => a.Active == true).ToList();

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


                return Json(new { Result = "OK", Records = list.JsonConverter<List<Gallery>>(), TotalRecordCount = _recordCount });
            }
            catch (Exception ex)
            {
                return Json(new { Result = "ERROR", Message = ex.Message });
            }
        }

        public JsonResult Insert(Gallery record)
        {
            try
            {
                if (record.GalleryName.IsNull())
                {
                    return Json(new { Result = "ERROR", Message = "Galeri Adı Boş Olamaz." });
                }

                record.RouteUrl = record.GalleryName.ToHyperLinkText();

                entity.Gallery.Add(record);

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

        public JsonResult Update(Gallery record)
        {
            try
            {
                if (record.GalleryName.IsNull())
                {
                    return Json(new { Result = "ERROR", Message = "Galeri Adı Boş Olamaz." });
                }

                record.RouteUrl = record.GalleryName.ToHyperLinkText();

                var gallery = entity.Gallery.Find(record.ID);

                gallery.Active = record.Active;
                gallery.GalleryName = record.GalleryName;
                gallery.Code = record.Code;
                gallery.RouteUrl = record.RouteUrl;
                gallery.Queue = record.Queue;

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

                    var assignments = entity.Assignments.Where(a => a.MainTypeID == ID && a.MainType == "Gallery").ToList();

                    entity.Assignments.RemoveRange(assignments);

                    result = entity.SaveChanges() >= 0 ? true : false;

                    if (result == true)
                    {
                        assignments = entity.Assignments.Where(a => a.TargetTypeID == ID && a.TargetType == "Gallery").ToList();

                        entity.Assignments.RemoveRange(assignments);

                        result = entity.SaveChanges() >= 0 ? true : false;
                    }
                    else
                        return Json(new { Result = "ERROR", Message = result });

                    if (result == true)
                    {
                        var gallerylang = entity.GalleryLang.Where(a => a.GalleryID == ID).ToList();

                        entity.GalleryLang.RemoveRange(gallerylang);

                        result = entity.SaveChanges() >= 0 ? true : false;
                    }
                    else
                        return Json(new { Result = "ERROR", Message = result });

                    if (result == true)
                    {
                        var gallery = entity.Gallery.Where(a => a.ID == ID).FirstOrDefault();

                        entity.Gallery.Remove(gallery);

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

        #region Gallery Language

        public JsonResult ListLang()
        {
            try
            {
                int galID = Request.QueryString["galID"].ToInteger();

                var list = entity.GalleryLang.Where(a => a.GalleryID == galID).ToList();

                return Json(new { Result = "OK", Records = list.JsonConverter<List<GalleryLang>>(), TotalRecordCount = list.Count });
            }
            catch (Exception ex)
            {
                return Json(new { Result = "ERROR", Message = ex.Message });
            }
        }

        public JsonResult InsertLang(GalleryLang record)
        {
            try
            {
                if (record.GalleryName.IsNull())
                {
                    return Json(new { Result = "ERROR", Message = "Galeri Adı Boş Olamaz." });
                }

                int galID = Request.QueryString["galID"].ToInteger();
                record.GalleryID = galID;

                var gallerylang = entity.GalleryLang.Where(a => a.GalleryID == galID && a.Language == record.Language).ToList();

                if (gallerylang.Count > 0)
                {
                    return Json(new { Result = "ERROR", Message = "Bu dilde zaten kayıt eklenmiş." });
                }

                entity.GalleryLang.Add(record);

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

        public JsonResult UpdateLang(GalleryLang record)
        {
            try
            {
                if (record.GalleryName.IsNull())
                {
                    return Json(new { Result = "ERROR", Message = "Galeri Adı Boş Olamaz." });
                }

                int galID = Request.QueryString["galID"].ToInteger();
                record.GalleryID = galID;

                var gallerylang = entity.GalleryLang.Where(a => a.GalleryID == galID && a.Language == record.Language && a.ID == record.ID).FirstOrDefault();

                if (gallerylang != null)
                {
                    return Json(new { Result = "ERROR", Message = "Bu dilde zaten kayıt eklenmiş." });
                }

                gallerylang.ShortText = record.ShortText;
                gallerylang.Language = record.Language;
                gallerylang.Description = record.Description;
                gallerylang.GalleryName = record.GalleryName;

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
                    var gallerylang = entity.GalleryLang.Where(a => a.ID == ID).FirstOrDefault();

                    entity.GalleryLang.Remove(gallerylang);

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

        #region Gallery Content

        public JsonResult ListContent()
        {
            try
            {
                int galID = Request.QueryString["galID"].ToInteger();

                var assignments = entity.Assignments.Where(a => a.MainType == "Content" && a.TargetType == "Gallery" && a.TargetTypeID == galID).ToList();

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
                    int galID = Request.QueryString["galID"].ToInteger();

                    var assignments = entity.Assignments.Where(a => a.MainType == "Content" && a.MainTypeID == ID && a.TargetType == "Gallery" && a.TargetTypeID == galID).ToList();

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

        #region Gallery Pictures

        public JsonResult ListPictures()
        {
            try
            {
                int galID = Request.QueryString["galID"].ToInteger();

                var assignments = entity.Assignments.Where(a => a.MainType == "Pictures" && a.TargetType == "Gallery" && a.TargetTypeID == galID).ToList();

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
                                             Sample = b.PictureName == null ? "" : b.PictureName,
                                         }).Take(1).ToList());

                        list = listTemp.Select(a => new Pictures
                        {
                            ID = a.ID == null ? 0 : a.ID,
                            PictureName = a.PictureName == null ? "" : a.PictureName,
                            Code = a.Code == null ? "" : a.Code,
                            Active = a.Active == null ? false : a.Active,
                            Queue = a.Queue == null ? 0 : a.Queue,
                            Sample = a.Sample == null ? "" : a.Sample,
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
                    int galID = Request.QueryString["galID"].ToInteger();

                    var assignments = entity.Assignments.Where(a => a.MainType == "Pictures" && a.MainTypeID == ID && a.TargetType == "Gallery" && a.TargetTypeID == galID).ToList();

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

        #region Gallery PicturesNoLang

        public JsonResult ListPicturesNoLang()
        {
            try
            {
                int galID = Request.QueryString["galID"].ToInteger();

                List<PicturesNoLang> list = new List<PicturesNoLang>();

                var assignments = entity.Assignments.Where(a => a.MainType == "PicturesNoLang" && a.TargetType == "Gallery" && a.TargetTypeID == galID).ToList();

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
                    int galID = Request.QueryString["galID"].ToInteger();

                    var assignments = entity.Assignments.Where(a => a.MainType == "PicturesNoLang" && a.MainTypeID == ID && a.TargetType == "Gallery" && a.TargetTypeID == galID).ToList();

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

        #region Gallery Files

        public JsonResult ListFiles()
        {
            try
            {
                int galID = Request.QueryString["galID"].ToInteger();

                var assignments = entity.Assignments.Where(a => a.MainType == "Files" && a.TargetType == "Gallery" && a.TargetTypeID == galID).ToList();

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
                                             Sample = b.FileName == null ? "" : b.FileName,
                                         }).Take(1).ToList());

                        list = listTemp.Select(a => new Files
                        {
                            ID = a.ID == null ? 0 : a.ID,
                            FileName = a.FileName == null ? "" : a.FileName,
                            Code = a.Code == null ? "" : a.Code,
                            Active = a.Active == null ? false : a.Active,
                            Queue = a.Queue == null ? 0 : a.Queue,
                            Sample = a.Sample == null ? "" : a.Sample,
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
                    int galID = Request.QueryString["galID"].ToInteger();

                    var assignments = entity.Assignments.Where(a => a.MainType == "Files" && a.MainTypeID == ID && a.TargetType == "Gallery" && a.TargetTypeID == galID).ToList();

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

        #region Gallery FilesNoLang

        public JsonResult ListFilesNoLang()
        {
            try
            {
                int galID = Request.QueryString["galID"].ToInteger();

                List<FilesNoLang> list = new List<FilesNoLang>();

                var assignments = entity.Assignments.Where(a => a.MainType == "FilesNoLang" && a.TargetType == "Gallery" && a.TargetTypeID == galID).ToList();

                if (assignments.Count > 0)
                {
                    foreach (var item in assignments)
                    {
                        var Filesnolang = entity.FilesNoLang.Where(a => a.ID == item.MainTypeID).ToList();

                        if (Filesnolang.Count > 0)
                        {
                            foreach (FilesNoLang file in Filesnolang)
                            {
                                list.Add(file);
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
                    int galID = Request.QueryString["galID"].ToInteger();

                    var assignments = entity.Assignments.Where(a => a.MainType == "FilesNoLang" && a.MainTypeID == ID && a.TargetType == "Gallery" && a.TargetTypeID == galID).ToList();

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

        //#region Gallery Rank

        //public JsonResult ListRank()
        //{
        //    try
        //    {
        //        int galID = Request.QueryString["galID"].ToInteger();

        //        List<Rank> contList = new List<Rank>();

        //        ResultBox rb = TDHelper<Assignments>.Select(new List<Where> { new Where(AssignmentsColumns.MainType, "Rank"), new Where(AssignmentsColumns.TargetType, "Gallery"), new Where(AssignmentsColumns.TargetTypeID, galID) });

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

        //        int galID = Request.QueryString["galID"].ToInteger();

        //        result = TDHelper<Assignments>.Delete(new List<Where> { new Where(AssignmentsColumns.MainType, "Rank"), new Where(AssignmentsColumns.MainTypeID, ID), new Where(AssignmentsColumns.TargetType, "Gallery"), new Where(AssignmentsColumns.TargetTypeID, galID) }).Result;

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

        #region Gallery URLink

        public JsonResult ListURLink()
        {
            try
            {
                int galID = Request.QueryString["galID"].ToInteger();

                var assignments = entity.Assignments.Where(a => a.MainType == "URLink" && a.TargetType == "Gallery" && a.TargetTypeID == galID).ToList();

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
                                             Sample = b.URL == null ? "" : b.URL,
                                         }).Take(1).ToList());

                        list = listTemp.Select(a => new URLink
                        {
                            ID = a.ID == null ? 0 : a.ID,
                            URLinkName = a.URLinkName == null ? "" : a.URLinkName,
                            Code = a.Code == null ? "" : a.Code,
                            Target = a.Target == null ? "" : a.Target,
                            Active = a.Active == null ? false : a.Active,
                            Queue = a.Queue == null ? 0 : a.Queue,
                            Sample = a.Sample == null ? "" : a.Sample,
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
                    int galID = Request.QueryString["galID"].ToInteger();

                    var assignments = entity.Assignments.Where(a => a.MainType == "URLink" && a.MainTypeID == ID && a.TargetType == "Gallery" && a.TargetTypeID == galID).ToList();

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

        #region Gallery URLinkNoLang

        public JsonResult ListURLinkNoLang()
        {
            try
            {
                int galID = Request.QueryString["galID"].ToInteger();

                List<URLinkNoLang> list = new List<URLinkNoLang>();

                var assignments = entity.Assignments.Where(a => a.MainType == "URLinkNoLang" && a.TargetType == "Gallery" && a.TargetTypeID == galID).ToList();

                if (assignments.Count > 0)
                {
                    foreach (var item in assignments)
                    {
                        var URLinknolang = entity.URLinkNoLang.Where(a => a.ID == item.MainTypeID).ToList();

                        if (URLinknolang.Count > 0)
                        {
                            foreach (URLinkNoLang file in URLinknolang)
                            {
                                list.Add(file);
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
                    int galID = Request.QueryString["galID"].ToInteger();

                    var assignments = entity.Assignments.Where(a => a.MainType == "URLinkNoLang" && a.MainTypeID == ID && a.TargetType == "Gallery" && a.TargetTypeID == galID).ToList();

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
