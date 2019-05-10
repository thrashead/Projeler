using System;
using TDFramework.Common.TDModel;
using TDFramework.Common.Attributes;

namespace Models.OzgecmisBilgisayarModel
{
	public class OzgecmisBilgisayar : ITDModel
	{
		[PKey]
		[IDColumn]
		public int ID { get; set; }
		public int KullaniciID { get; set; }
		public int Tip { get; set; }
		public string Baslik { get; set; }
		public string Seviye { get; set; }
		public string Guid { get; set; }

		[AggregateColumn]
		public dynamic AggColumn { get; set; }
	}

	public enum OzgecmisBilgisayarColumns
	{
		ID,
		KullaniciID,
		Tip,
		Baslik,
		Seviye,
		Guid
	}
}
