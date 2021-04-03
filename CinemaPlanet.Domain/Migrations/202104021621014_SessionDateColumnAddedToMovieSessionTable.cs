namespace CinemaPlanet.Domain.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class SessionDateColumnAddedToMovieSessionTable : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.MovieSessions", "SessionDate", c => c.DateTime(nullable: false));
        }
        
        public override void Down()
        {
            DropColumn("dbo.MovieSessions", "SessionDate");
        }
    }
}
