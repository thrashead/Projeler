export interface IIcerikDil {
    ID: number,
    //[Required(ErrorMessage = "Ba�l� ��erik alan� bo� olamaz.")]
    ContID: number,
    //[Required(ErrorMessage = "Dil alan� bo� olamaz.")]
    TransID: number,
    //[Required(ErrorMessage = "��erik Ad� alan� bo� olamaz ve en fazla 255 karakter olmal�d�r.")]
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