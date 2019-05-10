using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Web;
using System.Web.Mvc;
using TDLibrary;
using Newtonsoft.Json;

namespace Emlak.Areas.Ajax.Controllers
{
    public class CommonController : Controller
    {
        #region PictureUpload

        public JsonResult UploadPicture()
        {
            Response.ContentType = "application/json";
            Response.ContentEncoding = Encoding.UTF8;
            System.IO.Stream body = Request.InputStream;
            System.Text.Encoding encoding = Request.ContentEncoding;
            System.IO.StreamReader reader = new System.IO.StreamReader(body, encoding);
            string value = reader.ReadToEnd();

            HttpPostedFileBase uploadedFile = Request.Files["FileData"];
            try
            {
                string _filename = uploadedFile.FileName.Replace("." + uploadedFile.FileName.Split('.').Last(), "") + "-" + Guider.GetGuid(5) + "." + uploadedFile.FileName.Split('.').Last();
                uploadedFile.SaveAs(Server.MapPath(Path.Combine("~/Uploads/Gallery", Path.GetFileName(_filename))));

                System.Drawing.Image img = System.Drawing.Image.FromFile(Server.MapPath(Path.Combine("~/Uploads/Gallery", Path.GetFileName(_filename))));
                img.CreateThumb(Server.MapPath(Path.Combine("~/Uploads/Gallery/Thumb", Path.GetFileName(_filename))), 180);

                return Json(new { data = _filename });
            }
            catch
            {
            }

            return Json(new { data = "" });
        }

        #endregion

        #region FileUpload

        public JsonResult UploadFile()
        {
            Response.ContentType = "application/json";
            Response.ContentEncoding = Encoding.UTF8;
            System.IO.Stream body = Request.InputStream;
            System.Text.Encoding encoding = Request.ContentEncoding;
            System.IO.StreamReader reader = new System.IO.StreamReader(body, encoding);
            string value = reader.ReadToEnd();

            HttpPostedFileBase uploadedFile = Request.Files["FileData"];
            try
            {
                string _filename = uploadedFile.FileName.Replace("." + uploadedFile.FileName.Split('.').Last(), "") + "-" + Guider.GetGuid(5) + "." + uploadedFile.FileName.Split('.').Last();
                uploadedFile.SaveAs(Server.MapPath(Path.Combine("~/Uploads/File", Path.GetFileName(_filename))));

                return Json(new { data = _filename });
            }
            catch
            {
            }

            return Json(new { data = "" });
        }

        #endregion

        #region Delete Temp Pics

        public JsonResult DeleteTempPics(string tempPics)
        {
            TempPicsJson tp = JsonConvert.DeserializeObject<TempPicsJson>(tempPics);
            try
            {
                tempPics = tp.TempPic.Trim(',');
                if (!tempPics.IsNull())
                {
                    string[] pics = tempPics.Split(',');

                    foreach (string item in pics)
                    {
                        try
                        {
                            System.IO.File.Delete(Server.MapPath("~/Uploads/Gallery/" + item));
                            System.IO.File.Delete(Server.MapPath("~/Uploads/Gallery/Thumb/" + item));
                        }
                        catch
                        {
                        }
                    }
                }
            }
            catch
            {
            }

            return Json(true);
        }
        public class TempPicsJson
        {
            public string TempPic { get; set; }
        }

        #endregion

        #region Delete Temp Files

        public JsonResult DeleteTempFiles(string tempFiles)
        {
            TempFilesJson tp = JsonConvert.DeserializeObject<TempFilesJson>(tempFiles);
            try
            {
                tempFiles = tp.TempFile.Trim(',');
                if (!tempFiles.IsNull())
                {
                    string[] pics = tempFiles.Split(',');

                    foreach (string item in pics)
                    {
                        try
                        {
                            System.IO.File.Delete(Server.MapPath("~/Uploads/File/" + item));
                        }
                        catch
                        {
                        }
                    }
                }
            }
            catch
            {
            }

            return Json(true);
        }
        public class TempFilesJson
        {
            public string TempFile { get; set; }
        }

        #endregion
    }
}
