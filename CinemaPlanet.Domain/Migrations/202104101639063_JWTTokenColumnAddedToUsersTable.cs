﻿namespace CinemaPlanet.Domain.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class JWTTokenColumnAddedToUsersTable : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Users", "JWTToken", c => c.String());
        }
        
        public override void Down()
        {
            DropColumn("dbo.Users", "JWTToken");
        }
    }
}