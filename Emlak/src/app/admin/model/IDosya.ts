export interface IDosya {
    ID: number,
    //[Required(ErrorMessage = "Baþlýk alaný boþ olamaz ve en fazla 50 karakter olmalýdýr.")]
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