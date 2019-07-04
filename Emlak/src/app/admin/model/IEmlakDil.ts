export interface IEmlakDil {
    ID: number,
    //[Required(ErrorMessage = "Ba�l� Emlak alan� bo� olamaz.")]
    RealEsID: number,
    //[Required(ErrorMessage = "Dil alan� bo� olamaz.")]
    TransID: number,
    //[Required(ErrorMessage = "Ba�l�k alan� bo� olamaz ve en fazla 255 karakter olmal�d�r.")]
    //[StringLength(255)]
    Baslik: string,
    Code: string,
    //[DataType(DataType.MultilineText)]
    //[AllowHtml]
    Aciklama: string,

    Mesaj: string,

    RealEstatesList: string[],
    TranslationList: string[]
}