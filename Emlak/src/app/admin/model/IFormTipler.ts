export interface IFormTipler {
    ID: number,
    //[Required(ErrorMessage = "�sim alan� bo� olamaz ve en fazla 50 karakter olmal�d�r.")]
    //[StringLength(50)]
    Name: string,
    //[Required(ErrorMessage = "Tip alan� bo� olamaz ve en fazla 50 karakter olmal�d�r.")]
    //[StringLength(50)]
    Type: string,
    //[Required(ErrorMessage = "K�sa �sim alan� bo� olamaz ve en fazla 25 karakter olmal�d�r.")]
    //[StringLength(25)]
    ShortName: string,
    HasValue: boolean,

    Mesaj: string
}