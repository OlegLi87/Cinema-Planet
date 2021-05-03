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
            movie.SilverSeatPrice = movieDto.SilverSeatPrice;
            movie.GoldSeatPrice = movieDto.GoldSeatPrice;
            movie.Genre = (Genre)Enum.Parse(typeof(Genre), movieDto.Genre);

            return movie;
        }

        public static MovieSessionDto MapToMovieSessionDto(MovieSession movieSession)
        {
            return new MovieSessionDto
            {
                Id = movieSession.Id,
                AuditoriumId = movieSession.AuditoriumId,
                AuditoriumName = movieSession.Auditorium.Name,
                MovieId = movieSession.MovieId,
                MovieName = movieSession.Movie.Name,
                SessionDate = movieSession.SessionDate,
                OrdersAmount = movieSession.Orders.Count
            };
        }

        public static MovieSession MapToMovieSession(MovieSession movieSession, MovieSessionDto movieSessionDto)
        {
            movieSession.Id = movieSessionDto.Id;
            movieSession.AuditoriumId = movieSessionDto.AuditoriumId;
            movieSession.MovieId = movieSessionDto.MovieId;
            movieSession.SessionDate = movieSessionDto.SessionDate;

            return movieSession;
        }

        public static Order MapToOrder(Order order, OrderDto orderDto, MovieSession movieSession)
        {
            order.Id = orderDto.Id;
            order.MovieSessionId = movieSession.Id;
            order.UserId = orderDto.UserId;
            order.SeatType = (SeatType)Enum.Parse(typeof(SeatType), orderDto.SeatType);
            order.SeatNumber = movieSession.GetSeatNumber(order.SeatType);

            return order;
        }

        public static OrderDto MapToOrderDto(Order order)
        {
            var orderDto = new OrderDto();

            orderDto.Id = order.Id;
            orderDto.AuditoriumName = order.MovieSession.Auditorium.Name;
            orderDto.MovieName = order.MovieSession.Movie.Name;
            orderDto.SeatNumber = order.SeatNumber;
            orderDto.SeatType = order.SeatType.ToString();
            orderDto.UserId = order.UserId;
            orderDto.SessionDate = order.MovieSession.SessionDate;

            return orderDto;
        }
    }
}