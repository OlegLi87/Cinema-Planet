using CinemaPlanet.Domain.Core.DomainModels;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;
using System.Xml.Linq;

namespace CinemaPlanet.WebApi.Dtos
{
    public class AuditoriumDto
    {
        public int Id { get; set; }

        [Required]
        public string Name { get; set; }

        [Required]
        [RegularExpression(@"(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|png|jpeg)")]
        public string ImageUrl { get; set; }

        [Range(0, 255)]
        public byte BasicSeatsCapacity { get; set; }

        [Range(0, 255)]
        public byte SilverSeatsCapacity { get; set; }

        [Range(0, 255)]
        public byte GoldSeatsCapacity { get; set; }

        [Range(0, Int32.MaxValue)]
        public int ActiveSessions { get; set; }
    }
}