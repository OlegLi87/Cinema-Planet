namespace CinemaPlanet.Domain.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class JWTSecretsTableAdded : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.JWTSecrets",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Secret = c.String(nullable: false),
                    })
                .PrimaryKey(t => t.Id);
            
        }
        
        public override void Down()
        {
            DropTable("dbo.JWTSecrets");
        }
    }
}
