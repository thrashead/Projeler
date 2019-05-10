using System;
using TDFramework.Common.TDModel;
using TDFramework.Common.Attributes;

namespace Models.OzgecmisTercihModel
{
	public class OzgecmisTercih : ITDModel
	{
		[PKey]
		[IDColumn]
        public int ID { get; set; }
        public int KullaniciID { get; set; }
		public string Sektor { get; set; }
		public string Bolum { get; set; }
		public string Pozisyon { get; set; }
		public int Maas { get; set; }

		[AggregateColumn]
		public dynamic AggColumn { get; set; }
	}

	public enum OzgecmisTercihColumns
	{
		ID,
        KullaniciID,
		Sektor,
		Bolum,
		Pozisyon,
		Maas
	}
}
