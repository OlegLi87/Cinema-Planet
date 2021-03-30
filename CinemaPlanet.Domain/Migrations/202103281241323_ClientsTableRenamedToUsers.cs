namespace CinemaPlanet.Domain.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class ClientsTableRenamedToUsers : DbMigration
    {
        public override void Up()
        {
            RenameTable(name: "dbo.Clients", newName: "Users");
            RenameColumn(table: "dbo.Orders", name: "ClientId", newName: "UserId");
            RenameIndex(table: "dbo.Orders", name: "IX_ClientId", newName: "IX_UserId");
        }
        
        public override void Down()
        {
            RenameIndex(table: "dbo.Orders", name: "IX_UserId", newName: "IX_ClientId");
            RenameColumn(table: "dbo.Orders", name: "UserId", newName: "ClientId");
            RenameTable(name: "dbo.Users", newName: "Clients");
        }
    }
}
