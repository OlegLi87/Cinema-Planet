namespace CinemaPlanet.Domain.Migrations
{
    using CinemaPlanet.Domain.Core.DomainModels;
    using System;
    using System.Data.Entity;
    using System.Data.Entity.Migrations;
    using System.Linq;

    internal sealed class Configuration : DbMigrationsConfiguration<CinemaPlanet.Domain.Persistence.CinemaPlanetContext>
    {
        public Configuration()
        {
            AutomaticMigrationsEnabled = false;
        }

        protected override void Seed(CinemaPlanet.Domain.Persistence.CinemaPlanetContext context)
        {
            context.Auditoriums.AddOrUpdate(a => a.Name,
                new Auditorium { Name = "Green Forest", BasicSeatsCapacity = 25, SilverSeatsCapacity = 20, GoldSeatsCapacity = 10 },
                new Auditorium { Name = "Blue Sky", BasicSeatsCapacity = 30, SilverSeatsCapacity = 20, GoldSeatsCapacity = 10 },
                new Auditorium { Name = "White Frost", BasicSeatsCapacity = 55, SilverSeatsCapacity = 23, GoldSeatsCapacity = 5 });

            context.Movies.AddOrUpdate(m => m.Name,
                new Movie { Name = "Terminator 21", ReleaseDate = DateTime.Parse("18.03.2021"), Genre = Genre.Action, BasicSeatPrice = 15.5f, SilverSeatPrice = 20.55f, GoldSeatPrice = 30.15f },
                new Movie { Name = "Borat", ReleaseDate = DateTime.Parse("28.11.2014"), Genre = Genre.Comedy, BasicSeatPrice = 22.5f, SilverSeatPrice = 28, GoldSeatPrice = 35.05f },
                new Movie { Name = "Titanic", ReleaseDate = DateTime.Parse("02.06.1998"), Genre = Genre.Drama, BasicSeatPrice = 15.6f, SilverSeatPrice = 21, GoldSeatPrice = 24.5f }
                );
        }
    }
}
