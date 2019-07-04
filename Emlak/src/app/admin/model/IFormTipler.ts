export interface IFormTipler {
    ID: number,
    //[Required(ErrorMessage = "Ýsim alaný boþ olamaz ve en fazla 50 karakter olmalýdýr.")]
    //[StringLength(50)]
    Name: string,
    //[Required(ErrorMessage = "Tip alaný boþ olamaz ve en fazla 50 karakter olmalýdýr.")]
    //[StringLength(50)]
    Type: string,
    //[Required(ErrorMessage = "Kýsa Ýsim alaný boþ olamaz ve en fazla 25 karakter olmalýdýr.")]
    //[StringLength(25)]
    ShortName: string,
    HasValue: boolean,

    Mesaj: string
}