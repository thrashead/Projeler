import { IMetalarDil } from './IMetalarDil';

export interface IMetalar {
    ID: number,
    //[Required(ErrorMessage = "Ba�l�k alan� bo� olamaz ve en fazla 255 karakter olmal�d�r.")]
    //[StringLength(255)]
    Title: string,
    Code: string,
    Active: boolean,
    Deleted: boolean,

    Mesaj: string,

    MetaTList: Array<IMetalarDil>
}
