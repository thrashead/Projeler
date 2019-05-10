using System;
using TDFramework.Common.TDModel;
using TDFramework.Common.Attributes;

namespace Models.OzgecmisDeneyimModel
{
	public class OzgecmisDeneyim : ITDModel
	{
		[PKey]
		[IDColumn]
		public int ID { get; set; }
		public int KullaniciID { get; set; }
		public int Tip { get; set; }
		public string SirketIsmi { get; set; }
		public int Sehir { get; set; }
		public int Sektor { get; set; }
		public int Bolum { get; set; }
		public int Pozisyon { get; set; }
        public string GirisTarih { get; set; }
        public string CikisTarih { get; set; }
        public bool Devam { get; set; }
        public string Aciklama { get; set; }
        public string Guid { get; set; }

		[AggregateColumn]
		public dynamic AggColumn { get; set; }

        [NotTableColumn]
        public bool Guncelle { get; set; }
    }

	public enum OzgecmisDeneyimColumns
	{
		ID,
		KullaniciID,
		Tip,
		SirketIsmi,
		Sehir,
		Sektor,
		Bolum,
		Pozisyon,
		GirisTarih,
		CikisTarih,
        Devam,
		Aciklama,
        Guid
	}
}
