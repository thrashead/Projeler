using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Xml;
using TDLibrary;
using TDTools;
using TDFramework;
using TDFramework.Common;
using Models.UsersModel;

namespace Projeler.Controllers
{
    public class AjaxController : Controller
    {
        public class SinsList<Tip, Tip2, Tip3>
        {
            public SinsList(Tip value, Tip2 value2, Tip3 value3)
            {
                this.Value = value;
                this.Value2 = value2;
                this.Value3 = value3;
            }

            public Tip Value { get; set; }
            public Tip2 Value2 { get; set; }
            public Tip3 Value3 { get; set; }
        }

        public JsonResult Sehirler(string SearchWord)
        {
            List<string> list = new List<string>();
            XmlReader reader = XmlReader.Create(Server.MapPath("~/Uploads/sehirler.xml"));
            while (reader.Read())
            {
                if ((reader.NodeType == XmlNodeType.Element) && (reader.Name == "sehir"))
                {
                    if (reader.GetAttribute("ad").ToString().ToLower().Contains(SearchWord.ToLower()))
                    {
                        list.Add(reader.GetAttribute("ad").ToString());
                    }
                }
            }
            reader.Close();

            return Json(list);
        }

        public JsonResult Sehirler2(string SearchWord)
        {
            Dictionary<string, string> list = new Dictionary<string, string>();
            XmlReader reader = XmlReader.Create(Server.MapPath("~/Uploads/sehirler.xml"));
            int i = 0;
            while (reader.Read())
            {
                if ((reader.NodeType == XmlNodeType.Element) && (reader.Name == "sehir"))
                {
                    if (reader.GetAttribute("ad").ToString().ToLower().Contains(SearchWord.ToLower()))
                    {
                        list.Add(reader.GetAttribute("ad").ToString(), i.ToString());
                        i++;
                    }
                }
            }
            reader.Close();

            return Json(list);
        }

        public JsonResult Sehirler3(string SearchWord)
        {
            List<SinsList<string, string, string>> list = new List<SinsList<string, string, string>>();
            XmlReader reader = XmlReader.Create(Server.MapPath("~/Uploads/sehirler.xml"));
            int i = 0;
            while (reader.Read())
            {
                if ((reader.NodeType == XmlNodeType.Element) && (reader.Name == "sehir"))
                {
                    if (reader.GetAttribute("ad").ToString().ToLower().Contains(SearchWord.ToLower()))
                    {
                        SinsList<string, string, string> sins = new SinsList<string, string, string>(reader.GetAttribute("ad").ToString(), i.ToString(), "../images/icon.jpg");
                        list.Add(sins);
                        i++;
                    }
                }
            }
            reader.Close();

            return Json(list);
        }

        public JsonResult MenuGetir(string MenuID)
        {
            List<SinsList<string, string, string>> list = new List<SinsList<string, string, string>>();

            XmlReader reader = XmlReader.Create(Server.MapPath("~/Uploads/menu.xml"));
            while (reader.Read())
            {
                if ((reader.NodeType == XmlNodeType.Element) && (reader.Name == "menu"))
                {
                    if (reader.GetAttribute("ParentID").ToString() == MenuID)
                    {
                        SinsList<string, string, string> sins = new SinsList<string, string, string>(reader.GetAttribute("ID").ToString(), reader.GetAttribute("CategoryName").ToString(), reader.GetAttribute("CategoryName").ToString().ToHyperLinkText());
                        list.Add(sins);
                    }
                }
            }

            return Json(list);
        }

        public JsonResult MenuGetir2(string MenuID)
        {
            List<string> list = new List<string>();

            XmlReader reader = XmlReader.Create(Server.MapPath("~/Uploads/menu.xml"));
            while (reader.Read())
            {
                if ((reader.NodeType == XmlNodeType.Element) && (reader.Name == "menu"))
                {
                    if (reader.GetAttribute("ParentID").ToString() == MenuID)
                    {
                        list.Add(reader.GetAttribute("ID").ToString() + "," + reader.GetAttribute("CategoryName").ToString() + "," + reader.GetAttribute("CategoryName").ToString().ToHyperLinkText());
                    }
                }
            }

            return Json(list.ToArray());
        }

        public JsonResult MenuGetir3(string MenuID)
        {
            List<string> list = new List<string>();

            XmlReader reader = XmlReader.Create(Server.MapPath("~/Uploads/menu.xml"));
            while (reader.Read())
            {
                if ((reader.NodeType == XmlNodeType.Element) && (reader.Name == "menu"))
                {
                    if (reader.GetAttribute("ParentID").ToString() == MenuID)
                    {
                        list.Add(reader.GetAttribute("ID").ToString() + "," + reader.GetAttribute("CategoryName").ToString() + "," + reader.GetAttribute("CategoryName").ToString().ToHyperLinkText());
                    }
                }
            }

            return Json(list);
        }

        #region Users Table

        public JsonResult UsersTable(string conditions)
        {
            TDConditions _table = TDConditions.DeserializeConditions(conditions);
            List<string> fieldOptions = TDConditions.ReturnFieldNames(_table.Fields);

            List<Where> whereList = new List<Where>();
            Select sel = new Select();


            if (!_table.SearchText.IsNull())
            {
                whereList.Add(new Where(UsersColumns.Username, _table.SearchText, Operators.LIKE));
            }

            if (_table.Top > 0)
            {
                sel.Top = _table.Top;
            }

            switch (_table.OrderBy)
            {
                case "ID": sel.OrderColumn = UsersColumns.ID; break;
                case "Username": sel.OrderColumn = UsersColumns.Username; break;
                case "Password": sel.OrderColumn = UsersColumns.Password; break;
                case "Active": sel.OrderColumn = UsersColumns.Active; break;
                default: sel.OrderColumn = UsersColumns.ID; break;
            }

            switch (_table.OrderDirection)
            {
                case "Asc": sel.OrderBy = OrderBy.ASC; break;
                case "Desc": sel.OrderBy = OrderBy.DESC; break;
                default: sel.OrderBy = OrderBy.ASC; break;
            }

            List<UsersColumns> columns = new List<UsersColumns>();

            foreach (string fieldOption in fieldOptions)
            {
                if (Enum.IsDefined(typeof(UsersColumns), fieldOption))
                {
                    UsersColumns _tempGP;
                    Enum.TryParse(fieldOption, out _tempGP);
                    columns.Add(_tempGP);
                }
            }

            List<Users> usersList = new List<Users>();
            ResultBox rb = TDHelper<Users>.Select(columns, sel, whereList);

            if (rb.HasData)
            {
                usersList = rb.Data as List<Users>;
            }

            return Json(usersList);
        }

        #endregion
    }
}
