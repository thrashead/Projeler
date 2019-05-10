using System;
using System.Linq;
using System.Web.Mvc;
using TDLibrary;
using Lib;
using System.Collections.Generic;

namespace Emlak.Areas.Ajax.Controllers
{
    public class LangController : Controller
    {
        EmlakSiteEntities entity = new EmlakSiteEntities();

        #region Lang

        public JsonResult List(string langName = null, int jtStartIndex = 0, int jtPageSize = 0, string jtSorting = null)
        {
            try
            {
                var list = entity.Lang.ToList();

                if (!langName.IsNull())
                    list = list.Where(a => a.LangName.Contains(langName)).ToList();

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


                return Json(new { Result = "OK", Records = list.JsonConverter<List<Lang>>(), TotalRecordCount = _recordCount });
            }
            catch (Exception ex)
            {
                return Json(new { Result = "ERROR", Message = ex.Message });
            }
        }

        public JsonResult Insert(Lang record)
        {
            try
            {
                if (record.LangName.IsNull())
                {
                    return Json(new { Result = "ERROR", Message = "Dil Adı Boş Olamaz." });
                }

                if (record.ShortName.IsNull())
                {
                    return Json(new { Result = "ERROR", Message = "Kısaltma Adı Boş Olamaz." });
                }

                if (record.FlagImage.IsNull())
                {
                    return Json(new { Result = "ERROR", Message = "İkon Boş Olamaz." });
                }

                entity.Lang.Add(record);

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

        public JsonResult Update(Lang record)
        {
            try
            {
                if (record.LangName.IsNull())
                {
                    return Json(new { Result = "ERROR", Message = "Dil Adı Boş Olamaz." });
                }

                if (record.ShortName.IsNull())
                {
                    return Json(new { Result = "ERROR", Message = "Kısaltma Adı Boş Olamaz." });
                }

                if (record.FlagImage.IsNull())
                {
                    return Json(new { Result = "ERROR", Message = "İkon Boş Olamaz." });
                }

                var lang = entity.Lang.Where(a => a.ID == record.ID).FirstOrDefault();

                lang.ShortName = record.ShortName;
                lang.LangName = record.LangName;
                lang.FlagImage = record.FlagImage;

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

                    var lang = entity.Lang.Where(a => a.ID == ID).FirstOrDefault();

                    try
                    {
                        if (lang != null)
                        {
                            System.IO.File.Delete(Server.MapPath("~/Uploads/Gallery/" + lang.FlagImage));
                            System.IO.File.Delete(Server.MapPath("~/Uploads/Gallery/Thumb/" + lang.FlagImage));
                        }
                    }
                    catch
                    {
                        return Json(new { Result = "ERROR", Message = result });
                    }

                    if (result == true)
                    {
                        entity.Lang.Remove(lang);
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
    }
}
