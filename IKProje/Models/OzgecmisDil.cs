using System;
using TDFramework.Common.TDModel;
using TDFramework.Common.Attributes;

namespace Models.OzgecmisDilModel
{
	public class OzgecmisDil : ITDModel
	{
		[PKey]
		[IDColumn]
		public int ID { get; set; }
		public int KullaniciID { get; set; }
		public string Dil { get; set; }
		public string Okuma { get; set; }
		public string Yazma { get; set; }
		public string Konusma { get; set; }
		public string Guid { get; set; }

		[AggregateColumn]
		public dynamic AggColumn { get; set; }
	}

	public enum OzgecmisDilColumns
	{
		ID,
		KullaniciID,
		Dil,
		Okuma,
		Yazma,
		Konusma,
		Guid
	}
}
