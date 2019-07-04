import { IKullaniciGrupTablo } from './IKullaniciGrupTablo';
import { IKullaniciGrupHak } from './IKullaniciGrupHak';
import { IKullanicilar } from './IKullanicilar';

export interface IKullaniciGrup {
    ID: number,
    //[Required(ErrorMessage = "Ýsim alaný boþ olamaz ve en fazla 25 karakter olmalýdýr.")]
    //[StringLength(25)]
    Name: string,
    //[Required(ErrorMessage = "Kýsa Ýsim alaný boþ olamaz ve en fazla 5 karakter olmalýdýr.")]
    //[StringLength(5)]
    ShortName: string,
    Description: string,

    Mesaj: string,

    UserGroupTablesList: Array<IKullaniciGrupTablo>,
    UserGroupRightsList: Array<IKullaniciGrupHak>,
    UsersList: Array<IKullanicilar>
}
