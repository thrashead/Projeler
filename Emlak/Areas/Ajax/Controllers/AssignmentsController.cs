using System.Collections.Generic;
using System.Linq;
using System.Web.Mvc;
using Lib;
using TDLibrary;
using Newtonsoft.Json;

namespace Emlak.Areas.Ajax.Controllers
{
    public class AssignmentsController : Controller
    {
        EmlakSiteEntities entity = new EmlakSiteEntities();

        public JsonResult GetTargetData(string type)
        {
            AssignJson assJson = JsonConvert.DeserializeObject<AssignJson>(type);

            List<OptionList> _opList = new List<OptionList>();
            string result = "<ul id='targettypeul'>";
            int index = 1;

            switch (assJson.Name)
            {
                case "Category":
                    var categories = new List<Category>();

                    if (assJson.FilterName.IsNull())
                        categories = entity.Category.OrderByDescending(a => a.ID).ToList();
                    else
                        categories = entity.Category.Where(a => a.CategoryName.Contains(assJson.FilterName)).OrderByDescending(a => a.ID).ToList();

                    if (categories.Count > 0)
                    {
                        foreach (var item in categories)
                        {
                            item.Sample = item.CategoryName;

                            var langs = entity.CategoryLang.Where(a => a.CategoryID == item.ID).FirstOrDefault();

                            if (langs != null)
                            {
                                item.Sample = langs.ShortText;
                            }

                            result += DoItTarget(item.CategoryName, item.ID.ToString(), "Category", index, item.Sample);
                            index++;
                        }
                    }
                    break;
                case "Content":
                    var contents = new List<Content>();

                    if (assJson.FilterName.IsNull())
                        contents = entity.Content.OrderByDescending(a => a.ID).ToList();
                    else
                        contents = entity.Content.Where(a => a.ContentName.Contains(assJson.FilterName)).OrderByDescending(a => a.ID).ToList();

                    if (contents.Count > 0)
                    {
                        foreach (var item in contents)
                        {
                            item.Sample = item.ContentName;

                            var langs = entity.ContentLang.Where(a => a.ContentID == item.ID).FirstOrDefault();

                            if (langs != null)
                            {
                                item.Sample = langs.ShortText;
                            }

                            result += DoItTarget(item.ContentName, item.ID.ToString(), "Content", index, item.Sample);
                            index++;
                        }
                    }
                    break;
                case "Gallery":
                    var galleries = new List<Gallery>();

                    if (assJson.FilterName.IsNull())
                        galleries = entity.Gallery.OrderByDescending(a => a.ID).ToList();
                    else
                        galleries = entity.Gallery.Where(a => a.GalleryName.Contains(assJson.FilterName)).OrderByDescending(a => a.ID).ToList();

                    if (galleries.Count > 0)
                    {
                        foreach (var item in galleries)
                        {
                            item.Sample = item.GalleryName;

                            var langs = entity.GalleryLang.Where(a => a.GalleryID == item.ID).FirstOrDefault();

                            if (langs != null)
                            {
                                item.Sample = langs.ShortText;
                            }

                            result += DoItTarget(item.GalleryName, item.ID.ToString(), "Gallery", index, item.Sample);
                            index++;
                        }
                    }
                    break;
                case "Pictures":
                    var pictures = new List<Pictures>();

                    if (assJson.FilterName.IsNull())
                        pictures = entity.Pictures.OrderByDescending(a => a.ID).ToList();
                    else
                        pictures = entity.Pictures.Where(a => a.PictureName.Contains(assJson.FilterName)).OrderByDescending(a => a.ID).ToList();

                    if (pictures.Count > 0)
                    {
                        foreach (var item in pictures)
                        {
                            item.Sample = item.PictureName;

                            var langs = entity.PicturesLang.Where(a => a.PictureID == item.ID).FirstOrDefault();

                            if (langs != null)
                            {
                                item.Sample = langs.ShortText;
                            }

                            result += DoItTarget(item.PictureName, item.ID.ToString(), "Pictures", index, item.Sample);
                            index++;
                        }
                    }
                    break;
                case "PicturesNoLang":
                    var picturesnolangs = new List<PicturesNoLang>();

                    if (assJson.FilterName.IsNull())
                        picturesnolangs = entity.PicturesNoLang.OrderByDescending(a => a.ID).ToList();
                    else
                        picturesnolangs = entity.PicturesNoLang.Where(a => a.PictureName.Contains(assJson.FilterName)).OrderByDescending(a => a.ID).ToList();

                    if (picturesnolangs.Count > 0)
                    {
                        foreach (var item in picturesnolangs)
                        {
                            result += DoItTarget(item.PictureName, item.ID.ToString(), "PicturesNoLang", index, item.PictureName);
                            index++;
                        }
                    }
                    break;
                case "Files":
                    var files = new List<Files>();

                    if (assJson.FilterName.IsNull())
                        files = entity.Files.OrderByDescending(a => a.ID).ToList();
                    else
                        files = entity.Files.Where(a => a.FileName.Contains(assJson.FilterName)).OrderByDescending(a => a.ID).ToList();

                    if (files.Count > 0)
                    {
                        foreach (var item in files)
                        {
                            item.Sample = item.FileName;

                            var langs = entity.FilesLang.Where(a => a.FileID == item.ID).FirstOrDefault();

                            if (langs != null)
                            {
                                item.Sample = langs.ShortText;
                            }

                            result += DoItTarget(item.FileName, item.ID.ToString(), "Files", index, item.Sample);
                            index++;
                        }
                    }
                    break;
                case "FilesNoLang":
                    var filesnolangs = new List<FilesNoLang>();

                    if (assJson.FilterName.IsNull())
                        filesnolangs = entity.FilesNoLang.OrderByDescending(a => a.ID).ToList();
                    else
                        filesnolangs = entity.FilesNoLang.Where(a => a.FileName.Contains(assJson.FilterName)).OrderByDescending(a => a.ID).ToList();

                    if (filesnolangs.Count > 0)
                    {
                        foreach (var item in filesnolangs)
                        {
                            result += DoItTarget(item.FileName, item.ID.ToString(), "FilesNoLang", index, item.FileName);
                            index++;
                        }
                    }
                    break;
                case "RealEstateAds":
                    var realestateads = new List<RealEstateAds>();

                    if (assJson.FilterName.IsNull())
                        realestateads = entity.RealEstateAds.OrderByDescending(a => a.ID).ToList();
                    else
                        realestateads = entity.RealEstateAds.Where(a => a.Baslik.Contains(assJson.FilterName)).OrderByDescending(a => a.ID).ToList();

                    if (realestateads.Count > 0)
                    {
                        foreach (var item in realestateads)
                        {
                            result += DoItTarget(item.Baslik, item.ID.ToString(), "RealEstateAds", index, item.Baslik);
                            index++;
                        }
                    }
                    break;
            }

            result += "</ul>";

            return Json(result);
        }

        public JsonResult GetMainData(string type)
        {
            AssignJson assJson = JsonConvert.DeserializeObject<AssignJson>(type);

            List<OptionList> _opList = new List<OptionList>();
            string result = "<ul id='maintypeul'>";
            int index = 1;

            switch (assJson.Name)
            {
                case "Content":
                    var contents = new List<Content>();

                    if (assJson.FilterName.IsNull())
                        contents = entity.Content.OrderByDescending(a => a.ID).ToList();
                    else
                        contents = entity.Content.Where(a => a.ContentName.Contains(assJson.FilterName)).OrderByDescending(a => a.ID).ToList();

                    if (contents.Count > 0)
                    {
                        foreach (var item in contents)
                        {
                            item.Sample = item.ContentName;

                            var langs = entity.ContentLang.Where(a => a.ContentID == item.ID).FirstOrDefault();

                            if (langs != null)
                            {
                                item.Sample = langs.ShortText;
                            }

                            result += DoItMain(item.ContentName, item.ID.ToString(), "Content", index, item.Sample);
                            index++;
                        }
                    }
                    break;
                case "Gallery":
                    var galleries = new List<Gallery>();

                    if (assJson.FilterName.IsNull())
                        galleries = entity.Gallery.OrderByDescending(a => a.ID).ToList();
                    else
                        galleries = entity.Gallery.Where(a => a.GalleryName.Contains(assJson.FilterName)).OrderByDescending(a => a.ID).ToList();

                    if (galleries.Count > 0)
                    {
                        foreach (var item in galleries)
                        {
                            item.Sample = item.GalleryName;

                            var langs = entity.GalleryLang.Where(a => a.GalleryID == item.ID).FirstOrDefault();

                            if (langs != null)
                            {
                                item.Sample = langs.ShortText;
                            }

                            result += DoItMain(item.GalleryName, item.ID.ToString(), "Gallery", index, item.Sample);
                            index++;
                        }
                    }
                    break;
                case "Pictures":
                    var pictures = new List<Pictures>();

                    if (assJson.FilterName.IsNull())
                        pictures = entity.Pictures.OrderByDescending(a => a.ID).ToList();
                    else
                        pictures = entity.Pictures.Where(a => a.PictureName.Contains(assJson.FilterName)).OrderByDescending(a => a.ID).ToList();

                    if (pictures.Count > 0)
                    {
                        foreach (var item in pictures)
                        {
                            item.Sample = item.PictureName;

                            var langs = entity.PicturesLang.Where(a => a.PictureID == item.ID).FirstOrDefault();

                            if (langs != null)
                            {
                                item.Sample = langs.ShortText;
                            }

                            result += DoItMain(item.PictureName, item.ID.ToString(), "Pictures", index, item.Sample);
                            index++;
                        }
                    }
                    break;
                case "PicturesNoLang":
                    var picturesnolang = new List<PicturesNoLang>();

                    if (assJson.FilterName.IsNull())
                        picturesnolang = entity.PicturesNoLang.OrderByDescending(a => a.ID).ToList();
                    else
                        picturesnolang = entity.PicturesNoLang.Where(a => a.PictureName.Contains(assJson.FilterName)).OrderByDescending(a => a.ID).ToList();

                    if (picturesnolang.Count > 0)
                    {
                        foreach (var item in picturesnolang)
                        {
                            result += DoItMain(item.PictureName, item.ID.ToString(), "PicturesNoLang", index, item.PictureName);
                            index++;
                        }
                    }
                    break;
                case "Files":
                    var files = new List<Files>();

                    if (assJson.FilterName.IsNull())
                        files = entity.Files.OrderByDescending(a => a.ID).ToList();
                    else
                        files = entity.Files.Where(a => a.FileName.Contains(assJson.FilterName)).OrderByDescending(a => a.ID).ToList();

                    if (files.Count > 0)
                    {
                        foreach (var item in files)
                        {
                            item.Sample = item.FileName;

                            var langs = entity.FilesLang.Where(a => a.FileID == item.ID).FirstOrDefault();

                            if (langs != null)
                            {
                                item.Sample = langs.ShortText;
                            }

                            result += DoItMain(item.FileName, item.ID.ToString(), "Files", index, item.Sample);
                            index++;
                        }
                    }
                    break;
                case "FilesNoLang":
                    var filesnolang = new List<FilesNoLang>();

                    if (assJson.FilterName.IsNull())
                        filesnolang = entity.FilesNoLang.OrderByDescending(a => a.ID).ToList();
                    else
                        filesnolang = entity.FilesNoLang.Where(a => a.FileName.Contains(assJson.FilterName)).OrderByDescending(a => a.ID).ToList();

                    if (filesnolang.Count > 0)
                    {
                        foreach (var item in filesnolang)
                        {
                            result += DoItMain(item.FileName, item.ID.ToString(), "FilesNoLang", index, item.FileName);
                            index++;
                        }
                    }
                    break;
                //case "Rank":
                //    var ranks = new List<Rank>();

                //    if (assJson.FilterName.IsNull())
                //        ranks = entity.Rank.OrderByDescending(a => a.ID).ToList();
                //    else
                //        ranks = entity.Rank.Where(a => a.RankName.Contains(assJson.FilterName)).OrderByDescending(a => a.ID).ToList();

                //    if (ranks.Count > 0)
                //    {
                //        foreach (var item in ranks)
                //        {
                //            result += DoItMain(item.RankName, item.ID.ToString(), "Rank", index, item.MaxRankPoint.ToString());
                //            index++;
                //        }
                //    }
                //    break;
                case "URLink":
                    var urlinks = new List<URLink>();

                    if (assJson.FilterName.IsNull())
                        urlinks = entity.URLink.OrderByDescending(a => a.ID).ToList();
                    else
                        urlinks = entity.URLink.Where(a => a.URLinkName.Contains(assJson.FilterName)).OrderByDescending(a => a.ID).ToList();

                    if (urlinks.Count > 0)
                    {
                        foreach (var item in urlinks)
                        {
                            item.Sample = item.URLinkName;

                            var langs = entity.URLinkLang.Where(a => a.URLinkID == item.ID).FirstOrDefault();

                            if (langs != null)
                            {
                                item.Sample = langs.URL;
                            }

                            result += DoItMain(item.URLinkName, item.ID.ToString(), "URLink", index, item.Sample);
                            index++;
                        }
                    }
                    break;
                case "URLinkNoLang":
                    var urlinknolangs = new List<URLinkNoLang>();

                    if (assJson.FilterName.IsNull())
                        urlinknolangs = entity.URLinkNoLang.OrderByDescending(a => a.ID).ToList();
                    else
                        urlinknolangs = entity.URLinkNoLang.Where(a => a.URL.Contains(assJson.FilterName)).OrderByDescending(a => a.ID).ToList();

                    if (urlinknolangs.Count > 0)
                    {
                        foreach (var item in urlinknolangs)
                        {
                            result += DoItMain(item.URL, item.ID.ToString(), "RealEstateAds", index, item.URL);
                            index++;
                        }
                    }
                    break;
                case "RealEstateAds":
                    var realestateads = new List<RealEstateAds>();

                    if (assJson.FilterName.IsNull())
                        realestateads = entity.RealEstateAds.OrderByDescending(a => a.ID).ToList();
                    else
                        realestateads = entity.RealEstateAds.Where(a => a.Baslik.Contains(assJson.FilterName)).OrderByDescending(a => a.ID).ToList();

                    if (realestateads.Count > 0)
                    {
                        foreach (var item in realestateads)
                        {
                            result += DoItMain(item.Baslik, item.ID.ToString(), "RealEstateAds", index, item.Baslik);
                            index++;
                        }
                    }
                    break;
            }

            result += "</ul>";

            return Json(result);
        }
        static string DoItTarget(string Text, string Value, string Type, int index, string sample)
        {
            string result = "<li>" + Text + " <input type='radio'  name='" + Type + "' data-index='" + index.ToString() + "' data-id='" + Value + "'";

            if (index == 1)
                result += " checked />";
            else
                result += " />";

            if (!sample.IsNull())
            {
                switch (Type)
                {
                    case "Pictures":
                        result += "<img src='" + AppMgr.UploadPath + "/Gallery/Thumb/" + sample + "' /><span><strong>Örn. : </strong></span>";
                        break;
                    case "PicturesNoLang":
                        result += "<img src='" + AppMgr.UploadPath + "/Gallery/Thumb/" + sample + "' /><span><strong>Örn. : </strong></span>";
                        break;
                    case "Files":
                        result += "<span><strong>Örn. : </strong><a target='_blank' href='" + AppMgr.UploadPath + "/File/" + sample + "'>" + sample + "</a></span>";
                        break;
                    case "FilesNoLang":
                        result += "<span><strong>Örn. : </strong><a target='_blank' href='" + AppMgr.UploadPath + "/File/" + sample + "'>" + sample + "</a></span>";
                        break;
                    case "Rank":
                        result += "<span><strong>Maks. Puan : </strong>" + sample + "</span>";
                        break;
                    case "URLink":
                        result += "<span><strong>Örn. : </strong><a target='_blank' href='" + sample + "'>" + sample + "</a></span>";
                        break;
                    case "URLinkNoLang":
                        result += "<span><strong>Link : </strong><a target='_blank' href='" + sample + "'>" + sample + "</a></span>";
                        break;
                    case "RealEstateAds":
                        result += "";
                        break;
                    default:
                        result += "<span><strong>Örn. : </strong>" + sample.SplitText(0, 25) + "</span>";
                        break;
                }
            }
            else
            {
                result += "";
            }


            result += "</li>";

            return result;
        }

        static string DoItMain(string Text, string Value, string Type, int index, string sample)
        {
            string result = "<li>" + Text + " <input type='checkbox'  name='" + Type + "' data-index='" + index.ToString() + "' data-id='" + Value + "' />";

            if (!sample.IsNull())
            {
                switch (Type)
                {
                    case "Pictures":
                        result += "<img src='" + AppMgr.UploadPath + "/Gallery/Thumb/" + sample + "' /><span><strong>Örn. : </strong></span>";
                        break;
                    case "PicturesNoLang":
                        result += "<img src='" + AppMgr.UploadPath + "/Gallery/Thumb/" + sample + "' /><span><strong>Örn. : </strong></span>";
                        break;
                    case "Files":
                        result += "<span><strong>Örn. : </strong><a target='_blank' href='" + AppMgr.UploadPath + "/File/" + sample + "'>" + sample + "</a></span>";
                        break;
                    case "FilesNoLang":
                        result += "<span><strong>Örn. : </strong><a target='_blank' href='" + AppMgr.UploadPath + "/File/" + sample + "'>" + sample + "</a></span>";
                        break;
                    //case "Rank":
                    //    result += "<span><strong>Maks. Puan : </strong>" + sample + "</span>";
                    //    break;
                    case "URLink":
                        result += "<span><strong>Örn. : </strong><a target='_blank' href='" + sample + "'>" + sample + "</a></span>";
                        break;
                    case "URLinkNoLang":
                        result += "<span><strong>Link : </strong><a target='_blank' href='" + sample + "'>" + sample + "</a></span>";
                        break;
                    case "RealEstateAds":
                        result += "";
                        break;
                    default:
                        result += "<span><strong>Örn. : </strong>" + sample.SplitText(0, 25) + "</span>";
                        break;
                }
            }
            else
            {
                result += "";
            }


            result += "</li>";

            return result;
        }
        public class AssignJson
        {
            public string Name { get; set; }
            public string FilterName { get; set; }
        }

        public JsonResult AssignIt(string data)
        {
            AssignerJson _type = JsonConvert.DeserializeObject<AssignerJson>(data);

            string result = "";

            int mtID = _type.MainTypeID.ToInteger();
            int ttID = _type.TargetTypeID.ToInteger();

            var assignments = entity.Assignments.Where(a => a.MainType == _type.MainType
                                                       && a.MainTypeID == mtID
                                                       && a.TargetType == _type.TargetType
                                                       && a.TargetTypeID == ttID).ToList();

            if (assignments.Count <= 0)
            {
                if (_type.MainType == "RealEstateAds")
                {
                    if (_type.TargetType != "Category")
                    {
                        result = "Emlaklar sadece Kategoriye atanabilir.";
                        goto bit;
                    }
                }

                var assignment = new Assignments()
                {
                    MainType = _type.MainType,
                    MainTypeID = _type.MainTypeID.ToInteger(),
                    TargetType = _type.TargetType,
                    TargetTypeID = _type.TargetTypeID.ToInteger()
                };

                entity.Assignments.Add(assignment);

                result = entity.SaveChanges() >= 0 ? "true" : "false";

                //if (_type.MainType != "Rank")
                //{
                //    result = TDHelper<Assignments>.Insert(new Assignments() { MainType = _type.MainType, MainTypeID = _type.MainTypeID.ToInteger(), TargetType = _type.TargetType, TargetTypeID = _type.TargetTypeID.ToInteger() }).Result.ToString().ToLower();
                //}
                //else
                //{
                //    if (TDHelper<Assignments>.Select(new List<Where>() { new Where(AssignmentsColumns.MainType, _type.MainType), new Where(AssignmentsColumns.MainTypeID, _type.MainTypeID.ToInteger()) }).DataCount > 0)
                //    {
                //        result = "Bir puanlama sadece bir türe ve sadece bir kere atanabilir.";
                //    }
                //    else
                //    {
                //        result = TDHelper<Assignments>.Insert(new Assignments() { MainType = _type.MainType, MainTypeID = _type.MainTypeID.ToInteger(), TargetType = _type.TargetType, TargetTypeID = _type.TargetTypeID.ToInteger() }).Result.ToString().ToLower();
                //    }
                //}
            }
            else
            {
                result = "Bu değerler daha önce zaten birbirlerine atanmışlar.";
            }

            bit:;

            if (result == null)
                return Json("true");
            else
                return Json(result);
        }

        public JsonResult RemoveIt(string data)
        {
            AssignerJson _type = JsonConvert.DeserializeObject<AssignerJson>(data);

            string result = "";

            int mtID = _type.MainTypeID.ToInteger();
            int ttID = _type.TargetTypeID.ToInteger();

            var assignments = entity.Assignments.Where(a => a.MainType == _type.MainType
                                                       && a.MainTypeID == mtID
                                                       && a.TargetType == _type.TargetType
                                                       && a.TargetTypeID == ttID).FirstOrDefault();

            if (assignments != null)
            {
                entity.Assignments.Remove(entity.Assignments.Find(assignments.ID));

                result = entity.SaveChanges() >= 0 ? "true" : "false";
            }
            else
            {
                result = "Bu değerler daha önce birbirlerine atanmamışlar.";
            }

            if (result == null)
                return Json("true");
            else
                return Json(result);
        }
        public class AssignerJson
        {
            public string MainType { get; set; }
            public string MainTypeID { get; set; }
            public string TargetType { get; set; }
            public string TargetTypeID { get; set; }
        }

        public JsonResult GetAssignItems(string data)
        {
            AssignItemsJson _data = JsonConvert.DeserializeObject<AssignItemsJson>(data);

            List<int> result = new List<int>();

            if (_data.MainType != null && _data.TargetType != null && _data.TargetTypeID != null)
            {
                int ttID = _data.TargetTypeID.ToInteger();

                var assignments = entity.Assignments.Where(a => a.MainType == _data.MainType
                                                             && a.TargetType == _data.TargetType
                                                             && a.TargetTypeID == ttID).ToList();

                if (assignments.Count > 0)
                {
                    foreach (var item in assignments)
                    {
                        int mtID = 0;

                        switch (_data.MainType)
                        {
                            case "Category":
                                var itemCategory = entity.Category.Where(a => a.ID == item.MainTypeID).FirstOrDefault();
                                if (itemCategory != null)
                                    mtID = itemCategory.ID;

                                break;
                            case "Content":
                                var itemContent = entity.Content.Where(a => a.ID == item.MainTypeID).FirstOrDefault();
                                if (itemContent != null)
                                    mtID = itemContent.ID;

                                break;
                            case "Gallery":
                                var itemGallery = entity.Gallery.Where(a => a.ID == item.MainTypeID).FirstOrDefault();
                                if (itemGallery != null)
                                    mtID = itemGallery.ID;

                                break;
                            case "Pictures":
                                var itemPictures = entity.Pictures.Where(a => a.ID == item.MainTypeID).FirstOrDefault();
                                if (itemPictures != null)
                                    mtID = itemPictures.ID;

                                break;
                            case "PicturesNoLang":
                                var itemPicturesNoLang = entity.PicturesNoLang.Where(a => a.ID == item.MainTypeID).FirstOrDefault();
                                if (itemPicturesNoLang != null)
                                    mtID = itemPicturesNoLang.ID;

                                break;
                            case "Files":
                                var itemFiles = entity.Files.Where(a => a.ID == item.MainTypeID).FirstOrDefault();
                                if (itemFiles != null)
                                    mtID = itemFiles.ID;

                                break;
                            case "FilesNoLang":
                                var itemFilesNoLang = entity.FilesNoLang.Where(a => a.ID == item.MainTypeID).FirstOrDefault();
                                if (itemFilesNoLang != null)
                                    mtID = itemFilesNoLang.ID;

                                break;
                            //case "Rank":
                            //    var itemRank = entity.Rank.Where(a => a.ID == item.MainTypeID).FirstOrDefault();
                            //    if (itemRank != null)
                            //        mtID = itemRank.ID;

                            //    break;
                            case "URLink":
                                var itemURLink = entity.URLink.Where(a => a.ID == item.MainTypeID).FirstOrDefault();
                                if (itemURLink != null)
                                    mtID = itemURLink.ID;

                                break;
                            case "URLinkNoLang":
                                var itemURLinkNoLang = entity.URLinkNoLang.Where(a => a.ID == item.MainTypeID).FirstOrDefault();
                                if (itemURLinkNoLang != null)
                                    mtID = itemURLinkNoLang.ID;

                                break;
                            case "RealEstateAds":
                                var itemRealEstateAds = entity.RealEstateAds.Where(a => a.ID == item.MainTypeID).FirstOrDefault();
                                if (itemRealEstateAds != null)
                                    mtID = itemRealEstateAds.ID;

                                break;
                        }

                        result.Add(mtID);
                    }
                }
            }

            return Json(result);
        }
        public class AssignItemsJson
        {
            public string TargetType { get; set; }
            public string TargetTypeID { get; set; }
            public string MainType { get; set; }
        }
    }
}
