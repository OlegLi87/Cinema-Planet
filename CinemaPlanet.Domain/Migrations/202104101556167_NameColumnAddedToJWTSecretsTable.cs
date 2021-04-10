namespace CinemaPlanet.Domain.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class NameColumnAddedToJWTSecretsTable : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.JWTSecrets", "Name", c => c.String(nullable: false));
        }
        
        public override void Down()
        {
            DropColumn("dbo.JWTSecrets", "Name");
        }
    }
}
