export interface IResim {
    ID: number,
    //[Required(ErrorMessage = "Baþlýk alaný boþ olamaz ve en fazla 50 karakter olmalýdýr.")]
    //[StringLength(50)]
    Title: string,
    //[DataType(DataType.MultilineText)]
    //[AllowHtml]
    Description: string,
    PictureUrl: string,
    ThumbUrl: string,
    Code: string,
    Active: boolean,
    Deleted: boolean,

    Mesaj: string,

    OldPictureUrl: string,
    OldThumbUrl: string,
    HasFile: boolean,

    TypesList: string[]
}
