using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Mvc;
using System.Data;
using TDLibrary;
using Lib;
using System.Collections.Generic;

namespace Emlak.Areas.Ajax.Controllers
{
    public class PicturesController : Controller
    {
        EmlakSiteEntities entity = new EmlakSiteEntities();

        #region Pictures

        public JsonResult List(string pictureName = null, string active = null, int jtStartIndex = 0, int jtPageSize = 0, string jtSorting = null)
        {
            try
            {
                var list = entity.Pictures.ToList();

                if (!pictureName.IsNull())
                    list = list.Where(a => a.PictureName.Contains(pictureName)).ToList();

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


                return Json(new { Result = "OK", Records = list.JsonConverter<List<Pictures>>(), TotalRecordCount = _recordCount });
            }
            catch (Exception ex)
            {
                return Json(new { Result = "ERROR", Message = ex.Message });
            }
        }

        public JsonResult Insert(Pictures record)
        {
            try
            {
                if (record.PictureName.IsNull())
                {
                    return Json(new { Result = "ERROR", Message = "Resim Adı Boş Olamaz." });
                }

                entity.Pictures.Add(record);

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

        public JsonResult Update(Pictures record)
        {
            try
            {
                if (record.PictureName.IsNull())
                {
                    return Json(new { Result = "ERROR", Message = "Resim Adı Boş Olamaz." });
                }

                var pictures = entity.Pictures.Find(record.ID);

                pictures.Active = record.Active;
                pictures.PictureName = record.PictureName;
                pictures.Code = record.Code;
                pictures.Queue = record.Queue;

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

                    var assignments = entity.Assignments.Where(a => a.MainTypeID == ID && a.MainType == "Pictures").ToList();

                    entity.Assignments.RemoveRange(assignments);

                    result = entity.SaveChanges() >= 0 ? true : false;

                    if (result == true)
                    {
                        assignments = entity.Assignments.Where(a => a.TargetTypeID == ID && a.TargetType == "Pictures").ToList();

                        entity.Assignments.RemoveRange(assignments);

                        result = entity.SaveChanges() >= 0 ? true : false;
                    }
                    else
                        return Json(new { Result = "ERROR", Message = result });

                    if (result == true)
                    {
                        var pictureslang = entity.PicturesLang.Where(a => a.PictureID == ID).ToList();

                        if (pictureslang.Count > 0)
                        {
                            foreach (var item in pictureslang)
                            {
                                entity.PicturesLang.Remove(item);

                                result = entity.SaveChanges() >= 0 ? true : false;

                                if (result == true)
                                {
                                    System.IO.File.Delete(Server.MapPath("~/Uploads/Gallery/" + item.PictureName));
                                    System.IO.File.Delete(Server.MapPath("~/Uploads/Gallery/Thumb/" + item.PictureName));
                                }
                            }
                        }
                    }
                    else
                        return Json(new { Result = "ERROR", Message = result });

                    if (result == true)
                    {
                        var content = entity.Pictures.Where(a => a.ID == ID).FirstOrDefault();

                        entity.Pictures.Remove(content);

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

        #region Pictures Language

        public JsonResult ListLang()
        {
            try
            {
                int picID = Request.QueryString["picID"].ToInteger();

                var list = entity.PicturesLang.Where(a => a.PictureID == picID).ToList();

                return Json(new { Result = "OK", Records = list.JsonConverter<List<PicturesLang>>(), TotalRecordCount = list.Count });
            }
            catch (Exception ex)
            {
                return Json(new { Result = "ERROR", Message = ex.Message });
            }
        }

        public JsonResult InsertLang(PicturesLang record)
        {
            try
            {
                if (record.PictureName.IsNull())
                {
                    return Json(new { Result = "ERROR", Message = "Resim Adı Boş Olamaz." });
                }

                int picID = Request.QueryString["picID"].ToInteger();
                record.PictureID = picID;

                var pictureslang = entity.PicturesLang.Where(a => a.PictureID == picID && a.Language == record.Language).ToList();

                if (pictureslang.Count > 0)
                {
                    return Json(new { Result = "ERROR", Message = "Bu dilde zaten kayıt eklenmiş." });
                }

                entity.PicturesLang.Add(record);

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

        public JsonResult UpdateLang(PicturesLang record)
        {
            try
            {
                if (record.PictureName.IsNull())
                {
                    return Json(new { Result = "ERROR", Message = "Resim Adı Boş Olamaz." });
                }

                int picID = Request.QueryString["picID"].ToInteger();
                record.PictureID = picID;

                var pictureslang = entity.PicturesLang.Where(a => a.PictureID == picID && a.Language == record.Language && a.ID == record.ID).FirstOrDefault();

                if (pictureslang != null)
                {
                    return Json(new { Result = "ERROR", Message = "Bu dilde zaten kayıt eklenmiş." });
                }

                pictureslang.ShortText = record.ShortText;
                pictureslang.Language = record.Language;
                pictureslang.Description = record.Description;
                pictureslang.PictureName = record.PictureName;

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
                    var pictureslang = entity.PicturesLang.Where(a => a.ID == ID).FirstOrDefault();

                    if (pictureslang != null)
                    {
                        entity.PicturesLang.Remove(pictureslang);

                        bool result = entity.SaveChanges() >= 0 ? true : false;

                        if (result == true)
                        {
                            System.IO.File.Delete(Server.MapPath("~/Uploads/Gallery/" + pictureslang.PictureName));
                            System.IO.File.Delete(Server.MapPath("~/Uploads/Gallery/Thumb/" + pictureslang.PictureName));

                            return Json(new { Result = "OK" });
                        }
                        else
                            return Json(new { Result = "ERROR", Message = "Silinemedi" });
                    }
                    else
                    {
                        return Json(new { Result = "ERROR", Message = "Böyle bir kayıt yok." });
                    }
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

        #region Pictures Content

        public JsonResult ListContent()
        {
            try
            {
                int picID = Request.QueryString["picID"].ToInteger();

                var list = new List<Content>();

                var assignments = entity.Assignments.Where(a => a.MainType == "Content" && a.TargetType == "Pictures" && a.TargetTypeID == picID).ToList();

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
                    int picID = Request.QueryString["picID"].ToInteger();

                    var assignments = entity.Assignments.Where(a => a.MainType == "Content" && a.MainTypeID == ID && a.TargetType == "Pictures" && a.TargetTypeID == picID).ToList();

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

        #region Pictures Gallery

        public JsonResult ListGallery()
        {
            try
            {
                int picID = Request.QueryString["picID"].ToInteger();

                var assignments = entity.Assignments.Where(a => a.MainType == "Gallery" && a.TargetType == "Pictures" && a.TargetTypeID == picID).ToList();

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
                                             Sample = b.GalleryName == null ? "" : b.GalleryName,
                                         }).Take(1).ToList());

                        list = listTemp.Select(a => new Gallery
                        {
                            ID = a.ID == null ? 0 : a.ID,
                            GalleryName = a.GalleryName == null ? "" : a.GalleryName,
                            Code = a.Code == null ? "" : a.Code,
                            Active = a.Active == null ? false : a.Active,
                            Queue = a.Queue == null ? 0 : a.Queue,
                            RouteUrl = a.RouteUrl == null ? "" : a.RouteUrl,
                            Sample = a.Sample == null ? "" : a.Sample,
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
                    int picID = Request.QueryString["picID"].ToInteger();

                    var assignments = entity.Assignments.Where(a => a.MainType == "Gallery" && a.MainTypeID == ID && a.TargetType == "Pictures" && a.TargetTypeID == picID).ToList();

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

        #region Pictures PicturesNoLang

        public JsonResult ListPicturesNoLang()
        {
            try
            {
                int picID = Request.QueryString["picID"].ToInteger();

                List<PicturesNoLang> list = new List<PicturesNoLang>();

                var assignments = entity.Assignments.Where(a => a.MainType == "PicturesNoLang" && a.TargetType == "Pictures" && a.TargetTypeID == picID).ToList();

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
                    int picID = Request.QueryString["picID"].ToInteger();

                    var assignments = entity.Assignments.Where(a => a.MainType == "PicturesNoLang" && a.MainTypeID == ID && a.TargetType == "Pictures" && a.TargetTypeID == picID).ToList();

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

        #region Pictures Files

        public JsonResult ListFiles()
        {
            try
            {
                int picID = Request.QueryString["picID"].ToInteger();

                var assignments = entity.Assignments.Where(a => a.MainType == "Files" && a.TargetType == "Pictures" && a.TargetTypeID == picID).ToList();

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
                    int picID = Request.QueryString["picID"].ToInteger();

                    var assignments = entity.Assignments.Where(a => a.MainType == "Files" && a.MainTypeID == ID && a.TargetType == "Pictures" && a.TargetTypeID == picID).ToList();

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

        #region Pictures FilesNoLang

        public JsonResult ListFilesNoLang()
        {
            try
            {
                int picID = Request.QueryString["picID"].ToInteger();

                List<FilesNoLang> list = new List<FilesNoLang>();

                var assignments = entity.Assignments.Where(a => a.MainType == "FilesNoLang" && a.TargetType == "Pictures" && a.TargetTypeID == picID).ToList();

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
                    int picID = Request.QueryString["picID"].ToInteger();

                    var assignments = entity.Assignments.Where(a => a.MainType == "FilesNoLang" && a.MainTypeID == ID && a.TargetType == "Pictures" && a.TargetTypeID == picID).ToList();

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

        //#region Pictures Rank

        //public JsonResult ListRank()
        //{
        //    try
        //    {
        //        int picID = Request.QueryString["picID"].ToInteger();

        //        List<Rank> contList = new List<Rank>();

        //        ResultBox rb = TDHelper<Assignments>.Select(new List<Where> { new Where(AssignmentsColumns.MainType, "Rank"), new Where(AssignmentsColumns.TargetType, "Pictures"), new Where(AssignmentsColumns.TargetTypeID, picID) });

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

        //        int picID = Request.QueryString["picID"].ToInteger();

        //        result = TDHelper<Assignments>.Delete(new List<Where> { new Where(AssignmentsColumns.MainType, "Rank"), new Where(AssignmentsColumns.MainTypeID, ID), new Where(AssignmentsColumns.TargetType, "Pictures"), new Where(AssignmentsColumns.TargetTypeID, picID) }).Result;

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

        #region Pictures URLink

        public JsonResult ListURLink()
        {
            try
            {
                int picID = Request.QueryString["picID"].ToInteger();

                var assignments = entity.Assignments.Where(a => a.MainType == "URLink" && a.TargetType == "Pictures" && a.TargetTypeID == picID).ToList();

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
                                             Active = a.Active == null ? false : a.Active,
                                             Target = a.Target == null ? "" : a.Target,
                                             Queue = a.Queue == null ? 0 : a.Queue,
                                             Sample = b.URL == null ? "" : b.URL,
                                         }).Take(1).ToList());

                        list = listTemp.Select(a => new URLink
                        {
                            ID = a.ID == null ? 0 : a.ID,
                            URLinkName = a.URLinkName == null ? "" : a.URLinkName,
                            Code = a.Code == null ? "" : a.Code,
                            Active = a.Active == null ? false : a.Active,
                            Target = a.Target == null ? "" : a.Target,
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
                    int picID = Request.QueryString["picID"].ToInteger();

                    var assignments = entity.Assignments.Where(a => a.MainType == "URLink" && a.MainTypeID == ID && a.TargetType == "Pictures" && a.TargetTypeID == picID).ToList();

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

        #region Pictures URLinkNoLang

        public JsonResult ListURLinkNoLang()
        {
            try
            {
                int picID = Request.QueryString["picID"].ToInteger();

                List<URLinkNoLang> list = new List<URLinkNoLang>();

                var assignments = entity.Assignments.Where(a => a.MainType == "URLinkNoLang" && a.TargetType == "Pictures" && a.TargetTypeID == picID).ToList();

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
                    int picID = Request.QueryString["picID"].ToInteger();

                    var assignments = entity.Assignments.Where(a => a.MainType == "URLinkNoLang" && a.MainTypeID == ID && a.TargetType == "Pictures" && a.TargetTypeID == picID).ToList();

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
