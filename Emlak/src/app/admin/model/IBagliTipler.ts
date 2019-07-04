import { IBaglantilar } from './IBaglantilar';

export interface IBagliTipler {
    ID: number,
    //[Required(ErrorMessage = "Ba�l�k alan� bo� olamaz ve en fazla 50 karakter olmal�d�r.")]
    //[StringLength(50)]
    Title: string,
    //[Required(ErrorMessage = "Ana Tip alan� bo� olamaz.")]
    MainTypeID: number,
    //[Required(ErrorMessage = "Ana Nesne alan� bo� olamaz.")]
    MainID: number,
    //[Required(ErrorMessage = "Ba�lanacak Tip alan� bo� olamaz.")]
    LinkedTypeID: number,
    Url: string,

    Mesaj: string,

    MainTypeList: string[],
    LinkedTypeList: string[],
    MainList: string[],
    LinkList: Array<IBaglantilar>,

    MainAdi: string,
    MainCategoryAdi: string,
    MainContentAdi: string,
    MainProductAdi: string,
    MainGalleryAdi: string,
    MainPictureAdi: string,
    MainFileAdi: string,
    MainMetaAdi: string,
    MainPropertyGroupAdi: string
}