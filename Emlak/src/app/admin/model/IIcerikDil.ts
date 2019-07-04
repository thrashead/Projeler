export interface IIcerikDil {
    ID: number,
    //[Required(ErrorMessage = "Baðlý Ýçerik alaný boþ olamaz.")]
    ContID: number,
    //[Required(ErrorMessage = "Dil alaný boþ olamaz.")]
    TransID: number,
    //[Required(ErrorMessage = "Ýçerik Adý alaný boþ olamaz ve en fazla 255 karakter olmalýdýr.")]
    //[StringLength(255)]
    ContentName: string,
    ShortText1: string,
    ShortText2: string,
    //[DataType(DataType.MultilineText)]
    //[AllowHtml]
    Description: string,
    Deleted: boolean,

    Mesaj: string,

    ContentList: any[],
    TranslationList: any[]
}