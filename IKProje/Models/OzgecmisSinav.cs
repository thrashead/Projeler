using System;
using TDFramework.Common.TDModel;
using TDFramework.Common.Attributes;

namespace Models.OzgecmisSinavModel
{
	public class OzgecmisSinav : ITDModel
	{
		[PKey]
		[IDColumn]
		public int ID { get; set; }
		public int KullaniciID { get; set; }
		public string Baslik { get; set; }
		public string Kurum { get; set; }
		public string Tarih { get; set; }
		public string Puan { get; set; }
		public string Aciklama { get; set; }
		public string Guid { get; set; }

		[AggregateColumn]
        public dynamic AggColumn { get; set; }

        [NotTableColumn]
        public bool Guncelle { get; set; }
	}

	public enum OzgecmisSinavColumns
	{
		ID,
		KullaniciID,
		Baslik,
		Kurum,
		Tarih,
		Puan,
		Aciklama,
		Guid
	}
}
