export interface IUrunDil {
    ID: number,
    //[Required(ErrorMessage = "Baðlý Ürün alaný boþ olamaz.")]
    ProdID: number,
    //[Required(ErrorMessage = "Dil alaný boþ olamaz.")]
    TransID: number,
    //[Required(ErrorMessage = "Ürün Adý alaný boþ olamaz ve en fazla 255 karakter olmalýdýr.")]
    //[StringLength(255)]
    ProductName: string,
    ShortText1: string,
    ShortText2: string,
    //[DataType(DataType.MultilineText)]
    //[AllowHtml]
    Description: string,
    Deleted: boolean,

    Mesaj: string,

    TranslationList: string[],
    ProductList: string[]
}