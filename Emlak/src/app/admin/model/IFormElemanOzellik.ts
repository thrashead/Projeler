export interface IFormElemanOzellik {
    ID: number,
    //[Required(ErrorMessage = "Ba�l� �zellik alan� bo� olamaz.")]
    PropID: number,
    //[Required(ErrorMessage = "�sim alan� bo� olamaz ve en fazla 50 karakter olmal�d�r.")]
    //[StringLength(50)]
    Name: string,
    //[Required(ErrorMessage = "De�er alan� bo� olamaz ve en fazla 255 karakter olmal�d�r.")]
    //[StringLength(255)]
    Value: string,

    Mesaj: string,

    PropertyList: string[]
}