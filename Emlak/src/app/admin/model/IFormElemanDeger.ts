export interface IFormElemanDeger {
    ID: number,
    //[Required(ErrorMessage = "Ba�l� �zellik alan� bo� olamaz.")]
    PropID: number,
    Text: string,
    //[Required(ErrorMessage = "De�er alan� bo� olamaz ve en fazla 50 karakter olmal�d�r.")]
    //[StringLength(50)]
    Value: string,
    Code: string,

    Mesaj: string,

    PropertyList: any[]
}