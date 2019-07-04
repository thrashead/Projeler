import { IUrunDil } from './IUrunDil';
import { IMetalarDil } from './IMetalarDil';
import { IIcerikDil } from './IIcerikDil';
import { IKategoriDil } from './IKategoriDil';
import { IGaleriDil } from './IGaleriDil';

export interface IDil {
    ID: number,
    //[Required(ErrorMessage = "Dil alan� bo� olamaz ve en fazla 25 karakter olmal�d�r.")]
    //[StringLength(25)]
    TransName: string,
    //[Required(ErrorMessage = "K�saltma alan� bo� olamaz ve en fazla 5 karakter olmal�d�r.")]
    //[StringLength(5)]
    ShortName: string,
    Flag: string,
    Active: boolean,
    Deleted: boolean,

    Mesaj: string,

    OldFlag: string,
    HasFile: boolean,

    MetaTList: Array<IMetalarDil>,
    ContentTList: Array<IIcerikDil>,
    CategoryTList: Array<IKategoriDil>,
    GalleryTList: Array<IGaleriDil>,
    ProductTList: Array<IUrunDil>
}