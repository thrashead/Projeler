using System;
using TDFramework.Common.TDModel;
using TDFramework.Common.Attributes;

namespace Models.OzgecmisDosyaModel
{
	public class OzgecmisDosya : ITDModel
	{
		[PKey]
		[IDColumn]
		public int ID { get; set; }
		public int KullaniciID { get; set; }
		public string Baslik { get; set; }
		public string Dosya { get; set; }
		public string Guid { get; set; }

		[AggregateColumn]
		public dynamic AggColumn { get; set; }
	}

	public enum OzgecmisDosyaColumns
	{
		ID,
		KullaniciID,
		Baslik,
		Dosya,
		Guid
	}
}
