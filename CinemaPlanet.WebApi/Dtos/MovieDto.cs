using CinemaPlanet.Domain.Core.DomainModels;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;
using System.Xml.Linq;

namespace CinemaPlanet.WebApi.Dtos
{
    public class MovieDto
    {
        public int Id { get; set; }

        [Required]
        public string Name { get; set; }

        [Required]
        public string Description { get; set; }

        [Required]
        [RegularExpression(@"(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|png|jpeg)")]
        public string ImageUrl { get; set; }

        [Required]
        [DataType(DataType.Date)]
        public DateTime ReleaseDate { get; set; }

        [Required]
        public string Genre { get; set; }

        [Range(0, float.MaxValue)]
        public float BasicSeatPrice { get; set; }

        [Range(0, float.MaxValue)]
        public float SilverSeatPrice { get; set; }

        [Range(0, float.MaxValue)]
        public float GoldSeatPrice { get; set; }

        [Range(0, Int32.MaxValue)]
        public int ActiveSessions { get; set; }
    }
}