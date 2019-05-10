using System;
using TDFramework.Common.TDModel;
using TDFramework.Common.Attributes;

namespace Models.OzgecmisGenelModel
{
	public class OzgecmisGenel : ITDModel
	{
		[PKey]
		[IDColumn]
		public int ID { get; set; }
		public int KullaniciID { get; set; }
		public int Sehir { get; set; }
		public string Telefon { get; set; }
		public string Mail { get; set; }
		public string DogumTarih { get; set; }
		public int Cinsiyet { get; set; }
		public int MedeniHal { get; set; }
		public int Askerlik { get; set; }
		public string AskerlikTarih { get; set; }
		public bool Ehliyet { get; set; }
		public string EhliyetSinif { get; set; }
        public bool Sigara { get; set; }
        public int Egitim { get; set; }

		[AggregateColumn]
		public dynamic AggColumn { get; set; }
	}

	public enum OzgecmisGenelColumns
	{
		ID,
		KullaniciID,
		Sehir,
		Telefon,
		Mail,
		DogumTarih,
		Cinsiyet,
		MedeniHal,
		Askerlik,
		AskerlikTarih,
		Ehliyet,
		EhliyetSinif,
		Sigara,
        Egitim
	}
}
