using System;
using TDFramework.Common.TDModel;
using TDFramework.Common.Attributes;

namespace Models.AramaKayitModel
{
	public class AramaKayit : ITDModel
	{
		[PKey]
		[IDColumn]
		public int ID { get; set; }
		public string Baslik { get; set; }
		public string Sozcuk { get; set; }
		public bool SozcukTumu { get; set; }
		public string Sehir { get; set; }
		public int Tarih { get; set; }
		public string CalismaTipi { get; set; }
		public string Sektor { get; set; }
		public string Departman { get; set; }
		public string Pozisyon { get; set; }
		public string Egitim { get; set; }
		public string Tecrube { get; set; }
		public string Diger { get; set; }
		public int Cinsiyet { get; set; }
		public int KullaniciID { get; set; }
		public bool Aktif { get; set; }
		public string Guid { get; set; }

		[AggregateColumn]
		public dynamic AggColumn { get; set; }
	}

	public enum AramaKayitColumns
	{
		ID,
		Baslik,
		Sozcuk,
		SozcukTumu,
		Sehir,
		Tarih,
		CalismaTipi,
		Sektor,
		Departman,
		Pozisyon,
		Egitim,
		Tecrube,
		Diger,
		Cinsiyet,
		KullaniciID,
		Aktif,
		Guid
	}
}
