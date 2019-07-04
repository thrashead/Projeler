export interface IKullanicilar {
    ID: number,
    //[Required(ErrorMessage = "Kullan�c� Ad� bo� olamaz ve en fazla 25 karakter olmal�d�r.")]
    //[StringLength(25)]
    Username: string,
    //[Required(ErrorMessage = "Ba�l� Grup alan� bo� olamaz.")]
    GroupID: number,
    Password: string,
    Active: boolean,
    LoginTime: string,
    Deleted: boolean,

    Mesaj: string,

    UserGroupsList: string[]
}
