using System;
using TDFramework.Common.TDModel;
using TDFramework.Common.Attributes;

namespace Models.SehirModel
{
	public class Sehir : ITDModel
	{
		[PKey]
		[IDColumn]
		public int ID { get; set; }
        [TableColumn(Name = "Sehir")]
		public string SehirAdi { get; set; }
		public int Kod { get; set; }
		public bool Aktif { get; set; }
		public bool Goster { get; set; }
		public int? Sira { get; set; }
		public string Guid { get; set; }

		[AggregateColumn]
		public dynamic AggColumn { get; set; }
	}

	public enum SehirColumns
	{
		ID,
        SehirAdi,
		Kod,
		Aktif,
		Goster,
		Sira,
		Guid
	}
}
