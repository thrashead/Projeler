using System;
using System.Linq;
using System.Web.Mvc;
using System.Data;
using TDLibrary;
using Lib;
using System.Collections.Generic;

namespace Emlak.Areas.Ajax.Controllers
{
    public class CategoryController : Controller
    {
        EmlakSiteEntities entity = new EmlakSiteEntities();

        #region Category

        public JsonResult List(string categoryName = null, string active = null, int jtStartIndex = 0, int jtPageSize = 0, string jtSorting = null)
        {
            try
            {
                var list = entity.Category.ToList();

                if (!categoryName.IsNull())
                    list = list.Where(a => a.CategoryName.Contains(categoryName)).ToList();

                active = active == null ? "" : active;

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

                return Json(new { Result = "OK", Records = list.JsonConverter<List<Category>>(), TotalRecordCount = _recordCount }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return Json(new { Result = "ERROR", Message = ex.Message }, JsonRequestBehavior.AllowGet);
            }
        }

        public JsonResult Insert(Category record)
        {
            try
            {
                if (record.CategoryName.IsNull())
                {
                    return Json(new { Result = "ERROR", Message = "Kategori Adı Boş Olamaz." });
                }

                record.RouteUrl = record.CategoryName.ToHyperLinkText();

                entity.Category.Add(record);

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

        public JsonResult Update(Category record)
        {
            try
            {
                if (record.CategoryName.IsNull())
                {
                    return Json(new { Result = "ERROR", Message = "Kategori Adı Boş Olamaz." });
                }

                record.RouteUrl = record.CategoryName.ToHyperLinkText();

                var category = entity.Category.Find(record.ID);

                category.Active = record.Active;
                category.CategoryName = record.CategoryName;
                category.Code = record.Code;
                category.Display = record.Display;
                category.ParentID = record.ParentID;
                category.RouteUrl = record.RouteUrl;
                category.Queue = record.Queue;

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

                    var assignments = entity.Assignments.Where(a => a.MainTypeID == ID && a.MainType == "Category").ToList();

                    entity.Assignments.RemoveRange(assignments);

                    result = entity.SaveChanges() >= 0 ? true : false;

                    if (result == true)
                    {
                        assignments = entity.Assignments.Where(a => a.TargetTypeID == ID && a.TargetType == "Category").ToList();

                        entity.Assignments.RemoveRange(assignments);

                        result = entity.SaveChanges() >= 0 ? true : false;
                    }
                    else
                        return Json(new { Result = "ERROR", Message = result });

                    if (result == true)
                    {
                        var categorylang = entity.CategoryLang.Where(a => a.CategoryID == ID).ToList();

                        entity.CategoryLang.RemoveRange(categorylang);

                        result = entity.SaveChanges() >= 0 ? true : false;
                    }
                    else
                        return Json(new { Result = "ERROR", Message = result });

                    if (result == true)
                    {
                        var category = entity.Category.Where(a => a.ID == ID).FirstOrDefault();

                        entity.Category.Remove(category);

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

        #region Category Language

        public JsonResult ListLang()
        {
            try
            {
                int catID = Request.QueryString["catID"].ToInteger();

                var list = entity.CategoryLang.Where(a => a.CategoryID == catID).ToList();

                return Json(new { Result = "OK", Records = list.JsonConverter<List<CategoryLang>>(), TotalRecordCount = list.Count }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return Json(new { Result = "ERROR", Message = ex.Message });
            }
        }

        public JsonResult InsertLang(CategoryLang record)
        {
            try
            {
                if (record.CategoryName.IsNull())
                {
                    return Json(new { Result = "ERROR", Message = "Kategori Adı Boş Olamaz." });
                }

                int catID = Request.QueryString["catID"].ToInteger();
                record.CategoryID = catID;

                var categorylang = entity.CategoryLang.Where(a => a.CategoryID == catID && a.Language == record.Language).ToList();

                if (categorylang.Count > 0)
                {
                    return Json(new { Result = "ERROR", Message = "Bu dilde zaten kayıt eklenmiş." });
                }

                entity.CategoryLang.Add(record);

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

        public JsonResult UpdateLang(CategoryLang record)
        {
            try
            {
                if (record.CategoryName.IsNull())
                {
                    return Json(new { Result = "ERROR", Message = "Kategori Adı Boş Olamaz." });
                }

                int catID = Request.QueryString["catID"].ToInteger();
                record.CategoryID = catID;

                var categorylang = entity.CategoryLang.Where(a => a.CategoryID == catID && a.Language == record.Language && a.ID == record.ID).FirstOrDefault();

                if (categorylang != null)
                {
                    return Json(new { Result = "ERROR", Message = "Bu dilde zaten kayıt eklenmiş." });
                }

                categorylang.ShortText = record.ShortText;
                categorylang.Language = record.Language;
                categorylang.Description = record.Description;
                categorylang.CategoryName = record.CategoryName;

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
                    var categorylang = entity.CategoryLang.Where(a => a.ID == ID).FirstOrDefault();

                    entity.CategoryLang.Remove(categorylang);

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

        #region Category Content

        public JsonResult ListContent()
        {
            try
            {
                int catID = Request.QueryString["catID"].ToInteger();

                var assignments = entity.Assignments.Where(a => a.MainType == "Content" && a.TargetType == "Category" && a.TargetTypeID == catID).ToList();

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
                                             Sample = b.ContentName == null ? "" : b.ContentName
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

                return Json(new { Result = "OK", Records = list.JsonConverter<List<Content>>(), TotalRecordCount = list.Count }, JsonRequestBehavior.AllowGet);
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
                    int catID = Request.QueryString["catID"].ToInteger();

                    var assignments = entity.Assignments.Where(a => a.MainType == "Content" && a.MainTypeID == ID && a.TargetType == "Category" && a.TargetTypeID == catID).ToList();

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

        #region Category Gallery

        public JsonResult ListGallery()
        {
            try
            {
                int catID = Request.QueryString["catID"].ToInteger();

                var assignments = entity.Assignments.Where(a => a.MainType == "Gallery" && a.TargetType == "Category" && a.TargetTypeID == catID).ToList();

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

                return Json(new { Result = "OK", Records = list.JsonConverter<List<Gallery>>(), TotalRecordCount = list.Count }, JsonRequestBehavior.AllowGet);
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
                    int catID = Request.QueryString["catID"].ToInteger();

                    var assignments = entity.Assignments.Where(a => a.MainType == "Gallery" && a.MainTypeID == ID && a.TargetType == "Category" && a.TargetTypeID == catID).ToList();

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

        #region Category Pictures

        public JsonResult ListPictures()
        {
            try
            {
                int catID = Request.QueryString["catID"].ToInteger();

                var assignments = entity.Assignments.Where(a => a.MainType == "Pictures" && a.TargetType == "Category" && a.TargetTypeID == catID).ToList();

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

                return Json(new { Result = "OK", Records = list.JsonConverter<List<Pictures>>(), TotalRecordCount = list.Count }, JsonRequestBehavior.AllowGet);
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
                    int catID = Request.QueryString["catID"].ToInteger();

                    var assignments = entity.Assignments.Where(a => a.MainType == "Pictures" && a.MainTypeID == ID && a.TargetType == "Category" && a.TargetTypeID == catID).ToList();

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

        #region Category PicturesNoLang

        public JsonResult ListPicturesNoLang()
        {
            try
            {
                int catID = Request.QueryString["catID"].ToInteger();

                var assignments = entity.Assignments.Where(a => a.MainType == "PicturesNoLang" && a.TargetType == "Category" && a.TargetTypeID == catID).ToList();

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

                return Json(new { Result = "OK", Records = list.JsonConverter<List<PicturesNoLang>>(), TotalRecordCount = list.Count }, JsonRequestBehavior.AllowGet);
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
                    int catID = Request.QueryString["catID"].ToInteger();

                    var assignments = entity.Assignments.Where(a => a.MainType == "PicturesNoLang" && a.MainTypeID == ID && a.TargetType == "Category" && a.TargetTypeID == catID).ToList();

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

        #region Category Files

        public JsonResult ListFiles()
        {
            try
            {
                int catID = Request.QueryString["catID"].ToInteger();

                var assignments = entity.Assignments.Where(a => a.MainType == "Files" && a.TargetType == "Category" && a.TargetTypeID == catID).ToList();

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

                return Json(new { Result = "OK", Records = list.JsonConverter<List<Files>>(), TotalRecordCount = list.Count }, JsonRequestBehavior.AllowGet);
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
                    int catID = Request.QueryString["catID"].ToInteger();

                    var assignments = entity.Assignments.Where(a => a.MainType == "Files" && a.MainTypeID == ID && a.TargetType == "Category" && a.TargetTypeID == catID).ToList();

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

        #region Category FilesNoLang

        public JsonResult ListFilesNoLang()
        {
            try
            {
                int catID = Request.QueryString["catID"].ToInteger();

                var assignments = entity.Assignments.Where(a => a.MainType == "FilesNoLang" && a.TargetType == "Category" && a.TargetTypeID == catID).ToList();

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

                return Json(new { Result = "OK", Records = list.JsonConverter<List<FilesNoLang>>(), TotalRecordCount = list.Count }, JsonRequestBehavior.AllowGet);
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
                    int catID = Request.QueryString["catID"].ToInteger();

                    var assignments = entity.Assignments.Where(a => a.MainType == "FilesNoLang" && a.MainTypeID == ID && a.TargetType == "Category" && a.TargetTypeID == catID).ToList();

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

        //#region Category Rank

        //public JsonResult ListRank()
        //{
        //    try
        //    {
        //        int catID = Request.QueryString["catID"].ToInteger();

        //        List<Rank> contList = new List<Rank>();

        //        ResultBox rb = TDHelper<Assignments>.Select(new List<Where> { new Where(AssignmentsColumns.MainType, "Rank"), new Where(AssignmentsColumns.TargetType, "Category"), new Where(AssignmentsColumns.TargetTypeID, catID) });

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
        //        int catID = Request.QueryString["catID"].ToInteger();

        //        var assignments = entity.Assignments.Where(a => a.MainType == "Rank" && a.MainTypeID == ID && a.TargetType == "Category" && a.TargetTypeID == catID).ToList();

        //        entity.Assignments.RemoveRange(assignments);

        //        bool result = entity.SaveChanges() >= 0 ? true : false;

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

        #region Category URLink

        public JsonResult ListURLink()
        {
            try
            {
                int catID = Request.QueryString["catID"].ToInteger();

                var assignments = entity.Assignments.Where(a => a.MainType == "URLink" && a.TargetType == "Category" && a.TargetTypeID == catID).ToList();

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

                return Json(new { Result = "OK", Records = list.JsonConverter<List<URLink>>(), TotalRecordCount = list.Count }, JsonRequestBehavior.AllowGet);
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
                    int catID = Request.QueryString["catID"].ToInteger();

                    var assignments = entity.Assignments.Where(a => a.MainType == "URLink" && a.MainTypeID == ID && a.TargetType == "Category" && a.TargetTypeID == catID).ToList();

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

        #region Category URLinkNoLang

        public JsonResult ListURLinkNoLang()
        {
            try
            {
                int catID = Request.QueryString["catID"].ToInteger();

                var assignments = entity.Assignments.Where(a => a.MainType == "URLinkNoLang" && a.TargetType == "Category" && a.TargetTypeID == catID).ToList();

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

                return Json(new { Result = "OK", Records = list.JsonConverter<List<URLinkNoLang>>(), TotalRecordCount = list.Count }, JsonRequestBehavior.AllowGet);
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
                    int catID = Request.QueryString["catID"].ToInteger();

                    var assignments = entity.Assignments.Where(a => a.MainType == "URLinkNoLang" && a.MainTypeID == ID && a.TargetType == "Category" && a.TargetTypeID == catID).ToList();

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

        #region Category RealEstateAds

        public JsonResult ListRealEstateAds()
        {
            try
            {
                var list = new List<RealEstateAds>();

                int catID = Request.QueryString["catID"].ToInteger();

                var assignments = entity.Assignments.Where(a => a.MainType == "RealEstateAds" && a.TargetType == "Category" && a.TargetTypeID == catID).ToList();

                if (assignments.Count > 0)
                {
                    foreach (var item in assignments)
                    {
                        var listTemp = ((from a in entity.RealEstateAds
                                         join b in entity.RealEstateAdsLang on a.ID equals b.EmlakID
                                         where a.ID == item.MainTypeID
                                         select new
                                         {
                                             ID = a.ID == null ? 0 : a.ID,
                                             Baslik = a.Baslik == null ? "" : a.Baslik,
                                             Code = a.Code == null ? "" : a.Code,
                                             Active = a.Active == null ? false : a.Active,
                                             Queue = a.Queue == null ? 0 : a.Queue,
                                             KatID = a.KatID != null ? a.KatID : 0,
                                             AltKatID = a.AltKatID != null ? a.AltKatID : 0,
                                             Fiyat = a.Fiyat != null ? a.Fiyat : 0,
                                             Yeni = a.Yeni != null ? a.Yeni : false,
                                             GununEmlagi = a.GununEmlagi != null ? a.GununEmlagi : false,
                                             Sehir = a.Sehir != null ? a.Sehir : "",
                                             Ilce = a.Ilce != null ? a.Ilce : "",
                                             Semt = a.Semt != null ? a.Semt : "",
                                             Sahibi = a.Sahibi != null ? a.Sahibi : "",
                                             OdaSayisi = a.OdaSayisi != null ? a.OdaSayisi : 0,
                                             KatSayisi = a.KatSayisi != null ? a.KatSayisi : 0,
                                             IsinmaTipi = a.IsinmaTipi != null ? a.IsinmaTipi : "",
                                             SalonSayisi = a.SalonSayisi != null ? a.SalonSayisi : 0,
                                             BulunduguKat = a.BulunduguKat != null ? a.BulunduguKat : 0,
                                             YakitTipi = a.YakitTipi != null ? a.YakitTipi : "",
                                             Alan = a.Alan != null ? a.Alan : 0,
                                             Durum = a.Durum != null ? a.Durum : "",
                                             BinaYasi = a.BinaYasi != null ? a.BinaYasi : 0,
                                             ArkaCephe = a.ArkaCephe != null ? a.ArkaCephe : false,
                                             OnCephe = a.OnCephe != null ? a.OnCephe : false,
                                             CaddeyeYakin = a.CaddeyeYakin != null ? a.CaddeyeYakin : false,
                                             DenizeSifir = a.DenizeSifir != null ? a.DenizeSifir : false,
                                             DenizeYakin = a.DenizeYakin != null ? a.DenizeYakin : false,
                                             Manzara = a.Manzara != null ? a.Manzara : false,
                                             Merkezde = a.Merkezde != null ? a.Merkezde : false,
                                             Metro = a.Metro != null ? a.Metro : false,
                                             Otoban = a.Otoban != null ? a.Otoban : false,
                                             TopluUlasim = a.TopluUlasim != null ? a.TopluUlasim : false,
                                             Asansor = a.Asansor != null ? a.Asansor : false,
                                             Bahce = a.Bahce != null ? a.Bahce : false,
                                             Guvenlik = a.Guvenlik != null ? a.Guvenlik : false,
                                             Hidrofor = a.Hidrofor != null ? a.Hidrofor : false,
                                             Mantolama = a.Mantolama != null ? a.Mantolama : false,
                                             Jenerator = a.Jenerator != null ? a.Jenerator : false,
                                             Kapici = a.Kapici != null ? a.Kapici : false,
                                             Satilik = a.Satilik != null ? a.Satilik : false,
                                             Otopark = a.Otopark != null ? a.Otopark : false,
                                             OyunParki = a.OyunParki != null ? a.OyunParki : false,
                                             PVCDograma = a.PVCDograma != null ? a.PVCDograma : false,
                                             SiteIci = a.SiteIci != null ? a.SiteIci : false,
                                             YanginMerdiveni = a.YanginMerdiveni != null ? a.YanginMerdiveni : false,
                                             YuzmeHavuzu = a.YuzmeHavuzu != null ? a.YuzmeHavuzu : false,
                                             Alarm = a.Alarm != null ? a.Alarm : false,
                                             Balkon = a.Balkon != null ? a.Balkon : false,
                                             CelikKapi = a.CelikKapi != null ? a.CelikKapi : false,
                                             GoruntuluDiafon = a.GoruntuluDiafon != null ? a.GoruntuluDiafon : false,
                                             Jakuzi = a.Jakuzi != null ? a.Jakuzi : false,
                                             KabloTVUydu = a.KabloTVUydu != null ? a.KabloTVUydu : false,
                                             Klima = a.Klima != null ? a.Klima : false,
                                             Enlem = a.Enlem != null ? a.Enlem : "",
                                             Boylam = a.Boylam != null ? a.Boylam : "",

                                             Sample = b.Baslik == null ? "" : b.Baslik
                                         }).Take(1).ToList());

                        list = listTemp.Select(a => new RealEstateAds
                        {
                            ID = a.ID == null ? 0 : a.ID,
                            Baslik = a.Baslik == null ? "" : a.Baslik,
                            Code = a.Code == null ? "" : a.Code,
                            Active = a.Active == null ? false : a.Active,
                            Queue = a.Queue == null ? 0 : a.Queue,
                            KatID = a.KatID != null ? a.KatID : 0,
                            AltKatID = a.AltKatID != null ? a.AltKatID : 0,
                            Fiyat = a.Fiyat != null ? a.Fiyat : 0,
                            Yeni = a.Yeni != null ? a.Yeni : false,
                            GununEmlagi = a.GununEmlagi != null ? a.GununEmlagi : false,
                            Sehir = a.Sehir != null ? a.Sehir : "",
                            Ilce = a.Ilce != null ? a.Ilce : "",
                            Semt = a.Semt != null ? a.Semt : "",
                            Sahibi = a.Sahibi != null ? a.Sahibi : "",
                            OdaSayisi = a.OdaSayisi != null ? a.OdaSayisi : 0,
                            KatSayisi = a.KatSayisi != null ? a.KatSayisi : 0,
                            IsinmaTipi = a.IsinmaTipi != null ? a.IsinmaTipi : "",
                            SalonSayisi = a.SalonSayisi != null ? a.SalonSayisi : 0,
                            BulunduguKat = a.BulunduguKat != null ? a.BulunduguKat : 0,
                            YakitTipi = a.YakitTipi != null ? a.YakitTipi : "",
                            Alan = a.Alan != null ? a.Alan : 0,
                            Durum = a.Durum != null ? a.Durum : "",
                            BinaYasi = a.BinaYasi != null ? a.BinaYasi : 0,
                            ArkaCephe = a.ArkaCephe != null ? a.ArkaCephe : false,
                            OnCephe = a.OnCephe != null ? a.OnCephe : false,
                            CaddeyeYakin = a.CaddeyeYakin != null ? a.CaddeyeYakin : false,
                            DenizeSifir = a.DenizeSifir != null ? a.DenizeSifir : false,
                            DenizeYakin = a.DenizeYakin != null ? a.DenizeYakin : false,
                            Manzara = a.Manzara != null ? a.Manzara : false,
                            Merkezde = a.Merkezde != null ? a.Merkezde : false,
                            Metro = a.Metro != null ? a.Metro : false,
                            Otoban = a.Otoban != null ? a.Otoban : false,
                            TopluUlasim = a.TopluUlasim != null ? a.TopluUlasim : false,
                            Asansor = a.Asansor != null ? a.Asansor : false,
                            Bahce = a.Bahce != null ? a.Bahce : false,
                            Guvenlik = a.Guvenlik != null ? a.Guvenlik : false,
                            Hidrofor = a.Hidrofor != null ? a.Hidrofor : false,
                            Mantolama = a.Mantolama != null ? a.Mantolama : false,
                            Jenerator = a.Jenerator != null ? a.Jenerator : false,
                            Kapici = a.Kapici != null ? a.Kapici : false,
                            Satilik = a.Satilik != null ? a.Satilik : false,
                            Otopark = a.Otopark != null ? a.Otopark : false,
                            OyunParki = a.OyunParki != null ? a.OyunParki : false,
                            PVCDograma = a.PVCDograma != null ? a.PVCDograma : false,
                            SiteIci = a.SiteIci != null ? a.SiteIci : false,
                            YanginMerdiveni = a.YanginMerdiveni != null ? a.YanginMerdiveni : false,
                            YuzmeHavuzu = a.YuzmeHavuzu != null ? a.YuzmeHavuzu : false,
                            Alarm = a.Alarm != null ? a.Alarm : false,
                            Balkon = a.Balkon != null ? a.Balkon : false,
                            CelikKapi = a.CelikKapi != null ? a.CelikKapi : false,
                            GoruntuluDiafon = a.GoruntuluDiafon != null ? a.GoruntuluDiafon : false,
                            Jakuzi = a.Jakuzi != null ? a.Jakuzi : false,
                            KabloTVUydu = a.KabloTVUydu != null ? a.KabloTVUydu : false,
                            Klima = a.Klima != null ? a.Klima : false,
                            Enlem = a.Enlem != null ? a.Enlem : "",
                            Boylam = a.Boylam != null ? a.Boylam : "",

                            Sample = a.Sample == null ? "" : a.Sample
                        }).ToList();
                    }
                }

                return Json(new { Result = "OK", Records = list.JsonConverter<List<RealEstateAds>>(), TotalRecordCount = list.Count }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return Json(new { Result = "ERROR", Message = ex.Message });
            }
        }

        public JsonResult DeleteRealEstateAds(int? ID)
        {
            try
            {
                if (ID != null)
                {
                    int catID = Request.QueryString["catID"].ToInteger();

                    var assignments = entity.Assignments.Where(a => a.MainType == "RealEstateAds" && a.MainTypeID == ID && a.TargetType == "Category" && a.TargetTypeID == catID).ToList();

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
