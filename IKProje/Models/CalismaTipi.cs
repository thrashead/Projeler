using System;
using TDFramework.Common.TDModel;
using TDFramework.Common.Attributes;

namespace Models.CalismaTipiModel
{
	public class CalismaTipi : ITDModel
	{
		[PKey]
		[IDColumn]
		public int ID { get; set; }
		public string Baslik { get; set; }
		public int Kod { get; set; }
		public bool Aktif { get; set; }
		public string Guid { get; set; }

		[AggregateColumn]
		public dynamic AggColumn { get; set; }
	}

	public enum CalismaTipiColumns
	{
		ID,
		Baslik,
		Kod,
		Aktif,
		Guid
	}
}
