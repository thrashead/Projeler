namespace Models
{
	public class FirmaModel
	{
		public int ID { get; set; }
		public string SirketAdi { get; set; }
		public string Ad { get; set; }
		public string Soyad { get; set; }
		public string KullaniciAdi { get; set; }
		public long TCKimlikNo { get; set; }
		public string Eposta { get; set; }
		public string Sifre { get; set; }
		public int Sektor { get; set; }
		public int Sehir { get; set; }
		public string Telefon { get; set; }
		public string CepTelefon { get; set; }
		public string Faks { get; set; }
		public string Website { get; set; }
		public string Hakkinda { get; set; }
		public string Logo { get; set; }
		public bool Aktif { get; set; }
		public bool HaberUyelik { get; set; }
		public string Guid { get; set; }
		public string Url { get; set; }
	}
}
