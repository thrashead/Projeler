export interface IKategoriDil {
    ID: number,
    //[Required(ErrorMessage = "Baðlý Kategori alaný boþ olamaz.")]
    CatID: number,
    //[Required(ErrorMessage = "Dil alaný boþ olamaz.")]
    TransID: number,
    //[Required(ErrorMessage = "Kategori Adý alaný boþ olamaz ve en fazla 255 karakter olmalýdýr.")]
    //[StringLength(255)]
    CategoryName: string,
    ShortText1: string,
    ShortText2: string,
    //[DataType(DataType.MultilineText)]
    //[AllowHtml]
    Description: string,
    Deleted: boolean,

    Mesaj: string,

    TranslationList: any[],
    CategoryList: any[]
}