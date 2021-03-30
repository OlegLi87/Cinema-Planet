namespace CinemaPlanet.Domain.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class DescriptionAndImageUrlColumnsAddedToMoviesTable : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Movies", "Description", c => c.String(nullable: false));
            AddColumn("dbo.Movies", "ImageUrl", c => c.String(nullable: false));
        }
        
        public override void Down()
        {
            DropColumn("dbo.Movies", "ImageUrl");
            DropColumn("dbo.Movies", "Description");
        }
    }
}
