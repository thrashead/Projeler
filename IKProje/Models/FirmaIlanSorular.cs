using System;
using TDFramework.Common.TDModel;
using TDFramework.Common.Attributes;

namespace Models.FirmaIlanSorularModel
{
	public class FirmaIlanSorular : ITDModel
	{
		[PKey]
		[IDColumn]
		public int ID { get; set; }
		public int IlanID { get; set; }
		public bool TekCevapliSoru { get; set; }
		public string Soru { get; set; }
		public bool TekSecenekliCevap { get; set; }
        public string Secenekler { get; set; }
        public string Guid { get; set; }

		[AggregateColumn]
        public dynamic AggColumn { get; set; }

        [NotTableColumn]
        public string IlanNo { get; set; }
	}

	public enum FirmaIlanSorularColumns
	{
		ID,
		IlanID,
		TekCevapliSoru,
		Soru,
		TekSecenekliCevap,
		Secenekler,
        Guid
	}
}
