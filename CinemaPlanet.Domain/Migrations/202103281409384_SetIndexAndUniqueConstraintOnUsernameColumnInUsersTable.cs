﻿namespace CinemaPlanet.Domain.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class SetIndexAndUniqueConstraintOnUsernameColumnInUsersTable : DbMigration
    {
        public override void Up()
        {
            CreateIndex("dbo.Users", "UserName", unique: true);
        }
        
        public override void Down()
        {
            DropIndex("dbo.Users", new[] { "UserName" });
        }
    }
}
