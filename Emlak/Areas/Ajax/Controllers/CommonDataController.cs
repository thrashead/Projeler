using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Mvc;
using System.Xml;
using Lib;
using Newtonsoft.Json;

namespace Emlak.Areas.Ajax.Controllers
{
    public class CommonDataController : Controller
    {
        EmlakSiteEntities entity = new EmlakSiteEntities();

        public JsonResult GetLanguages()
        {
            try
            {
                var lang = entity.Lang.ToList();

                var langs = new List<object>();

                foreach (var item in lang)
                {
                    langs.Add(new
                    {
                        DisplayText = item.LangName,
                        Value = item.ID
                    });
                }
                return Json(new { Result = "OK", Options = langs });
            }
            catch (Exception ex)
            {
                return Json(new { Result = "ERROR", Message = ex.Message });
            }
        }

        public JsonResult GetMainCategories(int parentID = -1)
        {
            try
            {
                List<OptionList> _optList = new List<OptionList>();

                if (Request.QueryString["empty"] != null)
                    _optList.Add(new OptionList() { Text = "-", Value = "0" });

                var rb = entity.Category.ToList();

                if (parentID != -1)
                {
                    rb = rb.Where(a => a.ParentID == parentID).ToList();
                }

                if (rb.Count > 0)
                {
                    foreach (var item in rb)
                    {
                        _optList.Add(new OptionList() { Value = item.ID.ToString(), Text = item.CategoryName });
                    }
                }

                var cats = _optList.Select(c => new { DisplayText = c.Text, Value = c.Value });

                return Json(new { Result = "OK", Options = cats });
            }
            catch (Exception ex)
            {
                return Json(new { Result = "ERROR", Message = ex.Message });
            }
        }

        public JsonResult GetLinkTarget()
        {
            try
            {
                List<OptionList> _optList = new List<OptionList>();

                _optList.Add(new OptionList() { Text = "Aynı Sayfada (_self)", Value = "_self" });
                _optList.Add(new OptionList() { Text = "Yeni Sayfada (_blank)", Value = "_blank" });
                _optList.Add(new OptionList() { Text = "Bağlı Çerçevede (_parent)", Value = "_parent" });
                _optList.Add(new OptionList() { Text = "Top İsimli Sayfada (_top)", Value = "_top" });

                var targets = _optList.Select(c => new { DisplayText = c.Text, Value = c.Value }); ;

                return Json(new { Result = "OK", Options = targets });
            }
            catch (Exception ex)
            {
                return Json(new { Result = "ERROR", Message = ex.Message });
            }
        }

        public JsonResult GetWarmTypes()
        {
            try
            {
                List<OptionList> _optList = new List<OptionList>();
                _optList.Add(new OptionList() { Text = "Güneş Enerjisi", Value = "Güneş Enerjisi" });
                _optList.Add(new OptionList() { Text = "Kat Kaloriferi", Value = "Kat Kaloriferi" });
                _optList.Add(new OptionList() { Text = "Klima", Value = "Klima" });
                _optList.Add(new OptionList() { Text = "Kombi", Value = "Kombi" });
                _optList.Add(new OptionList() { Text = "Merkezi", Value = "Merkezi" });
                _optList.Add(new OptionList() { Text = "Soba", Value = "Soba" });
                _optList.Add(new OptionList() { Text = "Diğer", Value = "Diğer" });

                var values = _optList.Select(c => new { DisplayText = c.Text, Value = c.Value });
                return Json(new { Result = "OK", Options = values });
            }
            catch (Exception ex)
            {
                return Json(new { Result = "ERROR", Message = ex.Message });
            }
        }

        public JsonResult GetFuelTypes()
        {
            try
            {
                List<OptionList> _optList = new List<OptionList>();
                _optList.Add(new OptionList() { Text = "Doğalgaz", Value = "Doğalgaz" });
                _optList.Add(new OptionList() { Text = "Odun-Kömür", Value = "Odun-Kömür" });
                _optList.Add(new OptionList() { Text = "Akaryakıt", Value = "Akaryakıt" });
                _optList.Add(new OptionList() { Text = "Elektrik", Value = "Elektrik" });
                _optList.Add(new OptionList() { Text = "Diğer", Value = "Diğer" });

                var values = _optList.Select(c => new { DisplayText = c.Text, Value = c.Value });
                return Json(new { Result = "OK", Options = values });
            }
            catch (Exception ex)
            {
                return Json(new { Result = "ERROR", Message = ex.Message });
            }
        }

        public JsonResult GetSituation()
        {
            try
            {
                List<OptionList> _optList = new List<OptionList>();
                _optList.Add(new OptionList() { Text = "Sıfır", Value = "Sıfır" });
                _optList.Add(new OptionList() { Text = "İkinci El", Value = "İkinci El" });
                _optList.Add(new OptionList() { Text = "Masraflı", Value = "Masraflı" });

                var values = _optList.Select(c => new { DisplayText = c.Text, Value = c.Value });
                return Json(new { Result = "OK", Options = values });
            }
            catch (Exception ex)
            {
                return Json(new { Result = "ERROR", Message = ex.Message });
            }
        }

        public JsonResult GetCity()
        {
            try
            {
                List<OptionList> _optList = new List<OptionList>();

                XmlReader oku = XmlReader.Create(Server.MapPath("~/App_Data/Sehir.xml"));
                while (oku.Read())
                {
                    if (oku.NodeType == XmlNodeType.Element && oku.Name == "sehir")
                    {
                        if (oku.GetAttribute("ad").ToString() != "Tümü")
                        {
                            _optList.Add(new OptionList()
                            {
                                Text = oku.GetAttribute("ad").ToString(),
                                Value = oku.GetAttribute("ad").ToString()
                            });
                        }
                    }
                }
                oku.Close();

                var values = _optList.Select(c => new { DisplayText = c.Text, Value = c.Value });
                return Json(new { Result = "OK", Options = values });
            }
            catch (Exception ex)
            {
                return Json(new { Result = "ERROR", Message = ex.Message });
            }
        }

        public JsonResult TodaysRE(string re)
        {
            bool result = true;

            TodaysREJson objectRE = JsonConvert.DeserializeObject<TodaysREJson>(re);

            var rb = entity.RealEstateAds.ToList();

            foreach (var item in rb)
            {
                item.GununEmlagi = false;
            }

            result = entity.SaveChanges() >= 0 ? true : false;

            if (result == true)
            {
                var realestateads = entity.RealEstateAds.Where(a=> a.ID == objectRE.ID).FirstOrDefault();

                realestateads.GununEmlagi = true;

                result = entity.SaveChanges() >= 0 ? true : false;
            }

            return Json(result);
        }
        public class TodaysREJson
        {
            public int ID { get; set; }
        }
    }
}
