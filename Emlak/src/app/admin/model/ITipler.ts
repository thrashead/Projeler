export interface ITipler {
    ID: number,
    //[Required(ErrorMessage = "Tip �smi alan� bo� olamaz ve en fazla 50 karakter olmal�d�r.")]
    //[StringLength(50)]
    TypeName: string,
    //[Required(ErrorMessage = "Url alan� bo� olamaz ve en fazla 100 karakter olmal�d�r.")]
    //[StringLength(100)]
    Url: string,
    //[Required(ErrorMessage = "Tablo �smi alan� bo� olamaz ve en fazla 50 karakter olmal�d�r.")]
    //[StringLength(50)]
    TableName: string,
    Linkable: boolean,
    Show: boolean,

    Mesaj: string
}