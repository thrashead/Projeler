export interface IBaglantilar {
    ID: number,
    //[Required(ErrorMessage = "Baðlý Tip alaný boþ olamaz.")]
    LinkTypeID: number,
    //[Required(ErrorMessage = "Baðlý Nesne alaný boþ olamaz.")]
    LinkID: number,

    Mesaj: string,

    LinkTypesList: string[],
    LinkedItemList: string[],

    LinkedTypeID: number,
    LinkedTypeAdi: string,

    LinkedAdi: string,
    LinkedCategoryAdi: string,
    LinkedContentAdi: string,
    LinkedProductAdi: string,
    LinkedGalleryAdi: string,
    LinkedPictureAdi: string,
    LinkedFileAdi: string,
    LinkedMetaAdi: string,
    LinkedPropertyGroupAdi: string
}
