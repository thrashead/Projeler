namespace Models
{
	public class FirmaIlanSartModel
	{
		public int ID { get; set; }
		public int IlanID { get; set; }
		public int CalismaSekli { get; set; }
		public int Cinsiyet { get; set; }
		public int Maas { get; set; }
		public string Sehir { get; set; }
		public bool SehirSor { get; set; }
		public string Egitim { get; set; }
		public string Deneyim { get; set; }
		public string Sektor { get; set; }
		public string Departman { get; set; }
		public string Pozisyon { get; set; }
	}
}
