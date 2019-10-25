using System.Collections.Generic;

namespace Models
{
	public class DilIcerik
	{
		public DilIcerik()
		{
			LangContentTList = new List<DilIcerikDil>();
		}

		public int ID { get; set; }
		public string Title { get; set; }
		public string Code { get; set; }

		public string Mesaj { get; set; }

		public List<DilIcerikDil> LangContentTList { get; set; }
	}
}
