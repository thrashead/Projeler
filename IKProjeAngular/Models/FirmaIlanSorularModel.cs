namespace Models
{
	public class FirmaIlanSorularModel
	{
		public int ID { get; set; }
		public int IlanID { get; set; }
		public bool TekCevapliSoru { get; set; }
		public string Soru { get; set; }
		public bool TekSecenekliCevap { get; set; }
		public string Secenekler { get; set; }
		public string Guid { get; set; }
	}
}
