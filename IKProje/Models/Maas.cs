using System;
using TDFramework.Common.TDModel;
using TDFramework.Common.Attributes;

namespace Models.MaasModel
{
	public class Maas : ITDModel
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

	public enum MaasColumns
	{
		ID,
		Baslik,
		Kod,
		Aktif,
		Guid
	}
}
