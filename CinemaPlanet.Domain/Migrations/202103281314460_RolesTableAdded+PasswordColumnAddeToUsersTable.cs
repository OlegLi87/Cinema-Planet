namespace CinemaPlanet.Domain.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class RolesTableAddedPasswordColumnAddeToUsersTable : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.Roles",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Name = c.String(),
                    })
                .PrimaryKey(t => t.Id);
            
            CreateTable(
                "dbo.UserRoles",
                c => new
                    {
                        UserId = c.Int(nullable: false),
                        RoleId = c.Int(nullable: false),
                    })
                .PrimaryKey(t => new { t.UserId, t.RoleId })
                .ForeignKey("dbo.Users", t => t.UserId, cascadeDelete: true)
                .ForeignKey("dbo.Roles", t => t.RoleId, cascadeDelete: true)
                .Index(t => t.UserId)
                .Index(t => t.RoleId);
            
            AddColumn("dbo.Users", "Password", c => c.String(nullable: false, maxLength: 255));
            AlterColumn("dbo.Users", "UserName", c => c.String(nullable: false, maxLength: 255));
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.UserRoles", "RoleId", "dbo.Roles");
            DropForeignKey("dbo.UserRoles", "UserId", "dbo.Users");
            DropIndex("dbo.UserRoles", new[] { "RoleId" });
            DropIndex("dbo.UserRoles", new[] { "UserId" });
            AlterColumn("dbo.Users", "UserName", c => c.String(nullable: false, maxLength: 2550));
            DropColumn("dbo.Users", "Password");
            DropTable("dbo.UserRoles");
            DropTable("dbo.Roles");
        }
    }
}
