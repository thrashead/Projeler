export interface IResim {
    ID: number,
    //[Required(ErrorMessage = "Ba�l�k alan� bo� olamaz ve en fazla 50 karakter olmal�d�r.")]
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
