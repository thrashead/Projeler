using System.Collections.Generic;
using System.Web.Mvc;

namespace Models
{
	public class DilIcerikDil
	{
		public DilIcerikDil()
		{
			LangContentList = new List<SelectListItem>();
			TranslationList = new List<SelectListItem>();
		}

		public int ID { get; set; }
		public int LangContID { get; set; }
		public int TransID { get; set; }
		public string Text { get; set; }

		public string Mesaj { get; set; }

		public List<SelectListItem> LangContentList { get; set; }
		public List<SelectListItem> TranslationList { get; set; }

		public string LangContentAdi { get; set; }
		public string TranslationAdi { get; set; }
	}
}
