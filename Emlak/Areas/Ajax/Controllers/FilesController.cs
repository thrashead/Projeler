using System;
using System.Linq;
using System.Web.Mvc;
using System.Data;
using TDLibrary;
using Lib;
using System.Collections.Generic;

namespace Emlak.Areas.Ajax.Controllers
{
    public class FilesController : Controller
    {
        EmlakSiteEntities entity = new EmlakSiteEntities();

        #region Files

        public JsonResult List(string fileName = null, string active = null, int jtStartIndex = 0, int jtPageSize = 0, string jtSorting = null)
        {
            try
            {
                var list = entity.Files.ToList();

                if (!fileName.IsNull())
                    list = list.Where(a => a.FileName.Contains(fileName)).ToList();

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


                return Json(new { Result = "OK", Records = list.JsonConverter<List<Files>>(), TotalRecordCount = _recordCount });
            }
            catch (Exception ex)
            {
                return Json(new { Result = "ERROR", Message = ex.Message });
            }
        }

        public JsonResult Insert(Files record)
        {
            try
            {
                if (record.FileName.IsNull())
                {
                    return Json(new { Result = "ERROR", Message = "Dosya Adı Boş Olamaz." });
                }

                entity.Files.Add(record);

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

        public JsonResult Update(Files record)
        {
            try
            {
                if (record.FileName.IsNull())
                {
                    return Json(new { Result = "ERROR", Message = "Dosya Adı Boş Olamaz." });
                }

                var files = entity.Files.Find(record.ID);

                files.Active = record.Active;
                files.FileName = record.FileName;
                files.Code = record.Code;
                files.Queue = record.Queue;

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

        public JsonResult Delete(int? ID)
        {
            try
            {
                if (ID != null)
                {
                    bool result = true;

                    var assignments = entity.Assignments.Where(a => a.MainTypeID == ID && a.MainType == "Files").ToList();

                    entity.Assignments.RemoveRange(assignments);

                    result = entity.SaveChanges() >= 0 ? true : false;

                    if (result == true)
                    {
                        assignments = entity.Assignments.Where(a => a.TargetTypeID == ID && a.TargetType == "Files").ToList();

                        entity.Assignments.RemoveRange(assignments);

                        result = entity.SaveChanges() >= 0 ? true : false;
                    }
                    else
                        return Json(new { Result = "ERROR", Message = result });

                    if (result == true)
                    {
                        var fileslang = entity.FilesLang.Where(a => a.FileID == ID).ToList();

                        entity.FilesLang.RemoveRange(fileslang);

                        result = entity.SaveChanges() >= 0 ? true : false;

                        if (result == true)
                        {
                            foreach (var item in fileslang)
                            {
                                System.IO.File.Delete(Server.MapPath("~/Uploads/File/" + item.FileName));
                            }
                        }
                    }
                    else
                        return Json(new { Result = "ERROR", Message = result });

                    if (result == true)
                    {
                        var file = entity.Files.Where(a => a.ID == ID).FirstOrDefault();

                        entity.Files.Remove(file);

                        result = entity.SaveChanges() >= 0 ? true : false;
                    }
                    else
                        return Json(new { Result = "ERROR", Message = result });

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

        #region Files Language

        public JsonResult ListLang()
        {
            try
            {
                int fileID = Request.QueryString["fileID"].ToInteger();

                var list = entity.FilesLang.Where(a => a.FileID == fileID).ToList();

                return Json(new { Result = "OK", Records = list.JsonConverter<List<FilesLang>>(), TotalRecordCount = list.Count });
            }
            catch (Exception ex)
            {
                return Json(new { Result = "ERROR", Message = ex.Message });
            }
        }

        public JsonResult InsertLang(FilesLang record)
        {
            try
            {
                if (record.FileName.IsNull())
                {
                    return Json(new { Result = "ERROR", Message = "Dosya Adı Boş Olamaz." });
                }

                int fileID = Request.QueryString["fileID"].ToInteger();
                record.FileID = fileID;

                var fileslang = entity.FilesLang.Where(a => a.FileID == fileID && a.Language == record.Language).ToList();

                if (fileslang.Count > 0)
                {
                    return Json(new { Result = "ERROR", Message = "Bu dilde zaten kayıt eklenmiş." });
                }

                entity.FilesLang.Add(record);

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

        public JsonResult UpdateLang(FilesLang record)
        {
            try
            {
                if (record.FileName.IsNull())
                {
                    return Json(new { Result = "ERROR", Message = "Dosya Adı Boş Olamaz." });
                }

                int fileID = Request.QueryString["fileID"].ToInteger();
                record.FileID = fileID;

                var fileslang = entity.FilesLang.Where(a => a.FileID == fileID && a.Language == record.Language && a.ID == record.ID).FirstOrDefault();

                if (fileslang != null)
                {
                    return Json(new { Result = "ERROR", Message = "Bu dilde zaten kayıt eklenmiş." });
                }

                fileslang.ShortText = record.ShortText;
                fileslang.Language = record.Language;
                fileslang.Description = record.Description;
                fileslang.FileName = record.FileName;

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
                    var fileslang = entity.FilesLang.Where(a => a.ID == ID).FirstOrDefault();

                    entity.FilesLang.Remove(fileslang);

                    bool result = entity.SaveChanges() >= 0 ? true : false;

                    if (result == true)
                    {
                        System.IO.File.Delete(Server.MapPath("~/Uploads/File/" + fileslang.FileName));

                        return Json(new { Result = "OK" });

                    }
                    else
                    {
                        return Json(new { Result = "ERROR", Message = "Silinemedi" });
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

        #region Files Content

        public JsonResult ListContent()
        {
            try
            {
                int fileID = Request.QueryString["fileID"].ToInteger();

                var assignments = entity.Assignments.Where(a => a.MainType == "Content" && a.TargetType == "Files" && a.TargetTypeID == fileID).ToList();

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
                    int fileID = Request.QueryString["fileID"].ToInteger();

                    var assignments = entity.Assignments.Where(a => a.MainType == "Content" && a.MainTypeID == ID && a.TargetType == "Files" && a.TargetTypeID == fileID).ToList();

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

        #region Files Gallery

        public JsonResult ListGallery()
        {
            try
            {
                int fileID = Request.QueryString["fileID"].ToInteger();

                var assignments = entity.Assignments.Where(a => a.MainType == "Gallery" && a.TargetType == "Files" && a.TargetTypeID == fileID).ToList();

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
                    int fileID = Request.QueryString["fileID"].ToInteger();

                    var assignments = entity.Assignments.Where(a => a.MainType == "Gallery" && a.MainTypeID == ID && a.TargetType == "Files" && a.TargetTypeID == fileID).ToList();

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

        #region Files Pictures

        public JsonResult ListPictures()
        {
            try
            {
                int fileID = Request.QueryString["fileID"].ToInteger();

                var assignments = entity.Assignments.Where(a => a.MainType == "Pictures" && a.TargetType == "Files" && a.TargetTypeID == fileID).ToList();

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
                    int fileID = Request.QueryString["fileID"].ToInteger();

                    var assignments = entity.Assignments.Where(a => a.MainType == "Pictures" && a.MainTypeID == ID && a.TargetType == "Files" && a.TargetTypeID == fileID).ToList();

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

        #region Files PicturesNoLang

        public JsonResult ListPicturesNoLang()
        {
            try
            {
                int fileID = Request.QueryString["fileID"].ToInteger();

                List<PicturesNoLang> list = new List<PicturesNoLang>();

                var assignments = entity.Assignments.Where(a => a.MainType == "PicturesNoLang" && a.TargetType == "Files" && a.TargetTypeID == fileID).ToList();

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
                    int fileID = Request.QueryString["fileID"].ToInteger();

                    var assignments = entity.Assignments.Where(a => a.MainType == "PicturesNoLang" && a.MainTypeID == ID && a.TargetType == "Files" && a.TargetTypeID == fileID).ToList();

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

        #region Files FilesNoLang

        public JsonResult ListFilesNoLang()
        {
            try
            {
                int fileID = Request.QueryString["fileID"].ToInteger();

                List<FilesNoLang> list = new List<FilesNoLang>();

                var assignments = entity.Assignments.Where(a => a.MainType == "FilesNoLang" && a.TargetType == "Files" && a.TargetTypeID == fileID).ToList();

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
                    int fileID = Request.QueryString["fileID"].ToInteger();

                    var assignments = entity.Assignments.Where(a => a.MainType == "FilesNoLang" && a.MainTypeID == ID && a.TargetType == "Files" && a.TargetTypeID == fileID).ToList();

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

        //#region Files Rank

        //public JsonResult ListRank()
        //{
        //    try
        //    {
        //        int fileID = Request.QueryString["fileID"].ToInteger();

        //        List<Rank> contList = new List<Rank>();

        //        ResultBox rb = TDHelper<Assignments>.Select(new List<Where> { new Where(AssignmentsColumns.MainType, "Rank"), new Where(AssignmentsColumns.TargetType, "Files"), new Where(AssignmentsColumns.TargetTypeID, fileID) });

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

        //        int fileID = Request.QueryString["fileID"].ToInteger();

        //        result = TDHelper<Assignments>.Delete(new List<Where> { new Where(AssignmentsColumns.MainType, "Rank"), new Where(AssignmentsColumns.MainTypeID, ID), new Where(AssignmentsColumns.TargetType, "Files"), new Where(AssignmentsColumns.TargetTypeID, fileID) }).Result;

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

        #region Files URLink

        public JsonResult ListURLink()
        {
            try
            {
                int fileID = Request.QueryString["fileID"].ToInteger();

                var assignments = entity.Assignments.Where(a => a.MainType == "URLink" && a.TargetType == "Files" && a.TargetTypeID == fileID).ToList();

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
                    int fileID = Request.QueryString["fileID"].ToInteger();

                    var assignments = entity.Assignments.Where(a => a.MainType == "URLink" && a.MainTypeID == ID && a.TargetType == "Files" && a.TargetTypeID == fileID).ToList();

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

        #region Files URLinkNoLang

        public JsonResult ListURLinkNoLang()
        {
            try
            {
                int fileID = Request.QueryString["fileID"].ToInteger();

                List<URLinkNoLang> list = new List<URLinkNoLang>();

                var assignments = entity.Assignments.Where(a => a.MainType == "URLinkNoLang" && a.TargetType == "Files" && a.TargetTypeID == fileID).ToList();

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
                    int fileID = Request.QueryString["fileID"].ToInteger();

                    var assignments = entity.Assignments.Where(a => a.MainType == "URLinkNoLang" && a.MainTypeID == ID && a.TargetType == "Files" && a.TargetTypeID == fileID).ToList();

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
