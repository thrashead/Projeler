export interface IFormElemanDeger {
    ID: number,
    //[Required(ErrorMessage = "Baðlý Özellik alaný boþ olamaz.")]
    PropID: number,
    Text: string,
    //[Required(ErrorMessage = "Deðer alaný boþ olamaz ve en fazla 50 karakter olmalýdýr.")]
    //[StringLength(50)]
    Value: string,
    Code: string,

    Mesaj: string,

    PropertyList: any[]
}