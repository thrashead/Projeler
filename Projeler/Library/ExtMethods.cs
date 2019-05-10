using System;
using System.Collections.Generic;
using System.Drawing;
using System.Drawing.Drawing2D;
using System.Drawing.Imaging;
using System.Globalization;
using System.Security.Cryptography;
using System.Text;
using System.Text.RegularExpressions;
using System.Web;
using System.Linq;

namespace Library
{
    public static class ExtMethods
    {
        #region ToHyperLinkText - Yazıyı hiperlinke çevirir. toLower param true giderse harfleri küçültür.

        public static string ToHyperLinkText(this string _text, bool _toLower)
        {
            if (_toLower)
                _text = _text.ToLower();

            _text = HyperLinkTextReplacer(_text);
            _text = _text.MakeSingle("-").Trim('-');

            return _text;
        }
        public static string ToHyperLinkText(this string _text)
        {
            _text = HyperLinkTextReplacer(_text);
            _text = _text.MakeSingle("-").Trim('-');

            return _text;
        }
        private static string HyperLinkTextReplacer(string _text)
        {
            _text = _text.Replace("&amp;", "");
            _text = _text.Replace("&#304;", "İ");
            _text = _text.Replace("&#305;", "ı");
            _text = _text.Replace("&#214;", "Ö");
            _text = _text.Replace("&#246;", "ö");
            _text = _text.Replace("&#220;", "Ü");
            _text = _text.Replace("&#252;", "ü");
            _text = _text.Replace("&#199;", "Ç");
            _text = _text.Replace("&#231;", "ç");
            _text = _text.Replace("&#286;", "Ğ");
            _text = _text.Replace("&#287;", "ğ");
            _text = _text.Replace("&#350;", "Ş");
            _text = _text.Replace("&#351;", "ş");
            _text = _text.Replace("%c4%9e", "Ğ");
            _text = _text.Replace("%c4%9f", "ğ");
            _text = _text.Replace("%c3%9c", "Ü");
            _text = _text.Replace("%c3%bc", "ü");
            _text = _text.Replace("%c5%9e", "Ş");
            _text = _text.Replace("%c5%9f", "ş");
            _text = _text.Replace("%c4%b0", "İ");
            _text = _text.Replace("%c4%b1", "ı");
            _text = _text.Replace("%c3%96", "Ö");
            _text = _text.Replace("%c3%b6", "ö");
            _text = _text.Replace("%c3%87", "Ç");
            _text = _text.Replace("%c3%a7", "ç");

            _text = _text.Replace(" ", "-");
            _text = _text.Replace("?", "-");
            _text = _text.Replace("%", "-");
            _text = _text.Replace("½", "-");
            _text = _text.Replace("$", "-");
            _text = _text.Replace("#", "-");
            _text = _text.Replace("£", "-");
            _text = _text.Replace("!", "-");
            _text = _text.Replace("^", "-");
            _text = _text.Replace("'", "-");
            _text = _text.Replace("&", "-");
            _text = _text.Replace("/", "-");
            _text = _text.Replace("*", "-");
            _text = _text.Replace("\\", "-");
            _text = _text.Replace("[", "-");
            _text = _text.Replace("]", "-");
            _text = _text.Replace("{", "-");
            _text = _text.Replace("}", "-");
            //text = text.Replace("(", "-");
            //text = text.Replace(")", "-");
            _text = _text.Replace("+", "-");
            _text = _text.Replace("é", "-");
            _text = _text.Replace("\"", "-");
            _text = _text.Replace(",", "-");
            _text = _text.Replace(".", "-");
            _text = _text.Replace("~", "-");
            _text = _text.Replace(";", "-");
            _text = _text.Replace(":", "-");
            _text = _text.Replace("<", "-");
            _text = _text.Replace(">", "-");
            _text = _text.Replace("|", "-");
            _text = _text.Replace("@", "-");
            _text = _text.Replace("æ", "-");
            _text = _text.Replace("ß", "-");
            _text = _text.Replace("¨", "-");

            _text = _text.Replace("Ğ", "G");
            _text = _text.Replace("ğ", "g");
            _text = _text.Replace("Ü", "U");
            _text = _text.Replace("ü", "u");
            _text = _text.Replace("Ş", "S");
            _text = _text.Replace("ş", "s");
            _text = _text.Replace("İ", "I");
            _text = _text.Replace("ı", "i");
            _text = _text.Replace("Ö", "O");
            _text = _text.Replace("ö", "o");
            _text = _text.Replace("Ç", "C");
            _text = _text.Replace("ç", "c");
            _text = _text.Replace("â", "a");
            _text = _text.Replace("Â", "a");

            _text = Regex.Replace(_text, @"[^\u0000-\u007F]", string.Empty);

            _text = Regex.Replace(_text, @"[^\u0000-\u007F]", string.Empty);

            return _text;
        }

        #endregion

        #region MakeSingle - 2 tane yanyana aynı string geliyorsa tekleyene kadar döner. ("---" -> "-") veya ("alialialiali" -> "ali")

        public static string MakeSingle(this string _text, string _changeText)
        {
            do
            {
                _text = _text.Replace(_changeText + _changeText, _changeText);
            } while (_text.Contains(_changeText + _changeText));

            return _text;
        }

        #endregion

        #region IsNull - String Boş mu değil mi kontrol eder

        public static bool IsNull(this string text)
        {
            return String.IsNullOrEmpty(text);
        }

        #endregion
    }
}
