using System;
using TDFramework.Common.TDModel;
using TDFramework.Common.Attributes;

namespace Models.OzgecmisCalismaModel
{
	public class OzgecmisCalisma : ITDModel
	{
		[PKey]
		[IDColumn]
		public int ID { get; set; }
		public int KullaniciID { get; set; }
        public string MeslekUnvan { get; set; }
		public int CalismaDurumu { get; set; }
		public int ToplamDeneyim { get; set; }
		public string KisiselBilgi { get; set; }

		[AggregateColumn]
		public dynamic AggColumn { get; set; }
	}

	public enum OzgecmisCalismaColumns
	{
		ID,
		KullaniciID,
		MeslekUnvan,
		CalismaDurumu,
		ToplamDeneyim,
		KisiselBilgi
	}
}
