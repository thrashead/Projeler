export interface IKullanicilar {
    ID: number,
    //[Required(ErrorMessage = "Kullanýcý Adý boþ olamaz ve en fazla 25 karakter olmalýdýr.")]
    //[StringLength(25)]
    Username: string,
    //[Required(ErrorMessage = "Baðlý Grup alaný boþ olamaz.")]
    GroupID: number,
    Password: string,
    Active: boolean,
    LoginTime: string,
    Deleted: boolean,

    Mesaj: string,

    UserGroupsList: string[]
}
