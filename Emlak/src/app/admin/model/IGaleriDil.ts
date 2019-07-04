export interface IGaleriDil {
    ID: number,
    //[Required(ErrorMessage = "Baðlý Galeri alaný boþ olamaz.")]
    GalID: number,
    //[Required(ErrorMessage = "Dil alaný boþ olamaz.")]
    TransID: number,
    //[Required(ErrorMessage = "Galeri Adý alaný boþ olamaz ve en fazla 255 karakter olmalýdýr.")]
    //[StringLength(255)]
    GalleryName: string,
    ShortText1: string,
    ShortText2: string,
    //[DataType(DataType.MultilineText)]
    //[AllowHtml]
    Description: string,
    Deleted: boolean,

    Mesaj: string,

    GalleryList: any[],
    TranslationList: any[]
}