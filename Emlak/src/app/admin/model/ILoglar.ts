export interface ILoglar {
    ID: number,
    //[Required(ErrorMessage = "Kullan�c� alan� bo� olamaz.")]
    UserID: number,
    //[Required(ErrorMessage = "Log ��lemi alan� bo� olamaz.")]
    LogProcessID: number,
    //[Required(ErrorMessage = "��lem Zaman� alan� bo� olamaz ve en fazla 50 karakter olmal�d�r.")]
    //[StringLength(50)]
    ProcessTime: string,
    Description: string,

    Mesaj: string
}
