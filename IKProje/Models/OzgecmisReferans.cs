using System;
using TDFramework.Common.TDModel;
using TDFramework.Common.Attributes;

namespace Models.OzgecmisReferansModel
{
	public class OzgecmisReferans : ITDModel
	{
		[PKey]
		[IDColumn]
		public int ID { get; set; }
		public int KullaniciID { get; set; }
		public string AdSoyad { get; set; }
		public string Sirket { get; set; }
		public string Gorev { get; set; }
		public string Telefon { get; set; }
		public string Mail { get; set; }
        public string Guid { get; set; }

		[AggregateColumn]
        public dynamic AggColumn { get; set; }

        [NotTableColumn]
        public bool Guncelle { get; set; }
	}

	public enum OzgecmisReferansColumns
	{
		ID,
		KullaniciID,
		AdSoyad,
		Sirket,
		Gorev,
		Telefon,
		Mail,
        Guid
	}
}
