namespace CinemaPlanet.Domain.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class TablesCreated : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.Auditoriums",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Name = c.String(nullable: false, maxLength: 255),
                        BasicSeatsCapacity = c.Byte(nullable: false),
                        SilverSeatsCapacity = c.Byte(nullable: false),
                        GoldSeatsCapacity = c.Byte(nullable: false),
                    })
                .PrimaryKey(t => t.Id);
            
            CreateTable(
                "dbo.MovieSessions",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        AuditoriumId = c.Int(nullable: false),
                        MovieId = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Movies", t => t.MovieId, cascadeDelete: true)
                .ForeignKey("dbo.Auditoriums", t => t.AuditoriumId, cascadeDelete: true)
                .Index(t => t.AuditoriumId)
                .Index(t => t.MovieId);
            
            CreateTable(
                "dbo.Movies",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Name = c.String(nullable: false, maxLength: 255),
                        ReleaseDate = c.DateTime(nullable: false),
                        Genre = c.Byte(nullable: false),
                        BasicSeatPrice = c.Single(nullable: false),
                        SilverSeatPrice = c.Single(nullable: false),
                        GoldSeatPrice = c.Single(nullable: false),
                    })
                .PrimaryKey(t => t.Id);
            
            CreateTable(
                "dbo.Orders",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        SeatType = c.Byte(nullable: false),
                        SeatNumber = c.Byte(nullable: false),
                        MovieSessionId = c.Int(nullable: false),
                        ClientId = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Clients", t => t.ClientId, cascadeDelete: true)
                .ForeignKey("dbo.MovieSessions", t => t.MovieSessionId, cascadeDelete: true)
                .Index(t => t.MovieSessionId)
                .Index(t => t.ClientId);
            
            CreateTable(
                "dbo.Clients",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Name = c.String(nullable: false, maxLength: 2550),
                        BirthDate = c.DateTime(nullable: false),
                    })
                .PrimaryKey(t => t.Id);
            
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.MovieSessions", "AuditoriumId", "dbo.Auditoriums");
            DropForeignKey("dbo.Orders", "MovieSessionId", "dbo.MovieSessions");
            DropForeignKey("dbo.Orders", "ClientId", "dbo.Clients");
            DropForeignKey("dbo.MovieSessions", "MovieId", "dbo.Movies");
            DropIndex("dbo.Orders", new[] { "ClientId" });
            DropIndex("dbo.Orders", new[] { "MovieSessionId" });
            DropIndex("dbo.MovieSessions", new[] { "MovieId" });
            DropIndex("dbo.MovieSessions", new[] { "AuditoriumId" });
            DropTable("dbo.Clients");
            DropTable("dbo.Orders");
            DropTable("dbo.Movies");
            DropTable("dbo.MovieSessions");
            DropTable("dbo.Auditoriums");
        }
    }
}
