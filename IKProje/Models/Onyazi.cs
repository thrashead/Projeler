using System;
using TDFramework.Common.TDModel;
using TDFramework.Common.Attributes;

namespace Models.OnyaziModel
{
	public class Onyazi : ITDModel
	{
		[PKey]
		[IDColumn]
		public int ID { get; set; }
		public string Baslik { get; set; }
		public string Aciklama { get; set; }
        public int KullaniciID { get; set; }
        public bool Aktif { get; set; }
		public string Guid { get; set; }

		[AggregateColumn]
		public dynamic AggColumn { get; set; }
	}

	public enum OnyaziColumns
	{
		ID,
		Baslik,
		Aciklama,
        KullaniciID,
		Aktif,
		Guid
	}
}
