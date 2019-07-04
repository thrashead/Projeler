export interface ILoglar {
    ID: number,
    //[Required(ErrorMessage = "Kullanýcý alaný boþ olamaz.")]
    UserID: number,
    //[Required(ErrorMessage = "Log Ýþlemi alaný boþ olamaz.")]
    LogProcessID: number,
    //[Required(ErrorMessage = "Ýþlem Zamaný alaný boþ olamaz ve en fazla 50 karakter olmalýdýr.")]
    //[StringLength(50)]
    ProcessTime: string,
    Description: string,

    Mesaj: string
}
