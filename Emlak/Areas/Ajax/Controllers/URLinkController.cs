using System;
using System.Linq;
using System.Web.Mvc;
using System.Data;
using TDLibrary;
using Lib;
using System.Collections.Generic;

namespace Emlak.Areas.Ajax.Controllers
{
    public class URLinkController : Controller
    {
        EmlakSiteEntities entity = new EmlakSiteEntities();

        #region URLink

        public JsonResult List(string urlinkName = null, string active = null, int jtStartIndex = 0, int jtPageSize = 0, string jtSorting = null)
        {
            try
            {
                var list = entity.URLink.ToList();

                if (!urlinkName.IsNull())
                    list = list.Where(a => a.URLinkName.Contains(urlinkName)).ToList();

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


                return Json(new { Result = "OK", Records = list.JsonConverter<List<URLink>>(), TotalRecordCount = _recordCount });
            }
            catch (Exception ex)
            {
                return Json(new { Result = "ERROR", Message = ex.Message });
            }
        }

        public JsonResult Insert(URLink record)
        {
            try
            {
                if (record.URLinkName.IsNull())
                {
                    return Json(new { Result = "ERROR", Message = "Link Adı Boş Olamaz." });
                }

                entity.URLink.Add(record);

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

        public JsonResult Update(URLink record)
        {
            try
            {
                if (record.URLinkName.IsNull())
                {
                    return Json(new { Result = "ERROR", Message = "Link Adı Boş Olamaz." });
                }

                var urlink = entity.URLink.Find(record.ID);

                urlink.Active = record.Active;
                urlink.URLinkName = record.URLinkName;
                urlink.Code = record.Code;
                urlink.Target = record.Target;
                urlink.Queue = record.Queue;

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

                    var assignments = entity.Assignments.Where(a => a.MainTypeID == ID && a.MainType == "URLink").ToList();

                    entity.Assignments.RemoveRange(assignments);

                    result = entity.SaveChanges() >= 0 ? true : false;

                    if (result == true)
                    {
                        assignments = entity.Assignments.Where(a => a.TargetTypeID == ID && a.TargetType == "URLink").ToList();

                        entity.Assignments.RemoveRange(assignments);

                        result = entity.SaveChanges() >= 0 ? true : false;
                    }
                    else
                        return Json(new { Result = "ERROR", Message = result });

                    if (result == true)
                    {
                        var urlinklang = entity.URLinkLang.Where(a => a.URLinkID == ID).ToList();

                        entity.URLinkLang.RemoveRange(urlinklang);

                        result = entity.SaveChanges() >= 0 ? true : false;
                    }
                    else
                        return Json(new { Result = "ERROR", Message = result });

                    if (result == true)
                    {
                        var urlinklang = entity.URLinkLang.Where(a => a.ID == ID).FirstOrDefault();

                        entity.URLinkLang.Remove(urlinklang);

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

        #region URLink Language

        public JsonResult ListLang()
        {
            try
            {
                int linkID = Request.QueryString["linkID"].ToInteger();

                var list = entity.URLinkLang.Where(a => a.URLinkID == linkID).ToList();

                return Json(new { Result = "OK", Records = list.JsonConverter<List<URLinkLang>>(), TotalRecordCount = list.Count });
            }
            catch (Exception ex)
            {
                return Json(new { Result = "ERROR", Message = ex.Message });
            }
        }

        public JsonResult InsertLang(URLinkLang record)
        {
            try
            {
                if (record.URL.IsNull())
                {
                    return Json(new { Result = "ERROR", Message = "Link Boş Olamaz." });
                }

                int linkID = Request.QueryString["linkID"].ToInteger();
                record.URLinkID = linkID;

                var urlinklang = entity.URLinkLang.Where(a => a.URLinkID == linkID && a.Language == record.Language).ToList();

                if (urlinklang.Count > 0)
                {
                    return Json(new { Result = "ERROR", Message = "Bu dilde zaten kayıt eklenmiş." });
                }

                entity.URLinkLang.Add(record);

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

        public JsonResult UpdateLang(URLinkLang record)
        {
            try
            {
                if (record.URL.IsNull())
                {
                    return Json(new { Result = "ERROR", Message = "Link Boş Olamaz." });
                }

                int linkID = Request.QueryString["linkID"].ToInteger();
                record.URLinkID = linkID;

                var urlinklang = entity.URLinkLang.Where(a => a.URLinkID == linkID && a.Language == record.Language && a.ID == record.ID).FirstOrDefault();

                if (urlinklang != null)
                {
                    return Json(new { Result = "ERROR", Message = "Bu dilde zaten kayıt eklenmiş." });
                }

                urlinklang.AlternateText = record.AlternateText;
                urlinklang.Language = record.Language;
                urlinklang.URL = record.URL;

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
                    var urlinklang = entity.URLinkLang.Where(a => a.ID == ID).FirstOrDefault();

                    entity.URLinkLang.Remove(urlinklang);

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
    }
}
