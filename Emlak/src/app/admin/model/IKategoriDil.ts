export interface IKategoriDil {
    ID: number,
    //[Required(ErrorMessage = "Ba�l� Kategori alan� bo� olamaz.")]
    CatID: number,
    //[Required(ErrorMessage = "Dil alan� bo� olamaz.")]
    TransID: number,
    //[Required(ErrorMessage = "Kategori Ad� alan� bo� olamaz ve en fazla 255 karakter olmal�d�r.")]
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