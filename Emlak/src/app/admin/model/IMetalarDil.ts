export interface IMetalarDil {
    ID: number,
    //[Required(ErrorMessage = "Ba�l� Meta alan� bo� olamaz.")]
    MetaID: number,
    //[Required(ErrorMessage = "Dil alan� bo� olamaz.")]
    TransID: number,
    //[Required(ErrorMessage = "�zellik alan� bo� olamaz ve en fazla 50 karakter olmal�d�r.")]
    //[StringLength(50)]
    Name: string,
    //[DataType(DataType.MultilineText)]
    //[Required(ErrorMessage = "��erik alan� bo� olamaz.")]
    //[StringLength(int.MaxValue)]
    Content: string,
    Deleted: boolean,

    Mesaj: string,

    TranslationList: string[],
    MetaList: string[]
}
