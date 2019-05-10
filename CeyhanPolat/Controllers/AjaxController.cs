using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using CeyhanPolat.Lib;
using CeyhanPolat.Models;
using TDLibrary;

namespace CeyhanPolat.Controllers
{
    public class AjaxController : Controller
    {
        ceyhanpolatdbEntities entity = new ceyhanpolatdbEntities();

        [HttpGet]
        public JsonResult Menu()
        {
            var categories = entity.Category.Where(a => a.Active == true && a.Display == true).ToList();

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
            List<PicturesNoLang> listPicturesNoLang = new List<PicturesNoLang>();

            var galleries = entity.Gallery.Where(a => a.Code == "slider").ToList();

            var galID = galleries.FirstOrDefault().ID;

            if (galleries.Count > 0)
            {
                var assignments = entity.Assignments.Where(a => a.TargetType == "Gallery"
                                                           && a.MainType == "PicturesNoLang"
                                                           && a.TargetTypeID == galID).ToList();

                foreach (var item in assignments)
                {
                    var picturesnolangs = entity.PicturesNoLang.Where(a => a.ID == item.MainTypeID).ToList();

                    if (picturesnolangs.Count > 0)
                    {
                        listPicturesNoLang.Add(picturesnolangs.FirstOrDefault());
                    }
                }
            }

            return Json(listPicturesNoLang, JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public JsonResult RasgeleSiir()
        {
            List<Siir> siirler = new List<Siir>();
            Siir siir;

            Random r = new Random();

            for (int i = 0; i < 3; i++)
            {
                siir = new Siir();

                int rr = r.Next(3, 170);

                var content = entity.Content.Where(a => a.ID == rr).FirstOrDefault();
                int contID = content.ID;

                var contentlang = entity.ContentLang.Where(a => a.ContentID == contID).FirstOrDefault();

                siir.PoetryName = contentlang.ContentName;
                siir.Poetry = contentlang.LongText;
                siir.RouteUrl = content.RouteUrl.FirstCharToUpperCase(true, '-');

                int randID = r.Next(14, 45);

                var picturesnolang = entity.PicturesNoLang.Where(a => a.ID == randID).FirstOrDefault();

                siir.Picture = AppMgr.UploadPath + "/Gallery/Thumb/" + picturesnolang.PictureName;

                siirler.Add(siir);
            }

            return Json(siirler, JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public JsonResult KisaBiyografi()
        {
            Biyografi biyografi = new Biyografi();

            biyografi.Picture = AppMgr.UploadPath + "/Gallery/" + entity.PicturesNoLang.Where(a => a.Active == true && a.Code == "cerceve").FirstOrDefault().PictureName;

            var category = entity.Category.Where(a => a.Code == "biyografi").FirstOrDefault();
            int catID = category.ID;

            var categorylang = entity.CategoryLang.Where(a => a.CategoryID == catID).FirstOrDefault();

            biyografi.Text = categorylang.ShortText + "<br /><br />" + categorylang.LongText.SplitText(0, 1200);
            biyografi.RouteUrl = category.RouteUrl.FirstCharToUpperCase();

            return Json(biyografi, JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public JsonResult Biyografi()
        {
            CategoryLang catLang = new CategoryLang();

            var category = entity.Category.Where(a => a.RouteUrl == "biyografi" && a.Active == true).FirstOrDefault();
            int catID = category.ID;

            var categorylang = entity.CategoryLang.Where(a => a.CategoryID == catID).FirstOrDefault();

            catLang.ShortText = categorylang.CategoryName;
            catLang.LongText = categorylang.LongText;

            return Json(catLang, JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public JsonResult Galeri()
        {
            List<PicturesNoLang> _listPicturesNoLang = new List<PicturesNoLang>();

            var gallery = entity.Gallery.Where(a => a.Code == "galeri").FirstOrDefault();
            int galID = gallery.ID;

            var assignments = entity.Assignments.Where(a => a.TargetType == "Gallery"
                                                         && a.TargetTypeID == galID
                                                         && a.MainType == "PicturesNoLang").ToList();

            foreach (var item in assignments)
            {
                PicturesNoLang picturesnolang = entity.PicturesNoLang.Where(a => a.ID == item.MainTypeID).FirstOrDefault();

                _listPicturesNoLang.Add(picturesnolang);
            }

            return Json(_listPicturesNoLang, JsonRequestBehavior.AllowGet);
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

                _poetryList = _poetryList.Where(a => a.PoetryName.Contains(_searchPoetry.PoetryName.ToUpper())).OrderBy(a => a.Queue).ToList();

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

                _poetryList = _poetryListTemp.OrderBy(a => a.Queue).ToList();
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
            Poetries poetry = new Poetries();
            Random r = new Random();

            link = link.ToHyperLinkText(true);

            var content = entity.Content.Where(a => a.RouteUrl == link).FirstOrDefault();
            int contID = content.ID;

            var contentlang = entity.ContentLang.Where(a => a.ContentID == contID).FirstOrDefault();

            var assignment = entity.Assignments.Where(a => a.TargetType == "Content"
                                                         && a.MainType == "Rank"
                                                         && a.TargetTypeID == content.ID).FirstOrDefault();

            poetry.ID = content.ID;
            poetry.RankID = assignment.MainTypeID;
            poetry.PoetryName = contentlang.ContentName;
            poetry.Poetry = contentlang.LongText;
            poetry.City = contentlang.ShortText;
            poetry.Date = contentlang.Code;
            poetry.RouteUrl = link;

            int randID = r.Next(14, 45);

            var picturesnolang = entity.PicturesNoLang.Where(a => a.ID == randID).FirstOrDefault();

            poetry.Picture = AppMgr.UploadPath + "/Gallery/" + picturesnolang.PictureName;

            poetry.Reviews = Yorumlar(assignment.MainTypeID);

            return Json(poetry, JsonRequestBehavior.AllowGet);
        }

        public List<RankPoint> Yorumlar(int? rankid)
        {
            var rankpoints = entity.RankPoint.Where(a => a.Active == true && a.RankID == rankid).ToList();

            return rankpoints;
        }

        [HttpGet]
        public JsonResult YorumGonder(string yorum)
        {
            RankReviewJson _type = JsonConvert.DeserializeObject<RankReviewJson>(yorum);

            ceyhanpolatdbEntities entity = new ceyhanpolatdbEntities();

            var rankpoint = new RankPoint()
            {
                Active = false,
                RankID = _type.RankID.ToInteger(),
                Sender = _type.NameSurname,
                Subject = "",
                SendDate = DateTime.Now.ToShortDateString() + " " + DateTime.Now.ToLongTimeString(),
                Message = _type.Message,
                RankPoint1 = _type.Point.ToInteger(),
                IPAddress = Request.UserHostAddress
            };

            entity.RankPoint.Add(rankpoint);

            int result = entity.SaveChanges();

            return Json(result > 0 ? true : false, JsonRequestBehavior.AllowGet);
        }

        public class RankReviewJson
        {
            public string RankID { get; set; }
            public string NameSurname { get; set; }
            public string Point { get; set; }
            public string Message { get; set; }
        }

        //

        [HttpGet]
        public ActionResult SiirAramaListe(string kelime)
        {
            List<Content> _contentItems = new List<Content>(); ;

            if (kelime != null)
            {
                string[] splitContent = kelime.Split(' ');

                foreach (string item in splitContent)
                {
                    ceyhanpolatdbEntities cpEntity = new ceyhanpolatdbEntities();
                    var contents = cpEntity.Content.Where(a => a.ContentName.Contains(item.ToUpper())).ToList();

                    foreach (var content in contents)
                    {
                        content.ContentName = content.ContentName.ToLower().Replace(item, "<strong class='focused'>" + item.ToLower() + "</strong>");
                        content.ContentName = content.ContentName.ToUpper();
                        content.RouteUrl = content.RouteUrl.FirstCharToUpperCase(true, '-');
                    }

                    _contentItems.AddRange(contents as List<Content>);
                }
            }

            return Json(_contentItems, JsonRequestBehavior.AllowGet);
        }

        public class PoetrySearchListJson
        {
            public string PoetryName { get; set; }
        }

        [HttpGet]
        public ActionResult SiirArama(string kelime)
        {
            SearchPoetryJson _kelime = JsonConvert.DeserializeObject<SearchPoetryJson>(kelime);

            string result = "N";

            List<Poetries> _poetryListTemp = new List<Poetries>();
            List<Poetries> _poetryListEmpties;
            List<Poetries> _poetryListDate;
            List<Poetries> _poetryListYear;
            List<Poetries> _poetryList = System.Web.HttpContext.Current.Application["Poetries"] as List<Poetries>;

            _poetryList = _poetryList.Where(a => a.PoetryName.Contains(_kelime.PoetryName.ToUpper())).OrderBy(a => a.Queue).ToList();

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

            _poetryList = _poetryListTemp.OrderBy(a => a.Queue).ToList();

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
        public ActionResult SiirAramaTemizle(string kelime)
        {
            SearchPoetryJson _data = JsonConvert.DeserializeObject<SearchPoetryJson>(kelime);

            string result = "N";

            try
            {
                System.Web.HttpContext.Current.Session["SearchResult"] = null;
                System.Web.HttpContext.Current.Session["SearchPoetry"] = null;
                result = "Y";
            }
            catch
            {

            }

            return Json(result, JsonRequestBehavior.AllowGet);
        }
    }
}