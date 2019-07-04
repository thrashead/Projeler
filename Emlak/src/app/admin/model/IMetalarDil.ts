export interface IMetalarDil {
    ID: number,
    //[Required(ErrorMessage = "Baðlý Meta alaný boþ olamaz.")]
    MetaID: number,
    //[Required(ErrorMessage = "Dil alaný boþ olamaz.")]
    TransID: number,
    //[Required(ErrorMessage = "Özellik alaný boþ olamaz ve en fazla 50 karakter olmalýdýr.")]
    //[StringLength(50)]
    Name: string,
    //[DataType(DataType.MultilineText)]
    //[Required(ErrorMessage = "Ýçerik alaný boþ olamaz.")]
    //[StringLength(int.MaxValue)]
    Content: string,
    Deleted: boolean,

    Mesaj: string,

    TranslationList: string[],
    MetaList: string[]
}
