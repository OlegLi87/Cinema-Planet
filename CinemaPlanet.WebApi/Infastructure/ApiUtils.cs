using CinemaPlanet.Domain.Core.DomainModels;
using CinemaPlanet.WebApi.Dtos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace CinemaPlanet.WebApi.Infastructure
{
    public static class ApiUtils
    {
        public static Dictionary<string, string> ErrorMessages { get; }

        static ApiUtils()
        {
            ErrorMessages = new Dictionary<string, string>();
            ErrorMessages.Add("id", "Provided ID is invalid.");
            ErrorMessages.Add("data", "Provided data is invalid or not full.");
        }

        public static AuditoriumDto MapToAuditoriumDto(Auditorium auditorium)
        {
            return new AuditoriumDto
            {
                Id = auditorium.Id,
                Name = auditorium.Name,
                ImageUrl = auditorium.ImageUrl,
                BasicSeatsCapacity = auditorium.BasicSeatsCapacity,
                SilverSeatsCapacity = auditorium.SilverSeatsCapacity,
                GoldSeatsCapacity = auditorium.GoldSeatsCapacity,
                ActiveSessions = auditorium.MovieSessions.Count
            };
        }

        public static Auditorium MapToAuditorium(Auditorium auditorium, AuditoriumDto auditoriumDto)
        {
            auditorium.Name = auditoriumDto.Name;
            auditorium.ImageUrl = auditoriumDto.ImageUrl;
            auditorium.BasicSeatsCapacity = auditoriumDto.BasicSeatsCapacity;
            auditorium.SilverSeatsCapacity = auditoriumDto.SilverSeatsCapacity;
            auditorium.GoldSeatsCapacity = auditoriumDto.GoldSeatsCapacity;

            return auditorium;
        }

        public static MovieDto MapToMovieDto(Movie movie)
        {
            return new MovieDto
            {
                Id = movie.Id,
                Name = movie.Name,
                Description = movie.Description,
                ImageUrl = movie.ImageUrl,
                ReleaseDate = movie.ReleaseDate,
                Genre = movie.Genre.ToString(),
                BasicSeatPrice = movie.BasicSeatPrice,
                SilverSeatPrice = movie.SilverSeatPrice,
                GoldSeatPrice = movie.GoldSeatPrice,
                ActiveSessions = movie.MovieSessions.Count
            };
        }

        public static Movie MapToMovie(Movie movie, MovieDto movieDto)
        {
            movie.Name = movieDto.Name;
            movie.Description = movieDto.Description;
            movie.ReleaseDate = movieDto.ReleaseDate;
            movie.ImageUrl = movieDto.ImageUrl;
            movie.BasicSeatPrice = movieDto.BasicSeatPrice;
            movie.SilverSeatPrice = movie.SilverSeatPrice;
            movie.GoldSeatPrice = movie.GoldSeatPrice;
            movie.Genre = (Genre)Enum.Parse(typeof(Genre), movieDto.Genre);

            return movie;
        }
    }
}