using System.Collections.Generic;

namespace Models
{
    public class FooterModel
    {
        public FooterModel()
        {
            this.Categories = new List<CategoryLangModel>();
        }

        public List<CategoryLangModel> Categories;
        public string Description;
    }
}
