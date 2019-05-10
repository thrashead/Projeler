using System;
using TDFramework.Common.TDModel;
using TDFramework.Common.Attributes;

namespace Models.KullaniciModel
{
	public class Kullanici : ITDModel
	{
		[PKey]
		[IDColumn]
		public int ID { get; set; }
		public string Ad { get; set; }
		public string Soyad { get; set; }
		public string KullaniciAdi { get; set; }
		public string Sifre { get; set; }
		public string Eposta { get; set; }
		public string Telefon { get; set; }
        public string Hakkinda { get; set; }
        public int Sehir { get; set; }
        public string Resim { get; set; }
		public int Cinsiyet { get; set; }
		public bool OzgecmisAktif { get; set; }
		public DateTime SonGiris { get; set; }
		public bool Aktif { get; set; }
		public bool HaberUyelik { get; set; }
		public string Guid { get; set; }

		[AggregateColumn]
		public dynamic AggColumn { get; set; }
	}

	public enum KullaniciColumns
	{
		ID,
		Ad,
		Soyad,
		KullaniciAdi,
		Sifre,
		Eposta,
		Telefon,
		Hakkinda,
        Sehir,
        Resim,
		Cinsiyet,
		OzgecmisAktif,
		SonGiris,
		Aktif,
		HaberUyelik,
		Guid
	}
}
