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
                new Auditorium { Name = "Green Forest", ImageUrl = "https://media-cdn.tripadvisor.com/media/photo-s/12/c7/76/79/renovated-auditoriums.jpg", BasicSeatsCapacity = 25, SilverSeatsCapacity = 20, GoldSeatsCapacity = 10 },
                new Auditorium { Name = "Blue Sky", ImageUrl = "https://www.boxofficepro.com/wp-content/uploads/2019/12/CGR-BRIGNAIS-43-600x286.jpg", BasicSeatsCapacity = 30, SilverSeatsCapacity = 20, GoldSeatsCapacity = 10 },
                new Auditorium { Name = "White Frost", ImageUrl = "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Sala_de_cine.jpg/1200px-Sala_de_cine.jpg", BasicSeatsCapacity = 55, SilverSeatsCapacity = 23, GoldSeatsCapacity = 5 });

            context.Movies.AddOrUpdate(m => m.Name,
                new Movie { Name = "Terminator 21", ReleaseDate = DateTime.Parse("18.03.2021"), Genre = Genre.Action, BasicSeatPrice = 15.5f, SilverSeatPrice = 20.55f, GoldSeatPrice = 30.15f, Description = "Terminator once again back and angry.", ImageUrl = "https://upload.wikimedia.org/wikipedia/en/7/70/Terminator1984movieposter.jpg" },
                new Movie { Name = "Borat", ReleaseDate = DateTime.Parse("28.11.2014"), Genre = Genre.Comedy, BasicSeatPrice = 22.5f, SilverSeatPrice = 28, GoldSeatPrice = 35.05f, Description = "Kazakh TV talking head Borat is dispatched to the United States to report on the greatest country in the world. With a documentary crew in tow, Borat becomes more interested in locating and marrying Pamela Anderson.", ImageUrl = "https://m.media-amazon.com/images/M/MV5BMTk0MTQ3NDQ4Ml5BMl5BanBnXkFtZTcwOTQ3OTQzMw@@._V1_UX182_CR0,0,182,268_AL_.jpg" },
                new Movie { Name = "Titanic", ReleaseDate = DateTime.Parse("02.06.1998"), Genre = Genre.Drama, BasicSeatPrice = 15.6f, SilverSeatPrice = 21, GoldSeatPrice = 24.5f, Description = "84 years later, a 100 year-old woman named Rose DeWitt Bukater tells the story to her granddaughter Lizzy Calvert, Brock Lovett, Lewis Bodine, Bobby Buell and Anatoly Mikailavich on the Keldysh about her life set in April 10th 1912, on a ship called Titanic when young Rose boards the departing ship with the upper-class passengers and her mother, Ruth DeWitt Bukater, and her fiancé, Caledon Hockley.", ImageUrl = "https://upload.wikimedia.org/wikipedia/en/1/19/Titanic_%28Official_Film_Poster%29.png" }
                );

            context.Roles.AddOrUpdate(r => r.Name,
                new Role { Name = "User" },
                new Role { Name = "Admin" }
                );
        }
    }
}
