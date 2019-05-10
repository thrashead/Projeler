using System;
using TDFramework.Common.TDModel;
using TDFramework.Common.Attributes;

namespace Models.OzgecmisSertifikaModel
{
	public class OzgecmisSertifika : ITDModel
	{
		[PKey]
		[IDColumn]
		public int ID { get; set; }
		public int KullaniciID { get; set; }
		public string Baslik { get; set; }
		public string Kurum { get; set; }
		public string Aciklama { get; set; }
		public string Tarih { get; set; }
		public string Guid { get; set; }

		[AggregateColumn]
        public dynamic AggColumn { get; set; }

        [NotTableColumn]
        public bool Guncelle { get; set; }
	}

	public enum OzgecmisSertifikaColumns
	{
		ID,
		KullaniciID,
		Baslik,
		Kurum,
		Aciklama,
		Tarih,
		Guid
	}
}
