namespace CinemaPlanet.Domain.Migrations
{
    using System;
    using System.Data.Entity.Migrations;

    public partial class NameColumnChangedToUserNameInUsersTable : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Users", "UserName", c => c.String(nullable: false, maxLength: 255));
            DropColumn("dbo.Users", "Name");
        }

        public override void Down()
        {
            AddColumn("dbo.Users", "Name", c => c.String(nullable: false, maxLength: 255));
            DropColumn("dbo.Users", "UserName");
        }
    }
}
