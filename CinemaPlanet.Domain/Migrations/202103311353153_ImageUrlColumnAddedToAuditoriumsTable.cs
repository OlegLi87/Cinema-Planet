namespace CinemaPlanet.Domain.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class ImageUrlColumnAddedToAuditoriumsTable : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Auditoriums", "ImageUrl", c => c.String(maxLength: 255));
        }
        
        public override void Down()
        {
            DropColumn("dbo.Auditoriums", "ImageUrl");
        }
    }
}
