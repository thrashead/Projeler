namespace Models
{
	public class OzgecmisDeneyimModel
	{
		public int ID { get; set; }
		public int KullaniciID { get; set; }
		public int Tip { get; set; }
		public string SirketIsmi { get; set; }
		public int SehirID { get; set; }
		public int SektorID { get; set; }
		public int BolumID { get; set; }
		public int PozisyonID { get; set; }
		public string GirisTarih { get; set; }
		public string CikisTarih { get; set; }
		public bool Devam { get; set; }
		public string Aciklama { get; set; }
		public string Guid { get; set; }
	}
}
