import { IGaleriDil } from './IGaleriDil';

export interface IGaleri {
    ID: number,
    //[Required(ErrorMessage = "Ba�l�k alan� bo� olamaz ve en fazla 255 karakter olmal�d�r.")]
    //[StringLength(255)]
    Title: string,
    Url: string,
    Code: string,
    Active: boolean,
    Deleted: boolean,

    Mesaj: string,

    GalleryTList: Array<IGaleriDil>
}