using Repository.GaleriDilModel;
using Repository.IcerikDilModel;
using Repository.KategoriDilModel;
using Repository.MetalarDilModel;
using Repository.UrunDilModel;
using System.Collections.Generic;

namespace Repository.DilModel
{
    public interface IDil
    {
        int ID { get; set; }
        string TransName { get; set; }
        string ShortName { get; set; }
        string Flag { get; set; }
        bool Active { get; set; }
        bool Deleted { get; set; }

        string Mesaj { get; set; }

        List<MetalarDil> MetaTList { get; set; }
        List<IcerikDil> ContentTList { get; set; }
        List<KategoriDil> CategoryTList { get; set; }
        List<GaleriDil> GalleryTList { get; set; }
        List<UrunDil> ProductTList { get; set; }

        List<Dil> List();
        IDil Select(int id);
        bool Insert(IDil ceviri);
        bool Update(IDil ceviri);
        bool Delete(int id);
        bool Remove(int id);
    }
}
