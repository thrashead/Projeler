namespace Models
{
	public class OnyaziModel
	{
		public int ID { get; set; }
		public string Baslik { get; set; }
		public string Aciklama { get; set; }
		public int KullaniciID { get; set; }
		public bool Aktif { get; set; }
		public string Guid { get; set; }
	}
}
