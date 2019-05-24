using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Models
{
    public class Emlak
	{
        public Emlak()
        {
            RealEstatesTList = new List<EmlakDil>();
        }

        public int ID { get; set; }
        [Required(ErrorMessage = "Başlık alanı boş olamaz ve en fazla 255 karakter olmalıdır.")]
        [StringLength(255)]
        public string Baslik { get; set; }
		public string Code { get; set; }
        [Required(ErrorMessage = "Fiyat alanı boş olamaz.")]
        public int Fiyat { get; set; }
		public bool Yeni { get; set; }
		public bool GununEmlagi { get; set; }
		public string Sehir { get; set; }
		public string Ilce { get; set; }
		public string Semt { get; set; }
		public string Sahibi { get; set; }
		public int? OdaSayisi { get; set; }
		public int? KatSayisi { get; set; }
		public string IsinmaTipi { get; set; }
		public int? SalonSayisi { get; set; }
		public int? BulunduguKat { get; set; }
		public string YakitTipi { get; set; }
		public int? Alan { get; set; }
		public string Durum { get; set; }
		public int? BinaYasi { get; set; }
		public bool ArkaCephe { get; set; }
		public bool OnCephe { get; set; }
		public bool CaddeyeYakin { get; set; }
		public bool DenizeSifir { get; set; }
		public bool DenizeYakin { get; set; }
		public bool Manzara { get; set; }
		public bool Merkezde { get; set; }
		public bool Metro { get; set; }
		public bool Otoban { get; set; }
		public bool TopluUlasim { get; set; }
		public bool Asansor { get; set; }
		public bool Bahce { get; set; }
		public bool Guvenlik { get; set; }
		public bool Hidrofor { get; set; }
		public bool Mantolama { get; set; }
		public bool Jenerator { get; set; }
		public bool Kapici { get; set; }
		public bool Satilik { get; set; }
		public bool Otopark { get; set; }
		public bool OyunParki { get; set; }
		public bool PVCDograma { get; set; }
		public bool SiteIci { get; set; }
		public bool YanginMerdiveni { get; set; }
		public bool YuzmeHavuzu { get; set; }
		public bool Alarm { get; set; }
		public bool Balkon { get; set; }
		public bool CelikKapi { get; set; }
		public bool GoruntuluDiafon { get; set; }
		public bool Jakuzi { get; set; }
		public bool KabloTVUydu { get; set; }
		public bool Klima { get; set; }
		public bool Active { get; set; }
		public string Url { get; set; }
		public string Enlem { get; set; }
		public string Boylam { get; set; }

        public string Mesaj { get; set; }

        public List<EmlakDil> RealEstatesTList { get; set; }
    }
}
