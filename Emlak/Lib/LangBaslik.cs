using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Xml;

namespace Emlak
{
    public class LangBaslik
    {
        public int Lang_ID { get; set; }
        public string Code { get; set; }
        public string TR { get; set; }
        public string EN { get; set; }

        public static List<LangBaslik> Liste()
        {
            List<LangBaslik> _list = new List<LangBaslik>();
            XmlReader oku = XmlReader.Create(HttpContext.Current.Server.MapPath("~/App_Data/language.xml"));
            try
            {
                while (oku.Read())
                {
                    if (oku.NodeType == XmlNodeType.Element && oku.Name == "Lang")
                    {
                        _list.Add(new LangBaslik()
                        {
                            Code = oku.GetAttribute("Code").ToString(),
                            TR = oku.GetAttribute("TR").ToString(),
                            EN = oku.GetAttribute("EN").ToString(),
                        });
                    }
                }
            }
            catch
            {
            }
            finally
            {
                oku.Close();
            }

            return _list;
        }

        public static string KodlaGetir(string kod, bool turkce = false)
        {
            string sonuc = "";
            try
            {
                if (HttpContext.Current.Application["LangBaslik"] == null)
                {
                    List<LangBaslik> _list = LangBaslik.Liste();

                    HttpContext.Current.Application["LangBaslik"] = _list;

                    _list = LangBaslik.Liste().Where(a => a.Code == kod).ToList();

                    if (_list.Count > 0)
                    {
                        if (turkce == false)
                        {
                            if (HttpContext.Current.Session["lang"] != null)
                            {
                                if (HttpContext.Current.Session["lang"].ToString() == "TR")
                                    sonuc = _list.FirstOrDefault().TR;
                                else if (HttpContext.Current.Session["lang"].ToString() == "EN")
                                    sonuc = _list.FirstOrDefault().EN;
                                else
                                    sonuc = _list.FirstOrDefault().TR;
                            }
                            else
                            {
                                sonuc = _list.FirstOrDefault().TR;
                            }
                        }
                        else
                        {
                            sonuc = _list.FirstOrDefault().TR;
                        }
                    }
                }
                else
                {
                    List<LangBaslik> _list = HttpContext.Current.Application["LangBaslik"] as List<LangBaslik>;
                    _list = _list.Where(a => a.Code == kod).ToList();

                    if (_list.Count > 0)
                    {
                        if (turkce == false)
                        {
                            if (HttpContext.Current.Session["lang"] != null)
                            {
                                if (HttpContext.Current.Session["lang"].ToString() == "TR")
                                    sonuc = _list.FirstOrDefault().TR;
                                else if (HttpContext.Current.Session["lang"].ToString() == "EN")
                                    sonuc = _list.FirstOrDefault().EN;
                                else
                                    sonuc = _list.FirstOrDefault().TR;
                            }
                            else
                            {
                                sonuc = _list.FirstOrDefault().TR;
                            }
                        }
                        else
                        {
                            sonuc = _list.FirstOrDefault().TR;
                        }
                    }
                }
            }
            catch
            {
            }
            finally
            {
            }

            return sonuc;
        }
    }
}