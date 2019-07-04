export interface ILogIslem {
    ID: number,
    //[Required(ErrorMessage = "Log Tipi alaný boþ olamaz.")]
    LogTypeID: number,
    //[Required(ErrorMessage = "Ýsim alaný boþ olamaz ve en fazla 50 karakter olmalýdýr.")]
    //[StringLength(50)]
    Name: string,
    //[Required(ErrorMessage = "Kýsa Ýsim alaný boþ olamaz ve en fazla 5 karakter olmalýdýr.")]
    //[StringLength(5)]
    ShortName: string,
    Description: string,

    Mesaj: string,

    LogTypesList: any[]
}
