using System;
using TDFramework.Common.TDModel;
using TDFramework.Common.Attributes;

namespace Models.FirmaIlanModel
{
	public class FirmaIlan : ITDModel
	{
		[PKey]
		[IDColumn]
		public int ID { get; set; }
		public int FirmaID { get; set; }
        public string IlanNo { get; set; }
        public string Baslik { get; set; }
		public string Aciklama { get; set; }
		public string BaslangicTarih { get; set; }
		public string BitisTarih { get; set; }
		public bool SoruAktifArac { get; set; }
		public bool SoruHaftaSonu { get; set; }
		public bool Aktif { get; set; }
		public bool Silindi { get; set; }
        public string Guid { get; set; }

		[AggregateColumn]
		public dynamic AggColumn { get; set; }
	}

	public enum FirmaIlanColumns
	{
		ID,
		FirmaID,
        IlanNo,
        Baslik,
		Aciklama,
		BaslangicTarih,
		BitisTarih,
		SoruAktifArac,
		SoruHaftaSonu,
		Aktif,
		Silindi,
		Guid
	}
}
