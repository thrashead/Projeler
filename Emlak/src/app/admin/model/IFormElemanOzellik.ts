export interface IFormElemanOzellik {
    ID: number,
    //[Required(ErrorMessage = "Baðlý Özellik alaný boþ olamaz.")]
    PropID: number,
    //[Required(ErrorMessage = "Ýsim alaný boþ olamaz ve en fazla 50 karakter olmalýdýr.")]
    //[StringLength(50)]
    Name: string,
    //[Required(ErrorMessage = "Deðer alaný boþ olamaz ve en fazla 255 karakter olmalýdýr.")]
    //[StringLength(255)]
    Value: string,

    Mesaj: string,

    PropertyList: string[]
}