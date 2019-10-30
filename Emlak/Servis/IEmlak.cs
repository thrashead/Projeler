using System.Collections.Generic;
using System.Runtime.Serialization;
using System.ServiceModel;
using System.ServiceModel.Web;

namespace Emlak.Servis
{
    [ServiceContract]
    public interface IEmlakService
    {
        [OperationContract]
        [WebGet(UriTemplate = "/Ilan/?ilanurl={ilanurl}", ResponseFormat = WebMessageFormat.Json)]
        PropertyData Ilan(string ilanurl);

        [OperationContract]
        [WebGet(UriTemplate = "/Ilanlar/?kelime={kelime}&adet={adet}", ResponseFormat = WebMessageFormat.Json)]
        List<PropertyData> Ilanlar(string kelime, string adet);
        
        [OperationContract]
        [WebGet(UriTemplate = "/KategoriIlanlar/?kategori={kategori}", ResponseFormat = WebMessageFormat.Json)]
        List<PropertyData> KategoriIlanlar(string kategori);

        [OperationContract]
        [WebGet(UriTemplate = "/Kategoriler/?parentid={parentid}", ResponseFormat = WebMessageFormat.Json)]
        List<CategoryData> Kategoriler(string parentid);

        [OperationContract]
        [WebGet(UriTemplate = "/Galeri/?ilanurl={ilanurl}&isthumb={isthumb}", ResponseFormat = WebMessageFormat.Json)]
        List<GalleryData> Galeri(string ilanurl, string isthumb);

        [OperationContract]
        [WebGet(UriTemplate = "/Ozellikler/?ilanurl={ilanurl}", ResponseFormat = WebMessageFormat.Json)]
        SpecsData Ozellikler(string ilanurl);

        [OperationContract]
        [WebGet(UriTemplate = "/Haberler/", ResponseFormat = WebMessageFormat.Json)]
        List<NewsData> Haberler();

        [OperationContract]
        [WebGet(UriTemplate = "/Haber/?haberurl={haberurl}", ResponseFormat = WebMessageFormat.Json)]
        NewsData Haber(string haberurl);

        [OperationContract]
        [WebGet(UriTemplate = "/Bilgiler/", ResponseFormat = WebMessageFormat.Json)]
        List<ContentData> Bilgiler();

        [OperationContract]
        [WebGet(UriTemplate = "/Icerik/?contenturl={contenturl}", ResponseFormat = WebMessageFormat.Json)]
        ContentData Icerik(string contenturl);

        [OperationContract]
        [WebGet(UriTemplate = "/Resim/?kelime={kelime}", ResponseFormat = WebMessageFormat.Json)]
        ResimData Resim(string kelime);

        //Android İçin Deneme
        //[OperationContract]
        //[WebInvoke(Method = "POST",
        //    UriTemplate = "/HaberEkle/",
        //    ResponseFormat = WebMessageFormat.Json,
        //    BodyStyle = WebMessageBodyStyle.Wrapped,
        //    RequestFormat = WebMessageFormat.Json)]
        //bool HaberEkle(NewsData newsData);
    }

    [DataContract]
    public class PropertyData
    {
        [DataMember]
        public string ID { get; set; }
        [DataMember]
        public string KatID { get; set; }
        [DataMember]
        public string AltKatID { get; set; }
        [DataMember]
        public string Baslik { get; set; }
        [DataMember]
        public string Fiyat { get; set; }
        [DataMember]
        public string Sehir { get; set; }
        [DataMember]
        public string Resim { get; set; }
        [DataMember]
        public string Ilce { get; set; }
        [DataMember]
        public string Semt { get; set; }
        [DataMember]
        public string Url { get; set; }
        [DataMember]
        public string Icerik { get; set; }
        [DataMember]
        public string Sahip { get; set; }
        [DataMember]
        public string Kod { get; set; }
        [DataMember]
        public string Enlem { get; set; }
        [DataMember]
        public string Boylam { get; set; }
        [DataMember]
        public string KategoriAdi { get; set; }
        [DataMember]
        public string Yeni { get; set; }
    }

    [DataContract]
    public class CategoryData
    {
        [DataMember]
        public string ID { get; set; }
        [DataMember]
        public string ParentID { get; set; }
        [DataMember]
        public string CategoryName { get; set; }
        [DataMember]
        public string Url { get; set; }
        [DataMember]
        public List<CategoryData> SubCategories { get; set; }

    }

    [DataContract]
    public class GalleryData
    {
        [DataMember]
        public string Picture { get; set; }
    }

    [DataContract]
    public class SpecsData
    {
        [DataMember]
        public string OdaSayisi { get; set; }
        [DataMember]
        public string KatSayisi { get; set; }
        [DataMember]
        public string IsinmaTipi { get; set; }
        [DataMember]
        public string SalonSayisi { get; set; }
        [DataMember]
        public string BulunduguKat { get; set; }
        [DataMember]
        public string YakitTipi { get; set; }
        [DataMember]
        public string Alan { get; set; }
        [DataMember]
        public string Durum { get; set; }
        [DataMember]
        public string BinaYasi { get; set; }
        [DataMember]
        public string ArkaCephe { get; set; }
        [DataMember]
        public string OnCephe { get; set; }
        [DataMember]
        public string CaddeyeYakin { get; set; }
        [DataMember]
        public string DenizeSifir { get; set; }
        [DataMember]
        public string DenizeYakin { get; set; }
        [DataMember]
        public string Manzara { get; set; }
        [DataMember]
        public string Merkezde { get; set; }
        [DataMember]
        public string Metro { get; set; }
        [DataMember]
        public string Otoban { get; set; }
        [DataMember]
        public string TopluUlasim { get; set; }
        [DataMember]
        public string Asansor { get; set; }
        [DataMember]
        public string Bahce { get; set; }
        [DataMember]
        public string Guvenlik { get; set; }
        [DataMember]
        public string Hidrofor { get; set; }
        [DataMember]
        public string Mantolama { get; set; }
        [DataMember]
        public string Jenerator { get; set; }
        [DataMember]
        public string Kapici { get; set; }
        [DataMember]
        public string Otopark { get; set; }
        [DataMember]
        public string OyunParki { get; set; }
        [DataMember]
        public string PVCDograma { get; set; }
        [DataMember]
        public string SiteIci { get; set; }
        [DataMember]
        public string YanginMerdiveni { get; set; }
        [DataMember]
        public string YuzmeHavuzu { get; set; }
        [DataMember]
        public string Alarm { get; set; }
        [DataMember]
        public string Balkon { get; set; }
        [DataMember]
        public string CelikKapi { get; set; }
        [DataMember]
        public string GoruntuluDiafon { get; set; }
        [DataMember]
        public string Jakuzi { get; set; }
        [DataMember]
        public string KabloTVUydu { get; set; }
        [DataMember]
        public string Klima { get; set; }
    }

    [DataContract]
    public class NewsData
    {
        [DataMember]
        public string Title { get; set; }
        [DataMember]
        public string Content { get; set; }
        [DataMember]
        public string Url { get; set; }
    }

    [DataContract]
    public class ContentData
    {
        [DataMember]
        public string Name { get; set; }
        [DataMember]
        public string Image { get; set; }
        [DataMember]
        public string Content { get; set; }
        [DataMember]
        public string Url { get; set; }
    }

    [DataContract]
    public class ResimData
    {
        [DataMember]
        public string ImageUrl { get; set; }
    }
}
