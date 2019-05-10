using System;
using System.Linq;
using System.Web.Mvc;
using System.Data;
using TDLibrary;
using Lib;
using System.Collections.Generic;

namespace Emlak.Areas.Ajax.Controllers
{
    public class RankController : Controller
    {
        EmlakSiteEntities entity = new EmlakSiteEntities();

        #region Rank

        //public JsonResult List(string rankName = null, string active = null, int jtStartIndex = 0, int jtPageSize = 0, string jtSorting = null) //Orijinal
        public JsonResult List(string rankName = null, int jtStartIndex = 0, int jtPageSize = 0, string jtSorting = null)
        {
            try
            {
                var list = entity.Rank.ToList();

                if (!rankName.IsNull())
                    list = list.Where(a => a.RankName.Contains(rankName)).ToList();

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


                return Json(new { Result = "OK", Records = list.JsonConverter<List<Rank>>(), TotalRecordCount = _recordCount });
            }
            catch (Exception ex)
            {
                return Json(new { Result = "ERROR", Message = ex.Message });
            }
        }

        public JsonResult Insert(Rank record)
        {
            try
            {
                if (record.RankName.IsNull())
                {
                    //return Json(new { Result = "ERROR", Message = "Puanlama Adı Boş Olamaz." }); //bura orijinalde
                    return Json(new { Result = "ERROR", Message = "IP Adresi Boş Olamaz." });
                }

                entity.Rank.Add(record);

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

        public JsonResult Update(Rank record)
        {
            try
            {
                if (record.RankName.IsNull())
                {
                    //return Json(new { Result = "ERROR", Message = "Puanlama Adı Boş Olamaz." }); //bura orijinalde
                    return Json(new { Result = "ERROR", Message = "IP Adresi Boş Olamaz." });
                }

                var rank = entity.Rank.Find(record.ID);

                rank.Active = record.Active;
                rank.RankName = record.RankName;
                rank.Code = record.Code;
                rank.MaxRankPoint = record.MaxRankPoint;

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

                    var assignments = entity.Assignments.Where(a => a.MainTypeID == ID && a.MainType == "Rank").ToList();

                    entity.Assignments.RemoveRange(assignments);

                    result = entity.SaveChanges() >= 0 ? true : false;

                    if (result == true)
                    {
                        assignments = entity.Assignments.Where(a => a.TargetTypeID == ID && a.TargetType == "Rank").ToList();

                        entity.Assignments.RemoveRange(assignments);

                        result = entity.SaveChanges() >= 0 ? true : false;
                    }
                    else
                        return Json(new { Result = "ERROR", Message = result });

                    if (result == true)
                    {
                        var rankpoint = entity.RankPoint.Where(a => a.RankID == ID).ToList();

                        entity.RankPoint.RemoveRange(rankpoint);

                        result = entity.SaveChanges() >= 0 ? true : false;
                    }
                    else
                        return Json(new { Result = "ERROR", Message = result });

                    if (result == true)
                    {
                        var rank = entity.Rank.Where(a => a.ID == ID).FirstOrDefault();

                        entity.Rank.Remove(rank);

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

        //public JsonResult ListProductRadio() //Orijinal
        //{
        //    try
        //    {
        //        ResultBox rb = TDHelper<Rank>.Select();
        //        var _contResult = new object[rb.DataCount];

        //        if (rb.HasData)
        //        {
        //            int i = 0;

        //            foreach (Rank item in rb.Data as List<Rank>)
        //            {
        //                var obj = new { DisplayText = item.RankName, Value = item.ID };

        //                _contResult[i] = obj;

        //                i++;
        //            }
        //        }

        //        return Json(new { Result = "OK", Options = _contResult });
        //    }
        //    catch (Exception ex)
        //    {
        //        return Json(new { Result = "ERROR", Message = ex.Message });
        //    }
        //}

        #endregion

        //#region Rank Point

        //public JsonResult ListPoint()
        //{
        //    try
        //    {
        //        int rankID = Request.QueryString["rankID"].ToInteger();

        //        List<RankPoint> catLangList = new List<RankPoint>();

        //        ResultBox rb = TDHelper<RankPoint>.Select(new Where(RankPointColumns.RankID, rankID));

        //        if (rb.HasData)
        //        {
        //            catLangList = rb.Data as List<RankPoint>;
        //        }

        //        return Json(new { Result = "OK", Records = catLangList, TotalRecordCount = catLangList.Count });
        //    }
        //    catch (Exception ex)
        //    {
        //        return Json(new { Result = "ERROR", Message = ex.Message });
        //    }
        //} //Orijinal

        //public JsonResult UpdatePoint(RankPoint record)
        //{
        //    try
        //    {
        //        int rankID = Request.QueryString["rankID"].ToInteger();
        //        record.RankID = rankID;

        //        record.SendDate = DateTime.Now.ToShortDateString();

        //        bool result = TDHelper<RankPoint>.Update(record, new List<RankPointColumns>() { RankPointColumns.Active, RankPointColumns.IPAddress, RankPointColumns.Message, RankPointColumns.RankID, RankPointColumns.RankPointItem, RankPointColumns.SendDate, RankPointColumns.Sender, RankPointColumns.Subject }, new Where(RankPointColumns.ID, record.ID)).Result;

        //        if (result == true)
        //            return Json(new { Result = "OK" });
        //        else
        //            return Json(new { Result = "ERROR", Message = result });
        //    }
        //    catch (Exception ex)
        //    {
        //        return Json(new { Result = "ERROR", Message = ex.Message });
        //    }
        //} //Orijinal

        //public JsonResult DeletePoint(int ID)
        //{
        //    try
        //    {
        //        bool result = TDHelper<RankPoint>.Delete(new Where(RankPointColumns.ID, ID)).Result;

        //        if (result == true)
        //            return Json(new { Result = "OK" });
        //        else
        //            return Json(new { Result = "ERROR", Message = result });
        //    }
        //    catch (Exception ex)
        //    {
        //        return Json(new { Result = "ERROR", Message = ex.Message });
        //    }
        //} //Orijinal

        //#endregion
    }
}
