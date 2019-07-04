export interface IGaleriDil {
    ID: number,
    //[Required(ErrorMessage = "Ba�l� Galeri alan� bo� olamaz.")]
    GalID: number,
    //[Required(ErrorMessage = "Dil alan� bo� olamaz.")]
    TransID: number,
    //[Required(ErrorMessage = "Galeri Ad� alan� bo� olamaz ve en fazla 255 karakter olmal�d�r.")]
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