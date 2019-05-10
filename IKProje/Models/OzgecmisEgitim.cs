using System;
using TDFramework.Common.TDModel;
using TDFramework.Common.Attributes;

namespace Models.OzgecmisEgitimModel
{
	public class OzgecmisEgitim : ITDModel
	{
		[PKey]
		[IDColumn]
		public int ID { get; set; }
		public int KullaniciID { get; set; }
		public int Seviye { get; set; }
		public string Okul { get; set; }
		public string Fakulte { get; set; }
		public string Bolum { get; set; }
		public int Sehir { get; set; }
		public string BaslangicTarih { get; set; }
		public string BitisTarih { get; set; }
		public bool Devam { get; set; }
		public int Burs { get; set; }
        public string Ortalama { get; set; }
        public string Guid { get; set; }

		[AggregateColumn]
        public dynamic AggColumn { get; set; }

        [NotTableColumn]
        public bool Guncelle { get; set; }
	}

	public enum OzgecmisEgitimColumns
	{
		ID,
		KullaniciID,
		Seviye,
		Okul,
		Fakulte,
		Bolum,
		Sehir,
		BaslangicTarih,
		BitisTarih,
		Devam,
		Burs,
		Ortalama,
        Guid
	}
}
