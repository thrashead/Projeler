using System;
using TDFramework.Common.TDModel;
using TDFramework.Common.Attributes;

namespace Models.FirmaIlanSartModel
{
	public class FirmaIlanSart : ITDModel
	{
		[PKey]
		[IDColumn]
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

		[AggregateColumn]
		public dynamic AggColumn { get; set; }

        [NotTableColumn]
        public string IlanNo { get; set; }
    }

	public enum FirmaIlanSartColumns
	{
		ID,
		IlanID,
		CalismaSekli,
		Cinsiyet,
		Maas,
		Sehir,
		SehirSor,
		Egitim,
		Deneyim,
		Sektor,
		Departman,
		Pozisyon
	}
}
