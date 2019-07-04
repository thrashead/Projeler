export interface ITipler {
    ID: number,
    //[Required(ErrorMessage = "Tip Ýsmi alaný boþ olamaz ve en fazla 50 karakter olmalýdýr.")]
    //[StringLength(50)]
    TypeName: string,
    //[Required(ErrorMessage = "Url alaný boþ olamaz ve en fazla 100 karakter olmalýdýr.")]
    //[StringLength(100)]
    Url: string,
    //[Required(ErrorMessage = "Tablo Ýsmi alaný boþ olamaz ve en fazla 50 karakter olmalýdýr.")]
    //[StringLength(50)]
    TableName: string,
    Linkable: boolean,
    Show: boolean,

    Mesaj: string
}