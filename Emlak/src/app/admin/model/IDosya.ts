export interface IDosya {
    ID: number,
    //[Required(ErrorMessage = "Ba�l�k alan� bo� olamaz ve en fazla 50 karakter olmal�d�r.")]
    //[StringLength(50)]
    Title: string,
    //[DataType(DataType.MultilineText)]
    //[AllowHtml]
    Description: string,
    FileUrl: string,
    Code: string,
    Active: boolean,
    Deleted: boolean,

    Mesaj: string,

    OldFileUrl: string,
    HasFile: boolean,

    TypesList: string[]
}