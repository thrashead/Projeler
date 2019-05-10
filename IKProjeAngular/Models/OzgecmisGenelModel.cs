namespace Models
{
	public class OzgecmisGenelModel
	{
		public int ID { get; set; }
		public int KullaniciID { get; set; }
		public int SehirID { get; set; }
		public string Telefon { get; set; }
		public string Mail { get; set; }
		public string DogumTarih { get; set; }
		public int CinsiyetID { get; set; }
		public int MedeniHalID { get; set; }
		public int AskerlikID { get; set; }
		public string AskerlikTarih { get; set; }
		public bool Ehliyet { get; set; }
		public string EhliyetSinif { get; set; }
		public bool Sigara { get; set; }
		public int Egitim { get; set; }
	}
}
