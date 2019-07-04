import { IMetalarDil } from './IMetalarDil';

export interface IMetalar {
    ID: number,
    //[Required(ErrorMessage = "Baþlýk alaný boþ olamaz ve en fazla 255 karakter olmalýdýr.")]
    //[StringLength(255)]
    Title: string,
    Code: string,
    Active: boolean,
    Deleted: boolean,

    Mesaj: string,

    MetaTList: Array<IMetalarDil>
}
