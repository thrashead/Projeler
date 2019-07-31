using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using CeyhanPolat.Lib;
using CeyhanPolat.Models;
using TDLibrary;
using CeyhanPolat.Data;

namespace CeyhanPolat.Controllers
{
    public class AjaxController : Controller
    {
        ceyhanpolatdbEntities entity = new ceyhanpolatdbEntities();

        [HttpGet]
        public JsonResult Menu()
        {
            var categories = entity.sp_Menu().ToList();

            foreach (var item in categories)
            {
                item.RouteUrl = item.RouteUrl.Replace("-", "");
                item.RouteUrl = item.RouteUrl == "anasayfa" ? "Giris" : item.RouteUrl.FirstCharToUpperCase();
            }

            return Json(categories, JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public JsonResult Slider()
        {
            var pictures = entity.sp_Slider().ToList();

            return Json(pictures, JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public JsonResult RasgeleSiir()
        {
            List<Siir> siirler = new List<Siir>();
            Siir siir;

            var rb = entity.sp_Poetries(null, 3, true).ToList();

            foreach (var item in rb)
            {
                siir = new Siir();

                siir.PoetryName = item.Baslik;
                siir.Poetry = item.Siir;
                siir.RouteUrl = item.RouteUrl.FirstCharToUpperCase(true, '-');

                var picture = entity.sp_Pictures("galeri", 1, true).FirstOrDefault();

                siir.Picture = AppMgr.UploadPath + "/Gallery/Thumb/" + picture;

                siirler.Add(siir);
            }

            return Json(siirler, JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public JsonResult KisaBiyografi()
        {
            Biyografi biyografi = new Biyografi();

            var cerceve = entity.sp_Pictures("cerceve", 1, null).FirstOrDefault();
            biyografi.Picture = AppMgr.UploadPath + "/Gallery/" + cerceve;

            var rbBiy = entity.sp_Category("biyografi", null, 1, null).FirstOrDefault();
            biyografi.Text = rbBiy.ShortText + "<br /><br />" + rbBiy.LongText.SplitText(0, 1200);
            biyografi.RouteUrl = rbBiy.RouteUrl.FirstCharToUpperCase();

            return Json(biyografi, JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public JsonResult Biyografi()
        {
            CategoryLang catLang = new CategoryLang();

            var rbBiy = entity.sp_Category("biyografi", null, 1, null).FirstOrDefault();

            catLang.ShortText = rbBiy.CategoryName;
            catLang.LongText = rbBiy.LongText;

            return Json(catLang, JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public JsonResult Galeri()
        {
            var pictures = entity.sp_Pictures("galeri", null, null).ToList();

            return Json(pictures, JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public JsonResult Siirleri()
        {
            List<Poetries> _poetryListTemp = new List<Poetries>();
            List<Poetries> _poetryListEmpties;
            List<Poetries> _poetryListDate;
            List<Poetries> _poetryListYear;
            List<Poetries> _poetryList = System.Web.HttpContext.Current.Application["Poetries"] as List<Poetries>;

            if (Session["SearchResult"] != null && Session["SearchPoetry"] != null)
            {
                _poetryList.ForEach(a => a.CPoetryContainer.Visible = true);

                SearchPoetryJson _searchPoetry = Session["SearchPoetry"] as SearchPoetryJson;

                _poetryList = _poetryList.Where(a => a.PoetryName.Contains(_searchPoetry.PoetryName.ToUpper())).ToList();

                if (!String.IsNullOrEmpty(_searchPoetry.PoetryName))
                {
                    _poetryList.ForEach(a => a.CPoetryName.Visible = true);
                    _poetryList.ForEach(a => a.CPoetryName.Text = _searchPoetry.PoetryName + " [x]<br />");
                }
                else
                {
                    _poetryList.ForEach(a => a.CPoetryName.Visible = false);
                }

                _poetryListDate = _poetryList.Where(a => a.Date.Length > 4).ToList();
                if (!String.IsNullOrEmpty(_searchPoetry.FirstDate))
                {
                    _poetryListDate = _poetryListDate.Where(a => Convert.ToDateTime(a.Date) >= Convert.ToDateTime(_searchPoetry.FirstDate)).ToList();
                }

                if (!String.IsNullOrEmpty(_searchPoetry.LastDate))
                {
                    _poetryListDate = _poetryListDate.Where(a => Convert.ToDateTime(a.Date) <= Convert.ToDateTime(_searchPoetry.LastDate)).ToList();
                }

                _poetryListYear = _poetryList.Where(a => a.Date.Length == 4).ToList();
                if (!String.IsNullOrEmpty(_searchPoetry.FirstDate))
                {
                    _poetryList.ForEach(a => a.CFirstDate.Visible = true);
                    _poetryList.ForEach(a => a.CFirstDate.Text = _searchPoetry.FirstDate + " [x]<br />");
                    _poetryListYear = _poetryListYear.Where(a => Convert.ToInt32(a.Date) >= Convert.ToDateTime(_searchPoetry.FirstDate).Year).ToList();
                }
                else
                {
                    _poetryList.ForEach(a => a.CFirstDate.Visible = false);
                }

                if (!String.IsNullOrEmpty(_searchPoetry.LastDate))
                {
                    _poetryList.ForEach(a => a.CLastDate.Visible = true);
                    _poetryList.ForEach(a => a.CLastDate.Text = _searchPoetry.LastDate + " [x]<br />");
                    _poetryListYear = _poetryListYear.Where(a => Convert.ToInt32(a.Date) <= Convert.ToDateTime(_searchPoetry.LastDate).Year).ToList();
                }
                else
                {
                    _poetryList.ForEach(a => a.CLastDate.Visible = false);
                }

                _poetryListTemp.AddRange(_poetryListDate);
                _poetryListTemp.AddRange(_poetryListYear);

                if (_poetryListTemp.Count > 0)
                {
                    _poetryListEmpties = _poetryList.Where(a => String.IsNullOrEmpty(a.Date) || a.Date == "-").ToList();
                    _poetryListTemp.AddRange(_poetryListEmpties);
                }

                _poetryList = _poetryListTemp.ToList();
            }
            else
            {
                _poetryList.ForEach(a => a.CPoetryContainer.Visible = false);
            }

            if (_poetryList == null)
            {
                _poetryList = new List<Poetries>();
            }

            foreach (var item in _poetryList)
            {
                item.RouteUrl = item.RouteUrl.FirstCharToUpperCase(true, '-');
            }

            return Json(_poetryList, JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public JsonResult Siir(string link)
        {
            link = link.ToUrl(true);

            var rbPoetry = entity.sp_Poetries(link, 1, null).FirstOrDefault();

            Poetries poetry = new Poetries();

            link = link.ToUrl(true);

            var assignment = entity.sp_Assignments("Rank", "Content", null, rbPoetry.ID, 1).FirstOrDefault();

            poetry.ID = rbPoetry.ID;
            poetry.RankID = assignment.MainTypeID;
            poetry.PoetryName = rbPoetry.Baslik;
            poetry.Poetry = rbPoetry.Siir;
            poetry.City = rbPoetry.Sehir;
            poetry.Date = rbPoetry.Tarih;
            poetry.RouteUrl = link;

            var picture = entity.sp_Pictures(null, 1, true).FirstOrDefault();

            poetry.Picture = AppMgr.UploadPath + "/Gallery/" + picture;

            poetry.Reviews = Yorumlar(assignment.MainTypeID);

            return Json(poetry, JsonRequestBehavior.AllowGet);
        }

        public List<RankPoint> Yorumlar(int? rankid)
        {
            var rankpoints = entity.sp_Reviews(rankid, null).ToList().ChangeModelList<RankPoint, sp_Reviews_Result>();

            return rankpoints;
        }

        [HttpGet]
        public JsonResult YorumGonder(string yorum)
        {
            RankReviewJson _yorum = JsonConvert.DeserializeObject<RankReviewJson>(yorum);

            int? result = entity.sp_SendReview(_yorum.RankID.ToInteger(),
                                               _yorum.Point.ToInteger(),
                                               Request.UserHostAddress,
                                               _yorum.NameSurname,
                                               DateTime.Now.ToShortDateString() + " " + DateTime.Now.ToLongTimeString(),
                                               "",
                                               _yorum.Message,
                                               false).FirstOrDefault();

            return Json(result > 0 ? true : false, JsonRequestBehavior.AllowGet);
        }

        public class RankReviewJson
        {
            public string RankID { get; set; }
            public string NameSurname { get; set; }
            public string Point { get; set; }
            public string Message { get; set; }
        }

        [HttpGet]
        public JsonResult SiirAramaListe(string kelime)
        {
            List<sp_ContentSearch_Result> _contentItems = new List<sp_ContentSearch_Result>(); ;

            if (kelime != null)
            {
                string[] splitContent = kelime.Split(' ');

                foreach (string item in splitContent)
                {
                    var contents = entity.sp_ContentSearch(item.ToUpper()).ToList();

                    foreach (var content in contents)
                    {
                        content.ContentName = content.ContentName.ToLower().Replace(item, "<strong class='focused'>" + item.ToLower() + "</strong>");
                        content.ContentName = content.ContentName.ToUpper();
                        content.RouteUrl = content.RouteUrl.FirstCharToUpperCase(true, '-');
                    }

                    _contentItems.AddRange(contents as List<sp_ContentSearch_Result>);
                }
            }

            return Json(_contentItems, JsonRequestBehavior.AllowGet);
        }

        public class PoetrySearchListJson
        {
            public string PoetryName { get; set; }
        }

        [HttpGet]
        public JsonResult SiirArama(string kelime)
        {
            SearchPoetryJson _kelime = JsonConvert.DeserializeObject<SearchPoetryJson>(kelime);

            string result = "N";

            List<Poetries> _poetryListTemp = new List<Poetries>();
            List<Poetries> _poetryListEmpties;
            List<Poetries> _poetryListDate;
            List<Poetries> _poetryListYear;
            List<Poetries> _poetryList = System.Web.HttpContext.Current.Application["Poetries"] as List<Poetries>;

            _poetryList = _poetryList.Where(a => a.PoetryName.Contains(_kelime.PoetryName.ToUpper())).ToList();

            _poetryListDate = _poetryList.Where(a => a.Date.Length > 4).ToList();
            if (!String.IsNullOrEmpty(_kelime.FirstDate))
            {
                _poetryListDate = _poetryListDate.Where(a => Convert.ToDateTime(a.Date) >= Convert.ToDateTime(_kelime.FirstDate)).ToList();
            }
            if (!String.IsNullOrEmpty(_kelime.LastDate))
            {
                _poetryListDate = _poetryListDate.Where(a => Convert.ToDateTime(a.Date) <= Convert.ToDateTime(_kelime.LastDate)).ToList();
            }

            _poetryListYear = _poetryList.Where(a => a.Date.Length == 4).ToList();
            if (!String.IsNullOrEmpty(_kelime.FirstDate))
            {
                _poetryListYear = _poetryListYear.Where(a => Convert.ToInt32(a.Date) >= Convert.ToDateTime(_kelime.FirstDate).Year).ToList();
            }
            if (!String.IsNullOrEmpty(_kelime.LastDate))
            {
                _poetryListYear = _poetryListYear.Where(a => Convert.ToInt32(a.Date) <= Convert.ToDateTime(_kelime.LastDate).Year).ToList();
            }

            _poetryListTemp.AddRange(_poetryListDate);
            _poetryListTemp.AddRange(_poetryListYear);

            if (_poetryListTemp.Count > 0)
            {
                _poetryListEmpties = _poetryList.Where(a => String.IsNullOrEmpty(a.Date) || a.Date == "-").ToList();
                _poetryListTemp.AddRange(_poetryListEmpties);
            }

            _poetryList = _poetryListTemp.ToList();

            if (_poetryList.Count > 0)
            {
                result = "Y";
                System.Web.HttpContext.Current.Session["SearchResult"] = _poetryList;
                System.Web.HttpContext.Current.Session["SearchPoetry"] = _kelime;
            }
            else
            {
                System.Web.HttpContext.Current.Session["SearchResult"] = null;
                System.Web.HttpContext.Current.Session["SearchPoetry"] = null;
            }

            return Json(result, JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public JsonResult SiirAramaTemizle()
        {
            bool result = false;

            try
            {
                System.Web.HttpContext.Current.Session["SearchResult"] = null;
                System.Web.HttpContext.Current.Session["SearchPoetry"] = null;
                result = true;
            }
            catch
            {

            }

            return Json(result, JsonRequestBehavior.AllowGet);
        }
    }
}