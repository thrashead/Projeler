export interface IUrunDil {
    ID: number,
    //[Required(ErrorMessage = "Ba�l� �r�n alan� bo� olamaz.")]
    ProdID: number,
    //[Required(ErrorMessage = "Dil alan� bo� olamaz.")]
    TransID: number,
    //[Required(ErrorMessage = "�r�n Ad� alan� bo� olamaz ve en fazla 255 karakter olmal�d�r.")]
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