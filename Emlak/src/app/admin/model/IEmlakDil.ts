export interface IEmlakDil {
    ID: number,
    //[Required(ErrorMessage = "Baðlý Emlak alaný boþ olamaz.")]
    RealEsID: number,
    //[Required(ErrorMessage = "Dil alaný boþ olamaz.")]
    TransID: number,
    //[Required(ErrorMessage = "Baþlýk alaný boþ olamaz ve en fazla 255 karakter olmalýdýr.")]
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