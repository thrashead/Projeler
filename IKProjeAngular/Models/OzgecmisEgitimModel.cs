namespace Models
{
	public class OzgecmisEgitimModel
	{
		public int ID { get; set; }
		public int KullaniciID { get; set; }
		public int SeviyeID { get; set; }
		public string Okul { get; set; }
		public string Fakulte { get; set; }
		public string Bolum { get; set; }
		public int SehirID { get; set; }
		public string BaslangicTarih { get; set; }
		public string BitisTarih { get; set; }
		public bool Devam { get; set; }
		public int BursID { get; set; }
		public string Ortalama { get; set; }
		public string Guid { get; set; }
	}
}
