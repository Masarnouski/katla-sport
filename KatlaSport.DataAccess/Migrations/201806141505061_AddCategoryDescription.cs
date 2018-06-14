namespace KatlaSport.DataAccess.Migrations
{
    using System.Data.Entity.Migrations;

    /// <summary>
    /// Migration, which adds the property "Description' into ProductCategory EFmodel
    /// </summary>
    public partial class AddCategoryDescription : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.product_categories", "category_description", c => c.String(maxLength: 300));
        }

        public override void Down()
        {
            DropColumn("dbo.product_categories", "category_description");
        }
    }
}
