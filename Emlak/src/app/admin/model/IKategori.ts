import { IKategoriDil } from './IKategoriDil';

export interface IKategori {
    ID: number,
    //[Required(ErrorMessage = "Ana Kategori alaný boþ olamaz.")]
    ParentID: number,
    //[Required(ErrorMessage = "Baþlýk alaný boþ olamaz ve en fazla 255 karakter olmalýdýr.")]
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