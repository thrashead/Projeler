using System.Collections.Generic;
using System.Web.Mvc;

namespace Models
{
	public class ContentLangModel
	{
		public int? ID { get; set; }
		public int? ContentID { get; set; }
		public string ContentName { get; set; }
		public string Code { get; set; }
		public string ShortText { get; set; }
		public string Description { get; set; }
		public int? Language { get; set; }
        public string RouteUrl { get; set; }

        public List<SelectListItem> ContentContentIDList { get; set; }
		public List<SelectListItem> LangLanguageList { get; set; }

		public string ContentContentIDItem { get; set; }
		public string LangLanguageItem { get; set; }
	}
}
