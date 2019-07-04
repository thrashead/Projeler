import { IKategoriDil } from './IKategoriDil';

export interface IKategori {
    ID: number,
    //[Required(ErrorMessage = "Ana Kategori alan� bo� olamaz.")]
    ParentID: number,
    //[Required(ErrorMessage = "Ba�l�k alan� bo� olamaz ve en fazla 255 karakter olmal�d�r.")]
    //[StringLength(255)]
    Title: string,
    Url: string,
    Code: string,
    Active: boolean,
    Deleted: boolean,

    Mesaj: string,

    CategoryTList: Array<IKategoriDil>,
    ParentCategories: any[]
}