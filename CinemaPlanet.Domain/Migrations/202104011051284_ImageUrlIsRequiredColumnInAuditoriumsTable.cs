namespace CinemaPlanet.Domain.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class ImageUrlIsRequiredColumnInAuditoriumsTable : DbMigration
    {
        public override void Up()
        {
            AlterColumn("dbo.Auditoriums", "ImageUrl", c => c.String(nullable: false, maxLength: 255));
        }
        
        public override void Down()
        {
            AlterColumn("dbo.Auditoriums", "ImageUrl", c => c.String(maxLength: 255));
        }
    }
}
