namespace Models
{
	public class OzgecmisSertifikaModel
	{
		public int ID { get; set; }
		public int KullaniciID { get; set; }
		public string Baslik { get; set; }
		public string Kurum { get; set; }
		public string Aciklama { get; set; }
		public string Tarih { get; set; }
		public string Guid { get; set; }
	}
}
